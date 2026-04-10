# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Self-taught full stack developer with production AI pipeline experience. I built a 58,700-line TypeScript application with a 4-stage AI pipeline using GPT-5.4 Vision, structured outputs, and tool calling, deployed on GCP. I also trained a PyTorch CNN from scratch on 100GB of audio data. Looking for a full stack role where I can contribute AI integration skills and grow as a professional engineer.

---

## Selected projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production digital archive · TypeScript/Python · GCP

- Built a full stack application with a multi-stage AI pipeline on the OpenAI Responses API: GPT-5.4 Vision transcription, structured metadata extraction with Zod validation, entity resolution via tool calling, and cost-tiered model selection.
- Designed a **human-in-the-loop verification gate** between pipeline stages. Per-document-type prompts handle letters, envelopes, telegrams, and photos differently.
- 58,700 lines of TypeScript, 547 commits, 20 database tables (Drizzle ORM, Postgres), 46 Playwright E2E tests. Deployed on GCP: Cloud Run, Cloud SQL, Cloud Build CI/CD.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Mapped **92 undocumented API endpoints** across two services. Reverse-engineered a scheduling platform as a transparent proxy client: users log in with existing credentials, every read/write proxies through the real API.
- Integrated external data sources (showtimes, weather, local events, historical shifts) as input signals for an auto-scheduler. Full-stack TypeScript (Express 5, React 19, Drizzle, Postgres).

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch. Restartable YouTube ingestion pipeline with crash recovery. 14,000 lines of Python with no coding agents or copilot.

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch on the **MAESTRO dataset (200 hours, roughly 100 GB preprocessed)**. Full pipeline: audio to spectrogram to CNN inference to MIDI to sheet music. UNC Chapel Hill AI Bootcamp capstone.

---

## Skills

**Frontend:** React 19, Vite, React Router, TipTap, Playwright E2E testing, Vitest

**Backend:** Node.js, Express 5, Drizzle ORM, Postgres, Pino logging, session auth, REST API design

**AI / ML:** OpenAI Responses API (GPT-5.4/5.4-mini, structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, PyTorch (CNN training), cost-tiered model selection

**Languages:** TypeScript, Python, JavaScript, SQL, HTML/CSS

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage)

**Agent-directed development:** Claude Code, Cursor, Codex

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of building by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 - March 2026). Quit in March 2026 to focus on engineering full-time and shipped VTR's production pipeline in the three weeks that followed.
