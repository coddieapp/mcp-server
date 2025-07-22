import {
  Project, Feature, Phase, Step, Rule,
  LeanProject, LeanFeature, LeanPhase, LeanStep, LeanRule
} from "./types.js";

// Transform full project to lean project
export function toLeanProject(project: Project): LeanProject {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    context_summary: project.context_summary,
    progress: {
      current_phase: project.current_phase_index,
      total_phases: project.number_of_phases,
    },
    last_updated_at: project.updated_at,
  };
}

// Transform full feature to lean feature
export function toLeanFeature(feature: Feature): LeanFeature {
  return {
    id: feature.id,
    name: feature.name,
    description: feature.description,
    priority: feature.priority,
    status: feature.status,
    is_post_mvp: feature.is_post_mvp,
  };
}

// Transform full phase to lean phase
export function toLeanPhase(phase: Phase): LeanPhase {
  return {
    id: phase.id,
    title: phase.title,
    description: phase.description,
    status: phase.status,
    progress: {
      completed_steps: 0, // This would need to be calculated from steps
      total_steps: phase.total_steps,
    },
    order: phase.phase_order,
  };
}

// Transform full step to lean step
export function toLeanStep(step: Step): LeanStep {
  return {
    id: step.id,
    name: step.name,
    content: step.content,
    status: step.status,
    order: step.step_order,
  };
}

// Transform full rule to lean rule
export function toLeanRule(rule: Rule): LeanRule {
  return {
    id: rule.id,
    file_name: rule.file_name,
    description: rule.description,
    content: rule.content
  };
}

// Transform arrays of objects to lean versions
export function toLeanProjects(projects: Project[]): LeanProject[] {
  return projects.map(toLeanProject);
}

export function toLeanFeatures(features: Feature[]): LeanFeature[] {
  return features.map(toLeanFeature);
}

export function toLeanPhases(phases: Phase[]): LeanPhase[] {
  return phases.map(toLeanPhase);
}

export function toLeanSteps(steps: Step[]): LeanStep[] {
  return steps.map(toLeanStep);
}

export function toLeanRules(rules: Rule[]): LeanRule[] {
  return rules.map(toLeanRule);
}