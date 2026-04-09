# Voices That Remain (VTR)

**URL:** https://voicesthatremain.com
**Repo:** Private, at `~/Workspace/projects/letter-archive/`
**Status:** Shipped, live, in active development
**Role:** Solo builder + architect (agent-directed)
**Timeline:** Late January 2026 – present. Built part-time for ~6 weeks alongside a cooking job, then the majority of the production work landed in the ~3 most productive weeks after Mason quit that job in March 2026.
**Scale:** ~15,600 lines of TypeScript/TSX, 547+ git commits

## One-liner
Digital archive for historical personal letters with an AI-powered transcription and metadata extraction pipeline, human-in-the-loop verification, and full deployment on Google Cloud.

## Why it exists
A family friend had spent years collecting historical personal letters — love letters, wartime telegrams, generational family correspondence — and wanted them to be searchable and readable by the public, with a long-term path toward community donations and grants funding the archive. The collection sits around 10,000+ letters and is still growing. Mason took it on in late January 2026.

## Architecture (verified from source)

### Backend
- **Runtime:** Node.js 20+ (ESM)
- **Framework:** Express 4.21
- **Language:** TypeScript end-to-end
- **ORM:** Drizzle 0.38 with Postgres 3.4
- **Logging:** Pino
- **Testing:** Vitest (unit), Playwright (E2E — smoke tests on PR, full suite manual)

### Frontend
- **Framework:** React 19
- **Build:** Vite
- **Router:** React Router 7.12
- **Editor:** TipTap (rich text in the admin UI for letter review)
- **Charts:** Recharts (for archive stats / admin dashboards)

### Database
- **PostgreSQL** with Drizzle migrations, journal-tracked for zero-downtime deploys
- **Local parity:** Postgres native (not Docker), matching Cloud SQL in production

### Deployment
- **Google Cloud Run** — backend and frontend deployed as separate services
- **Cloud SQL** — managed Postgres
- **Cloud Build** — CI/CD pipeline (`cloudbuild.yaml`)
- **Cloud Storage** — bucket for letter image originals

## The AI pipeline

This is the most interesting technical part of the project. It's a multi-stage vision pipeline with a human-in-the-loop gate.

### Stage 1 — Transcription
- **Model:** OpenAI GPT-5.4 via the Responses API (vision input)
- **Preprocessing:** Sharp for smart resize (2000px max) + JPEG encoding for consistency across heterogeneous scan sources
- **Prompting:** Context-aware — collection metadata, page numbers, and date hints are injected into the prompt to give the model the best chance on historical handwriting
- **Output:** raw transcript text, stored for human review

**Cost-tiered model selection across the pipeline.** Transcription, metadata V1/V2, entity resolution, and regeneration all run on GPT-5.4 where quality matters; a cheap GPT-5.4-mini "audit/resync" step is used for lower-stakes decisions. This is an explicit cost-vs-quality split — pay for the model on work that's user-visible, not on checks.

### Stage 2 — Human-in-the-loop verification gate
- **A human must confirm the transcript in the admin UI before downstream metadata extraction runs.** This is an explicit architectural choice, not a nice-to-have — nothing goes public until it's been verified.
- Human corrections are passed back into the model in subsequent calls so downstream extraction benefits from the corrected text, not the original raw output.

### Stage 3 — Metadata extraction (structured outputs + tool calling)
- **Model:** OpenAI structured outputs with strict JSON schemas
- **Fields:** sender, recipient, locations, dates, other entities
- **Why structured outputs:** the metadata needs to be reliably parseable downstream and consistent across thousands of letters; strict schema enforcement at the model level is the right tool
- **Tool calling** for additional entity resolution steps

### Stage 4 — Additional content extraction
- **Envelopes, photos, telegrams** each run through their own vision calls with **custom system prompts tuned per document type**
- **JSON schema validation** enforces consistent output shape across document types
- **Summaries and short descriptions** written for letters, collections, and people who appear across multiple letters

### Operational details
- **5-minute timeout** per vision request
- **Token usage tracking** (prompt + completion tokens logged per call)
- **Fire-and-forget async notifications** on API errors so the pipeline degrades gracefully
- **Async worker pool** for background tasks (metadata extraction, photo descriptions)

## Hard problems solved

1. **Handwritten-letter transcription at variable quality.** Real archival scans are inconsistent — different paper, ink, lighting, ages, handwriting styles. Mason's approach: image preprocessing (size normalization, JPEG re-encoding for format consistency) combined with per-collection prompt context so the model is never flying blind.

2. **HITL-gated multi-stage pipeline.** Most naive AI pipelines run all stages automatically. Mason designed an explicit gate after transcription so no hallucinated metadata ever reaches the public archive. This is the right architecture for content that will be read by researchers and family members of the letter writers.

3. **Structured outputs as a correctness tool, not a formatting convenience.** The metadata schema is strict because downstream code needs to trust the output. This is an informed choice — Mason reached for the right OpenAI primitive for the problem.

4. **Zero-downtime Postgres migrations in Cloud SQL.** Drizzle's migration journal + Cloud Build's deploy pipeline, coordinated so schema changes don't break the live site during the deploy window.

5. **Delivering the majority of the production system solo in ~3 weeks of focused work** after ~6 weeks of part-time progress alongside a full-time cooking job. Full-stack TypeScript, a production AI pipeline, and a GCP deployment — one person, agent-directed. Mason started VTR in late January 2026, worked on it part-time through February and early March while holding his day job, then quit in March and shipped most of the remaining work in the three most productive weeks of the project.

## What Mason would do differently
*(To be filled in after a reflection pass. Interview gold goes here.)*

## Interview talking points

- *Lead with:* HITL-gated vision pipeline for historical handwriting, structured outputs for metadata, deployed on GCP Cloud Run/SQL/Build
- Custom image preprocessing (Sharp) for handwriting recognition — why the defaults fail and what he did about it
- Per-document-type prompts (letters vs. envelopes vs. telegrams vs. photos) — tuning prompts as a first-class engineering activity
- The choice to use strict JSON schemas over free-form JSON mode — correctness over convenience
- The choice to pay for a human gate instead of raw automation — trust over speed
- Cloud Build → Cloud Run deploy pipeline with Drizzle migration journal coordination
- 547 commits, shipped in real production — not a toy project
- Built agent-directed using Claude Code and Codex; architected and reviewed every decision himself

## Claim guardrails
Things Mason can fully defend in an interview based on this project:
- Full-stack TypeScript (Express + React + Drizzle + Postgres)
- OpenAI Vision + structured outputs + tool calling in production
- Multi-stage AI pipelines with HITL verification
- GCP deployment (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)
- Drizzle ORM with journal-tracked migrations
- Playwright E2E testing
- Pino structured logging
- Sharp image preprocessing
- Agent-directed development methodology (Claude Code, Codex)
