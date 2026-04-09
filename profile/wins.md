# Wins

Concrete evidence of capability, stated in a form drafting skills can lift verbatim. Numbers, artifacts, outcomes — not vibes.

## Shipped in production
- **Voices That Remain** (voicesthatremain.com) — started in late January 2026, built part-time for roughly six weeks while holding a full-time cooking job, then shipped the majority of the production system in the roughly three most productive weeks after quitting that job in March 2026. Live on GCP (Cloud Run + Cloud SQL + Cloud Build + Cloud Storage), real users. Built solo with coding agents as primary tools. ~15,600 lines of TypeScript, 547+ git commits.
- **Staffclaw** — a full-stack workforce scheduling replacement for Alamo Drafthouse theater staff, built by reverse-engineering the undocumented Teamworxs timekeeping API. Session-based auth, demo mode, Postgres persistence, React frontend. Came directly out of frustration with the existing tool at his day job.
- **VTR AI pipeline** — production HITL-gated vision pipeline that transcribes handwritten historical letters, extracts metadata (people, places, dates) via OpenAI structured outputs with strict JSON schemas, and writes summaries. Human confirms every step before content goes public.

## Reverse-engineering / integration feats
- **Mapped 92 undocumented API endpoints** (including manager-only routes he doesn't have access to) in a single agent session using his "OpenClaw" agent setup. Result: a custom dashboard that pulls shift, guest-count, and schedule data directly without touching the web app. Thesis line worth reusing: *"A year ago, mapping an undocumented API meant days in browser dev tools reading minified JavaScript. An AI agent did it in one session. The barrier to building on top of any software you use is effectively gone."*

## ML / infra depth
- **Trained a CNN on the MAESTRO dataset (~200 hours of classical piano, ~100GB preprocessed)** for real-time audio-to-MIDI transcription (bootcamp capstone, 2024). PyTorch, custom spectrogram preprocessing (11ms resolution), sliding-window architecture, GPU training on GCP VMs, end-to-end pipeline: audio → spectrogram → CNN → MIDI → sheet music via MuseScore. ~30.7k lines of Python, 62 commits.
- **Wrote a Shazam-style audio fingerprinting engine from scratch** as the first stage of Truth Engine. Custom constellation-hash peak detection on log-power spectrograms (16 kHz, 2048 FFT, 256 hop, 80–500 Hz speech band, 25×25 maximum-filter neighborhood, -30 dB floor, fan value 3, max Δt 400 frames, SHA-1 short hashes of `freq1|freq2|Δt`). Matching is alignment-offset based: for a candidate clip, collect all (t_ref − t_query) offsets per video, take `Counter.most_common(1)`, and call it a match when `min_aligned_matches ≥ 18` and `min_alignment_ratio ≥ 0.4`. Supabase storage, noisy-hash filtering. ~14k lines of Python.
- **Bootcamp:** UNC Chapel Hill AI bootcamp, 6 months, May–December 2024. Did the majority of the capstone solo despite nominal group structure.

## Delivery under constraint
- Built and shipped 90% of VTR in the roughly three weeks after quitting his cooking job in March 2026. Before that, made steady part-time progress while working 30–60 hours a week at the theater. Strong signal for intrinsic motivation and throughput.
- First real social post (April 2026) was a technical breakdown of his undocumented-API-mapping experiment. It was the first substantial piece of writing he'd ever published about his work — strong thesis, strong voice, no self-hedging. Evidence that he can communicate technical work clearly when it matters.

## Range
- Audio ML (PianoTranscriber, Truth Engine), vision ML (VTR letter transcription), full-stack TypeScript web (VTR, Staffclaw), Python scripting (line-finder, google-api-tools), reverse engineering (Staffclaw, google-api-tools), GCP deployment (VTR). Not a one-trick full-stack generalist.

## Tools fluency
- Heavy AI user since 2023 (ChatGPT + Midjourney early adopter, before most engineers had touched them). Switched to coding-agent-primary workflow in early 2026 once Claude Code and Codex matured. This is not a late adoption story — it's an early-adopter-who-waited-for-the-tools-to-catch-up story.
