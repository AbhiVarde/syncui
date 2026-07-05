#!/usr/bin/env node

const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const {
  StdioServerTransport,
} = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");

const REGISTRY_URL = "https://syncui.design/r";
const TOKENS_URL = "https://syncui.design/tokens.json";

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchIndex() {
  return fetchJSON(`${REGISTRY_URL}/index.json`);
}

async function fetchEntry(name) {
  return fetchJSON(`${REGISTRY_URL}/${name}.json`);
}

async function fetchAllEntries() {
  const index = await fetchIndex();
  if (!index) return { index: null, entries: {} };

  const names = [...(index.components || []), ...(index.blocks || [])];
  const results = await Promise.all(
    names.map(async (name) => [name, await fetchEntry(name)]),
  );

  const entries = {};
  for (const [name, entry] of results) {
    if (entry) entries[name] = entry;
  }

  return { index, entries };
}

const server = new McpServer({
  name: "syncui",
  version: "1.0.0",
});

server.tool(
  "list_components",
  "List all Sync UI components and blocks with variants",
  {},
  async () => {
    const { index, entries } = await fetchAllEntries();

    if (!index) {
      return {
        isError: true,
        content: [
          { type: "text", text: "Could not reach the syncui registry." },
        ],
      };
    }

    const result = Object.entries(entries).map(([name, entry]) => ({
      name,
      type: entry.type,
      defaultVariant: entry.default,
      variants: Object.keys(entry.variants || {}),
      dependencies: entry.dependencies,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { total: result.length, items: result },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "get_component",
  "Get source code for a specific Sync UI component or block variant",
  {
    name: z.string().describe("Component name e.g. buttons, cards, hero"),
    variant: z
      .string()
      .optional()
      .describe("Variant name e.g. neubrutalism, lens. Omit for default."),
  },
  async ({ name, variant }) => {
    const entry = await fetchEntry(name.toLowerCase());

    if (!entry) {
      const index = await fetchIndex();
      const available = index
        ? [...(index.components || []), ...(index.blocks || [])].join(", ")
        : "unknown";
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `"${name}" not found. Available: ${available}`,
          },
        ],
      };
    }

    const resolvedVariant = variant || entry.default;
    const variantEntry = entry.variants?.[resolvedVariant];

    if (!variantEntry) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Variant "${resolvedVariant}" not found. Available: ${Object.keys(entry.variants || {}).join(", ")}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name,
              variant: resolvedVariant,
              type: entry.type,
              fileName: entry.fileName,
              dependencies: entry.dependencies,
              installCommand: `npm install ${(entry.dependencies || []).join(" ")}`,
              code: variantEntry.code,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "get_component_full",
  "Get every variant's source code for a component in one call",
  { name: z.string().describe("Component name") },
  async ({ name }) => {
    const entry = await fetchEntry(name.toLowerCase());

    if (!entry) {
      const index = await fetchIndex();
      const available = index
        ? [...(index.components || []), ...(index.blocks || [])].join(", ")
        : "unknown";
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `"${name}" not found. Available: ${available}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name,
              type: entry.type,
              fileName: entry.fileName,
              dependencies: entry.dependencies,
              installCommand: `npm install ${(entry.dependencies || []).join(" ")}`,
              default: entry.default,
              variants: entry.variants,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "search_components",
  "Search Sync UI components by keyword",
  { query: z.string().describe("Search term e.g. form, animation, mui") },
  async ({ query }) => {
    const { entries } = await fetchAllEntries();
    const q = query.toLowerCase();

    const results = Object.entries(entries)
      .filter(
        ([name, entry]) =>
          name.includes(q) ||
          entry.type?.includes(q) ||
          (entry.dependencies || []).some((d) => d.includes(q)),
      )
      .map(([name, entry]) => ({
        name,
        type: entry.type,
        fileName: entry.fileName,
        dependencies: entry.dependencies,
      }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { query, count: results.length, results },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "get_design_system",
  "Get the full Sync UI design system: theme tokens, styling approach, theme modes, and every component/block with its variants. Use this to import Sync UI as a design system for AI-assisted design or code generation.",
  {},
  async () => {
    const { index, entries } = await fetchAllEntries();
    const tokens = await fetchJSON(TOKENS_URL);

    if (!index) {
      return {
        isError: true,
        content: [
          { type: "text", text: "Could not reach the syncui registry." },
        ],
      };
    }

    const manifest = Object.entries(entries).map(([name, entry]) => ({
      name,
      type: entry.type,
      fileName: entry.fileName,
      defaultVariant: entry.default,
      variants: Object.keys(entry.variants || {}),
      dependencies: entry.dependencies,
    }));

    const designSystem = {
      name: "syncui",
      description:
        "Animated React component library built with MUI (Material UI) and Motion (motion/react)",
      styling: {
        library: "@mui/material",
        stylingApproach: "sx prop, no className or plain CSS",
        animation: "motion/react",
        animationNote: "never import from framer-motion, use motion/react",
        themeModes: ["light", "dark"],
        themeSystem:
          "MUI ThemeProvider with palette.mode, see setup docs for framework-specific wiring",
      },
      tokens: tokens || null,
      tokensNote: tokens
        ? undefined
        : `Could not fetch live tokens from ${TOKENS_URL}.`,
      totalComponents: (index.components || []).length,
      totalBlocks: (index.blocks || []).length,
      manifest,
      docsUrl: "https://syncui.design/docs",
      registryUrl: "https://syncui.design/r/index.json",
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(designSystem, null, 2),
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
