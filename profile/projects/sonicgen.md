# SonicGen

**Repo (public):** [github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)
**Local dev repo:** `~/Workspace/archive/truth-engine/` (private GitHub: `MLGalusha/truth-engine`)
**Status:** Built and working — a complete audio dedup engine. Mason set it down when *Voices That Remain* came along, not because SonicGen itself was incomplete.
**Role:** Solo builder + architect
**Timeline:** Sep–Dec 2025 (private dev repo Sep 24 – Oct 14; public SonicGen repo created Oct 23, last pushed Nov 9; active work continued past the last public push through December 2025, when VTR was proposed and SonicGen was set down)
**Scale:** ~14,000 lines of Python, 25 commits on the dev repo
**How it was built:** **By hand in Python — no coding agents.** This pre-dates Mason's heavy adoption of Claude Code / Codex (which didn't become his daily driver until late 2025). Every line of the fingerprinting and matching pipeline was written by Mason directly.

## One-liner
A from-scratch Shazam-style audio fingerprinting and deduplication engine in Python. Identifies whether a query audio clip matches any clip already in a fingerprint database, and if so, where in the source video it came from.

## Why it exists (the origin — not the product)
Mason wanted to build *Truth Engine* — an indexed, searchable, context-preserving archive of everything public figures have said publicly, so any clip going around social media could be traced back to its original source with the surrounding context restored. Truth Engine the larger idea **has never been built**. Mason started by building the piece he knew he'd need first: a robust audio dedup engine. That piece is SonicGen. He was still actively working on it when VTR was proposed in December 2025 — at which point SonicGen was set down, VTR became the priority, and the rest of Truth Engine never got built.

So: **Truth Engine** = the unbuilt larger vision. **SonicGen** = the standalone dedup engine that Mason actually built. Talk about SonicGen as its own thing; mention Truth Engine only as the "why" if asked.

## Truth Engine — the unbuilt larger vision (architecture, not just an idea)

Mason had a concrete architecture for Truth Engine before he started writing code, not a vague "searchable archive" hand-wave. The design points below are confirmed from prior design conversations:

- **Scope boundary: everything a public figure ever said on YouTube.** Speaker-centric, YouTube-bounded. Not "Shazam for the internet." The corpus is defined by the person, not by the media type.
- **Epistemic framing, not search framing.** Truth Engine was a claim-verification tool. The first concrete product promise was **provenance recovery** — given a clip going around, return the exact original video and timestamp so surrounding context could be restored. Search was downstream of provenance.
- **Three distinct problems, explicitly layered.** Mason refused to collapse them into one representation:
  1. **Audio sameness / origin** — the SonicGen layer. Is this clip the same audio as something already in the corpus, and where did it come from?
  2. **Speaker identity** — the SpeechBrain / ECAPA experiment. Who is speaking in this segment?
  3. **Spoken meaning / claims** — the vector-DB-per-speaker layer. What did this person say about X?
- **Vector database per speaker.** The archive was organized around the person, with video and timestamp as evidence underneath. Each speaker would have their own vector index for semantic retrieval, so "what did X say about Y" resolves to "which timestamps in which videos."
- **Two-phase ingest.** Metadata first (Supabase: channel enumeration, video catalog, titles, URLs, relationships), then download + dedup (GCS for audio artifacts, local processing for fingerprints). The split is operational, not cosmetic — metadata is cheap and resumable, audio processing is slow and network-heavy.
- **Pipeline ordering was deliberate.** Channel discovery → metadata catalog → audio extraction → fingerprint generation → duplicate/origin resolution → canonical source mapping → *then* transcript and semantic layers. Mason explicitly resisted the temptation to jump straight to transcripts and embeddings before cleaning the media graph. You can't ask "what did they say" until you know which copies are duplicates.

The SonicGen code in the public repo is the audio-sameness layer of this architecture. The other layers never got built because VTR came along.

## What he actually built

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
- Simple, fast, correct. Not adaptive, not tiered — but it works on the v1 workload.

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
- **Non-adaptive peak threshold.** -30 dB works for studio audio (e.g., a podcast); variable-quality sources would need per-clip dynamic thresholding.
- **No hash collision testing at scale.** SHA1[:20] is fine for v1 volumes but wasn't stress-tested against a large corpus.
- **SpeechBrain subsystem is an experiment, not a product.** Worth exploring — not worth claiming as shipped.

## Interview talking points

1. **Lead:** "I wrote a Shazam-style audio fingerprinting engine from scratch in Python — constellation-hash peak finding on log-power spectrograms, alignment-offset matching via most-common time delta. By hand, no coding agents. No ML in the fingerprint core — it's a signal-processing engine, not an embedding pipeline, and that was the point."
2. **Depth:** walk through the specific numbers — 16 kHz, 2048 FFT, 80–500 Hz speech band, 25×25 peak neighborhood, fan value 3, max Δt 400 frames, SHA1[:20] hash, `min_aligned_matches=18` / `min_alignment_ratio=0.4`. The ability to cite these without looking is the signal.
3. **Insight:** "The key trick of this class of matcher isn't 'how many hashes collide' — it's 'how many hashes collide *at the same time offset*.' That's what separates signal from random hash collision."
4. **Retrospective:** "I chose Supabase for v1 because it was fast to get running. At scale the query pattern is wrong for a row store — I'd reach for a purpose-built fingerprint store next time."
5. **Roadmap:** "NEXT.txt has an adaptive tiered-match optimization — compare the first 10% of hashes, early-exit on unambiguous matches. Not built yet, but it's the next obvious win."
6. **Origin (only if asked):** "SonicGen was the first piece I needed for a larger idea called Truth Engine — a context-preserving archive of public-figure audio. I finished SonicGen, was about to start the rest, and then a family friend asked me to build VTR. Truth Engine itself has never been built; SonicGen is the only piece of it that exists."

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
- **Pre-agent hand-coded work** — SonicGen is Mason's strongest evidence that he can write complex systems by hand. This matters as a counter to the "only ships via agents" interview objection.

## Things to NOT claim
- Truth Engine itself is built (it isn't — only SonicGen is)
- Adaptive tiered matching (in NEXT.txt, not shipped)
- SpeechBrain integrated into the main pipeline (it's an isolated experiment)
- Production deployment (SonicGen is a working dev artifact, not a deployed product)
