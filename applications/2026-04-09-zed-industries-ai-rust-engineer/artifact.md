---
app_id: 2026-04-09-zed-industries-ai-rust-engineer
company: Zed Industries
flavor: pr
status: scoped
time_budget_days: 4
started_at: 2026-04-10
shipped_at:
shipped_url:
---

# Application artifact — Zed Industries

## Deliverable

A merged (or at minimum reviewed-by-maintainer) pull request to `zed-industries/zed` fixing a small, real rough edge in the ACP or agent-panel area that Mason hits while using Claude Code inside Zed — or, failing that, a `good first issue` in the same surface area.

## Why this flavor

`company.md` scores Zed **5/5** on artifact_fit. Mason has zero Rust, so the only credible way to close that gap is a merged PR in the language, in their repo, on their review bar. A teardown post would be second-best because Sobo already writes the definitive prose about Zed; a tool/extension would be weaker because Zed's extension surface is not where the AI Foundations team lives. A PR lands in the exact surface area (ACP, agent panel) the job is hiring for, and the primary outreach target (Sobo) personally reviews in this codebase.

The PR is not a throwaway. It's the thing the outreach email points at.

## Success criteria

- [ ] PR opened against `zed-industries/zed` with a clear title and description
- [ ] A real maintainer (ideally Sobo, Brunsfeld, or Scandurra) leaves a review or comment
- [ ] PR merged — OR if not merged, Mason has a documented reason (wrong approach, duplicate, out of scope) and learned something quotable for outreach
- [ ] Outreach email to Sobo drafted with the PR URL and DEEP_DIVE.md link before the PR goes stale

## Scope (what's in)

- Clone `zed-industries/zed`, get a local dev build running
- Survey `good first issue` and `help wanted` labels in the ACP / agent panel / AI assistant area
- Pick **one** issue that is (a) small, (b) real, (c) in ACP or agent-panel territory
- Write the fix in Rust, test it locally, match the codebase's style
- Open the PR with a short description that says what it does and why, no padding

## Out of scope (what's NOT in)

- Editor core, rendering, terminal, GPU — stay out of anything that isn't ACP/agent adjacent
- Any issue labeled "complex" or with open design questions
- Rewriting anything. The PR should be a surgical fix, not a refactor.
- Learning Rust from scratch before touching the code — learn Rust *by* doing this PR, with the compiler and Claude as teachers
- A second PR. One is the artifact. Do not spiral.

## Kill criteria

Abandon and mark `status: abandoned` if any of these fire:

- **Day 4 passes with no PR opened.** Either the scope was wrong or Rust is too steep for the chosen issue — regroup, don't sink more days.
- **PR sits 2 weeks with no maintainer engagement.** Ship the outreach email anyway with the PR link as "here's what I built while researching Zed," but stop waiting.
- **Mason discovers the chosen issue is actually a 2-week problem in disguise.** Walk away and pick a smaller one, or accept that the artifact failed and pivot to a teardown post.
- **Rust ramp-up exceeds 2 days with zero forward progress on the issue itself.** That means the issue was wrong, not that Rust is wrong.

## Ship checklist

- [ ] Fork cloned, local build running
- [ ] Issue picked, linked here: ___
- [ ] Fix implemented and tested locally
- [ ] PR opened, URL logged here: ___
- [ ] `artifact_shipped` event logged via `pnpm log`
- [ ] Outreach email drafted via the `outreach` skill, referencing the PR URL + DEEP_DIVE.md

## Notes

Working notes go here as Mason builds. First next step: clone the repo and spend ~2 hours surveying the issue queue in the ACP/agent area before committing to a specific issue.
