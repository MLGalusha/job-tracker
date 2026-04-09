# Cover letter base — the skeleton

**Purpose:** Source material for every tailored cover letter. The `cover-letter-writer` skill reads this file, `profile/voice.md`, the target `role.md`, and the `company-research.md` (if one exists), then produces a tailored letter for a specific application. This file defines the *shape* and *voice anchors* — every tailored letter is a filled-in version of this skeleton.

**Rules inherited from `profile/voice.md`:**
- First person, declarative. "I built", "I designed", "I reverse-engineered".
- Concrete numbers, not adjectives.
- No hedging ("passionate," "familiar with," "some experience with" for things he actually shipped).
- Confident about agent-directed development — never hide it.
- Story-driven opens, not credential-driven.
- Specific verbs, mixed rhythm, thesis statements that land the point.
- No self-deprecation.
- Default formality: 4-5 out of 10 (see voice.md for per-lane dial).

**Structural rules:**
- Length target: **300–450 words.** Short enough to read in under a minute, long enough to make the case.
- **3-4 paragraphs.** Opener, project + fit, agent-directed differentiator, close.
- No greeting beyond "Hi [team / name]" at default formality. For higher formality, "Dear [name]".
- No "I hope this letter finds you well." Never.
- Address the hiring manager by name if research surfaces it. If not, address the team by name ("Hi Cognition team,").

---

## Default skeleton (fill in per role)

### Opening paragraph — hook with a concrete thing Mason built, not credentials

*Pattern A (story-driven, preferred):* Lead with a real problem Mason experienced or a real thing he shipped, in one or two sentences. Then land the connection to the role.

> Example pattern:
> "I just shipped [VTR / Staffclaw / something concrete], which [one-sentence outcome connecting to what this company does]. When I saw [company]'s [specific thing about the role or company], it was the first job posting that made me feel like my whole last year was the training arc for the role you're actually hiring for."

*Pattern B (thesis-driven, for more senior or founder-facing roles):* Lead with a short thesis statement about where software is heading, grounded in his own experience.

> Example pattern:
> "I think the most valuable engineering skill in 2026 isn't the ability to type code quickly — it's the ability to direct coding agents to produce correct, maintainable systems. I've been training that skill on real production work, and the clearest evidence is [VTR / Staffclaw / specific shipped thing]."

### Body paragraph 1 — the most relevant project, told with numbers

- Pick the project from `profile/projects/*.md` that most directly maps to the role's requirements.
- Tell it with **concrete verbs and concrete numbers**: what was the problem, what did Mason build, what's the shipped outcome. Two or three sentences max.
- Always include at least one number (LOC, commits, dataset size, latency, number of users, number of letters, number of API endpoints — whatever is true and specific).
- End with a one-sentence bridge connecting the work to the target role.

### Body paragraph 2 — the agent-directed differentiator

This paragraph is the same in spirit across every cover letter, but the *evidence* rotates based on what the target company would find most compelling.

> Default lines (adapt to voice):
> "I build primarily by directing coding agents — Claude Code and Codex are my daily tools. I've been a heavy AI user since 2023, before most engineers had touched the tools, and I moved to agent-primary workflow in early 2026 once the tools were good enough to be strictly better than hand-coding. The short version: I shipped VTR solo in about three weeks of focused work, and I don't think I could have done that any other way. I review and own every decision, but the majority of raw typing happens through agents. For a company that's [building with / betting on / already using] agents, that's a meaningful multiplier."

**Variations:**
- For Anthropic/OpenAI FDE: emphasize the "I direct agents and I can teach your customers to do the same" angle.
- For YC/founding-engineer roles: emphasize shipping speed.
- For AI-native SaaS: emphasize that Mason is already fluent in the product's target user's workflow.
- For companies that don't explicitly mention AI in the JD but *should* be agent-friendly: still include this paragraph, but lead with shipping speed as the headline rather than the methodology.

### Closing paragraph — the ask, short

- Two or three sentences maximum.
- State the ask clearly: "I'd love to talk" or "I'd love to learn more about [specific thing from the JD]."
- If there's a specific thing about the role Mason is excited about from company research, mention it here — one concrete sentence.
- **Do not** apologize for anything (lack of traditional experience, non-traditional background, etc.). Do not end with "thank you for your time" — end with forward momentum.

### Sign-off

> Best,
>
> Mason Galusha
> masonlgalusha.careers@gmail.com
> 304-546-5850
> github.com/MLGalusha

---

## Canonical phrases that can be used verbatim

These are lines from Mason's own writing or from his profile that drafting skills may reuse verbatim in cover letters. They are pre-approved.

- **"I build systems to solve problems I actually experience."**
- **"I design the architecture, make the technical decisions, and use AI coding tools to accelerate implementation."**
- **"I built this completely solo using coding agents as my main tools."**
- **"A year ago, mapping an undocumented API meant days in browser dev tools reading minified JavaScript. An AI agent did it in one session. The barrier to building on top of any software you use is effectively gone."**
- **"TypeScript end to end, on React, Express, Postgres, and Drizzle, deployed to Cloud Run with Cloud SQL and a Cloud Build pipeline."**

## Banned phrases (see voice.md for full list)

- "passionate" / "passionate about"
- "rockstar," "ninja," "wizard," "guru"
- "synergy," "leverage" (as a verb), "utilize"
- "extensive experience" (he doesn't have extensive anything — he has specific concrete experience)
- "I hope this letter finds you well"
- "Thank you for your time and consideration"
- "some experience with" or "familiar with" for things Mason has actually shipped
- "helped build" when Mason built it

## Length audit before sending
- 300–450 words? ✓
- Exactly one concrete project with numbers? ✓
- Agent-directed differentiator paragraph included and confident? ✓
- At least one sentence specific to *this company* that couldn't be copy-pasted into another cover letter? ✓
- No banned phrases? ✓
- Opens with a story or a thesis, not with credentials? ✓
