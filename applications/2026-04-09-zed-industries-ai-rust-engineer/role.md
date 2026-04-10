# Zed Industries — AI Rust Engineer

**app_id:** 2026-04-09-zed-industries-ai-rust-engineer
**URL (canonical):** https://zed.dev/jobs/ai-engineer
**URL (apply):** https://jobs.ashbyhq.com/zed/f853eb93-9c32-46e9-b13b-deffaf47fb26/application
**Location / remote:** Remote (American or European time zones)
**Posted:** Current (verified 2026-04-09)
**Stated salary:** Not disclosed
**Source:** direct (zed.dev careers page)

---

## Lane

**ai-engineer** — AI Engineer at an AI-native company whose core product is the Zed editor, with a strong secondary `founding`-flavored signal (small team, pair programming, weekly shipping, open source built in public).

## Fit score: 6/10

Strong on the AI / LLM application layer — VTR is exactly the kind of production system the JD describes under "Experience building production systems powered by large language models" and "integrating AI capabilities into real software products." Weak on the systems-programming and Rust dimensions — Zed's codebase is a Rust editor, and the JD will draw applications from senior systems engineers who happen to know AI; Mason's angle is the reverse. The no-hard-filter posture ("willingness to learn" Rust, no years requirement, no degree) and the explicit value placed on "tool-using or agent-style models" experience make this a genuinely plausible shot — but realistically Mason is fighting uphill against Rust/compilers candidates.

## Recommendation

**apply**

No hard filters. Agent-directed work is explicitly on their preferred list. VTR is a defensible production-AI evidence point. Worth the tailoring effort even against the systems-programming uphill battle, because the downside of applying is low and the lane match is real.

---

## Required (from JD)

- ✅ **Experience building production systems powered by LLMs** — VTR is exactly this (GPT-5.4 Responses API, structured outputs, tool calling, production deployment).
- 🟡 **Strong understanding of model behavior, prompting, and evaluation** — VTR has per-document-type prompt tuning and cost-tiered model selection (GPT-5.4 + GPT-5.4-mini), but no formal eval framework. Claim the prompting and model-selection parts; do not claim formal LLM evaluation.
- ✅ **Experience integrating AI capabilities into real software products** — VTR is a production AI product with real users.
- 🟡 **Strong backend or systems programming experience** — TypeScript/Express/Drizzle/Postgres backend is strong full-stack work, but "systems programming" in the Rust/C++/compilers sense is not in the profile. Claim the backend half honestly; do not claim systems programming.
- 🟡 **Interest in developer tools and programming environments** — Real interest demonstrated by daily Claude Code + Codex use and this job-tracker project (an agent-native dev tool), but no formal dev-tools building on the resume. Frame as "user and builder of agent-driven dev tooling."
- 🟡 **Ability to collaborate closely with other engineers** — Mostly solo work with coding agents; bootcamp group capstone is the only cite. Acknowledge honestly in cover letter ("collaboration with agents is a daily loop for me, and I'm eager to pair with humans again").
- 🟡 **Experience with Rust, or willingness to learn** — No Rust experience. The JD explicitly accepts "willingness to learn," so this is a valid box to tick.

## Nice-to-have (from JD)

- 🟡 **Building AI coding assistants or developer tools** — This job-tracker is an agent-native dev tool in development; not yet shipped. Job-tracker can be referenced in the cover letter.
- 🔴 **Designing evaluation systems for LLM-driven products** — Gap. Not in the profile.
- 🔴 **Working with large codebases, compilers, or programming environments** — Gap. VTR at ~15.6k LOC is not "large" by Zed's standard, and no compiler work.
- ✅ **Experience with tool-using or agent-style models** — Daily Claude Code + Codex user; VTR was shipped agent-directed; this is the strongest differentiator for this specific role.
- 🔴 **Experience with Rust** — Gap. Willingness-to-learn path only.

## Truthfulness gaps (things to NOT put on the resume, DO put on the study guide)

- **Rust** — no experience. Can be learned; is a study-guide priority before any interview.
- **Formal LLM evaluation systems** — Mason does ad-hoc prompt tuning and cost/quality comparison, not structured eval pipelines (no held-out test sets, no metric definitions, no regression harnesses). Study-guide: read Anthropic's evals guidance, OpenAI's evals framework, and be ready to talk about how you'd *build* an eval system for VTR if asked.
- **Systems programming in the Rust/C++/compilers sense** — all of Mason's backend work is application-layer TypeScript/Python. Cover-letter framing: lean into full-stack + AI production experience, don't overclaim systems depth.
- **Large-codebase work** — VTR is ~15.6k LOC. Zed is massively larger. Don't claim "large codebase experience."
- **Building dev tools as a shipped product** — job-tracker is in development; don't claim it as shipped. Can be mentioned as "the agent-native tool I'm currently building."

## What to lead with on the resume / cover letter

- **VTR as #1 project** — the production OpenAI pipeline is exactly what this JD is hiring for. Lead with: GPT-5.4 + GPT-5.4-mini cost-tiered model selection, strict-schema structured outputs, tool calling, per-document-type prompt tuning, HITL gate, GCP deploy.
- **Agent-directed development as the differentiator** — Zed explicitly lists "tool-using or agent-style models" in preferred experience; Mason is a daily Claude Code + Codex user who shipped VTR agent-directed in ~3 weeks. This is the single strongest angle for this specific company.
- **The job-tracker project (this repo) as a second agent-native artifact** — shows Mason is currently building agent-native dev tooling, not just using it. Mention in cover letter, not resume.
- **Full-stack TypeScript + Python range** — the JD is split between AI work and systems-programming work. Mason's strongest honest story is the AI work; back it up with the full-stack range from VTR and the Python depth from PianoTranscriber.

## Company notes (sparse — leave full research to company-research skill)

- **Funding stage:** Not stated on the JD. Zed is backed by a16z (known). Likely well-funded.
- **Team size:** Small (pair-programming, weekly shipping, "collaborate closely").
- **Hiring thesis signal:** Open source, built in public, ex-Atom/Tree-sitter team. High bar for technical depth, especially systems. **But** explicitly values agent-style-model experience in preferred list — genuine agent-friendly signal.
- **Product direction:** DeltaDB — recording operational history of development. AI reasoning over evolving codebases. This is adjacent to what Mason's been building but Zed operates at a level of technical depth (editor internals, Rust, compiler-adjacent work) that is above Mason's current evidence.
- **Application process:** Apply via Ashby link. No LeetCode signal from the JD; "pair programming" suggests a collaborative interview loop, which favors Mason over whiteboarding shops.

---

## JD text (canonical, cleaned)

```
AI Rust Engineer — Zed Industries

Location: Remote (American or European time zones)

Most AI developer tools operate on prompts and static snapshots of code. Real software development happens inside large, evolving codebases that change continuously through edits, refactors, discussions, and collaboration.

Zed is building AI systems that operate inside that environment.

Central to this vision is DeltaDB, a system that records the operational history of software development. It captures edits, discussions, and AI interactions as they happen, creating a foundation for AI systems that reason not just about code, but about how that code evolves over time.

This role involves designing systems that help AI understand large, evolving codebases. You'll build infrastructure that provides the right context to models and evaluate whether their suggestions actually improve the software. The work sits at the intersection of AI systems, developer tools, and distributed collaboration.

## Some Questions We're Exploring

- How should AI reason about codebases that are constantly evolving rather than static repositories?
- How can streams of development activity such as edits, refactors, and discussions provide useful context for models?
- What does it mean for AI to operate inside a real-time collaborative environment where multiple developers are editing the same project?
- How should AI systems make suggestions without interrupting developer flow?
- How do we evaluate whether AI systems are genuinely helping developers understand and evolve complex software systems?

## What You Will Work On

- Designing systems that allow AI to participate directly in developer workflows
- Building infrastructure that connects language models with the editor and developer tools
- Developing context systems that help models reason about large codebases
- Designing evaluation frameworks for AI-assisted development
- Improving the reliability, latency, and cost efficiency of AI features
- Working closely with editor and infrastructure engineers to ship ideas quickly
- Pair programming with teammates to explore ideas and refine systems together

## Requirements

- Experience building production systems powered by large language models
- Strong understanding of model behavior, prompting, and evaluation
- Experience integrating AI capabilities into real software products
- Strong backend or systems programming experience
- Interest in developer tools and programming environments
- Ability to collaborate closely with other engineers
- Experience with Rust, or willingness to learn

## Preferred Experience

- Building AI coding assistants or developer tools
- Designing evaluation systems for LLM-driven products
- Working with large codebases, compilers, or programming environments
- Experience with tool-using or agent-style models
- Experience with Rust

## About Zed

Zed is open source and built in public by the team behind Atom and Tree-sitter. Much of our work happens through pair programming, with engineers collaborating directly inside the editor. We ship improvements weekly and work closely with a community that cares deeply about the craft of developer tools.
```
