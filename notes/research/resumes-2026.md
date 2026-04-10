# Tech Resume Best Practices 2026: What Actually Changed After LLMs

Research focus: a self-taught engineer (bootcamp, ~6 months, no prior professional experience, has shipped a production AI pipeline and other substantial projects) applying to AI-native startups (Anthropic, Cursor, Cognition, Zed, Linear, Vercel, Replit, YC companies) for founding engineer, AI engineer, forward-deployed engineer, and full-stack roles.

The question that shaped this research: *what makes a resume credible now that any candidate can generate a polished one in 30 seconds?*

---

## 1. Format and length

The 2026 consensus for candidates with <5 years of experience is unambiguous: **one page, single column, no color except maybe one restrained accent, no photo, no skill bars, no objective section**. Two pages is now reserved for 10+ YoE where career progression genuinely needs the real estate ([Tech Resume Inside Out / Gergely Orosz](https://thetechresume.com/); [AIApply 2026 length guide](https://aiapply.co/blog/one-page-resume-vs-two-page-resume)).

Two-column layouts are a recurring argument: modern Greenhouse/Lever/iCIMS parsers handle them fine ([PayScope ATS mythbusters](https://www.payscope.ai/blog/ats-mythbusters-guide)), but the Jobscan position remains "single-column is the only safe default because multi-column resumes get parsed left-to-right and scramble" ([Jobscan ATS template guide](https://www.jobscan.co/blog/20-ats-friendly-resume-templates/); [Yotru 2026 columns guide](https://yotru.com/blog/resume-columns-ats-single-vs-double-column)). For a candidate with no prior professional experience, the downside of a broken parse is much larger than the upside of a "designed" look — **single column wins by default**.

Format file type: PDF is still the expected default, but if you're submitting through Greenhouse or Workday, they re-parse it anyway. LaTeX is fine only if it renders to a normal font-embedded PDF; HTML portfolio pages are a *supplement*, not a replacement. Josh Ghent's red-flag list specifically calls out skill meters, photos, and putting education before experience as instant tells of inexperience ([Josh Ghent, Resume Red Flags](https://joshghent.com/resumes/)).

Objective sections are dead. A tailored 2-sentence "summary" or nothing at all — YC's Ryan Choi specifically recommends a "tailored two-sentence byline about what you do and why you're excited about that startup" ([YC Startup Job Guide](https://www.ycombinator.com/library/FB-writing-a-great-resume)).

## 2. ATS reality

The "ATS is a robot gatekeeper that auto-rejects you" story is mostly folklore in 2026. Modern ATS platforms (Greenhouse, Lever, Ashby, iCIMS) are fundamentally **CRMs with search**, not filters. The only automatic rejection happens when a candidate fails "knockout questions" (work auth, minimum experience floor) ([PayScope ATS mythbusters](https://www.payscope.ai/blog/ats-mythbusters-guide); [Relocateme on ATS rejection](https://relocateme.substack.com/p/an-ats-rejected-my-resume-is-it-true)). The person deleting your resume is almost always a human recruiter or hiring manager running a keyword search and skimming results.

This matters more for the target companies here: **most of them don't use traditional ATS keyword gating at all**. Anthropic, Cursor, Linear, Vercel, Zed all run on Greenhouse/Ashby with founder-or-hiring-manager-led triage. The "ATS optimization" industry is mostly selling anxiety to Fortune 500 applicants. Keyword stuffing a resume for an AI-native startup is a negative signal because a human *will* read it and recognize the pattern ([HN: What we look for in a resume](https://news.ycombinator.com/item?id=34519268)).

What still matters from ATS-era advice: standard section headers ("Experience", "Projects", "Education"), normal fonts, no text-in-images, no tables inside bullet content. That's hygiene, not optimization.

## 3. The AI screening layer

This is the new load-bearing layer. 82% of companies using AI recruitment tools now run LLM-based resume screening as a first pass, and 83% expect to by end of 2025 ([Mercity: Build an LLM Resume Analyzer](https://www.mercity.ai/blog-post/build-an-llm-based-resume-analyzer/); [arxiv 2504.02870: AI Hiring with LLMs](https://arxiv.org/abs/2504.02870)). For AI-native startups specifically, it's safe to assume an LLM is the first reader for any cold application.

Crucial difference from keyword ATS: LLMs do **semantic matching**. A resume that says "built a RAG pipeline over 40k legal documents using pgvector" will match a JD asking for "experience with embedding search / vector databases" even without the exact phrase ([Elasticsearch Labs: LLM hybrid matching](https://www.elastic.co/search-labs/blog/openwebcrawler-llms-semantic-text-resume-job-search); [MDPI: Zero-shot resume matching](https://www.mdpi.com/2079-9292/14/24/4960)). This means **narrative specificity beats keyword density** — and keyword stuffing is now actively counterproductive because it looks like spam to both humans and LLMs.

What the LLM layer rewards that humans don't care about as much: clear project *descriptions* that spell out what you actually built, stack, and outcome in one paragraph. What humans reward that LLMs miss: sharp writing, taste, and the absence of filler. You need to satisfy both — which means *concrete, specific, unornamented prose*.

Documented LLM screener bias: the [Brookings 2024 study](https://www.brookings.edu/articles/gender-race-and-intersectional-bias-in-ai-resume-screening-via-language-model-retrieval/) and the [MIT Law "First Come, First Hired" paper](https://law.mit.edu/pub/firstcomefirsthired/release/1) both show LLMs have strong ordering and name-based biases. Practical implication: apply early in the posting window and don't assume "fair" ranking.

## 4. Content priority and the 6-second scan

Every serious source converges on the same thing: **no one reads resumes, they skim**. Recruiters and hiring managers spend 6–10 seconds on the first pass ([Gergely Orosz / Tech Resume Inside Out](https://thetechresume.com/); [Stack Overflow blog: how to write an effective dev resume](https://stackoverflow.blog/2020/11/25/how-to-write-an-effective-developer-resume-advice-from-a-hiring-manager/)). Their eyes track to:

1. Company names (brand recognition)
2. Job titles
3. The *shortest* lines on the page (dates, titles)
4. Technologies mentioned
5. The most recent position's first 1–2 bullets

Everything else is "read if the first pass was interesting." The implication for a self-taught candidate: **you will not win the name-recognition scan**. You have to win on the next layer, which is the Projects section, because that's where an unknown-pedigree candidate can still make a hiring manager stop scrolling.

For this candidate profile, Projects should be first or second on the page, not buried after a thin work history. YC explicitly recommends: "add things that show what you can ship by linking a GitHub profile, portfolio, or other projects you've built" ([YC: Writing a great resume](https://www.ycombinator.com/library/FB-writing-a-great-resume)). **Make sure every link works** — YC flags dead links as an instant bad-impression signal.

## 5. Quantification — and what to do when you have no users

The universal rule: numbers beat prose ([İren Azra Zou on resume bullets](https://irenazra.medium.com/resume-bullets-that-stick-not-slip-your-resume-into-the-trash-eebf96028d41); [HN: what we look for in a resume](https://news.ycombinator.com/item?id=34519268)). "Reduced LCP by 35% via code-splitting" beats "improved frontend performance." At least half your bullets should contain a real number.

But the honest advice for a project with no users, no team, no revenue: **don't fake it**. Vanity metrics ("serves 1M+ requests" when it's a load-test against localhost) are tells that hiring managers immediately clock ([HuffPost: recruiters on ChatGPT tells](https://www.huffpost.com/entry/recruiters-job-application-chatgpt_l_6723b4e1e4b0871068fe81ad)). The substitutes that work:

- **Scale of data / input**: "ingested 40k PDFs", "embedded 2.1M chunks", "processed 14GB of audio"
- **Latency / cost / throughput**: "p95 under 800ms on a single t3.medium", "reduced token cost per query from $0.18 to $0.03 by switching to Haiku + caching"
- **Technical specificity**: "built a two-stage retriever with BM25 + rerank, tuned on 300 labeled pairs"
- **Evaluation numbers**: "raised eval harness pass rate from 61% to 89% over 6 iterations"

These are *engineering* numbers, not *product* numbers, and for builder-oriented startups they read as more honest than user-count metrics on a side project. Patrick McKenzie's core framing still holds: describe yourself by what you've *accomplished*, not what you *know* ([patio11: Don't Call Yourself A Programmer](https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/)).

"Lines of code" as a metric is almost always a tell of inexperience — the exception being when LoC is genuinely the right unit (e.g., "deleted 12k lines during a migration").

## 6. Tailoring depth

Real tailoring is narrative, not find-and-replace. The cheap version — swap "React" for "Vue" because the JD said Vue — is both detectable and pointless because LLM screeners do semantic matching anyway ([Recrew: LLM parsing evolution](https://www.recrew.ai/blog/how-ai-and-llms-are-transforming-resume-parsing)). Worse, hiring managers see the same bullet across 20 candidates and know it's template-salad.

Effective tailoring means: (1) reordering projects so the one closest to the company's actual work is first, (2) rewriting the top 1–2 bullets of the most relevant project to use the specific vocabulary and problem-framing from the job post, (3) a 2-sentence summary line that names the company and demonstrates you've read their product docs. This is slow — 20–40 min per application — which is the point. Candidates who blast 200 resumes are competing against candidates who send 15 and get 5 interviews.

## 7. The post-ChatGPT shift

This is the biggest section because it's the biggest change since 2023.

**What hiring managers now distrust**: the entire vocabulary of LLM-generated prose. "Leveraged", "spearheaded", "results-driven", "passionate", "proven track record", "delve", "robust", "seamless", "cutting-edge", "tech-savvy", em-dashes in specific rhythmic patterns. The [HuffPost recruiter piece](https://www.huffpost.com/entry/recruiters-job-application-chatgpt_l_6723b4e1e4b0871068fe81ad) and [Entrepreneur coverage](https://www.entrepreneur.com/business-news/employers-can-tell-if-you-used-chatgpt-to-write-your-resume/478444) both report recruiters identifying AI content in under 20 seconds, 33.5% of the time. On tech-literate hiring teams the detection rate is higher.

**What replaces the polished resume as a signal**: proof of work. The [August 2025 Ask HN thread on new hiring signals](https://news.ycombinator.com/item?id=44730506) converges on four things:

1. **Visible open-source contributions** to known projects — not "I starred 400 repos", but actual merged PRs to things people use.
2. **GitHub READMEs that read like an engineer wrote them** (not marketing), with real architecture decisions, tradeoffs, and known limitations sections.
3. **A personal blog with technical writing** — not hot takes, but "here's the weird bug I hit and how I fixed it" posts.
4. **Slight imperfections in the resume itself**: specific idiosyncratic phrasing, unusual-but-apt word choice, a detail that reads like memory rather than template.

One quote from the thread captured it: *"Mistakes are new signal. If it is too polished, chances are it's AI."* That's a mild overstatement but directionally right. **A resume that sounds like the candidate is more credible than one that sounds like LinkedIn.**

The deeper shift: before 2023, the resume was the signal. In 2026, the resume is an *index* into the real signals — the GitHub link, the blog, the demo, the Twitter thread where you debugged something in public. The resume's job is to get a hiring manager to click one of those links, and then the real evaluation happens there ([Converge Resources: Portfolio Resume 2026](https://www.convergeresources.com/the-portfolio-resume-why-proof-of-work-trumps-the-cv-in-2026/); [Fortune: AI-era tech hiring](https://fortune.com/2025/12/18/tech-hiring-slow-but-not-fully-stalled-exclusive-codepath-data-new-secret-to-land-tech-role/)).

## 8. Self-taught / non-traditional resumes

GitHub's 2025 internal data reports 35% of their engineering hires as self-taught, and Stack Overflow's 2024 survey put 48% of US developers in that bucket ([DEV: Self-taught is still possible in 2025](https://dev.to/nmiller15/self-taught-is-still-possible-in-2025-546d)). The market is open, but the *path through the resume* is narrower. Specific things that work:

- **Lead with projects, not education.** Put the bootcamp at the bottom in 2 lines. Nothing kills a self-taught resume faster than a "Education" section at the top that says "6-month bootcamp" and nothing else.
- **Own the self-taught framing once, then drop it.** A single line in the summary ("self-taught engineer, shipped a production AI pipeline as my first project") is better than sprinkling "self-taught" through every section.
- **Don't hide the timeline.** Pretending a 6-month bootcamp was a 2-year CS program is instantly detectable and destroys trust. Honest short timelines beat padded ones.
- **The bootcamp line matters less than the project quality.** Hiring managers at AI-native startups hire on output, not pedigree — but they also interview a *lot* of bootcamp grads, so the bar on project substance is higher, not lower.
- **"Production" is the magic word** — only when it's real. Production = someone other than you uses it, or real money / real data is on the line, or it runs on a schedule without your supervision. If the AI pipeline is genuinely deployed and handling real data, say so explicitly.

Charity Majors' hiring principle applies doubly to self-taught candidates: hire for *strengths, not lack of weakness* ([Woven Teams: Charity Majors on hiring](https://www.woventeams.com/hiring-for-strengths-not-weaknesses-with-charity-majors-part-1/)). The resume's job is to make one strength undeniable, not to apologize for gaps.

## 9. Tech-specific anti-patterns

From [Josh Ghent's red flags](https://joshghent.com/resumes/), [Alejandro Wainzinger's red flags](https://xevix.medium.com/red-flags-in-engineering-resumes-7d09facb22b8), and the [HN red-flags thread](https://news.ycombinator.com/item?id=16982575):

- **Skills-section bloat** — 30+ technologies listed is negative signal. Real engineers list 10–15 and can defend every one. "CSV" and "JSON" under skills is disqualifying.
- **Framework name-dropping without context** — "Worked with Kubernetes, Terraform, Airflow, dbt, Snowflake, Kafka, Spark..." reads as a checkbox parade. Pick the 3 that you actually built something with.
- **"Passionate about clean code" / "I love coding"** — instant filler flag.
- **Skill bars / meters** — "JavaScript: 80%, CSS: 50%" is meaningless and marks you as junior.
- **"We" instead of "I"** — obscures individual contribution. Own your work.
- **GitHub link in the header that's empty or last touched 3 years ago** — worse than no link.
- **Listing libraries as skills** — RxJS, Lodash, Zod, Zustand. Name frameworks and languages; libraries are details.
- **Photo on a US/UK resume** — unusual and creates bias-avoidance friction.
- **Education section before experience** when you have any relevant work at all.
- **Year-long gaps without explanation** — not fatal, but read.
- **Claiming leadership on a solo project** ("Led a team of 1") — comedy tell.

## 10. Real examples

Verified examples are harder to find than generic listicles, but three useful anchors:

- **Julia Evans' public approach** ([jvns.ca](https://jvns.ca/)) — not a resume, but a blueprint for proof-of-work. Her zines, blog posts, and tool-building built a reputation that replaced credential gating. The pattern: pick small, weird, concrete things; write about them in plain English; do it consistently.
- **The Ex-Meta recruiter's annotated examples** ([Formation: SWE resume guide](https://formation.dev/blog/software-engineer-resume-guide-examples/)) — walks through real rewrites, showing how a vague bullet becomes a specific one. Worth studying the *rewrite* pattern, not the template.
- **YC's Work at a Startup advice** ([YC Startup Job Guide](https://www.ycombinator.com/library/Ei-yc-startup-job-guide)) — published directly by the people who read tens of thousands of candidate submissions a year. Their core message: "make the hiring manager's job easy. Show what you've shipped."

The meta-lesson from all three: the candidates who got hired at top companies did not have "a great resume." They had **a great public trail**, and the resume was a map to it.

---

## Voice contract addendum for the resume-tailor skill

Based on this research, the following rules should be added to the resume-tailor skill in this repo:

- **Single-column, one page for <5 YoE. No exceptions for this candidate.** The downside of a broken two-column parse exceeds any upside.
- **No filler vocabulary.** Ban list: *leveraged, spearheaded, results-driven, passionate, proven track record, delve, robust, seamless, cutting-edge, tech-savvy, adept, synergy*. If a bullet contains one of these, rewrite it.
- **Every bullet must be specific enough that a different candidate could not plausibly have written it.** If a bullet works for any AI engineer, it's too generic.
- **At least 50% of bullets must contain a concrete number.** For projects with no users, use engineering metrics: data scale, latency, cost-per-query, eval scores, throughput, iteration counts. Never fake user metrics.
- **Projects section comes before Experience** for this candidate profile. Bootcamp goes in a 2-line Education section at the bottom.
- **Self-taught framing: stated once in the summary line, never repeated.** Don't apologize for the path; present it as the source of the shipped work.
- **Every link must resolve to something live.** Dead GitHub repos, 404 demo URLs, or empty READMEs are worse than no link. Verify before submitting.
- **Tailoring = narrative reordering, not find-and-replace.** Reorder projects to put the most-relevant first. Rewrite the top 2 bullets of that project in the language and problem-frame of the target company. Do not swap synonyms across the whole resume.
- **Summary line is tailored per application.** Two sentences: what you do, why *this specific* company. Read their product docs before writing it.
- **"Production" is a load-bearing word. Only use it when something other than the developer's laptop runs the code against real inputs.**
- **No skills section bloat.** Cap at 12–15 technologies, grouped by category (Languages / AI & ML / Infra / Frontend). Only list things the candidate can be interviewed on for 20 minutes.
- **No skill bars, no photos, no objective section, no "we" when "I" is true, no library name-dropping, no "I love coding" lines.**
- **The resume's job is to get a click on the GitHub/demo/blog link.** Treat it as an index, not the full story. Optimize the top third of the page for that click.
- **Write for both a human skimmer in 6 seconds and an LLM screener doing semantic match.** Specific concrete prose satisfies both. Keyword stuffing satisfies neither.
- **Imperfection is a signal of authorship.** Don't smooth out every sentence into LinkedIn-speak. Leave the candidate's actual voice — a slightly unusual word choice, a concrete detail that reads like memory — as an authenticity marker.
