# Job Search Strategy Synthesis (2026)

Cross-cutting synthesis of six research tracks. Source files in this directory:
`2026-ai-hiring-shift.md`, `resumes-2026.md`, `company-research-methods.md`, `tailoring-methodology.md`, `interview-prep-methodology.md`, `self-taught-playbook.md`.

## The unifying meta-insight

**The cost of producing a "good-looking" application collapsed to zero, so the signal moved to whatever still costs something.**

Every cross-cutting theme below is a corollary. Resumes, cover letters, company research, interview answers, even cold emails are all cheap to generate now. The candidates who win are the ones whose artifacts contain something a generator cannot produce: a specific opinion grounded in something the candidate actually touched, an artifact that took real work, a warm relationship, or a demonstrated judgment call.

The market signal: 14,200 LinkedIn applications/minute, 34% from auto-apply bots, ~50% of job-seekers using ChatGPT for resumes, interview cheating at 38–45% in late 2025. Mass formal application is now negative ROI for the candidate and negative signal for the company. Every research track converged on the same conclusion from a different angle.

## Six reframes (one per track)

### 1. Resume: index, not story
The resume's job is no longer to tell your story. Its job is to earn a click on GitHub, a demo, or a blog post — those are where the actual story lives. Implications:
- Single column, one page for <5 YoE. Asymmetric risk: a clean one-pager never costs you a callback; a dense two-pager might.
- Half of bullets must contain a real number. For projects without users, use **engineering** metrics (latency, p95, eval scores, token cost, lines, bundle size) — never fake user counts.
- LLM screeners do semantic matching now. Keyword stuffing is negative signal. So is LLM-vocabulary (`leveraged`, `spearheaded`, `seamless`, `robust`, `cutting-edge`, `passionate`, `delve`, `tapestry`).
- "Imperfection is the new authenticity signal" — too-clean reads as AI-generated to suspicious reviewers.

### 2. Company research: opinion, not facts
The fact-vs-opinion gap is the core problem. Most candidates produce a `company.md` that is 90% facts and 10% opinion-garnish. The reverse is required: the document should be a list of decisions the company has made, with the candidate's grounded take on each.

Primary source ladder, signal-high to signal-low: product use → source code → engineering blog read critically → founder personal writing → podcasts → press → Glassdoor → aggregators. Most candidates start at #6–7 and never reach #1. **The inversion is the biggest lever in the entire pipeline.**

Time budget: 90–180 min pre-application, 3–6 hours pre-interview spread across days for incubation.

### 3. Tailoring: selection, not generation
"Tailoring is a selection and coordination problem, not a generation problem." Decompose every JD into four layers — core requirements / nice-to-haves / wishlist filler / unstated real problem — and **state the unstated real problem in one sentence before touching the resume**.

Sweet spot for JD-phrase coverage: 50–70%. Above 70% triggers "too mirrored" and hits the suspicion filter. Below 50% means the lane is wrong.

Modular pattern: write each bullet once, well, tagged by capability. Assemble per application. Never edit in place during assembly — that's where voice degrades and lies creep in.

Coordination rule: **resume is about you; cover letter is about them.** If both say the same thing, one is wasted.

### 4. Interview prep: leverage, not gaps
"Most interview prep optimizes gaps. The best prep optimizes the 2–3 strengths that will carry the loop, and does just enough gap work to prevent a disqualifying failure."

Allocation that wins: 40% project defensibility / 15% adjacent concepts / 15% company-specific / 15% behavioral / 10% system design / 5% LeetCode. (LeetCode bifurcation: still relevant for big tech, near-zero for AI-native startups.)

Crown-jewel project must be narrated at three lengths: 3 min, 10 min, 30 min. Anthropic's 4-level coding gauntlet (in-memory DB: SET/GET → scans → TTL → compression) is the canonical AI-lab evaluation pattern.

### 5. Channels: inversion
The full ranking from `2026-ai-hiring-shift.md`, payoff/cost:

| Channel | Verdict |
|---|---|
| Cold email to founders | Top tier |
| Warm intros | Top tier |
| Building in public | Top tier |
| OSS contributions to target tools | High |
| Work trials / paid contracts | High |
| One great long-form post | High |
| Mass formal applications | Negative ROI |
| LinkedIn recruiter outreach | Negative ROI |
| Recruiting agencies | Avoid |

Zed: "Less than half of our hires submitted a traditional application." Linear: 96% four-year retention via work-trial hiring. Gumroad: 4–6 week paid contract trials as the standard entry path. The signal is unambiguous and the system needs to reflect it.

### 6. Positioning: agent-directed engineer
The market is split between the pro-agent camp (Zed, Cursor, Cognition) and the AI-suspicion camp (16/18 CTOs reported production disasters from AI code in 2025). Both camps are screening for the **same** thing: proof you can judge agent output, not just produce it.

This is the answer to the bootcamp/self-taught problem. The audio fingerprinting work (14k lines, hand-written, hard problem) is the anti-vibe-coder shield. Lead with it. It demonstrates "I can code without an agent" — which is the prerequisite for being trusted to code with one.

## Skill rewrites — concrete proposals

Current skills are assumption-based. Each one needs a blocking check derived from the research, so the pipeline can refuse to ship a low-signal artifact.

### `company-research` (rewrite — biggest delta)
- **Invert the document.** Output structure: `decisions[]` first, `frictions[]`, `people[]`, `debts[]`, then a short Facts appendix.
- **Confidence flags.** Every decision is tagged `grounded` (touched the product, read the code, read founder writing) or `inferred` (everything else).
- **Blocking check 1:** if the Facts appendix is longer than the decisions section, refuse to write the file.
- **Blocking check 2:** if zero decisions are tagged `grounded`, block downstream cover-letter generation with a warning.
- **Pipeline:** 6 phases ending in the structured lists with required URL grounding.
- **Source ladder enforcement:** the skill prompts the agent to start at the product itself, not at Crunchbase.

### `cover-letter-writer` (rewrite)
- **One-Take Rule blocking check:** the letter must contain at least one opinionated observation about the target that could not have been written about any other company. Pipeline refuses to write the file if absent.
- **Word count:** 250–350 (down from 300–450).
- **Banned-vocab filter:** hard reject on `delve`, `pivotal`, `leverage` (verb), `seamless`, `tapestry`, `landscape`, `navigate` (metaphorical), plus the resume LLM-vocab list.
- **Coordination check:** flag overlap with the resume bullets — if >40% semantic overlap, the cover letter is wasted.
- **Sobo essay = table stakes**, not signal. Don't reward "I read your essay" as evidence of research; require an opinion on a specific decision.

### `resume-tailor` (rewrite)
- **Format:** single column, one page, projects-first ordering.
- **Modular snippet library** at `profile/snippets/` — write once, tag by capability, assemble per application. Never edit during assembly.
- **JD coverage cap:** 50–70% phrase coverage; warn if above 70%.
- **Metric rule:** every project bullet must have a real engineering metric. Refuse fake user counts.
- **Banned-vocab filter:** same list as cover letter, plus resume-specific (`results-driven`, `proven track record`, `passionate`, `synergy`, `tech-savvy`).
- **Voice contract addendum** from `resumes-2026.md` — 14 concrete rules — added verbatim to `profile/voice.md`.

### `interview-prep` (rewrite)
- **Leverage-first reordering:** the pipeline asks "what are your 2–3 strongest cards for this loop?" before "what are your gaps?"
- **Loop typology classification:** big-tech / startup-standard / ai-native / founding-eng / ai-lab. Allocation differs per type.
- **Mandatory triage footer:** every study guide ends with "If you only have 4 hours left, do these three things." Hard requirement.
- **Defensibility cards** at three narration lengths (3/10/30 min) for the crown-jewel project.
- **Default allocation:** 40/15/15/15/10/5 from track 4.

### NEW: `outreach` skill
Highest-payoff channel per research, currently missing entirely. Pipeline:
- Read `company.md` (must have at least one `grounded` decision).
- Identify a specific person (founder / hiring manager / EM) — prefer someone who wrote the founder writing referenced in `decisions[]`.
- Draft 4–6 sentences: opinion on a specific decision → what you'd build / improve / question → one concrete artifact link → ask for 15 min or for the right person to talk to.
- Banned: "I'd love to chat," "passionate about," "huge fan," "reaching out because."
- Logs `outreach_sent` event.

### NEW: `application-artifact` skill (conditional)
For high-priority targets (Zed, Anthropic, Cursor) where JD coverage is <70%: the artifact IS the application. Pipeline:
- Take the unstated real problem from the JD decomposition.
- Build a small thing that addresses it (PR to their OSS repo, a teardown post, a tool).
- Ship it publicly. Reference it in the outreach.
- This replaces the cover letter for these targets, doesn't supplement it.

## Voice.md updates

Add to `profile/voice.md`:
- **Banned LLM vocabulary** (full list): leveraged, spearheaded, results-driven, passionate, proven track record, delve, robust, seamless, cutting-edge, tech-savvy, adept, synergy, pivotal, tapestry, landscape, navigate (metaphorical), pivotal, dive deep, deep dive, ecosystem (when not literal).
- **One-Take Rule:** any piece of writing addressed to a specific company must contain an observation that could not have been written about any other company.
- **Imperfection rule:** prefer one slightly rough sentence over five polished ones. Don't sand down voice into LLM-smooth.

## Sequencing

Suggested order of skill work, highest leverage first:
1. `company-research` rewrite — unblocks everything else, biggest delta.
2. `voice.md` update — prerequisite for the rewrites below.
3. `cover-letter-writer` rewrite — currently shipping bad output.
4. `outreach` skill (new) — highest-payoff channel, currently missing.
5. `resume-tailor` rewrite — current version is decent, refinements not blocking.
6. `interview-prep` rewrite — only matters once a loop is scheduled.
7. `application-artifact` skill (new) — only for top-tier targets, optional.

## Open questions for Mason

Before any of the above gets built:
1. Which targets get the `application-artifact` treatment first? Default proposal: Zed, Anthropic, Cursor.
2. What's the minimum-viable outreach cadence you'll commit to? (5/week is the research-backed floor; 10/week is aggressive.)
3. Do you want to write the audio fingerprinting deep-dive blog post **before** any applications go out? (Strong recommendation: yes. It's the anti-vibe-coder shield.)
4. Cover letter on/off per lane? Default proposal: ON for Anthropic-class, OFF for engineer-led startups (Zed, Cursor, Cognition) where outreach + artifact replaces it.
