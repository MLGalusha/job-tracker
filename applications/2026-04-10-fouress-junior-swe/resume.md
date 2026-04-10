# Mason Galusha

masonlgalusha.careers@gmail.com | 304-546-5850 | Raleigh, NC
github.com/MLGalusha | linkedin.com/in/masonlgalusha | voicesthatremain.com

## Summary

I am a self-taught Python and TypeScript developer who ships production systems with AI features end to end. I wrote 14,000 lines of Python by hand before switching to agent directed development, and I deploy on GCP with full CI/CD pipelines. I build products powered by LLMs using the OpenAI API with structured outputs and human verification workflows. I am looking for a development role where I can contribute Python and cloud experience from day one.

## Selected Projects

### SonicGen — Audio Fingerprinting Engine
14,000 LOC Python | Written entirely by hand | github.com/MLGalusha/SonicGen

- Wrote a Shazam style audio fingerprinting and dedup engine from scratch in Python with zero agent assistance.
- Built a restartable state driven ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg, GCS) with status flags and upserts on every transition.
- Spectral peak detection via scipy, constellation hashing (SHA1), and alignment offset matching as the core dedup logic.

### Voices That Remain — Digital Archive with AI Pipeline
58,700 LOC TypeScript | 547 commits | voicesthatremain.com

- Designed and shipped a digital archive for historical personal letters with a multi stage AI pipeline using GPT-5.4 (structured outputs, tool calling, vision).
- Backend: Express, Drizzle ORM, Postgres, session auth. A human confirms every pipeline step before anything goes public.
- Deployed on GCP: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. Zero downtime Postgres migrations.

### PianoTranscriber — ML Audio Transcription
About 30,000 LOC Python | PyTorch CNN | 100GB MAESTRO dataset

- Trained a convolutional neural network to transcribe piano audio into MIDI in real time on GCP GPU VMs.
- Custom spectrogram preprocessing at 11 ms resolution, sliding window architecture.

### Staffclaw — Full Stack Scheduling Platform
TypeScript | React 19 | Express | Postgres | github.com/MLGalusha/staffclaw

- Reverse-engineered 92 undocumented API endpoints from an existing scheduling platform in a single agent session.
- Built a full stack replacement with external data integrations for weather, showtimes, and local events.

## Skills

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS
**Backend:** Node.js, Express, Drizzle ORM, Postgres, Flask
**AI/ML:** OpenAI API (GPT-5.4, structured outputs, tool calling, vision), PyTorch, human verification gate design
**Frontend:** React 19, Vite, React Router, Playwright, Vitest
**Cloud:** GCP (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)
**Development:** Agent directed development (Claude Code, Codex), Git

## Education

**AI/ML Bootcamp** — UNC Chapel Hill (May 2024 - Dec 2024)
Final project: trained a PyTorch CNN on the MAESTRO dataset using GCP GPU VMs.
Prior: Harvard CS50 (2023).
