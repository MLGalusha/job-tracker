# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

I build and deploy AI-powered products end to end, and I use Claude Code as my primary development tool every day. I shipped a production 4-stage AI pipeline with structured outputs, tool calling, vision, and human-in-the-loop workflows on GCP. I wrote 14,000 lines of Python by hand before switching to agent-directed development, so I debug and direct AI-generated code with the same confidence as my own. I am looking for a forward-deployed role where I can help enterprise customers build real solutions with Claude.

---

## Selected Projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production AI pipeline · TypeScript/Python · GCP

- Built a 4-stage AI pipeline using GPT-5.4 with structured outputs, tool calling, and vision for digitizing handwritten historical letters
- Designed human-in-the-loop verification gates so non-technical stakeholders can validate AI outputs before they reach production. Guillemet tagging marks uncertain text so reviewers focus where the model is least confident
- Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build CI/CD, Cloud Storage. 58,700 lines of TypeScript, 547 commits, 20 database tables, 46 Playwright E2E tests
- Shipped the majority of production work in a 3-week sprint, solo

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Reverse-engineered 92 undocumented API endpoints across two services in a single agent session. Built a transparent client where users log in with existing credentials and every read/write proxies through the real API
- Integrated external data sources (showtimes, weather, local events, historical shifts) as input signals for an auto-scheduler. Full stack TypeScript (Express 5, React 19, Drizzle, Postgres)
- Demonstrates the analytical, drop-in-and-figure-it-out approach required when deploying into a customer's existing environment

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: spectrograms, peak detection, constellation hashing, alignment-offset matching
- Proves deep Python fluency and the ability to own complex systems solo without AI assistance

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch in PyTorch on the MAESTRO dataset (200 hours, ~100 GB preprocessed) to transcribe piano audio into MIDI
- Full pipeline: audio to spectrogram to CNN inference to piano roll to MIDI to sheet music. UNC Chapel Hill AI Bootcamp capstone

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

I am a self-taught developer with no CS degree. I wrote all code by hand through 2025 to build deep fluency before adopting agent-directed development in January 2026. When dropped into an unfamiliar codebase or customer environment, I read and reason about the code directly rather than relying on tooling to abstract it away.
