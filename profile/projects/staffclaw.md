# Staffclaw

**Repo:** `~/Workspace/projects/staffclaw/`
**Status:** Active WIP (functional internal tool, not a public product)
**Role:** Solo builder + architect
**Timeline:** Early 2026 (same period as OpenClaw — OpenClaw is the agent reconnaissance layer Mason used to map the API surface; Staffclaw is the full-stack app he built on top of that map. See `openclaw.md`.)
**Scale:** ~104 source files (TS/TSX), 35 commits

## One-liner
A drop-in replacement for Teamworxs (the timekeeping/scheduling app Mason's employer used), built as a **transparent client over Teamworxs's actual backend**, with multi-source API integrations layered on top to power an auto-scheduler that solves the demand-prediction problem Teamworxs ignores.

## The full story (this is the right narrative arc, lead with this)

### 1. OpenClaw discovers the entire API surface (the enabler)
Mason started with **OpenClaw** (see `openclaw.md`), an agent setup that scraped Teamworxs and mapped the undocumented API. In a single agent session it discovered **all 92 endpoints** Teamworxs uses — not just the employee endpoints Mason had access to as a cook, but also the **manager and owner endpoints** he had no access to. For each endpoint the agent captured the request shape and the response shape. This was the enabling discovery: enough information to reverse-engineer the entire Teamworxs application, both sides.

### 2. Reverse-engineer the entire app, not just the employee side
Staffclaw isn't just "a better employee dashboard." Mason set out to rebuild the **entire** Teamworxs application — employee schedule view + the manager schedule editor + the owner-side configuration — using only the discovered API surface. The model is that Teamworxs's UI is replaceable; the value is locked in the backend, and once the backend is understood, anyone with credentials can build a better front.

### 3. Drop-in replacement architecture (the killer technical signal)
**Staffclaw is a transparent client over Teamworxs's real backend.** The auth flow works like this (verified in `server/src/routes/auth.ts` and `server/src/services/teamworxs.ts`):

1. User logs into Staffclaw with their **actual Teamworxs username and password**
2. Staffclaw posts those credentials to Teamworxs's login endpoint at `https://drafthouse.ct-teamworx.com` and gets back a session cookie
3. Staffclaw stores that cookie in its `sessions` table (`tw_cookie` column) keyed to the Staffclaw session
4. Every subsequent read and write Staffclaw makes goes through Teamworxs's actual API, on the user's own Teamworxs session cookie

The architectural consequence: **the migration cost from Teamworxs to a finished Staffclaw would be literally zero.** No data export. No company-wide rollout. No "switch all employees over." Each user just logs into Staffclaw with the same credentials they already use for Teamworxs and the data is the same data because it's the same backend. Mason could have shipped this to his coworkers as a drop-in upgrade.

### 4. External APIs for the auto-scheduler (the hard unsolved problem)
The reason Staffclaw also pulls in the **public Alamo Drafthouse showtime/ticket data, weather APIs, local-events data, and a history analyzer over past shifts** isn't because the pre-shift briefing is the goal — that briefing is a **byproduct of building an auto-scheduler**. Restaurant + movie-theater scheduling is genuinely hard because demand depends on weather, sold-out screenings, special events, and local foot traffic — none of which Teamworxs models. The multi-source data layer exists to feed an **auto-scheduler** that would actually solve the hardest part of the manager's job. Mason had partially built the scheduling logic and the demand-forecasting route when he had to pause.

### 5. Why it's paused
VTR came along and took priority. The drop-in architecture means a finished Staffclaw could ship as a free upgrade to anyone using Teamworxs at any Alamo Drafthouse (or anywhere else Teamworxs is deployed) — but only if it's *finished*. Mason no longer works at Alamo Drafthouse, but he still has the discovered endpoint surface and the partial implementation.

## What Mason is most proud of (lead with this in interviews)
1. **Using an agent to discover an entire undocumented API surface, including endpoints he had no access to** — manager and owner endpoints came back in the same session as employee ones, complete with request/response shapes.
2. **The transparent-proxy architecture** — Staffclaw is structurally a UI layer over Teamworxs's own backend, which means switching is frictionless and there's no data migration story. This is a sophisticated design choice, not an accident.
3. **Recognizing that the hard problem is demand prediction** — and building the multi-source data layer specifically to feed an auto-scheduler, not as a vanity dashboard.

## Why it exists
Mason worked full-time as a cook at Alamo Drafthouse in Raleigh from late 2024 through March 2026. The existing scheduling software (Teamworxs) was frustrating — late schedule postings, no guest-count data, no easy way to see who you were working with, no demand forecasting. Mason wanted a better version for himself and his coworkers, so he reverse-engineered the Teamworxs API and started building a replacement. This project is the clearest example of his "build systems to solve problems I actually experience" pattern.

**Lineage:** Staffclaw grew out of **OpenClaw** (see `openclaw.md`) — the personal agent setup that mapped the Teamworxs API and shipped Mason a daily Discord summary of his upcoming shift. OpenClaw and Staffclaw were built in the same period in early 2026; OpenClaw was the reconnaissance layer and Staffclaw was the "take all that data and build the dashboard Teamworxs should have been" project built on top of it.

**Deployment status:** Staffclaw is a **functional internal tool**, not a publicly deployed product. Mason runs it locally against the real API (and in demo mode for testing). It's not in production in the sense of serving other users, but it is real working software — 35 commits of substantive feature work, a test suite, and a full UI, not a weekend stub.

## Architecture (verified from source)

### Backend
- **Runtime:** Node.js 20+ (ESM, `.js` extensions required)
- **Framework:** Express 5.0
- **Language:** TypeScript
- **ORM:** Drizzle 0.38 with Postgres 3.4
- **Auth:** Session-based, 4-hour expiry, Teamworxs API integration (reverse-engineered and undocumented)
- **Demo mode:** Available for testing without hitting the real Teamworxs backend
- **Testing:** Vitest

### Frontend
- **Framework:** React 19
- **Build:** Vite
- **Styling:** CSS modules
- **Language:** TypeScript with shared type aliases across the monorepo

### Integrations
- **Teamworxs API** — Mason reverse-engineered the endpoints himself; the API is undocumented, and the type/field names were inferred from response shapes

## Features (verified from git log)
- **Dashboard overhaul** — week navigation, actual vs scheduled hours, messages panel, alerts, 6-container grid layout, Gantt-style schedule view, dark theme with amber accents
- **Theater Assignments view** with showtimes, auto-assign, and click-to-assign
- **Available shifts view** with offer / swap / take-back flows
- **Historical data analyzer** for employee patterns and certifications
- **Schedule comparison dashboard** with side-by-side analysis of generated vs actual schedules
- **Statistical analysis for staffing optimization** — uses historical patterns to drive the schedule generator
- **Comprehensive test suite** (Vitest)

## Hard problems solved
- **Reverse-engineered an undocumented third-party API** well enough to build a real client against it with session auth and correct field inference. This is the same skill that produced the "mapped 92 API endpoints in one agent session" anecdote from his first LinkedIn post — which was OpenClaw, the predecessor.
- **Session-based auth flow** for an API that wasn't designed to be a public API — including handling the 4-hour expiry and re-auth.
- **Full-stack TS monorepo with shared types** between the Express backend and React frontend — type safety across the wire.
- **Schedule generation engine** with position-category and shift-constraint logic (domain-specific — movie theater cook / FOH shifts have constraints most scheduling tools don't model), plus a statistical layer that learns from historical employee patterns.

## Interview talking points
- **Lead with:** "I reverse-engineered the undocumented API my employer used for scheduling and built a replacement tool around it. The scheduler's API wasn't public, so I mapped it through observed network traffic and tested my assumptions against real responses until I had a working client."
- Full-stack TypeScript (Express backend, React frontend, Drizzle/Postgres persistence) with shared types
- Session auth, demo mode for testing, proper handling of session expiry
- Domain-specific schedule logic (position categories, shift constraints)
- The same "build things that solve real problems" instinct that produced VTR

## Claim guardrails
Things Mason can fully defend in an interview based on this project:
- Full-stack TypeScript web apps
- Reverse-engineering undocumented third-party APIs
- Session-based auth implementation
- Express 5, React 19, Drizzle, Postgres
- Monorepo patterns with shared types between backend and frontend
