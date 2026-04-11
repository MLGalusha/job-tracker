# Job Tracker

## Quick facts

| Field | Value |
|-------|-------|
| Repo | job (private, will be made public) |
| Status | Active, daily use |
| Started | April 2026 |
| Stack | Claude Code skills system, JSONL data pipeline, Markdown templates |
| Role | Supporting project (interview talking point, not resume headliner) |

## What it is

A structured job search pipeline built as a Claude Code skills project. The system scans target company career pages, deduplicates against an append-only JSONL queue, classifies roles by lane (founding, AI engineer, FDE, full stack), and generates tailored application materials (resume, cover letter, study guide, role analysis, company research) using Mason's profile docs as source of truth.

## Why it matters

This is not a traditional software project with a codebase. It's a system design project that demonstrates how Mason thinks about automation, data pipelines, and agent orchestration. The architecture is:

- **Profile layer:** Markdown files (skills.md, story.md, voice.md, projects/*.md) that serve as the single source of truth for every generated artifact. Voice rules enforce consistency across all outputs.
- **Data layer:** Append-only JSONL queue (sourced-jobs.jsonl) with structured entries per role. Dedup by URL. Status vocabulary: new, queued, skipped, applied.
- **Skill layer:** Modular Claude Code skills (job-sourcer, role-intake, company-research, resume-tailor, cover-letter-writer, interview-prep, outreach) that read profile docs and produce application artifacts.
- **Orchestration:** Parallel agent execution. On a single run, 10 agents built 36 application packages simultaneously, each reading the same profile docs and producing tailored outputs.

## What it demonstrates

1. **System design:** Structured data model, separation of concerns (profile vs. data vs. skills), append-only data integrity, template-driven generation with voice rule enforcement.
2. **Agent orchestration:** Running 10+ agents in parallel, each with different contexts and targets, producing consistent outputs. This is practical multi-agent coordination, not a framework demo.
3. **Pipeline thinking:** The sourcer scans, the intake analyzes, the researcher digs, the tailor generates. Each stage has a defined input/output contract. Same shape as VTR's AI pipeline.

## When to use in applications

- **Interview answer for "how do you use AI tools day to day":** "I built a job search pipeline that runs 10 agents in parallel to scan career pages, research companies, and generate tailored resumes and cover letters. Each agent reads the same profile docs and follows the same voice rules, so the output is consistent across 36 applications."
- **Do not put on resume as a primary project.** It's a process tool, not a shipped product. Use it as color in conversations about agent-directed development methodology.
- **Relevant for:** Anthropic (Claude Code power user), Cursor (agent orchestration), any role that asks about AI-augmented workflows.

## Honest limitations

- Not a traditional codebase. The "code" is skill specs, profile docs, and data files.
- The value is in the system design and orchestration, not in any single technical component.
- Depends entirely on Claude Code's capabilities. It's an application of the tool, not a standalone piece of software.
