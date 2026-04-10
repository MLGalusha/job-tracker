# Mason Galusha

Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850
[github.com/MLGalusha](https://github.com/MLGalusha) · [linkedin.com/in/masonlgalusha](https://www.linkedin.com/in/masonlgalusha) · [voicesthatremain.com](https://voicesthatremain.com)

## Summary

I use Claude Code as my primary development tool and have built production AI pipelines with extensive prompt engineering. I designed per-document-type prompts, structured output schemas, and uncertainty-marking patterns for a 4-stage AI pipeline processing handwritten historical documents. I wrote 14,000 lines of Python by hand before switching to agent-directed development, so I evaluate AI-generated code from a position of understanding the code itself. I am looking for a role where I can improve the prompts and behaviors that make Claude Code effective.

---

## Selected Projects

### Voices That Remain — 2026
**voicesthatremain.com** · Production AI pipeline · TypeScript/Python · GCP

- Designed and iterated prompts for a 4-stage AI pipeline: vision transcription of handwritten text, structured metadata extraction with Zod-validated schemas, entity resolution across collections, and cost-tiered model routing
- Built per-document-type prompt strategies (letters, envelopes, telegrams, photos) because a single prompt cannot handle the variation in handwritten historical documents
- Implemented guillemet tagging for uncertainty marking: the model flags low-confidence text so human reviewers know exactly where to focus. This pattern emerged from observing where the model failed, not from theory
- 58,700 LOC TypeScript, 547 commits, deployed on GCP. Shipped 90% in a 3-week sprint

### SonicGen — 2025
**[github.com/MLGalusha/SonicGen](https://github.com/MLGalusha/SonicGen)** · Audio fingerprinting engine · 14k lines Python · **Written by hand, no coding agents**

- Built a Shazam-style audio fingerprinting and dedup engine from scratch: spectrograms, peak detection, constellation hashing, alignment-offset matching
- Proves the ability to write, read, and reason about complex code without AI assistance. Directly relevant to evaluating what Claude Code produces

### Staffclaw — 2026
**[github.com/MLGalusha/staffclaw](https://github.com/MLGalusha/staffclaw)** · Full-stack scheduling tool

- Reverse-engineered 92 undocumented API endpoints using agent-directed methodology in a single Claude Code session
- Full stack TypeScript (Express 5, React 19, Drizzle, Postgres). Demonstrates large-scale agent-directed development in practice

### PianoTranscriber — 2024
**Audio ML** · PyTorch CNN · GCP GPU VMs

- Trained a CNN from scratch on the MAESTRO dataset (200 hours, ~100 GB) to transcribe piano audio into MIDI
- UNC Chapel Hill AI Bootcamp capstone

---

## Skills

**Agent-directed development:** Claude Code (daily primary tool since January 2026), Cursor, Codex. Direct agents to produce production code, review and own every decision. Extensive experience with Claude Code's strengths, limitations, and behavioral patterns.

**Prompt engineering:** Per-document-type prompt design, structured outputs with schema validation, uncertainty marking (guillemet tagging), zero-shot/few-shot/chain-of-thought patterns, vision prompts for handwritten text, cost-tiered model routing

**Languages:** Python, TypeScript, JavaScript, SQL, HTML/CSS

**AI / ML:** OpenAI Responses API (GPT-5.4/5.4-mini, structured outputs, tool calling, vision), HITL pipeline design, PyTorch

**Backend:** Node.js, Express, Drizzle ORM, Postgres, REST API design

**Frontend:** React 19, Vite, React Router, Playwright, Vitest

**Cloud:** Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage)

---

## Education

**UNC Chapel Hill AI Bootcamp** — May-December 2024
- Capstone: trained a PyTorch CNN to transcribe piano audio into MIDI on the MAESTRO dataset using GCP GPU VMs

---

## Background Note

I am a self-taught developer with no CS degree. I deliberately wrote code by hand through all of 2025 before adopting Claude Code as my primary tool in January 2026. I understand what Claude Code generates because I wrote the same kinds of systems myself first. That background gives me a grounded perspective on where its prompts work well and where they need improvement.
