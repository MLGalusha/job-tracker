# Mason Galusha

masonlgalusha.careers@gmail.com | 304-546-5850 | Raleigh, NC
github.com/MLGalusha | linkedin.com/in/masonlgalusha | voicesthatremain.com

## Summary

I am a self-taught developer with deep Python and TypeScript experience who builds production backend systems. I wrote 14,000 lines of Python by hand before switching to agent directed development, and I ship end to end from database design to deployment. I integrate AI features into real products using the OpenAI API with structured outputs and human verification workflows. I am looking for a backend role on a small team where my work has direct impact.

## Selected Projects

### SonicGen — Audio Fingerprinting Engine
14,000 LOC Python | Written entirely by hand | github.com/MLGalusha/SonicGen

- Wrote a Shazam style audio fingerprinting and dedup engine from scratch in Python with zero agent assistance.
- Built a restartable state driven YouTube ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg, GCS) with status flags and upserts on every transition so a killed run resumes cleanly.
- Spectral peak detection via scipy, constellation hashing (SHA1), and alignment offset matching as the core dedup logic.

### Voices That Remain — Digital Archive with AI Pipeline
58,700 LOC TypeScript | 547 commits | voicesthatremain.com

- Designed and shipped a digital archive for historical personal letters, built solo with coding agents. Full backend: Express, Drizzle ORM, Postgres, session auth, Pino logging.
- Built a multi stage AI pipeline using GPT-5.4 with structured outputs, tool calling, and vision. A human confirms every step before anything goes public.
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. Zero downtime Postgres migrations via Drizzle migration journal.

### PianoTranscriber — ML Audio Transcription
About 30,000 LOC Python | PyTorch CNN | 100GB MAESTRO dataset

- Trained a convolutional neural network to transcribe piano audio into MIDI in real time on GCP GPU VMs.
- Custom spectrogram preprocessing at 11 ms resolution, sliding window architecture. Full pipeline end to end.

### Staffclaw — Full Stack Scheduling Platform
TypeScript | React 19 | Express | Postgres | github.com/MLGalusha/staffclaw

- Reverse-engineered 92 undocumented API endpoints from an existing scheduling platform in a single agent session.
- Built a transparent client over the existing backend with external data integrations for weather, showtimes, and local events.

## Skills

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS
**Backend:** Node.js, Express, Drizzle ORM, Postgres, Flask, Pino, session auth
**AI/ML:** OpenAI API (GPT-5.4, structured outputs, tool calling, vision), PyTorch, librosa, custom audio fingerprinting
**Frontend:** React 19, Vite, React Router, Playwright, Vitest
**Cloud:** GCP (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)
**Development:** Agent directed development (Claude Code, Codex), Git

## Education

**AI/ML Bootcamp** — UNC Chapel Hill (May 2024 - Dec 2024)
Final project: trained a PyTorch CNN on the MAESTRO dataset using GCP GPU VMs.
Prior: Harvard CS50 (2023).
