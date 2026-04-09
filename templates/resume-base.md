# Resume base — the master "everything I could say"

**Purpose:** This is the source material for every tailored resume. The `resume-tailor` skill reads this file, `profile/voice.md`, and the target `role.md`, then produces a tailored resume for a specific application. This file is the max-volume version — every tailored resume is a *subset* and a *reordering* of what's in here.

**Rule:** Nothing in a tailored resume may be *stronger* than what's claimed here. If a tailored draft would overclaim beyond this file, either add evidence to the profile (if it's true) or don't make the claim.

**Format:** markdown, single-column, one-page target. Tailored resumes may exceed one page if the role is senior and the hiring bar requires more evidence, but default to one page.

---

# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

*(Tailored per role. Default version below. Swap/reorder for each application.)*

Self-taught AI-native engineer. I build systems to solve problems I actually experience, and I ship them by directing coding agents (Claude Code, Codex) as my primary tools. Recently shipped *Voices That Remain* — a full-stack AI archive for historical personal letters, built solo in TypeScript end to end, with a vision transcription pipeline and human-in-the-loop verification, deployed on Google Cloud. Six-month AI bootcamp at UNC Chapel Hill with a real-world ML capstone. Looking for founding-engineer or AI-focused roles at companies where agent-directed development is an asset.

---

## Selected projects

### Voices That Remain — Solo builder + architect — 2026
**voicesthatremain.com** · Shipped to production March 2026

- Designed and shipped a full-stack AI archive for historical personal letters, built solo with coding agents. TypeScript end to end (React 19, Express, Drizzle, Postgres), ~15,600 LOC, 547+ commits, live deployment on GCP.
- Built a multi-stage vision pipeline on OpenAI GPT-4o with strict structured outputs and tool calling: Sharp-based image preprocessing, context-aware transcription prompts, **human-in-the-loop verification gate** before metadata extraction, and per-document-type prompts tuned separately for letters, envelopes, telegrams, and photos.
- Deployed on Google Cloud: Cloud Run (backend + frontend), Cloud SQL, Cloud Build (CI/CD), Cloud Storage (archive bucket). Drizzle migration journal coordinated with the deploy pipeline for zero-downtime schema changes.
- Testing via Playwright (E2E smoke tests on PR) and Vitest.
- Started the project in late January 2026 and built it part-time while working a full-time cooking job; quit the cooking job in March 2026 and shipped the majority of the remaining production work in the roughly three most productive weeks that followed.

### PianoTranscriber (UNC Chapel Hill AI bootcamp capstone) — 2024
- Trained a CNN for real-time audio-to-MIDI transcription on the **MAESTRO dataset (~200 hours, ~100GB preprocessed)** using PyTorch on GCP GPU VMs. Custom spectrogram preprocessing at 11 ms resolution, sliding-window architecture (240-frame input, 80-frame overlap). End-to-end pipeline: audio → spectrogram → CNN → MIDI → sheet music.
- ~30,700 lines of Python. Did the majority of work solo on what was nominally a group capstone.

### Truth Engine — Solo builder — 2025 (paused)
- Wrote a **Shazam-style audio fingerprinting engine from scratch** as the first stage of a larger provenance-archive project. Constellation-hash peak detection on log-power spectrograms (restricted to speech frequencies), adaptive tiered-percentage matching for speed, YouTube Data API scraping, Supabase fingerprint storage. ~14,000 lines of Python.
- Paused after concluding Supabase was the wrong backend for fingerprint storage at scale, and after prioritizing VTR as a bounded shipping project.

### Staffclaw — Solo builder — 2025–2026
- **Reverse-engineered the undocumented Teamworxs scheduling API** his employer used and built a full-stack TypeScript replacement (Express, React, Drizzle, Postgres). Session-based auth with 4-hour expiry, demo mode, shared types across the monorepo, domain-specific schedule generation logic.

---

## Skills

**Agent-directed development:** Claude Code, Codex — primary daily tools. Direct agents to produce production code, review and own every decision.

**Languages:** TypeScript, Python, JavaScript, SQL, HTML/CSS

**Frontend:** React 19, Vite, React Router, TipTap, Playwright, Vitest

**Backend:** Node.js, Express, Drizzle ORM, Postgres, Pino, session auth

**AI / ML:** OpenAI API (structured outputs with strict JSON schemas, tool calling, GPT-4o Vision), HITL pipeline design, PyTorch, librosa, custom audio fingerprinting, spectrogram processing, CNN training on real datasets, GCP GPU training

**Cloud / infra:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage), zero-downtime Postgres migrations, Cloud Build CI/CD

**Other:** Reverse-engineering undocumented APIs (mapped 92 endpoints across two sites in one agent session), Puppeteer scraping, Drizzle migration journaling, Sharp image preprocessing, Kraken OCR, Flask

---

## Education

**UNC Chapel Hill AI Bootcamp** — 6-month intensive, May–December 2024
- Capstone: trained a PyTorch CNN for real-time piano audio-to-MIDI transcription on the MAESTRO dataset using GCP GPU VMs
- Prior: independent study via Harvard CS50 (2023)

---

## Background note

Supported myself through the bootcamp and first year of the post-bootcamp period by working full-time as a cook at Alamo Drafthouse in Raleigh (late 2024 – March 2026). Quit in March 2026 to focus full-time on engineering and delivered the majority of VTR's production work in the roughly three most productive weeks that followed.
