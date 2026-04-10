---
app_id: 2026-04-09-zed-industries-ai-rust-engineer
company: Zed Industries
role: AI Rust Engineer
loop_typology: ai-native
interview_stage: unknown
interview_date: unknown
study_budget_hours: 28
generated_at: 2026-04-10
---

# Interview Prep: Zed Industries, AI Rust Engineer

## Loop typology: ai-native

Zed is a ~41-person engineer-led company (ex-Atom/Tree-sitter founders), pair programming culture, weekly shipping, open source built in public. No LeetCode signal in the JD. Expect: a pairing session or take-home, a founder/eng conversation probing product sense and technical depth, and possibly a work trial. Nathan Sobo is likely part of the loop for AI Foundations hires.

## Leverage cards (Mason's 2-3 strongest for this loop)

1. **VTR's HITL pipeline with cost-tiered model selection (GPT-5.4 vs GPT-5.4-mini).** This is exactly what the JD means by "building production systems powered by large language models" and "integrating AI capabilities into real software products." Mason can walk through real cost math, real prompt tuning decisions, and real structured output schemas from a live system.

2. **SonicGen as the "I can write code by hand" counter-evidence.** The JD says "experience with Rust, or willingness to learn." Mason has zero Rust. The SonicGen story (14k lines of Python, no agents, constellation hashing from scratch) is the proof that he can learn a hard technical thing by building. The DEEP_DIVE.md makes this concrete.

3. **Agent-directed development as daily practice.** The JD explicitly lists "experience with tool-using or agent-style models" in preferred. Mason doesn't just use these tools. He shipped a production system this way (VTR) and built a job-tracker that is itself agent-native. This is the differentiator against Rust/systems candidates who are strong on the language but weaker on the AI product side.

## Study budget

28 hours total. 7 days, 4 hours per day.

### Allocation (ai-native loop, adjusted)

| Category | Hours | % |
|---|---|---|
| Project defensibility (crown jewel + others) | 12 | 43% |
| Rust fundamentals (blocking gap) | 6 | 21% |
| Company-specific study (Zed codebase, ACP, Sobo writing) | 4 | 14% |
| Adjacent concepts | 3 | 11% |
| Behavioral / story rehearsal | 3 | 11% |
| LeetCode | 0 | 0% |
| System design (traditional) | 0 | 0% |

## Priority order

1. **Rust Book chapters 1-10 + a small CLI project** (6h). Blocking gap. The JD's "willingness to learn" escape hatch is real, but showing up having written zero Rust would be a disqualifying failure. Goal: enough Rust to read and modify Zed code, not fluency. Build one small thing (a CLI that does text processing) so you have something to point to.
2. **VTR crown-jewel defensibility at three narration lengths** (4h). The #1 project on the resume. Rehearse at 3 minutes, 10 minutes, and 30 minutes. The 3 minute version should hit: HITL pipeline, structured outputs, cost-tiered model selection, guillemet tagging, 58k LOC, solo agent-directed. The 10 minute version adds: entity resolution with fuzzy matching, notification sweeper, filename-driven ingest, two worker deployment modes. The 30 minute version adds: specific schema decisions (20 tables), middleware stack, Cloud Build pipeline details, why you'd add OpenTelemetry next.
3. **SonicGen defensibility** (3h). Second project on the resume. Numbers to cite cold: 16 kHz, 2048 FFT, 25x25 neighborhood, fan value 3, max delta-t 400, SHA1[:20], min 18 aligned matches, 40% ratio. The key insight to land: alignment-offset matching, not hash-count matching. Practice the Supabase retrospective until it sounds natural, not rehearsed.
4. **Navigate the Zed codebase** (3h). Clone zed-industries/zed. Read the crates/ layout. Find the AI crate and the agent panel code. Understand how ACP connects. Be able to say "I cloned the repo and read through the AI crate, here's what I noticed" in the interview. This is also the first step toward the PR artifact.
5. **Staffclaw + PianoTranscriber defensibility** (2h). Third and fourth projects. Staffclaw: the 92-endpoint mapping story, transparent client architecture, auto-scheduler as the hard unsolved problem. PianoTranscriber: sliding window (240 in, predict 80), out-of-core batching (130 parquet chunks), honest framing on model accuracy.
6. **Read Sobo's writing** (1h). The "Craftsmanship in the Era of Vibes" essay (have a real opinion, not just "I liked it"). The "Agentic Engineering" framing. The Sequoia Training Data podcast. The Changelog #640 episode. You need to be able to reference these specifically, not generically.
7. **LLM evaluation systems** (2h). The JD asks for "designing evaluation systems for LLM-driven products." Mason doesn't have this. Study plan: read Anthropic's evals guidance and OpenAI's evals framework docs. Be ready to sketch how you'd build an eval system for VTR: a ground-truth transcription test set (50 letters with verified transcripts), edit-distance or BLEU on transcripts, entity extraction F1, a regression gate before deploying prompt changes. You don't need to have built this. You need to be able to describe how you would.
8. **Adjacent concepts review** (1h). See section below.
9. **Behavioral rehearsal** (3h). See section below.

## Blocking gaps

### Rust (6 hours)

- **Why it's blocking:** the role title is "AI Rust Engineer." Mason has zero Rust. The "willingness to learn" escape hatch is explicitly in the JD, but showing up with no Rust at all, not even having read the Rust Book, would signal that "willingness" is hypothetical rather than active.
- **Study plan:** Rust Book chapters 1-10 (ownership, borrowing, lifetimes, structs, enums, error handling, traits, generics). Then build a small CLI tool (a text processing utility or a file parser) to have something concrete. Use the Zed codebase as reading material after the book chapters.
- **What good enough looks like:** Mason can read and modify Rust code with compiler guidance. He doesn't need to be fluent. He needs to demonstrate that he's started and that the compiler is his teacher, not a wall.

### Formal LLM evaluation systems (2 hours)

- **Why it's blocking:** JD preferred, and DeltaDB (the product the AI Foundations team is building) is explicitly about evaluating AI systems. If asked "how would you evaluate whether AI suggestions actually improve software," Mason needs a real answer, not a hand-wave.
- **Study plan:** read Anthropic's evals docs and OpenAI's evals framework. Sketch a VTR eval system on paper: test set of 50 verified transcripts, edit-distance metrics, entity extraction precision/recall, regression gate on prompt changes. Be ready to walk through it in 5 minutes.
- **What good enough looks like:** Mason can describe a concrete eval plan with real metrics, a real test set, and a real gate. He doesn't need to have built it. He needs to sound like someone who would build it correctly if asked.

### Systems programming vocabulary (1 hour, included in adjacent concepts)

- **Why it's semi-blocking:** JD says "strong backend or systems programming experience." Mason's backend is application-layer TypeScript. He can't claim systems programming in the Rust/C++/compilers sense. But he can frame SonicGen's DSP work as "lower-level than typical web backends" and name the specific systems concepts he'd want to learn on Zed's stack (event loops, incremental recomputation, tree-sitter parsing, GPU rendering via GPUI).
- **What good enough looks like:** honest framing. "My backend experience is application-layer TypeScript and Python, not systems programming in the compiler sense. But SonicGen showed me I can go lower level when the problem demands it, and I want to learn Zed's stack."

## Defensibility cards

### Voices That Remain (crown jewel)

**What I built (30 seconds):**
A digital archive for historical personal letters, live at voicesthatremain.com. It has an AI pipeline that transcribes handwritten letter images with OpenAI Vision, extracts metadata with structured outputs, resolves entities with fuzzy matching, and builds a relationship graph. A human confirms every transcript before anything downstream runs. About 58,000 lines of TypeScript, 547 commits, 20 database tables, deployed on Google Cloud. Built solo with coding agents in roughly three weeks of focused work.

**Likely questions:**
- Walk me through the AI pipeline.
- How does the human verification gate work?
- How do you handle entity resolution when names from 200-year-old letters don't match cleanly?
- What's your approach to prompt engineering? Do you version prompts?
- Why did you choose to build a human gate instead of running everything automatically?
- How does the notification system work?

**Questions I need a crisp answer for:**
- How would you build an eval system for the transcription pipeline? (See blocking gaps section)
- What's the false positive rate on entity matching? (Honest answer: I don't have formal metrics. The review queue catches low-confidence matches. I'd add precision/recall tracking if I were hardening this.)
- Why no message queue? (Answer: one worker, batch size 5, 5 second polls. A queue is another service to manage for throughput I don't need.)
- How do zero-downtime migrations work with Cloud Build? (Answer: Cloud Build runs migrations as a separate job before deploying new code, so old code never sees a schema it doesn't understand.)

**How I answer when I don't know:**
"I haven't built that part yet, but here's how I'd approach it" followed by a specific plan. Never fake it. The VTR study guide has the full detail.

### SonicGen

**What I built (30 seconds):**
A Shazam-style audio fingerprinting engine written from scratch in Python, no coding agents. It takes a query audio clip, computes constellation hashes from spectral peaks, looks them up in a database, and determines whether the clip matches anything stored and where. About 14,000 lines, Sep through Dec 2025.

**Likely questions:**
- Why did you build it by hand instead of using agents?
- Walk me through the matching algorithm.
- What's the key insight of alignment-offset matching?
- Why was Supabase the wrong choice?
- How would you scale this?

**Questions I need a crisp answer for:**
- What's the false positive rate? (Honest: empirically tuned thresholds, no formal evaluation set. A production system needs labeled ground truth.)
- Why SHA1 and not a faster hash? (Just needed uniform distribution. xxHash or CRC32 would be faster for production.)
- What happens with re-encoded audio? (Resampling to 16 kHz handles rate changes. Lossy compression shifts peak locations and degrades matching. Untested at scale.)

**How I answer when I don't know:**
Cite what I built, name what I didn't test, and describe what I'd do next. The SonicGen study guide has the full Q&A.

### Staffclaw

**What I built (30 seconds):**
A workforce scheduling tool built on top of a reverse-engineered API. I used an agent to map all 92 undocumented endpoints of our scheduling software in one session, including manager routes I didn't have access to. Then built a transparent client: you log in with your existing credentials and every read/write proxies through the real API. Layered in external data (showtimes, weather, events) as input for an auto-scheduler. Full stack TypeScript monorepo.

**Likely questions:**
- How did the agent map 92 endpoints?
- What's the transparent client architecture?
- How does the auto-scheduler work? (Honest: it doesn't yet. The multi-source data layer exists to feed it, but the scheduling optimization is the hard unsolved problem.)

**Questions I need a crisp answer for:**
- Any legal/ethical concerns with reverse-engineering the API? (Answer: I only access data I'm authorized to see using my own credentials. The manager routes I mapped but don't call. No scraping of other users' data.)

### PianoTranscriber

**What I built (30 seconds):**
A CNN that transcribes piano audio into digital sheet music. Trained on the MAESTRO dataset, about 200 hours of classical piano, roughly 100 GB preprocessed. Sliding window architecture: 240 frames in, predict the middle 80. The full pipeline runs end to end: audio to spectrogram to CNN to MIDI to sheet music. Built in a two-week sprint at the end of a 6 month bootcamp.

**Likely questions:**
- Why a CNN instead of a transformer?
- How did you handle the dataset not fitting in memory?
- What's the model accuracy?

**Questions I need a crisp answer for:**
- Model accuracy was not SOTA. Honest: "The pipeline was complete and worked end to end. The model accuracy needs more work. A production version would use a transformer encoder."

## Adjacent concepts to review

These are things Mason has shipped under different names. An interviewer might use the standard term.

- **Locality-sensitive hashing (LSH)** — SonicGen's constellation hashing is in the LSH family. If someone says "LSH" Mason should recognize it and connect to his work.
- **Non-maximum suppression** — the 25x25 peak-finding filter in SonicGen is a form of NMS. Common in computer vision (YOLO, R-CNN). Know the general concept.
- **Structured output / function calling / tool use** — Mason ships this with OpenAI. Know that Anthropic calls it "tool use" and the parameter shapes differ slightly. Zed integrates Claude via ACP, which has its own tool protocol.
- **Language Server Protocol (LSP)** — Zed calls ACP "the LSP for AI agents." Know what LSP is (client-server protocol between editors and language tooling), how it maps to ACP (same pattern but for AI agent capabilities instead of language features), and why Zed cares about standardizing it.
- **Incremental computation / CRDT** — Zed's real-time collaboration uses CRDTs. Mason hasn't touched these. Know what a CRDT is (conflict-free replicated data type), why it matters for collaborative editing (no central server needed for conflict resolution), and be ready to say "I haven't worked with CRDTs but I understand the use case."

## Company-specific study

- **Read Sobo's "Craftsmanship in the Era of Vibes" essay** ([zed.dev/blog/software-craftsmanship-in-the-era-of-vibes](https://zed.dev/blog/software-craftsmanship-in-the-era-of-vibes)). Have a specific opinion: Mason's take is that the bottleneck on agent work is judgment about what belongs where, not code quality in isolation. SonicGen's Supabase mistake is the concrete example.
- **Read the ACP spec** ([zed.dev/acp](https://zed.dev/acp)). Understand what it standardizes, why JetBrains adopted it, and what it means for editor-agnostic agent tooling. This is the product surface the AI Foundations team works on.
- **Clone and navigate zed-industries/zed.** Read the crates/ layout. Find the AI crate. Find the agent panel code. Understand how ACP messages flow from the editor to the agent. Be able to say something specific about the codebase in the interview.
- **Listen to the Sequoia Training Data podcast** with Sobo ("Why IDEs Won't Die in the Age of AI Coding"). Note any positions that differ from the blog post or add nuance.
- **DeltaDB:** the AI Foundations team is building it. The JD describes it as "capturing the operational history of software development." Think about: what does "operational history" mean (edits, discussions, AI interactions, refactors)? How would you store it? How would you make it useful for AI reasoning about evolving codebases? This is the product you'd be working on. Having a sketch of how you'd approach it is high leverage.

## Question bank

Questions Mason should be ready for, tied to specific resume lines and JD requirements.

1. **"How do you decide which model to use for which task?"** (Ties to: VTR cost-tiered model selection, JD "strong understanding of model behavior") Answer with the GPT-5.4 vs GPT-5.4-mini split. Specific cost math if possible.

2. **"Walk me through a time you built an evaluation for an AI feature."** (Ties to: JD "designing evaluation systems", resume-gaps.md) Honest: "I haven't built a formal eval system yet. Here's how I'd build one for VTR." Then sketch it.

3. **"How do you handle AI-generated content that's wrong?"** (Ties to: VTR HITL gate) This is a softball. Walk through the verification gate, corrections flowing downstream, and why you chose this architecture.

4. **"Tell me about a technical decision you got wrong and what you learned."** (Ties to: SonicGen Supabase retrospective) This is the Supabase story. Keep it crisp: what I chose, why, what went wrong, what I'd choose instead, and the meta-lesson (picking tools you want to learn vs tools the problem needs).

5. **"How would you approach learning Rust for this role?"** (Ties to: JD "willingness to learn", blocking gap) If you've done the Rust Book + CLI project, cite them. "I've worked through the first ten chapters and built [specific thing]. The compiler is a better teacher than any course. I'd want to pair with someone on the team for my first Zed PR."

6. **"You shipped VTR solo. How do you work on a team?"** (Ties to: JD "pair programming", red flags in company.md) Honest: "Most of my work has been solo with agents. I'd welcome pairing. The honest framing is that I ship solo by directing agents, and I'm looking forward to learning how your team pairs on agent-directed work."

7. **"What interests you about DeltaDB?"** (Ties to: JD, company.md AI Foundations team) Have a specific answer about the "operational history" framing. What would you want to capture? How would you make it useful for AI reasoning?

8. **"Why Zed specifically?"** Never say "I love your product." Say something specific about a decision. The ACP open standard bet, the craftsmanship essay, the fact that Claude Code runs natively in Zed via ACP. One of these, not all three.

## Questions for them

1. "The craftsmanship essay talks about code quality enabling AI tools. On the AI Foundations team, how do you measure whether DeltaDB is actually helping AI reason about codebases better, versus just adding another data source?" (Grounded in: Sobo's essay + DeltaDB's stated purpose)

2. "ACP standardizes the editor-to-agent protocol. What's the hardest interoperability problem you've hit now that JetBrains is adopting it?" (Grounded in: ACP + JetBrains adoption from company.md)

3. "The JD mentions the AI Foundations team is new. What does the first six months look like for someone joining now, in terms of what you're trying to ship versus what you're still figuring out?" (Grounded in: company.md "brand new team" signal)

4. "How does pair programming work when one person is directing agents and the other is writing Rust by hand? Do you have patterns for that?" (Grounded in: pair programming culture + agent-directed work tension from red flags)

## Day-by-day plan (unknown interview date, priority-sorted)

**Day 1 (4h):** Rust Book chapters 1-5 (ownership, borrowing, references, structs, enums).
**Day 2 (4h):** Rust Book chapters 6-10 (error handling, traits, generics, lifetimes). Start a small CLI.
**Day 3 (4h):** VTR defensibility rehearsal. Practice the 3-minute, 10-minute, and 30-minute versions aloud. Record yourself if possible.
**Day 4 (4h):** SonicGen defensibility (2h). Clone Zed repo and navigate (2h).
**Day 5 (4h):** Read Sobo essay + ACP spec + podcast (1h). LLM eval systems study (2h). Staffclaw + PianoTranscriber defensibility (1h).
**Day 6 (4h):** Adjacent concepts review (1h). Behavioral rehearsal: practice answers to question bank aloud (3h).
**Day 7 (4h):** Full mock run: tell yourself the VTR story, the SonicGen story, the Supabase mistake story, the "why Zed" answer, and the "questions for them." Then spend remaining time on the weakest area from the week.

## If you only have 4 hours left

1. **VTR crown-jewel at 3-minute and 10-minute lengths** (1.5h). This is the thing that will carry the interview. Practice aloud until the 3-minute version is automatic. The 10-minute version should cover the pipeline, the HITL gate, the cost-tiered model split, and one concrete number (58k LOC, 547 commits, 20 tables).

2. **SonicGen alignment-offset insight + Supabase retrospective** (1h). Two things to nail: (1) the matching trick is alignment-offset, not hash-count, and (2) the Supabase story as an honest "I got it wrong and here's what I learned." These are the two most likely deep-dive questions.

3. **Skim the Zed codebase and the craftsmanship essay** (1.5h). Clone the repo, find the AI crate, read 2-3 files. Read the Sobo essay and have one specific opinion. These give you something concrete to reference instead of generic praise.
