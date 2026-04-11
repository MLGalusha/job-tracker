---
name: interview-prep
description: Generate a focused interview study plan for a specific application by combining role.md, company.md, resume.md, and resume-gaps.md into a prioritized study guide with concrete drills, defensibility notes, and a question bank. Produces applications/<app_id>/study-guide.md. Use after a company confirms an interview loop or when Mason says he wants to prep for one.
---

# interview-prep

This skill produces `applications/<app_id>/study-guide.md`: a prioritized, timeboxed interview prep plan. The goal is not a general CS refresher. The goal is to turn the specific gaps between Mason's shipped work and *this role's* expectations into a finite, workable study list, plus a defensibility cheat sheet for every project on the tailored resume.

Mason's edge in interviews is that he has actually shipped the things on his resume and can talk about them in depth. The risk is that he gets asked something adjacent (a language he hasn't used, a concept named differently than how he learned it, a systems question that probes a level he hasn't worked at). This skill is about closing that delta for the specific loop.

---

## When to invoke this skill

- A company confirms an interview and Mason says "prep me for the <company> loop"
- Mason says "study guide for <company>"
- A `role-intake` run flagged a strong gap and Mason wants a plan before applying

**Do not run this skill if:**
- `role.md` does not exist for the app
- `resume.md` does not exist for the app (there is nothing to defend yet)
- `company.md` does not exist (the study plan will be company-blind and less useful) — ask Mason if he wants to proceed anyway

---

## Prerequisites

1. `applications/<app_id>/role.md`
2. `applications/<app_id>/resume.md`
3. `applications/<app_id>/resume-gaps.md` (strongly preferred, contains the defensibility notes)
4. `applications/<app_id>/company.md` (strongly preferred, contains loop signals)
5. `profile/skills.md`, `profile/projects/*.md`, `profile/wins.md`

---

## The plan contract

Rebuilt on `notes/research/interview-prep-methodology.md` and `notes/research/SYNTHESIS.md`.

**Core reframe:** most interview prep optimizes gaps. The best prep **optimizes the 2-3 strengths that will carry the loop**, and does just enough gap work to prevent a disqualifying failure. This skill is leverage-first, not gap-first.

1. **Leverage first, gaps second.** The first question the skill asks is "what are Mason's 2-3 strongest cards for *this* loop?" — not "what are his gaps?" Gaps come second. The default time allocation reflects this (below).

2. **Loop typology classification.** Every loop is one of: `big-tech`, `startup-standard`, `ai-native`, `founding-eng`, `ai-lab`. Default allocation shifts per type. This is inferred from `role.md` lane and `company.md` engineering culture signals.

3. **Default time allocation** (from the research). Adjust per loop type but don't stray far:
   - 40% project defensibility (the crown-jewel and the other projects on the resume)
   - 15% adjacent concepts (things Mason has shipped, possibly named differently)
   - 15% company-specific signals (decisions, debts, recent writing)
   - 15% behavioral / story rehearsal
   - 10% system design (skip entirely for founding-eng loops where it rarely appears)
   - 5% LeetCode (skip entirely for AI-native / founding-eng / ai-lab loops)

   **LeetCode bifurcation:** still relevant for big-tech loops, near-zero for AI-native startups. If the typology is not `big-tech`, zero out the LeetCode budget and redistribute to project defensibility.

4. **Crown-jewel project at three narration lengths.** The #1 project on the resume must be rehearsed at 3-minute, 10-minute, and 30-minute depths. The interviewer decides which one they want; Mason needs to have all three ready. This is the single highest-leverage prep item.

5. **AI-lab loops need the Anthropic-gauntlet pattern.** For loops at Anthropic / OpenAI / similar, include an "in-memory database" style coding drill: build a simple key-value store, then extend it with scans, then TTL, then compression. This is the canonical AI-lab evaluation pattern. Skip for other loop types.

6. **Every study item must be tied to a specific line in the resume, a specific requirement in the JD, or a specific gap in `resume-gaps.md`.** Generic "review data structures" entries are forbidden.

7. **Every project on the resume must get a defensibility card.** One per project.

8. **The plan must be timeboxed.** Total study hours = budget. Do not produce an unbounded checklist.

9. **Priority order is blocking-to-polish.** The top item is the thing most likely to sink the loop. The bottom is polish.

10. **Mandatory triage footer — "If you only have 4 hours left."** Every study guide must end with a section naming the three highest-leverage items Mason should do if time collapses. This is a hard requirement. The section forces the skill to re-rank by pure impact, not by comfort.

11. **Voice rules apply.** Per `voice.md` — no em-dashes in prose, no hyphen compounds, no tildes, no arrows, no brand-name drops in prose, no banned rule 3 phrases, no rule 15 LLM vocab.

---

## The pipeline

### 1. Read the inputs

- `applications/<app_id>/role.md` — whole file
- `applications/<app_id>/resume.md` — whole file
- `applications/<app_id>/resume-gaps.md` — whole file, this is the gold
- `applications/<app_id>/company.md` — focus on engineering culture signals and "how they hire" sections
- `profile/projects/<name>.md` — targeted, only for projects that appear on the resume

Ask Mason for:
- Date of the first interview (for timeboxing)
- Hours per day he can study
- Which round it is (recruiter screen, tech screen, onsite loop, founder chat)

If Mason hasn't said, assume tech screen in seven days, four hours per day available, 28 hour budget.

### 1.5. Classify the loop typology

Using `role.md` lane and `company.md` engineering culture, classify the loop as one of:
- `big-tech` — larger company with formal loop, LeetCode present, system design a real round
- `startup-standard` — series-A+ startup with recognizable 4-round loop
- `ai-native` — Zed, Cursor, Cognition, Replit — engineer-led, take-home or work trial likely, no LeetCode
- `founding-eng` — seed/series-A founding role, pairing sessions, product-sense interviews
- `ai-lab` — Anthropic, OpenAI, similar — the 4-level coding gauntlet pattern, evals focus, research-adjacent questions

Record the typology in frontmatter. It drives the default allocation in the next step.

### 1.6. Identify the 2-3 leverage cards

Before looking at gaps, list Mason's 2-3 strongest cards for *this* loop. These are the things that will carry the interview if used well. Pull from resume projects + `profile/wins.md`. Be specific: not "VTR," but "VTR's HITL verification pipeline and the cost-tiered model selection between GPT-5.4 and GPT-5.4-mini." These cards drive the defensibility card emphasis and the "questions for them" list.

### 2. Bucket the prep into five categories (in leverage order)

1. **Defensibility cards.** 40% of budget. One per project on the resume. The crown jewel gets cards at 3-minute, 10-minute, and 30-minute narration lengths.
2. **Adjacent concepts.** 15%. Things Mason has shipped that he might be asked about in unfamiliar terminology. Example: he knows Shazam-style audio fingerprinting but might be asked about "locality sensitive hashing" which is the same family.
3. **Company-specific signals.** 15%. Decisions, debts, recent writing from `company.md`.
4. **Behavioral / story rehearsal.** 15%. The "tell me about a time" answers tied to `profile/story.md`.
5. **Technical rounds.** Split remaining 15% between system design (10%) and LeetCode (5%), adjusted by loop typology:
   - `big-tech` → keep 10/5
   - `startup-standard` → 10/0, redistribute LeetCode to defensibility
   - `ai-native` / `founding-eng` → 5/0, redistribute both to defensibility and pairing rehearsal
   - `ai-lab` → 10/0 but replace system design with the **Anthropic-gauntlet drill**: build an in-memory key-value store, then add scan support, then TTL, then compression

**Blocking gaps** get their own lane on top of this allocation — but only if `resume-gaps.md` flags a gap that would be a disqualifying failure (a required language Mason doesn't know, a framework the role depends on). Each blocking gap steals 1-2 hours from the lowest-priority bucket.

### 3. Prioritize and timebox

Sort within and across buckets by expected impact on the loop:
- A blocking gap in the JD's "must have" line is top priority
- Defensibility on the project the resume leads with is second
- Adjacent concepts tied to the role's primary domain are third
- Company-specific polish is last

Allocate hours to each item with a short rationale. Total must equal the study budget. If the plan overflows the budget, cut the lowest priority item and note it as "deprioritized because budget."

### 4. Write the defensibility cards

For every project on the resume, produce a card in this format:

```markdown
### <Project name>

**What I built (30 second version):**
<One paragraph Mason can deliver in 30 seconds, with one concrete number.>

**Likely questions:**
- <Question 1, drawn from the actual surface area of the code>
- <Question 2>
- <Question 3>

**Questions I need a crisp answer for:**
- <The honest-answer version of a question Mason can't fully answer today, with a pointer to the file or concept he needs to review>

**How I answer when I don't know:**
<One or two sentences: the honest framing Mason can use when asked something outside what he shipped. Never fake it.>
```

The "questions I need a crisp answer for" section is the most valuable. It's the list of things Mason should practice aloud before the loop.

### 5. Write the question bank

A short section of five to ten questions Mason should be ready for, taken from:
- The JD's "preferred qualifications" list (the interviewer will probe these)
- `resume-gaps.md`'s defensibility sections
- `company.md`'s engineering culture signals (the interviewer will ask about these in a "what do you think of our approach to X" format)

Do not invent behavioral questions. Lean on concrete technical questions tied to specific resume lines.

### 6. Write the "questions for them" list

Three to five questions Mason should ask the interviewer. These must be specific to what research surfaced in `company.md`, not generic. "What's your current pain point with X" style, referencing a specific public statement or blog post. Forbidden: "what's the culture like."

### 7. Write the file

Write to `applications/<app_id>/study-guide.md`. Use the template below.

### 8. Log the event

```bash
cd ~/Workspace/job && pnpm log study_guide_generated --app_id=<app_id> --path=applications/<app_id>/study-guide.md
```

### 9. Report to Mason

Report concisely:
- Total study budget in hours
- Top three blocking items
- Any defensibility cards that revealed a weak spot Mason should know about
- Whether `resume-gaps.md` and `company.md` were strong enough inputs, or thin and the plan suffered

Under 200 words.

---

## The study-guide.md template

```markdown
---
app_id: <id>
company: <name>
role: <title>
interview_stage: <recruiter_screen | tech_screen | onsite | founder_chat>
interview_date: <ISO or "unknown">
study_budget_hours: <n>
generated_at: <ISO date>
---

# Interview Prep: <Company> — <Role>

## Study budget

<n> hours total. <n> days, <n> hours per day.

## Priority order

1. **<Top item>** — <hours>h. <one sentence rationale>.
2. **<Item 2>** — <hours>h. <rationale>.
3. ...

## Blocking gaps

<Specific things the JD requires that the resume does not cover. Each with a concrete study plan, not a vague "review topic".>

### <Gap 1>
- **Why it's blocking:** <one sentence>
- **Study plan:** <concrete, timeboxed, with resources>
- **What good enough looks like:** <one sentence on the minimum bar>

## Defensibility cards

<One card per project on the resume. Use the card template from the skill.>

### <Project 1>
...

### <Project 2>
...

## Adjacent concepts to review

<Things Mason has shipped that he might be asked about in unfamiliar terminology.>

- **<Concept, standard name>** — <what Mason already knows, what gap to close>

## Company-specific study

<Things from company.md worth reading or watching.>

- <Signal 1 with URL, and what to look for>

## Question bank

<Five to ten specific questions Mason should be ready for, tied to resume lines.>

1. <Question>
2. ...

## Questions for them

<Three to five research-grounded questions Mason should ask the interviewer.>

1. <Question referencing a specific public statement or blog post>
2. ...

## Day-by-day plan

<If the interview date is known, lay out which items get studied which day. If not, produce a single session plan sorted by priority.>

## If you only have 4 hours left

<Mandatory triage footer. If Mason's time collapses to 4 hours before the loop, these are the three things he should do in order. Re-ranked by pure impact, not comfort. Each item: what to do, how long, why it's the highest leverage.>

1. **<Top item>** — <time>. <why>.
2. **<Item 2>** — <time>. <why>.
3. **<Item 3>** — <time>. <why>.
```

---

## Rules and guardrails

- **Never produce a generic study plan.** If the only items you can name are "review data structures" and "practice coding," you are company-blind and should stop and ask Mason for more inputs.
- **Never pad with filler.** A 10-item plan Mason will actually finish beats a 40-item plan he won't.
- **Never invent interview loop details.** If you don't know the format, say so and plan for the most likely format.
- **Never fake defensibility.** If Mason can't defend a resume line, flag it as a resume line to reconsider, not as a study item.
- **Respect the voice contract.** This file sits next to the resume and cover letter and Mason will reread it under interview stress. No AI tells.
- **Log the event.** Always.

---

## What this skill does NOT do

- Does **not** edit the resume. If defensibility reveals a resume line Mason can't defend, it flags the line for Mason to decide, but does not touch `resume.md`.
- Does **not** run mock interviews. Separate skill if needed.
- Does **not** write to `data/` directly. Uses `pnpm log study_guide_generated`.
- Does **not** apply for Mason.
