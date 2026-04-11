Mason Galusha
Raleigh, NC · masonlgalusha.careers@gmail.com · 304-546-5850

---

Relay Hiring Team
Associate Software Engineer (AI/Machine Learning)

I've built three projects that process audio, and Relay makes a voice-first communication device. That overlap is why I'm writing.

What interests me about Relay's product is the constraint. You're running ML on a device that frontline workers carry on a shift, not on a GPU cluster with unlimited compute. That forces real engineering tradeoffs: model size versus latency, accuracy versus battery life, what runs on-device versus what hits the cloud. I haven't worked on embedded ML yet, but I've worked under similar "make it work with what you have" constraints. When I trained my PianoTranscriber CNN on the MAESTRO dataset (200 hours of piano audio, roughly 100 GB preprocessed), I had to build out-of-core batching across 130 Parquet chunks because the data didn't fit in memory. I designed a sliding window architecture, 240 frames in, predict the middle 80, 88-key output, to keep inference tractable. The problem was the same shape: make a model that works within hard resource limits.

After PianoTranscriber I wrote SonicGen, a Shazam-style audio fingerprinting engine. 14,000 lines of Python, all by hand, no coding agents. STFT spectrograms, spectral peak detection, constellation hashing, alignment-offset matching. I wrote it by hand deliberately. I wanted a year of writing every line myself before I started directing coding agents, so when I switched to agent-directed development in 2026, I could actually read and debug what the agents produced. That year matters. It's the reason I can own code I didn't type.

Most recently I shipped Voices That Remain, a digital archive with a 4-stage AI pipeline inside it for transcribing handwritten letters. GPT-5.4 Vision, structured outputs, entity resolution, human verification gates. 58,700 lines of TypeScript, deployed on GCP, live at voicesthatremain.com. I built it solo using coding agents.

I don't have a CS degree. I have a UNC Chapel Hill AI bootcamp, four shipped projects, and three of them process audio. I'm in Raleigh, ready to start, and looking for a team where I can apply what I've built to a product people actually carry.

Mason Galusha
