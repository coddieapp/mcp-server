# Coddie MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with **secure, read-only access** to your [Coddie](https://coddie.dev) project planning data. This allows AI assistants like Claude, Cursor, and Windsurf to help you work with your existing projects, development phases, implementation steps, and project rules.

## What is Coddie?

**Coddie** is a SaaS project planning application that helps developers transform ideas into structured, production-ready development plans. It uses an interactive 4-step planning process and generates comprehensive PRD documents, development phases, and actionable implementation steps focused on Next.js + TypeScript + Supabase applications.

## Prerequisites

- Node.js (version 18 or higher)
- A [Coddie](https://coddie.dev) account with existing projects
- API key from your Coddie account settings

## Setup

### 1. Get Your Coddie API Key

1. Log in to your [Coddie account](https://coddie.dev)
2. Navigate to **Settings** → **API Keys**  
3. Generate a new API key for MCP access
4. Copy the generated API key (you'll need it for configuration)

### 2. Configure Your AI Assistant

#### Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "coddie": {
      "command": "npx",
      "args": [
        "-y",
        "@coddieapp/mcp-server@latest",
        "--api-key",
        "your_coddie_api_key_here"
      ]
    }
  }
}
```

#### Other AI Assistants

For **Cursor** or **Windsurf**, follow their respective MCP configuration documentation using the same command structure above.

### 3. Restart Your AI Assistant

After updating the configuration file, restart your AI assistant to load the Coddie MCP server.

## Security Considerations

⚠️ **Important Security Notes:**

- **Read-only access**: This MCP server provides read-only access to your Coddie data
- **API key security**: Keep your API key secure and don't share it publicly
- **Project scoping**: The server only accesses projects belonging to your authenticated account
- **Review tool calls**: Always review what the AI assistant is requesting before allowing tool execution

## Available Tools

The Coddie MCP server provides these tools to AI assistants:

### Project Management
- **`list_projects`** - List all your Coddie projects
- **`get_project_info`** - Get detailed project information (name, description, tech stack, status)
- **`get_context`** - Get development progress and context summary for a project

### Features & Planning
- **`list_features`** - List all features for a specific project

### Development Phases
- **`list_phases`** - List all development phases for a project
- **`get_phase`** - Get detailed phase information (title, description, status)
- **`list_steps`** - List all implementation steps for a specific phase  
- **`get_step`** - Get detailed step information (content, code examples, completion status)

### Project Rules
- **`list_rules`** - List all rules for a specific project
- **`get_rule`** - Get detailed rule information (file patterns, content, descriptions)

## Example Usage

Once configured, you can ask your AI assistant questions like:

- *"What projects do I have in Coddie?"*
- *"Show me the current phase for my e-commerce project"*
- *"What implementation steps are left in the authentication phase?"*
- *"What are the coding rules for my SaaS project?"*

## Troubleshooting

### "API key is required" error
- Ensure you've added the `--api-key` argument to your configuration
- Verify your API key is correct and not expired in Coddie settings

### "HTTP error! status: 401" 
- Your API key may be invalid or revoked
- Generate a new API key in your Coddie account settings

### Connection issues
- Ensure you have an active internet connection
- Check that you can access coddie.dev in your browser
- Restart your AI assistant after configuration changes

## Contributing

This MCP server is open source. Feel free to submit issues and pull requests on [GitHub](https://github.com/coddieapp/mcp-server).

## Support

- **Documentation**: [Coddie Help Center](https://coddie.dev/help)
- **Issues**: [GitHub Issues](https://github.com/coddieapp/mcp-server/issues)
- **Contact**: [support@coddie.dev](mailto:support@coddie.dev)

---

**Note**: This MCP server requires an active Coddie account and existing projects to be useful. If you're new to Coddie, [sign up](https://coddie.dev) and create your first project!