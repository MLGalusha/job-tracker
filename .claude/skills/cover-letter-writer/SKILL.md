---
name: cover-letter-writer
description: Generate a tailored cover letter for a specific job application by combining role.md, company.md, resume.md, the cover-letter-base template, and profile/voice.md. Produces applications/<app_id>/cover-letter.md. Runs after company-research. Enforces the One-Take Rule and per-lane on/off logic — will refuse to generate for lanes where a cover letter is negative signal.
---

# cover-letter-writer

This skill produces `applications/<app_id>/cover-letter.md`. It is the highest voice-risk skill in the system — a cover letter that sounds generic or AI-drafted is strictly worse than no cover letter at all. This version is rebuilt on `notes/research/cover-letter-research.md`, `notes/research/2026-ai-hiring-shift.md`, and `notes/research/SYNTHESIS.md`.

**Core reframes (from research):**
1. Cover letters are **lane-conditional in 2026.** Dead at engineer-led startups (Zed, Cursor, Cognition) — outreach + artifact replaces them. Still high-value at Anthropic-class companies and larger employers. This skill enforces the on/off switch and refuses to generate for off-lanes.
2. **The One-Take Rule is the only thing that matters.** Every letter must contain an opinionated observation about this specific company that could not have been written about any other company. The skill blocks on this.
3. **Word count ceiling dropped to 350** (from the old 450). Reviewer patience is lower in 2026 because the baseline cover-letter quality collapsed.
4. **Sobo-essay-style references are now table stakes, not signal.** A reference to a public essay everyone else also references does not count as a One-Take.

---

## Lane on/off logic (enforced before drafting)

Read `role.md`'s `lane` and the target company's engineering culture signals from `company.md`. Then:

| Lane + company type | Cover letter? |
|---|---|
| `founding` at engineer-led startup (Zed, Cursor, Cognition, most YC) | **OFF** — recommend `outreach` + `application-artifact` instead |
| `ai-engineer` at AI lab (Anthropic, OpenAI) | **ON** — high-value, reviewer reads them carefully |
| `ai-engineer` at YC startup | **OFF** unless company explicitly requests one |
| `fde` at Anthropic / OpenAI / larger employer | **ON** |
| `fullstack-ai` at series-A+ with formal hiring loop | **ON** |
| `fullstack-ai` at small engineer-led startup | **OFF** |
| `local-raleigh` (any size) | **ON** — slightly more formal, follows local-employer conventions |
| `off-lane` | **OFF** — do not draft, question whether Mason should apply |

**If the lane is OFF:** stop before drafting. Report to Mason: "Cover letter is OFF for this lane/company combo per the research. Recommended path: `outreach` skill (cold email) + `application-artifact` if `company.md` scored `artifact_fit: strong`. Want to proceed that way, or override and draft a cover letter anyway?" Then wait for input.

If Mason overrides, draft the letter but flag it in the report as "drafted against the lane recommendation."

---

## When to invoke this skill

- Mason says "write the cover letter for [company]"
- Mason confirms an application is going out and no cover letter exists yet and the lane is ON
- Mason asks for a revision of an existing cover letter

**Do not run this skill if:**
- `role.md` does not exist → run `role-intake` first
- `resume.md` does not exist → run `resume-tailor` first
- `company.md` does not exist → run `company-research` first. The letter cannot pass the One-Take check without grounded decisions from `company.md`.
- `role.md` has `recommended_action: skip`
- An existing `cover-letter.md` has visible Mason hand edits and he hasn't said to overwrite

---

## Prerequisites

1. `applications/<app_id>/role.md`
2. `applications/<app_id>/resume.md`
3. `applications/<app_id>/company.md` with at least one `grounded` decision (hard requirement)
4. `profile/voice.md`, `profile/wins.md`, `profile/story.md`
5. `templates/cover-letter-base.md`

---

## The voice contract (READ THIS FIRST)

Every sentence must pass every applicable rule in `profile/voice.md`. The blocking ones for this skill:

- **Rule 3** — banned phrases (passionate, results-oriented, extensive experience, etc.)
- **Rule 11** — never frame Mason as building LLMs / inference infrastructure
- **Rule 12** — no brand-name drops in prose
- **Rule 14** — no em-dashes, hyphen compounds, arrows, tildes
- **Rule 15** — banned LLM vocab (the expanded list: leveraged, delve, seamless, robust, passionate, excited, eager, reaching out because, etc.)
- **Rule 16 — THE ONE-TAKE RULE** — the letter must contain an opinionated observation specific to this company
- **Rule 17** — imperfection over polish
- **Rule 18** — no AI-washing of Mason's projects

---

## The pipeline

### 1. Read the inputs (targeted)

Read in this order:
- `applications/<app_id>/role.md` — whole file
- `applications/<app_id>/company.md` — whole file. The `decisions[]` section is the gold; the `artifact_fit` and `people[]` also feed the letter.
- `applications/<app_id>/resume.md` — to align lead project with what the resume leads with
- `profile/voice.md` — whole file, you will audit against it
- `profile/wins.md` — for quotable lines
- `profile/story.md` — for narrative arc
- `templates/cover-letter-base.md` — structural skeleton
- **Selectively** `profile/projects/<name>.md` for the one or two projects you plan to lead with

### 2. Lane on/off check

Apply the table above. If OFF, stop and report. If ON or override, continue.

### 3. Decide formality from the lane

| Lane | Formality (1-6 scale) | Tone |
|---|---|---|
| `founding` (override) | 4 | Confident, fast-shipping, thesis-forward |
| `ai-engineer` (Anthropic / OpenAI) | 5 | Confident, production-AI-forward, concrete on the pipeline |
| `fde` | 5 | Confident, customer-translation-forward |
| `fullstack-ai` | 4-5 | Confident, shipping-velocity-forward |
| `local-raleigh` | 5-6 | Slightly more formal, may include local context |

Never above 6.

### 4. Pick the lead project

Default: VTR. Exceptions:
- **ML-heavy role** → PianoTranscriber, VTR second
- **Reverse-engineering / platform role** → Staffclaw, VTR second
- **Audio / DSP role** → SonicGen, VTR second
- **Agent-native dev tools role** → VTR, with agent-directed shipping in paragraph 2

Lead project in the cover letter should match or intentionally complement the lead project in the resume.

### 5. Pick the One-Take

From `company.md`'s `decisions[]` section, pick the **one grounded decision** that Mason has the strongest opinion on. The One-Take is a sentence (or two) that:

- Names a specific decision, product detail, engineering choice, or public position this company has taken
- Carries Mason's actual opinion on it (agreement, disagreement, a trade-off he'd weigh differently, a question it raised)
- Could not have been written about any other company
- Is not a restatement of a public essay everyone references

**If no `decisions[]` entry is tagged `grounded`, the skill refuses to draft the letter.** Report: "Cannot write a cover letter that passes the One-Take check. `company.md` has zero grounded decisions. Need to rerun `company-research` with additional primary-source attempts (run the product, read the source, read founder writing), or pick a different target."

### 6. Draft the letter (3-4 paragraphs, 250-350 words)

Follow `cover-letter-base.md` skeleton but compressed. The old 450-word budget is retired.

**Paragraph 1 — the hook.** Story-driven or thesis-driven opener. Two or three sentences. Land the connection to the role.

**Paragraph 2 — the lead project with numbers.** One project, concrete verbs, at least one real number, one sentence bridge to the role.

**Paragraph 3 — the One-Take.** This is the new requirement. State Mason's opinion on the specific decision from step 5, grounded in something he'd actually touched or read. This paragraph is the reason the letter exists.

**Paragraph 4 — the ask.** Two or three sentences. State the ask. End with forward momentum. No "thank you for your time." No "I hope this finds you well."

**Sign-off** per `cover-letter-base.md`.

### 7. Verify structural requirements

- [ ] 250-350 words total (hard cap 350)
- [ ] 3-4 paragraphs
- [ ] Exactly one lead project with at least one concrete number
- [ ] One-Take paragraph present and grounded in a specific `company.md` decision
- [ ] Opens with story or thesis, not credentials
- [ ] Greeting matches formality dial
- [ ] Sign-off block present

### 8. Voice audit (blocking)

Scan the draft against `profile/voice.md`. Blocking violations:

- Any em-dash in a sentence (`—`)
- Any stacked hyphen compound adjective (*full-stack, end-to-end, cost-vs-quality, multi-stage, real-time, context-aware, agent-directed, Shazam-style*, etc.)
- Any approximation tilde (`~`)
- Any pipeline arrow (`→`)
- Any brand-name drop in prose (*Claude Code, Codex, Cursor, GPT-4, GPT-5.4* as name-drops)
- Any banned phrase from rule 3 (*passionate, rockstar, extensive experience, helped build, strong fundamentals, results-oriented*)
- **Any word from the rule 15 LLM-vocab list** (*leveraged, spearheaded, delve, seamless, robust, cutting-edge, tech-savvy, synergy, pivotal, tapestry, ecosystem, empower, foster, streamline, game-changing, passionate, excited to, thrilled to, eager to, reaching out because*, etc.)
- Any framing that makes Mason sound like he builds LLM infrastructure
- Any AI-washing of VTR ("AI archive," "AI-powered archive," "AI-native archive")
- Any self-deprecation or hedging

**Blocking absences:**
- No concrete number anywhere in the letter
- No One-Take paragraph that passes the rule 16 test
- No first-person declarative sentences
- Draft over 350 words

**When you find a violation, rewrite the whole sentence, don't patch.** Voice is rhythm.

### 9. The One-Take check (blocking, second pass)

After the voice audit, do a dedicated One-Take pass. Ask these questions about paragraph 3:

1. Could this sentence have been written about any other company? If yes, fail.
2. Does it reference a public essay or blog post that every candidate references? If yes, fail — that's table stakes, not signal.
3. Does it contain Mason's actual opinion, not just a factual reference? If no, fail.
4. Is it grounded in a `decisions[]` entry from `company.md` tagged `grounded`? If no, fail.

If any fail, rewrite the paragraph. If after two rewrites it still fails, stop and tell Mason: "Can't produce a passing One-Take from the current `company.md`. The grounded decision at index N isn't specific enough, or Mason doesn't have an opinion on it. Options: rerun `company-research` for different decisions, give me a decision you have an opinion on directly, or skip the cover letter for this target."

### 10. Write the file

Write to `applications/<app_id>/cover-letter.md`. Markdown. Plain text that could paste cleanly into a web form.

### 11. Log the event

```bash
cd ~/Workspace/job && pnpm log cover_letter_updated --app_id=<app_id> --path=applications/<app_id>/cover-letter.md --summary="Initial draft for <role>"
```

### 12. Report to Mason

Under 250 words. Include:
- Path and word count
- Lead project
- **The One-Take sentence, quoted verbatim** so Mason can sanity-check it
- Voice violations caught and rewritten
- Whether the lane was ON / OFF / overridden
- What `company.md` made strong or weak about the letter
- Anything to know before sending

---

## Rules and guardrails

- **Never ship a cover letter that fails the One-Take check.** Blocking.
- **Never ship with a single em-dash, hyphen compound, tilde, or arrow in prose.** Blocking.
- **Never ship with any rule 15 LLM-vocab word.** Blocking.
- **Never name-drop brand names in prose.** Resume Skills section only.
- **Never open with mail-merge boilerplate** ("I hope this letter finds you well," "I am writing to apply for," "I am excited to apply for," "I am reaching out because").
- **Never close with "thank you for your time and consideration."** Forward momentum only.
- **Never apologize for Mason's background.** Self-taught, bootcamp, agent-directed — these are features.
- **Never go over 350 words.** Hard cap.
- **Never copy more than one sentence verbatim from `cover-letter-base.md`.** Template is skeleton, not script.
- **Never invent facts about the company.** If it's not in `company.md`, it doesn't go in the letter.
- **Never claim a skill that isn't on the resume.** Cover letter must not contradict resume.
- **Cover letter and resume must agree on the lead project** unless there's a deliberate reason.
- **If the lane is OFF, recommend outreach + artifact first.** Drafting against the lane recommendation is allowed on override but must be flagged.

---

## What this skill does NOT do

- Does **not** write the resume. That's `resume-tailor`.
- Does **not** do company research. That's `company-research`.
- Does **not** apply to the job.
- Does **not** write to `data/` files directly. Uses `pnpm log cover_letter_updated`.
- Does **not** overwrite an existing `cover-letter.md` with hand edits without asking.
- Does **not** generate outreach emails. That's the `outreach` skill.
- Does **not** produce an artifact. That's `application-artifact`.
