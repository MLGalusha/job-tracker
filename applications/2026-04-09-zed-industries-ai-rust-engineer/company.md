---
company: Zed Industries
slug: zed-industries
website: https://zed.dev
stage: series-b
team_size: ~41
location: Boulder / Denver CO, remote-first
comp_concern: false
researched_at: 2026-04-09
artifact_fit: strong
artifact_idea: Land a PR against zed-industries/zed in the ACP / agent panel area — pick a good-first-issue or a small rough edge Mason hits while running Claude Code inside Zed, fix it in Rust with the team's craftsmanship bar, and use that PR as the outreach artifact instead of a formal application.
grounded_decisions_count: 6
---

# Zed Industries

## One line

Zed makes a fast open source code editor written in Rust, built by the team behind Atom and Tree-sitter, and monetizes a hosted AI service (Zed Pro) on top of it.

## Artifact fit (why a PR beats a formal app here)

Zed scores **5/5** on the artifact-fit rubric:

1. **Priority tier:** top target — most aligned company Mason has looked at.
2. **JD gap:** Mason has zero Rust. A merged PR is the only way to close that gap in under a week.
3. **Engineer-led:** three co-founders are ex-Atom/Tree-sitter engineers who read their own repo.
4. **OSS-friendly:** the editor is GPL/Apache, they accept external PRs, they publish ACP as an open standard.
5. **Formal apps are low-signal:** ~41-person team, one dedicated AI engineer, pair-programming culture — a resume submission through a job board disappears into noise.

Lane: **outreach + artifact**, cover-letter lane **OFF**. Do not write a cover letter for Zed. Land a PR, then email Sobo or Brunsfeld with the PR link and the SonicGen DEEP_DIVE link.

---

## decisions[]

Things Zed chose on purpose. Each one is a wedge Mason can reference in outreach or an interview.

- **(grounded) Editor is free and OSS; monetization is Zed Pro, a hosted LLM service.** Editor as loss leader, hosted AI as revenue. Launched August 2024, initially powered by Claude 3.5 Sonnet, with BYOK as a first-class option. This is a deliberate bet that the editor has to stay open to earn the right to sell AI on top. Sources: [zed.dev/blog/zed-ai](https://zed.dev/blog/zed-ai), [zed.dev/docs/ai/llm-providers](https://zed.dev/docs/ai/llm-providers).

- **(grounded) ACP is published as an open standard, not a proprietary hook.** Zed formalized Agent Client Protocol in August 2025 under Apache license and calls it "the LSP for AI coding agents." **JetBrains adopted ACP in October 2025** — the clearest signal that Zed's bet on interop-over-lock-in is working. Sources: [zed.dev/acp](https://zed.dev/acp), [blog.jetbrains.com](https://blog.jetbrains.com/ai/2025/10/jetbrains-zed-open-interoperability-for-ai-coding-agents-in-your-ide/).

- **(grounded) Claude Code runs natively inside Zed via ACP.** The primary tool Mason uses every day runs inside the editor he would be working on. This is not a generic "we support AI" story; it's a specific integration Zed shipped. Source: [zed.dev/blog/claude-code-via-acp](https://zed.dev/blog/claude-code-via-acp).

- **(grounded) Sobo's "craftsmanship in the era of vibes" framing: contribution measured *"not in lines of code generated, but in reliable, well-designed systems."*** Gnarly codebases *"hinder not only our own ability to work in it, but also the ability of AI tools to be effective in it."* This is Zed's explicit position on agent-directed development: the code has to be good *so that* the agents work. Source: [zed.dev/blog/software-craftsmanship-in-the-era-of-vibes](https://zed.dev/blog/software-craftsmanship-in-the-era-of-vibes).

- **(grounded) Sobo coined "Agentic Engineering"** as the Zed framing — human craftsmanship plus AI tools, not replacement. This is close enough to Mason's own LinkedIn framing ("I design the architecture, make the technical decisions, and use AI coding tools to accelerate implementation") to be a two-way recognition moment. Source: [zed.dev/agentic-engineering](https://zed.dev/agentic-engineering).

- **(grounded) A brand-new AI Foundations team is building DeltaDB**, described in the posting as capturing the operational history of software development. Brand-new team, brand-new product surface — best possible time to join. Source: [zed.dev/jobs/ai-engineer](https://zed.dev/jobs/ai-engineer).

- **(inferred) The "Rust experience OR willingness to learn" escape hatch on the AI Rust Engineer posting is real, not boilerplate.** A 41-person team does not write optional-Rust into a Rust-titled role unless they want the AI Foundations team to take generalists strong on the AI product side. Cannot verify without talking to someone on the team. Source: [zed.dev/jobs/ai-engineer](https://zed.dev/jobs/ai-engineer).

## frictions[]

Things that will make this harder for Mason than for a typical applicant.

- **(grounded) Rust is soft-required.** JD says "Rust experience OR willingness to learn" but Preferred lists Rust proficiency. Mason has zero Rust. The only credible answer is a merged PR — that's why the artifact lane is the whole strategy here.
- **(grounded) "Strong backend or systems programming background"** in the JD. Mason's TypeScript / Express / Postgres work is application-layer backend, not systems programming in the compilers/infra sense. Framing needed: application backend with a real AI pipeline, plus SonicGen's DSP-to-SQL pipeline as evidence Mason can go lower level when the problem demands it.
- **(grounded) Pair programming is the default workflow.** Mason's solo agent-directed workflow needs to be framed as complementary, not oppositional: "I ship solo by directing agents, and I'd welcome learning how you pair on agent-directed work."
- **(inferred) Formal applications through the job board are low-signal at this size.** 41 people, one dedicated AI engineer, engineer-led founders. A PR + a cold email to Sobo beats the portal.

## people[]

- **Nathan Sobo** (CEO, co-founder) — joined GitHub 2011, led Atom until 2018, left after the Microsoft acquisition, founded Zed 2021. Writes publicly about editor internals and agentic engineering. Likely first interviewer or part of the loop for any AI Foundations hire. **Primary outreach target.** Sources: [zed.dev/team](https://zed.dev/team), [changelog.com/podcast/241](https://changelog.com/podcast/241), Sequoia Training Data podcast ("Why IDEs Won't Die in the Age of AI Coding"), Changelog #640.
- **Max Brunsfeld** (co-founder) — Atom team 2013, **creator of Tree-sitter**, which now powers GitHub's code analysis. Secondary outreach target if a PR lands in parser/language territory. Source: [github.blog](https://github.blog/news-insights/product-news/atoms-new-parsing-system/).
- **Antonio Scandurra** (co-founder) — Atom alumnus. Source: [github.com/as-cii](https://github.com/as-cii).
- **Oleksiy Syvokon** — the single dedicated AI Engineer on the team page. The person whose workload Mason's hire would most directly extend. Source: [zed.dev/team](https://zed.dev/team).
- **Mary Luna** — Head of Recruiting. Route of last resort if outreach to Sobo/Brunsfeld goes cold. Source: [zed.dev/team](https://zed.dev/team).

## debts[]

Things worth double-checking before sending anything.

- **(inferred → verify)** That the AI Foundations team is actually taking external applicants right now and hasn't filled the role between the posting and today. Check the jobs page one more time before sending outreach.
- **(inferred → verify)** Good-first-issue queue on zed-industries/zed — does one exist in the ACP or agent-panel area? If not, Mason needs to pick a rough edge from his own use of Claude-Code-in-Zed and scope it small.
- **(grounded, watch)** Comp band is $170k-$250k, well above Mason's floor; equity is a bet on Zed growth. No red flags but worth reconfirming that the AI Rust Engineer role is still in that band by the time an offer conversation happens.
- No layoffs, no controversies surfaced as of 2026-04-09.

## Stage and funding (reference)

- Founded 2021. $10M Series A in 2023 (Redpoint, Root Ventures). **$32M Series B led by Sequoia**, November 2024, total raised ~$42M. Revenue not disclosed. Sources: [zed.dev/blog/sequoia-backs-zed](https://zed.dev/blog/sequoia-backs-zed), [TechCrunch](https://techcrunch.com/2023/03/15/zed-code-editor-raises-10m/), [Crunchbase](https://www.crunchbase.com/organization/zed-industries-2ecb).

## Recent news (Oct 2025 – Apr 2026)

- **ACP launched publicly** Oct 2, 2025. [zed.dev/acp](https://zed.dev/acp)
- **JetBrains + Zed ACP interoperability**, Oct 2025. [blog.jetbrains.com](https://blog.jetbrains.com/ai/2025/10/jetbrains-zed-open-interoperability-for-ai-coding-agents-in-your-ide/)
- **ACP Registry** launched. [zed.dev/blog/acp-registry](https://zed.dev/blog/acp-registry)

## Next actions

1. Scope the PR via the `application-artifact` skill — target ACP or agent panel area, small and mergeable.
2. After the PR is open (or merged), run `outreach` to draft a cold email to Sobo, grounded on the "craftsmanship in the era of vibes" decision, linking both the Zed PR and `github.com/MLGalusha/SonicGen/blob/main/DEEP_DIVE.md`.
3. Do **not** write a cover letter. Lane is OFF for Zed.
