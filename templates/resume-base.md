# Resume base — the master "everything I could say"

**Purpose:** This is the source material for every tailored resume. The `resume-tailor` skill reads this file, `profile/voice.md`, and the target `role.md`, then produces a tailored resume for a specific application. This file is the max-volume version. Every tailored resume is a *subset* and a *reordering* of what's in here.

**Rule:** Nothing in a tailored resume may be *stronger* than what's claimed here. If a tailored draft would overclaim beyond this file, either add evidence to the profile (if it's true) or don't make the claim.

**Format:** markdown, single-column, one-page target. Tailored resumes may exceed one page if the role is senior and the hiring bar requires more evidence, but default to one page.

---

# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

*(Tailored per role. Default version below. Swap/reorder for each application.)*

Self taught full stack engineer who ships production AI features. I'm strongest at integrating LLMs into real products end to end: prompt tuning, structured outputs, picking the right model for the job on cost and quality, and designing the human verification gates that keep generated content trustworthy. I build primarily by directing coding agents as my daily tools, and I shipped my first production AI product (voicesthatremain.com) solo after a 6 month AI bootcamp at UNC Chapel Hill. Looking for founding engineer or AI focused roles at companies where production AI integration and agent directed shipping are the core job.

---

## Selected projects

### Voices That Remain — 2026
**voicesthatremain.com** · Shipped to production March 2026

- Designed and shipped a digital archive for historical personal letters, built solo with coding agents. TypeScript end to end (React 19, Express, Drizzle, Postgres), around 15,000 lines and 547 commits at launch, live deployment on GCP. The archive itself is the product; the AI pipeline is one feature subsystem inside it.
- Built a multi stage vision pipeline on the OpenAI Responses API with strict structured outputs and tool calling: GPT-5.4 for transcription, metadata extraction, and entity resolution; GPT-5.4-mini for a cheap audit and resync step as a cost tiered optimization. Image preprocessing runs through Sharp, transcription prompts inject the surrounding context, a **human verification gate** sits before metadata extraction, and prompts are tuned separately for each document type (letters, envelopes, telegrams, photos).
- Deployed on Google Cloud: Cloud Run (backend and frontend), Cloud SQL, Cloud Build (CI/CD), Cloud Storage (archive bucket). Drizzle migration journal coordinated with the deploy pipeline for zero downtime schema changes.
- Testing via Playwright (E2E smoke tests on PR) and Vitest.
- Started the project in late January 2026 and built it part time while working a full time cooking job; quit the cooking job in March 2026 and shipped the majority of the remaining production work in the roughly three most productive weeks that followed.

### PianoTranscriber — 2024
- Trained a CNN to transcribe audio into MIDI in real time on the **MAESTRO dataset (around 200 hours, roughly 100 GB preprocessed)** using PyTorch on GCP GPU VMs. Custom spectrogram preprocessing at 11 ms resolution, sliding window architecture (240 frame input, 80 frame overlap). Full pipeline end to end: audio goes through spectrogram preprocessing, then the CNN, then MIDI, then sheet music.
- About 30,000 lines of Python. Did the majority of the work solo on what was nominally a group project.

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio dedup engine · about 14k lines of Python · **Written by hand, no coding agents**

- Wrote a **Shazam style audio fingerprinting and dedup engine from scratch in Python**: log power STFT spectrograms (16 kHz, 2048 FFT, 256 hop), 80–500 Hz speech band limiting, spectral peak detection via `scipy.ndimage.maximum_filter` over 25×25 neighborhoods gated at -30 dB, constellation hashing (fan value 3, max Δt 400 frames, SHA1[:20]), 30 hashes per second rate cap.
- **Alignment offset matching** as the core correctness insight: for each candidate video, collect `t_ref - t_query` offsets and use `Counter.most_common(1)` to find the dominant alignment. A real match means many hashes agree on the *same* time offset, not just total hash collision count. Match threshold: 18+ aligned hashes and ≥40% alignment ratio.
- Restartable state driven YouTube ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg, and GCS). Each video moves through status flags `pending`, `downloaded`, `fingerprinted`, and `deduped`, with upserts on every transition so a killed run resumes cleanly. Honest retrospective: Supabase was the wrong storage choice for fingerprint query patterns at scale, and Mason can articulate exactly why and what he'd reach for instead.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Functional internal tool

- Used **OpenClaw** (an earlier agent setup of mine) to map all **92 undocumented Teamworxs API endpoints** in a single agent session. That included the manager and owner routes I had no access to as a cook, with full request and response shapes for each. I used those to reverse-engineer the entire Teamworxs app (both the employee side and the manager schedule editor) as a **transparent client over Teamworxs's actual backend**: you log into Staffclaw with your existing Teamworxs credentials, and every read and write proxies through Teamworxs's API on your own session cookie. The migration cost from Teamworxs to a finished Staffclaw would be zero. Log in with the credentials you already have, no data export, no company onboarding.
- Layered in external API integrations (Alamo Drafthouse public showtime and ticket data, weather, local events data, and a history analyzer over past shifts) as **input signals for an auto scheduler**. Restaurant and movie theater scheduling is genuinely hard because demand depends on weather, showtimes, sold out screenings, and local events. None of those signals are in Teamworxs. The auto scheduler is the project's hardest unsolved problem and the reason the multi source data layer exists at all. Full stack TypeScript monorepo (Express 5, React 19, Drizzle and Postgres, shared types). Paused when VTR took priority.

---

## Skills

**Agent directed development:** Claude Code, Codex. Primary daily tools. Direct agents to produce production code, review and own every decision.

**Languages:** TypeScript, Python, JavaScript, SQL, HTML/CSS

**Frontend:** React 19, Vite, React Router, TipTap, Playwright, Vitest

**Backend:** Node.js, Express, Drizzle ORM, Postgres, Pino, session auth

**AI / ML:** OpenAI Responses API (GPT-5.4 and GPT-5.4-mini tiered use, strict structured outputs, tool calling, vision input), human verification gate design, PyTorch, librosa, custom audio fingerprinting, spectrogram processing, CNN training on real datasets, GCP GPU training

**Cloud / infra:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage), zero downtime Postgres migrations, Cloud Build CI/CD

**Other:** Reverse-engineering undocumented APIs (mapped 92 endpoints across two sites in one agent session), Puppeteer scraping, Drizzle migration journaling, Sharp image preprocessing, Kraken OCR, Flask

---

## Education

**UNC Chapel Hill AI Bootcamp** — May–December 2024
- Final project: trained a PyTorch CNN to transcribe piano audio into MIDI in real time on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of the post-bootcamp period by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 – March 2026). Quit in March 2026 to focus full-time on engineering and delivered the majority of VTR's production work in the roughly three most productive weeks that followed.
