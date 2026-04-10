# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

I build AI-powered products from zero to production using agent-directed development as my primary methodology. Claude Code is my daily tool for shipping software. I have built 4 substantial projects in 18 months, including a production AI pipeline with structured outputs, tool calling, vision, and human-in-the-loop workflows on GCP. I am looking for a role where I can help startups build real products with Claude.

---

## Selected Projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production AI pipeline · TypeScript/Python · GCP

- Built a 4-stage AI pipeline using GPT-5.4 with structured outputs, tool calling, and vision for digitizing handwritten historical letters
- Designed human-in-the-loop verification gates for non-technical users. Guillemet tagging marks uncertain text so reviewers focus where the model is least confident. Per-document-type prompts handle letters, envelopes, telegrams, and photos differently
- Cost-tiered model selection routes between GPT-5.4 and GPT-5.4-mini based on document complexity
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 58,700 LOC, 547 commits, 46 Playwright E2E tests. Shipped 90% in a 3-week sprint

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: log-power STFT spectrograms, spectral peak detection, constellation hashing, alignment-offset matching
- Restartable YouTube ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg). Status-flag-driven state machine with clean resume on crash
- Proves deep fluency and the ability to own complex systems solo

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Reverse-engineered 92 undocumented API endpoints across two services. Built a transparent proxy client on top of an existing platform
- Integrated external data sources as input signals for an auto-scheduler. Full stack TypeScript (Express 5, React 19, Drizzle, Postgres)

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch on the MAESTRO dataset (200 hours, ~100 GB) to transcribe piano audio into MIDI
- Full pipeline: audio to spectrogram to CNN to MIDI to sheet music. UNC Chapel Hill AI Bootcamp capstone

---

## Skills

**Agent-directed development:** Claude Code (daily primary tool), Cursor, Codex. Direct agents to produce production code, review and own every decision.

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS

**AI / ML:** OpenAI Responses API (GPT-5.4/5.4-mini, structured outputs, tool calling, vision), HITL pipeline design, prompt engineering, cost-tiered model selection, PyTorch

**Backend:** Node.js, Express, Drizzle ORM, Postgres, REST API design

**Frontend:** React 19, Vite, React Router, Playwright, Vitest

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs

---

## Background Note

I am a self-taught developer with no CS degree. I wrote all code by hand through 2025 to build deep fluency before adopting agent-directed development in January 2026. I understand the code agents produce because I wrote it myself first.
