# Role: Backend Software Engineer, Data Services

## Quick facts

| Field | Value |
|-------|-------|
| Company | Sennos |
| Title | Backend Software Engineer, Data Services |
| URL | https://ats.rippling.com/sennos/jobs/d634a1e0-68d1-4911-8d8a-7c535a6688b6 |
| Location | Durham, NC |
| Comp | Not listed |
| Lane | fullstack-ai |
| Fit score | 7/10 |
| Applied | No |
| Hard filters failed | None |

## Recommendation

**Apply.** Python microservices and sensor data pipelines at a small startup (around 30 employees) in Durham. Equivalent experience accepted in place of a degree. The role is ML adjacent, which means Mason's AI pipeline and PyTorch experience are relevant differentiators. Small team, Python stack, local to the Triangle. The sensor data domain is new but Mason's audio processing experience (spectrograms, signal processing, pipeline design) transfers well.

## What you'd do day-to-day

Build Python microservices for sensor data ingestion and processing pipelines. Work with data services infrastructure. Build and maintain backend systems that feed into ML models. Work on a small engineering team at a Durham startup.

## Requirement-by-requirement assessment

### Must-haves

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Python backend development | GREEN | Tier A skill. SonicGen (14k LOC), PianoTranscriber (30k LOC), VTR pipeline. |
| Microservices architecture | YELLOW | VTR has separated concerns (API server, AI pipeline, frontend). No formal microservices deployment. |
| Data pipeline experience | GREEN | SonicGen ingestion pipeline (YouTube API, yt-dlp, FFmpeg, GCS, restartable state machine). VTR AI pipeline (4 stages, structured outputs). PianoTranscriber preprocessing pipeline (100GB audio dataset). |
| Equivalent experience in lieu of degree | GREEN | UNC Chapel Hill AI Bootcamp + 4 shipped projects with real data pipelines. |

### Bonus points

| Requirement | Status | Evidence |
|-------------|--------|----------|
| ML experience | GREEN | PyTorch CNN training on GCP GPUs. OpenAI API integration. Spectrogram preprocessing. |
| Sensor/signal data | YELLOW | Audio signal processing (SonicGen: STFT, spectral peaks, frequency band limiting). Not sensor hardware but signal processing fundamentals transfer. |
| Cloud deployment | GREEN | GCP: Cloud Run, Cloud SQL, Cloud Build, Cloud Storage. |

## Truthfulness gaps

1. **No professional engineering experience.** All work is self-directed projects.
2. **No microservices production experience.** Mason's backend work is monolithic Express apps, not distributed microservices.
3. **No sensor hardware experience.** Mason's signal processing is audio, not IoT sensors.
4. **No team engineering experience.** Has never worked in a shared codebase with other engineers.

## Strategy

**Lead with:** Data pipeline experience. SonicGen's ingestion pipeline and PianoTranscriber's 100GB audio preprocessing pipeline are direct analogs to sensor data pipeline work. Mason builds production data pipelines that handle real volume.

**Differentiator:** Signal processing fundamentals from audio work. Spectrograms, frequency analysis, peak detection, and time series alignment are core skills that transfer directly to sensor data processing.

**Frame the sensor gap:** Audio processing and sensor data processing share the same fundamentals: noisy time series data, frequency domain analysis, pipeline architecture for ingestion and transformation. The domain is different but the engineering patterns are the same.

**Local advantage:** Durham is 30 minutes from Raleigh. No relocation.
