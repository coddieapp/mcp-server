import { makeCoddieRequest } from "../services/helper.js";
import { Phase, Step } from "./types.js";

/**
 * List all development phases for a project
 */
export async function listPhases(projectId: string): Promise<Phase[]> {
  try {
    const phases = await makeCoddieRequest<Phase[]>(`/project/${projectId}/phases`, "GET");
    return phases || [];
  } catch (error) {
    console.error("Error listing phases:", error);
    return [];
  }
}

/**
 * Get phase details (title, description, status, etc.)
 */
export async function getPhase(projectId: string, phaseId: string): Promise<Phase | null> {
  try {
    const phase = await makeCoddieRequest<Phase>(`/projects/${projectId}/phases/${phaseId}`, "GET");
    return phase;
  } catch (error) {
    console.error("Error getting phase:", error);
    return null;
  }
}

/**
 * List all implementation steps for a specific phase
 */
export async function listSteps(projectId: string, phaseId: string): Promise<Step[]> {
  try {
    const steps = await makeCoddieRequest<Step[]>(`/projects/${projectId}/phases/${phaseId}/steps`, "GET");
    return steps || [];
  } catch (error) {
    console.error("Error listing steps:", error);
    return [];
  }
}