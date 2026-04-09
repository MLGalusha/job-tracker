#!/usr/bin/env tsx
/**
 * THE WRITE GATE.
 *
 * Every mutation to application state flows through here. Skills and the
 * web UI MUST call this script — never edit data/events.jsonl or the
 * derived JSON files directly.
 *
 * What this script guarantees:
 *   - Event shape is validated against the Zod schema (closed vocab for
 *     statuses, channels, event types).
 *   - Timestamps are always ISO-8601 UTC.
 *   - Event IDs are always unique ULIDs.
 *   - Derived views are rebuilt after every successful append, so callers
 *     never have to worry about staleness.
 *
 * Usage (positional type + flags):
 *   pnpm log application_created --company="Cognition" --role="Founding Eng" [--source=...] [--url=...]
 *   pnpm log status_changed --app_id=... --to=screening [--reason=...]
 *   pnpm log communication_received --app_id=... --channel=email --from="Jane" --summary="Reply asking for availability"
 *   pnpm log communication_sent --app_id=... --channel=email --to="Jane" --summary="Sent availability"
 *   pnpm log note_added --app_id=... --note="..."
 *   pnpm log resume_updated --app_id=... --path=applications/<id>/resume.md [--summary="..."]
 *   pnpm log cover_letter_updated --app_id=... --path=...
 *   pnpm log research_completed --app_id=... --path=...
 *   pnpm log study_guide_generated --app_id=... --path=...
 */
import fs from "node:fs";
import path from "node:path";
import { ulid } from "ulid";
import { Event, EVENT_TYPES, type EventType } from "../../schemas/events.ts";
import { appId as makeAppId } from "../ids/slug.ts";
import { writeDerivedViews, derive } from "./derive.ts";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const EVENTS_PATH = path.join(ROOT, "data", "events.jsonl");

// ---------- arg parsing ----------

type Flags = Record<string, string>;

function parseArgs(argv: string[]): { type: string; flags: Flags } {
  const [type, ...rest] = argv;
  const flags: Flags = {};
  for (const arg of rest) {
    if (!arg.startsWith("--")) {
      throw new Error(`unexpected positional argument: ${arg}`);
    }
    const eq = arg.indexOf("=");
    if (eq === -1) {
      // bare --flag → treat as boolean "true"
      flags[arg.slice(2)] = "true";
    } else {
      flags[arg.slice(2, eq)] = arg.slice(eq + 1);
    }
  }
  return { type, flags };
}

function requireFlag(flags: Flags, name: string): string {
  const v = flags[name];
  if (v === undefined || v === "") {
    throw new Error(`missing required flag --${name}`);
  }
  return v;
}

// ---------- event construction ----------

function buildEvent(type: string, flags: Flags): Event {
  if (!EVENT_TYPES.includes(type as EventType)) {
    throw new Error(
      `unknown event type "${type}". Valid types: ${EVENT_TYPES.join(", ")}`,
    );
  }

  const id = ulid();
  const t = new Date().toISOString();

  switch (type as EventType) {
    case "application_created": {
      const company = requireFlag(flags, "company");
      const role = requireFlag(flags, "role");
      const app_id = flags.app_id || makeAppId(company, role);
      return Event.parse({
        id,
        t,
        type,
        app_id,
        company,
        role,
        source: flags.source,
        role_url: flags.url || flags.role_url,
        initial_status: flags.status || "interested",
      });
    }
    case "status_changed": {
      const app_id = requireFlag(flags, "app_id");
      const to = requireFlag(flags, "to");
      const from = flags.from || currentStatus(app_id);
      return Event.parse({ id, t, type, app_id, from, to, reason: flags.reason });
    }
    case "communication_received": {
      return Event.parse({
        id,
        t,
        type,
        app_id: requireFlag(flags, "app_id"),
        channel: requireFlag(flags, "channel"),
        from_name: flags.from,
        summary: requireFlag(flags, "summary"),
        message_ref: flags.message_ref,
      });
    }
    case "communication_sent": {
      return Event.parse({
        id,
        t,
        type,
        app_id: requireFlag(flags, "app_id"),
        channel: requireFlag(flags, "channel"),
        to_name: flags.to,
        summary: requireFlag(flags, "summary"),
        message_ref: flags.message_ref,
      });
    }
    case "note_added": {
      return Event.parse({
        id,
        t,
        type,
        app_id: requireFlag(flags, "app_id"),
        note: requireFlag(flags, "note"),
      });
    }
    case "resume_updated":
    case "cover_letter_updated":
    case "research_completed":
    case "study_guide_generated": {
      return Event.parse({
        id,
        t,
        type,
        app_id: requireFlag(flags, "app_id"),
        path: requireFlag(flags, "path"),
        ...(flags.summary ? { summary: flags.summary } : {}),
      });
    }
  }
}

function currentStatus(app_id: string): string {
  const { applications } = derive();
  const app = applications.find((a) => a.id === app_id);
  if (!app) {
    throw new Error(
      `cannot resolve current status: no application with id "${app_id}". Pass --from explicitly, or create the application first with application_created.`,
    );
  }
  return app.status;
}

// ---------- append + derive ----------

function append(ev: Event): void {
  fs.mkdirSync(path.dirname(EVENTS_PATH), { recursive: true });
  fs.appendFileSync(EVENTS_PATH, JSON.stringify(ev) + "\n");
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv[0] === "--help" || argv[0] === "-h") {
    console.log(readHelp());
    process.exit(0);
  }

  const { type, flags } = parseArgs(argv);
  const ev = buildEvent(type, flags);
  append(ev);
  writeDerivedViews();

  console.log(`logged ${ev.type} (${ev.id})`);
  if ("app_id" in ev) console.log(`  app_id: ${ev.app_id}`);
}

function readHelp(): string {
  return `Usage: pnpm log <event_type> [--flag=value ...]

Event types:
  ${EVENT_TYPES.join("\n  ")}

See scripts/events/log.ts header for per-type flag requirements.`;
}

try {
  main();
} catch (err) {
  console.error(`error: ${(err as Error).message}`);
  process.exit(1);
}
