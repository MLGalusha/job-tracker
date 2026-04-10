# Mason Galusha

masonlgalusha.careers@gmail.com | 304-546-5850 | Raleigh, NC
github.com/MLGalusha | linkedin.com/in/masonlgalusha | voicesthatremain.com

## Summary

I am a self-taught full stack developer who ships production systems end to end, from database schema to cloud deployment. I set up and maintain my own GCP infrastructure including CI/CD, managed databases, and container deployments. I coded 14,000 lines of Python by hand before switching to agent directed development, so I understand the code my agents produce. I am looking for an infrastructure role on a small team where I can own systems and ship fast.

## Selected Projects

### Voices That Remain — Digital Archive with AI Pipeline
58,700 LOC TypeScript | 547 commits | voicesthatremain.com

- Designed and shipped a digital archive for historical personal letters, built solo with coding agents. TypeScript end to end: React 19, Express, Drizzle, Postgres.
- Deployed on Google Cloud from scratch: Cloud Run (backend and frontend containers), Cloud SQL (managed Postgres), Cloud Build (CI/CD pipeline triggered on push), Cloud Storage (archive bucket for letter images).
- Zero downtime Postgres migrations via Drizzle migration journal coordinated with the deploy pipeline.
- Built a multi stage AI pipeline using GPT-5.4 with structured outputs, tool calling, and vision. A human confirms every step before anything goes public.

### SonicGen — Audio Fingerprinting Engine
14,000 LOC Python | Written entirely by hand | github.com/MLGalusha/SonicGen

- Wrote a Shazam style audio fingerprinting and dedup engine from scratch in Python with zero agent assistance.
- Built a restartable state driven ingestion pipeline with status flags and upserts on every transition so a killed run resumes cleanly.

### Staffclaw — Full Stack Scheduling Platform
TypeScript | React 19 | Express | Postgres | github.com/MLGalusha/staffclaw

- Reverse-engineered 92 undocumented API endpoints from an existing scheduling platform in a single agent session.
- Built a full stack replacement with React frontend, Express backend, and external data integrations for weather, showtimes, and local events.

### PianoTranscriber — ML Audio Transcription
About 30,000 LOC Python | PyTorch CNN | 100GB MAESTRO dataset

- Trained a convolutional neural network to transcribe piano audio into MIDI in real time on GCP GPU VMs.

## Skills

**Languages:** TypeScript, Python, JavaScript, SQL, HTML/CSS
**Cloud/Infra:** GCP (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage), zero downtime Postgres migrations, CI/CD pipeline design
**Backend:** Node.js, Express, Drizzle ORM, Postgres, Flask, Pino, session auth
**Frontend:** React 19, Vite, React Router, Playwright, Vitest
**AI/ML:** OpenAI API (GPT-5.4, structured outputs, tool calling, vision), PyTorch, GCP GPU training
**Development:** Agent directed development (Claude Code, Codex), Git

## Education

**AI/ML Bootcamp** — UNC Chapel Hill (May 2024 - Dec 2024)
Final project: trained a PyTorch CNN on the MAESTRO dataset using GCP GPU VMs.
Prior: Harvard CS50 (2023).
