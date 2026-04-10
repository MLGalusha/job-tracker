---
name: application-artifact
description: Plan, scope, and track an application-artifact — a shipped public thing (PR, teardown post, tool/extension, eval/benchmark) that replaces or supplements a formal application for a top-tier target. Reads company.md artifact_fit and produces applications/<app_id>/artifact.md with a scoped plan, success criteria, and a ship checklist. Logs artifact_shipped when done.
---

# application-artifact

This skill manages **application artifacts** — shipped public work that acts as the application for top-tier targets where formal applications are low-signal. Per `notes/research/2026-ai-hiring-shift.md` and `notes/research/SYNTHESIS.md`, building a specific artifact is the highest-payoff path for companies scored `artifact_fit: strong` in `company.md` (Zed, Anthropic, Cursor, Cognition tier).

**This skill is a thin wrapper — the artifact work itself is Mason coding, not the skill generating.** The skill's job is to scope the artifact honestly, keep it on rails, and log it when shipped. It never generates the artifact content.

**Mason explicitly asked for this to be optional and sparing.** Default posture: most companies do NOT get an artifact. This skill only runs when `company.md` says `artifact_fit: strong` (or `optional` and Mason explicitly elects to build). Never suggest an artifact for a `none` company.

---

## When to invoke this skill

- Mason says "plan an artifact for [company]" or "let's build the Zed PR"
- `cover-letter-writer` refused to generate (lane OFF) and recommended an artifact path
- `company.md` has `artifact_fit: strong` and Mason wants to commit to building
- Mason wants to log a shipped artifact retroactively

**Do not run this skill if:**
- `company.md` does not exist or `artifact_fit: none`
- Mason hasn't explicitly committed to spending the time (artifacts are 2-7 days of real work)

---

## Prerequisites

1. `applications/<app_id>/company.md` with `artifact_fit: strong` or `optional`
2. A clear `artifact_idea` in the `company.md` frontmatter (if blank, the skill helps Mason pick one from the four flavors below)
3. Mason's explicit commitment to spending the time

---

## The four artifact flavors

From the research. Pick one, not all. Each has different cost and signal profiles.

### Flavor 1 — Teardown post (1-2 days)
A public blog post picking one specific technical decision the target made, explaining the trade-off, and taking a position on it. Needs to touch the primary source (the product, the code, or the founder's own writing). Ships as a post Mason tweets + links in outreach.

**Best for:** Cursor, Cognition, Replit, Perplexity, Sierra — companies whose technical decisions are public but whose code is not broadly OSS.

### Flavor 2 — PR to their OSS repo (2-5 days)
A merged pull request fixing a real issue or adding a small feature. Ideally an existing "good first issue" or "help wanted" label. The PR URL becomes the outreach.

**Best for:** Zed, Vercel, Sourcegraph, Supabase, LangChain — companies with meaningful OSS orgs and merge paths.

### Flavor 3 — Tool / extension (3-7 days)
A small thing built on the target's platform that shows judgment. An MCP server, a Cursor extension, a plugin, a wrapper. Ships to GitHub with a README stating an opinion, posted publicly.

**Best for:** Anthropic (MCP servers), Cursor (extensions), Vercel (integrations) — companies with platform surface Mason can build on.

### Flavor 4 — Eval / benchmark (3-5 days)
A public comparison of the target's product against an alternative with real numbers, real methodology, real conclusions including when the alternative wins. Publishes as a post with a linked repo.

**Best for:** Anthropic (FDEs build evals for a living — doing this is literally the job), OpenAI, any AI lab.

---

## The pipeline

### 1. Read inputs

- `applications/<app_id>/company.md` — especially `decisions[]`, `artifact_fit`, and `artifact_idea`
- `applications/<app_id>/role.md` if it exists
- `profile/skills.md` — to check what Mason can actually build
- `profile/projects/*.md` — for leverage

### 2. Decide the flavor and scope

If `company.md` `artifact_idea` already names a specific flavor, start there. Otherwise, walk Mason through the four flavors, recommend one based on the target's `engineering culture signals`, and get Mason's explicit pick.

For the chosen flavor, scope:
- **Concrete deliverable** — the single sentence of what ships. "PR to zed-industries/zed that fixes [specific open issue] in the terminal scrollback rendering." Not "contribute to Zed."
- **Success criteria** — what counts as done. For a PR: merged, or at minimum reviewed by a maintainer. For a post: published + linked in outreach + at least one specific engagement. For an eval: numbers reproducible + methodology doc + public repo.
- **Time budget** — honest days of work. If Mason says "I can give this 3 days," the scope must fit 3 days.
- **Kill criteria** — when to abandon. If a PR sits without maintainer engagement for 2 weeks, abandon. If a post doesn't surface one real insight after 4 hours of research, abandon. Artifacts must not become sunk-cost holes.

### 3. Write applications/<app_id>/artifact.md

```markdown
---
app_id: <id>
company: <name>
flavor: <teardown_post | pr | tool_or_extension | eval_or_benchmark>
status: <scoped | in_progress | shipped | abandoned>
time_budget_days: <n>
started_at: <ISO date>
shipped_at: <blank until shipped>
shipped_url: <blank until shipped>
---

# Application artifact — <Company>

## Deliverable

<One sentence. Concrete. Specific.>

## Why this flavor

<One paragraph tying the choice to `company.md` artifact_fit reasoning and Mason's strongest leverage.>

## Success criteria

- [ ] <Criterion 1>
- [ ] <Criterion 2>
- [ ] <Criterion 3>

## Scope (what's in)

- <Bullet>
- <Bullet>

## Out of scope (what's NOT in)

- <Bullet — this is the discipline to keep the artifact shippable in the time budget>
- <Bullet>

## Kill criteria

<Specific conditions under which Mason abandons the artifact and writes it off.>

## Ship checklist

- [ ] Code / content complete
- [ ] Tested / proofread
- [ ] Published to the right public place
- [ ] Linked in outreach to the target person at the company
- [ ] `artifact_shipped` event logged

## Notes

<Mason's working notes as he builds.>
```

### 4. Do NOT generate the artifact content

This skill does not write the blog post, draft the PR description, or build the tool. Those are Mason's work. If Mason asks this skill to write the post body, refuse and redirect: "Artifact content must come from Mason. I can help edit, but the first draft is yours. The whole point of the artifact is that it's verifiably Mason's work."

**Exception:** the skill may help with voice-auditing a draft Mason has written (against `voice.md`), and may help structure a README or PR description once Mason has the technical content down.

### 5. Report to Mason

Under 200 words:
- Path to `artifact.md`
- Flavor, deliverable, time budget
- Success and kill criteria
- Next concrete action Mason should take (e.g., "clone zed-industries/zed and open the issue you picked")

---

## Logging the ship

When Mason confirms the artifact is shipped publicly, run:

```bash
cd ~/Workspace/job && pnpm log artifact_shipped \
  --app_id=<app_id> \
  --artifact_type=<pr|teardown_post|tool_or_extension|eval_or_benchmark|other> \
  --url=<public_url> \
  --summary="<one sentence>"
```

Then update `artifact.md` frontmatter: set `status: shipped`, `shipped_at`, `shipped_url`.

The dashboard automatically surfaces shipped artifacts under the artifact-worthy targets section.

---

## Logging abandonment

If the kill criteria fire, update `artifact.md` to `status: abandoned`, add a short note explaining why, and log a `note_added` event:

```bash
cd ~/Workspace/job && pnpm log note_added --app_id=<app_id> --note="Abandoned artifact: <reason>"
```

Abandonment is not failure — it's discipline. The research is clear that artifacts must be time-bounded or they become sunk-cost traps.

---

## Rules and guardrails

- **Never generate artifact content.** This skill scopes and tracks. Mason builds.
- **Never recommend an artifact for a `none` target.** The whole point is that artifacts are rare.
- **Never let an artifact exceed its time budget by more than 50%.** If it does, invoke kill criteria.
- **Never ship an artifact without a public link.** Private repos, draft posts, and local tools do not count.
- **Never log `artifact_shipped` until Mason confirms the public URL.**
- **Always link the artifact to the outreach.** A shipped artifact with no outreach is half-done.

---

## What this skill does NOT do

- Does **not** write the blog post, PR, eval, or tool. Mason does.
- Does **not** pick the target. That's from `company.md` `artifact_fit`.
- Does **not** apply to the job.
- Does **not** draft outreach — that's the `outreach` skill, which reads `artifact_shipped` events and references the public URL.
- Does **not** do company research. That's `company-research`.
