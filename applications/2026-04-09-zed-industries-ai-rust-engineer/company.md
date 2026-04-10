---
company: Zed Industries
slug: zed-industries
website: https://zed.dev
stage: series-b
team_size: ~41
location: Boulder / Denver CO, remote-first
comp_concern: false
researched_at: 2026-04-09
---

# Zed Industries

## One line

Zed makes a fast open source code editor written in Rust, built by the team behind Atom and Tree-sitter, and they sell a hosted AI service (Zed Pro) on top of it.

## What they do

Zed is an open source code editor focused on performance, real time collaboration, and native AI integration. The editor itself is free and OSS (GPL / Apache). Monetization is **Zed Pro**, a hosted LLM service launched August 2024, initially powered by Claude 3.5 Sonnet. Users can also bring their own API keys. The business model is editor as loss leader, hosted AI as revenue. Source: [zed.dev/blog/zed-ai](https://zed.dev/blog/zed-ai), [zed.dev/docs/ai/llm-providers](https://zed.dev/docs/ai/llm-providers).

## Stage and funding

- Founded: 2021 ([zed.dev/team](https://zed.dev/team))
- **$10M Series A** in 2023, led by Redpoint and Root Ventures ([TechCrunch](https://techcrunch.com/2023/03/15/zed-code-editor-raises-10m/))
- **$32M Series B led by Sequoia Capital**, November 2024, bringing total funding to roughly $42M ([zed.dev/blog/sequoia-backs-zed](https://zed.dev/blog/sequoia-backs-zed))
- Revenue not disclosed

## Team

- Roughly 41 people on the team page, about 22 engineers, 1 dedicated AI Engineer (Oleksiy Syvokon), plus the 3 co-founders
- Remote first, HQ in the Boulder / Denver area
- Head of Recruiting: **Mary Luna**
- Source: [zed.dev/team](https://zed.dev/team), [Crunchbase](https://www.crunchbase.com/organization/zed-industries-2ecb)

## How they hire

- The AI Rust Engineer posting says **"Rust experience OR willingness to learn"**, no CS degree required ([zed.dev/jobs/ai-engineer](https://zed.dev/jobs/ai-engineer))
- Comp band listed as **$170k to $250k** ([ZipRecruiter mirror of the posting](https://www.ziprecruiter.com/c/Zed/Job/AI-Rust-Engineer/-in-Boulder,CO))
- Culture signals from the JD: **pair programming, weekly releases, building in public**
- Interview loop details from Glassdoor / Blind are thin. Zed is small enough that there is no public writeup of the loop.

## Engineering culture signals

This is the single most important section for Mason. Zed is unusually public about how they think about AI in editors, and their position maps closely to Mason's differentiator.

- **Nathan Sobo, "The Case for Software Craftsmanship in the Era of Vibes" (June 2025):** Sobo argues that contribution should be measured *"not in lines of code generated, but in reliable, well-designed systems,"* and that gnarly codebases *"hinder not only our own ability to work in it, but also the ability of AI tools to be effective in it."* Source: [zed.dev/blog/software-craftsmanship-in-the-era-of-vibes](https://zed.dev/blog/software-craftsmanship-in-the-era-of-vibes). This is the strongest single quotable.

- **Sobo coined "Agentic Engineering"** as the Zed framing: human craftsmanship plus AI tools, not replacement. Source: [zed.dev/agentic-engineering](https://zed.dev/agentic-engineering).

- **Agent Client Protocol (ACP)**, formalized August 2025, is Zed's open standard (Apache licensed) for AI coding agent integration. Zed calls it "the LSP for AI coding agents." **JetBrains adopted ACP in October 2025.** Source: [zed.dev/acp](https://zed.dev/acp), [blog.jetbrains.com](https://blog.jetbrains.com/ai/2025/10/jetbrains-zed-open-interoperability-for-ai-coding-agents-in-your-ide/).

- **Claude Code runs natively inside Zed via ACP.** Source: [zed.dev/blog/claude-code-via-acp](https://zed.dev/blog/claude-code-via-acp).

- **Zed AI assistant panel** supports Anthropic, OpenAI, Google, plus bring your own key. Source: [zed.dev/docs/ai/agent-panel](https://zed.dev/docs/ai/agent-panel).

- Sobo on Sequoia's Training Data podcast: "Why IDEs Won't Die in the Age of AI Coding" ([sequoiacap.com](https://sequoiacap.com/podcast/why-ides-wont-die-in-the-age-of-ai-coding-zed-founder-nathan-sobo/)) and Changelog #640 ([changelog.com/podcast/640](https://changelog.com/podcast/640)).

## The specific team Mason would join

The role is on a **new AI Foundations team building DeltaDB**, described in the posting as a system for capturing the operational history of software development. Source: [zed.dev/jobs/ai-engineer](https://zed.dev/jobs/ai-engineer). This is a brand new team on a brand new product surface, which is the best possible time to join.

## Leadership

- **Nathan Sobo** (CEO) — joined GitHub in 2011, led Atom until 2018, left GitHub after Microsoft acquisition, founded Zed 2021. Writes publicly about editor internals and agentic engineering. [zed.dev/team](https://zed.dev/team), [changelog.com/podcast/241](https://changelog.com/podcast/241).
- **Max Brunsfeld** — Atom team 2013, **creator of Tree-sitter** which now powers GitHub's code analysis. [github.blog](https://github.blog/news-insights/product-news/atoms-new-parsing-system/).
- **Antonio Scandurra** — Atom alumnus, co-founder. [github.com/as-cii](https://github.com/as-cii).

## Recent news (October 2025 to April 2026)

- **ACP launched publicly** October 2, 2025. Source: [zed.dev/acp](https://zed.dev/acp).
- **JetBrains and Zed announce ACP interoperability**, October 2025. Source: [blog.jetbrains.com](https://blog.jetbrains.com/ai/2025/10/jetbrains-zed-open-interoperability-for-ai-coding-agents-in-your-ide/).
- **ACP Registry** launched. Source: [zed.dev/blog/acp-registry](https://zed.dev/blog/acp-registry).
- No layoffs, no controversies surfaced.

## Hooks for the cover letter

These are the specific, verifiable things Mason can reference to prove he actually researched Zed. The cover letter should use **at most two** of these, not all six. Pick the ones that land hardest.

1. **Sobo's "contribution measured not in lines of code but in reliable well designed systems" quote.** This is the strongest hook. It maps directly onto Mason's framing of VTR: shipped in three weeks, real users, AI pipeline inside a real product. Source: [zed.dev/blog/software-craftsmanship-in-the-era-of-vibes](https://zed.dev/blog/software-craftsmanship-in-the-era-of-vibes).

2. **ACP as Zed's open standard, and JetBrains adopting it in October 2025.** Zed shipped the protocol that the rest of the industry is now standardizing on. The framing Mason can use: this is what I want to work on. Source: [zed.dev/acp](https://zed.dev/acp).

3. **Claude Code runs natively inside Zed via ACP.** Mason's daily tool, running inside the editor he would be working on. Source: [zed.dev/blog/claude-code-via-acp](https://zed.dev/blog/claude-code-via-acp).

4. **The AI Foundations team building DeltaDB is brand new.** A specific, unfakeable reference in the closer. Source: [zed.dev/jobs/ai-engineer](https://zed.dev/jobs/ai-engineer).

5. **"Agentic Engineering"** as Zed's framing — human craftsmanship plus AI tools. Mason literally writes this way about his own work in his LinkedIn bio ("I design the architecture, make the technical decisions, and use AI coding tools to accelerate implementation"). Source: [zed.dev/agentic-engineering](https://zed.dev/agentic-engineering).

6. **Tree-sitter lineage.** Mason used tree-sitter-based tooling in his projects (indirectly, through Zed itself and other editors) and this is the team that built it. Weaker hook, use only if needed.

## Red flags and concerns

- **Rust is soft required.** The posting says "Rust experience OR willingness to learn," which is a real escape hatch, but the "Preferred" qualifications list Rust proficiency. Mason has zero Rust. This is the #1 interview-prep study topic.
- **"Strong backend or systems programming background"** — Mason's TypeScript / Express / Postgres work is application-layer backend depth, not systems programming in the compilers / infrastructure sense. The framing needed: application backend with a real AI pipeline, plus the audio fingerprinting work in SonicGen as evidence Mason can go lower level when the problem demands it.
- **Pair programming culture.** Zed does pair programming as a default workflow, and Mason's solo agent-directed workflow will need to be framed as complementary, not oppositional. The honest framing: "I ship solo by directing agents, and I'd welcome the chance to learn how you pair on agent-directed work."
- **Small team (~41) at Series B.** Comp is healthy ($170k to $250k base) and well above Mason's floor. Equity is a bet on Zed growing, which is plausible given Sequoia lead.
- No negative founder signals, no layoffs.

## Fit revision

The `role.md` fit score was 6/10 based on JD alone. Research revises this **up to 8/10**.

Reason: the Sobo "Craftsmanship in the Era of Vibes" essay, the ACP work, and the Claude Code integration are all explicit signals that Zed's framing of agent directed development is aligned with Mason's entire differentiator. The Rust gap is still real, but the "OR willingness to learn" escape hatch is unusually explicit in the JD. This is the most aligned company Mason has looked at so far. Apply.

## Speculation (low confidence)

- **The AI Foundations team probably has headcount for generalists who are strong on the AI product side but lighter on Rust, which is why the JD has the "OR willingness to learn" escape hatch.** If true, this is exactly the role shape Mason wants. Cannot verify without talking to someone on the team.
- Nathan Sobo's public writing cadence suggests he is the likely first interviewer or at least part of the loop for any AI Foundations hire. Worth preparing specifically for his style of questioning (framing, not trivia).
