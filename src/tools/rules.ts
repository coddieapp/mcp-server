import { makeCoddieRequest } from '../services/helper.js';
import { Rule } from './types.js';

export async function listRules(projectId: string): Promise<Rule[]> {
  return makeCoddieRequest<Rule[]>(`/projects/${projectId}/rules`, "GET");
}

export async function getRule(projectId: string, ruleId: string): Promise<Rule | null> {
  return makeCoddieRequest<Rule>(`/projects/${projectId}/rules/${ruleId}`, "GET");
}