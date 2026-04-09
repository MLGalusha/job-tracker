import { z } from "zod";

/**
 * A role the user is *interested in* but has not necessarily applied to yet.
 * When an application is created, the role gets linked via app_id.
 */
export const Role = z.object({
  slug: z.string(),
  company_slug: z.string(),
  title: z.string(),
  url: z.string().url().optional(),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  salary_range: z.string().optional(),
  source: z.string().optional(),
  jd_path: z.string().optional(), // path to archived JD markdown
  tags: z.array(z.string()).default([]),
  app_id: z.string().optional(), // set when an application is created
  created_at: z.string().datetime({ offset: true }),
});
export type Role = z.infer<typeof Role>;
