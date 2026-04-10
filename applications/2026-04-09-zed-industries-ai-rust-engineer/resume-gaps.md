# Resume gap report — Zed Industries AI Rust Engineer

Claims the JD wanted that were NOT put on the resume because they aren't supported by the profile. These go to `interview-prep` as study topics, not on the resume.

## Gaps (study-guide priorities, NOT on the resume)

- **Rust experience.** JD requires "Experience with Rust, or willingness to learn." Mason has zero Rust. The "willingness to learn" escape hatch is valid, but any interview will probe this. Study-guide priority: work through the Rust Book chapters 1–10 and a small CLI before any on-site, and be ready to explain *why* Rust for editor internals (memory, perf, no GC, tree-sitter C interop, WASM plugin story).

- **Formal LLM evaluation systems.** JD requires "strong understanding of model behavior, prompting, and evaluation" and preferred "designing evaluation systems for LLM-driven products." VTR has prompt tuning and tiered model selection but no held-out test set, no metric definitions, no regression harness. Study-guide: read Anthropic's evals guidance and OpenAI's evals framework; be ready to sketch *how you would* build an eval system for VTR (ground-truth transcription set, BLEU or edit-distance on transcripts, entity extraction F1, a regression gate before deploy).

- **Systems programming in the Rust / C++ / compilers sense.** JD asks for "strong backend or systems programming experience." Mason's backend is application-layer TypeScript, Express, and Postgres. Not on the resume as systems programming. Study-guide: be ready to honestly frame the backend work as application-layer depth, and talk about what you'd *want* to learn on Zed's stack (editor event loop, tree-sitter parsing, incremental recomputation).

- **Large codebase or compiler work.** JD preferred. VTR is around 15,000 lines; Zed is orders of magnitude larger. Nothing on the resume claims large-codebase experience. Study-guide: read Zed's public repo before any interview — the `crates/` layout, how the GPUI framework is organized, how the assistant and AI crate fit in. Be able to show you've actually navigated it.

- **Building shipped dev tools.** The job-tracker (this repo) is an agent-native dev tool in progress but not shipped. Not on the resume. Can be mentioned in the cover letter as "the agent-native tool I'm currently building."

## Claims on the resume that might get probed in an interview — defensibility

- **"Multi stage vision pipeline on the OpenAI Responses API with strict JSON schema structured outputs and tool calling."** Defensible: see `profile/projects/voices-that-remain.md` and VTR source (`docs/ai.md`, `server/src/ai/`). Can walk through the Responses API call shape, the Zod-to-JSON-schema conversion, and how strict mode fails closed on the rare schema violation.

- **"GPT-5.4 for user visible work, GPT-5.4-mini for the audit and resync step."** Defensible: documented in VTR `.env.example` and `usage-tracking.ts`. Can explain the per call cost math and why the audit step tolerates a weaker model. This is the concrete "cost and quality tradeoff" story the JD wants.

- **"Separate prompts for each document type (letters, envelopes, telegrams, photos), tuned independently."** Defensible: the prompts directory in VTR has one file per type. Can talk about what changed between letter and envelope prompts specifically (envelope = address parsing + postmark dates; letter = transcription + entity resolution).

- **"Human verification gate after transcription, corrections flow back into downstream extraction."** Defensible: the admin UI in VTR has the review queue. Can screenshare during interview (VTR is hosted, `voicesthatremain.com`).

- **"Around 15,000 lines and 547 commits at launch."** Defensible: `git log`, `cloc`. Expect the interviewer to ask what's in those lines; be ready to break it down (backend, frontend, AI pipeline, tests).

- **"Deployed on Google Cloud: Cloud Run, Cloud SQL, Cloud Build, Cloud Storage. Drizzle migration journal for zero downtime schema changes."** Defensible: the `cloudbuild.yaml` and `drizzle/` migration directory. Expect questions about how rollbacks work and what happens on a breaking migration.

- **"Trained a PyTorch CNN on MAESTRO (around 200 hours, roughly 100 GB preprocessed)."** Defensible: `profile/projects/piano-transcriber.md` and the public repo. Expect questions about the spectrogram preprocessing and why 11 ms resolution. Be ready.

- **"Training ran about a full week on a GCP GPU VM inside a two week sprint at the end of the bootcamp."** Defensible: this is the real timing from `profile/wins.md`.

- **SonicGen claims — alignment offset matching, fan value 3, 25×25 peak detection, 18+ aligned hashes threshold, ≥40% alignment ratio.** Defensible: public repo at `github.com/MLGalusha/SonicGen`, every constant is in the code. Be ready to explain *why* alignment offset matching is the correctness insight (collision count alone is not enough; the dominant `t_ref - t_query` offset is the signal). Supabase-was-wrong retrospective should be ready: fingerprint queries are range scans over int64 hash columns where Postgres indexes work fine but Supabase's row-level security and connection pooling added latency the workload didn't need; DuckDB or a local SQLite + memory-mapped file would have been better.

- **"Written by hand, no coding agents"** (SonicGen framing). Defensible and important: this is the direct counter to a "you only ship via agents" interview objection. Git history on the SonicGen repo shows the commit cadence.

- **Staffclaw: OpenClaw mapped 92 undocumented Teamworxs endpoints in one agent session, including manager and owner routes.** Defensible as narrative: the mapped endpoint surface is in Mason's notes and the Staffclaw source references most of them. OpenClaw itself is not public, so treat this as a story that's verified by the Staffclaw source rather than by a public OpenClaw repo.

- **Staffclaw as a transparent client over Teamworxs's actual backend (drop-in replacement, users log in with their real Teamworxs credentials, every read and write proxies through Teamworxs's API on the user's own session cookie).** Defensible: `server/src/routes/auth.ts` and `server/src/services/teamworxs.ts` in the public Staffclaw repo. The `sessions` table has a `tw_cookie` column. This is the killer architectural signal; be ready to walk through the auth flow line by line.

- **Staffclaw multi source data layer (Alamo showtime and ticket data, weather, local events, history analyzer) as input for an auto scheduler.** Defensible: `services/alamo.ts`, `services/weather.ts`, `services/showtime-poller.ts`, `services/history-analyzer.ts`, `routes/demand.ts`, `cron/weather-fetcher.ts`. Be ready to explain why the auto scheduler is the hard unsolved problem and why the multi source layer exists to feed it (not as a vanity dashboard).

- **Agent directed development as daily practice.** Defensible: Mason is a daily Claude Code and Codex user and shipped VTR this way. Expect questions about what he does when the agent is wrong, how he reviews diffs, where he draws the line. The SonicGen "written by hand" bullet is the counter evidence that he *can* write code without agents when the task demands it.

## Things I wanted to include but couldn't

- Any claim about dev tools shipping. Job-tracker is in progress; can reference in cover letter, not resume.
- Any Rust claim. None. Pure study-guide priority.
- A formal eval framework claim. Would love to have this; don't have it yet. Could be a post-application project if the interview loop is long.
