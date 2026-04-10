#!/usr/bin/env tsx
/**
 * Minimal static dashboard builder.
 *
 * Reads:
 *   - data/applications.json
 *   - data/events.jsonl
 *
 * Writes:
 *   - web/dist/index.html (single file, open in a browser)
 *
 * Zero dependencies beyond what's already in the repo. No framework, no
 * build step. Re-run after logging events.
 *
 *   pnpm view
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = join(dirname(__filename), "..", "..");

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

// Scan company.md files for artifact_fit frontmatter
type ArtifactTarget = {
  app_id: string;
  company: string;
  artifact_fit: "strong" | "optional";
  artifact_idea: string;
  shipped_urls: string[];
};

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

const appsDir = join(repoRoot, "applications");
const artifactTargets: ArtifactTarget[] = [];
if (existsSync(appsDir)) {
  for (const entry of readdirSync(appsDir)) {
    const companyMdPath = join(appsDir, entry, "company.md");
    if (!existsSync(companyMdPath)) continue;
    try {
      const content = readFileSync(companyMdPath, "utf-8");
      const fm = parseFrontmatter(content);
      const fit = fm.artifact_fit;
      if (fit !== "strong" && fit !== "optional") continue;
      artifactTargets.push({
        app_id: entry,
        company: fm.company || entry,
        artifact_fit: fit,
        artifact_idea: fm.artifact_idea || "",
        shipped_urls: [],
      });
    } catch {
      // ignore parse errors
    }
  }
}

// Group events by app_id for quick lookup
const eventsByApp = new Map<string, Event[]>();
for (const e of events) {
  if (!e.app_id) continue;
  const appId = String(e.app_id);
  if (!eventsByApp.has(appId)) eventsByApp.set(appId, []);
  eventsByApp.get(appId)!.push(e);
}

// Attach shipped artifact URLs from artifact_shipped events
for (const target of artifactTargets) {
  const appEvents = eventsByApp.get(target.app_id) ?? [];
  for (const e of appEvents) {
    if (e.type === "artifact_shipped" && typeof e.url === "string") {
      target.shipped_urls.push(e.url);
    }
  }
}
// Sort: strong first, then optional
artifactTargets.sort((a, b) => {
  if (a.artifact_fit !== b.artifact_fit) return a.artifact_fit === "strong" ? -1 : 1;
  return a.company.localeCompare(b.company);
});

// Count applications by status
const statusCounts = new Map<string, number>();
for (const a of applications) {
  statusCounts.set(a.status, (statusCounts.get(a.status) ?? 0) + 1);
}

// Helpers
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

// Sort applications by updated_at desc
const sortedApps = [...applications].sort((a, b) =>
  b.updated_at.localeCompare(a.updated_at)
);

// Sort events desc
const sortedEvents = [...events].sort((a, b) => String(b.t).localeCompare(String(a.t)));

// Build HTML
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

const renderApplication = (a: Application) => {
  const appEvents = (eventsByApp.get(a.id) ?? []).sort((x, y) =>
    String(y.t).localeCompare(String(x.t))
  );
  const artifactLinks = a.artifacts
    ? Object.entries(a.artifacts)
        .map(
          ([k, v]) =>
            `<a href="../../${esc(v)}" class="artifact">${esc(k)}</a>`
        )
        .join(" ")
    : "";
  const eventRows = appEvents
    .map(
      (e) =>
        `<tr><td>${fmtDateTime(String(e.t))}</td><td>${esc(String(e.type))}</td><td class="muted">${esc(
          JSON.stringify(
            Object.fromEntries(
              Object.entries(e).filter(
                ([k]) => !["id", "t", "type", "app_id"].includes(k)
              )
            )
          )
        )}</td></tr>`
    )
    .join("");
  return `
  <section class="app">
    <header>
      <h3>${esc(a.company)} <span class="muted">— ${esc(a.role)}</span></h3>
      <div>${statusBadge(a.status)} <span class="muted">updated ${fmtDate(a.updated_at)}</span></div>
    </header>
    ${a.role_url ? `<div class="meta"><a href="${esc(a.role_url)}" target="_blank">${esc(a.role_url)}</a></div>` : ""}
    ${artifactLinks ? `<div class="artifacts">${artifactLinks}</div>` : ""}
    ${
      eventRows
        ? `<details><summary>${appEvents.length} events</summary><table><thead><tr><th>time</th><th>type</th><th>payload</th></tr></thead><tbody>${eventRows}</tbody></table></details>`
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
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --fg: #e5e7eb;
      --bg: #0f0f0f;
      --card: #171717;
      --muted: #9ca3af;
      --border: #262626;
      --accent: #e5e7eb;
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
  .muted { color: var(--muted); font-weight: normal; }
  .badge {
    display: inline-block;
    padding: 0.1rem 0.55rem;
    border-radius: 999px;
    font-size: 0.75rem;
    color: white;
    font-weight: 600;
  }
  ul.status-summary {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;
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
    margin-bottom: 0.75rem;
  }
  section.app header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .meta { font-size: 0.85rem; margin-top: 0.25rem; }
  .meta a { color: var(--muted); }
  .artifacts { margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .artifact {
    font-size: 0.8rem;
    padding: 0.15rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    text-decoration: none;
    color: var(--accent);
  }
  details { margin-top: 0.75rem; }
  summary { cursor: pointer; font-size: 0.85rem; color: var(--muted); }
  table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.8rem; }
  th, td { text-align: left; padding: 0.25rem 0.5rem; border-bottom: 1px solid var(--border); vertical-align: top; }
  th { color: var(--muted); font-weight: 500; }
  td.muted { font-family: ui-monospace, monospace; font-size: 0.75rem; word-break: break-word; }
  a { color: var(--accent); }
  .generated { color: var(--muted); font-size: 0.75rem; margin-top: 2rem; }
  ul.artifact-list { list-style: none; padding: 0; }
  ul.artifact-list li {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
  }
  .fit-badge {
    display: inline-block;
    padding: 0.1rem 0.55rem;
    border-radius: 4px;
    font-size: 0.7rem;
    color: white;
    font-weight: 700;
    margin-right: 0.5rem;
  }
  .fit-strong { background: #ea8f00; }
  .fit-optional { background: #9aa0a6; }
  .idea { font-size: 0.85rem; margin-top: 0.25rem; }
  .shipped { font-size: 0.75rem; margin-top: 0.25rem; }
</style>
</head>
<body>
  <h1>Job tracker</h1>
  <p class="muted">${applications.length} application${applications.length === 1 ? "" : "s"} / ${events.length} event${events.length === 1 ? "" : "s"}</p>

  <ul class="status-summary">${statusSummary || "<li><span class='muted'>No applications yet.</span></li>"}</ul>

  ${
    artifactTargets.length > 0
      ? `<h2>Artifact-worthy targets</h2>
  <p class="muted">Companies where building a specific artifact (PR, teardown, eval, tool) would materially improve chances. Scored by company-research.</p>
  <ul class="artifact-list">${artifactTargets
    .map((t) => {
      const fitBadge = `<span class="fit-badge fit-${t.artifact_fit}">${t.artifact_fit.toUpperCase()}</span>`;
      const shipped = t.shipped_urls.length > 0
        ? `<div class="shipped">shipped: ${t.shipped_urls.map((u) => `<a href="${esc(u)}" target="_blank">${esc(u)}</a>`).join(", ")}</div>`
        : `<div class="shipped muted">not shipped yet</div>`;
      const idea = t.artifact_idea
        ? `<div class="idea">${esc(t.artifact_idea)}</div>`
        : "";
      return `<li>${fitBadge} <strong>${esc(t.company)}</strong>${idea}${shipped}</li>`;
    })
    .join("")}</ul>`
      : ""
  }

  <h2>Applications</h2>
  ${sortedApps.length === 0 ? "<p class='muted'>No applications yet.</p>" : sortedApps.map(renderApplication).join("")}

  <h2>Recent events</h2>
  ${
    sortedEvents.length === 0
      ? "<p class='muted'>No events yet.</p>"
      : `<table><thead><tr><th>time</th><th>type</th><th>app_id</th></tr></thead><tbody>${sortedEvents
          .slice(0, 25)
          .map(
            (e) =>
              `<tr><td>${fmtDateTime(String(e.t))}</td><td>${esc(String(e.type))}</td><td class="muted">${esc(String(e.app_id ?? ""))}</td></tr>`
          )
          .join("")}</tbody></table>`
  }

  <p class="generated">Generated ${new Date().toISOString()} by scripts/view/build.ts</p>
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, html);
console.log(`wrote ${outPath}`);
console.log(`  ${applications.length} applications, ${events.length} events`);
