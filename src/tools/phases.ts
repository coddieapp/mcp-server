import { makeCoddieRequest } from "../services/helper.js";
import { Phase, Step, LeanPhase, LeanStep } from "./types.js";
import { toLeanPhase, toLeanPhases, toLeanSteps } from "./transformers.js";

/**
 * List all development phases for a project
 */
export async function listPhases(projectId: string): Promise<LeanPhase[]> {
  try {
    const phases = await makeCoddieRequest<{success: boolean, data: Phase[]}>(`/projects/${projectId}/phases`, "GET");
    return toLeanPhases(phases.data || []);
  } catch (error) {
    console.error("Error listing phases:", error);
    return [];
  }
}

/**
 * Get phase details (title, description, status, etc.)
 */
export async function getPhase(projectId: string, phaseId: string): Promise<LeanPhase | null> {
  try {
    const phase = await makeCoddieRequest<{success: boolean, data: Phase}>(`/projects/${projectId}/phases/${phaseId}`, "GET");
    return phase.data ? toLeanPhase(phase.data) : null;
  } catch (error) {
    console.error("Error getting phase:", error);
    return null;
  }
}

/**
 * List all implementation steps for a specific phase
 */
export async function listSteps(projectId: string, phaseId: string): Promise<LeanStep[]> {
  try {
    const steps = await makeCoddieRequest<{success: boolean, data: Step[]}>(`/projects/${projectId}/phases/${phaseId}/steps`, "GET");
    return toLeanSteps(steps.data || []);
  } catch (error) {
    console.error("Error listing steps:", error);
    return [];
  }
}