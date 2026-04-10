# Voices That Remain — Project Study Guide

This is a recall aid. It exists so Mason can re-learn his own project before an interview without re-reading the source code. One-time write.

---

## The 30-second pitch

Voices That Remain is a digital archive for historical personal letters. Love letters, wartime telegrams, notes between family members across generations. The collection is around 10,000 letters and growing. I built the site, the admin tools, the database, the AI pipeline, and the Google Cloud deployment, all solo using coding agents. The pipeline transcribes handwritten letter images with OpenAI Vision, extracts metadata with structured outputs, resolves entities with fuzzy matching and a review queue, and builds a relationship graph across letters. A human confirms every transcript before downstream extraction runs. It's about 58,000 lines of TypeScript, 547 commits, 20 database tables, 46 end-to-end tests, live at voicesthatremain.com.

---

## The 3-minute walkthrough

A family friend had been collecting historical letters for years and wanted them searchable and readable online. I took it on in late January 2026 and built it part-time alongside a cooking job for about six weeks, then quit and shipped most of the remaining work in three focused weeks.

The system is a monorepo: Express backend, React 19 frontend, Postgres with Drizzle, deployed on Google Cloud Run.

The AI pipeline is the core. When letter images get uploaded, they go through a four-stage process. First, transcription: each page goes through OpenAI Vision with a prompt tuned for historical handwriting. The prompt tells the model to read what's there, mark anything illegible, and never guess from historical knowledge. Sharp preprocesses the images (resize to 2000px, JPEG encoding) so the model gets consistent input across scans of wildly different quality.

Then a human gate. An admin opens the transcript in the admin UI, reads it against the scan, makes corrections, and confirms it. Nothing downstream runs until a human says the transcript is right. This was a deliberate architectural choice because the archive serves researchers and family members who care about accuracy.

After confirmation, metadata extraction runs with OpenAI structured outputs. Strict JSON schemas enforce consistent fields: sender, recipient, location, date, emotional tone from a nine-value enum, relationship type from an eleven-value enum, primary topics from a controlled vocabulary, notable quotes with context. The prompts use guillemet tagging, where the model tags all references to the sender and recipient inline as it writes hooks and summaries. That enables automatic entity linking later without NLP post-processing.

Then entity extraction: persons and places get pulled from the transcript with confidence scores. The system fuzzy-matches extracted names against canonical registries using trigram indexes, creates review queue entries for low-confidence matches, and auto-links high-confidence ones. Person-to-person relationships get built from letter co-occurrence and displayed as a D3 graph on the public site.

The admin UI is substantial. 14 pages, 50+ endpoints. Processing queue with registry-based controls for all four pipeline stages. Notification system with 58 types, real-time SSE delivery, and a sweeper that detects stuck jobs and high failure rates. Usage dashboard tracking token costs. Blog editor, block-based content pages, collection profile generator.

On the public side: search with faceted filters (date range, people, places, topics), letter detail with scan carousel and reading view, collection pages with AI-generated narratives and reading paths, person/place pages with biographies and relationship networks.

---

## Numbers to remember

| What | Value |
|---|---|
| Total LOC | ~58,700 TypeScript/TSX |
| Commits | 547+ |
| Database tables | 20 |
| Database migrations | 43 |
| Database enums | 14 |
| Admin endpoints | 50+ (under /admin) |
| Public endpoints | 20+ |
| Admin UI pages | 14 |
| Public routes | 10 |
| E2E test specs | 46 (Playwright) |
| Unit test files | ~25 (Vitest) |
| Notification types | 58 canonical types |
| Block content templates | 9 |
| Emotional tone enum values | 9 (joyful, affectionate, hopeful, grateful, matter-of-fact, nostalgic, anxious, sad, angry) |
| Relationship type enum values | 11 (spouse, romantic-partner, parent-child, sibling, extended-family, friend, acquaintance, professional, institutional, unknown) |
| Middleware layers | 10 |
| Letter collection size | ~10,000+ letters, growing |
| Image preprocessing | Sharp, 2000px max width, JPEG |
| Transcription timeout | 5 min per vision call |
| Transcription retries | 3 max, then dead-letter |
| Worker poll interval | 5 sec, batch size 5 |
| Graceful shutdown timeout | 8 sec (Cloud Run gives 10) |
| Cloud Build timeout | 40 min |
| Timeline | Late Jan 2026 to present |
| Focused build sprint | ~3 weeks after quitting the cooking job |
| Models | GPT-5.4 (quality-critical), GPT-5.4-mini (lower-stakes audit) |

---

## The architecture at a glance

### Monorepo layout
Backend (Express, Node 20, ESM) + Frontend (React 19, Vite) + E2E (Playwright) + deploy scripts + cloudbuild.yaml. No root package.json, separate package.json per workspace.

### Database (Drizzle + Postgres)
20 tables. Key ones: `letters` (the big one, 40+ columns covering transcript, metadata, workflow, AI output), `letterPages` (per-page with SHA256 checksum), `letterVersions` (version history for transcript/metadata), `collections`, `canonicalPersons`, `canonicalPlaces`, `letterPersons`, `letterPlaces`, `personRelationships`, `entityReviewQueue`, `adminNotifications`, `apiUsageLogs`, `workerState`, `auditLog`, `siteSettings`, `updatePosts`, `contentPages`.

### Deployment
Cloud Run (backend + frontend as separate services), Cloud SQL (Postgres), Cloud Build (CI/CD: parallel builds, migration job, deploy services, deploy worker), Cloud Storage (letter images).

---

## The hard decisions and why

### 1. Human gate after transcription, not after metadata
The gate sits between stage 1 (transcription) and stage 3 (metadata extraction), not at the end. This means metadata extraction gets corrected text, not raw AI output. If the human gate were at the end, metadata would be extracted from potentially wrong transcripts and then the human would have to fix both. Correcting early means downstream stages build on a better foundation.

### 2. Guillemet tagging in prompts instead of NLP post-processing
Instead of letting the model write free-text summaries and then running entity recognition to find sender/recipient references, the prompt instructs the model to tag references inline as it generates. `«SENDER:John»` instead of just "John." This eliminates a whole class of fuzzy matching errors because the model knows who the sender and recipient are from the metadata and tags them in context. It's cheaper and more accurate than a separate NER pass.

### 3. Registry-based processing over a message queue
The processing pipeline uses a database-backed registry (4 processes, each with config, status tracking, retry logic) instead of RabbitMQ or SQS. This is simpler and appropriate for the scale: batch size 5, one worker. A message queue would add operational complexity (another service to manage) for no benefit at this volume. The trade-off: no distributed processing, single worker only.

### 4. Two deployment modes for the worker
The same worker code runs as a long-lived poller in dev (poll every 5s, run indefinitely) or as an ephemeral Cloud Run Job in production (EXIT_WHEN_EMPTY=true, drain queues and exit). The job mode means no idle cost in production. The poller mode means instant feedback in dev. One codebase, two modes via an environment variable.

### 5. One-way relationship storage (personAId < personBId)
Relationship edges store the alphabetically-lower person ID as personA and the higher as personB. This prevents duplicate edges (A-B and B-A can't both exist) without a unique constraint on an unordered pair. Queries check both directions. Simple, correct, no ORM magic.

### 6. Filename-driven ingest
Upload filenames follow `{collection}-{YYYYMMDD}-{type}{seq}-{page}.ext`. The parser extracts collection, date (with confidence: exact/inferred/unknown), document type, sequence, and page number. This means uploading a batch of scanned images automatically creates the right letter and page records in the right collection with the right dates. No manual metadata entry at upload time. At 10,000+ letters, this saves hundreds of hours.

### 7. AI Notes as structured suggestions with resolves_when triggers
Instead of free-form AI comments, the metadata extraction outputs structured notes with a category (identity, date, transcription, relationship, context, cross-reference, location, condition), a priority level, and a `resolves_when` field that names a trigger condition (like "sender_filled" or "date_confirmed"). This lets the admin UI automatically resolve notes when the underlying condition is met, rather than requiring manual dismissal.

### 8. Notification sweeper for autonomous health monitoring
The sweeper runs periodically and checks for: jobs stuck in RUNNING for more than 30 minutes, failure rates above 50% in a time window, and worker silence (no heartbeat). It auto-marks stuck jobs as dead-letter and creates critical notifications. This means pipeline problems get surfaced even when nobody is watching the admin UI.

### 9. 3-tier progressive image loading
Letter scans can be large (high-res archival images). The frontend loads a blurhash thumbnail first, then a medium-resolution preload, then the full image on lightbox open. Images are preloaded on hover so clicking feels instant. AVIF format support for smaller file sizes where the browser supports it.

### 10. Structured outputs with strict JSON schemas for metadata
Not free-form JSON mode. Strict Zod + JSON Schema validation at the model level. Emotional tone is a closed 9-value enum, not free text. Relationship type is a closed 11-value enum. Primary topics come from a fixed vocabulary. This means downstream code can trust the output shape without defensive parsing.

---

## The middleware stack (10 layers, in order)

1. **Request flight tracking** — counts in-flight requests for graceful shutdown
2. **Compression** — gzip for JSON/text, skips images
3. **Request logger** — Pino structured logging
4. **Global rate limit** — express-rate-limit, configurable per env
5. **Security headers** — HSTS, CSP, X-Frame-Options
6. **CORS** — configurable origins, credentials enabled
7. **JSON parser** — skips multipart/form-data (for file uploads)
8. **Auth** — JWT validation, role-based (admin routes require admin)
9. **Validation** — Zod schema enforcement on request bodies
10. **Error handler** — catch-all, structured JSON error responses

---

## Questions an interviewer might ask

### Softballs
- **"Walk me through the project."** Use the 3-minute walkthrough above.
- **"Why did you build this?"** Family friend with a letter collection. The letters deserve to be readable and searchable. It's a real problem for a real person.
- **"What's the stack?"** TypeScript end to end. Express, React 19, Drizzle, Postgres, deployed on Google Cloud Run with Cloud SQL, Cloud Build, and Cloud Storage.

### Medium
- **"How does the AI pipeline work?"** Four stages: (1) transcription via OpenAI Vision, (2) human confirms transcript, (3) metadata extraction with structured outputs and guillemet tagging, (4) entity extraction with fuzzy matching and review queue. The human gate is between 1 and 3 so metadata always works from corrected text.
- **"How do you handle entity resolution?"** Canonical person/place registries with aliases, trigram-indexed for fuzzy search. AI extracts names with confidence scores. High confidence matches auto-link. Low confidence goes to a review queue for admin confirmation. Relationships built from co-occurrence in letters, stored as one-way edges, visualized as a D3 graph.
- **"How does the notification system work?"** 58 canonical types with severity levels. Fire-and-forget notify() call with deduplication via key + time window. SSE stream for real-time admin delivery. Sweeper detects stuck jobs, high failure rates, and worker silence autonomously.
- **"How do you test it?"** 46 Playwright E2E specs covering all admin workflows and public routes, plus accessibility audits with axe-core. About 25 Vitest unit test files for parsers, matching, notifications. Mocked specs for routes that don't need the full API.
- **"Why no state management library?"** React context (3 providers: HeaderDock, Upload, Toast) covers everything this app needs. No global client-side cache required because the data flows from the server. Adding Redux or Zustand would be complexity with no benefit.

### Hard
- **"Why not use a message queue like SQS or RabbitMQ?"** The workload is one worker, batch size 5, polling every 5 seconds. A message queue is another service to provision, monitor, and debug for a throughput need that doesn't exist. The database-backed registry handles retries, dead-lettering, and job recovery cleanly. If this needed multi-worker distributed processing, I'd add a queue. It doesn't.
- **"How do you handle the human gate at scale? What if you have 10,000 letters to verify?"** The gate is intentionally a bottleneck. The archive serves researchers and family members. An unverified transcript that hallucinates names or dates is worse than a slow pipeline. In practice, batching helps: upload a collection, let transcription run overnight, verify in batches the next day. The filename-driven ingest means upload itself is fast.
- **"What happens if the OpenAI API is down?"** Transcription fails after 3 retries, the letter gets a dead-letter flag, a critical notification fires via the sweeper. The rest of the pipeline is unaffected because stages are independent. When the API comes back, dead-lettered jobs can be retried from the admin UI. In dev, stub mode returns mock text so development isn't blocked by API availability.
- **"What would you change?"** Add OpenTelemetry tracing for pipeline latency debugging. Add a notification retention cleanup job. Tighten the image serving pipeline so it's fully Cloud Storage backed, not relying on Cloud Run's ephemeral filesystem. Add API versioning before the endpoint count grows further.

### Gotchas
- **"58 notification types seems like a lot. How do you prevent notification fatigue?"** Deduplication windows (same notification can't re-fire within 60 minutes by default), severity-based auto-expiry, and the admin can acknowledge or archive. The sweeper only fires critical notifications for genuine problems (stuck jobs, high failure rates), not for routine events.
- **"How do you handle letters that span multiple pages?"** Each letter has N letterPage records with page numbers and storage paths. The frontend renders them as a carousel with CSS scroll-snap. Transcription runs per-page, and the full transcript is the concatenation. The filename convention includes page number (`-01.jpg`, `-02.jpg`) so multi-page letters are automatically grouped.
- **"What's your approach to prompt engineering? Do you version prompts?"** Prompts are in source code (`src/ai/prompts/`), versioned with git. Each document type (letter, envelope, telegram, photo) has its own system prompt with type-specific extraction instructions. Changes to prompts go through the same code review and commit process as any other code change. No external prompt management system.
- **"You mention 43 migrations. Any painful ones?"** Adding the entity system was the biggest migration cluster: canonical tables, junction tables, review queue, relationship graph, indexes. Drizzle's migration journal tracks every change, and Cloud Build runs migrations as a separate job before deploying the new code, so the old code never hits a schema it doesn't understand.

---

## Public vs admin: what each side does

### Public site
Someone visits voicesthatremain.com and sees: a homepage with a featured letter and search bar. They can browse by collection, search by date/person/place/topic, read individual letters with the scan image alongside the transcript, explore people and places mentioned across letters, see a relationship graph showing connections between people, and read blog updates about the archive.

### Admin UI
The archive operator (currently just Mason and the collector) logs in and sees: a processing queue showing pipeline status, an upload page for batch-uploading scanned images, a letter review page for reading transcripts against scans and confirming them, entity management for confirming AI-extracted people and places, a notification inbox for pipeline health, a usage dashboard for API costs, and content editors for the blog and static pages.

---

## Cloud deployment flow

1. Code pushed to main
2. Cloud Build triggers
3. Pulls cached Docker images (layer reuse)
4. Builds backend and frontend in parallel
5. Pushes images to Artifact Registry
6. Deploys migration Cloud Run Job, runs it
7. Deploys backend and frontend Cloud Run services
8. Deploys worker pool
9. Total timeout: 40 minutes
