#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { listProjects, getProjectInfo, getContext } from "./tools/projects.js";
import { listFeatures } from "./tools/features.js";
import { listPhases, getPhase, listSteps } from "./tools/phases.js";
import { listRules, getRule } from "./tools/rules.js";
import { setCoddieApiKey } from "./services/helper.js";

const server = new McpServer({
  name: "coddie",
  version: "1.0.5"
});

// Register tools individually
server.registerTool("list_projects", {
  description: "List all projects for authenticated user",
  inputSchema: {}
}, async () => {
  const projects = await listProjects();
  const projectsAsObject = projects.reduce((acc, project, index) => {
    acc[`project_${index}`] = project;
    return acc;
  }, {} as { [key: string]: typeof projects[0] });
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(projects, null, 2)
      }
    ],
    structuredContent: projectsAsObject
  };
});

server.registerTool("get_project_info", {
  description: "Get project details (name, description, status, and progress summary)",
  inputSchema: {
    projectId: z.string().describe("The ID of the project to get info for")
  }
}, async (args) => {
  const project = await getProjectInfo(args.projectId);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(project, null, 2)
      }
    ],
    structuredContent: project ? { project } : undefined
  };
});

server.registerTool("get_context", {
  description: "Get development progress status and context summary for a project",
  inputSchema: {
    projectId: z.string().describe("The ID of the project to get context for")
  }
}, async (args) => {
  const context = await getContext(args.projectId);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(context, null, 2)
      }
    ],
    structuredContent: context ? { context } : undefined
  };
});

server.registerTool("list_features", {
  description: "List all features for a specific project",
  inputSchema: {
    projectId: z.string().describe("The ID of the project to list features for")
  }
}, async (args) => {
  const features = await listFeatures(args.projectId);
  const featuresAsObject = features.reduce((acc, feature, index) => {
    acc[`feature_${index}`] = feature;
    return acc;
  }, {} as { [key: string]: typeof features[0] });
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(features, null, 2)
      }
    ],
    structuredContent: featuresAsObject
  };
});

server.registerTool("list_phases", {
  description: "List all development phases for a project",
  inputSchema: {
    projectId: z.string().describe("The ID of the project to list phases for")
  }
}, async (args) => {
  const phases = await listPhases(args.projectId);
  const phasesAsObject = phases.reduce((acc, phase, index) => {
    acc[`phase_${index}`] = phase;
    return acc;
  }, {} as { [key: string]: typeof phases[0] });
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(phases, null, 2)
      }
    ],
    structuredContent: phasesAsObject
  };
});

server.registerTool("get_phase", {
  description: "Get phase details (title, description, status, and progress)",
  inputSchema: {
    projectId: z.string().describe("The ID of the project the phase belongs to"),
    phaseId: z.string().describe("The ID of the phase to get details for")
  }
}, async (args) => {
  const phase = await getPhase(args.projectId, args.phaseId);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(phase, null, 2)
      }
    ],
    structuredContent: phase ? { phase } : undefined
  };
});

server.registerTool("list_steps", {
  description: "List all implementation steps for a specific phase",
  inputSchema: {
    projectId: z.string().describe("The ID of the project the phase belongs to"),
    phaseId: z.string().describe("The ID of the phase to list steps for")
  }
}, async (args) => {
  const steps = await listSteps(args.projectId, args.phaseId);
  const stepsAsObject = steps.reduce((acc, step, index) => {
    acc[`step_${index}`] = step;
    return acc;
  }, {} as { [key: string]: typeof steps[0] });
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(steps, null, 2)
      }
    ],
    structuredContent: stepsAsObject
  };
});

server.registerTool("list_rules", {
  description: "List all rules for a specific project",
  inputSchema: {
    projectId: z.string().describe("The ID of the project to list rules for")
  }
}, async (args) => {
  const rules = await listRules(args.projectId);
  const rulesAsObject = rules.reduce((acc, rule, index) => {
    acc[`rule_${index}`] = rule;
    return acc;
  }, {} as { [key: string]: typeof rules[0] });
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(rules, null, 2)
      }
    ],
    structuredContent: rulesAsObject
  };
});

server.registerTool("get_rule", {
  description: "Get rule details (file name, description, content, globs)",
  inputSchema: {
    projectId: z.string().describe("The ID of the project the rule belongs to"),
    ruleId: z.string().describe("The ID of the rule to get details for")
  }
}, async (args) => {
  const rule = await getRule(args.projectId, args.ruleId);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(rule, null, 2)
      }
    ],
    structuredContent: rule ? { rule } : undefined
  };
});


async function main() {
  // Try to parse the API key at startup
  try {
    const args = process.argv;
    const apiKeyIndex = args.indexOf('--api-key');
    if (apiKeyIndex === -1) {
      throw new Error('API key is required. Please provide --api-key argument.');
    }

    const apiKey = args[apiKeyIndex + 1];

    if (!apiKey || apiKey.startsWith('--')) {
      throw new Error('Invalid API key provided. Please provide a valid API key after --api-key flag.');
    }
    setCoddieApiKey(apiKey);
    console.error("API key parsed successfully at startup");
  } catch (error) {
    console.error("Failed to parse API key:", error instanceof Error ? error.message : error);
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Coddie MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
