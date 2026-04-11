# Mason Galusha

masonlgalusha.careers@gmail.com | 304-546-5850 | Raleigh, NC
github.com/MLGalusha | linkedin.com/in/masonlgalusha | voicesthatremain.com

## Summary

I am a self-taught developer with deep Python experience who builds data pipelines and backend systems end to end. I have processed 100GB of audio data through custom preprocessing pipelines, trained neural networks on GCP GPUs, and shipped production AI features with structured outputs and human verification workflows. I coded 14,000 lines of Python by hand before switching to agent directed development, so I debug and review generated code with confidence. I am looking for a backend role where I can build data services infrastructure on a small team.

## Selected Projects

### SonicGen — Audio Fingerprinting Engine
14,000 LOC Python | Written entirely by hand | github.com/MLGalusha/SonicGen

- Wrote a Shazam style audio fingerprinting and dedup engine from scratch in Python with zero agent assistance.
- Built a restartable state driven ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg, GCS) with status flags (`pending`, `downloaded`, `fingerprinted`, `deduped`) and upserts on every transition so a killed run resumes cleanly.
- Signal processing pipeline: log power STFT spectrograms at 16 kHz, 80 to 500 Hz speech band limiting, spectral peak detection via scipy, constellation hashing (SHA1), and alignment offset matching for dedup.

### PianoTranscriber — ML Audio Transcription
About 30,000 LOC Python | PyTorch CNN | 100GB MAESTRO dataset

- Trained a convolutional neural network to transcribe piano audio into MIDI in real time on GCP GPU VMs.
- Custom spectrogram preprocessing at 11 ms resolution, sliding window architecture (240 frame input, 80 frame overlap). Full pipeline: audio to spectrogram to CNN to MIDI to sheet music.

### Voices That Remain — Digital Archive with AI Pipeline
58,700 LOC TypeScript | 547 commits | voicesthatremain.com

- Designed and shipped a digital archive for historical personal letters with a multi stage AI pipeline using GPT-5.4 (structured outputs, tool calling, vision).
- Backend: Express, Drizzle ORM, Postgres, session auth. Deployed on GCP: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage.
- A human confirms every pipeline step before anything goes public.

### Staffclaw — Full Stack Scheduling Platform
TypeScript | React 19 | Express | Postgres | github.com/MLGalusha/staffclaw

- Reverse-engineered 92 undocumented API endpoints from an existing scheduling platform in a single agent session.
- Built external data integrations for weather, showtimes, and local events as input signals for an auto scheduler.

## Skills

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS
**Data/ML:** PyTorch, librosa, scipy, custom audio fingerprinting, spectrogram processing, CNN training on GCP GPUs
**AI Integration:** OpenAI API (GPT-5.4, structured outputs, tool calling, vision), human verification gate design
**Backend:** Node.js, Express, Drizzle ORM, Postgres, Flask
**Cloud:** GCP (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)
**Development:** Agent directed development (Claude Code, Codex), Git

## Education

**AI/ML Bootcamp** — UNC Chapel Hill (May 2024 - Dec 2024)
Final project: trained a PyTorch CNN on the MAESTRO dataset using GCP GPU VMs.
Prior: Harvard CS50 (2023).
