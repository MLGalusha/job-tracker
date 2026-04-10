# Role: Applied AI Engineer II

## Quick facts

| Field | Value |
|-------|-------|
| Company | Tanium |
| Title | Applied AI Engineer II |
| URL | https://www.tanium.com/careers/7190980 |
| Location | Durham, NC (hybrid 3d/wk) |
| Comp | Not listed |
| Lane | ai-engineer |
| Fit score | 6.5/10 |
| Applied | No |
| Hard filters failed | None explicit |

## Recommendation

**Apply with caveats.** Tanium is an endpoint management platform with 30,000+ enterprise customers. The role builds and deploys AI agents and ML models for their platform. Mason's daily workflow (agent-directed development, OpenAI API, structured outputs, Python) maps to what this team ships. The "II" title and skill-based requirements suggest mid-level, but no degree is explicitly required and the JD focuses on demonstrated ability over credentials. Main risk: Tanium is a mature cybersecurity company, not a startup, and the role may expect professional engineering experience Mason doesn't have. Worth the application because Durham is 25 minutes away and the AI agent focus is a direct hit.

## Requirement-by-requirement assessment

### Must-haves (inferred from JD keywords)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Python | GREEN | Tier A. SonicGen (14k LOC by hand), PianoTranscriber, VTR pipeline. |
| LLMs and AI agents | GREEN | VTR's 4-stage AI pipeline. Agent-directed development is daily methodology. |
| NLP | YELLOW | VTR does text extraction and entity resolution but Mason hasn't built NLP classifiers or NER from scratch. |
| ML models | YELLOW | PyTorch CNN trained on MAESTRO dataset (PianoTranscriber). No traditional ML model deployment to production. |
| AI agent building and deployment | GREEN | VTR pipeline is a deployed multi-stage AI system on GCP. Staffclaw agent mapped 92 API endpoints. |
| Endpoint management / cybersecurity domain | RED | No cybersecurity experience. Will need to learn the domain. |

### Nice-to-haves

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Cloud deployment | GREEN | GCP (Cloud Run, Cloud SQL, Cloud Build, Cloud Storage) for VTR. |
| Production AI systems | GREEN | VTR pipeline is live, handles real data, has HITL gates. |
| Degree in CS/ML | RED | No degree. UNC Chapel Hill AI Bootcamp (6 months). |

## Truthfulness gaps

1. **No professional engineering experience.** All work is self-directed projects.
2. **No cybersecurity or endpoint management domain knowledge.** Would be learning this from zero.
3. **No NLP classifiers or NER built from scratch.** VTR uses OpenAI API for text processing, not custom NLP models.
4. **"II" title implies mid-level.** Mason is entry-level by experience count, though project depth is real.

## Strategy

**Lead with:** VTR's AI pipeline as a production AI agent system (4-stage, GPT-5.4 Vision, structured outputs, tool calling, HITL, deployed on GCP). This is the closest analog to "building and deploying AI agents."

**Differentiator:** Mason builds with AI agents daily and has shipped a production AI pipeline solo. He doesn't just use LLMs, he has built the orchestration, error handling, cost management, and human verification architecture around them.

**Frame the cybersecurity gap honestly:** No endpoint management experience, but the transfer is from "AI agent systems" to "AI agent systems in a new domain." The AI engineering skills are the hard part; the domain is learnable.

**Python-first framing:** Lead the resume with Python since Tanium's stack centers on it. TypeScript is secondary for this application.
