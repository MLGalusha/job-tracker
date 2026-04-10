# Role: Generative AI Engineer

## Quick facts

| Field | Value |
|-------|-------|
| Company | Seed-stage startup (via Recruiting from Scratch) |
| Title | Generative AI Engineer |
| URL | https://www.linkedin.com/jobs/view/generative-ai-engineer-ai-seed-stage-startup-at-recruiting-from-scratch-3844886459 |
| Location | Durham, NC |
| Comp | Not listed |
| Lane | founding |
| Fit score | 8/10 |
| Applied | No |
| Hard filters failed | None |

## Recommendation

**Apply. Strong fit.** Seed-stage startup in Durham building LLM infrastructure. Founding team energy, prompt engineering, and generative AI are the core requirements. This maps directly to Mason's daily workflow and strongest skills. The founding lane is the best fit for someone who ships fast, owns everything, and has opinions about how to build with LLMs. No company name means less research is possible, but the role description itself is a near-perfect match.

## What you'd do day-to-day

Build LLM-powered products from the ground up at a seed-stage startup. Prompt engineering, model integration, infrastructure for serving and evaluating LLM outputs. Likely wearing many hats: backend, pipeline, evaluation, possibly frontend.

## Requirement-by-requirement assessment

### Must-haves

| Requirement | Status | Evidence |
|-------------|--------|----------|
| LLM infrastructure experience | GREEN | VTR's 4-stage AI pipeline: GPT-5.4 Vision, structured outputs, tool calling, cost-tiered model selection, HITL gates. Production-deployed on GCP. |
| Prompt engineering | GREEN | Per-document-type prompts in VTR, zero-shot/few-shot/CoT experience, guillemet uncertainty tagging. Daily practice with Claude Code and Cursor. |
| Python | GREEN | Tier A. SonicGen (14k LOC), PianoTranscriber, VTR pipeline. |
| Founding team mindset | GREEN | All projects are solo-built. Ships 90% of VTR in 3 weeks. Self-directed, no hand-holding. |
| Generative AI depth | GREEN | 4 shipped AI projects. Production LLM pipeline. Agent-directed development as primary methodology. |

### Bonus points

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Full stack capability | GREEN | React 19, Express 5, Postgres, Drizzle, GCP deployment. |
| Model evaluation | YELLOW | HITL evaluation in VTR. No automated eval frameworks (HellaSwag, MMLU). |
| Fine-tuning | RED | No LLM fine-tuning. Has trained CNN (PianoTranscriber). |

## Truthfulness gaps

1. **No professional engineering experience.** All work is self-directed projects.
2. **No LLM fine-tuning.** Has not done LoRA, RLHF, or similar.
3. **No RAG implementation.** VTR does retrieval-adjacent patterns but not vector-store RAG.
4. **No startup experience.** Has never worked at a company of any size as an engineer.

## Strategy

**Lead with:** VTR's production LLM pipeline. It demonstrates every skill this role needs: prompt engineering, structured outputs, model selection, evaluation (HITL), and production deployment. The pipeline makes real cost/quality tradeoffs per document, which shows engineering judgment about LLMs, not just API calling.

**Differentiator:** Mason deliberately coded by hand through 2025 before switching to agent-directed development. He doesn't just use LLMs. He understands what they produce well enough to review and own it. For a founding team building LLM infrastructure, that judgment is more valuable than someone who only knows the API surface.

**Founding energy:** Quit his job in March 2026 and shipped a production app in 3 weeks. That's the kind of intensity a seed-stage startup needs.
