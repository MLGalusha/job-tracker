# Resume gaps: Bandwidth AI Engineer, R&D

Things the resume claims or implies vs. what Mason can honestly defend.

---

## Claims on the resume and their defensibility

### "Self-taught AI engineer who ships production LLM integrations end to end"
- **Source:** VTR is live at voicesthatremain.com with a production AI pipeline on GCP. Verifiable.
- **Probe:** "What does 'production' mean here? How many users?" 
- **Honest answer:** It's a family archive, not a SaaS product. "Production" means deployed on GCP with CI/CD, persistent data, real users (family members), and error handling. Not enterprise scale.

### "Four AI projects in 18 months"
- **Source:** PianoTranscriber (Dec 2024), SonicGen (Dec 2025), VTR (Mar 2026), Staffclaw (2026). All verifiable via repos or live site.
- **Probe:** "Are these all AI projects?" 
- **Honest answer:** Staffclaw doesn't use AI/ML directly. It's a full-stack app that demonstrates reverse engineering and agent-directed development. The other three are genuinely AI/ML projects.

### "Prompt engineering (zero-shot, few-shot, chain-of-thought)"
- **Source:** VTR uses per-document-type prompts with injected context (few-shot adjacent). Chain-of-thought used in agent workflows.
- **Probe:** "Give me an example of chain-of-thought prompting in your work."
- **Honest answer:** The metadata extraction stage injects the transcription and surrounding document context to guide extraction. It's closer to few-shot with context injection than formal CoT. Be specific about what you actually do, don't overclaim the terminology.

### "PyTorch (CNN training on real datasets)"
- **Source:** PianoTranscriber. Trained a CNN on MAESTRO dataset using GCP GPU VMs.
- **Probe:** "What optimizer? What loss function? What learning rate schedule?"
- **Honest answer:** Binary cross-entropy loss, standard Adam optimizer. No learning rate scheduling beyond defaults. Mason should review these details before the interview.

### "Audio fingerprinting"
- **Source:** SonicGen, 14k LOC, public repo.
- **Probe:** "How does it compare to Dejavu or Chromaprint?"
- **Honest answer:** "I didn't benchmark against existing libraries. SonicGen was built from the Shazam paper as a learning exercise and for a specific use case (audio dedup). It works but I haven't tested collision rates at scale."

---

## Things NOT on the resume that they'll likely ask about

### Professional engineering experience
- **Reality:** Zero. All work is self-directed.
- **How to handle:** Don't dodge it. "This would be my first engineering role. Everything I've built has been self-directed, which means I've made every decision, from architecture to deployment, myself. The gap is I haven't worked in a team codebase with code review, shared ownership, and production SLAs."

### Hugging Face / Transformers
- **Reality:** Not used in any project. JD lists it as a requirement.
- **How to handle:** Study before the interview (see study-guide.md). Be able to load a pre-trained model, run inference, explain tokenizers. If asked directly: "I've used PyTorch directly and OpenAI APIs. I haven't used Hugging Face Transformers in a project yet, but I've worked through their NLP course and understand the pipeline abstraction."

### RAG implementation
- **Reality:** VTR's metadata extraction is structurally similar (document in, structured output out via LLM) but is not a retrieval-augmented system. Mason has not built a vector-store-backed RAG pipeline.
- **How to handle:** Frame VTR as adjacent, build a small RAG demo before applying (see study-guide.md), and be honest: "I haven't built a full vector-store RAG pipeline, but VTR's metadata extraction solves a similar problem: take a document, extract structured information with an LLM, validate the output. Adding a retrieval layer is the natural next step."

### LLM fine-tuning (LoRA)
- **Reality:** Has not fine-tuned an LLM. Has trained a CNN from scratch.
- **How to handle:** "I've trained a model from scratch in PyTorch, so I understand training loops, loss functions, and GPU workflow. I haven't done LoRA fine-tuning on an LLM specifically, but I understand the concepts: adapters, parameter-efficient approaches, why full fine-tuning is expensive."

### scikit-learn
- **Reality:** Likely used in bootcamp but not prominently in any shipped project.
- **How to handle:** Refresh before interview. Know train/test split, cross-validation, confusion matrix, precision/recall/F1.

### NLP domain depth
- **Reality:** VTR does text processing (entity extraction, relationship resolution) but Mason hasn't built NLP classifiers, NER systems, or text embeddings from scratch.
- **How to handle:** Frame VTR's entity extraction as applied NLP. Be honest that it uses LLM APIs rather than custom NLP models.
