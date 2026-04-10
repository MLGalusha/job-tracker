---
name: outreach
description: Draft a cold email or warm-intro-request message to a specific person at a target company. Produces applications/<app_id>/outreach/<slug>.md and logs a communication_sent event. Runs after company-research. Enforces the One-Take Rule — refuses to draft without a grounded decision from company.md. This is the highest-payoff channel per 2026 hiring research.
---

# outreach

This skill drafts a cold email or warm-intro-request for a specific person at a target company. It is the **highest-payoff channel** per `notes/research/2026-ai-hiring-shift.md`: cost 3, payoff 5, top of the channel ranking along with warm intros and building in public. It replaces the cover letter for engineer-led startups where formal applications are negative signal.

**Core rules (from research):**
- Draft is 4-7 sentences, max 150 words. Longer than that and reviewers bounce.
- Must contain a One-Take: an opinionated observation grounded in a `decisions[]` entry from `company.md`.
- Must name a specific person. "Hey team" is garbage.
- Must include one concrete artifact link (a shipped project, a blog post, a repo). No link = no email.
- Must end with a concrete small ask (15 min call, or pointer to the right person), not "let me know if there's a fit."

---

## When to invoke this skill

- Mason says "write a cold email to [company]"
- Mason says "draft outreach for [person at company]"
- `cover-letter-writer` refused to generate because the lane is OFF and recommended outreach instead
- Mason is chasing a target-companies.md entry where `artifact_fit: strong` and wants to open the conversation

**Do not run this skill if:**
- `company.md` does not exist → run `company-research` first
- `company.md` has zero grounded decisions → rerun `company-research` with more primary-source attempts
- Mason hasn't named a specific person and no `people[]` entry in `company.md` has enough context to target

---

## Prerequisites

1. `applications/<app_id>/` directory exists
2. `applications/<app_id>/company.md` exists with at least one `grounded` decision
3. `profile/voice.md`, `profile/wins.md`, `profile/story.md`
4. A specific target person, either named by Mason or picked from `company.md` `people[]`

---

## The pipeline

### 1. Read inputs (targeted)

- `applications/<app_id>/company.md` — the `decisions[]` and `people[]` sections are the gold
- `applications/<app_id>/role.md` if it exists (not required — outreach can precede a formal role)
- `profile/voice.md` — full voice contract
- `profile/wins.md` — quotable lines
- `profile/story.md` — narrative arc

### 2. Pick the target person

If Mason named someone, use them. Otherwise pick from `company.md` `people[]`, preferring in this order:
1. The founder or engineer who wrote one of the `grounded` decisions Mason has an opinion on
2. An engineer whose recent public writing shows priorities Mason can speak to
3. A founder whose podcast / blog / Twitter has revealed specific positions
4. A hiring manager named in the JD

Do **not** default to generic HR / recruiter contacts. The research is explicit: recruiter outreach is near the bottom of the channel ranking. If the only identifiable person is a recruiter, flag that and ask Mason whether to send anyway or wait for a better target.

### 3. Pick the One-Take

From `company.md` `decisions[]`, pick the single **grounded** decision Mason has the strongest opinion on. This is the reason the email exists. If no grounded decision exists in `company.md`, refuse to draft.

### 4. Pick the artifact link

Pick ONE link to include. Priority order:
1. A shipped application-artifact for this specific company (if `artifact_shipped` event exists in data)
2. The most relevant project from `profile/projects/` — usually VTR for production credibility, Staffclaw for reverse-engineering / platform work, SonicGen for audio / hand-written-code credibility
3. A relevant blog post Mason has written (once the fingerprinting deep-dive exists, that's the default anchor for every outreach)

Exactly one link. Not three. Not a portfolio dump.

### 5. Pick the ask

Two shapes, pick one:
- **Call ask:** "Is there 15 min next week to talk about [specific topic]?" — use when Mason has a direct connection to the person's work.
- **Pointer ask:** "Is there a better person on your team to talk to about [specific topic]?" — use when reaching a founder who isn't the direct hiring decision-maker.

Never "let me know if there's a fit." Never "would love to chat." Never "happy to jump on a call whenever."

### 6. Draft the email (4-7 sentences, 150 words max)

Structure:
1. **Sentence 1 (opener)** — direct, names a specific thing. Not "I hope this finds you well." Not "I'm reaching out because." Good openers: "I've been running your product on a collection of 10,000 historical letters and noticed X," "Read your essay on Y — the trade-off you mentioned in Z is..."
2. **Sentences 2-3 (One-Take)** — the opinionated observation. Grounded in a specific decision. Mason's actual take.
3. **Sentences 4-5 (credibility)** — one concrete thing Mason has shipped, with the artifact link. One real number.
4. **Sentence 6-7 (ask)** — the specific ask. Forward momentum.
5. **Sign-off:** "Mason"

No subject-line trickery. Subject should be 4-6 words, descriptive, not clickbait. Good: "Reaction to your GPUI essay," "Audio fingerprinting + Zed question." Bad: "Quick question," "Opportunity to connect."

### 7. Voice audit (blocking)

Against `profile/voice.md`, blocking violations:
- Any rule 15 LLM-vocab word (*leveraged, delve, seamless, passionate, excited to, thrilled to, eager to, reaching out because, huge fan, reach out*)
- "I hope this finds you well" / "I hope you are doing well"
- "I'd love to chat / jump on a call / connect"
- Any em-dash in a sentence
- Any hyphen compound adjective
- Any tilde, arrow, brand-name drop in prose
- Any self-deprecation
- Over 150 words total
- Missing the One-Take
- Missing the artifact link
- Missing the specific ask
- Generic "your company" / "your team" when the email should name something specific

### 8. The One-Take check (second pass)

- Could this sentence have been written about any other company? If yes, fail.
- Does it reference an essay every candidate references? If yes, fail.
- Does it carry Mason's opinion, not just a fact? If no, fail.
- Grounded in a `company.md` decision tagged `grounded`? If no, fail.

If any fail, rewrite. If after two rewrites the One-Take still fails, stop and tell Mason which grounded decision to use or which new primary source to research.

### 9. Write the file

Write to `applications/<app_id>/outreach/<person_slug>.md`. Structure:

```markdown
---
to_name: <Full name>
to_role: <role>
to_email: <email if known, otherwise blank>
channel: <email | linkedin | twitter_dm>
one_take_source: <decision title from company.md>
artifact_link: <url>
drafted_at: <ISO date>
sent_at: <blank until Mason sends>
---

# Outreach to <Name> at <Company>

**Subject:** <4-6 word subject>

<body of email, 4-7 sentences>

Mason

---

## Reasoning

- **Person picked because:** <why them>
- **One-Take grounded in:** <decision, source URL from company.md>
- **Artifact link:** <url, what it proves>
- **Ask:** <call | pointer>
```

Do NOT log a `communication_sent` event yet. The event is logged only when Mason confirms he actually sent it.

### 10. Report to Mason

Under 200 words. Include:
- Path to the draft
- Target name + role
- **The One-Take sentence, quoted verbatim**
- Which artifact link you used and why
- The ask shape (call or pointer)
- Anything flagged during the voice audit or One-Take check
- Next action: "Confirm when sent and I'll log `communication_sent`"

---

## Logging the send

When Mason confirms he sent the email, log:

```bash
cd ~/Workspace/job && pnpm log communication_sent --app_id=<app_id> --channel=email --to="<Name>" --summary="Cold outreach re: <one-take topic>" --message_ref=applications/<app_id>/outreach/<slug>.md
```

Then update the `sent_at` field in the outreach file's frontmatter.

---

## Rules and guardrails

- **Never draft without a grounded decision in company.md.** Blocking.
- **Never draft generic "Hey team" emails.** Specific person required.
- **Never exceed 150 words.**
- **Never include more than one artifact link.**
- **Never ask for a call without naming a specific topic.**
- **Never use LinkedIn connect-request template language.** "I came across your profile" is banned.
- **Never name-drop brand tools** (Claude Code, Codex, Cursor) in the prose. Describe the work, not the tooling.
- **Never apologize for Mason's background or hedge about experience.**
- **Respect the primary-source ladder indirectly:** the One-Take should trace to something Mason or the research agent actually touched, not to something aggregated from Crunchbase.
- **Do not mass-generate.** This skill is one email at a time, one person at a time. The point is that each email is uniquely expensive to write.

---

## What this skill does NOT do

- Does **not** send the email. Mason sends it.
- Does **not** log `communication_sent` until Mason confirms the send.
- Does **not** do company research. That's `company-research`.
- Does **not** write a cover letter. That's `cover-letter-writer`.
- Does **not** produce an artifact. That's `application-artifact`.
- Does **not** replace warm intros. If Mason has a warm intro path, use that first — outreach is for when the warm path doesn't exist.
