# Cover Letter — Anthropic, Prompt Engineer, Claude Code

I have used Claude Code as my primary development tool every day since January 2026. I have shipped two major projects with it: Staffclaw, where I reverse-engineered 92 undocumented API endpoints and built a full stack replacement in a single session, and ongoing production work on Voices That Remain, a 58,700-line TypeScript application deployed on GCP. I know where Claude Code is excellent, where it drifts, and where a better system prompt or behavioral nudge would save users 20 minutes of correction. That is not a claim I am making to sound qualified. It is a description of my Tuesday.

Before I used Claude Code, I wrote 14,000 lines of Python by hand for SonicGen, an audio fingerprinting engine. I spent all of 2025 coding without agents on purpose. When I evaluate what Claude Code produces, I am comparing it against code I would have written myself. I notice when it reaches for an abstraction that adds complexity without value, when it loses track of context in a long session, when it generates tests that validate the implementation rather than the behavior. That kind of feedback requires someone who writes code and uses the tool, not just one or the other.

The prompt engineering I have done in my own work is applied, not theoretical. For Voices That Remain, I built a 4-stage AI pipeline that processes handwritten historical documents. I designed per-document-type prompts because a single prompt cannot handle the variation between letters, envelopes, telegrams, and photographs. I implemented guillemet tagging for uncertainty, a pattern where the model marks low-confidence text so human reviewers know where to focus. That pattern came from watching the model fail on real data and iterating until the failure mode became useful information instead of silent error. The same iterative, observation-driven approach is what I would bring to improving Claude Code's prompts.

I am based in Raleigh and open to relocating to SF, NYC, or Seattle. I would like to talk about the specific Claude Code behaviors I have opinions on and what I think could be improved.

Mason Galusha
masonlgalusha.careers@gmail.com | 304-546-5850
github.com/MLGalusha | voicesthatremain.com
