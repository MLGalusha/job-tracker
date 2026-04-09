import { z } from "zod";
import { ApplicationStatus, CommunicationChannel } from "./events.ts";

/**
 * Derived view of an application, materialized from events.jsonl.
 * Never edited directly — always rebuilt by scripts/events/derive.ts.
 */
export const Application = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  role_url: z.string().url().optional(),
  source: z.string().optional(),
  status: ApplicationStatus,
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
  last_status_change: z.string().datetime({ offset: true }),
  status_history: z.array(
    z.object({
      at: z.string().datetime({ offset: true }),
      from: ApplicationStatus,
      to: ApplicationStatus,
      reason: z.string().optional(),
    }),
  ),
  artifacts: z.object({
    resume: z.string().optional(),
    cover_letter: z.string().optional(),
    research: z.string().optional(),
    study_guide: z.string().optional(),
  }),
  notes: z.array(
    z.object({
      at: z.string().datetime({ offset: true }),
      text: z.string(),
    }),
  ),
});
export type Application = z.infer<typeof Application>;

export const Communication = z.object({
  id: z.string(), // event id
  app_id: z.string(),
  at: z.string().datetime({ offset: true }),
  direction: z.enum(["received", "sent"]),
  channel: CommunicationChannel,
  counterparty: z.string().optional(),
  summary: z.string(),
  message_ref: z.string().optional(),
});
export type Communication = z.infer<typeof Communication>;
