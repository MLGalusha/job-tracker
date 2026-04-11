Hi team,

I quit my job in March 2026 and shipped a production AI pipeline in the three weeks that followed. Voices That Remain is a digital archive for 10,000 handwritten family letters, built on a 4-stage pipeline: GPT-5.4 Vision transcription, human-in-the-loop verification gates, structured metadata extraction with Zod schema validation, and entity resolution across the full collection. 58,700 lines of TypeScript, 547 commits, deployed on GCP. The pipeline makes per-document decisions about which model to route to based on document complexity, because sending everything to the expensive model is a business decision, not a technical one. That kind of cost/quality tradeoff thinking is what I'd bring to an early-stage LLM infrastructure company.

I deliberately wrote by hand through 2025. SonicGen is 14,000 lines of Python, no agents, no copilot. I built a Shazam-style audio fingerprinting engine from scratch because I wanted to understand code at the level where I could own what agents produce later. When I switched to agent-directed development in 2026, the transition was immediate because I already had the foundation. For a founding team building LLM infrastructure, that matters. The people building the tools need to understand the output better than the people using them.

I also reverse-engineered 92 undocumented API endpoints for Staffclaw in a single session and built a transparent proxy architecture on top of them. At a seed stage, the ability to move fast and figure out systems without documentation is the job.

I'm in Raleigh, 20 minutes from Durham. I want to build LLM infrastructure at the stage where every technical decision compounds.

Best,

Mason Galusha
masonlgalusha.careers@gmail.com
304-546-5850
github.com/MLGalusha
linkedin.com/in/masonlgalusha
