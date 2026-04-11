---
name: job-sourcer
description: Periodically scan a curated list of target company job boards for new postings that match Mason's lanes, and append candidate roles to a sourced-jobs queue for triage. Reads profile/target-companies.md and profile/preferences.md. Produces data/sourced-jobs.jsonl and a short daily digest. Use when Mason says "check for new jobs" or when running on a schedule.
---

# job-sourcer

This skill is the top of the application funnel. Its job is to turn "Mason wakes up and wants to know if any of the ~30 companies he cares about posted a new role in his lanes" into a one command answer. It does not apply to jobs. It does not run `role-intake`. It only surfaces candidates and queues them for Mason to triage.

This is a **spec-only skill at initial build**. The scraping step is stubbed until Mason picks a strategy (manual paste, RSS where available, headless browser, or a hosted scraper). The skill's contract and data model are the stable parts; the fetch layer is swappable.

---

## When to invoke this skill

- Mason says "check for new jobs" or "what's new on the target list"
- A scheduled run (cron, launchd, or similar) fires this skill on a cadence Mason sets
- After `target-companies.md` is edited and Mason wants an immediate refresh

**Do not run this skill if:**
- `profile/target-companies.md` does not exist or is empty
- The fetch layer is not configured and Mason has not said "just do the manual pass"

---

## Prerequisites

1. `profile/target-companies.md` — the list of companies to watch, with their job board URLs
2. `profile/preferences.md` — lane preferences, skip lanes, comp floor, location rules
3. `data/sourced-jobs.jsonl` — append-only queue (created on first run if missing)

---

## Data model

`data/sourced-jobs.jsonl` is one JSON object per line, append-only. Each line:

```json
{
  "id": "<ulid>",
  "t": "<ISO-8601>",
  "company": "<name>",
  "company_slug": "<slug>",
  "role_title": "<title>",
  "role_url": "<url>",
  "source": "<careers_page | greenhouse | lever | ashby | workatastartup | manual>",
  "first_seen_at": "<ISO-8601>",
  "lane_guess": "<founding | ai-engineer | fde | fullstack-ai | local-raleigh | off-lane | unknown>",
  "triage_status": "new",
  "notes": "<optional>"
}
```

`triage_status` is a closed vocabulary:
- `new` — surfaced, not yet reviewed
- `queued` — Mason wants to apply, needs role-intake
- `skipped` — Mason looked and passed
- `applied` — already has an `applications/<app_id>/` entry

The sourcer only ever writes `new` entries. Status transitions happen via a separate triage step (not in this skill).

---

## The pipeline

### 1. Read target list and preferences

Parse `profile/target-companies.md` into a structured list. Each company entry should surface:
- Name
- Slug
- Careers page URL(s)
- Lane tags (which of Mason's lanes this company could fit)
- Last scanned timestamp (if tracked)
- Notes

Read `profile/preferences.md` for:
- Skip lanes (do not surface roles in these lanes)
- Comp floor (filter out obvious below-floor postings where comp is visible)
- Location rules (remote-only, Raleigh-local, etc.)

### 2. Fetch (swappable)

For each company, fetch the current job listings. The fetch layer is abstracted:

- **Manual mode:** prompt Mason to paste the current listings for one company at a time. Slowest but zero-infra.
- **RSS mode:** for companies with public RSS feeds (Greenhouse and Lever both expose these), fetch and parse.
- **HTML scrape mode:** for companies without feeds, scrape the careers page with a headless browser or `fetch` plus a light HTML parser. Brittle but works.
- **Hosted scraper mode:** offload to a third-party jobs API. Expensive but reliable.

**Initial implementation: manual mode only.** The skill prompts Mason to paste the listings for each company that is due for a scan, and parses the paste into structured entries. Other modes are TODO.

### 3. Deduplicate against existing queue

For each candidate role, check if an entry with the same `role_url` already exists in `data/sourced-jobs.jsonl`. If so, skip. If not, it's new.

Also check `data/applications.json` for any `app_id` whose `role_url` matches. If so, mark the candidate as `applied` and do not append a new `new` entry.

### 4. Classify the lane

Use simple keyword heuristics on the role title and (if fetched) the first paragraph of the JD:

- "founding engineer" / "founding AI" → `founding`
- "AI engineer" / "applied AI" / "LLM engineer" → `ai-engineer`
- "forward deployed" / "solutions engineer" (at AI co) → `fde`
- "full stack" / "full-stack" / "product engineer" → `fullstack-ai`
- Raleigh / RTP / Durham location → `local-raleigh`
- Anything else → `unknown`

This is intentionally dumb. The real classification happens in `role-intake` when Mason triages.

### 5. Filter against preferences

Drop any candidate whose `lane_guess` is in Mason's skip lanes from `preferences.md`. Keep everything else, even if the lane is `unknown`.

### 6. Append to the queue

For each surviving candidate, append a line to `data/sourced-jobs.jsonl`. Use a ULID for `id`, ISO-8601 for timestamps.

### 7. Produce the daily digest

Write a short markdown digest to stdout (and optionally to `applications/_digests/<date>.md`):

```markdown
# Sourced jobs — <date>

**New since last run: <n>**

## By lane
- founding: <n>
- ai-engineer: <n>
- fullstack-ai: <n>
- ...

## Top candidates (hand-picked)
1. **<Company> — <Role>** ([link](<url>)) — <one sentence why it looks good>
2. ...

## Full list
<company>:
  - <role title> — <url>
<company>:
  - ...
```

"Top candidates" are the three roles most likely to be worth Mason's time, picked by:
- Lane match to Mason's top preferences
- Company stage (Series A to Series C is the sweet spot)
- Freshness (posted in the last seven days if visible)

### 8. Update last-scanned timestamps

Optionally touch `profile/target-companies.md` with a "last_scanned" date per company, or write to a sibling `data/scan-state.json` if editing the profile file feels too heavy.

### 9. Report to Mason

Print the digest. Under 300 words. Mason should be able to skim it in 30 seconds and decide which ones get `role-intake`'d.

---

## Rules and guardrails

- **Never run `role-intake` from inside this skill.** The sourcer's only job is to surface. Mason decides what gets intake'd.
- **Never skip the dedup step.** A re-run that re-adds the same role as `new` will corrupt Mason's trust in the queue.
- **Never filter by comp unless comp is explicit in the listing.** Most listings hide comp; inferring "probably below floor" from stage is lossy.
- **Never scrape aggressively.** Respect robots.txt. Use polite rate limits. If a company's site blocks the fetch, fall back to manual mode for that company and log a note.
- **Never promote a candidate past `new`.** Status transitions happen in triage, not sourcing.
- **Voice rules apply to the digest.** No em-dashes, hyphen compounds, tildes, or arrows in prose. Lists and tables are fine.
- **The file `data/sourced-jobs.jsonl` is append-only.** Never rewrite it. If a candidate needs updating (e.g., the role URL changed), append a new entry with a note referencing the old `id`.

---

## Open questions (Mason to decide before first real run)

1. **Fetch strategy per tier of company.** Manual is fine for the top 5; RSS for the middle 20; HTML scrape for the long tail. Mason needs to decide the cutoffs.
2. **Schedule.** Daily, weekly, or event driven (only when Mason asks).
3. **Digest delivery.** Stdout, markdown file, email, or local notification.
4. **Triage UI.** How Mason moves entries from `new` to `queued` or `skipped`. Probably a small CLI or a web view. Until then, edit the JSONL by hand.

---

## What this skill does NOT do

- Does **not** run `role-intake`. That's a separate decision.
- Does **not** write cover letters or resumes.
- Does **not** apply to jobs.
- Does **not** edit `profile/target-companies.md` except for optional last-scanned timestamps.
- Does **not** modify existing lines in `data/sourced-jobs.jsonl`. Append only.
