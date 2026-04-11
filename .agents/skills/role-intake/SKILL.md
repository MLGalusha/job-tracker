---
name: role-intake
description: Turn a job posting URL or pasted JD into a structured role.md file inside applications/<app_id>/. Extracts company, role, JD text, inferred lane (founding/AI eng/FDE/full-stack/local), required vs nice-to-have skills, fit notes against Mason's profile, and an honest truthfulness-gap list. Use whenever Mason shares a job link, pastes a JD, or asks "is this worth applying to?".
---

# role-intake

This skill converts a raw job posting (URL, pasted JD, or both) into the structured `applications/<app_id>/role.md` file that every downstream drafting skill reads. It's also the natural entry point for "is this worth applying to?" triage.

---

## When to invoke this skill

- Mason pastes a job posting URL
- Mason pastes JD text
- Mason says "look at this role" or "what do you think of this one"
- The `job-sourcer` skill hands off a discovered candidate role
- Mason asks "is this worth applying to?" — run role-intake and read the `fit_summary` back

If Mason just mentions a company without a specific posting ("I should look at Cognition"), that's not role-intake — that's either `job-sourcer` or a manual conversation. Ask.

---

## Prerequisites

Before this skill runs, an application must exist in the tracker. If one doesn't:
1. **First invoke `application-logger`** to create it via `pnpm log application_created`. That will produce an `app_id` and an `applications/<app_id>/` directory.
2. Then continue with this skill against that `app_id`.

Never write `role.md` to a directory that doesn't already exist. Never invent an `app_id`.

---

## Inputs you need

| Input | How to get it |
|---|---|
| `app_id` | From `application-logger` (just created) or resolved via fuzzy match against `data/applications.json` |
| Company name | From the URL's domain, from Mason, or from the JD text |
| Role title | From the JD or from Mason |
| JD text | If URL provided: delegate to a subagent with WebFetch to pull and clean it (keeps main context lean). If pasted: use as-is. |
| Canonical URL | The company's own careers page if possible, not LinkedIn/Indeed |

**Canonicalization rule:** if the URL is on LinkedIn, Indeed, Wellfound, or any aggregator, **have the subagent try to find the same posting on the company's own careers page** (Ashby, Greenhouse, Lever, or their own site) and use that as the canonical URL. Fall back to the aggregator only if the company listing isn't findable. Mason wants to apply through company sites.

---

## The pipeline

### 1. Fetch and clean the JD (if URL provided)

Delegate to an `Explore` subagent with a tight prompt:
> "Fetch this job posting URL and return: (1) the canonical company careers-page URL for this same role if you can find it (not the aggregator link), (2) the full JD text cleaned of navigation/chrome/boilerplate, (3) the company name, (4) the role title, (5) location/remote policy, (6) stated salary band if any. Report in under 400 words. URL: <url>"

Reading JD URLs in the main context wastes tokens. Always delegate.

### 2. Read Mason's profile for matching

Read in this order (use Read tool, these are small files):
- `profile/skills.md` — for Tier A (claimable) and Tier B (familiar) lists
- `profile/preferences.md` — for target lanes, skip lanes, location/remote rules, credentials notes
- `profile/projects/*.md` — only if the JD mentions something specific where you need evidence (e.g. "AI pipeline experience" → read `voices-that-remain.md`)
- `profile/comp.md` — for the comp-band fit check

Do **not** read every profile file every time. Read targeted.

### 3. Extract requirements from the JD

From the JD, pull two lists:

- **Required** — things the JD says are must-haves ("required", "must have", "X+ years of Y", hard filters like degree requirements)
- **Nice-to-have** — things the JD says would be a plus, bonus, or preferred

Be literal. If the JD says "3+ years of React," that's a required 3-year count — Mason does not have 3 years of professional React, period. Do not soften that into "React experience."

### 4. Compute fit and truthfulness gaps

Go item by item through **Required** and produce one of four verdicts per item:

| Verdict | Meaning |
|---|---|
| ✅ **Claimable** | Tier A in `skills.md` or backed by a `projects/*.md` file. Safe to put on the resume. |
| 🟡 **Partial** | Tier B or analogous experience (e.g. JD wants "Postgres" → Mason has Postgres in VTR, fine; JD wants "8 years Postgres" → Mason does not). Note the gap. |
| 🔴 **Gap** | Mason cannot claim this at all. Must be honest about it on the resume (omit) and flag it for `interview-prep`. |
| ⚠️ **Hard filter** | A disqualifier like "PhD required" or "5+ years at a FAANG" — these don't become gaps, they become don't-apply decisions. |

If there are ≥1 hard filters, the `recommended_action` is **"skip — hard filter"** and the rest of the analysis is still written for the record but no drafting skills should run.

### 5. Compute lane + fit score

**Lane** — which of Mason's target lanes does this role fit?
- `founding` — founding engineer at pre-seed/Series A
- `ai-engineer` — AI engineer at AI-native company
- `fde` — forward-deployed / solutions engineer at an AI lab
- `fullstack-ai` — full-stack at an AI-native startup
- `local-raleigh` — Raleigh/RTP local role regardless of lane
- `off-lane` — doesn't fit any lane (should usually be skipped)

**Fit score** — a single integer 1–10. Rubric:
- **10** — dream role: lane-matched, agent-friendly signals, comp in stretch band, specific thing Mason can point to ("they use Codex internally", "founder's tweet about agent-directed development")
- **8–9** — strong: lane-matched, comp in target band, no hard filters, all required items Claimable or Partial
- **6–7** — plausible: lane-matched, comp acceptable, at most 1–2 Partial items on required list
- **4–5** — stretch: some required items are Gaps; apply if quiet week, skip if busy
- **1–3** — skip: multiple Gaps on required, or off-lane, or comp below floor
- **0** — hard filter present; do not apply

Show your reasoning — two to four sentences, not just a number.

### 6. Write role.md

Write `applications/<app_id>/role.md` using the template below. Overwrite if it exists (but confirm with Mason if the existing file has Mason's hand edits — look for non-template sections).

### 7. Log that research/analysis happened (optional)

If you did substantial research beyond the JD (e.g. pulled in founder tweets, funding stage, etc.), consider logging a `note_added` event via the application-logger skill. For pure JD intake, no log event is needed — the `role.md` file itself is the artifact.

### 8. Report to Mason

Report concisely:
- The canonicalized URL (if different from what Mason gave you)
- The lane + fit score + one-line reasoning
- The top 1–3 gaps
- A single recommendation: **apply / apply if slow week / skip — hard filter / skip — off-lane / skip — comp below floor**

Keep it short. Mason should be able to decide in <30 seconds.

---

## The role.md template

```markdown
# <Company> — <Role Title>

**app_id:** <app_id>
**URL (canonical):** <company careers page URL>
**URL (source):** <original URL if different>
**Location / remote:** <from JD>
**Posted:** <date if known>
**Stated salary:** <band or "not disclosed">
**Source:** <hn | workatastartup | linkedin | referral | ...>

---

## Lane

**<lane>** — <one sentence why>

## Fit score: <n>/10

<2-4 sentences of reasoning — what matches, what doesn't, why the number>

## Recommendation

**<apply | apply if slow week | skip — hard filter | skip — off-lane | skip — comp below floor>**

<one sentence why>

---

## Required (from JD)

- [✅ | 🟡 | 🔴 | ⚠️] Requirement 1 — verdict note
- [...] Requirement 2 — verdict note
- ...

## Nice-to-have (from JD)

- [✅ | 🟡 | 🔴] Nice-to-have 1 — verdict note
- ...

## Truthfulness gaps (things to NOT put on the resume, DO put on the study guide)

- Gap 1 — what the JD wants, what Mason has that's closest, why it's still a gap
- Gap 2 — ...

## What to lead with on the resume / cover letter

- Project 1 and why it maps to this role
- Specific skill/tool from Tier A that this JD prioritizes
- The agent-directed angle only if this company signals it's agent-friendly

## Company notes (sparse — leave full research to company-research skill)

- Funding stage: <if obvious from JD>
- Team size: <if obvious>
- Hiring thesis signal: <is this company explicitly agent-friendly? AI-native? degree-filtered?>
- Anything surprising or worth flagging

---

## JD text (canonical, cleaned)

<full JD text, cleaned of nav/boilerplate, preserved verbatim so downstream skills can search it>
```

---

## Rules and guardrails

- **Never invent JD requirements.** If the JD doesn't say "X years of Y," don't write it.
- **Never soften a Gap into Partial.** The whole point of this analysis is honesty. A gap on the resume is a lie; a gap on the study guide is a study topic.
- **Never write to a directory that doesn't exist.** Always verify `applications/<app_id>/` exists first.
- **Never read `data/events.jsonl` directly.** Read `data/applications.json` instead (it's the derived view).
- **Never link an aggregator URL when a company URL is available.** Canonicalize.
- **Fit scores are advisory, not binding.** Mason decides what to apply to. The score helps him triage when there are many candidates.
- **If the JD has a hard-filter degree requirement** ("Bachelor's in CS required"): check `profile/preferences.md` — Mason has explicit guidance on how hard vs soft degree requirements are treated. A hard "required" is a skip; a soft "preferred" is fine to apply past.
- **Comp check:** compare stated salary to `profile/comp.md`. If stated salary is below the floor, verdict is `skip — comp below floor` even if the fit is otherwise good.

---

## Examples

### Example 1 — agent-friendly YC startup
**Mason:** "https://www.ycombinator.com/companies/acme/jobs/xyz-founding-engineer"

1. Call `application-logger` first: creates app_id `2026-04-09-acme-founding-engineer`, scaffolds folder.
2. Delegate to subagent: fetch URL, try to find canonical Ashby/Greenhouse link.
3. Read `skills.md` + `preferences.md` + `projects/voices-that-remain.md` (relevant because JD mentions AI pipelines).
4. Extract requirements. Compute verdicts. Lane = `founding`, fit = 9/10.
5. Write `applications/2026-04-09-acme-founding-engineer/role.md`.
6. Report: *"Acme Founding Engineer — lane: founding, fit: 9/10. One partial gap (JD wants Kubernetes, you have container-free GCP deploys). Canonical URL on Ashby: ... Recommendation: apply. This company explicitly calls out 'engineers who direct coding agents' in the JD — lead with the VTR shipping velocity story."*

### Example 2 — hard filter, skip
**Mason:** *pastes JD for a senior role at a big tech company that requires 8 years of experience and a PhD*

1. Call `application-logger` if Mason wants it tracked (skipped applications are still worth tracking — you learn from them).
2. Extract requirements. Verdict: ⚠️ Hard filter (8 years, PhD).
3. Write `role.md` with `recommended_action: skip — hard filter`.
4. Report: *"BigCo Senior ML Engineer — skip. Hard filter: 8+ years + PhD required. Logged as 'interested' so we can see what jobs we've ruled out, but no drafting skills should run."*

### Example 3 — comp below floor
**Mason:** "https://..." *(small agency, quotes $55k)*

1. Extract comp from JD. Below `comp.md` floor of $70k.
2. Write `role.md`, verdict `skip — comp below floor`.
3. Report: *"Agency full-stack — skip. Stated salary $55k is below your $70k floor. Otherwise fit would be 6/10."*

---

## What this skill does NOT do

- Does **not** write the resume (that's `resume-tailor`).
- Does **not** do deep company research beyond what's visible in the JD (that's `company-research`).
- Does **not** apply to the job or submit anything anywhere.
- Does **not** change the application's status to `applied` — that's `application-logger` when Mason actually applies.
- Does **not** write to `data/` files directly.
