Hi Zed team,

I just shipped Voices That Remain, a digital archive for historical personal letters with an AI pipeline inside it for transcription, metadata extraction, and entity resolution. I built it solo in about three weeks of focused work after quitting a cooking job in March, and it went live at voicesthatremain.com with around 15,000 lines of TypeScript and 547 commits at launch. It runs end to end on Google Cloud, uses the OpenAI Responses API with strict structured outputs for the pipeline, and has a human verification gate after transcription so nothing hallucinated reaches the public archive. Reading Nathan Sobo's "Case for Software Craftsmanship in the Era of Vibes" last year was the first time I saw someone else frame contribution the way I'd been trying to: reliable, well designed systems instead of line count.

I build primarily by directing coding agents, and they're my daily tools. I've been a heavy AI user since 2023, before most engineers had touched the tools, and I moved to agent primary workflow in early 2026 once the tools were good enough to be strictly better than hand coding. I review and own every decision, and I can write code by hand when the problem calls for it. SonicGen, the Shazam style audio fingerprinting engine I wrote for deduplication work, is about 14,000 lines of Python written entirely by hand with no agents. Alignment offset matching is the correctness insight I'm most proud of on that project. I put both kinds of work on the same GitHub profile on purpose.

What I want to work on is the AI Foundations team building DeltaDB. The premise of capturing the operational history of development is the kind of thing I'd want to use in my own workflow immediately, and the fact that Zed shipped ACP as an open protocol and already has JetBrains on board is the clearest signal I've seen that the team is building the standard, not chasing it. I'd love to talk.

Best,

Mason Galusha
masonlgalusha.careers@gmail.com
304-546-5850
github.com/MLGalusha
