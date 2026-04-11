# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Self-taught full stack engineer who builds production TypeScript applications with real infrastructure. I shipped a 58,700-line production app with 20 database tables, 46 E2E tests, and a Cloud Build CI/CD pipeline. I also reverse-engineered 92 undocumented API endpoints to build a transparent proxy architecture. Looking for a platform engineering role where I build the shared infrastructure that other teams depend on.

---

## Selected projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production digital archive · TypeScript · GCP

- Built a full stack application for digitizing 10,000 handwritten family letters. 4-stage AI pipeline using the OpenAI Responses API: GPT-5.4 Vision transcription, human-in-the-loop verification, structured metadata extraction with Zod schemas, and entity resolution across the full collection.
- **Platform infrastructure:** 20 database tables with Drizzle ORM and Postgres, zero-downtime schema migrations, session auth, role-based access, Pino structured logging. Cloud Run deployment with Cloud SQL and Cloud Build CI/CD.
- 58,700 lines of TypeScript, 547 commits, 46 Playwright E2E tests. Shipped 90% of production work in a 3-week sprint.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Mapped **92 undocumented API endpoints** across two services in a single agent session. Reverse-engineered the full employee and manager scheduling app as a transparent client: users log in with existing credentials, every read/write proxies through the real API.
- Integrated external data sources (showtimes, weather, local events, historical shifts) as input signals for an auto-scheduler. Full-stack TypeScript (Express 5, React 19, Drizzle, Postgres).

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: log-power STFT spectrograms, spectral peak detection, constellation hashing. Restartable YouTube ingestion pipeline with crash recovery and status-flag state machine.

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch on the MAESTRO dataset (200 hours, roughly 100 GB preprocessed). Full pipeline: audio to spectrogram to CNN inference to MIDI to sheet music. UNC Chapel Hill AI Bootcamp capstone.

---

## Skills

**Frontend:** React 19, Vite, React Router, TipTap rich text editor, Playwright E2E testing, Vitest

**Backend:** Node.js, Express 5, Drizzle ORM, Postgres, Pino structured logging, session auth, REST API design, zero-downtime migrations

**AI / ML:** OpenAI Responses API (GPT-5.4/5.4-mini, structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, PyTorch

**Languages:** TypeScript, Python, JavaScript, SQL, HTML/CSS

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage)

**Agent-directed development:** Claude Code, Cursor, Codex. Primary daily methodology.

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of building by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 - March 2026). Quit in March 2026 to focus on engineering full-time and shipped VTR's production pipeline in the three weeks that followed.
