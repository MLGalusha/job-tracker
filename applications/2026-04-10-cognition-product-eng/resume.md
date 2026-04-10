# Mason Galusha

masonlgalusha.careers@gmail.com | 304-546-5850 | Raleigh, NC
github.com/MLGalusha | linkedin.com/in/masonlgalusha | voicesthatremain.com

## Summary

I am a self-taught full stack developer who builds AI-powered products and ships them to production. I deployed a 4-stage AI pipeline with structured outputs, tool calling, and human-in-the-loop workflows on GCP. I use AI coding agents daily as my primary development method and wrote 14,000 lines of Python by hand before switching, so I have deep intuition for how agent-directed development works and where it breaks down. I am looking for a product engineering role building AI tools for developers.

## Selected Projects

### Voices That Remain -- Digital Archive with Deployed AI Pipeline
58,700 LOC TypeScript | 547 commits | Live at voicesthatremain.com

- Built a 4-stage AI pipeline on the OpenAI Responses API: GPT-5.4 Vision for transcription, strict structured outputs with Zod validation for metadata extraction, tool calling for entity resolution, cost-tiered model selection
- Designed human-in-the-loop review workflows so non-technical stakeholders can validate AI outputs before they reach production
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 46 Playwright E2E tests.
- Full stack: React 19 frontend, Express API, Postgres with Drizzle ORM, 20 database tables

### Staffclaw -- Full Stack Scheduling Platform
TypeScript | React 19 | Express | Postgres

- Reverse-engineered 92 API endpoints from an existing scheduling platform to understand its data model and workflows
- Built a complete full stack replacement with integrated external data sources (showtimes, weather, local events) as input signals for an auto-scheduler
- Product decision: built as a transparent client so users log in with existing credentials and every read/write proxies through the real API

### SonicGen -- Audio Fingerprinting Engine
14,000 LOC Python | Written entirely by hand

- Built a Shazam-style audio fingerprinting system from scratch in Python with zero agent assistance
- Restartable YouTube ingestion pipeline with status flag driven state machine and clean resume on crash

### PianoTranscriber -- ML Audio Transcription
PyTorch CNN | 100GB MAESTRO dataset

- Trained a CNN from scratch in PyTorch to transcribe piano audio into MIDI on 200 hours of data
- Full end to end pipeline: audio to spectrogram to CNN inference to piano roll to MIDI to sheet music

## Skills

**Languages:** Python, TypeScript, JavaScript, SQL
**AI/LLM:** OpenAI Responses API (GPT-5.4/5.4-mini, structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, cost-tiered model selection
**Frontend:** React 19, Vite, Playwright, Vitest
**Backend:** Node.js, Express, Drizzle ORM, Postgres
**Infrastructure:** GCP (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)
**Development:** Agent-directed development (Claude Code, Cursor), Git

## Education

**AI/ML Bootcamp** -- UNC Chapel Hill (May 2024 - Dec 2024)
Covered machine learning fundamentals, neural networks, PyTorch, and applied AI development.

## Background Note

I am a self-taught developer with no CS degree. I wrote all code by hand through 2025 to build deep fluency before adopting agent-directed development in January 2026. I use AI coding agents as my primary development method and understand the workflow from the user side. Open to relocation for the right role.
