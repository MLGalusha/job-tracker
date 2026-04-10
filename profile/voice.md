# Voice

**The secret weapon.** Every resume and cover letter reads this file before drafting. The goal is not "clean writing" — the goal is writing that *sounds like Mason*, so hiring managers get a consistent signal from him across LinkedIn, his site, his cover letter, and an interview.

Voice rules below are derived from three samples Mason wrote himself: his VTR LinkedIn experience section, his first-ever social post (about reverse-engineering an undocumented API), and his VTR launch post. Those samples are canonical — when in doubt, re-read them and match their rhythm.

## Core rules

1. **First person, declarative.** "I built", "I reverse-engineered", "I designed". Not "helped with", "was involved in", "had experience with".
2. **Concrete numbers over adjectives.** "10,000 letters," "92 API endpoints," "200GB of audio data," "547 commits," "6 months," "three weeks." Never "many," "some," "extensive."
3. **No hedging words, no cheesy credential words.** Outright banned in any context: *passionate, rockstar, synergy, extensive experience, some exposure to, familiar with (when he actually shipped it), helped build (when he built it), strong fundamentals, self-starter, results-oriented, capstone (use "final project" or just describe the thing)*.

   **Banned only in cheesy credential-padding contexts** (fine in normal prose): some words aren't bad on their own but become cheesy when they're padding a credential to sound more impressive. Watch for:
   - *intensive* — never in *"6-month intensive bootcamp"* or *"intensive program"*. Just state the dates and let them speak. Fine in normal prose like *"intensive training on the MAESTRO dataset"* if it's actually describing something intensive.
   - *rigorous, immersive, comprehensive, hands-on, cutting-edge, state-of-the-art* — same pattern. If the word is decorating a credential (bootcamp, course, program, certification), cut it. If it's doing real descriptive work in a sentence about the thing itself, it can stay.
   - Rule of thumb: if the sentence still conveys the fact without the adjective, the adjective was padding. *"6-month intensive AI bootcamp"* works just as well as *"AI bootcamp, May–December 2024"* — and the second one sounds like Mason wrote it.
4. **Confident about coding agents.** Mason works primarily through Claude Code and Codex, and this is the differentiator, not the caveat. Never apologize for it, never hedge it, never bury it. Phrases he already uses: *"I built this completely solo using coding agents as my main tools."* *"I design the architecture, make the technical decisions, and use AI coding tools to accelerate implementation."* Those are both usable verbatim.
5. **Story-driven, not credential-driven.** His writing opens with a problem or a scene, not with a title. Example from his first post: *"I work at a movie theater. Our scheduling app is tedious."* Leads into the technical content. Cover letters should do the same.
6. **Specific verbs.** *Reverse-engineered, mapped, transcribed, pulled out, scraped, fingerprinted, trained, shipped, deployed.* Not *worked with, used, leveraged, utilized.*
7. **Thesis statements land the point.** Mason likes to end sections with a meta-observation that explains why what he just built matters. From his first post: *"A year ago, mapping an undocumented API meant days in browser dev tools reading minified JavaScript. An AI agent did it in one session. The barrier to building on top of any software you use is effectively gone."* Cover letters should do this at least once when the role invites it.
8. **Mixed rhythm: short punchy lines + longer narrative sentences.** Not all short. Not all long. Read the samples aloud to catch the rhythm.
9. **No self-deprecation in writing.** Mason sometimes self-deprecates in conversation about his coding ability. He does NOT do this in his own writing, and drafts must not introduce it. The writing is confident.
10. **Explain the "why I built this"** when relevant. Mason builds things that solve problems he personally has. That motivation is compelling — don't erase it by abstracting.
11. **Never frame Mason as someone who builds LLMs, model serving, or inference infrastructure.** He builds *products and features that use LLMs*. He calls the OpenAI API; he does not train or serve models, run inference clusters, or build chatbot platforms. Banned phrasings: *"building production LLM systems," "building LLMs," "LLM infrastructure," "model serving," "inference systems," "building AI systems"* (when "AI systems" reads as the model itself rather than the product). Use instead: *"shipping production AI features," "building products powered by LLMs," "production AI pipelines," "AI features in real products," "integrating LLMs into real software."* This applies to **every** drafted artifact — resume summaries, cover letters, LinkedIn copy. If a skill catches itself writing one of the banned phrasings, stop and rewrite.

12. **In prose (summary, cover letter, narrative bullets), say "coding agents" — don't list brand names parenthetically.** Write *"I build primarily by directing coding agents as my daily tools,"* not *"directing coding agents (Claude Code, Codex)."* The brand-name list belongs in the **Skills section** of the resume, where it's a tool entry, not in prose. Reason: in narrative writing, "(Claude Code, Codex)" reads as a name-drop and dilutes the framing. The Skills section is the right place for tool inventories. Applies to: resume summary, project bullets, cover letter body, LinkedIn experience copy. Exception: a Skills section line like *"Agent-directed development: Claude Code, Codex — primary daily tools"* is correct and stays.

13. **Resume summaries are about Mason, not about his projects.** A summary answers three questions a recruiter has in the first 5 seconds: (1) what kind of engineer is this, (2) what is he best at, (3) what does he want next. Projects belong in the Projects section. The summary may *name* a project as a credibility marker — one parenthetical, e.g. "(shipped voicesthatremain.com solo)" — but it must NEVER *describe* the project. Banned summary shapes: any sentence that reads like a project bullet ("I just shipped X — a Y for Z, with A, B, and C") pulled into the summary. The right shape is **(1) category + headline capability → (2) what he's best at as capabilities, not projects → (3) how he builds + one named project as proof → (4) what he wants next**. Four sentences max. If a draft summary spends more than ~10 words describing any single project, rewrite it.

14. **No em-dashes in prose, and no stacked hyphen compound adjectives either.** Mason does not use em-dashes in his natural writing, and he almost never uses hyphenated compound adjectives like *cost-vs-quality, human-in-the-loop, multi-stage, per-document-type, full-stack, end-to-end, real-time, agent-directed, Shazam-style, context-aware, zero-downtime*. Both are strong AI tells. In paragraphs and sentences:
    - **Em-dashes:** replace with periods (split into shorter sentences), commas, or colons. The only acceptable em-dashes are in **headers and date ranges** (`### Project Name — 2026`, `May–December 2024`).
    - **Hyphen compounds:** drop the hyphens. Write *full stack* not *full-stack*, *end to end* not *end-to-end*, *multi stage* not *multi-stage*, *real time* not *real-time*, *human verification gate* not *human-in-the-loop verification gate*, *agent directed* not *agent-directed*, *cost and quality tradeoffs* not *cost-vs-quality model selection*. When a phrase sounds stilted without hyphens, that's a signal to rewrite the sentence entirely, not to add the hyphens back. Mason's canonical social post writes *"TypeScript end to end"* and *"built this completely solo using coding agents as my main tools"*. Match that rhythm.
    - **Exceptions** (the only acceptable hyphens in prose): *reverse-engineered* (Mason uses this in his own social post), standard English compounds like *re-encoding*, *non-trivial*, library and identifier names (`yt-dlp`, `GPT-5.4-mini`, `React-Router`), measurement units attached by hyphen (`240-frame input`, `2-week sprint`, `6-month intensive`), and headers/date ranges.
    - **Arrows (`→`) for pipeline steps:** also banned. Mason doesn't write *"audio → spectrogram → CNN → MIDI"* or *"pending → downloaded → fingerprinted → deduped"*. That's diagram shorthand and it reads as AI/markdown-chart filler in prose. Describe the sequence in words instead: *"audio goes through spectrogram preprocessing, then the CNN, then MIDI, then sheet music"*, or *"each video moves through status flags `pending`, `downloaded`, `fingerprinted`, and `deduped`"*. Arrows are fine inside actual diagrams and ASCII art, not inside sentences.
    - **Tildes for approximation:** also banned. Mason doesn't write *~200 hours* or *~15,600 LOC*. Use *about*, *around*, or *roughly* instead: *"around 15,000 lines"*, *"about 200 hours"*, *"roughly 100 GB preprocessed"*. Tildes are a programmer shorthand that read as AI/tech shorthand in prose. The only place a tilde is acceptable is inside a code block, a file path, or a shell command.
    - **Round the precision to match the approximator.** If a number is prefaced with *about*, *around*, or *roughly*, round it to the nearest thousand (or ten thousand for bigger numbers). Write *"around 15,000 lines"*, not *"around 15,637 lines"*. Write *"about 30,000 lines"*, not *"about 30,712 lines"*. *"About 15,637"* is a contradiction: if you know it to the last digit, drop the *about*; if you're approximating, round. Exact numbers (commit counts, endpoint counts, dataset sizes you can cite to a source) stay exact and drop the approximator.
    - If a draft contains a single em-dash, stacked hyphen compound, approximation tilde, or pipeline arrow in a sentence, the voice audit has failed. This applies to **every** drafted artifact: resume summaries, project bullets, cover letter body, LinkedIn copy, social posts.

15. **Banned LLM vocabulary.** These words are hard-rejected in any drafted artifact (resume, cover letter, outreach email, LinkedIn, blog post). If a draft contains any of them, the voice audit has failed and the skill must rewrite. Words: *leveraged, leverage (as verb), spearheaded, results-driven, results-oriented, proven track record, delve, dive deep, deep dive, robust, seamless, cutting-edge, state-of-the-art, tech-savvy, adept, synergy, pivotal, tapestry, landscape (metaphorical), navigate (metaphorical), ecosystem (when not literal), empower, unlock, foster, drive (as verb meaning cause), streamline, game-changing, best-in-class, world-class, next-generation, revolutionary, transformative, innovative (unless concretely justified), disrupt, passionate, enthusiastic, excited to, thrilled to, eager to, love to, huge fan, reaching out because.* Reason: every one of these is either an LLM tell, a credential-padding filler, or a phrase that collapsed into cliché. Mason's canonical samples contain zero of them. When in doubt, say the sentence out loud — if it sounds like a LinkedIn post, it's wrong.

16. **The One-Take Rule.** Any piece of writing addressed to a specific company (cover letter, outreach email, application-artifact blog post) must contain at least one opinionated observation about that company that could not have been written about any other company. A generic compliment ("I love your mission," "your team is amazing") does not count. A factual reference without an opinion ("I saw you raised a Series B") does not count. A reference to a public essay everyone else also references ("I read your Sobo essay") is table stakes, not signal. The observation must be: (a) specific to a decision, product detail, engineering choice, or public position this company has taken, and (b) carry Mason's actual opinion on it — agreement, disagreement, a question it raised, a trade-off he'd weigh differently. If the skill can't produce a One-Take line grounded in something real, it should refuse to write the file and tell Mason what's missing. Reason: in 2026, specific opinion is the only thing a generator can't fake. Everything else is cheap.

17. **Imperfection over polish.** Prefer one slightly rough sentence that sounds like Mason over five polished sentences that sound like an LLM. Too-clean prose is the new red flag — reviewers are actively suspicious of it. If a draft reads as uniformly smooth, loosen it: vary sentence length more aggressively, start a sentence with a conjunction, let a fragment stand, keep a mid-sentence shift in register. Mason's canonical samples are not grammatically perfect and that's the point. Do not sand voice down into LLM-smooth.

18. **Don't AI-wash Mason's projects.** Just because a product uses AI features does NOT make the product itself "an AI X." Voices That Remain is a **digital archive** for historical personal letters that has an AI pipeline *inside it* for transcription and metadata extraction. It is NOT "an AI archive," "an AI-native archive," or "an AI-powered archive." The archive is the product; AI is one feature subsystem. Same rule for any future project: describe what the product *is*, then describe what AI does *inside it*. Banned framings: *"AI archive," "AI-powered [product]," "AI-native [product]"* when the product would exist as a normal product even if AI weren't in it. Mason's strongest, most defensible framing is: *the product, then "with an AI pipeline inside it for X, Y, Z."* The AI emphasis should land on **how Mason built it** (agent-directed development with Claude Code and Codex), not on **what the product is**.

## Formality dial

Default target: **4-5 out of 10** (1 = "hey what's up", 10 = "Dear Sir/Madam").

- **AI-native startups / founding engineer / YC companies:** 4
- **Anthropic / OpenAI FDE:** 5
- **Local or larger companies:** 5-6
- **Never above 6.** If a role demands above-6 formality, that's a signal it's the wrong lane.

## Canonical samples (reference these directly when drafting)

### 1. VTR LinkedIn experience section

> Voices That Remain is a digital archive for historical personal letters. It launched in March 2026 and is built to hold a private collection that currently sits around 10,000 letters and keeps growing as more are tracked down. These stories shouldn't just disappear. The site is meant to put them somewhere people can actually read them, dig through them, and get a real sense of the past from the people who lived it. Beyond that, the hope is for the archive to start funding itself through community donations and grants.
>
> I've been building this solo with coding agents and still in active development. The system spans the public reading and exploration experience, the admin tools, the database, the AI pipeline, and the Google Cloud setup it runs on. The pipeline handles the slow parts of working with letters: transcribing the images, identifying people and places, and writing summaries and short descriptions for letters, collections, and the people who show up across them. A human confirms every step before it goes public.
>
> The stack is TypeScript end to end, on React, Express, Postgres, and Drizzle, deployed to Cloud Run with Cloud SQL and a Cloud Build pipeline.

### 2. First social post (reverse-engineered API thesis)

> There's no such thing as an undocumented API anymore. Any website you use, an AI agent can map its entire API in one session.
>
> I work at a movie theater. Our scheduling app is tedious. There's no easy way to see who you're working with, no guest count data, and the schedule is posted so late that you sometimes don't know if you're working tomorrow.
>
> I wanted something simple, an automated summary before every shift telling me what I'm walking into. So I had my OpenClaw agent build a script to scrape the data. Then I wondered if I could just pull the data directly without ever opening the web app. I told it to find the schedule API. It did, and I could pull my schedule data instantly.
>
> That got me thinking. If I can grab that API, what if I find every API the website uses and build my own dashboard? I told OpenClaw to explore the entire site and collect all API endpoints. It mapped all 92 in one session, including manager only routes I don't even have access to. It worked perfectly on the first try.
>
> [...]
>
> A year ago, mapping an undocumented API meant days in browser dev tools reading minified JavaScript. An AI agent did it in one session. The barrier to building on top of any software you use is effectively gone.

### 3. VTR launch post

> Launching something I've been building since January: voicesthatremain.com
>
> Voices That Remain is a digital archive for historical personal letters. Love letters, wartime telegrams, notes between family members across generations. The kind of firsthand writing that rarely survives. The site is built to put that material somewhere people can actually read and explore it.
>
> In total there are around 10,000+ letters spread across many collections of wildly different sizes, and scanning is an ongoing process. Each letter has to be photographed, uploaded, run through transcription, and verified before it's published. Since we just launched, the visible archive is small and it'll grow steadily from here as more letters get added. The site has a full AI pipeline built in for transcribing the images, pulling out people and places, and writing summaries for letters and collections, with a human confirming every step before anything goes public.
>
> I built this completely solo using coding agents as my main tools, I have the site hosted end to end on Google Cloud.
>
> It's in a solid place but I'm still shipping improvements regularly. If you run into any bugs or see something that could be better, let me know. I'd love to hear the feedback.

### 4. Old LinkedIn bio (still a strong personal tagline — reuse the opener)

> I build systems to solve problems I actually experience.
>
> I work at a movie theater and the scheduling software is inefficient, so I reverse-engineered the API and began building a replacement. A collector needed thousands of historical letters digitized and searchable, so I designed an AI pipeline that transcribes handwriting and maps relationships between people across the entire collection. I wanted to trace audio clips back to their original source, so I wrote a fingerprinting engine from scratch.
>
> I design the architecture, make the technical decisions, and use AI coding tools to accelerate implementation.

**Note:** the "movie theater" part of this bio is now out of date — Mason quit in March 2026. Do not repeat the "I work at a movie theater" framing in new cover letters. The *opener* ("I build systems to solve problems I actually experience") is still good and reusable.
