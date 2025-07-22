import { makeCoddieRequest } from "../services/helper.js";
import { Phase, Step, LeanPhase, LeanStep } from "./types.js";
import { toLeanPhase, toLeanPhases, toLeanSteps } from "./transformers.js";

/**
 * List all development phases for a project
 */
export async function listPhases(projectId: string): Promise<LeanPhase[]> {
  try {
    const phases = await makeCoddieRequest<Phase[]>(`/projects/${projectId}/phases`, "GET");
    return toLeanPhases(phases || []);
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
    const phase = await makeCoddieRequest<Phase>(`/projects/${projectId}/phases/${phaseId}`, "GET");
    return phase ? toLeanPhase(phase) : null;
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
    const steps = await makeCoddieRequest<Step[]>(`/projects/${projectId}/phases/${phaseId}/steps`, "GET");
    return toLeanSteps(steps || []);
  } catch (error) {
    console.error("Error listing steps:", error);
    return [];
  }
}