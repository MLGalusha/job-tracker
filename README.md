# Job Tracker

Personal, agent-native job-search management. Built to be driven by Claude Code.

## Architecture at a glance

- **Agent-first.** Claude Code is the primary interface. The web app is a viewer/editor.
- **Event-sourced.** `data/events.jsonl` is the source of truth. Views like `data/applications.json` are derived.
- **Write gate.** Mutations go through `scripts/events/log.ts`, not direct JSON edits. This keeps agent-driven updates consistent over time.
- **Profile-driven.** Everything in `profile/` feeds resume/cover-letter tailoring. `profile/skills.md` enforces truthfulness — the agent may not claim anything not listed there.

## Layout

```
profile/          # Mason's brain — read by every drafting skill
data/             # events.jsonl (SoT) + derived JSON views
applications/     # per-application folder: role, research, resume, cover letter, study guide
templates/        # base resume + cover letter
schemas/          # shared TypeScript types + Zod schemas
scripts/          # event log + derive step
web/              # Vite + React + Tailwind viewer
.claude/skills/   # project-local skills
```

## Common commands

```bash
pnpm install
pnpm log <event_type> [--flags]    # append an event
pnpm derive                        # rebuild derived views
pnpm web                           # start local dashboard
```

## Truthfulness rule

Resumes and cover letters may only claim skills/experiences listed in `profile/skills.md` (production-validated or familiar sections), `profile/projects/*.md`, or `profile/wins.md`. No fabrication. Gaps go to study guides, not resumes.
