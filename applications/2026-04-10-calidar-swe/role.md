# Role: Software Engineer

## Quick facts

| Field | Value |
|-------|-------|
| Company | Calidar (calidar.com) |
| Title | Software Engineer |
| URL | https://calidar.com/ |
| Location | RTP, NC |
| Comp | Not listed |
| Lane | fullstack-ai |
| Fit score | 7/10 |
| Applied | No |
| Hard filters failed | None |

## Recommendation

**Apply.** Medical device startup building 4D mammography. Small team that reportedly responds to applications, which is rare and valuable. The engineering work likely involves image processing, data pipelines, and full stack tooling around medical imaging hardware. Mason's vision pipeline experience (GPT-5.4 Vision in VTR) and audio signal processing (SonicGen, PianoTranscriber) demonstrate the kind of signal processing and pipeline engineering that medical imaging requires. RTP is a short drive from Raleigh.

## What you'd do day-to-day

Build software for a medical imaging device. Likely involves image processing pipelines, device control software, data management, and possibly UI for clinicians. Small team means touching everything.

## Requirement-by-requirement assessment

### Must-haves

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Software engineering capability | GREEN | 4 shipped projects, 58,700 LOC production TypeScript, 14k LOC Python by hand. |
| Pipeline/data processing | GREEN | VTR's 4-stage AI pipeline, SonicGen's signal processing, PianoTranscriber's spectrogram pipeline. |
| Small team fit | GREEN | All projects are self-directed. Ships fast, owns everything. |

### Bonus points

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Medical device / imaging experience | RED | Zero medical domain experience. |
| C/C++ or embedded | RED | No low-level or embedded experience. |
| Image processing | YELLOW | VTR uses Sharp for image preprocessing before GPT-5.4 Vision. Not traditional CV. |
| FDA/regulatory experience | RED | None. |

## Truthfulness gaps

1. **No medical device experience.** Zero healthcare/medical domain knowledge.
2. **No FDA regulatory experience.** Medical devices have strict compliance requirements.
3. **No C/C++ or embedded systems.** If the role requires low-level device programming, Mason is not qualified.
4. **No traditional computer vision.** VTR uses Vision API, not OpenCV or custom CV algorithms.

## Strategy

**Lead with:** Signal processing and pipeline engineering depth. PianoTranscriber processes spectrograms at 16 kHz / 11 ms resolution. SonicGen does spectral peak detection and constellation matching. VTR preprocesses images for vision model input. The pattern across all projects is: take raw signal data, build a reliable processing pipeline, produce structured output.

**Differentiator:** Mason builds the full stack around complex processing pipelines. At a small medical device startup, they need someone who can build the software from UI to data pipeline, not just one layer. VTR demonstrates that range: React frontend, Express backend, Postgres database, GCP deployment, and a multi-stage processing pipeline all built by one person.

**Small team advantage:** Startups that respond to applications are looking for people who can own things. Mason's track record is entirely self-directed. No hand-holding needed.
