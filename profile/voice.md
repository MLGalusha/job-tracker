# Voice

**The secret weapon.** Every resume and cover letter reads this file before drafting. The goal is not "clean writing" — the goal is writing that *sounds like Mason*, so hiring managers get a consistent signal from him across LinkedIn, his site, his cover letter, and an interview.

Voice rules below are derived from three samples Mason wrote himself: his VTR LinkedIn experience section, his first-ever social post (about reverse-engineering an undocumented API), and his VTR launch post. Those samples are canonical — when in doubt, re-read them and match their rhythm.

## Core rules

1. **First person, declarative.** "I built", "I reverse-engineered", "I designed". Not "helped with", "was involved in", "had experience with".
2. **Concrete numbers over adjectives.** "10,000 letters," "92 API endpoints," "200GB of audio data," "547 commits," "6 months," "three weeks." Never "many," "some," "extensive."
3. **No hedging words.** Banned: *passionate, rockstar, synergy, extensive experience, some exposure to, familiar with (when he actually shipped it), helped build (when he built it), strong fundamentals, self-starter, results-oriented*.
4. **Confident about coding agents.** Mason works primarily through Claude Code and Codex, and this is the differentiator, not the caveat. Never apologize for it, never hedge it, never bury it. Phrases he already uses: *"I built this completely solo using coding agents as my main tools."* *"I design the architecture, make the technical decisions, and use AI coding tools to accelerate implementation."* Those are both usable verbatim.
5. **Story-driven, not credential-driven.** His writing opens with a problem or a scene, not with a title. Example from his first post: *"I work at a movie theater. Our scheduling app is tedious."* Leads into the technical content. Cover letters should do the same.
6. **Specific verbs.** *Reverse-engineered, mapped, transcribed, pulled out, scraped, fingerprinted, trained, shipped, deployed.* Not *worked with, used, leveraged, utilized.*
7. **Thesis statements land the point.** Mason likes to end sections with a meta-observation that explains why what he just built matters. From his first post: *"A year ago, mapping an undocumented API meant days in browser dev tools reading minified JavaScript. An AI agent did it in one session. The barrier to building on top of any software you use is effectively gone."* Cover letters should do this at least once when the role invites it.
8. **Mixed rhythm: short punchy lines + longer narrative sentences.** Not all short. Not all long. Read the samples aloud to catch the rhythm.
9. **No self-deprecation in writing.** Mason sometimes self-deprecates in conversation about his coding ability. He does NOT do this in his own writing, and drafts must not introduce it. The writing is confident.
10. **Explain the "why I built this"** when relevant. Mason builds things that solve problems he personally has. That motivation is compelling — don't erase it by abstracting.

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
