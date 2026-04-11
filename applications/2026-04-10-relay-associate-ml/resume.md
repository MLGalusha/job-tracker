# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

Self-taught ML engineer with deep audio processing experience across three shipped projects. I trained a PyTorch CNN from scratch on 100 GB of real audio data, wrote a 14,000 line audio fingerprinting engine by hand in Python, and shipped a production AI pipeline on GCP (voicesthatremain.com). I build primarily by directing coding agents, but I coded by hand for a full year first because I wanted to understand the code before I let agents write it. Looking for an associate ML role where I can apply audio and ML skills to a real product.

---

## Selected projects

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch to transcribe piano audio into MIDI on the MAESTRO dataset (200 hours, roughly 100 GB preprocessed). Custom spectrogram preprocessing at 16 kHz / 11 ms resolution, sliding window architecture (240 frames in, predict middle 80, 88-key output). Out-of-core batching across 130 Parquet chunks to handle dataset size.
- Full end to end pipeline: audio to spectrogram to CNN inference to piano roll to MIDI to sheet music via MuseScore. Trained on GCP GPU VMs. UNC Chapel Hill AI Bootcamp final project.

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch in Python: log-power STFT spectrograms, 80-500 Hz speech band limiting, spectral peak detection via `scipy.ndimage.maximum_filter`, constellation hashing (fan value 3, max delta-t 400, SHA1[:20]).
- Alignment-offset matching as the core correctness insight: real matches show many hashes agreeing on the same time offset, not just total collision count. Threshold: 18+ aligned hashes at 40%+ alignment ratio.
- Restartable YouTube ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg). Status flag driven state machine with clean resume on crash.

### Voices That Remain — 2026
**voicesthatremain.com** · Production AI pipeline · TypeScript/Python · GCP

- Built a 4-stage AI pipeline on the OpenAI Responses API for digitizing handwritten letters: GPT-5.4 Vision for transcription with Sharp image preprocessing, strict structured outputs with Zod validation for metadata extraction, tool calling for entity resolution, and cost-tiered model selection.
- Designed a human verification gate between transcription and metadata extraction. Per-document-type prompts handle letters, envelopes, telegrams, and photos differently.
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 58,700 lines of TypeScript, 547 commits, 20 database tables, 46 Playwright E2E tests.

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full stack scheduling tool

- Mapped 92 undocumented API endpoints across two services in a single agent session. Reverse-engineered the full scheduling app as a transparent client.
- Full stack TypeScript (Express 5, React 19, Drizzle, Postgres).

---

## Skills

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS

**ML / Audio:** PyTorch (CNN training on real datasets), librosa, scipy, spectrogram processing, audio fingerprinting, STFT, peak detection, constellation hashing, GCP GPU training

**AI / LLM:** OpenAI Responses API (GPT-5.4/5.4-mini, strict structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, cost-tiered model selection

**Agent-directed development:** Claude Code, Cursor, Codex. Primary daily methodology.

**Backend:** Node.js, Express, Drizzle ORM, Postgres, REST API design

**Frontend:** React 19, Vite, React Router, Playwright, Vitest

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage, GPU VMs)

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Final project: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of building by working full time as a cook at Alamo Drafthouse in Raleigh (late 2024 - March 2026). Quit in March 2026 to focus on engineering full time and shipped VTR's production pipeline in the three weeks that followed.
