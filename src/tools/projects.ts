import { makeCoddieRequest } from "../services/helper.js";
import { Project, LeanProject } from "./types.js";
import { toLeanProject, toLeanProjects } from "./transformers.js";

/**
 * List all projects for authenticated user
 */
export async function listProjects(): Promise<LeanProject[]> {
  try {
    const response = await makeCoddieRequest<any>("/projects", "GET");

    // Handle different response structures
    let projects: Project[] = [];
    if (Array.isArray(response)) {
      projects = response;
    } else if (response && typeof response === 'object' && 'data' in response) {
      projects = Array.isArray(response.data) ? response.data : [];
    } else if (response && typeof response === 'object' && 'projects' in response) {
      projects = Array.isArray(response.projects) ? response.projects : [];
    } else {
      console.error(`[DEBUG] Unexpected response structure: ${JSON.stringify(response, null, 2)}`);
      projects = [];
    }

    console.error(`[DEBUG] Processed projects: ${JSON.stringify(projects, null, 2)}`);
    return toLeanProjects(projects);
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
    const project = await makeCoddieRequest<Project>(`/projects/${projectId}`, "GET");
    return project ? toLeanProject(project) : null;
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
    const project = await makeCoddieRequest<Project>(`/projects/${projectId}`, "GET");
    if (!project) return null;

    // Return context summary or build from project status
    return project.context_summary;
  } catch (error) {
    console.error("Error getting project context:", error);
    return null;
  }
}
