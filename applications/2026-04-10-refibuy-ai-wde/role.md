# Role: Web Data Extraction Engineer

## Quick facts

| Field | Value |
|-------|-------|
| Company | ReFiBuy AI |
| Title | Web Data Extraction Engineer |
| URL | https://builtin.com/company/refibuyai |
| Location | Raleigh, NC - Glenwood South (onsite) |
| Comp | Not listed |
| Lane | ai-engineer / local-raleigh |
| Fit score | 7/10 |
| Applied | No |
| Hard filters failed | None |

## Recommendation

**Apply.** Local Raleigh startup building "SEO for AI" commerce analytics. Founded by ex-ChannelAdvisor people, which means they know e-commerce data infrastructure. The Python scraping/crawling stack maps to Mason's experience building ingestion pipelines (SonicGen's YouTube ingestion, VTR's document processing). Small team, startup energy, and the data extraction work is fundamentally about building reliable pipelines that handle messy real-world input, which is what Mason does well.

## What you'd do day-to-day

Build and maintain Python-based web scraping and crawling systems for commerce data. Extract structured product data from diverse web sources. Handle anti-scraping measures, rate limiting, and data quality. Feed extracted data into AI analytics pipelines.

## Requirement-by-requirement assessment

### Must-haves

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Python proficiency | GREEN | Tier A skill. SonicGen (14k LOC by hand), PianoTranscriber, VTR pipeline. |
| Web scraping/crawling experience | YELLOW | SonicGen has a restartable YouTube ingestion pipeline (YouTube Data API v3, yt-dlp, FFmpeg) with status-flag state machine. Not traditional web scraping but same patterns: rate limiting, error recovery, structured extraction. |
| Data extraction and parsing | GREEN | VTR's AI pipeline extracts structured metadata from unstructured handwritten documents. SonicGen extracts audio fingerprints from raw audio. |
| API integration | GREEN | VTR uses OpenAI APIs extensively. Staffclaw reverse-engineered 92 API endpoints. |
| Startup environment fit | GREEN | All projects self-directed. Ships fast (VTR 90% in 3 weeks). |

### Bonus points

| Requirement | Status | Evidence |
|-------------|--------|----------|
| AI/ML experience | GREEN | 4 shipped AI projects. Production LLM pipeline on GCP. |
| E-commerce domain knowledge | RED | No e-commerce experience. |
| Distributed systems | YELLOW | GCP Cloud Run deployment but no large-scale distributed scraping. |

## Truthfulness gaps

1. **No professional web scraping experience.** SonicGen's ingestion pipeline is the closest analog but it's YouTube API, not web scraping.
2. **No e-commerce domain knowledge.** Zero ChannelAdvisor or product data experience.
3. **No anti-bot/anti-scraping experience.** Has not dealt with CAPTCHAs, browser fingerprinting, or proxy rotation.

## Strategy

**Lead with:** SonicGen's restartable ingestion pipeline. It demonstrates the core engineering pattern: build a system that reliably extracts data from external sources, handles failures gracefully, and produces structured output. The status-flag state machine with clean resume on crash is directly applicable.

**Differentiator:** Mason builds structured extraction pipelines with AI. VTR's pipeline takes unstructured handwritten documents and produces structured metadata with validation. That skill translates directly to extracting structured product data from messy web pages, especially when AI-assisted extraction is part of the stack.

**Local advantage:** Already in Raleigh, Glenwood South is close.
