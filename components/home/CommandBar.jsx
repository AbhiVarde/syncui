import { useState } from "react";
import { Box } from "@mui/material";
import { LuCopy, LuCheck } from "react-icons/lu";

const COMMANDS = {
  you: "npx @abhivarde/syncui@latest add hero",
  "your agent": "npx skills add AbhiVarde/syncui",
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = "0.28s";

const CommandBar = ({ isDark }) => {
  const [mode, setMode] = useState("you");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMMANDS[mode]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.25,
          p: 0.35,
          borderRadius: 1.5,
          bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          flexShrink: 0,
        }}
      >
        {["you", "your agent"].map((tab) => {
          const isActive = mode === tab;
          return (
            <Box
              key={tab}
              component="button"
              onClick={() => setMode(tab)}
              aria-pressed={isActive}
              sx={{
                background: "none",
                border: "none",
                px: 1.1,
                py: 0.4,
                borderRadius: 1,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: "nowrap",
                color: isActive ? "text.primary" : "text.secondary",
                bgcolor: isActive
                  ? isDark
                    ? "rgba(255,255,255,0.08)"
                    : "#ffffff"
                  : "transparent",
                boxShadow: isActive
                  ? isDark
                    ? "none"
                    : "0 1px 2px rgba(0,0,0,0.06)"
                  : "none",
                transition: `background-color ${DURATION} ${EASE}, color ${DURATION} ${EASE}, box-shadow ${DURATION} ${EASE}`,
                "&:hover": { color: "text.primary" },
              }}
            >
              For {tab}
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.65,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
          backgroundColor: isDark ? "#0a0a0a" : "#fafafa",
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          fontSize: 13,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          maxWidth: "100%",
        }}
      >
        <Box component="span" sx={{ color: "text.secondary", flexShrink: 0 }}>
          $
        </Box>

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            whiteSpace: "nowrap",
            height: "1em",
            lineHeight: 1,
            width: `${COMMANDS[mode].length}ch`,
            transition: `width ${DURATION} ${EASE}`,
          }}
        >
          <Box
            key={mode}
            component="span"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "inline-block",
              lineHeight: 1,
              opacity: 0,
              transform: "translateY(3px)",
              animation: `cmdIn ${DURATION} ${EASE} forwards`,
              "@keyframes cmdIn": {
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {COMMANDS[mode]}
          </Box>
        </Box>

        <Box
          component="button"
          onClick={handleCopy}
          aria-label="Copy command"
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 14,
            height: 14,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "text.secondary",
            flexShrink: 0,
            ml: 0.25,
            "&:hover": { color: "text.primary" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: copied ? 0 : 1,
              transform: copied ? "scale(0.6)" : "scale(1)",
              transition: `opacity 0.15s ${EASE}, transform 0.15s ${EASE}`,
            }}
          >
            <LuCopy size={14} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: copied ? 1 : 0,
              transform: copied ? "scale(1)" : "scale(0.6)",
              transition: `opacity 0.15s ${EASE}, transform 0.15s ${EASE}`,
            }}
          >
            <LuCheck size={14} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommandBar;
