import { z } from "zod";

// Original database schemas (keep these for internal use)
export const ApiKeyInfoSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  hashed_key: z.string(),
  created_at: z.string(),
  last_used_at: z.string().nullable(),
  revoked: z.boolean(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  project_summary: z.string().nullable(),
  full_description: z.string().nullable(),
  status: z.enum(["planning", "generating_docs", "generating_phases",
"generation_complete", "in_progress", "completed", "error", "archived"]),
  detailed_generation_status: z.any().nullable(), // jsonb
  error_message: z.string().nullable(),
  current_phase_index: z.number(),
  last_generated_phase_index: z.number(),
  number_of_phases: z.number(),
  current_phase_id: z.string().nullable(),
  context_summary: z.string().nullable(),
  planning_context: z.any().nullable(), // jsonb
  last_accessed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const FeatureSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  priority: z.number(),
  is_post_mvp: z.boolean(),
  status: z.enum(["planned", "in_progress", "done", "dropped"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ScreenSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  rationale: z.string().nullable(),
});

export const PhaseSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  phase_order: z.number().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  full_description: z.string().nullable(),
  status: z.enum(["not_started", "in_progress", "completed"]),
  total_steps: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const StepSchema = z.object({
  id: z.string(),
  phase_id: z.string(),
  step_order: z.number().nullable(),
  name: z.string(),
  content: z.string(),
  code: z.any().nullable(), // jsonb
  status: z.enum(["generated", "not_started", "in_progress", "completed"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export const RuleSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  file_name: z.string(),
  description: z.string().nullable(),
  globs: z.string(),
  always_apply: z.boolean(),
  content: z.string().nullable(),
  is_generated: z.boolean(),
  generation_status: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const TechnologySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["frontend", "backend", "database", "authentication",
"payments", "deployment", "infrastructure", "ai", "devops", "testing",
"other"]).nullable(),
  icon_url: z.string().nullable(),
  documentation_url: z.string().nullable(),
  is_core: z.boolean(),
  trigger_keywords: z.array(z.string()).nullable(),
  setup_instructions: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProjectTechnologySchema = z.object({
  project_id: z.string(),
  technology_id: z.string(),
  rationale: z.string().nullable(),
});

// Lean schemas for AI-optimized responses
export const LeanProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  context_summary: z.string().nullable(),
  progress: z.object({
    current_phase: z.number(),
    total_phases: z.number(),
  }),
  last_updated_at: z.string(),
});

export const LeanFeatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  priority: z.number(),
  status: z.string(),
  is_post_mvp: z.boolean(),
});

export const LeanPhaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  progress: z.object({
    completed_steps: z.number(),
    total_steps: z.number(),
  }),
  order: z.number().nullable(),
});

export const LeanStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  status: z.string(),
  order: z.number().nullable(),
});

export const LeanRuleSchema = z.object({
  id: z.string(),
  file_name: z.string(),
  description: z.string().nullable(),
  content: z.string().nullable()
});

// Original database types
export type ApiKeyInfo = z.infer<typeof ApiKeyInfoSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Feature = z.infer<typeof FeatureSchema>;
export type Screen = z.infer<typeof ScreenSchema>;
export type Phase = z.infer<typeof PhaseSchema>;
export type Step = z.infer<typeof StepSchema>;
export type Rule = z.infer<typeof RuleSchema>;
export type Technology = z.infer<typeof TechnologySchema>;
export type ProjectTechnology = z.infer<typeof ProjectTechnologySchema>;

// Lean types for AI responses
export type LeanProject = z.infer<typeof LeanProjectSchema>;
export type LeanFeature = z.infer<typeof LeanFeatureSchema>;
export type LeanPhase = z.infer<typeof LeanPhaseSchema>;
export type LeanStep = z.infer<typeof LeanStepSchema>;
export type LeanRule = z.infer<typeof LeanRuleSchema>;