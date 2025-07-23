import { makeCoddieRequest } from '../services/helper.js';
import { Rule, LeanRule } from './types.js';
import { toLeanRule, toLeanRules } from './transformers.js';

export async function listRules(projectId: string): Promise<LeanRule[]> {
  try {
    const rules = await makeCoddieRequest<{success: boolean, data: Rule[]}>(`/projects/${projectId}/rules`, "GET");
    return toLeanRules(rules.data || []);
  } catch (error) {
    console.error("Error listing rules:", error);
    return [];
  }
}

export async function getRule(projectId: string, ruleId: string): Promise<LeanRule | null> {
  try {
    const rule = await makeCoddieRequest<{success: boolean, data: Rule}>(`/projects/${projectId}/rules/${ruleId}`, "GET");
    return rule.data ? toLeanRule(rule.data) : null;
  } catch (error) {
    console.error("Error getting rule:", error);
    return null;
  }
}