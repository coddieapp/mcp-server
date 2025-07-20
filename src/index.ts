#!/usr/bin/env node
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Import tool functions
import { listProjects, getProjectInfo, getContext } from "./tools/projects.js";
import { listFeatures } from "./tools/features.js";
import { listPhases, getPhase, listSteps } from "./tools/phases.js";
import { listRules, getRule } from "./tools/rules.js";

// Create server instance
const server = new McpServer({
  name: "coddie",
  version: "1.0.0"
});

// Register tools individually
server.registerTool("list_projects", {
  description: "List all projects for authenticated user",
  inputSchema: {}
}, async () => {
  const projects = await listProjects();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(projects, null, 2)
      }
    ],
    structuredContent: { projects }
  };
});

server.registerTool("get_project_info", {
  description: "Get project details (name, description, tech stack, features overview)",
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
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(features, null, 2)
      }
    ],
    structuredContent: { features }
  };
});

server.registerTool("list_phases", {
  description: "List all development phases for a project",
  inputSchema: {
    projectId: z.string().describe("The ID of the project to list phases for")
  }
}, async (args) => {
  const phases = await listPhases(args.projectId);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(phases, null, 2)
      }
    ],
    structuredContent: { phases }
  };
});

server.registerTool("get_phase", {
  description: "Get phase details (title, description, status, etc.)",
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
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(steps, null, 2)
      }
    ],
    structuredContent: { steps }
  };
});

server.registerTool("list_rules", {
  description: "List all rules for a specific project",
  inputSchema: {
    projectId: z.string().describe("The ID of the project to list rules for")
  }
}, async (args) => {
  const rules = await listRules(args.projectId);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(rules, null, 2)
      }
    ],
    structuredContent: { rules }
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
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Coddie MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
