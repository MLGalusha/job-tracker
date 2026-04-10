# Study Guide: Bandwidth AI Engineer, R&D

**Time budget:** 20 hours over 5 days
**Interview style:** Project discussion, conceptual AI/ML, possibly a take-home prototype. No evidence of LeetCode.

---

## Three leverage cards

These are the things Mason can say that most candidates cannot. Prepare to deploy each in under 60 seconds.

1. **VTR's AI pipeline is a production RAG-adjacent system.** Four stages: GPT-5.4 Vision transcription with Sharp preprocessing, HITL verification gate, metadata extraction with Zod strict structured outputs and guillemet tagging, entity extraction and resolution with fuzzy matching. Deployed on GCP. Cost-tiered model selection. This is not a tutorial project -- it handles real documents with real error modes.

2. **Audio/voice domain experience across three projects.** PianoTranscriber (CNN on 100GB audio dataset), SonicGen (Shazam-style fingerprinting, 14k LOC by hand), VTR (voice transcription pipeline). Bandwidth is a voice company. Mason has more audio processing experience than most web developers.

3. **Agent-directed development is the methodology, not just a tool.** Mason doesn't just use Cursor. He directs Claude Code agents to build production systems, reviews their output critically, and has shipped 58,700 LOC of production TypeScript this way. He has opinions about when agents help and when they don't.

---

## Budget allocation

| Category | Hours | % |
|----------|-------|---|
| Project defensibility (VTR, SonicGen, PianoTranscriber) | 5 | 25% |
| ML fundamentals gap-filling | 5 | 25% |
| RAG and agentic systems deep-dive | 4 | 20% |
| Bandwidth-specific prep | 3 | 15% |
| Behavioral and presentation | 3 | 15% |
| LeetCode | 0 | 0% |

---

## Blocking gaps to close

These are the areas where Mason is weakest relative to the JD. Prioritize study here.

### 1. ML frameworks beyond PyTorch basics (5 hours)

Mason trained a CNN with PyTorch for PianoTranscriber. The JD wants familiarity with the broader ML ecosystem.

**Study plan:**
- [ ] **Hugging Face Transformers (2 hours):** Work through the [HF course](https://huggingface.co/learn/nlp-course). Focus on: loading a pre-trained model, running inference, understanding tokenizers, using pipelines. Build one working example: sentiment classification or text summarization with a pre-trained model.
- [ ] **scikit-learn refresher (1 hour):** Review classification, regression, train/test split, cross-validation, confusion matrix, precision/recall/F1. Know when to use sklearn vs. a neural approach.
- [ ] **Fine-tuning concepts (1 hour):** Read about LoRA and QLoRA. Understand: what is an adapter, why full fine-tuning is expensive, what PEFT is. You do not need to run a fine-tune, but you need to explain the concept clearly.
- [ ] **Evaluation metrics (1 hour):** Understand BLEU, ROUGE, perplexity for language models. Know what "custom evaluation benchmarks" means in practice. Review how you'd evaluate a RAG system (retrieval recall, answer faithfulness, hallucination rate).

**Defensibility note:** If asked "have you fine-tuned an LLM?", the honest answer is: "I've trained a CNN from scratch on a 100GB dataset using PyTorch and GCP GPUs, so I understand training loops, loss functions, and GPU workflow. I haven't done LoRA fine-tuning on an LLM specifically, but I understand the concepts and could ramp quickly."

### 2. RAG architecture depth (2 hours)

Mason uses LLM APIs with structured outputs and tool calling. The JD explicitly calls out RAG.

**Study plan:**
- [ ] **RAG pipeline components (1 hour):** Document chunking strategies (fixed-size, semantic, recursive), embedding models (text-embedding-3-small, text-embedding-3-large), vector stores (Pinecone, Chroma, pgvector), retrieval strategies (dense, sparse, hybrid), reranking.
- [ ] **Build a minimal RAG demo (1 hour):** Use OpenAI embeddings + Chroma or pgvector. Ingest a small doc set, retrieve relevant chunks, generate answers. Keep it under 100 LOC. This could become a portfolio piece or take-home submission.

**Connection to VTR:** VTR's metadata extraction stage is structurally similar to RAG. It takes a document (scanned letter), extracts structured information using an LLM with a tailored prompt, and validates the output with Zod schemas. The difference is VTR uses vision input instead of text retrieval. Frame this connection explicitly.

### 3. Agentic systems vocabulary (2 hours)

The JD lists "agentic systems (ReAct)" as a bonus. Mason builds with agents daily but may not use the academic terminology.

**Study plan:**
- [ ] **ReAct pattern (30 min):** Read the [ReAct paper abstract](https://arxiv.org/abs/2210.03629). Understand: Reasoning + Acting, interleaved thought/action/observation traces, how it differs from chain-of-thought alone.
- [ ] **Agent frameworks survey (30 min):** Skim LangChain agents, CrewAI, Autogen. Know the high-level architecture of each: what's a tool, what's an agent, what's a chain, what's memory. You don't need to build with them, but you need to speak about tradeoffs.
- [ ] **Tool calling as agent primitive (30 min):** You already know this from VTR. Prepare to explain: function calling schema, how the model decides which tool to use, structured output validation, error handling. This is your strongest agent-related talking point.
- [ ] **Multi-agent architectures (30 min):** Understand orchestrator/worker patterns, agent handoffs, shared context. Relate to your experience directing Claude Code agents that spawn sub-agents for different tasks.

---

## Project defensibility cards

### VTR (primary -- lead with this)

**30-second pitch:** "I built a full-stack web app that digitizes handwritten family letters using AI. The pipeline uses GPT-5.4 Vision for transcription, structured outputs with Zod validation for metadata extraction, and a human-in-the-loop gate to catch AI errors before they touch the database. 58,000 lines of TypeScript, 547 commits, deployed on GCP Cloud Run."

**Likely questions and crisp answers:**

Q: "How do you handle hallucinations in the transcription pipeline?"
A: "Three layers. First, the HITL gate: every AI transcription gets human review before it's committed. Second, guillemet tagging: the model wraps uncertain text in markers so reviewers know where to focus. Third, I use strict structured outputs with Zod schemas. If the model returns something that doesn't parse, it gets rejected and retried with a different prompt."

Q: "Why not use a fine-tuned model instead of prompting?"
A: "Cost and flexibility. The letters span 150 years of handwriting styles. A fine-tuned model would need a labeled dataset I don't have, and the API-based approach lets me swap models as better ones come out. I use cost-tiered model selection: GPT-5.4 for complex documents, GPT-5.4-mini for simpler ones. If accuracy requirements change, I adjust prompts, not retrain."

Q: "How would you evaluate this pipeline systematically?"
A: "Right now evaluation is HITL: reviewers accept or reject. To formalize it, I'd build a golden set of 50-100 letters with ground-truth transcriptions, measure character error rate and field-level accuracy on the structured outputs, and track rejection rate trends over time. That's essentially a custom eval benchmark."

### PianoTranscriber (secondary -- audio/ML credibility)

**30-second pitch:** "I trained a CNN from scratch in PyTorch to transcribe piano audio into MIDI. Used the 100GB MAESTRO dataset on GCP GPU VMs. The model takes spectrograms as input, predicts per-frame note activations across 88 keys, and outputs playable MIDI files."

Q: "Walk me through your training pipeline."
A: "Librosa converts audio to spectrograms at 16 kHz. Sliding window: 240 frames in, predict the middle 80. The CNN uses convolutional layers with max pooling to compress 513 frequency bins down to 128. Binary cross-entropy loss per key. I trained on GCP GPU VMs using out-of-core batching because the dataset is too large for RAM: 130 Parquet chunks loaded and shuffled at runtime."

Q: "What were the results?"
A: Honest answer: "Accuracy wasn't SOTA. I evaluated by listening, not with formal metrics like mir_eval. The model captures note onsets reasonably well for simple passages but struggles with polyphonic sections and dynamics. Given more time, I'd add a proper evaluation suite and experiment with attention layers."

### SonicGen (tertiary -- hand-coded credibility)

**30-second pitch:** "I built a Shazam-style audio fingerprinting engine from scratch in Python. 14,000 lines of code, no coding agents, no frameworks. Constellation hashing, alignment-offset matching, rate-capped ingestion from YouTube. Written entirely by hand over 3 months."

Use this to counter "do you just use AI to code?": "SonicGen is the project that proves I can write complex algorithms by hand. No agents, no LLMs, no copy-paste. Every line is mine."

---

## Bandwidth-specific prep (3 hours)

- [ ] **Understand the product (1 hour):** Read Bandwidth's API docs for voice and messaging. Understand: how a developer would use Bandwidth to add voice calling to an app. Try the quickstart if there's a sandbox.
- [ ] **Maestro and the AI voice thesis (1 hour):** Read about Maestro, the MCP server they shipped, and the Activation Agent. Understand: what "AI voice agent orchestration" means in practice. Think about: what PoC would you build if you joined the R&D team?
- [ ] **Prepare a PoC pitch (1 hour):** Have one concrete idea for an AI prototype at Bandwidth ready. Example: "An agent that monitors call quality metrics in real-time, detects anomalies, and auto-escalates to human operators with a summary of what went wrong. Uses tool calling to query Bandwidth's APIs, RAG over historical incident data, and structured outputs for the escalation report." This shows you can think like an R&D engineer, not just execute tasks.

---

## Behavioral prep (3 hours)

Bandwidth's culture emphasizes collaboration, curiosity, and comfort with ambiguity. Prepare for these themes.

### Prepared answers

**"Tell me about yourself."**
"I'm a self-taught engineer based here in Raleigh. I went through UNC Chapel Hill's AI bootcamp last year, where I trained a CNN to transcribe piano audio into sheet music. Since then I've shipped four projects, the biggest being Voices That Remain, a full-stack app with a production AI pipeline for digitizing handwritten family letters. I build with AI agents every day using Claude Code and Cursor. I'm looking for my first engineering role, and Bandwidth's R&D team caught my attention because the work, building prototypes with LLMs for a voice platform, lines up with exactly what I've been building on my own."

**"Why Bandwidth?"**
"Three reasons. First, the R&D team's work maps directly to what I do: building PoCs with LLMs, experimenting with RAG and agentic systems, evaluating new tools. Second, the AI voice agent thesis is compelling. The idea that the next billion PSTN users are AI agents is a specific, testable bet, and I want to be on a team that's building for that. Third, I'm in Raleigh. I want to build my career here, and Bandwidth is the strongest AI-forward company in the Triangle."

**"What's your biggest weakness?"**
"I don't have professional engineering experience. Everything I've built has been self-directed. The upside is I've had to make every decision myself, from architecture to deployment. The gap is I haven't worked in a team codebase with code review, shared ownership, and production SLAs. I'm hungry for that."

**"How do you handle ambiguity?"**
"VTR is a good example. When I started, I had scanned letters and a vague goal: make them searchable. No spec, no design doc. I broke it into four pipeline stages, built the simplest version of each, and iterated. The HITL gate was the key insight: I didn't need the AI to be perfect, I needed a system where humans could catch errors efficiently. That framing came from sitting with the ambiguity, not from a requirements document."

**"Describe a time you learned something quickly."**
"When I built VTR, I had never used Cloud Run, Cloud SQL, or Cloud Build. I had the app deployed and serving traffic in about a week, including setting up the CI/CD pipeline. I learn by building something real with the tool, not by reading docs front-to-back."

---

## Questions for them

1. "What's the R&D team's process for deciding which prototypes move to production? Is there a formal evaluation, or is it more about team consensus and leadership buy-in?"
2. "How does the R&D team interact with the Maestro product team? Do you hand off prototypes, or do R&D engineers sometimes follow a project into production?"
3. "What's the most interesting prototype the team has built in the last six months that didn't ship? What killed it?"
4. "The MCP server you shipped, was that an R&D project first? How long did it take from prototype to public release?"

---

## Day-by-day plan

### Day 1 (4 hours): ML fundamentals
- Hugging Face Transformers course (2 hours)
- scikit-learn refresher (1 hour)
- Fine-tuning concepts: LoRA, QLoRA, PEFT (1 hour)

### Day 2 (4 hours): RAG and evaluation
- RAG pipeline architecture deep-dive (1 hour)
- Build minimal RAG demo with embeddings + vector store (1 hour)
- Evaluation metrics: BLEU, ROUGE, perplexity, RAG eval (1 hour)
- VTR defensibility drill: practice 30-second pitch + Q&A (1 hour)

### Day 3 (4 hours): Agentic systems and frameworks
- ReAct paper + pattern understanding (30 min)
- LangChain/CrewAI/Autogen survey (30 min)
- Tool calling deep-dive (prepare to explain from VTR experience) (30 min)
- Multi-agent architecture patterns (30 min)
- PianoTranscriber and SonicGen defensibility drill (2 hours)

### Day 4 (4 hours): Bandwidth-specific
- Read Bandwidth API docs, understand voice/messaging product (1 hour)
- Research Maestro, MCP server, Activation Agent (1 hour)
- Prepare a PoC pitch for the R&D team (1 hour)
- Behavioral prep: practice all prepared answers out loud (1 hour)

### Day 5 (4 hours): Integration and polish
- Mock interview: have someone (or Claude) run through likely questions (2 hours)
- Review all defensibility cards, tighten weak answers (1 hour)
- Prepare questions for them, review company.md (1 hour)

---

## If you only have 4 hours

1. VTR defensibility drill (1 hour) -- this is your primary asset
2. RAG architecture concepts + build tiny demo (1 hour)
3. Bandwidth product research + PoC pitch (1 hour)
4. Behavioral prep: "Tell me about yourself" + "Why Bandwidth?" (1 hour)

Skip ML frameworks, skip agentic systems vocabulary, skip evaluation metrics. Lead with what you've built, not what you've studied.
