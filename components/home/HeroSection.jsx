import { useState } from "react";
import { Typography, Box, Container, useTheme } from "@mui/material";
import Image from "next/image";

import { SiReact, SiNextdotjs, SiJavascript, SiMui } from "react-icons/si";
import { LuCopy, LuCheck } from "react-icons/lu";

const TECH_ICONS = [
  { Icon: SiMui, title: "MUI", color: "#007FFF", url: "https://mui.com/" },
  {
    Icon: SiJavascript,
    title: "JavaScript",
    color: "#F7DF1E",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    Icon: SiReact,
    title: "React",
    color: "#61DAFB",
    url: "https://react.dev/",
  },
  {
    Icon: SiNextdotjs,
    title: "Next.js",
    color: null,
    url: "https://nextjs.org/",
  },
  { Icon: null, title: "Motion", url: "https://motion.dev/" },
];

const COMMANDS = {
  humans: "npx @abhivarde/syncui@latest add hero",
  agents: "npx skills add AbhiVarde/syncui",
};

const EASE = "cubic-bezier(0.22,1,0.36,1)";

const MotionIcon = () => (
  <img
    src="https://framerusercontent.com/images/3aQX5dnH5Yqgsn98QXKF2ZXxIE.png"
    alt=""
    aria-hidden="true"
    width={26}
    height={26}
    loading="lazy"
  />
);

const CommandBar = ({ isDark }) => {
  const [mode, setMode] = useState("humans");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMMANDS[mode]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.25 }}>
        {["humans", "agents"].map((tab, i) => (
          <Box
            key={tab}
            sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
          >
            {i > 0 && (
              <Box
                sx={{
                  width: "1px",
                  height: 12,
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.16)"
                    : "rgba(0,0,0,0.16)",
                }}
              />
            )}
            <Box
              component="button"
              onClick={() => setMode(tab)}
              sx={{
                background: "none",
                border: "none",
                p: 0,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                color: mode === tab ? "text.primary" : "text.secondary",
                textShadow: mode === tab ? "0 0 0.3px currentColor" : "none",
                transition: `color 0.2s ${EASE}, text-shadow 0.2s ${EASE}`,
              }}
            >
              For {tab}
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 1.75,
          py: 0.9,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
          backgroundColor: isDark ? "#0a0a0a" : "#fafafa",
          fontFamily: "monospace",
          fontSize: 13,
          maxWidth: "100%",
          transition: `border-color 0.2s ${EASE}`,
        }}
      >
        <Box component="span" sx={{ color: "text.secondary", flexShrink: 0 }}>
          $
        </Box>
        <Box
          sx={{
            display: "inline-block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: `${COMMANDS[mode].length + 0.5}ch`,
            transition: `width 0.28s ${EASE}`,
          }}
        >
          <Box
            key={mode}
            component="span"
            sx={{
              display: "inline-block",
              animation: `cmdIn 0.28s ${EASE}`,
              "@keyframes cmdIn": {
                from: { opacity: 0, transform: "translateY(4px)" },
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
            width: 15,
            height: 15,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "text.secondary",
            flexShrink: 0,
            ml: 0.5,
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
            <LuCopy size={15} />
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
            <LuCheck size={15} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const HeroSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ mb: 2 }}>
          <a
            href="https://vercel.com/open-source-program"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vercel Open Source Program (opens in new tab)"
          >
            <Image
              alt="Vercel OSS Program"
              src="/vercel-oss.svg"
              width={240}
              height={44}
              priority
              style={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                filter: !isDark ? "invert(1)" : "none",
              }}
            />
          </a>
        </Box>

        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontWeight: 600,
            letterSpacing: "-0.05em",
            mb: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box component="span">Beautifully designed components</Box>
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            and templates built with
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                height: { xs: 48, sm: 52 },
                ml: 0.5,
              }}
            >
              {TECH_ICONS.map(({ Icon, title, color, url }, index) => (
                <Box
                  key={title}
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  aria-label={`${title} (opens in new tab)`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 48, sm: 52 },
                    height: { xs: 48, sm: 52 },
                    borderRadius: "50%",
                    border: "3px solid",
                    borderColor: isDark ? "#000" : "#fff",
                    ml: index > 0 ? { xs: "-8px", sm: "-15px" } : 0,
                    zIndex: 5 - index,
                    backgroundColor: isDark ? "#1a1a1a" : "#fff",
                    overflow: "hidden",
                    textDecoration: "none",
                    transition: `transform 0.15s ${EASE}`,
                    "&:hover": {
                      transform: "translateY(-4px) scale(1.1)",
                      zIndex: 10,
                    },
                  }}
                >
                  {title === "Motion" ? (
                    <MotionIcon />
                  ) : (
                    <Icon
                      size={26}
                      aria-hidden="true"
                      focusable="false"
                      color={
                        title === "Next.js" ? (isDark ? "#fff" : "#000") : color
                      }
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Typography>

        <Typography
          component="p"
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 2,
            fontSize: { xs: 16, sm: 18 },
          }}
        >
          Animated components, blocks, and templates for React. Copy them in,
          install with a CLI, or hand them to your coding agent.
        </Typography>

        <CommandBar isDark={isDark} />
      </Box>
    </Container>
  );
};

export default HeroSection;
