# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Self-taught AI engineer who ships production LLM systems end to end. I built a 4-stage AI pipeline with GPT-5.4 Vision, structured outputs, tool calling, cost-tiered model selection, and human verification gates, then deployed it on GCP in three weeks. I code by directing agents as my primary workflow, but I deliberately wrote 14,000 lines of Python by hand first so I'd understand the code before I let agents produce it. Looking for a founding-stage role where I build LLM infrastructure from scratch.

---

## Selected projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production AI pipeline · TypeScript/Python · GCP

- Built a multi-stage AI pipeline on the OpenAI Responses API for digitizing handwritten family letters: GPT-5.4 Vision for transcription with Sharp image preprocessing, strict structured outputs with Zod validation for metadata extraction, tool calling for entity resolution, and cost-tiered model selection (GPT-5.4 for complex documents, GPT-5.4-mini for simpler ones).
- Designed a **human-in-the-loop verification gate** between transcription and metadata extraction. Guillemet tagging marks uncertain text so reviewers focus where the model is least confident. Per-document-type prompts handle letters, envelopes, telegrams, and photos differently.
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 58,700 lines of TypeScript, 547 commits, 20 database tables, 46 Playwright E2E tests. Shipped 90% of production work in a 3-week sprint.

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: log-power STFT spectrograms, 80-500 Hz speech band limiting, spectral peak detection via `scipy.ndimage.maximum_filter`, constellation hashing (fan value 3, max delta-t 400, SHA1[:20]).
- Alignment-offset matching as the core correctness insight: real matches show many hashes agreeing on the same time offset, not just total collision count.
- Restartable YouTube ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg). Status-flag-driven state machine with clean resume on crash.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Mapped **92 undocumented API endpoints** across two services in a single agent session. Reverse-engineered the full employee and manager scheduling app as a transparent client: users log in with existing credentials, every read/write proxies through the real API.
- Integrated external data sources (showtimes, weather, local events, historical shifts) as input signals for an auto-scheduler. Full-stack TypeScript (Express 5, React 19, Drizzle, Postgres).

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch on the **MAESTRO dataset (200 hours, roughly 100 GB preprocessed)**. Custom spectrogram preprocessing, out-of-core batching across 130 Parquet chunks. Full pipeline: audio to spectrogram to CNN inference to MIDI to sheet music. UNC Chapel Hill AI Bootcamp capstone.

---

## Skills

**AI / ML:** OpenAI Responses API (GPT-5.4/5.4-mini, strict structured outputs, tool calling, vision), HITL pipeline design, prompt engineering (zero-shot, few-shot, chain-of-thought), cost-tiered model selection, PyTorch (CNN training on real datasets), spectrogram processing

**Agent-directed development:** Claude Code, Cursor, Codex. Primary daily methodology. Direct agents to produce production code, review and own every decision.

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS

**Backend:** Node.js, Express, Drizzle ORM, Postgres, Pino, session auth, REST API design

**Frontend:** React 19, Vite, React Router, TipTap, Playwright, Vitest

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage, GPU VMs)

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of building by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 - March 2026). Quit in March 2026 to focus on engineering full-time and shipped VTR's production pipeline in the three weeks that followed.
