# Wins

Concrete evidence of capability, stated in a form drafting skills can lift verbatim. Numbers, artifacts, outcomes — not vibes.

## Shipped in production
- **Voices That Remain** (voicesthatremain.com) — started in late January 2026, built part-time for roughly six weeks while holding a full-time cooking job, then shipped the majority of the production system in the roughly three most productive weeks after quitting that job in March 2026. Live on GCP (Cloud Run + Cloud SQL + Cloud Build + Cloud Storage), real users. Built solo with coding agents as primary tools. ~15,600 lines of TypeScript, 547+ git commits.
- **VTR AI pipeline** — production HITL-gated vision pipeline that transcribes handwritten historical letters with OpenAI GPT-5.4 (plus GPT-5.4-mini for a cheap audit step), extracts metadata (people, places, dates) via strict-schema structured outputs, and writes summaries. Human confirms every step before content goes public.

## Built and used (not publicly deployed, but real working software)
- **Staffclaw** — a full-stack workforce scheduling tool for Alamo Drafthouse theater staff, built on top of the reverse-engineered Teamworxs API. Express 5 + React 19 + Drizzle/Postgres monorepo with shared types, session-based auth with 4-hour expiry + demo mode, dashboard with week nav / actual vs scheduled hours / alerts / Gantt schedule view, theater-assignment auto-assign, offer/swap/take-back shift flows, historical-pattern analyzer, statistical staffing optimization, and a schedule-comparison dashboard. 35 commits of substantive feature work plus a Vitest suite. Runs locally against the real API; never publicly deployed.
- **OpenClaw** — the predecessor to Staffclaw. A personal agent setup that scraped Teamworxs + the Alamo Drafthouse public site, then delivered Mason a daily Discord summary of his upcoming shift one hour before clock-in (coworkers, showtimes, projected guest counts, busiest hour, when mids leave), with conversational follow-up over Discord. Used daily for months.

## Reverse-engineering / integration feats
- **Mapped 92 undocumented API endpoints** (including manager-only routes he doesn't have access to) in a single agent session using his "OpenClaw" agent setup. Result: a custom dashboard that pulls shift, guest-count, and schedule data directly without touching the web app. Thesis line worth reusing: *"A year ago, mapping an undocumented API meant days in browser dev tools reading minified JavaScript. An AI agent did it in one session. The barrier to building on top of any software you use is effectively gone."*

## ML / infra depth
- **Trained a CNN on the MAESTRO dataset (~200 hours of classical piano, ~100GB preprocessed)** for audio-to-MIDI transcription (bootcamp capstone, 2024). PyTorch, custom spectrogram preprocessing (11 ms resolution), sliding-window architecture (240-frame input, 80-frame overlap), end-to-end pipeline: audio → spectrogram → CNN → MIDI → sheet music via MuseScore. Training ran ~**1 full week on a Google Compute Engine GPU VM** inside a **two-week capstone sprint**. ~30.7k lines of Python, 62 commits. (Real-time microphone capture was planned and documented but scoped out of the two-week deadline.)
- **Wrote SonicGen, a Shazam-style audio fingerprinting and dedup engine, by hand in Python — no coding agents** (Sep–Nov 2025, before Claude Code/Codex became Mason's daily driver). Custom constellation-hash peak detection on log-power spectrograms (16 kHz, 2048 FFT, 256 hop, 80–500 Hz speech band, 25×25 maximum-filter neighborhood, -30 dB floor, fan value 3, max Δt 400 frames, SHA-1 short hashes of `freq1|freq2|Δt`). Matching is alignment-offset based: for a candidate clip, collect all (t_ref − t_query) offsets per video, take `Counter.most_common(1)`, and call it a match when `min_aligned_matches ≥ 18` and `min_alignment_ratio ≥ 0.4`. Supabase storage, noisy-hash filtering. ~14k lines of Python. Public repo: github.com/MLGalusha/SonicGen. The strongest evidence Mason can write complex systems by hand.
- **Bootcamp:** UNC Chapel Hill AI bootcamp, 6 months, May–December 2024. Did the majority of the capstone solo despite nominal group structure.

## Delivery under constraint
- Built and shipped 90% of VTR in the roughly three weeks after quitting his cooking job in March 2026. Before that, made steady part-time progress while working 30–60 hours a week at the theater. Strong signal for intrinsic motivation and throughput.
- First real social post (April 2026) was a technical breakdown of his undocumented-API-mapping experiment. It was the first substantial piece of writing he'd ever published about his work — strong thesis, strong voice, no self-hedging. Evidence that he can communicate technical work clearly when it matters.

## Range
- Audio ML (PianoTranscriber), audio DSP / fingerprinting (SonicGen), vision ML (VTR letter transcription), full-stack TypeScript web (VTR, Staffclaw), Python scripting (line-finder, google-api-tools), reverse engineering (Staffclaw, google-api-tools), GCP deployment (VTR). Not a one-trick full-stack generalist.

## Tools fluency
- Heavy AI user since 2023 (ChatGPT + Midjourney early adopter, before most engineers had touched them). Switched to coding-agent-primary workflow in early 2026 once Claude Code and Codex matured. This is not a late adoption story — it's an early-adopter-who-waited-for-the-tools-to-catch-up story.
