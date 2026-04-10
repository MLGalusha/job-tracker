# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Self-taught full stack engineer with deep signal processing experience. I built three projects that process raw signal data through multi-stage pipelines: a CNN trained on 100GB of audio spectrograms, an audio fingerprinting engine with spectral peak detection and constellation hashing, and a production vision pipeline that preprocesses and transcribes 10,000 handwritten document images. Looking for a small-team role where I build the full software stack around complex data processing.

---

## Selected projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production digital archive · TypeScript/Python · GCP

- Built a multi-stage AI pipeline for digitizing handwritten family letters: Sharp image preprocessing, GPT-5.4 Vision transcription, structured metadata extraction with Zod validation, entity resolution across the full collection. Cost-tiered model selection routes documents to the appropriate model based on complexity.
- Designed a **human-in-the-loop verification gate** between processing stages. Guillemet tagging marks uncertain regions so reviewers focus where the model is least confident.
- 58,700 lines of TypeScript, 547 commits, 20 database tables, 46 Playwright E2E tests. Deployed on GCP: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage.

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch to transcribe piano audio into MIDI on the **MAESTRO dataset (200 hours, roughly 100 GB preprocessed)**. Custom spectrogram preprocessing at 16 kHz / 11 ms resolution, sliding window architecture (240 frames in, predict middle 80, 88-key output).
- Out-of-core batching across 130 Parquet chunks to handle dataset size. Full end-to-end pipeline: audio to spectrogram to CNN inference to piano roll to MIDI to sheet music. Trained on GCP GPU VMs.

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: log-power STFT spectrograms, 80-500 Hz speech band limiting, spectral peak detection via `scipy.ndimage.maximum_filter`, constellation hashing (fan value 3, max delta-t 400, SHA1[:20]).
- Alignment-offset matching: real matches show many hashes agreeing on the same time offset, not just total collision count. Restartable YouTube ingestion pipeline with crash recovery.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Mapped **92 undocumented API endpoints** across two services. Built a transparent proxy client for a scheduling platform. Integrated external data sources as auto-scheduler inputs. Full-stack TypeScript (Express 5, React 19, Drizzle, Postgres).

---

## Skills

**Signal processing:** Spectrogram computation (librosa, scipy), spectral peak detection, constellation hashing, audio fingerprinting, image preprocessing (Sharp), FFmpeg

**AI / ML:** OpenAI Responses API (GPT-5.4/5.4-mini, structured outputs, tool calling, vision), PyTorch (CNN training on 100GB dataset, GCP GPUs), HITL pipeline design, prompt engineering

**Full stack:** React 19, Vite, Express 5, Drizzle ORM, Postgres, Playwright E2E testing, Pino logging, session auth

**Languages:** TypeScript, Python, JavaScript, SQL, HTML/CSS

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage, GPU VMs)

**Agent-directed development:** Claude Code, Cursor, Codex. Primary daily methodology.

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of building by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 - March 2026). Quit in March 2026 to focus on engineering full-time and shipped VTR's production pipeline in the three weeks that followed.
