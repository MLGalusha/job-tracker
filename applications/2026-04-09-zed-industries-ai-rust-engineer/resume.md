# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Full stack engineer who ships production AI features. I'm strongest at integrating LLMs into real products end to end: prompt tuning, structured outputs, picking the right model for the job on cost and quality, and designing the human verification gates that keep generated content trustworthy. I build primarily by directing coding agents as my daily tools, and I shipped my first production AI product (voicesthatremain.com) solo. Looking for AI engineering work where production AI integration and agent directed shipping are the core job.

## Selected projects

### Voices That Remain — 2026
**[voicesthatremain.com](https://voicesthatremain.com)** · Shipped to production, March 2026

- Designed and shipped a multi stage vision pipeline on the **OpenAI Responses API** with **strict JSON schema structured outputs** and **tool calling**. Transcription, metadata extraction, entity resolution, and regeneration run on **GPT-5.4**; a cheap **GPT-5.4-mini** audit and resync step handles the lower stakes decisions. The tiering is deliberate: pay for the good model on user visible work, not on checks.
- Built separate prompts for each document type (letters, envelopes, telegrams, photos), tuned independently. Image preprocessing runs through Sharp with smart resize and JPEG re-encoding for consistency across heterogeneous archival scans. Transcription prompts inject the surrounding context: collection metadata, page numbers, and date hints.
- Designed an explicit **human verification gate** after transcription. Nothing hallucinated reaches the public archive. Human corrections flow back into downstream extraction calls so metadata benefits from the corrected text, not the original OCR.
- **TypeScript end to end:** React 19 and Vite on the frontend, Express 4 with Drizzle and Postgres on the backend, Pino structured logging, Vitest and Playwright for tests. Around 15,000 lines and 547 commits at launch.
- **Deployed on Google Cloud:** Cloud Run (backend and frontend), Cloud SQL, Cloud Build (CI/CD), Cloud Storage. Drizzle migration journal coordinated with the deploy pipeline for zero downtime schema changes.
- Built solo in roughly three weeks of focused work after quitting a cooking job, agent directed end to end.

### PianoTranscriber — 2024
**[github.com/MLGalusha/PianoTranscriber](https://github.com/MLGalusha/PianoTranscriber)**

- Trained a PyTorch CNN to transcribe piano audio into MIDI on the **MAESTRO dataset (around 200 hours of classical piano, roughly 100 GB preprocessed)**. Custom spectrogram preprocessing at 11 ms resolution, sliding window architecture (240 frame input, 80 frame overlap).
- Full pipeline end to end: raw audio goes through spectrogram preprocessing, then the CNN, then a per key probability sequence, then MIDI, then sheet music via MuseScore. About 30,000 lines of Python.
- Training ran about a full week on a GCP GPU VM inside a two week sprint at the end of the bootcamp. Real time capture was documented and scoped out of the deadline.

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio dedup engine · about 14k lines of Python · **Written by hand, no coding agents**

- Wrote a **Shazam style audio fingerprinting and deduplication engine from scratch in Python**: log power STFT spectrograms (16 kHz, 2048 FFT, 256 hop), 80–500 Hz speech band limiting, spectral peak detection via `scipy.ndimage.maximum_filter` over 25×25 neighborhoods gated at -30 dB, constellation hashing (fan value 3, max Δt 400 frames, SHA1[:20]), 30 hashes per second rate cap.
- **Alignment offset matching** as the core correctness insight: for each candidate video, collect `t_ref - t_query` offsets and use `Counter.most_common(1)` to find the dominant alignment. A real match means many hashes agree on the *same* time offset, not just total hash collision count. Match threshold: 18+ aligned hashes and ≥40% alignment ratio.
- Restartable state driven YouTube ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg, and GCS). Each video moves through status flags `pending`, `downloaded`, `fingerprinted`, and `deduped`, with upserts on every transition so a killed run resumes cleanly. Honest retrospective: Supabase was the wrong storage choice for fingerprint query patterns at scale, and I can articulate exactly why and what I'd reach for next.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Functional internal tool

- Used **OpenClaw** (an earlier agent setup of mine) to map all **92 undocumented Teamworxs API endpoints** in a single agent session. That included the manager and owner routes I had no access to as a cook, with full request and response shapes for each. I used those to reverse-engineer the entire Teamworxs app (both the employee side and the manager schedule editor) as a **transparent client over Teamworxs's actual backend**: you log into Staffclaw with your existing Teamworxs credentials, and every read and write proxies through Teamworxs's API on your own session cookie. The migration cost from Teamworxs to a finished Staffclaw would be zero. Log in with the credentials you already have, no data export, no company onboarding.
- Layered in external API integrations (Alamo Drafthouse public showtime and ticket data, weather, local events data, and a history analyzer over past shifts) as **input signals for an auto scheduler**. Restaurant and movie theater scheduling is genuinely hard because demand depends on weather, showtimes, sold out screenings, and local events. None of those signals are in Teamworxs. The auto scheduler is the project's hardest unsolved problem and the reason the multi source data layer exists at all. Full stack TypeScript monorepo (Express 5, React 19, Drizzle and Postgres, shared types). Paused when VTR took priority.

## Skills

**Agent directed development:** Claude Code and Codex as primary daily tools. Direct agents to produce production code, review and own every technical decision, make hand edits during debugging. Daily since late 2025; heavy AI user since 2023.

**AI / ML:** OpenAI Responses API (GPT-5.4 and GPT-5.4-mini tiered use, strict structured outputs, tool calling, vision input), prompt tuning, picking the right model for cost and quality, human verification gate design, PyTorch, librosa, CNN training on real datasets, GCP GPU training.

**Languages:** TypeScript, Python, JavaScript, SQL, HTML/CSS

**Backend:** Node.js 20+ (ESM), Express, Drizzle ORM, Postgres, Pino, session auth, Vitest

**Frontend:** React 19, Vite, React Router, TipTap, Recharts, Playwright E2E

**Cloud / infra:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage), zero downtime Postgres migrations via Drizzle migration journal, Cloud Build CI/CD

**Other:** Reverse-engineering undocumented APIs, Puppeteer scraping, Sharp image preprocessing, librosa / scipy audio processing

## Education

**UNC Chapel Hill AI Bootcamp** — May–December 2024
Final project: trained a PyTorch CNN to transcribe piano audio into MIDI in real time on the MAESTRO dataset using GCP GPU VMs.
