import { makeCoddieRequest } from "../services/helper.js";
import { Project, LeanProject } from "./types.js";
import { toLeanProject, toLeanProjects } from "./transformers.js";

/**
 * List all projects for authenticated user
 */
export async function listProjects(): Promise<LeanProject[]> {
  try {
    const response = await makeCoddieRequest<{success: boolean, data: Project[]}>("/projects", "GET");
    return toLeanProjects(response.data || []);
  } catch (error) {
    console.error("Error listing projects:", error);
    return [];
  }
}

/**
 * Get project details (name, description, tech stack, features overview)
 */
export async function getProjectInfo(projectId: string): Promise<LeanProject | null> {
  try {
    const project = await makeCoddieRequest<{success: boolean, data: Project}>(`/projects/${projectId}`, "GET");
    return project.data ? toLeanProject(project.data) : null;
  } catch (error) {
    console.error("Error getting project info:", error);
    return null;
  }
}

/**
 * Get development progress status and context summary for a project
 */
export async function getContext(projectId: string): Promise<string | null> {
  try {
    const project = await makeCoddieRequest<{success: boolean, data: Project}>(`/projects/${projectId}`, "GET");
    if (!project.data) return null;

    // Return context summary or build from project status
    return project.data.context_summary;
  } catch (error) {
    console.error("Error getting project context:", error);
    return null;
  }
}
