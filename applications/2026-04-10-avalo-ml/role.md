# Role: Machine Learning Specialist

## Quick facts

| Field | Value |
|-------|-------|
| Company | Avalo (avalo.ai) |
| Title | Machine Learning Specialist |
| URL | https://avaloai.applytojob.com/apply |
| Location | Durham, NC (some remote) |
| Comp | Not listed |
| Lane | ai-engineer |
| Fit score | 6/10 |
| Applied | No |
| Hard filters failed | None |

## Recommendation

**Apply with calibrated expectations.** Avalo uses ML for crop design and agricultural genomics. $6M funded, small team. The Python ML stack aligns, and Mason has real model training experience (PianoTranscriber CNN on 100GB dataset). The gap is domain: Mason has zero biology/genomics experience. But small funded startups sometimes prioritize strong ML engineering fundamentals over domain expertise, especially at this stage. Durham is close.

## What you'd do day-to-day

Build and maintain ML models for crop trait prediction and optimization. Work with genomic and phenotypic data. Train, evaluate, and deploy models. Likely small team where you touch the full ML lifecycle.

## Requirement-by-requirement assessment

### Must-haves

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Python ML stack | GREEN | Tier A. PyTorch, librosa, scipy, numpy, pandas all production-used. |
| Model training experience | GREEN | PianoTranscriber: trained CNN from scratch on 100GB MAESTRO dataset, GCP GPU VMs, out-of-core batching across 130 Parquet chunks. |
| Data pipeline experience | GREEN | VTR's 4-stage AI pipeline, SonicGen's ingestion pipeline, PianoTranscriber's preprocessing pipeline. |
| Experiment tracking and evaluation | YELLOW | PianoTranscriber had manual evaluation. No MLflow/W&B experience. VTR has HITL evaluation. |

### Bonus points

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Biology/genomics domain | RED | Zero experience. |
| Agricultural data | RED | Zero experience. |
| Cloud ML platforms | YELLOW | GCP Cloud Run/Cloud SQL deployment. GPU training on GCP VMs. No SageMaker/Vertex AI. |

## Truthfulness gaps

1. **No biology or genomics knowledge.** Cannot claim any domain expertise.
2. **No professional ML experience.** All projects are self-directed.
3. **Limited model architectures.** Has trained CNNs. Has not trained transformers, GNNs, or other architectures from scratch.
4. **No experiment tracking tools.** No MLflow, W&B, or similar.

## Strategy

**Lead with:** PianoTranscriber's training pipeline. It demonstrates real ML engineering: handling a 100GB dataset with out-of-core batching, custom preprocessing, training on cloud GPUs, and building the full inference pipeline. The scale and rigor matter more than the domain.

**Differentiator:** Mason builds the full pipeline, not just the model. From data ingestion to preprocessing to training to inference to output. Avalo needs someone who can own the whole stack at a small company, not just tune hyperparameters.

**Frame the domain gap honestly:** No biology background. But ML engineering patterns transfer. The hard part is usually data pipelines, training infrastructure, and evaluation methodology, not the domain-specific feature engineering, which can be learned.
