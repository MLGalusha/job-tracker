# Staffclaw

**Repo:** `~/Workspace/projects/staffclaw/`
**Status:** Active WIP (functional internal tool, not a public product)
**Role:** Solo builder + architect
**Timeline:** 2025–2026
**Scale:** ~104 source files (TS/TSX), 35 commits

## One-liner
Full-stack workforce scheduling replacement for Alamo Drafthouse theater staff, built by reverse-engineering the undocumented Teamworxs timekeeping API that Mason's employer used.

## Why it exists
Mason worked full-time as a cook at Alamo Drafthouse in Raleigh from late 2024 through March 2026. The existing scheduling software (Teamworxs) was frustrating — late schedule postings, no guest-count data, no easy way to see who you were working with, no demand forecasting. Mason wanted a better version for himself and his coworkers, so he reverse-engineered the Teamworxs API and started building a replacement. This project is the clearest example of his "build systems to solve problems I actually experience" pattern.

**Lineage:** Staffclaw grew out of **OpenClaw** (see `openclaw.md`) — the earlier personal agent setup that originally mapped the Teamworxs API and shipped Mason a daily Discord summary of his upcoming shift. Once the API surface was understood, Staffclaw became the "take all that data and build the dashboard Teamworxs should have been" project.

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
