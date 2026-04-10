import { z } from "zod";

/**
 * Closed vocabulary for application status. Enforced at the write gate.
 * Never accept free-text status from the agent.
 */
export const APPLICATION_STATUSES = [
  "interested",
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
  "ghosted",
] as const;
export const ApplicationStatus = z.enum(APPLICATION_STATUSES);
export type ApplicationStatus = z.infer<typeof ApplicationStatus>;

export const COMMUNICATION_CHANNELS = [
  "email",
  "linkedin",
  "phone",
  "sms",
  "in_person",
  "other",
] as const;
export const CommunicationChannel = z.enum(COMMUNICATION_CHANNELS);
export type CommunicationChannel = z.infer<typeof CommunicationChannel>;

/**
 * Shared envelope fields on every event.
 * `id` is a ULID. `t` is ISO-8601 UTC.
 */
const Base = z.object({
  id: z.string().min(1),
  t: z.string().datetime({ offset: true }),
});

export const ApplicationCreated = Base.extend({
  type: z.literal("application_created"),
  app_id: z.string(),
  company: z.string(),
  role: z.string(),
  source: z.string().optional(), // e.g. "workatastartup", "hn", "direct"
  role_url: z.string().url().optional(),
  initial_status: ApplicationStatus.default("interested"),
});

export const StatusChanged = Base.extend({
  type: z.literal("status_changed"),
  app_id: z.string(),
  from: ApplicationStatus,
  to: ApplicationStatus,
  reason: z.string().optional(),
});

export const CommunicationReceived = Base.extend({
  type: z.literal("communication_received"),
  app_id: z.string(),
  channel: CommunicationChannel,
  from_name: z.string().optional(),
  summary: z.string(),
  message_ref: z.string().optional(), // path to full message on disk
});

export const CommunicationSent = Base.extend({
  type: z.literal("communication_sent"),
  app_id: z.string(),
  channel: CommunicationChannel,
  to_name: z.string().optional(),
  summary: z.string(),
  message_ref: z.string().optional(),
});

export const NoteAdded = Base.extend({
  type: z.literal("note_added"),
  app_id: z.string(),
  note: z.string(),
});

export const ResumeUpdated = Base.extend({
  type: z.literal("resume_updated"),
  app_id: z.string(),
  path: z.string(),
  summary: z.string().optional(),
});

export const CoverLetterUpdated = Base.extend({
  type: z.literal("cover_letter_updated"),
  app_id: z.string(),
  path: z.string(),
  summary: z.string().optional(),
});

export const ResearchCompleted = Base.extend({
  type: z.literal("research_completed"),
  app_id: z.string(),
  path: z.string(),
});

export const StudyGuideGenerated = Base.extend({
  type: z.literal("study_guide_generated"),
  app_id: z.string(),
  path: z.string(),
});

export const ArtifactShipped = Base.extend({
  type: z.literal("artifact_shipped"),
  app_id: z.string(),
  artifact_type: z.enum(["pr", "teardown_post", "tool_or_extension", "eval_or_benchmark", "other"]),
  url: z.string().url(),
  summary: z.string(),
});

export const Event = z.discriminatedUnion("type", [
  ApplicationCreated,
  StatusChanged,
  CommunicationReceived,
  CommunicationSent,
  NoteAdded,
  ResumeUpdated,
  CoverLetterUpdated,
  ResearchCompleted,
  StudyGuideGenerated,
  ArtifactShipped,
]);
export type Event = z.infer<typeof Event>;

export const EVENT_TYPES = [
  "application_created",
  "status_changed",
  "communication_received",
  "communication_sent",
  "note_added",
  "resume_updated",
  "cover_letter_updated",
  "research_completed",
  "study_guide_generated",
  "artifact_shipped",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];
