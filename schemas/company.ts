import { z } from "zod";

/**
 * Mutable record (not event-sourced in v1 — the event log is for things
 * that happen to applications, not for static facts about companies).
 */
export const Company = z.object({
  slug: z.string(), // stable key
  name: z.string(),
  website: z.string().url().optional(),
  stage: z.string().optional(), // "seed", "series-a", etc.
  size: z.string().optional(), // "2-10", "11-50", etc.
  location: z.string().optional(),
  fit_score: z.number().min(0).max(10).optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});
export type Company = z.infer<typeof Company>;
