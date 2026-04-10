# Cover Letter -- Cursor, Software Engineer, Bugbot

I have built one production AI agent system and I want to build another one. The system I built is a 4-stage pipeline inside Voices That Remain that uses GPT-5.4 with vision, structured outputs, tool calling, and cost-tiered model selection to process archival documents. The part most relevant to Bugbot is the validation architecture. I designed strict structured outputs with Zod validation and human verification gates because I learned early that AI agent outputs need precision guarantees before they touch production data. A bug detection agent has the same constraint: a false positive is worse than a missed bug, so the confidence calibration and output validation matter as much as the detection itself.

Before I started building with AI agents, I wrote 14,000 lines of Python by hand for SonicGen, an audio fingerprinting engine. I built it from scratch through all of 2025 with zero agent assistance. I did this deliberately because I wanted to understand code at a level where I could reason about correctness, not just functionality. That decision is paying off now. When I review agent-generated code, I catch structural problems and subtle bugs that someone who has only worked through agents would miss. For a team building a tool that finds bugs in code, that kind of fluency is the foundation.

I use Cursor every day as my primary editor. I have put hundreds of hours into agent-directed development through it, and I understand the product from the user side. I know what kinds of bugs agents introduce, where they tend to go wrong in large codebases, and what patterns of code are hardest for agents to reason about correctly. That experience is direct input into building a better bug detection system.

I also have experience with the reverse-engineering and system analysis mindset that code analysis requires. For Staffclaw, I mapped 92 undocumented API endpoints from an existing scheduling platform, understood the data model and business logic, and built a full stack replacement. Reading and reasoning about unfamiliar code is something I have done at scale.

Mason Galusha
masonlgalusha.careers@gmail.com | 304-546-5850
github.com/MLGalusha | voicesthatremain.com
