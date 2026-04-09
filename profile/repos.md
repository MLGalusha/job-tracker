# Repo visibility — what can be shared where

**Rule for drafting skills:** before linking a repo on a resume, in a cover letter, or in an email, check this file. Never link a private repo. VTR is private but live — link the live site, not the repo.

Last audited: 2026-04-09 (verified against `gh repo view` + local `git remote`).

---

## Public — safe to link anywhere

| Project | Link | Notes |
|---|---|---|
| **Staffclaw** | https://github.com/MLGalusha/staffclaw | Full-stack TS monorepo. Went public after a `prepare repo for public release` scrub. Strongest public evidence of full-stack TypeScript + reverse-engineering work. |
| **PianoTranscriber** | https://github.com/MLGalusha/PianoTranscriber | Bootcamp capstone. Public. Strongest public evidence of ML / PyTorch / audio work. |
| **SonicGen** (Truth Engine public snapshot) | https://github.com/MLGalusha/SonicGen | Public-facing version of the Truth Engine work. **Note:** there's also a private `truth-engine` repo that is more current; SonicGen is the safe-to-link version. Last pushed Nov 9 2025. |
| **job-tracker** (this repo) | https://github.com/MLGalusha/job-tracker | The agent-native job search tracker Mason is building. Itself evidence of the workflow. Fine to link in cover letters to agent-friendly companies. |

## Private — do not link repo, but the work can be referenced other ways

| Project | Repo | How to share it |
|---|---|---|
| **Voices That Remain** | `github.com/MLGalusha/letter-archive` (private) | **Link the live site instead:** https://voicesthatremain.com. Mason can also screenshare / live-demo the admin UI and pipeline in interviews, including the HITL review flow. The repo stays private because the archive contains real historical letters with PII and because the production credentials are tangled with the code. |
| **Truth Engine** (current) | `github.com/MLGalusha/truth-engine` (private) | Use the SonicGen link above when a code link is required. Talk about the pipeline freely in interviews. |

## Not pushed anywhere (local only)

| Project | Why it's not public |
|---|---|
| **OpenClaw / google-api-tools** | No `.gitignore` exists, `credentials.json` / `token.json` are in the working tree, and Teamworxs creds are hardcoded in multiple source files. Cannot be published without a full secret-scrubbing pass. Reference in writing, never link. |
| **line-finder** | Tiny personal playground, no remote. |

---

## What to do when a resume / cover letter needs a "here's the code" link

- **Full-stack TypeScript role** → link **Staffclaw** first; it's the best public full-stack evidence.
- **AI / ML role** → link **PianoTranscriber** (ML training) or **SonicGen** (audio engineering), depending on which is closer to the JD.
- **Agent-directed / AI-native / FDE role** → link **job-tracker** as "here's an agent-native tool I'm building right now," plus **voicesthatremain.com** as "here's the production system I shipped."
- **Generic / cautious cover letter** → **voicesthatremain.com** is the single strongest artifact; lead there.

## What to do when a VTR demo is needed

- Mason can **screenshare the live site + admin UI** in interviews. The admin side (transcription review, metadata editor, HITL gate) is the technically impressive part and is worth showing even though it's behind auth.
- Mason **cannot share the VTR repo itself** — do not offer to send it.
