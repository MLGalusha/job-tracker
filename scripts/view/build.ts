#!/usr/bin/env tsx
/**
 * Static dashboard builder.
 *
 * Reads:
 *   - data/applications.json
 *   - data/events.jsonl
 *   - applications/<id>/company.md   (frontmatter)
 *   - applications/<id>/artifact.md  (frontmatter + body for deliverable)
 *   - applications/<id>/outreach/*.md (frontmatter)
 *
 * Writes:
 *   - web/dist/index.html  (single file, open in a browser)
 *
 * Zero dependencies. No framework, no build step. Re-run after logging events.
 *
 *   pnpm dashboard
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = join(dirname(__filename), "..", "..");

// ---------- types ----------

type Application = {
  id: string;
  company: string;
  role: string;
  role_url?: string;
  source?: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_status_change?: string;
  status_history?: Array<{ from: string; to: string; at: string; reason?: string }>;
  artifacts?: Record<string, string>;
  notes?: Array<{ t: string; note: string }>;
};

type Event = Record<string, unknown> & {
  id: string;
  t: string;
  type: string;
  app_id?: string;
};

type CompanyMeta = {
  company?: string;
  artifact_fit?: "strong" | "optional" | "none" | string;
  artifact_idea?: string;
  grounded_decisions_count?: string;
};

type ArtifactMeta = {
  flavor?: string;
  status?: "scoped" | "in_progress" | "shipped" | "abandoned" | string;
  time_budget_days?: string;
  started_at?: string;
  shipped_at?: string;
  shipped_url?: string;
  deliverable?: string;
};

type OutreachMeta = {
  file: string;
  slug: string;
  to_name?: string;
  to_role?: string;
  channel?: string;
  one_take_source?: string;
  artifact_link?: string;
  drafted_at?: string;
  sent_at?: string;
};

type AppBundle = {
  app: Application;
  company: CompanyMeta | null;
  artifact: ArtifactMeta | null;
  outreach: OutreachMeta[];
  events: Event[];
  validArtifactLinks: Record<string, string>;
  nextAction: string;
};

// ---------- loaders ----------

const applicationsPath = join(repoRoot, "data", "applications.json");
const eventsPath = join(repoRoot, "data", "events.jsonl");
const outDir = join(repoRoot, "web", "dist");
const outPath = join(outDir, "index.html");

const applications: Application[] = existsSync(applicationsPath)
  ? JSON.parse(readFileSync(applicationsPath, "utf-8"))
  : [];

const events: Event[] = existsSync(eventsPath)
  ? readFileSync(eventsPath, "utf-8")
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line))
  : [];

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const eq = line.indexOf(":");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    fm[key] = val;
  }
  return fm;
}

function extractDeliverable(content: string): string | undefined {
  // Grab the first paragraph under "## Deliverable"
  const match = content.match(/##\s+Deliverable\s*\n+([^\n]+(?:\n[^\n#][^\n]*)*)/);
  if (!match) return undefined;
  return match[1].trim();
}

function loadCompanyMeta(appId: string): CompanyMeta | null {
  const p = join(repoRoot, "applications", appId, "company.md");
  if (!existsSync(p)) return null;
  const fm = parseFrontmatter(readFileSync(p, "utf-8"));
  return {
    company: fm.company,
    artifact_fit: fm.artifact_fit,
    artifact_idea: fm.artifact_idea,
    grounded_decisions_count: fm.grounded_decisions_count,
  };
}

function loadArtifactMeta(appId: string): ArtifactMeta | null {
  const p = join(repoRoot, "applications", appId, "artifact.md");
  if (!existsSync(p)) return null;
  const content = readFileSync(p, "utf-8");
  const fm = parseFrontmatter(content);
  return {
    flavor: fm.flavor,
    status: fm.status,
    time_budget_days: fm.time_budget_days,
    started_at: fm.started_at,
    shipped_at: fm.shipped_at,
    shipped_url: fm.shipped_url,
    deliverable: extractDeliverable(content),
  };
}

function loadOutreach(appId: string): OutreachMeta[] {
  const dir = join(repoRoot, "applications", appId, "outreach");
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir).filter((f) => f.endsWith(".md"));
  return entries.map((file) => {
    const fm = parseFrontmatter(readFileSync(join(dir, file), "utf-8"));
    return {
      file,
      slug: file.replace(/\.md$/, ""),
      to_name: fm.to_name,
      to_role: fm.to_role,
      channel: fm.channel,
      one_take_source: fm.one_take_source,
      artifact_link: fm.artifact_link,
      drafted_at: fm.drafted_at,
      sent_at: fm.sent_at,
    };
  });
}

// ---------- helpers ----------

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 10);
};

const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 16).replace("T", " ");
};

const daysSince = (iso?: string): number | null => {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  return Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
};

function deriveNextAction(b: AppBundle): string {
  const { app, company, artifact, outreach } = b;
  const fit = company?.artifact_fit;
  const hasOutreachSent = outreach.some((o) => o.sent_at && o.sent_at.length > 0);
  const hasOutreachDraft = outreach.length > 0;

  if (app.status === "rejected" || app.status === "withdrawn" || app.status === "offer") {
    return `Status: ${app.status} — no action`;
  }

  if (fit === "strong" || fit === "optional") {
    if (!artifact) return "Scope artifact via `application-artifact`";
    if (artifact.status === "scoped") {
      const started = daysSince(artifact.started_at);
      return `Start building artifact${started !== null ? ` (scoped ${started}d ago)` : ""}`;
    }
    if (artifact.status === "in_progress") {
      const budget = Number(artifact.time_budget_days ?? "0");
      const elapsed = daysSince(artifact.started_at) ?? 0;
      if (budget > 0 && elapsed > budget * 1.5) return `Over budget (${elapsed}d / ${budget}d) — check kill criteria`;
      return `Ship artifact (${elapsed}d / ${budget}d)`;
    }
    if (artifact.status === "shipped" && !hasOutreachSent) {
      if (hasOutreachDraft) return "Send outreach (draft ready)";
      return "Draft outreach via `outreach`";
    }
    if (artifact.status === "abandoned") return "Artifact abandoned — reroute or drop target";
  }

  if (hasOutreachDraft && !hasOutreachSent) {
    return "Send outreach (draft ready)";
  }
  if (hasOutreachSent) {
    const latest = outreach
      .map((o) => o.sent_at)
      .filter((s): s is string => !!s)
      .sort()
      .pop();
    const days = daysSince(latest);
    if (days !== null && days > 14) return `Follow up or move on (sent ${days}d ago)`;
    return `Wait on outreach (sent ${days}d ago)`;
  }

  // Fall through by status
  if (app.status === "interested") return "Research company or draft outreach";
  if (app.status === "applied") return "Wait for reply";
  if (app.status === "screening" || app.status === "interview") return `Prep via interview-prep skill`;
  if (app.status === "ghosted") return "Follow up or archive";
  return "No clear next action";
}

function validateArtifactLinks(app: Application): Record<string, string> {
  if (!app.artifacts) return {};
  const valid: Record<string, string> = {};
  for (const [key, relPath] of Object.entries(app.artifacts)) {
    const absPath = join(repoRoot, relPath);
    if (existsSync(absPath)) valid[key] = relPath;
  }
  return valid;
}

// ---------- build bundles ----------

const eventsByApp = new Map<string, Event[]>();
for (const e of events) {
  if (!e.app_id) continue;
  const id = String(e.app_id);
  if (!eventsByApp.has(id)) eventsByApp.set(id, []);
  eventsByApp.get(id)!.push(e);
}

const bundles: AppBundle[] = applications.map((app) => {
  const company = loadCompanyMeta(app.id);
  const artifact = loadArtifactMeta(app.id);
  const outreach = loadOutreach(app.id);
  const appEvents = (eventsByApp.get(app.id) ?? []).slice().sort((a, b) =>
    String(b.t).localeCompare(String(a.t))
  );
  const validArtifactLinks = validateArtifactLinks(app);
  const bundle: AppBundle = {
    app,
    company,
    artifact,
    outreach,
    events: appEvents,
    validArtifactLinks,
    nextAction: "",
  };
  bundle.nextAction = deriveNextAction(bundle);
  return bundle;
});

// Attach shipped artifact URLs (from events or artifact.md) for targets summary
const statusCounts = new Map<string, number>();
for (const a of applications) {
  statusCounts.set(a.status, (statusCounts.get(a.status) ?? 0) + 1);
}

// Sort bundles: active first (not rejected/withdrawn), then by last update desc
const statusRank: Record<string, number> = {
  offer: 0,
  interview: 1,
  screening: 2,
  applied: 3,
  interested: 4,
  ghosted: 5,
  withdrawn: 6,
  rejected: 7,
};
const sortedBundles = bundles.slice().sort((a, b) => {
  const ra = statusRank[a.app.status] ?? 99;
  const rb = statusRank[b.app.status] ?? 99;
  if (ra !== rb) return ra - rb;
  return b.app.updated_at.localeCompare(a.app.updated_at);
});

// ---------- render ----------

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    interested: "#9aa0a6",
    applied: "#4285f4",
    screening: "#fbbc04",
    interview: "#ea8f00",
    offer: "#34a853",
    rejected: "#ea4335",
    withdrawn: "#9aa0a6",
    ghosted: "#9aa0a6",
  };
  const color = colors[status] ?? "#9aa0a6";
  return `<span class="badge" style="background:${color}">${esc(status)}</span>`;
};

const artifactStatusBadge = (status?: string) => {
  if (!status) return "";
  const colors: Record<string, string> = {
    scoped: "#6b7280",
    in_progress: "#4285f4",
    shipped: "#34a853",
    abandoned: "#9aa0a6",
  };
  const color = colors[status] ?? "#6b7280";
  return `<span class="badge" style="background:${color}">${esc(status)}</span>`;
};

const fitBadge = (fit?: string) => {
  if (!fit) return "";
  const cls = fit === "strong" ? "fit-strong" : fit === "optional" ? "fit-optional" : "fit-none";
  return `<span class="fit-badge ${cls}">${esc(fit)}</span>`;
};

const renderArtifactBlock = (a: ArtifactMeta) => {
  const budget = a.time_budget_days ? Number(a.time_budget_days) : null;
  const elapsed = daysSince(a.started_at);
  const budgetLine =
    budget !== null && elapsed !== null
      ? `<span class="muted">${elapsed}d / ${budget}d</span>`
      : "";
  const shipped = a.shipped_url
    ? `<div class="small"><a href="${esc(a.shipped_url)}" target="_blank">${esc(a.shipped_url)}</a></div>`
    : "";
  return `
    <div class="block">
      <div class="block-head">
        <span class="block-label">artifact</span>
        ${artifactStatusBadge(a.status)}
        ${a.flavor ? `<span class="muted">${esc(a.flavor)}</span>` : ""}
        ${budgetLine}
      </div>
      ${a.deliverable ? `<div class="small">${esc(a.deliverable)}</div>` : ""}
      ${shipped}
    </div>`;
};

const renderOutreachBlock = (items: OutreachMeta[]) => {
  if (items.length === 0) return "";
  const rows = items
    .map((o) => {
      const state = o.sent_at
        ? `<span class="badge" style="background:#34a853">sent ${esc(fmtDate(o.sent_at))}</span>`
        : `<span class="badge" style="background:#6b7280">drafted ${o.drafted_at ? esc(fmtDate(o.drafted_at)) : ""}</span>`;
      return `
        <li>
          ${state}
          <strong>${esc(o.to_name ?? "—")}</strong>
          ${o.to_role ? `<span class="muted">${esc(o.to_role)}</span>` : ""}
          <div class="small muted">${esc(o.slug)}.md${o.channel ? ` · ${esc(o.channel)}` : ""}</div>
        </li>`;
    })
    .join("");
  return `
    <div class="block">
      <div class="block-head">
        <span class="block-label">outreach</span>
        <span class="muted">${items.length} draft${items.length === 1 ? "" : "s"}</span>
      </div>
      <ul class="outreach-list">${rows}</ul>
    </div>`;
};

const renderCompanyBlock = (c: CompanyMeta) => {
  if (!c.artifact_fit && !c.grounded_decisions_count) return "";
  return `
    <div class="block">
      <div class="block-head">
        <span class="block-label">research</span>
        ${fitBadge(c.artifact_fit)}
        ${c.grounded_decisions_count ? `<span class="muted">${esc(c.grounded_decisions_count)} grounded decision${c.grounded_decisions_count === "1" ? "" : "s"}</span>` : ""}
      </div>
      ${c.artifact_idea ? `<div class="small">${esc(c.artifact_idea)}</div>` : ""}
    </div>`;
};

const renderBundle = (b: AppBundle) => {
  const { app, company, artifact, outreach, events: appEvents, validArtifactLinks, nextAction } = b;

  const artifactLinks = Object.entries(validArtifactLinks)
    .map(
      ([k, v]) =>
        `<a href="../../${esc(v)}" class="artifact-link">${esc(k)}</a>`
    )
    .join(" ");

  const statusAge = daysSince(app.last_status_change ?? app.updated_at);
  const statusAgeLabel =
    statusAge !== null
      ? `<span class="muted">${statusAge}d in status</span>`
      : "";

  const eventRows = appEvents
    .map(
      (e) =>
        `<tr><td>${fmtDateTime(String(e.t))}</td><td>${esc(String(e.type))}</td><td class="mono">${esc(
          JSON.stringify(
            Object.fromEntries(
              Object.entries(e).filter(([k]) => !["id", "t", "type", "app_id"].includes(k))
            )
          )
        )}</td></tr>`
    )
    .join("");

  return `
  <section class="app">
    <header>
      <div class="app-title">
        <h3>${esc(app.company)}</h3>
        <div class="muted">${esc(app.role)}</div>
      </div>
      <div class="app-meta">
        ${statusBadge(app.status)}
        ${statusAgeLabel}
      </div>
    </header>

    <div class="next-action"><span class="next-label">next:</span> ${esc(nextAction)}</div>

    ${app.role_url ? `<div class="small meta"><a href="${esc(app.role_url)}" target="_blank">${esc(app.role_url)}</a></div>` : ""}
    ${artifactLinks ? `<div class="artifact-links">${artifactLinks}</div>` : ""}

    ${company ? renderCompanyBlock(company) : ""}
    ${artifact ? renderArtifactBlock(artifact) : ""}
    ${renderOutreachBlock(outreach)}

    ${
      eventRows
        ? `<details><summary>${appEvents.length} event${appEvents.length === 1 ? "" : "s"}</summary><table><thead><tr><th>time</th><th>type</th><th>payload</th></tr></thead><tbody>${eventRows}</tbody></table></details>`
        : ""
    }
  </section>`;
};

const statusSummary = Array.from(statusCounts.entries())
  .map(([s, n]) => `<li>${statusBadge(s)} <strong>${n}</strong></li>`)
  .join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Job tracker</title>
<style>
  :root {
    color-scheme: light dark;
    --fg: #1a1a1a;
    --bg: #fafafa;
    --card: #ffffff;
    --muted: #6b7280;
    --border: #e5e7eb;
    --accent: #1a1a1a;
    --block-bg: #f5f5f5;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --fg: #e5e7eb;
      --bg: #0f0f0f;
      --card: #171717;
      --muted: #9ca3af;
      --border: #262626;
      --accent: #e5e7eb;
      --block-bg: #0f0f0f;
    }
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    margin: 0;
    padding: 2rem;
    max-width: 1100px;
    margin-inline: auto;
    color: var(--fg);
    background: var(--bg);
    line-height: 1.5;
  }
  h1 { margin-top: 0; font-size: 1.5rem; }
  h2 { font-size: 1.1rem; margin-top: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 0.35rem; }
  h3 { margin: 0; font-size: 1rem; }
  .muted { color: var(--muted); font-weight: normal; font-size: 0.85rem; }
  .small { font-size: 0.85rem; }
  .mono { font-family: ui-monospace, monospace; font-size: 0.75rem; word-break: break-word; }

  .badge {
    display: inline-block;
    padding: 0.1rem 0.55rem;
    border-radius: 999px;
    font-size: 0.7rem;
    color: white;
    font-weight: 600;
  }
  .fit-badge {
    display: inline-block;
    padding: 0.1rem 0.55rem;
    border-radius: 4px;
    font-size: 0.7rem;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
  }
  .fit-strong { background: #ea8f00; }
  .fit-optional { background: #9aa0a6; }
  .fit-none { background: #d1d5db; color: #374151; }

  ul.status-summary {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  ul.status-summary li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--card);
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    border: 1px solid var(--border);
  }

  section.app {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
  }
  section.app header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .app-title h3 { font-size: 1.05rem; }
  .app-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem; }

  .next-action {
    margin-top: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: var(--block-bg);
    border-left: 3px solid #4285f4;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  .next-label {
    text-transform: uppercase;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-right: 0.4rem;
  }

  .meta { margin-top: 0.5rem; }
  .meta a { color: var(--muted); }
  .artifact-links { margin-top: 0.5rem; display: flex; gap: 0.4rem; flex-wrap: wrap; }
  .artifact-link {
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--accent);
  }

  .block {
    margin-top: 0.75rem;
    padding: 0.6rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--block-bg);
  }
  .block-head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.35rem;
  }
  .block-label {
    text-transform: uppercase;
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    font-weight: 700;
  }

  ul.outreach-list {
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0 0;
  }
  ul.outreach-list li {
    padding: 0.3rem 0;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
    flex-wrap: wrap;
  }
  ul.outreach-list li:first-child { border-top: none; }

  details { margin-top: 0.75rem; }
  summary { cursor: pointer; font-size: 0.8rem; color: var(--muted); }
  table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.8rem; }
  th, td { text-align: left; padding: 0.25rem 0.5rem; border-bottom: 1px solid var(--border); vertical-align: top; }
  th { color: var(--muted); font-weight: 500; }

  a { color: var(--accent); }
  .generated { color: var(--muted); font-size: 0.75rem; margin-top: 2rem; }
</style>
</head>
<body>
  <h1>Job tracker</h1>
  <p class="muted">${applications.length} application${applications.length === 1 ? "" : "s"} / ${events.length} event${events.length === 1 ? "" : "s"}</p>

  <ul class="status-summary">${statusSummary || "<li><span class='muted'>No applications yet.</span></li>"}</ul>

  <h2>Pipeline</h2>
  ${sortedBundles.length === 0 ? "<p class='muted'>No applications yet.</p>" : sortedBundles.map(renderBundle).join("")}

  <p class="generated">Generated ${new Date().toISOString()} by scripts/view/build.ts</p>
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, html);
console.log(`wrote ${outPath}`);
console.log(`  ${applications.length} applications, ${events.length} events`);
for (const b of bundles) {
  const bits: string[] = [];
  if (b.company?.artifact_fit) bits.push(`fit:${b.company.artifact_fit}`);
  if (b.artifact?.status) bits.push(`artifact:${b.artifact.status}`);
  if (b.outreach.length > 0) bits.push(`outreach:${b.outreach.length}`);
  console.log(`  ${b.app.id}${bits.length ? " [" + bits.join(" ") + "]" : ""} -> ${b.nextAction}`);
}
