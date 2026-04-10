# Cover Letter Research: Tech / AI-Native Startups

Deep research pass on what actually makes a software engineering cover letter good — specifically for founding engineer / AI engineer / forward deployed engineer roles at AI-native companies (Zed, Anthropic, Cognition, Cursor, Vercel, OpenAI).

---

## 1. TL;DR — What Actually Matters (Ranked)

1. **The letter must contain at least one thing that could not plausibly have been written to any other company.** Not a name-drop. A take, a critique, a hypothesis about their product, a specific problem you'd tackle. This is the single highest-signal bit.
2. **Lead with proof of work, not a thesis statement.** Link to something you built, ideally something that touches the problem space the target company works in. ([Zed: Hired Through GitHub](https://zed.dev/blog/hired-through-github-part-1))
3. **Demonstrate you've done the reading — but go further than quoting.** For Anthropic, reference a specific paper and form an opinion on it. ([Anthropic candidate AI guidance](https://www.anthropic.com/candidate-ai-guidance); [Insider's Guide to Anthropic](https://chamberstalent.com/blog/the-insiders-guide-to-landing-a-job-at-anthropic-ai/))
4. **Founders are reading for "will this person be net-work or net-relief?"** Your letter answers: here's what I'll take off your plate. ([Howtofounder: What Founders Want](https://www.howtofounder.com/blog/what-founders-want-when-hiring))
5. **Length: 200-350 words is modal for senior tech roles.** "One minute is good, thirty seconds is better." ([HN: Ask HN Engineering hiring managers](https://news.ycombinator.com/item?id=44522262))
6. **Write like you talk.** Coffee-chat voice, not cover-letter voice. If the letter sounds like an LLM, it reads as noise — Anthropic explicitly tests for "unassisted communication skills." ([Slate: AI black hole](https://slate.com/technology/2025/10/job-search-artificial-intelligence-chatgpt-resume-cover-letter.html))
7. **A cover letter can actively hurt you.** A bad/generic one is worse than none. ([HN: Cover letters always send one](https://news.ycombinator.com/item?id=10909510))
8. **At Zed specifically, less than half of hires submitted an application.** Contributions, HN threads, and relationships are the dominant path. A cover letter is a weaker-signal substitute. ([Zed: Hiring](https://zed.dev/blog/hiring))
9. **Specifics > adjectives.** Every "passionate / driven / motivated" is a line you could delete and replace with a concrete number, link, or artifact.
10. **Close on a question or an offer, not gratitude.** "Happy to walk you through the X decision in the repo" > "Thank you for your consideration."

---

## 2. The Consensus View

Across HN threads, pragmatic engineer blogs, and hiring-manager posts, the consensus for tech cover letters is remarkably tight:

- **They mostly don't get read — unless they do.** Big company ATS pipelines discard them; recruiters rarely forward them. But at startups and founder-led companies, cover letters are read, and they are often decisive. ([HN: Cover letters always send one](https://news.ycombinator.com/item?id=10909510); [HN: Do you actually read cover letters](https://news.ycombinator.com/item?id=2264579))
- **"Tailored" is table stakes, not a differentiator.** Only ~30% of incoming letters are even obviously tailored; being tailored puts you in the top third, not the top 1%. ([HN: Cover letter techniques](https://news.ycombinator.com/item?id=1783915))
- **For entry-level and career-changers, the cover letter is a stronger positive signal than the resume** — because the resume of a junior/self-taught candidate looks like everyone else's. ([HN: Ask HN Engineering hiring managers](https://news.ycombinator.com/item?id=44522262))
- **Hiring managers want to see how you think, not what you've achieved.** The resume is for achievements. The letter is for taste and judgment.
- **Authenticity beats polish.** "Write like you speak, as if told over coffee or beer." ([HN: Ask HN Engineering hiring managers](https://news.ycombinator.com/item?id=44522262))

---

## 3. Patterns That Work

### 3a. The "Proof of Work" Opener
Open with a shipped artifact that's relevant to their problem space — linked, specific, and judgment-revealing. Nathan Sobo's own hiring writeup at Zed makes this explicit: "how someone engages with hard problems over time" is the signal. ([Zed: Hiring](https://zed.dev/blog/hiring)) Both Zed case studies (Junkui Zhang, Anthony Eid) were hired off PRs, not applications. ([Zed: Hired Through GitHub](https://zed.dev/blog/hired-through-github-part-1))

### 3b. The "Take" Opener
State an opinion about the target company's product, a decision they made, or a trade-off in their space. This is the closest thing to unfakeable signal: you cannot form a real take without having used the product and thought about it.

### 3c. The "Specific Problem I'd Tackle" Close
Instead of "I'd love to contribute," say: "The place I'd start is X, because Y. Happy to walk through my thinking." This converts the letter from a sales pitch into a mini design doc.

### 3d. Numbers Where Numbers Exist
"Cut query response time by 65% and saved $180K in server costs" beats "optimized database performance" in every test. ([Tech cover letter examples](https://enhancv.com/cover-letter-examples/tech/)) For self-taught candidates without revenue metrics: substitute scope, duration, and scale ("rebuilt over 6 months, ~12k LOC, 40 users").

### 3e. Structure That Works (Consensus Shape)
- **Paragraph 1** (~60 words): a hook — a shipped thing, a take, or a specific moment of connection with their work.
- **Paragraph 2** (~100 words): proof — 1-2 concrete projects with links, framed in language that matches the target's problem space.
- **Paragraph 3** (~80 words): the fit — what you'd take off their plate, or where you'd start.
- **Close** (~20 words): one line, confident, specific. Not "thank you for your consideration."

Total: 250-350 words. ([Welcome to the Jungle: stand-out startup cover letter](https://uk.welcometothejungle.com/blog/how-to-write-a-stand-out-cover-letter-when-applying-to-a-startup))

---

## 4. Anti-Patterns (What Kills a Letter)

**Phrases that are consensus-banned:**
- "I am writing to apply for..." ([HN thread](https://news.ycombinator.com/item?id=44522262))
- "I am passionate about..." — empty without evidence
- "I saw your job posting and am excited to apply"
- "Team player / hard worker / detail-oriented"
- "I'd love the opportunity to..."

**AI-generated tells (critical for 2026):**
LLM cover letters overuse "delve," "pivotal," "tapestry," "unwavering," "elevate," "landscape," "realm," and em-dashes in a specific rhythm. Hiring managers' BS radar is highly tuned; a 64% AI-neutral rate drops sharply when the letter reads like a generic LLM output with no personalization. ([Slate: AI black hole](https://slate.com/technology/2025/10/job-search-artificial-intelligence-chatgpt-resume-cover-letter.html); [Entrepreneur: Employers can tell](https://www.entrepreneur.com/business-news/employers-can-tell-if-you-used-chatgpt-to-write-your-resume/478444)) Anthropic explicitly asks for an unassisted first draft. ([Anthropic candidate AI guidance](https://www.anthropic.com/candidate-ai-guidance))

**Structural anti-patterns:**
- Credential-first openers ("As a self-taught engineer with 3 years of experience...") — these trigger the generic-pattern filter immediately.
- Resume regurgitation — if a paragraph could be collapsed into a bullet point on the resume, delete it.
- Over-explaining gaps or apologizing for a non-traditional path. Self-taught is a fact, not a confession.
- Gratitude-heavy closings. "Thank you for your consideration" is the equivalent of a handshake that lingers too long.
- **Name-dropping an essay without a take on it.** Quoting Nathan Sobo's craftsmanship essay to Zed is table-stakes; it's what every serious applicant does. You have to *add something* to the conversation he started. ([Name-dropping guidance](https://resumeworded.com/blog/how-to-name-drop-in-a-cover-letter/))

---

## 5. Tech-Specific Guidance (vs. Generic Career-Coach Advice)

Generic cover-letter advice optimizes for corporate HR readers. Tech hiring managers — especially founders and ICs — are different:

- **They want links, not claims.** GitHub, live demo, blog post, video walkthrough. A letter with three good links beats the same letter with zero. ([Landing.jobs: Proof of work](https://landing.jobs/blog/proof-of-work/))
- **Voice matters more than structure.** Generic templates optimize for form; tech readers optimize for judgment, which leaks through voice.
- **You're being read by people who write code.** Don't soften your language. Engineers respect precision; MBA-speak reads as fake.
- **The "why this company" bar is higher.** Generic advice says "research the company"; tech says "have a take about their technical decisions." For Zed, that might be an opinion on their tree-sitter integration, GPUI, or the agentic editing direction.
- **Senior engineers get away with terser, more opinionated letters.** Junior/self-taught candidates need slightly more context-setting — but not more adjectives.

---

## 6. AI-Native / Startup-Specific Patterns

### Founding Engineer
Founders are doing triage: will this person create work or absorb work? Signal they want: shipping speed, breadth, comfort with ambiguity, customer-facing instincts, low-ego technical debt decisions. ([Howtofounder: What Founders Want](https://www.howtofounder.com/blog/what-founders-want-when-hiring); [Pragmatic Engineer: Thriving as a founding engineer](https://newsletter.pragmaticengineer.com/p/thriving-as-a-founding-engineer))

What to put in the letter:
- A concrete story of shipping under uncertainty (you made a call, it was wrong, you fixed it)
- Evidence you've talked to users or made product-level decisions, not just implementation choices
- Comfort with scope-cutting ("I'd ship X in week 1, Y in month 1")

### Forward Deployed Engineer (Palantir/OpenAI-style)
FDEs alternate between customer-embedded and core engineering. The signal is customer translation: can you sit with a non-engineer, extract the real problem, and build the smallest thing that solves it? ([Pragmatic Engineer: Forward Deployed Engineers](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers); [Interview Query: OpenAI FDE](https://www.interviewquery.com/p/openai-palantir-forward-deployed-ai-engineers))

What to put in the letter:
- A story where you built the wrong thing first, then talked to the user and built the right thing
- Evidence of working with LLMs in production, not toy demos
- Comfort describing ambiguous business problems in plain language

### Zed / Anthropic / Cursor / Cognition specific
- **Zed**: craftsmanship, Rust, vertical integration. The most direct path is contributing to the repo. ([Zed: Hiring](https://zed.dev/blog/hiring)) A cover letter to Zed is swimming upstream against the hired-through-GitHub default; to compete, the letter must itself read as an artifact of craftsmanship.
- **Anthropic**: cite a specific paper, form a thoughtful take on AI safety from your actual past thinking (not generic "passionate about safety"). Mission alignment is screened from message one. ([Anthropic candidate guidance](https://www.anthropic.com/candidate-ai-guidance); [Chambers Talent](https://chamberstalent.com/blog/the-insiders-guide-to-landing-a-job-at-anthropic-ai/))
- **Cursor / Cognition**: agent-directed development is the core product. Show you've thought about what agent-assisted coding is actually good at, what it fails at, and where the product opportunity is.

---

## 7. The Self-Taught Angle

The biggest mistake self-taught engineers make is **framing self-taught as something to overcome.** It isn't. Zed explicitly says: "it doesn't matter whether you have a degree or taught yourself to code" — what matters is craftsmanship, communication, and shipping. ([Zed: Hiring](https://zed.dev/blog/hiring))

**What works for self-taught candidates:**
- Treat the lack of credential as a non-issue. Do not apologize or explain. The moment you explain, you flag it as a deficit.
- Lead with the most impressive shipped thing. Your best artifact is worth more than any formal credential.
- If you reference the learning journey, frame it as evidence of autonomy and drive, not as a story of catching up.
- Mention the breadth of decisions you had to make alone — choosing a stack, architecture, hosting. This is useful founder/FDE signal.

**What backfires:**
- "Despite not having a CS degree..."
- "I'm a self-taught engineer who has worked hard to..."
- Long origin stories that read as justification rather than narrative.

Reference: ([Dev.to: Self-taught first job](https://dev.to/doylecodes/applying-for-first-job-as-a-self-taught-developer-16g); [NoCSDegree case studies](https://www.nocsdegree.com/self-taught-developer-cto/))

---

## 8. The 2026 AI-Era Shift

The cover letter landscape has changed since ChatGPT made generic letters trivial to produce:

- **The floor rose, the ceiling dropped.** Every applicant can now produce a grammatically perfect, structurally sound, 300-word letter. That means the "fundamentals" no longer differentiate — they're assumed.
- **Signal has migrated to what AI can't fake**: specific takes on the target company's product, voice that doesn't match LLM cadence, links to shipped work, and genuine technical opinions. ([Slate: AI black hole](https://slate.com/technology/2025/10/job-search-artificial-intelligence-chatgpt-resume-cover-letter.html))
- **Anthropic's explicit policy**: draft unassisted, then use Claude to polish. They want "real experience" in the writing. ([Anthropic candidate AI guidance](https://www.anthropic.com/candidate-ai-guidance))
- **"Build something and send it"** is emerging as a cover-letter substitute at AI-native companies. A small demo, a PR, a thoughtful analysis of their product — these beat any letter. Zed's hiring pattern is the clearest case: community contributions dominate over traditional applications. ([Zed: Hiring](https://zed.dev/blog/hiring))
- **The cover letter isn't dead, but its job has changed.** It's no longer "prove you can write a business letter." It's "prove you have taste, judgment, and voice that an LLM couldn't have produced."

---

## 9. Example Analysis — Why Mason's Zed Letter Felt Generic

Mason's letter reportedly:
1. Led with the Letter Archive (shipped project)
2. Referenced Nathan Sobo's software craftsmanship essay
3. Used SonicGen as counter-evidence he can write code by hand (not just vibe-code)
4. Closed with the specific team

On paper, this hits every "best practice" box. So why does it feel generic?

**The diagnosis:**

- **Everyone serious applying to Zed references Sobo's craftsmanship essay.** It's the most visible thing on Zed's blog. Quoting it is what every applicant does; it's become the equivalent of "I am writing to apply for." The essay-reference is table stakes, not signal. To use it well, you have to *disagree with a small part of it*, *extend it*, or *apply it to a specific decision in Zed's own codebase*. Referencing it without adding something puts you in the ~30% tailored bucket, not the top 1%.
- **Proof-of-work framing only works if the project maps to the target's problem space.** The Letter Archive and SonicGen are impressive shipped things, but they're not Zed-adjacent. A cover letter that opens "here's a thing I built" has to close the loop: "...and here's why it maps to the problem you're solving." Without that bridge, the letter reads as generic "here are my projects" + generic "here's my take on craftsmanship."
- **The "counter-evidence I can write by hand" framing is defensive.** It's answering an objection Zed hasn't raised. Defensive framing signals anxiety and implies the applicant thinks of themselves as a vibe-coder who needs to prove otherwise. The stronger move is to never raise the objection.
- **"Closing on the specific team you want to join"** is good, but only if it comes with a reason they should want you on *that* team specifically. Otherwise it reads as "I looked at the team page," which every serious applicant does.
- **The letter doesn't contain a take.** This is the biggest issue. A letter to Zed needs an opinion on Zed — the product, a specific feature, a design decision, the agentic direction, something. Without it, the whole letter is well-structured applicant-speak that any smart self-taught engineer could have sent. The structure is right; the thinking isn't visible on the page.

**The fix, in one sentence:** replace the Sobo essay reference with a specific observation about something in Zed's repo or product that you have an opinion about — something that proves you've used it seriously and thought about it technically — and let that carry the "I share your craftsmanship values" signal implicitly instead of stating it.

### Brief annotated patterns from real letters that worked

The successful senior-level example cited in research opened with: "I rebuilt a core ingestion layer, moved from monolith to event-driven microservices, cut latency by 60%, and am now looking for a team tackling problems at the next order of magnitude." ([Enhancv: Tech cover letters](https://enhancv.com/cover-letter-examples/tech/)) Three things to notice: (1) no preamble, (2) one concrete number, (3) a forward-looking hook that frames the *reader's* company as the logical next step. The letter earns the right to exist by paragraph 1.

---

## 10. Actionable Rules — Voice Contract Addendum

For Mason's voice-anchored system, concrete rules that fit alongside resume-base and cover-letter-base:

1. **The One-Take Rule.** Every cover letter must contain one specific, opinionated observation about the target company's product, codebase, or public writing. Not a quote — a take. If you can't form one, you don't know the company well enough to apply yet.
2. **No apologies, no justifications.** Never explain the self-taught path, never pre-empt objections, never "despite." Your work is the argument.
3. **Delete every adjective on a first pass, then add back only what survives.** "Passionate," "driven," "motivated," "excited," "hard-working" — cut. If a number or artifact can replace the adjective, use it.
4. **Every paragraph must contain a noun unique to this company.** A feature name, a team name, a technical decision, a specific essay + your disagreement. No noun = generic paragraph = cut.
5. **Max 350 words. 250 is better.** If the letter needs more space, the letter is doing the resume's job.
6. **No gratitude closings.** End with an offer or a question. "Happy to walk through my thinking on X" beats any thank-you.
7. **Voice test**: read it aloud. If you would not say that sentence to a friend at a coffee shop, rewrite it.
8. **LLM vocabulary filter.** Grep-ban: delve, pivotal, tapestry, unwavering, landscape, realm, elevate, seamless, robust, leverage (as a verb), ecosystem, navigate (metaphorical), journey (metaphorical).
9. **Proof-of-work bridge requirement.** If you open with a project, paragraph 2 must explicitly connect it to the target company's problem space. Don't make the reader do the work.
10. **The "would every other serious applicant send this" test.** For every sentence, ask: could this sentence appear verbatim in the letter another self-taught engineer sends to Zed this week? If yes, cut or rewrite.

---

## 11. Open Questions / Contradictions

- **Do senior engineers send cover letters at all?** Dan Luu and Julia Evans imply great engineers rarely hit the open market, and when they do, it's via relationships. ([Dan Luu: Programmer Moneyball](https://danluu.com/programmer-moneyball/); [Julia Evans: Hiring & Opportunity](https://jvns.ca/blog/2017/02/16/hiring---opportunity/)) For Mason — mid-career self-taught, applying cold — the cover letter still matters, but it's swimming against a current that assumes the best candidates don't need one.
- **HN hiring managers split on whether cover letters are read at all.** One camp says "I never read them"; the other says "a great one can guarantee a phone call." This is likely explained by company size — above ~500 employees, cover letters die in ATS; below that, a founder or hiring manager reads everything. ([HN: Cover letters always send one](https://news.ycombinator.com/item?id=10909510))
- **AI usage: polish allowed or banned?** Anthropic says draft-unassisted-then-polish is fine. Some hiring managers treat any LLM tell as a red flag. The safe read: use Claude as an editor on your own draft, never as a generator, and prune LLM vocabulary aggressively. ([Anthropic candidate AI guidance](https://www.anthropic.com/candidate-ai-guidance))
- **"Proof of work instead of cover letter" — how hard to lean on this?** At Zed specifically, the data suggests very hard: less than half of hires submitted applications. ([Zed: Hiring](https://zed.dev/blog/hiring)) For Mason, the highest-ROI move may be to treat the cover letter as a bridge to a PR, demo, or piece of writing — and spend the majority of effort on the artifact, not the letter.

---

## Sources

- [Zed: Hiring at Zed](https://zed.dev/blog/hiring)
- [Zed: Hired Through GitHub Part 1](https://zed.dev/blog/hired-through-github-part-1)
- [Zed: The Case for Software Craftsmanship in the Era of Vibes](https://zed.dev/blog/software-craftsmanship-in-the-era-of-vibes)
- [Anthropic: Candidate AI Guidance](https://www.anthropic.com/candidate-ai-guidance)
- [Chambers Talent: Insider's Guide to Landing a Job at Anthropic](https://chamberstalent.com/blog/the-insiders-guide-to-landing-a-job-at-anthropic-ai/)
- [Pragmatic Engineer: Thriving as a Founding Engineer](https://newsletter.pragmaticengineer.com/p/thriving-as-a-founding-engineer)
- [Pragmatic Engineer: Forward Deployed Engineers](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers)
- [Interview Query: OpenAI Palantir Forward Deployed Engineers](https://www.interviewquery.com/p/openai-palantir-forward-deployed-ai-engineers)
- [Howtofounder: What Founders Actually Want When Hiring](https://www.howtofounder.com/blog/what-founders-want-when-hiring)
- [HN: Ask HN Engineering hiring managers, good cover letter](https://news.ycombinator.com/item?id=44522262)
- [HN: Cover Letters Always Send One](https://news.ycombinator.com/item?id=10909510)
- [HN: Do you actually read cover letters](https://news.ycombinator.com/item?id=2264579)
- [HN: Cover letter techniques for software development](https://news.ycombinator.com/item?id=1783915)
- [Slate: The AI Black Hole Swallowing Job Seekers](https://slate.com/technology/2025/10/job-search-artificial-intelligence-chatgpt-resume-cover-letter.html)
- [Entrepreneur: Employers Can Tell If You Used ChatGPT](https://www.entrepreneur.com/business-news/employers-can-tell-if-you-used-chatgpt-to-write-your-resume/478444)
- [Dan Luu: Programmer Moneyball](https://danluu.com/programmer-moneyball/)
- [Julia Evans: Hiring and Opportunity](https://jvns.ca/blog/2017/02/16/hiring---opportunity/)
- [Landing.jobs: Proof of Work Resume](https://landing.jobs/blog/proof-of-work/)
- [Welcome to the Jungle: Stand-out startup cover letter](https://uk.welcometothejungle.com/blog/how-to-write-a-stand-out-cover-letter-when-applying-to-a-startup)
- [Enhancv: Tech Cover Letter Examples](https://enhancv.com/cover-letter-examples/tech/)
- [Dev.to: First Job Self-Taught Developer](https://dev.to/doylecodes/applying-for-first-job-as-a-self-taught-developer-16g)
- [NoCSDegree: Self-Taught to CTO](https://www.nocsdegree.com/self-taught-developer-cto/)
- [ResumeWorded: Name Dropping in Cover Letters](https://resumeworded.com/blog/how-to-name-drop-in-a-cover-letter/)
