import { makeCoddieRequest } from "../services/helper.js";
import { Feature } from "./types.js";

/**
 * List all features for a specific project
 */
export async function listFeatures(projectId: string): Promise<Feature[]> {
  try {
    const features = await makeCoddieRequest<Feature[]>(`/projects/${projectId}/features`, "GET");
    return features || [];
  } catch (error) {
    console.error("Error listing features:", error);
    return [];
  }
}