#!/usr/bin/env tsx
/**
 * Read data/events.jsonl and rebuild derived views:
 *   - data/applications.json   (Application[])
 *   - data/communications.json (Communication[])
 *
 * Idempotent. Safe to run any time. Called automatically by log.ts after
 * each successful append, so the derived views are always fresh.
 */
import fs from "node:fs";
import path from "node:path";
import { Event } from "../../schemas/events.ts";
import type { Application, Communication } from "../../schemas/application.ts";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const EVENTS_PATH = path.join(ROOT, "data", "events.jsonl");
const APPS_PATH = path.join(ROOT, "data", "applications.json");
const COMMS_PATH = path.join(ROOT, "data", "communications.json");

function readEvents(): Event[] {
  if (!fs.existsSync(EVENTS_PATH)) return [];
  const raw = fs.readFileSync(EVENTS_PATH, "utf8");
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  return lines.map((line, i) => {
    try {
      return Event.parse(JSON.parse(line));
    } catch (err) {
      throw new Error(`Invalid event at line ${i + 1}: ${(err as Error).message}`);
    }
  });
}

export function derive(): { applications: Application[]; communications: Communication[] } {
  const events = readEvents();

  const appsById = new Map<string, Application>();
  const communications: Communication[] = [];

  for (const ev of events) {
    switch (ev.type) {
      case "application_created": {
        if (appsById.has(ev.app_id)) break; // idempotent
        appsById.set(ev.app_id, {
          id: ev.app_id,
          company: ev.company,
          role: ev.role,
          role_url: ev.role_url,
          source: ev.source,
          status: ev.initial_status ?? "interested",
          created_at: ev.t,
          updated_at: ev.t,
          last_status_change: ev.t,
          status_history: [],
          artifacts: {},
          notes: [],
        });
        break;
      }
      case "status_changed": {
        const app = appsById.get(ev.app_id);
        if (!app) break;
        app.status = ev.to;
        app.last_status_change = ev.t;
        app.updated_at = ev.t;
        app.status_history.push({ at: ev.t, from: ev.from, to: ev.to, reason: ev.reason });
        break;
      }
      case "communication_received":
      case "communication_sent": {
        const app = appsById.get(ev.app_id);
        if (app) app.updated_at = ev.t;
        communications.push({
          id: ev.id,
          app_id: ev.app_id,
          at: ev.t,
          direction: ev.type === "communication_received" ? "received" : "sent",
          channel: ev.channel,
          counterparty: ev.type === "communication_received" ? ev.from_name : ev.to_name,
          summary: ev.summary,
          message_ref: ev.message_ref,
        });
        break;
      }
      case "note_added": {
        const app = appsById.get(ev.app_id);
        if (!app) break;
        app.notes.push({ at: ev.t, text: ev.note });
        app.updated_at = ev.t;
        break;
      }
      case "resume_updated": {
        const app = appsById.get(ev.app_id);
        if (!app) break;
        app.artifacts.resume = ev.path;
        app.updated_at = ev.t;
        break;
      }
      case "cover_letter_updated": {
        const app = appsById.get(ev.app_id);
        if (!app) break;
        app.artifacts.cover_letter = ev.path;
        app.updated_at = ev.t;
        break;
      }
      case "research_completed": {
        const app = appsById.get(ev.app_id);
        if (!app) break;
        app.artifacts.research = ev.path;
        app.updated_at = ev.t;
        break;
      }
      case "study_guide_generated": {
        const app = appsById.get(ev.app_id);
        if (!app) break;
        app.artifacts.study_guide = ev.path;
        app.updated_at = ev.t;
        break;
      }
    }
  }

  const applications = Array.from(appsById.values()).sort((a, b) =>
    b.updated_at.localeCompare(a.updated_at),
  );
  communications.sort((a, b) => b.at.localeCompare(a.at));

  return { applications, communications };
}

export function writeDerivedViews(): void {
  const { applications, communications } = derive();
  fs.mkdirSync(path.dirname(APPS_PATH), { recursive: true });
  fs.writeFileSync(APPS_PATH, JSON.stringify(applications, null, 2) + "\n");
  fs.writeFileSync(COMMS_PATH, JSON.stringify(communications, null, 2) + "\n");
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  writeDerivedViews();
  const { applications, communications } = derive();
  console.log(
    `derived: ${applications.length} applications, ${communications.length} communications`,
  );
}
