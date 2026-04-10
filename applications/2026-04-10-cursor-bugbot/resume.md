# Mason Galusha

masonlgalusha.careers@gmail.com | 304-546-5850 | Raleigh, NC
github.com/MLGalusha | linkedin.com/in/masonlgalusha | voicesthatremain.com

## Summary

I am a self-taught developer who builds AI agent systems with structured outputs and validation pipelines. I shipped a 4-stage AI pipeline on GCP that uses GPT-5.4 with vision, tool calling, and human verification gates. I wrote 14,000 lines of Python by hand before switching to agent-directed development in Cursor and Claude Code, so I understand codebases at the level needed to reason about bugs in them. I am looking for a role building AI agents that analyze and improve code.

## Selected Projects

### Voices That Remain -- Digital Archive with Deployed AI Pipeline
58,700 LOC TypeScript | 547 commits | Live at voicesthatremain.com

- Built a 4-stage AI pipeline on the OpenAI Responses API: GPT-5.4 Vision for transcription with Sharp image preprocessing, strict structured outputs with Zod validation for metadata extraction, tool calling for entity resolution, and cost-tiered model selection
- Designed a human verification gate between transcription and metadata extraction. Guillemet tagging marks uncertain text so reviewers focus where the model is least confident
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 46 Playwright E2E tests.
- Full stack: React 19, Express, Postgres with Drizzle ORM, 20 database tables

### SonicGen -- Audio Fingerprinting Engine
14,000 LOC Python | Written entirely by hand

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: log-power STFT spectrograms, spectral peak detection via scipy.ndimage.maximum_filter, constellation hashing
- Alignment-offset matching as the core correctness insight: real matches show many hashes agreeing on the same time offset, not just total collision count
- Restartable YouTube ingestion pipeline with status flag driven state machine and clean resume on crash

### Staffclaw -- Full Stack Scheduling Platform
TypeScript | React 19 | Express | Postgres

- Reverse-engineered 92 API endpoints from an existing scheduling platform in a single agent session
- Built a complete full stack replacement translating domain-specific business logic into clean architecture

### PianoTranscriber -- ML Audio Transcription
PyTorch CNN | 100GB MAESTRO dataset

- Trained a CNN from scratch in PyTorch to transcribe piano audio into MIDI on 200 hours of data
- Custom spectrogram preprocessing at 16 kHz / 11 ms resolution, sliding window architecture

## Skills

**Languages:** Python, TypeScript, JavaScript, SQL
**AI/LLM:** OpenAI Responses API (GPT-5.4/5.4-mini, strict structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, cost-tiered model selection, validation architecture
**Backend:** Node.js, Express, Drizzle ORM, Postgres
**Frontend:** React 19, Playwright, Vitest
**Infrastructure:** GCP (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)
**Development:** Agent-directed development (Cursor, Claude Code), Git

## Education

**AI/ML Bootcamp** -- UNC Chapel Hill (May 2024 - Dec 2024)
Covered machine learning fundamentals, neural networks, PyTorch, and applied AI development.

## Background Note

I am a self-taught developer with no CS degree. I wrote all code by hand through 2025 to build deep fluency before adopting agent-directed development in January 2026. I use Cursor daily and understand the product from the user side.
