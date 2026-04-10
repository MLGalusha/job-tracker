---
name: resume-tailor
description: Generate a tailored resume for a specific job application by combining Mason's profile, the role.md analysis, and the resume-base template. Every claim must trace back to profile/skills.md (Tier A/B), profile/projects/*.md, or profile/wins.md. Use whenever Mason wants a resume for a specific role he's decided to apply to.
---

# resume-tailor

This skill produces `applications/<app_id>/resume.md` — a tailored resume for a specific job. It is the most truthfulness-critical skill in the system. Every claim it makes must be defensible in an interview against the actual shipped code in Mason's projects.

---

## When to invoke this skill

- Mason says "write the resume for the <company> one"
- Mason says "apply to <company>" and the previous step was `role-intake`
- The `role-intake` skill recommends applying and Mason confirms

**Do not run this skill if:**
- `role.md` for the app does not exist → run `role-intake` first
- `role.md` has `recommended_action: skip — hard filter` → ask Mason; don't auto-run on a skipped role
- `role.md` has `recommended_action: skip — comp below floor` → ask Mason
- Mason is just thinking about a role and hasn't decided → wait

---

## Prerequisites

Before running:
1. `applications/<app_id>/` directory exists
2. `applications/<app_id>/role.md` exists and has been run through `role-intake`
3. `profile/skills.md`, `profile/wins.md`, `profile/repos.md`, `profile/voice.md`, `templates/resume-base.md` all exist

---

## Research-backed contract (2026 updates)

Rebuilt on `notes/research/resumes-2026.md` and `notes/research/SYNTHESIS.md`. Five non-negotiables:

1. **Resume is an index, not the story.** Its job is to earn a click on the GitHub / demo / blog. Optimize for one-page density and project-first structure, not for comprehensive coverage.
2. **Single column, one page** for anything under 5 YoE. Mason is 0 YoE professionally — always one page. The 1.5-page exception previously allowed is retired.
3. **Projects-first ordering.** Selected Projects comes immediately after Summary. Skills comes after projects, not before. Education last.
4. **JD-phrase coverage sweet spot is 50-70%, not higher.** Above 70% triggers the "too mirrored" suspicion filter on LLM screeners and human reviewers. If you catch yourself pulling more than 70% of the JD's phrases into the resume, back off — leave some of them on the table and let the projects do the talking.
5. **Every project bullet must have a real engineering metric.** For Mason's projects (none have end-user counts), use latency, p95, eval scores, token cost, commit counts, endpoint counts, dataset size, LOC, build time, deploy frequency. **Never fake user counts.** Never invent metrics. If a project has no defensible number, that's a signal the bullet shouldn't be on the resume.

---

## The truthfulness contract (READ THIS FIRST)

**A tailored resume may only contain claims that trace to one of:**
1. **Tier A of `profile/skills.md`** (production-validated, shipped in a real project)
2. **Tier B of `profile/skills.md`** — but only with hedged language ("familiar with", "experience with"), never as a strength
3. **A `profile/projects/*.md` file** where the claim is in the "Claim guardrails" section
4. **`profile/wins.md`**

**Never:**
- Invent years of experience Mason doesn't have
- Soften a 🔴 Gap from `role.md` into a claim
- Copy JD language into the resume if Mason can't defend it
- Claim frameworks or tools Mason hasn't used
- Put Tier C (learning/gaps) items on the resume at all
- Claim something "we" built when Mason built it solo
- Overstate a side project's status ("shipped in production" when `repos.md` says "functional internal tool, not publicly deployed")

**When in doubt, omit.** A shorter resume that's 100% defensible beats a longer resume with one line you can't talk to.

**If you find yourself wanting to make a claim that isn't supported:** either (a) ask Mason for a citation and add it to the profile first, then use it, or (b) note it in the gap report and leave it off the resume.

---

## The pipeline

### 1. Read the inputs (targeted, not exhaustive)

Read in this order:
- `applications/<app_id>/role.md` — the whole file
- `profile/skills.md` — whole file, you'll be citing from it constantly
- `profile/voice.md` — voice rules, banned phrases, formality dial
- `profile/wins.md` — whole file, source of quotable bullets
- `profile/repos.md` — to decide which repo links go on this resume
- `profile/comp.md` — for comp signaling (don't put comp on resume, but you need it for the "summary" tone)
- `templates/resume-base.md` — the max-volume source that the tailored resume is a *subset and reordering* of
- **Then selectively** read `profile/projects/*.md` for projects you intend to lead with (usually 2–4, not all 5)

Don't read every project file. Read only the ones you'll cite.

### 2. Decide the lane-specific shape

Read `role.md`'s `lane` field and adapt the resume shape:

| Lane | Summary tone | Projects to lead with | Skills emphasis | Key differentiator |
|---|---|---|---|---|
| `founding` | Shipping speed, solo execution, range | VTR, Staffclaw, OpenClaw | Agent-directed dev, full-stack TS, GCP | "Shipped VTR solo in 3 weeks, agent-directed" |
| `ai-engineer` | Production AI pipelines, cost-tiered models, HITL | VTR, PianoTranscriber, SonicGen | OpenAI API (GPT-5.4 + GPT-5.4-mini tiering), HITL, structured outputs | "Production vision pipeline on OpenAI Responses API with strict schemas and human gate" |
| `fde` | Ability to teach customers to build with agents, translation skill | VTR, OpenClaw | Agent-directed dev, reverse-engineering, customer-facing framing | "I direct agents on real production systems and could teach your customers to do the same" |
| `fullstack-ai` | Full-stack TypeScript, AI integration, shipping | VTR, Staffclaw | TypeScript end-to-end, React 19, Express, OpenAI API | "TypeScript end to end, AI in production" |
| `local-raleigh` | Shipping work, bootcamp + local context | VTR, Staffclaw, PianoTranscriber | Full-stack, bootcamp, local | Softer on agent-directed angle unless the company signals it's agent-friendly |
| `off-lane` | **Do not tailor. Ask Mason if he really wants to apply.** | — | — | — |

### 3. Select projects (2–4, not all 5)

From `profile/projects/`, pick the 2–4 projects that best match the JD's priorities (read from `role.md` required list). Ordering rule:
1. **VTR is almost always #1** — it's your only shipped production project with real users. The only exception is a role that's purely about ML training depth (in that case lead with PianoTranscriber and put VTR second).
2. **#2 slot** goes to the project whose `projects/*.md` "Claim guardrails" section most directly hits the JD's required list.
3. **#3 slot** is for range — pick something that shows a different capability than #1 and #2.
4. **#4 slot** only if you still have space. Usually skip.

For each selected project, write 3–5 bullets that combine what `projects/*.md` says with verbs and numbers from `wins.md`. Each bullet must be traceable to a specific line in one of those files.

### 4. Tailor the Summary

Rewrite the Summary section from `resume-base.md` to lead with the lane's framing. Three sentences max. Must include:
- What Mason is (AI-native engineer / full-stack TS engineer / founding-engineer-shaped)
- One concrete shipped thing (VTR, almost always)
- What he's looking for (one clause, matched to this role's lane)

Do not include comp numbers on the resume. Do not include a list of "years of experience."

### 5. Tailor the Skills section

From `profile/skills.md` Tier A and Tier B, pick the subset that maps to this JD. Ordering rule:
1. **Agent-directed development** stays near the top for agent-friendly companies; drop it below Languages for traditional companies
2. **Languages** — list only the ones in Tier A (shipped code), order by relevance to this JD
3. **Frontend / Backend / AI-ML / Cloud / Other** — order the headers by this JD's priorities (read the JD's required list)
4. **Do not list Tier C items.** Ever.
5. **Do not pad with items the JD doesn't care about.** If the JD is for a backend Python role, don't include React just because it's in Tier A.

### 6. Repo links — check repos.md

For any project you link, the link URL comes from `profile/repos.md`:
- **VTR** — link `voicesthatremain.com`, never the repo
- **Staffclaw** — link the public GitHub repo. **The Staffclaw narrative arc is fixed and important. Lead with it in this exact order:**
  1. **OpenClaw mapped all 92 Teamworxs API endpoints in one agent session** — including the manager and owner endpoints Mason had no access to as a cook, with full request/response shapes. This is the *enabling* discovery.
  2. **Reverse-engineered the entire app, not just the employee side** — Mason set out to rebuild Teamworxs's manager schedule editor too, using only the discovered API surface.
  3. **Drop-in replacement architecture** (this is the killer signal): Staffclaw is a transparent client over Teamworxs's actual backend. Users log in with their real Teamworxs credentials, Staffclaw stores the Teamworxs session cookie, every read/write proxies through Teamworxs's API on the user's own cookie. **Migration cost from Teamworxs to a finished Staffclaw would be literally zero — log in with the credentials you already have, no data export, no company onboarding.** Verified in `server/src/routes/auth.ts` and `server/src/services/teamworxs.ts`.
  4. **Multi-source external APIs as input for an auto-scheduler** — Alamo Drafthouse public showtime/ticket data, weather APIs, local-events data, history analyzer. The auto-scheduler is the hard unsolved problem; the multi-source data layer exists to feed it, not as a vanity dashboard. Verified in `services/alamo.ts`, `services/weather.ts`, `services/showtime-poller.ts`, `services/history-analyzer.ts`, `routes/demand.ts`, `cron/weather-fetcher.ts`.
  5. **Paused when VTR took priority.**

  **Do NOT lead Staffclaw with "I built a schedule dashboard" or "I built a pre-shift briefing." The pre-shift briefing is a byproduct.** The architecture (drop-in replacement via credential proxying) and the discovery (full API surface including manager-side via agent) are the parts that prove unique technical thinking.
- **PianoTranscriber** — link the public GitHub repo
- **SonicGen** — link the public GitHub repo (`github.com/MLGalusha/SonicGen`). Standalone audio dedup engine. Use the **"written by hand, no coding agents"** framing as a counter to "only ships via agents" interview objections — this is one of SonicGen's most valuable signals.
- **job-tracker** — link only if the JD mentions agent-directed work explicitly
- **OpenClaw, the private `truth-engine` dev repo, line-finder** — **no link**. Reference in prose only if relevant. (For SonicGen, always link the public `MLGalusha/SonicGen` repo, never the private `truth-engine` dev repo it was developed in.)

If you catch yourself writing a URL that isn't in `repos.md`, stop and re-check.

### 7. Length discipline

- **Hard target: one page. Single column.** No exceptions for Mason's current experience level.
- **Projects-first structure.** Summary → Selected Projects → Skills → Education. Do not reorder.
- **Cut first:** the Background note about the cooking job. Include only if the lane is `local-raleigh` or Mason explicitly wants it in.
- **Education stays short.** Bootcamp + CS50. No fluff. No "6-month intensive" credential-padding per voice.md rule 3.

### 7.5. JD coverage cap check

After drafting bullets and the skills section, count the JD phrases you've echoed back in the resume. If coverage is **above 70%**, pull some back. The research calls this the "too mirrored" suspicion filter — reviewers and LLM screeners both flag resumes that read like a JD restatement. Target 50-70% coverage. Leave some JD phrases on the table deliberately and let the lead project do the talking.

If coverage is **below 40%**, the lane is wrong and you should flag that to Mason before continuing.

### 7.6. Engineering metrics check

Scan every project bullet. Each one should have a concrete engineering number. Acceptable number shapes for Mason's projects:
- Commit counts, LOC, endpoint counts, dataset size (bytes, rows, files)
- Latency (ms, p95), eval scores, model accuracy, token cost
- Build time, cold-start time, deploy frequency
- Time budget ("shipped in 3 weeks"), solo-execution claim

**Unacceptable numbers for Mason's projects:**
- User counts for projects without real users
- "Increased X by Y%" when there's no baseline
- "Processed N records" when N is fabricated
- Any round number that isn't traceable to profile files

If a bullet has no defensible number, either find one from `wins.md` / `projects/*.md` or cut the bullet.

### 8. Voice audit (blocking)

Before writing the file, scan your draft against `profile/voice.md`. Blocking violations:

- Any banned phrase from rule 3 (*passionate, rockstar, synergy, extensive experience, helped build, strong fundamentals, results-oriented, self-starter, capstone, intensive* in credential-padding context)
- **Any word from rule 15's banned LLM vocabulary** (*leveraged, spearheaded, delve, seamless, robust, cutting-edge, state-of-the-art, tech-savvy, adept, pivotal, tapestry, ecosystem, empower, foster, streamline, game-changing, best-in-class, world-class, transformative, innovative* without concrete justification, *disrupt*, etc.)
- Any em-dash in a sentence (rule 14) — acceptable only in headers and date ranges
- Any stacked hyphen compound adjective (rule 14)
- Any approximation tilde (rule 14)
- Any pipeline arrow in prose (rule 14)
- Any brand-name drop in bullet prose (rule 12) — brand names belong in the Skills section only
- Any framing that makes Mason sound like he builds LLM infrastructure (rule 11)
- Any AI-washing of Mason's projects (rule 18)
- Any self-deprecation (rule 9)
- Agent-directed framed as a caveat instead of a capability (rule 4)
- Any summary sentence that spends more than ~10 words describing a single project (rule 13)
- Any bullet that uses "Responsible for" instead of a first-person declarative verb

When a violation is found, rewrite the whole bullet. Don't patch.

### 9. Write the file

Write to `applications/<app_id>/resume.md`. Use markdown. Structure:

```markdown
# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

<tailored 2-3 sentences>

## Selected projects

### <Project Name> — <year>
**<link>** · <one-line framing>
- <bullet with concrete verb + number>
- <bullet>
- <bullet>

### <Project 2> — <year>

**Title format rule:** project headers are **just the project name and the year** — no "Solo builder," no "Solo builder + architect," no "Primary builder," no "(UNC Chapel Hill AI bootcamp capstone)." Keep it minimal: `### <Name> — <year>`. Solo / role information belongs in the body of the bullets if it matters at all, not in the header.

## Skills

**<Category>:** <tier-A items>
**<Category>:** <tier-A items>

## Education

**UNC Chapel Hill AI Bootcamp** — 6-month intensive, May–December 2024
- <1 line>
```

### 10. Log the artifact via application-logger

After writing the file, invoke `application-logger` to record that the resume was produced:

```bash
cd ~/Workspace/job && pnpm log resume_updated --app_id=<app_id> --path=applications/<app_id>/resume.md --summary="Initial tailored resume for <role>"
```

### 11. Write a gap report alongside

In the same directory, write `applications/<app_id>/resume-gaps.md`:

```markdown
# Resume gap report — <company> <role>

Claims the JD wanted that were NOT put on the resume because they aren't supported by the profile. These go to the `interview-prep` skill as study topics, NOT on the resume.

- **Gap 1** — JD wants X. Profile has Y (closest). Reason it's still a gap: ...
- **Gap 2** — ...

## Claims on the resume that might get probed in an interview

- Claim 1 — defensible because: <citation to profile or project file>
- Claim 2 — ...
```

This file is how `interview-prep` knows what to prepare for later.

### 12. Report to Mason

Report:
- Path to the resume
- 1-line summary of the shape (which projects you led with, which skills you emphasized)
- The gap list in 2–5 bullets
- Any truthfulness concerns you had while writing (if any)
- Anything you *wanted* to put on the resume but couldn't — so Mason can decide to add evidence to the profile if it exists

---

## Rules and guardrails

- **Every bullet must be defensible.** If Mason can't talk about the specific line in an interview, cut it.
- **No "X years of experience" claims.** Mason doesn't have years of professional experience. He has shipped projects. Let the projects do the talking.
- **No claims beyond `resume-base.md`.** The base is the ceiling. Tailored resumes are a subset and reordering — never stronger than the base.
- **Agent-directed framing stays confident.** Never "I also use AI tools" — always "I build primarily by directing coding agents." See `voice.md` and `wins.md`.
- **Do not flatter the JD by mirroring its language if Mason can't back it up.** If the JD says "5+ years of Kubernetes in production" and Mason has no Kubernetes experience, do not write "Familiar with modern container orchestration." Just leave it off.
- **Comp lane awareness:** do not put numbers on the resume, but know which lane you're writing for. A resume for a $100k local Raleigh role reads differently than one for a $140k remote AI-native role.
- **Write once, revise once.** If the first draft feels wrong, read it against `voice.md` and fix. Don't ship a first draft.

---

## What this skill does NOT do

- Does **not** write the cover letter (that's `cover-letter-writer`).
- Does **not** do company research (that's `company-research`).
- Does **not** apply to the job or submit the resume anywhere.
- Does **not** mutate application status — that's `application-logger` when Mason actually submits.
- Does **not** write to `data/` files directly. Uses `pnpm log` via the `application-logger` skill to record the artifact.
- Does **not** overwrite an existing `resume.md` without asking first. If a tailored resume already exists for this `app_id`, ask Mason whether to revise or replace.
