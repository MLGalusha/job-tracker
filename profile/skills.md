# Skills — truthfulness source of truth

**Rule for all drafting skills:** You may only make claims on resumes or cover letters that are supported by this file (in the Production-validated or Familiar sections), by `profile/projects/*.md`, or by `profile/wins.md`. Do not invent years of experience, frameworks, outcomes, or metrics. If a role requires something Mason doesn't have, note the gap in the drafting summary and do NOT put it on the resume. The `interview-prep` skill will add it to the study guide.

The source of truth for this file is the actual shipped code in Mason's projects (see `profile/projects/*.md`). When in doubt, read the project files.

---

## Core methodology: agent-directed development

Mason's primary way of building software is **directing coding agents** (Claude Code, Codex) to produce production-ready code. He has been a heavy AI user since 2023, directs agents fluently, reviews and understands everything they produce, and has shipped real production software this way — specifically _Voices That Remain_, which he started in late January 2026 and built part-time alongside a full-time cooking job for the first several weeks, then shipped the majority of in the roughly three most productive weeks after quitting that job in March 2026.

This is not a hedge or a caveat. It is the differentiated skill being sold. Every resume should feature it prominently under "Tools & workflow" and in the project bullets. For agent-friendly companies (the target list), this is a positive signal that matches their hiring thesis directly.

---

## Tier A — Production-validated

Mason has shipped working code using these in a real project. Each line cites the project that evidences it.

### Languages

- **TypeScript** — Voices That Remain (~15.6k LOC, 547 commits, live); Staffclaw
- **Python** — PianoTranscriber (~30.7k LOC, bootcamp capstone); Truth Engine (~14k LOC); line-finder
- **JavaScript** — google-api-tools (Node CommonJS scripts)
- **SQL** — VTR (Postgres with Drizzle); Staffclaw (Postgres with Drizzle)
- **HTML / CSS** — VTR frontend; Staffclaw frontend

### Frontend

- **React 19** — VTR frontend; Staffclaw frontend
- **Vite** — VTR; Staffclaw
- **React Router** — VTR (v7.12)
- **TipTap** (rich text editor) — VTR admin UI
- **Recharts** — VTR data visualization
- **Playwright** — VTR E2E testing (smoke tests on PR)

### Backend

- **Node.js 20+ (ESM)** — VTR backend; Staffclaw backend
- **Express** — VTR (v4.21); Staffclaw (v5)
- **Pino** — VTR structured logging
- **Drizzle ORM** — VTR; Staffclaw (with Postgres)
- **Session-based auth** — Staffclaw (4-hour expiry, reverse-engineered Teamworxs integration)

### Databases

- **PostgreSQL** — VTR (Cloud SQL in production); Staffclaw
- **Supabase** — Truth Engine (used for fingerprint storage, though flagged as too slow/expensive at scale)

### AI / ML

- **OpenAI API** — VTR production use of:
  - `responses.create()` for structured outputs with strict JSON schemas
  - Tool calling for metadata extraction
  - **GPT-5.4** for vision transcription, metadata V1/V2, entity resolution, regeneration
  - **GPT-4o-mini** for a cheap audit/resync decision step (explicit cost-vs-quality tiering — pay for the model on user-visible work, not on checks)
  - Token usage tracking and per-model cost accounting, rate-limit handling
- **Human-in-the-loop (HITL) pipelines** — designed and shipped the gate in VTR that requires human transcript confirmation before downstream metadata/photo extraction runs
- **Vision-language prompting** — tuned prompts per document type (letters, envelopes, telegrams, photos) in VTR
- **PyTorch** — trained a CNN for real-time piano audio → MIDI transcription in bootcamp capstone (PianoTranscriber)
- **Audio ML pipeline** — spectrogram extraction, MIDI alignment, sliding-window training (PianoTranscriber)
- **Audio fingerprinting (Shazam-style)** — wrote a constellation-hash peak-finding pipeline from scratch (Truth Engine)
- **librosa / scipy audio processing** — PianoTranscriber, Truth Engine
- **Training on GCP GPUs** — PianoTranscriber (MAESTRO dataset, ~100GB preprocessed)

### Cloud / infra / deployment

- **Google Cloud Platform** — production VTR deployment:
  - **Cloud Run** (backend + frontend services)
  - **Cloud SQL** (managed Postgres)
  - **Cloud Build** (CI/CD pipeline, `cloudbuild.yaml`)
  - **Cloud Storage** (archive bucket for letter images)
- **Zero-downtime deploys with Drizzle migration journal tracking** — VTR
- **Docker-free Postgres local + Cloud SQL production parity** — VTR

### Tools & workflow

- **Claude Code** — daily primary dev tool since late 2025
- **Codex** — daily use since late 2025
- **Cursor** — used in early 2025
- **Karpathy-style autoresearch loop** (forked from @karpathy/autoresearch) — used to auto-optimize VTR image loading performance; Mason uses its concepts, not his original repo
- **Git / GitHub** — 547+ commits on VTR alone
- **pnpm / npm**
- **uv** (modern Python dependency management)
- **Vitest**, **Playwright** (testing)

### Reverse-engineering / integration

- **Reverse-engineered undocumented APIs at scale** — Staffclaw (Teamworxs schedule API); google-api-tools (mapped 92 API endpoints across two sites in one agent session, including manager-only routes)
- **Puppeteer** scraping — google-api-tools
- **OAuth / Google Sheets API** — google-api-tools
- **Google Cloud Vision API** — line-finder
- **Kraken OCR** (line segmentation) — line-finder

---

## Tier B — Familiar (touched, not shipped)

Mason has used these but they are not in shipped production code. Resume/cover letter may mention as "experience with" or "familiar with." Cannot be claimed as a strength.

- **TensorFlow / Keras** — present alongside PyTorch in the PianoTranscriber repo; PyTorch is the primary, TF was used more exploratorily
- **SpeechBrain** (speaker diarization) — Truth Engine
- **YouTube Data API** — Truth Engine (custom scraper)
- **Flask** — line-finder (small utility web app)
- **music21 / MIDIUtil** — PianoTranscriber MIDI generation

---

## Tier C — Learning / gaps

Do **not** put on resumes. Goes to study guides (`interview-prep` skill) only.

- _(None specified yet. Fill in as study guides surface gaps from JDs.)_

---

## Meta-skills worth naming

- **Directing coding agents to produce production-quality code.** Verified by the existence and scale of VTR as a shipped product built this way.
- **Reading and reviewing agent output critically.** Mason can read and reason about all the code in his projects and makes hand edits when debugging.
- **Problem discovery through lived experience.** Every significant project came from a real frustration he had (movie-theater scheduling → Staffclaw; handwritten-letter archive → VTR; misquoting of public figures → Truth Engine). This is a strong trait for founding/early-stage engineering roles.
- **Architecture + technical decision-making.** From Mason's own LinkedIn bio: "I design the architecture, make the technical decisions, and use AI coding tools to accelerate implementation."
- **Full-stack TypeScript end to end.** VTR uses the same language from frontend to backend to database schemas.
- **ML training on real datasets, not toy problems.** 100GB MAESTRO dataset, GPU training, real evaluation.
