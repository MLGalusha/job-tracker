# SonicGen — Project Study Guide

This is a recall aid. It exists so Mason can re-learn his own project before an interview without re-reading the source code. One-time write.

---

## The 30-second pitch

I wrote a Shazam-style audio fingerprinting and deduplication engine from scratch in Python. It takes a query audio clip, computes constellation hashes from spectral peaks, looks them up in a database, and determines whether the clip matches anything already stored and exactly where in the source it came from. Around 14,000 lines, written by hand with no coding agents, Sep through Dec 2025.

---

## The 3-minute walkthrough

SonicGen exists because I was building toward something bigger called Truth Engine, a system to trace any audio clip of a public figure back to its original source with surrounding context restored. Truth Engine itself was never built. SonicGen is the audio-sameness layer, the piece that answers "is this clip the same audio as something I've already indexed?"

The pipeline works like this. Audio comes in at 16 kHz mono. I compute a log-power short-time Fourier transform spectrogram, then band-limit it to 80 through 500 Hz because that's where speech energy lives. I find spectral peaks using a maximum filter with a 25 by 25 neighborhood, with a floor of negative 30 dB below the spectrogram max. From those peaks I generate constellation hashes: for each anchor peak, I pair it with up to 3 nearby peaks within 400 frames, hash the frequency pair and time delta through SHA1, and take the first 20 characters. Those hashes go into Supabase with the video ID and the reference timestamp.

Matching is where the real insight is. When a query clip comes in, I compute its hashes the same way, look them up in the database, and for every candidate video I collect alignment offsets: reference time minus query time. A real match means many hashes agree on the same time offset, not just that many hashes collide. I use Counter.most_common(1) on the offsets and declare a match when at least 18 hashes align and the aligned count is at least 40% of total hashes.

I chose Supabase for storage and that was a mistake. The workload is write-heavy ingest followed by hash-lookup reads with no relational joins. A local SQLite file or any equivalent local store would have been the right call. I wanted to learn Supabase, and I picked the tool I wanted to learn instead of the tool the problem needed.

---

## Numbers to remember

These are the specific values you need to cite without hesitation:

| Parameter | Value | Why |
|---|---|---|
| Sample rate | 16 kHz mono | Standard for speech. Lower than music (44.1 kHz) because speech band is narrow |
| N_FFT | 2048 | FFT window size. Gives frequency resolution of ~7.8 Hz per bin at 16 kHz |
| hop_length | 256 | ~16 ms per frame. Balances time resolution vs compute |
| Band limits | 80 – 500 Hz | Speech fundamental frequency range. Throws away everything irrelevant |
| Peak neighborhood | 25 x 25 (time x freq bins) | Suppresses minor peaks. Bigger = fewer peaks = fewer hashes = faster but less robust |
| Floor threshold | -30 dB below spectrogram max | Kills noise-floor peaks |
| Fan value | 3 | Max target peaks per anchor. Higher = more hashes = more robust but more storage |
| Max delta-t | 400 frames | Max time gap between anchor and target peak (~6.4 sec at hop=256, sr=16k) |
| Hash function | SHA1(freq1\|freq2\|delta_t)[:20] | First 20 chars of SHA1. Compact, not cryptographic |
| Rate cap | 30 hashes/sec | Prevents dense regions from flooding the database |
| Min aligned matches | 18 | Minimum hash count at the dominant offset |
| Min alignment ratio | 0.4 | At least 40% of query hashes must agree on the offset |
| Total LOC | ~14,000 lines Python | |
| Commits | 25 (dev repo) | |

---

## Key files and what they do

| File | LOC | What it does |
|---|---|---|
| `fingerprint_audio.py` | ~213 | The core: load audio, compute spectrogram, find peaks, generate hashes |
| `HOLD_DEDUP.py` | ~281 | The matcher: look up hashes, compute alignment offsets, declare match/no-match |
| `youtube_api.py` | ~180 | YouTube Data API v3 integration for channel enumeration and video metadata |
| `download.py` | ~210 | yt-dlp + FFmpeg audio extraction, upload to GCS |
| `supabase_utils.py` | ~247 | Typed wrappers for fingerprint tables, batched inserts, noisy-hash filtering |
| `speech_brain.py` | ~55 | ECAPA-VoxCeleb speaker embeddings into Pinecone (EXPERIMENT, not integrated) |

---

## The hard decisions and why

### 1. Log-power spectrogram instead of mel spectrogram
Mel spectrograms are the default in ML audio. I used a log-power STFT because I'm not feeding this to a neural network. I need raw frequency resolution for peak picking, and mel bins are designed for human perception, not for precise peak coordinates. The log-power transform compresses the dynamic range so quiet peaks are detectable alongside loud ones.

### 2. Band-limiting to 80-500 Hz
This collapses the search space massively. Speech fundamentals live in this band. Music, noise, and high harmonics are irrelevant for speaker audio dedup. A broader band would generate more peaks, more hashes, more false positives, and more compute for no additional signal.

### 3. 25x25 peak neighborhood
This is the non-maximum suppression window. Too small and you get thousands of minor peaks (noisy, expensive). Too large and you miss real spectral events. 25x25 was tuned empirically. It's roughly 400 ms x ~195 Hz, which matches the timescale and frequency spread of a spoken syllable.

### 4. Fan value 3 + max delta-t 400
Each peak pairs with up to 3 target peaks within 400 frames. Higher fan value = more hashes = more robust matching but more storage and slower lookups. Fan 3 with delta-t 400 was the sweet spot for the v1 workload (podcast-length audio, studio quality). A music system would use higher values.

### 5. Alignment-offset matching (not hash-count matching)
This is the key insight of the whole system and the most important thing to explain. Naive matching asks "how many hashes from the query appear in the database for this video?" That doesn't work because random collisions accumulate. The right question is "how many hashes agree on the SAME time offset?" If 18 hashes all say "the query is the source video shifted by exactly 4,320 frames," that's a real match. Random collisions don't cluster on one offset.

### 6. Supabase (wrong choice, know why)
The workload is: write all hashes during ingest, then do hash-lookup reads at query time. No joins, no relational queries, no transactions. A row store with network latency on every read is the wrong tool. A local embedded store (SQLite, RocksDB, LevelDB) would have been faster, cheaper, and simpler. I picked Supabase because I wanted to learn it and was deep into SQL at the time, not because it fit the problem.

### 7. Rate cap at 30 hashes/sec
Some audio regions (percussion hits, sharp transients) generate dense clusters of peaks. Without the rate cap, a 5 second drum fill can produce more hashes than 60 seconds of speech. The cap normalizes hash density across content types so the database doesn't skew toward dense regions.

---

## Things that are broken or incomplete (and what I'd fix)

### Single-offset assumption
The matcher finds ONE dominant offset per candidate video. If a viral clip is actually spliced from two different parts of the same source video, the matcher misses it because neither offset gets enough votes. Fix: cluster offsets instead of taking most_common(1). DBSCAN or a simple histogram peak finder on the offset distribution.

### Non-adaptive peak threshold
The -30 dB floor is absolute (relative to the spectrogram max). Works for clean studio audio. On noisy sources (phone recordings, crowd audio), the entire spectrogram shifts and the threshold either catches too many peaks or too few. Fix: dynamic per-clip thresholding, probably a percentile-based approach (top N% of peak amplitudes).

### No collision testing at scale
SHA1[:20] gives 80 bits = 2^80 possible hashes. At v1 volumes (thousands of videos), collision probability is negligible. At millions of videos with billions of hashes, I haven't tested whether truncation to 20 chars creates practical collision problems. Probably fine, but I haven't proven it.

### SpeechBrain is not integrated
The ECAPA-VoxCeleb speaker embedding experiment exists in `speech_brain.py` and writes to Pinecone. It's not wired into the main dedup pipeline. Don't claim it as part of the shipped system. Say "I experimented with speaker diarization via SpeechBrain" if asked, not "the system does speaker identification."

---

## Questions an interviewer might ask

### Softballs
- **"Walk me through how the fingerprinting works."** Use the 3-minute walkthrough above.
- **"Why did you build this?"** Truth Engine origin story. Keep it short: "I wanted to trace audio clips back to their original source. SonicGen is the audio-sameness layer I built first."
- **"Why Python?"** It's what I knew best for numerical/audio work. librosa, scipy, numpy are all Python-native. Performance wasn't the bottleneck at v1 scale.

### Medium
- **"Why not use an off-the-shelf fingerprinting library like Chromaprint?"** Because I wanted to understand the algorithm from scratch. Chromaprint is a black box. Building it myself meant I could tune every parameter to the specific workload (speech, not music) and I'd actually understand why matches succeed or fail.
- **"How would you scale this to millions of videos?"** Three things: (1) migrate off Supabase to a local embedded store or a purpose-built hash index, (2) implement the tiered matching from NEXT.txt (compare 10% of hashes first, early-exit), (3) shard the hash table by hash prefix.
- **"What's the false positive rate?"** I don't have formal metrics on this. The thresholds (18 matches, 40% ratio) were tuned empirically on a test set of known matches and known non-matches. A real system would need a proper evaluation set with labeled ground truth.

### Gotchas
- **"Why 80-500 Hz? Human speech fundamentals go up to ~300 Hz for males and ~500 Hz for females. Aren't you cutting it close?"** Good point. 500 Hz catches female F0 and some first harmonics. The band was tuned for the initial corpus (mostly male political figures). A broader band (80-1000 Hz) would be more robust across speakers but would generate more peaks and more hashes.
- **"SHA1 is a cryptographic hash. Why use a crypto hash for non-security purposes?"** I just needed a uniform hash function and SHA1 is fast and well-distributed. There's no security purpose. CRC32 or xxHash would be faster; I'd switch for a production system.
- **"The -30 dB floor is relative to the spectrogram max. What if the loudest part of the audio is a mic pop?"** Then the floor shifts up and you lose real peaks in quieter sections. This is exactly the non-adaptive threshold problem. A robust system would use a running percentile or a per-window local threshold.
- **"What happens if someone re-encodes the audio at a different sample rate?"** The system resamples everything to 16 kHz on ingest, so re-encoding at a different rate doesn't break matching as long as librosa can load it. But if re-encoding also applies lossy compression (low bitrate MP3), the spectrogram changes enough that peak locations shift and hashes diverge. Robustness to compression artifacts is a known limitation I haven't tested.

---

## Truth Engine (brief, only if asked)

Three layered problems Mason identified and refused to collapse:
1. **Audio sameness** (SonicGen, built) — is this the same audio?
2. **Speaker identity** (SpeechBrain experiment, not built) — who is talking?
3. **Spoken meaning** (vector DB per speaker, not built) — what did they say about X?

Architecture: per-speaker vector index, YouTube-bounded corpus, two-phase ingest (metadata first into Supabase, then audio into GCS), deliberate pipeline ordering (clean the media graph before doing transcripts).

Never claim Truth Engine as built. SonicGen is the only piece that exists.
