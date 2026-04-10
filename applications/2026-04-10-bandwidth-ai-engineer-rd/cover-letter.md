Hi Bandwidth R&D team,

Three of the four major projects I've shipped process audio or voice data. I trained a CNN on 100GB of piano recordings to generate sheet music. I wrote an audio fingerprinting engine from scratch, 14,000 lines of Python, no agents. And I built a digital archive for 10,000 historical letters where the core pipeline transcribes handwritten images using GPT-5.4 Vision, extracts structured metadata, resolves entities across collections, and requires human verification before anything goes public. When I read that Bandwidth's CEO thesis is that the next billion PSTN users are AI voice agents, it connected to work I've already been doing. I want to build on that thesis, not just read about it.

Voices That Remain is the project that maps most directly to what your R&D team builds. It's a 4 stage AI pipeline: vision transcription, a human verification gate, structured output metadata extraction with Zod schemas, and entity resolution across the full collection. 58,700 lines of code, 547 commits, 20 database tables, 46 end to end tests, deployed on GCP with Cloud Run, Cloud SQL, and a Cloud Build pipeline. I shipped 90% of it in three weeks of focused work, solo. The pipeline makes real decisions about cost and quality tradeoffs per document type, routing between models based on what actually needs the expensive one. That kind of prototype to production loop is what I understand your team does daily.

One thing that caught my attention: Bandwidth shipped an MCP server so AI agents can call your APIs with natural language. Most CPaaS companies would build a chatbot demo and call it an AI strategy. Bandwidth built the infrastructure layer that lets any agent framework interact with the platform. That's the right abstraction. It means your R&D team is thinking about where the agentic ecosystem is actually going, not just where it is today. I code by directing agents as my primary workflow. I deliberately wrote by hand through 2025 so I'd understand the code before I let agents produce it. That foundation is why the transition worked. For a team evaluating and building agentic systems, I bring both the methodology and the judgment to back it up.

I'm already in Raleigh and ready to start immediately. I'd like to talk about what the R&D team is prototyping next.

Best,

Mason Galusha
masonlgalusha.careers@gmail.com
304-546-5850
github.com/MLGalusha
linkedin.com/in/masonlgalusha
