# Company Research Methods: How Strong Candidates Actually Do It

Meta-research on the *process* of researching a company before applying or interviewing — with the goal of producing an opinionated take, not a fact sheet. Intended as the spec for rebuilding an agent-driven `company-research` skill.

---

## 1. The Fact-vs-Opinion Gap

Almost every published guide to "researching a company before an interview" produces the same checklist: visit the website, check the careers page, skim Glassdoor, look up funding on Crunchbase, note the tech stack on BuiltWith. This is what the mainstream guides recommend ([Ohio State ECS](https://www.ecs.osu.edu/news/2025/02/how-research-company-interview), [Dexian](https://dexian.com/blog/ways-to-effectively-research-a-potential-employer-before-your-interview/), [Career Sidekick](https://careersidekick.com/research-company-before-job-interview/), [The Muse](https://www.themuse.com/advice/the-ultimate-guide-to-researching-a-company-preinterview)). None of these produce differentiation. Every applicant in the pile has the same facts.

Hiring managers consistently say the opposite thing: they want to see that you *understand* the company, not that you *know about* it. Muse's panel of 10 hiring managers said the standout cover letters are ones where the candidate is already "a passionate user of the company's products" and "wasn't afraid to offer feedback in a positive way" ([The Muse — 10 Hiring Managers](https://www.themuse.com/advice/10-ways-you-can-use-your-cover-letter-to-stand-out-according-to-10-hiring-managers)). The working definition of an opinionated take: a specific, defensible claim about a decision the company made, grounded in something you actually touched (product, source, docs, writing), which the average applicant could not produce without doing the work.

Jason Cohen (WP Engine) frames hiring around "results-oriented" people who operate with founder-mindset ([SaaStr](https://www.saastr.com/from-burnout-to-100m-arr-wpengine/)) — and the way you prove that before the interview is by already behaving like an owner of the problem. Anthropic says explicitly they value "direct evidence of ability" over credentials: interesting projects, blog posts, open-source contributions ([Sundeep Teki](https://www.sundeepteki.org/advice/how-to-get-hired-at-openai-anthropic-and-google-deepmind-in-2026)). "Direct evidence" is the same idea from the hiring side — show you did something real, don't describe it.

Fly.io's entire hiring pipeline is built around this premise: they are resume-blind and interview-blind, and hire on work-sample submissions graded against a rubric ([Fly.io hiring docs](https://fly.io/docs/hiring/hiring/), [HN discussion](https://news.ycombinator.com/item?id=39291022)). Their written philosophy: the challenges are stripped-down versions of real work they do, and they are "ruthless about doing customer-visible work" — so the candidate signal they want is the same signal they optimize their own team around. If you can't explain why a particular Fly.io blog post's decision was right or wrong, you haven't done the research they'd respect.

## 2. Primary Source Ladder (ranked by signal)

Ordered from highest-signal (an opinion is easy to form) to lowest (facts only).

1. **Actually using the product.** Install it, sign up, push it into a real workflow for ~60 minutes. Notice what's broken, what's clever, what's obviously a compromise. This is the single highest-signal source and almost no one does it. Muse's example: a candidate writing "I've personally used X and it's the most innovative tech I've used in years" gets traction *because* most applicants haven't bothered ([The Muse](https://www.themuse.com/advice/10-ways-you-can-use-your-cover-letter-to-stand-out-according-to-10-hiring-managers)). Time: 45–90 minutes.
2. **Reading the source / open repos.** Check their GitHub org for libraries they own, issue trackers for what they're struggling with, PR descriptions for how they think. For senior roles and open-source-heavy teams, interviewers read *your* code for architecture trade-offs — so reading *theirs* mirrors the exact lens you want to demonstrate ([HN: Ask HN — GitHub applicants](https://news.ycombinator.com/item?id=16224401)). Time: 30–90 minutes.
3. **Engineering blog — critically.** Don't quote it; form a take on it. The Tech Interview Handbook's explicit advice is to skim the blog to "echo their vocabulary" ([Tech Interview Handbook](https://www.techinterviewhandbook.org/)) — but that's the shallow version. The deep version is finding the one post where they describe a trade-off and asking whether you agree. Time: 30–60 minutes.
4. **Founder/principal-engineer writing outside the company blog.** Personal Substacks, conference talks, podcast appearances. This is where the unguarded opinions live. Jason Cohen's SaaStr talks, Patrick McKenzie's Kalzumeus essays, Thomas Ptacek's sockpuppet.org — the stuff the company press team didn't review ([Kalzumeus About](https://www.kalzumeus.com/about/), [sockpuppet.org](https://sockpuppet.org/me/)). Time: 30–60 minutes.
5. **Podcast appearances and conference talks.** Founders are more candid in audio than in writing. Patrick McKenzie's Business of Software talk on hiring ([Business of Software](https://businessofsoftware.org/talks/hiring-at-scale-patrick-mckenzie/)) surfaces things he'd never put on a company blog. Time: 30 minutes at 1.5x while doing something else.
6. **Press and funding news.** TechCrunch, Crunchbase, Pitchbook. Table-stakes context. Skim, don't dwell.
7. **Glassdoor, Blind, Levels.fyi.** Useful for comp calibration and red flags (sudden swarms of 5-stars, HR-reply patterns), not for forming an opinion about the product ([Dexian](https://dexian.com/blog/ways-to-effectively-research-a-potential-employer-before-your-interview/)). Time: 10 minutes.
8. **Aggregators and career listicles.** Almost zero signal. Skip.

The sharp observation: the order inverts what most candidates actually do. Most people start at 6 and 7 and never reach 1. The best candidates start at 1 and only reach 6 if they have time left over.

## 3. Technical Research Methods for Tech Companies

**Reading GitHub repos efficiently.** John Resig's case for project-based interviews is that public code is mostly noise until you know what to look at ([John Resig — Project-Based Interviews](https://johnresig.com/blog/project-based-interviews/)). A useful order:

- **README and CONTRIBUTING first.** Tone of voice, maturity of the project, what they think matters.
- **Open issues sorted by comments.** This is where the real arguments live — the problems the team is currently fighting about.
- **Closed PRs from core maintainers over the last 6 months.** Look at PR descriptions, not diffs. How do they explain trade-offs? Terse? Essayistic? Bullet-pointed with benchmarks?
- **One "architecture" file read deeply.** Pick one module and actually read it. You cannot form an opinion from skimming.
- **Release notes.** What did they ship, what did they quietly remove, what did they deprecate and why.

**Reading engineering blogs critically.** The interrogative stance: for each post, ask "what was the alternative they didn't pick, and why?" If you can't answer that question from the post, the post is marketing. If you *can* answer it, you have the start of a take. Relevant Hacker News threads on this kind of reading are worth skimming for examples ([HN: Interview advice that got me offers](https://news.ycombinator.com/item?id=25519718)).

**Identifying technical debt the team complains about publicly.** Conference talks titled "lessons learned," postmortems, "migrating from X to Y" posts. These are gold — they name the thing the team is uncomfortable with, which means you can ask about it and sound like you've been in the trenches with them.

## 4. Product Research Methods

The process: install, use, break, opine.

- **Use it like a real user for one clearly-defined task.** Not "poke around the dashboard." Finish a single end-to-end workflow that someone would actually do.
- **Write down frictions as they happen.** Not in retrospect — in the moment, in a scratchpad. Retrospective notes become "the UX is nice" mush.
- **Find one user-facing decision that reveals a value.** Example: Linear's default to "assignee required" vs. Jira's permissiveness reveals a belief about team accountability. Figma's multiplayer-by-default vs. Sketch's single-file model reveals a bet on collaboration as the product, not a feature.
- **Find one thing that is clearly a compromise.** Every product has one. Being able to name it and *understand why they chose it* is the opinionated take.

Nathan Barry's framing of ConvertKit/Kit is that he can demo the whole product in 5 minutes ([SaaS Mag](https://www.saasmag.com/nathan-barry-convertkit-saas-design-and-the-mission-to-teach-everything-you-know/)) — which is itself a design philosophy, and candidates who *notice* that philosophy rather than just saying "I like the product" are the ones who signal fit.

## 5. People Research Methods (without being creepy)

The legitimate surface:

- **GitHub commits and PR comments** from engineers on the team. Technical and public.
- **Their personal blogs and conference talks.** Public and intentional.
- **Their written answers on StackOverflow, GitHub issues, mailing lists.** Public, technical, and shows how they think under mild pressure.
- **Their posts on company blog with their byline.**

Off-limits: personal social media, personal life, anything non-technical. Rands in Repose: research the job and company, not personal details about the interviewer — the latter reads as creepy ([Rands — How to Recruit](https://randsinrepose.com/archives/how-to-recruit/)).

The output of people research is *not* "things to name-drop." It's: "here are two or three engineers whose public work makes me want to work with them, and I can say one specific thing about why." That's the signal.

## 6. Finding the Opinionated Take — Actual Workflow

This is the section the current fact-oriented methodology is missing.

**Step 1: Trigger.** Every research session should generate at least one "huh, that's weird" moment. If nothing surprised you, you didn't read carefully enough. Go back.

**Step 2: Name the decision.** Turn the weirdness into an X-versus-Y framing: "They chose X when most companies would choose Y." Examples: "Fly.io runs firecracker microVMs instead of containers," "Linear uses a custom sync engine instead of GraphQL subscriptions," "Anthropic emphasizes Constitutional AI instead of pure RLHF."

**Step 3: State the trade-off.** Every decision is a trade-off. "X gets them \_\_\_ at the cost of \_\_\_." If you can't fill in both blanks, you don't understand the decision yet.

**Step 4: Take a side.** Not neutral analysis — an actual position. "I think the trade-off is right because \_\_\_" or "I'd have gone the other way because \_\_\_." This is the part candidates flinch from. Muse's hiring managers explicitly valued candidates who "weren't afraid to offer feedback" in a positive tone ([The Muse](https://www.themuse.com/advice/10-ways-you-can-use-your-cover-letter-to-stand-out-according-to-10-hiring-managers)).

**Step 5: Ground it in something you touched.** "When I used the product I noticed \_\_\_, which is consistent with that choice." Without this step, the take is just armchair theorizing.

A landable cover-letter sentence looks like: *"Your decision to ship a sync engine before a public API is the opposite of what Linear-category tools usually do, and after using the app for an afternoon it's clear why — the offline-first responsiveness is the actual product and an API-first architecture would have compromised it. I'd love to work on the sync internals."* That sentence is impossible to fake without doing the research.

## 7. Time Budget

Pre-application research: **90–180 minutes.** Enough to form one take and write a non-generic cover letter. Beyond this, you're optimizing a cover letter that hasn't been read yet.

Pre-interview research (once you have a scheduled call): **3–6 hours, spread over 2–3 days.** You need time for the "shower thought" to arrive. Cramming 6 hours into one evening produces recall, not opinion.

Diminishing returns are real. Research on interview effectiveness shows reliability plateaus after 3–4 interviews ([Talent Point Consulting](http://www.talentpointconsulting.com/law-diminishing-returns-many-interviews-enough/)) — the same curve applies to research depth. Beyond ~6 hours per company, you're either procrastinating or anxious.

The curve: the first hour produces facts, the second hour produces the first half-formed opinion, hours three through five refine it. Hour six is where most candidates start re-reading what they already read. Stop.

## 8. Signal Extraction — Turning Research Into 2–3 Talking Points

Output target: **two or three sentences** you could drop unchanged into a cover letter or first-round screen, each of which another applicant could not plausibly have written.

Template:
1. **One product-grounded observation.** "After using X for Y, I noticed Z." Proves you used it.
2. **One technical or strategic opinion.** "Your choice of A over B makes sense because C, though I'd be curious about D." Proves you read and thought.
3. **One connecting line to your own work.** "I've worked on the same trade-off in \_\_\_ and chose \_\_\_." Proves relevance.

If any of the three is missing or generic, redo it.

## 9. Mistakes

- **Over-research paralysis.** Reading everything, saying nothing. The fix: force yourself to draft the take after 90 minutes, *then* keep reading to refine it.
- **False-flattery research.** "I loved your blog post about X." Worthless unless followed by a specific, slightly-disagreeable take on it.
- **Creepy research.** Citing the interviewer's Instagram, their kids, their weekend hobby. Rands explicitly warns against personal-details research ([Rands](https://randsinrepose.com/archives/how-to-recruit/)).
- **Out-of-date research.** The funding round you cite from 2023, the VP who left six months ago, the product line they sunset. LLM-assisted research is *especially* prone to this — current deep-research agent research surveys document "extrinsic hallucination" where model-internal facts override fresher sources ([arXiv: LLM Agent Hallucinations](https://arxiv.org/html/2509.18970v1)).
- **Quoting the engineering blog.** Every applicant does this. The blog quote is the null hypothesis of cover-letter fluff. Reference it if you're disagreeing with it.
- **Fact-sheet cover letter.** "I see you raised $40M and have 200 employees." The company knows. So does everyone else who applied.
- **Surface-summary from LLM research.** A specific failure mode with AI agents: they produce a tidy facts summary that contains no opinion because the training incentive is to be helpful-and-neutral. You must actively break the neutrality.

## 10. Tool Stack

**Actually useful:**

- **The product itself.** Free trial, hobby plan, whatever gets you in.
- **GitHub** — repo, issues, PRs, release notes, org contributors list.
- **The company's own engineering blog and careers page.** The careers page in particular often contains the uncensored "how we work" statement — Fly.io's hiring docs ([fly.io/docs/hiring](https://fly.io/docs/hiring/hiring/)) are a great example of signal-dense prose.
- **Podcast/YouTube appearances by founders.** Founders in audio are more candid than founders in text.
- **Levels.fyi** — comp calibration, not signal.
- **Hacker News search** (hn.algolia.com) — threads about the company, especially critical ones.
- **Their own documentation site.** Read it as if you're evaluating whether to adopt them. You'll form opinions fast.

**Overrated:**

- Glassdoor for signal (useful only for red-flag patterns, per [Dexian](https://dexian.com/blog/ways-to-effectively-research-a-potential-employer-before-your-interview/)).
- BuiltWith — gives you a stack list, zero opinion.
- Crunchbase beyond a single lookup.
- Generic "company research" tools that aggregate press releases.

**Missing from most workflows:** the founders' personal Twitter/X feeds (where opinions live), conference talk archives (InfoQ, YouTube), and RSS feeds of principal engineers.

## 11. Agent-Assisted Research

Very little published best-practice exists, but the failure modes are clear from adjacent research on deep-research agents ([arXiv 2509.18970](https://arxiv.org/html/2509.18970v1)):

- **Hallucinated facts.** LLMs confabulate funding rounds, team sizes, product features. Must be grounded in fetched URLs, not model memory.
- **Surface summarization.** Agents tend to produce tidy bullet-point summaries that *contain no opinion* because their training reward is helpful-neutral. This is the exact failure the current `company.md` is hitting.
- **Stale knowledge.** Training cutoff problems. Mitigation: force the agent to fetch fresh URLs and prefer recent dates.
- **Citation drift.** Agents attribute quotes to the wrong source. Mitigation: every claim must carry the URL it came from.

The mitigation pattern that keeps appearing in the literature is **role division**: one agent fetches, one extracts claims, one verifies, one takes a position ([arXiv 2509.18970](https://arxiv.org/html/2509.18970v1)). That maps cleanly to a pipeline for company research.

---

## Methodology Spec for the `company-research` Skill

A concrete pipeline an agent should execute. Replaces the current fact-oriented version.

### Inputs

- Company name, URL, role title, job description text.
- Optional: a specific technical area the candidate cares about (used to bias the search).

### Pipeline

**Phase 1 — Scope (5 min).** Fetch the careers page, the job description, the top-level site. Extract: what the company claims to build, who they claim to serve, their stated engineering values (if a "how we work" or engineering handbook exists).

**Phase 2 — Primary source pass, in ladder order.**

1. **Product.** If there's a free tier, signup link, public demo, live app: fetch it, describe what a new user sees in the first 60 seconds, capture screenshots or DOM if available. If no public access, note that explicitly and skip to sources that substitute (public demos, product hunt launches, YouTube walkthroughs).
2. **GitHub org.** List repos by stars and recent activity. For the top 2–3: fetch README, last 20 merged PRs' titles and descriptions, top 5 open issues by comment count. Store verbatim quotes with URLs.
3. **Engineering blog.** Fetch the 5 most recent posts. For each, extract: the decision described, the alternative rejected, and the stated reason. Flag any post that does not describe a trade-off (marketing post, skip).
4. **Founder/principal writing.** Search for personal blogs, Twitter handles, podcast appearances of the CEO, CTO, and any named tech lead. Fetch and store the 3 most substantive pieces.
5. **Critical press / HN threads.** Search HN and recent press for the company name. Collect both positive and *negative* takes.

**Phase 3 — Claim extraction.** From all fetched sources, extract a structured list:

- `decisions[]`: each with `{what, alternative, reason, source_url, direct_quote}`.
- `frictions[]`: from product usage, `{what_broke, where, severity, source: "firsthand"}`.
- `people[]`: engineers with public technical work, `{name, role, artifact_url, one_line_summary}`.
- `debts[]`: things the team publicly complains about, `{complaint, source_url}`.

Every entry must have a URL. No entry without a URL is admitted.

**Phase 4 — Opinion forge (the critical new step).** For each of the top 3 decisions, the agent must produce:

- A one-sentence statement of the decision as an X-versus-Y framing.
- The trade-off in both directions.
- **A take.** Written as a first-person opinion, with a stance. Must end with a reason the candidate can ground in something they've done or observed.
- A confidence flag: `grounded` (based on firsthand product usage or direct source reading) or `inferred` (based only on the company's own writing — weaker).

If the agent cannot produce a `grounded` take for *any* decision, the skill must surface a warning: "Research did not produce a defensible opinion. Recommend: spend 30 more minutes with the product or source before drafting the cover letter."

**Phase 5 — Hook generation.** Produce 3–5 "hooks" — sentences ready to drop into a cover letter. Each hook must:

- Reference something specific (a PR number, a blog post, a product feature).
- Contain an opinion verb ("I think," "the interesting choice here is," "what surprised me was").
- Connect to something the candidate has done or knows.
- Be rejected if it could plausibly have been written without doing the research.

**Phase 6 — Anti-fluff pass.** A separate verification step re-reads the output and deletes:

- Any sentence containing "passionate," "excited about your mission," "impressive growth."
- Any fact that is not in service of an opinion.
- Any quoted blog passage that is not being disagreed with.
- Any claim without a URL.

### Output file structure (`company.md`)

```
# {Company}

## The take (the part the cover letter is built from)
- Top 3 hooks, each grounded with source URL.

## Decisions I have opinions about
- For each: what/alternative/reason/my-take/confidence/source.

## Product frictions I noticed (firsthand)
- Only if firsthand product access happened.

## People whose work I'd want to learn from
- 2–3 engineers with one specific reason each.

## Debts the team is publicly wrestling with
- Things to bring up in interview questions.

## Facts (appendix — not the point)
- Funding, size, founders, stack. Minimal.

## Sources
- Every URL touched, dated.
```

### Failure modes the pipeline must refuse

- Producing a `company.md` with no firsthand product access AND no source-code reading. At least one of those must happen.
- Producing hooks that do not contain an opinion verb.
- Producing any claim without a source URL.
- Producing a file where the "Facts" section is longer than the "Decisions I have opinions about" section.

The inversion is the whole point: the current skill produces a facts document with opinion-shaped garnishes. The new skill produces an *opinions* document with facts as appendix.

---

## Sources

- [Ohio State ECS — How to Research a Company Before an Interview](https://www.ecs.osu.edu/news/2025/02/how-research-company-interview)
- [Dexian — 8 Proven Steps](https://dexian.com/blog/ways-to-effectively-research-a-potential-employer-before-your-interview/)
- [Career Sidekick — Research a Company Before Interview](https://careersidekick.com/research-company-before-job-interview/)
- [The Muse — Ultimate Guide to Pre-Interview Research](https://www.themuse.com/advice/the-ultimate-guide-to-researching-a-company-preinterview)
- [The Muse — 10 Hiring Managers on Cover Letters](https://www.themuse.com/advice/10-ways-you-can-use-your-cover-letter-to-stand-out-according-to-10-hiring-managers)
- [Jason Cohen — SaaStr: Burnout to $100M ARR](https://www.saastr.com/from-burnout-to-100m-arr-wpengine/)
- [Jason Cohen — Top 10 Mistakes Getting to $100M ARR](https://www.saastr.com/my-top-10-mistakes-getting-to-100m-arr-jason-cohen-founder-wp-engine/)
- [Patrick McKenzie — Hiring at Scale (Business of Software)](https://businessofsoftware.org/talks/hiring-at-scale-patrick-mckenzie/)
- [Kalzumeus — About patio11](https://www.kalzumeus.com/about/)
- [Kalzumeus — Salary Negotiation](https://www.kalzumeus.com/2012/01/23/salary-negotiation/)
- [Fly.io — Our Hiring Process](https://fly.io/docs/hiring/hiring/)
- [Fly.io — Working at Fly.io](https://fly.io/docs/hiring/working/)
- [HN — Fly.io Resume-Blind Hiring](https://news.ycombinator.com/item?id=39291022)
- [Thomas Ptacek — sockpuppet.org](https://sockpuppet.org/me/)
- [HN — Ask HN: What do you look for in an applicant's GitHub?](https://news.ycombinator.com/item?id=16224401)
- [HN — Interview advice that got me offers](https://news.ycombinator.com/item?id=25519718)
- [John Resig — Project-Based Interviews Instead of "GitHub"](https://johnresig.com/blog/project-based-interviews/)
- [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
- [Hello Interview — How I Got Hired at Anthropic as a Staff Engineer](https://www.hellointerview.com/experience/stories/cmjpzl4w904uo08advlsn6dql)
- [Hello Interview — Anthropic Senior Engineer](https://www.hellointerview.com/experience/stories/cmmxvnjbq08x408ad3zcy1xyh)
- [Sundeep Teki — How to Get Hired at OpenAI, Anthropic, DeepMind](https://www.sundeepteki.org/advice/how-to-get-hired-at-openai-anthropic-and-google-deepmind-in-2026)
- [Rands in Repose — How to Recruit](https://randsinrepose.com/archives/how-to-recruit/)
- [Nathan Barry — SaaS Mag Profile](https://www.saasmag.com/nathan-barry-convertkit-saas-design-and-the-mission-to-teach-everything-you-know/)
- [Talent Point Consulting — Law of Diminishing Returns in Interviews](http://www.talentpointconsulting.com/law-diminishing-returns-many-interviews-enough/)
- [arXiv — LLM-based Agents Suffer from Hallucinations (2509.18970)](https://arxiv.org/html/2509.18970v1)
- [OpenSauced — Talking About Open Source in a Tech Interview](https://opensauced.pizza/docs/community-resources/how-to-talk-about-your-open-source-experience-in-a-tech-interview/)
