import { makeCoddieRequest } from "../services/helper.js";
import { Project } from "./types.js";

/**
 * List all projects for authenticated user
 */
export async function listProjects(): Promise<Project[]> {
  try {
    const projects = await makeCoddieRequest<Project[]>("/project", "GET");
    return projects || [];
  } catch (error) {
    console.error("Error listing projects:", error);
    return [];
  }
}

/**
 * Get project details (name, description, tech stack, features overview)
 */
export async function getProjectInfo(projectId: string): Promise<Project | null> {
  try {
    const project = await makeCoddieRequest<Project>(`/project/${projectId}`, "GET");
    return project;
  } catch (error) {
    console.error("Error getting project info:", error);
    return null;
  }
}

/**
 * Get development progress status and context summary
 */
export async function getContext(projectId: string): Promise<string | null> {
  try {
    const project = await makeCoddieRequest<Project>(`/project/${projectId}`, "GET");
    if (!project) return null;
    
    // Return context summary or build from project status
    return project.context_summary 
  } catch (error) {
    console.error("Error getting project context:", error);
    return null;
  }
}