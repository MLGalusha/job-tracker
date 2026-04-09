# OpenClaw

**Repo:** `~/Workspace/projects/google-api-tools/` (personal, not currently public). The directory is literally named `google-api-tools` because it also contains a separate Gmail + Calendar OAuth experiment (`auth.js`, `credentials.json`, `token.json`) that's unrelated to OpenClaw — two experiments sharing a folder. OpenClaw-specific state lives in `~/.openclaw/` (Discord token, 4-hour TW session cache, shift-briefing dedup state).
**Status:** Shipped (for personal daily use). Parent project of Staffclaw.
**Role:** Solo builder + architect
**Timeline:** 2025 (predates Staffclaw)

## One-liner
A personal agent setup that reverse-engineered the undocumented Teamworxs scheduling API and the Alamo Drafthouse ticketing site, then delivered Mason a daily Discord summary of his upcoming shift — who he's working with, what movies are playing, which shows are busiest, when mids leave — one hour before clock-in.

## Why it exists
The existing Teamworxs app showed a schedule and nothing else. Mason wanted the actual answer to "what is today going to be like?" — staffing, showtimes, projected guest counts — without clicking through three apps every morning. OpenClaw was the one-agent-session experiment that proved the data was reachable; Staffclaw was the eventual "real dashboard" that grew out of it.

## What it actually does (core files, verified from source)
- `teamworxs-api-summary.js` (341 LOC) — Teamworxs API reconnaissance + summary generator
- `alamo-api-summary.js` (350 LOC) — Alamo Drafthouse public site scraping (showtimes, ticket sales)
- `auto-shift-briefing.js` (488 LOC) — the Discord auto-poster (cron-friendly; sets `process.exitCode = 0` on errors so cron doesn't retry on transient failures)
- `shift-report.js` — full briefing via Puppeteer when the API path doesn't suffice
- `tw-daily-brief.js`, `tw-weekly-schedule-report.js`, `tw-hours-worked-report.js`, `tw-shift-reminder-message.js` — report generators
- `scripts/teamworxs/tw-shared.js` — shared Teamworxs client with session caching
- **Session cache:** `~/.openclaw/workspace/tw-session.json` (4-hour TTL)
- **Dedup state:** `~/.openclaw/workspace/shift-briefing-state.json` (prevents duplicate Discord sends)

1. **Reverse-engineered API mapping session.** In a single Claude Code / agent session, Mason had the agent crawl the Teamworxs frontend and enumerate its network traffic to produce a map of **92 undocumented API endpoints** across Teamworxs + the Alamo Drafthouse public site, including manager-only routes Mason did not himself have access to through the UI. This is the anecdote from his first published LinkedIn post.
2. **Dual data source ingestion.** Parallel scraping of:
   - Teamworxs (schedule, coworkers, shifts, assignments)
   - The Alamo Drafthouse public site (showtimes, ticket sales, projected house fill per auditorium)
3. **Daily cron.** Runs one hour before Mason's shift each day. Pulls fresh data from both sources, composes a summary, posts it to a private Discord channel.
4. **Conversational follow-up.** Mason can reply to the Discord message and ask follow-up questions — "what's the busiest hour today?", "when do the mids leave?", "what's playing in theater 4?" — and the bot answers from the cached data.

## Hard problems solved
- **92-endpoint API map produced in one agent session.** The thesis line Mason has already published: *"A year ago, mapping an undocumented API meant days in browser dev tools reading minified JavaScript. An AI agent did it in one session. The barrier to building on top of any software you use is effectively gone."*
- **Scheduled ingestion pipeline** tied to Mason's actual work calendar (the cron triggers are derived from the scraped schedule itself — the bot knows when to fire because it already knows when his next shift is).
- **Cross-source data fusion** — combining workforce data (Teamworxs) with demand data (ticket sales from the public site) to produce a single shift-preview view that neither source offered on its own.
- **Agent-driven reverse engineering as a first-class workflow.** OpenClaw is the clearest single example in Mason's work of "direct the agent to explore an unfamiliar system, verify its output, and build on top."

## Why it matters for the job search
- **OpenClaw is the proof point for the "reverse-engineer undocumented APIs with coding agents" thesis.** Staffclaw is the downstream product; OpenClaw is the capability demonstration.
- It is the subject of Mason's first published technical writing (LinkedIn post, April 2026) and the story that most reliably lands the "here is what AI-native engineering actually looks like" point in conversation.
- Personal use ≠ toy. It ran daily for months and actually changed how Mason prepared for his shifts.

## Interview talking points
- **Lead with the anecdote:** "I had my agent map 92 undocumented API endpoints across two sites in one session — including manager-only routes I couldn't reach through the UI — and built a daily Discord summary bot on top. That was the moment I understood what agent-directed development could actually do."
- The split between OpenClaw (personal data layer + bot) and Staffclaw (the full dashboard that grew from it) — both are the same core insight expressed at different levels of ambition
- The cron-driven fire-and-forget workflow, tied to the user's own scraped schedule
- Conversational follow-up via Discord as a lightweight UX that beat building a custom app

## Claim guardrails
Things Mason can fully defend in an interview based on this project:
- Agent-directed reverse engineering of undocumented APIs at scale
- Python scheduling / cron automation
- Discord bot integration
- Multi-source data fusion (workforce + public-site scraping)
- Puppeteer / browser automation (the scraping layer)
- **Do not overclaim as "publicly deployed" — it's a personal tool that Mason used daily, not a product with other users.**
