import { makeCoddieRequest } from "../services/helper.js";
import { Feature, LeanFeature } from "./types.js";
import { toLeanFeatures } from "./transformers.js";

/**
 * List all features for a specific project
 */
export async function listFeatures(projectId: string): Promise<LeanFeature[]> {
  try {
    const features = await makeCoddieRequest<Feature[]>(`/projects/${projectId}/features`, "GET");
    return toLeanFeatures(features || []);
  } catch (error) {
    console.error("Error listing features:", error);
    return [];
  }
}