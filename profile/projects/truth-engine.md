# Truth Engine (paused)

**Repo:** `~/Workspace/archive/truth-engine/`
**Status:** Paused — dedup engine (v1) works; roadmap documented in `NEXT.txt`; paused for cost/scale reasons and because VTR took priority
**Role:** Solo builder + architect
**Timeline:** 2025
**Scale:** ~14,000 lines of Python, 25 commits

## One-liner
Audio fingerprinting and deduplication system designed as the first stage of a larger ambition: an indexed, searchable archive of everything public figures have said publicly, so clips can always be traced back to the original source with full context.

## The larger vision (not built, worth explaining in interviews)
The ultimate idea behind Truth Engine: make it impossible to take public-figure clips out of context. Any clip uploaded to the system would return the original full-length video it came from, with context before and after. This matters because clip-based manipulation is a core mechanic of modern misinformation. Mason paused the project because he bit off an enormous scope and the cost/compute profile at scale didn't pencil out with Supabase. He wants to return to it eventually.

## What he actually built (v1 — the dedup engine)

### Pipeline
1. **Scrape a target channel** (Joe Rogan was the test case) via a custom YouTube Data API scraper (`youtube_api.py`)
2. **Extract audio** and compute a log-power spectrogram (restricted to 80–500 Hz for speech)
3. **Find spectral peaks** using scipy.ndimage local-maxima detection over a configurable neighborhood
4. **Generate constellation hashes** from peak pairs within a configurable max frame delta (Shazam-style)
5. **Store fingerprints in Supabase** for later lookup
6. **At query time**, adaptive tiered matching: compare first 10%, then 25%, then 50%, then 75% of the clip's hashes against the DB before running a full comparison. Optimizes for speed on the common case of "this clip definitely matches video X."
7. **Deduplicate** so duplicate smaller clips from Joe Rogan's site don't get indexed twice alongside the original full podcast audio

### Configurable parameters
- Sample rate: 16 kHz
- FFT size: 2048
- Hop length: 256
- Peak neighborhood: 25 × 25
- Fan value: 3 (pairs per anchor peak)
- Max hash delta frames: 400

### Additional subsystems in the repo
- Speaker diarization via SpeechBrain
- Speech-detection utilities
- Speaker replacement experiments

## Hard problems solved
- **Designed and implemented Shazam-style constellation-hash fingerprinting from scratch.** Not a library import — custom peak detection, hash construction, matching logic. This is real audio engineering.
- **Adaptive tiered matching** as a speed optimization — doesn't brute-force full-clip comparison when a partial match is unambiguous. Shows good engineering instincts around the P50/P99 split.
- **YouTube-scale data ingestion pipeline** — scraping entire channels, handling audio extraction, managing storage.
- **Honest retrospective on the wrong storage choice.** Mason concluded Supabase was the wrong backend for a fingerprinting system at scale — too slow and too expensive compared to something purpose-built like what Spotify uses. Knowing why your architecture didn't work at scale is itself a real engineering skill.

## Why paused
- **Scope.** The v1 dedup engine works, but the full vision (searchable, context-preserving archive of all public-figure audio) is an enormous multi-quarter project.
- **Cost + backend fit.** Supabase as the fingerprint store is too slow and too expensive at the scale the full vision demands.
- **Priority.** VTR was a bounded, achievable project a family friend needed shipped. Mason made the right call to pause Truth Engine and ship VTR first.

## Interview talking points

- **Lead with:** "I wrote a Shazam-style audio fingerprinting engine from scratch as stage one of a larger project, to deduplicate podcast audio and eventually let you trace any clip back to its source video."
- Constellation-hash peak finding with configurable spectrogram parameters
- Adaptive tiered-percentage matching as a speed optimization
- Honest framing of why it's paused: "I bit off a huge scope, the storage layer I chose didn't pencil out at the scale I wanted, and VTR was a bounded project that was worth shipping first. I'd come back to this with a purpose-built vector or fingerprint store."
- Shows range: audio engineering, not just full-stack web

## Claim guardrails
Things Mason can fully defend in an interview based on this project:
- Audio fingerprinting (Shazam-style constellation hashing)
- Custom spectrogram and peak-detection pipelines
- librosa, scipy, numpy for real audio processing
- YouTube API scraping at scale
- Supabase for fingerprint storage (with the caveat that it was the wrong choice and he knows why)
- Speaker diarization via SpeechBrain (exploratory)
- End-to-end Python data pipeline work
