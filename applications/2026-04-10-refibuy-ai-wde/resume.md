# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Self-taught Python developer who builds data extraction and processing pipelines from scratch. I wrote a 14,000-line audio fingerprinting engine by hand, including a restartable YouTube ingestion pipeline with crash recovery. I also built a production AI pipeline that extracts structured metadata from 10,000 unstructured handwritten documents using GPT-5.4 Vision and strict schema validation. Looking for a role where reliable data extraction at scale is the core problem.

---

## Selected projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production AI pipeline · TypeScript/Python · GCP

- Built a multi-stage AI pipeline on the OpenAI Responses API for digitizing handwritten family letters: GPT-5.4 Vision for transcription with Sharp image preprocessing, strict structured outputs with Zod validation for metadata extraction, tool calling for entity resolution, and cost-tiered model selection (GPT-5.4 for complex documents, GPT-5.4-mini for simpler ones).
- Designed a **human-in-the-loop verification gate** between transcription and metadata extraction. Guillemet tagging marks uncertain text so reviewers focus where the model is least confident.
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 58,700 lines of TypeScript, 547 commits, 20 database tables, 46 Playwright E2E tests.

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: log-power STFT spectrograms, 80-500 Hz speech band limiting, spectral peak detection via `scipy.ndimage.maximum_filter`, constellation hashing (fan value 3, max delta-t 400, SHA1[:20]).
- **Restartable YouTube ingestion pipeline** (YouTube Data API v3, yt-dlp, FFmpeg). Status-flag-driven state machine with clean resume on crash. Handles rate limiting, transient failures, and partial progress without losing work.
- Alignment-offset matching as the core correctness insight: real matches show many hashes agreeing on the same time offset, not just total collision count.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Mapped **92 undocumented API endpoints** across two services in a single agent session. Reverse-engineered the full employee and manager scheduling app as a transparent client: users log in with existing credentials, every read/write proxies through the real API.
- Integrated external data sources (showtimes, weather, local events, historical shifts) as input signals for an auto-scheduler. Full-stack TypeScript (Express 5, React 19, Drizzle, Postgres).

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch to transcribe piano audio into MIDI on the **MAESTRO dataset (200 hours, roughly 100 GB preprocessed)**. Custom spectrogram preprocessing at 16 kHz / 11 ms resolution. Trained on GCP GPU VMs. UNC Chapel Hill AI Bootcamp capstone.

---

## Skills

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS

**Data extraction & processing:** Web API integration, YouTube Data API v3, structured output extraction (Zod schemas), audio signal processing (librosa, scipy, FFmpeg), restartable ingestion pipelines, status-flag state machines

**AI / ML:** OpenAI Responses API (GPT-5.4/5.4-mini, strict structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, PyTorch (CNN training on real datasets), spectrogram processing, audio fingerprinting

**Backend:** Node.js, Express, Drizzle ORM, Postgres, REST API design

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)

**Agent-directed development:** Claude Code, Cursor, Codex. Primary daily methodology.

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of building by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 - March 2026). Quit in March 2026 to focus on engineering full-time and shipped VTR's production pipeline in the three weeks that followed.
