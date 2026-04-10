# Voices That Remain (VTR)

**URL:** https://voicesthatremain.com
**Repo:** Private, at `~/Workspace/projects/letter-archive/`
**Status:** Shipped, live, in active development
**Role:** Solo builder + architect (agent-directed)
**Timeline:** Late January 2026 – present. Built part-time for ~6 weeks alongside a cooking job, then the majority of the production work landed in the ~3 most productive weeks after Mason quit that job in March 2026.
**Scale:** ~58,700 lines of TypeScript/TSX (backend + frontend + tests), 547+ git commits, 43 database migrations, 20 tables, 14 enums

## One-liner
Digital archive for historical personal letters with an AI transcription and metadata extraction pipeline, entity resolution with a relationship graph, human verification gates, a full admin UI, and deployment on Google Cloud.

## Why it exists
A family friend had spent years collecting historical personal letters — love letters, wartime telegrams, generational family correspondence — and wanted them to be searchable and readable by the public, with a long-term path toward community donations and grants funding the archive. The collection sits around 10,000+ letters and is still growing. Mason took it on in late January 2026.

## Project structure (monorepo)

```
voices-that-remain/
├── backend/          # Node.js/Express API + background worker
│   └── src/
│       ├── routes/       (public + admin endpoints)
│       ├── services/     (business logic, 40+ files)
│       ├── pipeline/     (transcription, metadata, entity workflows)
│       ├── ai/           (OpenAI integration, prompts, schemas)
│       ├── db/           (Drizzle schema, 43 migrations)
│       ├── middleware/    (auth, error-handler, rate-limit, validation)
│       ├── utils/        (logging, validation, helpers)
│       └── cli/          (admin account, migrations)
├── frontend/         # React 19 + Vite SPA
│   └── src/
│       ├── pages/        (public: 10 routes, admin: 14 pages)
│       ├── components/   (UI library, search, editors, viewers)
│       ├── api/          (REST client layer)
│       ├── hooks/        (custom React hooks)
│       └── contexts/     (HeaderDock, Upload, Toast)
├── e2e/              # Playwright test suite (46 spec files)
├── deploy/           # GCP Cloud Run manifests
├── scripts/          # CLI utilities
└── cloudbuild.yaml   # CI/CD pipeline
```

## Architecture (verified from source)

### Backend
- **Runtime:** Node.js 20+ (ESM)
- **Framework:** Express 4.21
- **Language:** TypeScript end-to-end
- **ORM:** Drizzle 0.38 with Postgres 3.4
- **Logging:** Pino (structured)
- **Testing:** Vitest (unit, ~25 test files), Playwright (E2E, 46 spec files)
- **Middleware stack (10 layers):** request flight tracking, gzip compression, Pino request logger, global rate limiter, security headers (HSTS, CSP, X-Frame-Options), CORS, JSON parser, JWT auth, Zod validation, catch-all error handler

### Frontend
- **Framework:** React 19
- **Build:** Vite
- **Router:** React Router 7.12
- **Editor:** TipTap (rich text in admin UI for letter review)
- **Blog editor:** MDXEditor
- **Charts:** Recharts (usage dashboard)
- **Content system:** 9 block templates (hero, richtext, cards, stats, steps, CTA, quote, two-column, contact) stored as JSONB, rendered by BlockRenderer
- **State management:** React context only (HeaderDock, Upload, Toast). No Redux/Zustand.

### Database (20 tables, 43 migrations, 14 enums)

**Letter core:**
- `letters` — the main table. Fields include: collection_id, type (letter/photo/envelope/telegram/etc), workflow state, visibility, transcript fields (text, JSON, status, attempts, dead-letter flag), metadata fields (sender, recipient, location, date, hook, summary, tags, emotional tone, relationship type, primary topics), AI notes (JSONB), and review tracking
- `letterPages` — per-page records with storage path, checksum (SHA256), dimensions, line segments
- `letterVersions` — version history per field type (transcript/metadata) with source tracking (ai/human)
- `collections` — collection code, title, description, AI-generated profile fields (narrative, reading paths, gap analysis, themes, correspondents, start-here letter)

**Entity core:**
- `canonicalPersons` — canonical name, aliases (array), biography, hook, notes, biography status/verification
- `canonicalPlaces` — canonical name, aliases (array), place type, notes
- `letterPersons` — letter-to-person links with role (sender/recipient/mentioned), name as written, confidence (0-100), confirmation tracking
- `letterPlaces` — letter-to-place links with role (written_from/mentioned/destination), confidence, confirmation
- `personRelationships` — person-to-person graph edges with type (spouse, romantic-partner, parent-child, sibling, etc), one-way storage (personAId < personBId prevents duplicates), confidence, discovery tracking
- `entityReviewQueue` — suggestions from AI extraction pending admin confirmation

**Admin and publishing:**
- `adminUsers` — JWT + bcrypt auth, invite-based onboarding
- `adminInvites` — one-time tokens with expiry
- `adminNotifications` — 58 canonical types, severity levels, deduplication, SSE broadcast
- `updatePosts` — blog posts (slug, markdown body, status, category)
- `contentPages` — block-based pages stored as JSONB
- `auditLog` — action tracking with before/after change diffs
- `siteSettings` — key-value config (title, description, featured letter, donate URLs, contact)
- `letterViews` — view tracking separate from update timestamps
- `apiUsageLogs` — per-call token counts, model, duration
- `workerState` — heartbeat and polling state

**Indexing strategy:**
- GIN trigram indexes on person/place canonical names for fuzzy search
- GIN array indexes on aliases and primary topics
- Partial indexes on visibility, workflow, transcription status
- Unique indexes on identity tuples (collection_id, dateRaw, type, typeSequence)
- Foreign key cascades for deletions

### API surface

**Public routes (20+ endpoints):**
- Letters: browse, detail, search with faceted filters (date range, persons, places, topics, workflow)
- Collections: grid view, detail with profile narrative and reading paths
- People/places: entity detail pages with related letters
- Relationships graph: D3 data endpoint
- Blog, sitemap, health check, public settings

**Admin routes (50+ endpoints under /admin):**
- Auth: login, logout, invite-accept
- Letters: paginated + sortable list, full metadata editing, transcript editing, verification, bulk operations
- Upload: multipart file upload with filename parsing and automatic routing
- Processing: registry view of 4 pipeline processes, start/pause/abort/filter
- Entities: person/place management, biography generation, relationship editing
- Collections: profile generation, reading paths, correspondent summaries
- Notifications: inbox with filtering, acknowledgment, SSE stream
- Content: blog editor, block-based page editor
- Settings: site config
- Usage: token tracking dashboard with cost analysis

### Deployment
- **Google Cloud Run** — backend and frontend as separate services
- **Cloud SQL** — managed Postgres
- **Cloud Build** — CI/CD pipeline (parallel builds, migration job, backend/frontend deploy, worker pool deploy, 40min timeout)
- **Cloud Storage** — bucket for letter image originals
- **Docker** — multi-stage builds (deps, build, production)
- **Secrets:** DATABASE_URL, OPENAI_API_KEY, GCS_BUCKET via Cloud Run env

## The AI pipeline (4-stage, registry-based)

### Stage 1 — Transcription
- **Model:** OpenAI GPT-5.4 via the Responses API (vision input)
- **Preprocessing:** Sharp for smart resize (2000px max) + JPEG encoding + base64
- **Prompting:** Handwriting-reading prompt that preserves original spelling, marks [illegible] sections, takes no guesses from historical knowledge. Collection metadata and page context injected.
- **Output:** raw transcript text, stored for human review
- **Reliability:** 3 retries max, dead-letter flag after exhaustion, 5-minute timeout per call
- **Stub mode:** returns mock text when no API key is configured (enables testing without OpenAI)

### Stage 2 — Human-in-the-loop verification gate
- A human must confirm the transcript in the admin UI before downstream extraction runs
- Human corrections feed into subsequent model calls so metadata extraction gets the corrected text
- This is an explicit architectural choice: nothing goes public until verified

### Stage 3 — Metadata V2 extraction (structured outputs)
- **Model:** OpenAI structured output with Zod + JSON Schema (strict mode)
- **Fields extracted:** sender, recipient, location, date, emotional tone (9-value enum: joyful, affectionate, hopeful, grateful, matter-of-fact, nostalgic, anxious, sad, angry), sender-recipient relationship (11-value enum), primary topics (1-3 from fixed vocabulary), notable quotes with context, AI notes (structured suggestions with category, priority, and resolves_when triggers)
- **Guillemet tagging:** All sender/recipient references tagged as `«SENDER:text»` or `«RECIPIENT:text»` in hooks and summaries. This enables automatic entity linking when canonical persons are confirmed, without post-processing NLP.
- **Per-document-type prompting:** Letters, envelopes, telegrams, photos each get custom system prompts with different extraction targets
- **Corrections support:** admin can manually override sender/recipient before extraction

### Stage 4 — Entity extraction and resolution
- **Input:** transcript + confirmed metadata
- **AI extraction:** persons and places with roles, confidence scoring (0-100)
- **Fuzzy matching:** extracted names matched against canonical person/place registry
- **Review queue:** unconfirmed suggestions enter entityReviewQueue for admin confirmation
- **Auto-linking:** high-confidence matches linked automatically via participant-sync
- **Relationship graph:** person-to-person edges built from letter co-occurrence, stored with one-way ordering

### Pipeline execution engine
- **Registry-based:** 4 processes (transcription, metadata, entity, background-worker) registered in one map with uniform admin controls
- **Worker architecture:** two deployment modes:
  - **Polling mode** (local dev): polls every 5s, batch size 5, runs indefinitely
  - **Job mode** (Cloud Run Jobs): EXIT_WHEN_EMPTY=true, drains queues and exits, no idle cost
- **Job recovery:** on startup, recoverOrphanedJobs() resets RUNNING jobs from crashed workers to PENDING
- **Graceful shutdown:** SIGTERM finishes current job, drains pending, 8s timeout (Cloud Run gives 10s)
- **Progress tracking:** updateJobProgress() broadcasts via SSE so the admin UI shows real-time progress without polling
- **Abort signals:** shouldAbortProcessing() checked in long-running phases

### Cost-tiered model selection
Transcription, metadata V2, entity resolution, and regeneration run on GPT-5.4. Lower-stakes audit/resync steps use GPT-5.4-mini. Token counts logged per call to apiUsageLogs with cost analysis in the admin usage dashboard.

## Notification system
- **58 canonical notification types** with severity levels (info, warn, error, critical)
- **Deduplication:** optional dedupeKey + time window (default 60 min)
- **Real-time delivery:** SSE stream to admins via /admin/notifications-stream
- **Notification sweeper:** periodic monitor that detects stuck jobs (RUNNING > 30 min), high failure rates (>50%), worker silence (no heartbeat). Auto-creates critical notifications and marks stuck jobs as dead-letter.
- **Auto-expiry:** by severity level

## Entity and relationship system
- **Canonical registries** for persons and places with aliases and biographical fields
- **Fuzzy matching** via GIN trigram indexes for name lookups
- **Review queue** workflow: AI suggests entities with confidence scores, admin confirms/rejects/creates new
- **Relationship graph:** D3-based visualization on the public site. Person-to-person edges with typed relationships, discovered-in-letter tracking, and one-way storage (alphabetic ID ordering prevents duplicate edges)
- **AI-generated biographies** for canonical persons
- **Guillemet tagging** in AI output enables automatic entity linking without NLP post-processing

## Collection profiles (AI-generated)
When triggered from the admin UI:
- **Narrative:** summary of collection themes, scope, historical context
- **Reading paths:** curated letter sequences with narrative bridges
- **Gap analysis:** identified periods with missing letters
- **Themes:** recurring topics with letter IDs
- **Correspondents:** key participants with biographical hooks
- **Start-here letter:** recommended entry point with reasoning

## Filename-driven ingest
Upload filenames follow the pattern `{collection}-{YYYYMMDD}-{type}{seq}-{page}.{ext}`. The parser extracts collection code, date (with confidence: exact/inferred/unknown), document type, sequence number, and page number. This drives automatic routing to the correct collection and workflow without manual metadata entry at upload time.

## Frontend architecture

### Public site (10 routes)
- Home: hero, featured letter, search, shelf of recent/random
- Letter detail: scan carousel (CSS scroll-snap), reading view, transcript, metadata, entities
- Collections: grid view with profiles, detail pages with narratives and reading paths
- People/places: profile pages with biographies, related letters, relationship networks
- Blog, about, support (block-rendered content pages)

### Admin UI (14 major pages)
- Dashboard with sidebar navigation
- Upload page: drag-drop or file picker, batch upload with filename parsing
- Letter review page: full editor for transcript, metadata, entities, AI notes
- Processing queue: registry view of all 4 processes with start/pause/abort/filter
- Content hub: blog editor (MDX) + block-based page editor (9 section types)
- Collection admin: profile generation, reading paths, correspondent summaries
- AI notes review and resolution
- Notification inbox with SSE real-time updates
- Usage dashboard with Recharts token/cost trends
- Settings page

### Performance optimizations
- Code splitting via React.lazy + Suspense
- React.memo on filter components to prevent re-renders
- 3-tier progressive image loading: thumbnail (blurhash) -> medium (preload) -> full (lightbox)
- AVIF format support
- Image preloading on hover
- CSS scroll-snap for native carousel
- Pretext library for cached text metrics (avoids layout thrashing)
- will-change hints for GPU compositing on scroll-reveal header
- Mobile swipe navigation via touch handlers

## Testing
- **Unit tests (~25 files, Vitest):** date formatting, transcript matching, search persistence, filename parsing, entity matching, line alignment, notifications, processing queue, letter operations
- **E2E tests (46 spec files, Playwright):** all admin workflows (auth, upload, review, processing), all public routes (search, entity pages, blog), accessibility (axe-core audits), performance (image load times, API latency), error handling (network failures, invalid uploads)
- **Mocking strategy:** separate .mocked.spec.ts files for routes that don't need full API. Admin auth always tested live; data mutations tested mocked.

## Hard problems solved

1. **Handwritten-letter transcription at variable quality.** Real archival scans are inconsistent. Mason's approach: image preprocessing (size normalization, JPEG re-encoding) combined with per-collection prompt context so the model is never flying blind.

2. **HITL-gated multi-stage pipeline.** An explicit gate after transcription so no hallucinated metadata ever reaches the public archive. Corrections flow downstream.

3. **Entity resolution at scale with fuzzy matching and confidence scoring.** Extracted names from 200-year-old letters don't match cleanly. Trigram-indexed canonical registries with aliases, a review queue for low-confidence matches, and automatic linking for high-confidence ones.

4. **Relationship graph built from letter co-occurrence.** Person-to-person edges with typed relationships (spouse, parent-child, sibling, etc), one-way storage to prevent duplicates, D3 visualization on the public site.

5. **58-type notification system with real-time SSE delivery and autonomous health monitoring.** The sweeper detects stuck jobs, high failure rates, and worker silence without human intervention.

6. **Filename-driven ingest that eliminates manual metadata entry.** A structured filename convention drives automatic routing to the correct collection, date assignment, and workflow entry.

7. **Registry-based processing with two deployment modes.** Same codebase runs as a long-lived poller in dev or as an ephemeral Cloud Run Job that drains and exits in production. Includes orphaned job recovery and graceful shutdown.

8. **AI-generated collection profiles with reading paths and gap analysis.** Not just summaries — structured recommendations for how to read through a collection, with identified gaps in the historical record.

9. **Guillemet tagging in AI prompts for automatic entity linking.** Instead of post-processing NLP to find entity references, the prompt itself tags them during generation. Eliminates a whole class of fuzzy matching errors.

10. **Zero-downtime Postgres migrations.** Drizzle's migration journal + Cloud Build's deploy pipeline, coordinated so schema changes don't break the live site during deploy.

11. **Delivering the entire system solo in ~3 weeks of focused work** (after ~6 weeks part-time). Full-stack TypeScript, a production AI pipeline, a comprehensive admin UI, 46 E2E tests, and a GCP deployment — one person, agent-directed.

## What Mason would do differently
- **Add OpenTelemetry tracing.** Currently has structured logging (Pino) and token tracking, but no distributed tracing for debugging pipeline latency across stages.
- **Notification retention cleanup job.** Notifications have expiresAt but no automated cleanup cron.
- **Image storage on Cloud Storage, not Cloud Run filesystem.** Currently works because Cloud Run mounts a memory-backed filesystem, but images are ephemeral on container restart. GCS bucket exists but the full pipeline for serving from it could be tighter.
- **Formal API versioning.** 70+ endpoints with no version prefix. Would be painful to change now.

## Interview talking points

- *Lead with:* HITL-gated vision pipeline for historical handwriting, entity resolution with fuzzy matching and relationship graph, 58-type notification system, deployed on GCP
- Filename-driven ingest that eliminates manual metadata entry for thousands of letters
- Guillemet tagging in AI prompts as an alternative to NLP post-processing
- Registry-based processing with two deployment modes (poller vs ephemeral job)
- AI-generated collection profiles with reading paths and gap analysis
- Custom image preprocessing (Sharp) for handwriting recognition
- Per-document-type prompts (letters vs envelopes vs telegrams vs photos)
- Structured outputs with strict JSON schemas for metadata correctness
- The choice to pay for a human gate instead of raw automation
- 20 tables, 43 migrations, 547+ commits, shipped in real production
- Built agent-directed using Claude Code and Codex; architected and reviewed every decision himself
- 46 Playwright E2E specs + 25 unit test files

## Claim guardrails
Things Mason can fully defend in an interview based on this project:
- Full-stack TypeScript (Express + React 19 + Drizzle + Postgres)
- OpenAI Vision + structured outputs + tool calling in production
- Multi-stage AI pipelines with HITL verification
- Entity resolution with fuzzy matching, confidence scoring, review queues
- Relationship graph modeling and D3 visualization
- 58-type notification system with SSE real-time delivery
- Registry-based background job processing with two deployment modes
- GCP deployment (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)
- Drizzle ORM with 43 journal-tracked migrations across 20 tables
- Playwright E2E testing (46 specs) + Vitest unit testing
- Pino structured logging
- Sharp image preprocessing + 3-tier progressive loading
- JWT + bcrypt auth with invite-based onboarding
- Block-based content system (9 templates)
- Agent-directed development methodology (Claude Code, Codex)
- Zod schema validation on API inputs
- Express middleware composition (10-layer stack)
- Rate limiting, security headers, CORS configuration

## Things to NOT claim
- That VTR uses any ML/training — it calls OpenAI APIs, it doesn't train models
- That Mason built the OCR engine — he uses OpenAI Vision, not a custom OCR model
- That Kraken line detection is integrated — it was moved to a local CLI script, not in the server
- That the system handles multi-worker distributed processing — single worker with polling, no distributed locking
