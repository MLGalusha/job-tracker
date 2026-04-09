---
name: application-logger
description: Log anything about a job application — new application, status change, email received/sent, phone call, note, artifact updated. Use this whenever Mason mentions a job he saw, applied to, heard back from, or wants to track. Natural language in, validated events out. Wraps the pnpm log write gate so the data layer stays correct.
---

# application-logger

This skill is the only correct way to mutate the job tracker's state. It takes natural-language intent from Mason and produces one or more validated event-log commands via the `pnpm log` write gate.

**Never** edit `data/events.jsonl`, `data/applications.json`, `data/communications.json`, or any derived file directly. Never ask the user to. Every mutation flows through `pnpm log`.

---

## When to invoke this skill

Use it whenever Mason says anything that implies a state change on an application. Examples:

- "I saw a founding engineer role at Cognition on HN, track it"
- "I just applied to the Anthropic FDE job"
- "A recruiter from Pryon emailed me asking about availability"
- "I replied to the Cognition recruiter saying I'm free Tuesday"
- "Mark the Cognition one as screening"
- "Rejected from the Scale AI role"
- "Add a note that the Pryon recruiter mentioned they want someone local"
- "I finished the resume for the Anthropic one"
- "Research is done on the Cognition role"

If Mason is *just talking* about a role without implying a state change ("I'm thinking about applying to X" is fine to discuss without logging — "track X" or "I applied to X" is not), don't log. When in doubt, ask.

---

## The pipeline

### 1. Decide what to log

Parse Mason's message into one or more of the nine event types. **Never invent a new type.** The closed vocabulary is:

| Event type | When to use it | Required flags |
|---|---|---|
| `application_created` | First time Mason mentions a role with intent to track it (not just "interesting") | `--company`, `--role`, *(optional)* `--url`, `--source`, `--status` |
| `status_changed` | Mason says he applied / got a screen / did an interview / got an offer / got rejected / withdrew / hasn't heard back in >2 weeks (ghosted) | `--app_id`, `--to` *(optional `--from`, `--reason`)* |
| `communication_received` | Recruiter/hiring manager/someone at the company contacted Mason | `--app_id`, `--channel`, `--summary` *(optional `--from`, `--message_ref`)* |
| `communication_sent` | Mason sent them something | `--app_id`, `--channel`, `--summary` *(optional `--to`, `--message_ref`)* |
| `note_added` | Free-form observation that doesn't fit another type | `--app_id`, `--note` |
| `resume_updated` | A tailored resume was written/updated | `--app_id`, `--path` *(optional `--summary`)* |
| `cover_letter_updated` | A tailored cover letter was written/updated | `--app_id`, `--path` *(optional `--summary`)* |
| `research_completed` | Company research file was written | `--app_id`, `--path` |
| `study_guide_generated` | Interview-prep study guide was written | `--app_id`, `--path` |

### 2. Resolve the `app_id`

Every event except `application_created` needs an `app_id`.

- **If the message names an existing application** ("the Cognition one", "Anthropic FDE"), resolve the `app_id` by reading `data/applications.json` and fuzzy-matching on company + role. If exactly one match, use it. If multiple, ask Mason to disambiguate.
- **If Mason is telling you about a brand-new role**, emit an `application_created` event *first*, capture the resulting `app_id` from the command output, then emit any follow-up events against that `app_id`.

Never guess an `app_id` that isn't in `data/applications.json`.

### 3. Closed vocabulary — don't make stuff up

- **Statuses** (for `--to` and `--from`): `interested | applied | screening | interview | offer | rejected | withdrawn | ghosted`. Nothing else.
- **Channels** (for `--channel`): `email | linkedin | phone | sms | in_person | other`. Nothing else.
- **Sources** (free text, `--source`): keep it short and consistent. Examples: `workatastartup`, `hn`, `linkedin`, `direct`, `referral`, `twitter`.

### 4. Run the command(s)

Use Bash to run the log command from the repo root:

```bash
cd ~/Workspace/job && pnpm log <event_type> --flag=value --flag=value
```

Quote any value that contains spaces or special characters:

```bash
cd ~/Workspace/job && pnpm log application_created --company="Cognition" --role="Founding Engineer" --source=hn --url="https://news.ycombinator.com/..."
```

If `pnpm log` errors, **read the error message and fix the input** — don't retry blindly. Common fixes:
- Missing required flag → ask Mason or infer from context
- Invalid status/channel → map to the closest valid vocabulary term, or ask
- `cannot resolve current status` on a `status_changed` → run `application_created` first, or pass `--from` explicitly

### 5. After `application_created`: scaffold the folder

When you create a new application, also create the `applications/<app_id>/` folder with an empty `role.md` starter:

```bash
cd ~/Workspace/job && mkdir -p applications/<app_id> && touch applications/<app_id>/role.md
```

The `role-intake` skill will fill in `role.md` later. You are just creating the directory so the path exists.

### 6. Report back to Mason

After every successful invocation, report:
- What event(s) you logged
- The `app_id` if it's new
- What you *didn't* log because you weren't sure, and what you need from Mason to log it

Keep the report short. Mason should be able to correct you in one reply if you got anything wrong.

---

## Batching multiple events

One natural-language message often implies multiple events. Handle them as a single atomic-looking batch:

> "I just applied to the Cognition founding engineer role I saw on HN."

This is **two** events:
1. `application_created` with `--company=Cognition --role="Founding Engineer" --source=hn`
2. `status_changed --to=applied` on the new `app_id`

Run them in sequence. If event 1 fails, do not run event 2.

---

## Examples

### Example 1 — new application from HN, not yet applied
**Mason:** "Saw a founding eng role at Cognition on HN, track it"

```bash
cd ~/Workspace/job && pnpm log application_created --company="Cognition" --role="Founding Engineer" --source=hn --status=interested
```

Then scaffold the folder. Report: *"Tracked Cognition — Founding Engineer (app_id: 2026-04-09-cognition-founding-engineer). Status: interested. Folder created at applications/2026-04-09-cognition-founding-engineer/."*

### Example 2 — applied to a role from a URL
**Mason:** "I just applied to the Anthropic FDE job — https://jobs.ashbyhq.com/anthropic/..."

Two events:
```bash
cd ~/Workspace/job && pnpm log application_created --company="Anthropic" --role="Forward Deployed Engineer" --url="https://jobs.ashbyhq.com/anthropic/..." --source=direct
cd ~/Workspace/job && pnpm log status_changed --app_id=<from step 1> --to=applied
```

### Example 3 — recruiter email on an existing app
**Mason:** "Recruiter from Pryon emailed me, they want to know availability for next week"

Resolve `app_id` via fuzzy match against `data/applications.json`. If found:
```bash
cd ~/Workspace/job && pnpm log communication_received --app_id=<matched id> --channel=email --summary="Pryon recruiter asking for availability next week"
```

If not found, ask: *"I don't see a Pryon application in the tracker yet — should I create one first?"*

### Example 4 — status change with implicit resolution
**Mason:** "The Cognition one is in screening now"

```bash
cd ~/Workspace/job && pnpm log status_changed --app_id=<matched id> --to=screening
```

(The write gate will auto-resolve `--from` from the current state.)

### Example 5 — ambiguous
**Mason:** "Heard back from them"

Ask: *"Heard back from which application? I see Cognition, Anthropic, and Pryon in the tracker right now."* Do not guess.

---

## What this skill does NOT do

- It does **not** generate resumes, cover letters, research, or study guides. Those are other skills (`resume-tailor`, `cover-letter-writer`, `company-research`, `interview-prep`). This skill only *logs* that those things happened once they exist on disk.
- It does **not** interpret ambiguous state changes. Ghosted, withdrawn, and rejected are three different things — ask Mason which one, don't guess.
- It does **not** edit `data/` files directly. Only `pnpm log`.
- It does **not** scaffold `role.md` contents — that is the `role-intake` skill's job. This skill only creates the empty folder.
