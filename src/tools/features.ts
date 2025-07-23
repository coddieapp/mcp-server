import { makeCoddieRequest } from "../services/helper.js";
import { Feature, LeanFeature } from "./types.js";
import { toLeanFeatures } from "./transformers.js";

/**
 * List all features for a specific project
 */
export async function listFeatures(projectId: string) {
  try {
    const response = await makeCoddieRequest<{success: boolean, data: Feature[]}>(`/projects/${projectId}/features`, "GET");
    return toLeanFeatures(response.data || []);
  } catch (error) {
    console.error("Error listing features:", error);
    return [];
  }
}