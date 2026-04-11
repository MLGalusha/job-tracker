# Cover Letter — Anthropic, Applied AI Engineer (Startups)

I build software by directing Claude Code. It is not a supplement to my workflow; it is the workflow. I switched to agent-directed development in January 2026 after spending all of 2025 writing code by hand, 14,000 lines of Python for SonicGen with zero agent assistance. The transition was easy because I already understood what was being generated. That sequence, building fluency first and then leveraging agents, is exactly the advice I would give to any startup trying to build with Claude. Start by understanding the code, then let the agent accelerate you.

My largest project, Voices That Remain, is a digital archive with a 4-stage AI pipeline using structured outputs, tool calling, and vision. It is 58,700 lines of TypeScript across 547 commits, deployed on GCP and live at voicesthatremain.com. I designed human-in-the-loop verification gates into every stage because I learned that the hardest part of shipping an AI product is not getting the model to produce good outputs. It is building the system around the model that keeps bad outputs from reaching users. Cost-tiered model selection routes between GPT-5.4 and GPT-5.4-mini based on document complexity because startups care about inference costs. I shipped 90% of the production pipeline in a 3-week sprint working solo. That is the pace startups need.

Startups building with Claude face a specific set of problems: choosing between structured outputs and free-form generation, designing prompts that are robust across edge cases, deciding where to put human checkpoints, and figuring out how to test AI behavior without a deterministic ground truth. I have solved each of these in my own projects. For Staffclaw, I reverse-engineered 92 undocumented API endpoints from an existing platform and built a full stack replacement. Startups integrating Claude into existing systems will face the same kind of problem: understanding what is already there and building on top of it without breaking it.

I am based in Raleigh and open to relocating to SF or NYC. I would like to talk about how my experience building AI products from scratch maps to helping startups do the same with Claude.

Mason Galusha
masonlgalusha.careers@gmail.com | 304-546-5850
github.com/MLGalusha | voicesthatremain.com
