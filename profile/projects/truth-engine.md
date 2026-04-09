# Truth Engine (paused)

**Repo:** `~/Workspace/archive/truth-engine/` (public: [github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen))
**Status:** Paused — v1 dedup engine works end-to-end; v2 roadmap documented in `NEXT.txt`; paused for cost/scale reasons and because VTR took priority
**Role:** Solo builder + architect
**Timeline:** Sep 2025 – Oct 2025 (most recent commit Oct 14, last touch Oct 23)
**Scale:** ~14,000 lines of Python, 25 commits

## One-liner
Audio fingerprinting and deduplication system designed as the first stage of a larger ambition: an indexed, searchable archive of everything public figures have said publicly, so clips can always be traced back to the original source with full context.

## The larger vision (not built, worth explaining in interviews)
The ultimate idea behind Truth Engine: make it impossible to take public-figure clips out of context. Any clip uploaded to the system would return the original full-length video it came from, with context before and after. This matters because clip-based manipulation is a core mechanic of modern misinformation. Mason paused the project because he bit off an enormous scope and the cost/compute profile at scale didn't pencil out with Supabase. He wants to return to it eventually.

## What he actually built (v1 — the dedup engine)

### Fingerprinting pipeline (`fingerprint_audio.py`, ~213 LOC)
1. **Ingest audio** via librosa at 16 kHz mono
2. **Compute a log-power STFT spectrogram** with `N_FFT=2048`, `hop_length=256` (~16 ms frames)
3. **Band-limit to 80–500 Hz** — the speech-energy band, throws away irrelevant content and collapses the search space
4. **Find spectral peaks** with `scipy.ndimage.maximum_filter` over a **25 × 25** neighborhood, gated by a **-30 dB** floor below the spectrogram max
5. **Generate constellation hashes** from peak pairs: for each anchor peak, take up to **fan value = 3** target peaks within a **max Δt = 400 frames** window. Hash = `SHA1("freq1|freq2|Δt")[:20]`
6. **Rate-cap to 30 hashes/sec** to prevent dense regions from blowing out the DB
7. **Store in Supabase** (`fingerprints` table: `video_id`, `hash`, `t_ref`), plus `fingerprint_hash_counts` and `noisy_hashes` for filtering hashes that appear across too many videos

### Matching (`HOLD_DEDUP.py`, ~281 LOC) — the actually-shipped approach
- For each query clip, compute its hashes
- Look up each hash in Supabase → list of (video_id, t_ref) matches
- For each candidate video, collect **alignment offsets**: `offset = t_ref - t_query`
- Use `collections.Counter.most_common(1)` on the offsets to find the dominant alignment — this is the key insight: a real match means many hashes agree on the *same* time offset
- Declare a match when `aligned_matches >= 18` **and** `aligned_matches / total_hashes >= 0.4`
- This is a simple, fast, correct approach. Not adaptive, not tiered — but it works on the v1 workload.

### Supporting subsystems
- **`youtube_api.py`** (~180 LOC) — YouTube Data API v3 (official, not yt-dlp scraping) for channel enumeration and metadata
- **`download.py`** (~210 LOC) — yt-dlp + FFmpeg for audio extraction, then upload to GCS
- **Restartable, state-driven batch ingestion.** The pipeline prompts for a YouTube handle, enumerates the channel, and walks videos through explicit status flags (`pending → downloaded → fingerprinted → deduped`) with upserts on every transition. A crashed or killed run resumes cleanly without redoing completed work — important when ingesting hundreds of hours of audio over a slow network.
- **`supabase_utils.py`** (~247 LOC) — typed wrappers for the fingerprint tables, batched inserts, noisy-hash filtering
- **`speech_brain.py`** (~55 LOC) — ECAPA-VoxCeleb speaker embeddings into Pinecone. **This is an isolated experiment**, not wired into the main dedup pipeline. Worth mentioning but not claiming as part of the shipped system.

### What's in NEXT.txt but not built
- **Adaptive tiered-percentage matching** — compare first 10%, 25%, 50%, 75% of hashes with early exit for unambiguous matches. Documented as the intended optimization but never implemented.
- Migration off Supabase to a purpose-built fingerprint store.
- Integration of speaker diarization into the main pipeline.

*(Do not claim tiered matching as shipped. It's a "what I'd do next" in interviews.)*

## Hard problems solved
- **Designed and implemented Shazam-style constellation-hash fingerprinting from scratch.** Not a library import — custom peak detection, custom hash construction, custom matching logic. Real audio engineering.
- **Alignment-offset matching via most-common Δt.** The core correctness insight of constellation-hash matching — not "how many hashes collide" but "how many hashes collide *at the same time offset*." Cheap, robust to noise.
- **Noisy-hash filtering.** Hashes that show up in too many videos (percussion, room tone, common phonemes) are downweighted/filtered via `fingerprint_hash_counts`.
- **Honest retrospective on the wrong storage choice.** Mason concluded Supabase was the wrong backend for a fingerprinting system at scale — query latency and egress cost dominated. Knowing why your architecture didn't work is itself real engineering.

## Honest weaknesses (interview gold — don't hide these)
- **Single-offset assumption.** If a clip genuinely spans two parts of a source video (e.g., a re-cut that splices two segments), the most-common-offset approach misses it. A real system would cluster offsets.
- **Non-adaptive peak threshold.** -30 dB works for Joe Rogan's studio audio; variable-quality sources would need per-clip dynamic thresholding.
- **No hash collision testing at scale.** SHA1[:20] is fine for v1 volumes but wasn't stress-tested against a large corpus.
- **SpeechBrain subsystem is an experiment, not a product.** Worth exploring — not worth claiming as shipped.

## Why paused
- **Scope.** v1 dedup works, but the full vision (searchable, context-preserving archive of all public-figure audio) is a multi-quarter project.
- **Cost + backend fit.** Supabase as the fingerprint store didn't pencil out — query patterns and storage cost at the scale the full vision demands are wrong for a general-purpose Postgres.
- **Priority.** VTR was a bounded, achievable project a family friend needed shipped. Mason made the right call to pause Truth Engine and ship VTR first.

## Interview talking points

1. **Lead:** "I wrote a Shazam-style audio fingerprinting engine from scratch to dedup podcast audio — constellation-hash peak finding on log-power spectrograms, alignment-offset matching via most-common time delta."
2. **Depth:** walk through the specific numbers — 16 kHz, 2048 FFT, 80–500 Hz speech band, 25×25 peak neighborhood, fan value 3, max Δt 400 frames, SHA1[:20] hash, `min_aligned_matches=18` / `min_alignment_ratio=0.4`. The ability to cite these without looking is the signal.
3. **Insight:** "The key trick of this class of matcher isn't 'how many hashes collide' — it's 'how many hashes collide *at the same time offset*.' That's what separates signal from random hash collision."
4. **Retrospective:** "I chose Supabase for v1 because it was fast to get running. At scale the query pattern is wrong for a row store — I'd reach for a purpose-built fingerprint store next time."
5. **Roadmap:** "NEXT.txt has an adaptive tiered-match optimization — compare the first 10% of hashes, early-exit on unambiguous matches. Not built yet, but it's the next obvious win."

## Claim guardrails
Things Mason can fully defend in an interview based on this project:
- Audio fingerprinting (Shazam-style constellation hashing)
- Log-power spectrograms, band-limiting, spectral peak detection with maximum-filter neighborhoods
- SHA1-based constellation hashes with configurable fan value and max Δt
- **Alignment-offset matching via `Counter.most_common(1)`** with fixed thresholds (*not* adaptive tiered — that's in NEXT.txt)
- librosa, scipy.ndimage, numpy for real audio processing
- YouTube Data API v3 + yt-dlp + FFmpeg + GCS ingestion pipeline
- Supabase for fingerprint storage (with the caveat that it was the wrong choice and he knows why)
- Noisy-hash filtering via aggregate hash-count tables
- Speaker diarization via SpeechBrain / ECAPA-VoxCeleb + Pinecone as an **exploratory experiment**, not integrated
- End-to-end Python data pipeline work
