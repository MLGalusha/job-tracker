# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Self-taught ML engineer who trains models on real datasets and builds the full pipeline around them. I trained a PyTorch CNN from scratch on 100GB of audio data with out-of-core batching, custom spectrogram preprocessing, and GCP GPU infrastructure. I also built a production AI pipeline that processes 10,000 documents through GPT-5.4 Vision with structured output validation. Looking for an ML role where I own the full lifecycle from data to deployment.

---

## Selected projects

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch to transcribe piano audio into MIDI on the **MAESTRO dataset (200 hours, roughly 100 GB preprocessed)**. Custom spectrogram preprocessing at 16 kHz / 11 ms resolution, sliding window architecture (240 frames in, predict middle 80, 88-key output).
- **Out-of-core batching** across 130 Parquet chunks to handle dataset size on constrained hardware. Full end-to-end pipeline: audio to spectrogram to CNN inference to piano roll to MIDI to sheet music via MuseScore.
- Trained on GCP GPU VMs. UNC Chapel Hill AI Bootcamp capstone.

### Voices That Remain — 2026
**voicesthatremain.com** · Production AI pipeline · TypeScript/Python · GCP

- Built a multi-stage AI pipeline on the OpenAI Responses API for digitizing handwritten family letters: GPT-5.4 Vision for transcription with Sharp image preprocessing, strict structured outputs with Zod validation for metadata extraction, tool calling for entity resolution, and cost-tiered model selection.
- Designed a **human-in-the-loop verification gate** between transcription and metadata extraction. Per-document-type prompts handle letters, envelopes, telegrams, and photos differently.
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 58,700 lines of TypeScript, 547 commits, 20 database tables, 46 Playwright E2E tests.

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: log-power STFT spectrograms, spectral peak detection via `scipy.ndimage.maximum_filter`, constellation hashing (SHA1[:20]).
- Alignment-offset matching as the core correctness insight: real matches show many hashes agreeing on the same time offset, not just total collision count. Restartable YouTube ingestion pipeline with crash recovery.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Mapped **92 undocumented API endpoints** across two services. Reverse-engineered a scheduling platform as a transparent proxy client. Integrated external data sources as input signals for an auto-scheduler. Full-stack TypeScript (Express 5, React 19, Drizzle, Postgres).

---

## Skills

**ML / AI:** PyTorch (CNN training on 100GB dataset, GCP GPUs), OpenAI Responses API (GPT-5.4/5.4-mini, structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, cost-tiered model selection, spectrogram processing, audio fingerprinting

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS

**Data processing:** Out-of-core batching (Parquet), librosa, scipy, numpy, FFmpeg, custom preprocessing pipelines

**Backend:** Node.js, Express, Drizzle ORM, Postgres, REST API design

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage, GPU VMs)

**Agent-directed development:** Claude Code, Cursor, Codex. Primary daily methodology.

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of building by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 - March 2026). Quit in March 2026 to focus on engineering full-time and shipped VTR's production pipeline in the three weeks that followed.
