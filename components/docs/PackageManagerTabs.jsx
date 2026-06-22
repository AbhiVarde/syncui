import { useState, useCallback, useMemo } from "react";
import { Box, Paper, ButtonBase } from "@mui/material";
import { LuCopy, LuCheck } from "react-icons/lu";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const PackageManagerTabs = ({ npm, yarn, pnpm, bun }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const commands = useMemo(
    () =>
      [
        { label: "npm", value: npm },
        { label: "yarn", value: yarn },
        { label: "pnpm", value: pnpm },
        { label: "bun", value: bun },
      ].filter((cmd) => cmd.value),
    [npm, yarn, pnpm, bun],
  );

  const currentCommand = commands[activeTab]?.value || "";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [currentCommand]);

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "relative",
        mb: 4,
        overflow: "hidden",
        borderRadius: 2,
        bgcolor: "#0a0a0a",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.75, sm: 1 },
          px: { xs: 1, sm: 1.5 },
          py: 0.75,
          bgcolor: "#161616",
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {commands.map((cmd, idx) => {
          const isActive = activeTab === idx;
          return (
            <ButtonBase
              key={cmd.label}
              onClick={() => setActiveTab(idx)}
              disableRipple
              sx={{
                height: 28,
                flexShrink: 0,
                fontFamily: "monospace",
                fontSize: 13,
                fontWeight: 400,
                color: isActive ? "#fff" : "#a1a1a1",
                textShadow: isActive ? "0 0 0.4px currentColor" : "none",
                px: 1.25,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: isActive
                  ? "rgba(255,255,255,0.18)"
                  : "transparent",
                transition: "color 0.15s ease, border-color 0.15s ease",
                "&:hover": {
                  color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                },
              }}
            >
              {cmd.label}
            </ButtonBase>
          );
        })}
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <SyntaxHighlighter
          language="bash"
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: "14px 16px",
            fontSize: 14,
            lineHeight: 1.5,
            borderRadius: 0,
            background: "#0a0a0a",
            whiteSpace: "pre",
          }}
        >
          {currentCommand}
        </SyntaxHighlighter>
      </Box>

      <ButtonBase
        onClick={handleCopy}
        disableRipple
        aria-label={copied ? "Copied" : "Copy command"}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 26,
          height: 26,
          color: "rgba(255,255,255,0.5)",
          borderRadius: 1,
          transition: "color 0.15s ease",
          "&:hover": { color: "rgba(255,255,255,0.9)" },
        }}
      >
        {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
      </ButtonBase>
    </Paper>
  );
};

export default PackageManagerTabs;
