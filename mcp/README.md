# @abhivarde/syncui-mcp

MCP server for [Sync UI](https://syncui.design) — animated React components built with MUI and Motion.

## Setup

### Claude Code

```json
{
  "mcpServers": {
    "syncui": {
      "command": "npx",
      "args": ["-y", "@abhivarde/syncui-mcp"]
    }
  }
}
```

### Cursor / Windsurf

Add the same config to your MCP settings file.

## Tools

| Tool                 | Description                                         |
| -------------------- | --------------------------------------------------- |
| `list_components`    | List all components and blocks with variants        |
| `get_component`      | Get source code for a specific component or variant |
| `get_component_full` | Get the full multi-variant source file              |
| `search_components`  | Search by keyword, dependency, or type              |

## Usage

Once connected, ask your AI agent:

- "List all Sync UI components"
- "Get the neubrutalism button from Sync UI"
- "Add the lens card from Sync UI to my project"

## Links

- [Documentation](https://syncui.design/docs)
- [GitHub](https://github.com/AbhiVarde/syncui)
- [npm](https://npmjs.com/package/@abhivarde/syncui)
