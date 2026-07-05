#!/usr/bin/env node

const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const {
  StdioServerTransport,
} = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require("zod");
const path = require("path");
const fs = require("fs");

const REGISTRY = path.join(__dirname, "../../cli/registry");
const TOKENS_URL = "https://syncui.design/tokens.json";

const load = (file) =>
  JSON.parse(fs.readFileSync(path.join(REGISTRY, file), "utf-8"));

async function fetchTokens() {
  try {
    const res = await fetch(TOKENS_URL);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
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
    const components = load("components.json");
    const blocks = load("blocks.json");
    const variants = load("variants.json");

    const format = (registry, type) =>
      Object.keys(registry).map((name) => {
        const v = variants[name];
        const variantKeys = v ? Object.keys(v.variants) : [];
        return {
          name,
          type,
          defaultVariant: v?.default ?? variantKeys[0] ?? null,
          variants: variantKeys,
          dependencies: registry[name].dependencies,
        };
      });

    const result = [
      ...format(components, "component"),
      ...format(blocks, "block"),
    ];

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
    const registry = { ...load("components.json"), ...load("blocks.json") };
    const variants = load("variants.json");

    const item = registry[name];
    if (!item) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `"${name}" not found. Available: ${Object.keys(registry).join(", ")}`,
          },
        ],
      };
    }

    const v = variants[name];
    let code, resolvedVariant;

    if (v) {
      resolvedVariant = variant || v.default;
      const entry = v.variants[resolvedVariant];
      if (!entry) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Variant "${resolvedVariant}" not found. Available: ${Object.keys(v.variants).join(", ")}`,
            },
          ],
        };
      }
      code = entry.code;
    } else {
      code = item.code;
      resolvedVariant = "default";
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name,
              variant: resolvedVariant,
              type: item.type,
              fileName: item.fileName,
              dependencies: item.dependencies,
              installCommand: `npm install ${item.dependencies.join(" ")}`,
              code,
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
  "Get the full multi-variant source file for a component",
  { name: z.string().describe("Component name") },
  async ({ name }) => {
    const registry = { ...load("components.json"), ...load("blocks.json") };
    const item = registry[name];

    if (!item) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `"${name}" not found. Available: ${Object.keys(registry).join(", ")}`,
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
              type: item.type,
              fileName: item.fileName,
              dependencies: item.dependencies,
              installCommand: `npm install ${item.dependencies.join(" ")}`,
              code: item.code,
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
    const registry = { ...load("components.json"), ...load("blocks.json") };
    const q = query.toLowerCase();

    const results = Object.entries(registry)
      .filter(
        ([name, item]) =>
          name.includes(q) ||
          item.type.includes(q) ||
          item.dependencies.some((d) => d.includes(q)),
      )
      .map(([name, item]) => ({
        name,
        type: item.type,
        fileName: item.fileName,
        dependencies: item.dependencies,
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
    const components = load("components.json");
    const blocks = load("blocks.json");
    const variants = load("variants.json");
    const tokens = await fetchTokens();

    const format = (registry, type) =>
      Object.keys(registry).map((name) => {
        const v = variants[name];
        const variantKeys = v ? Object.keys(v.variants) : [];
        return {
          name,
          type,
          fileName: registry[name].fileName,
          defaultVariant: v?.default ?? variantKeys[0] ?? null,
          variants: variantKeys,
          dependencies: registry[name].dependencies,
        };
      });

    const manifest = [
      ...format(components, "component"),
      ...format(blocks, "block"),
    ];

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
        : `Could not fetch live tokens from ${TOKENS_URL}. Static fallback: see https://syncui.design/tokens.json directly.`,
      totalComponents: Object.keys(components).length,
      totalBlocks: Object.keys(blocks).length,
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
