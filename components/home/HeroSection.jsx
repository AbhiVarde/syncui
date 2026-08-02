// components/home/HeroSection.jsx
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";
import Image from "next/image";
import CommandBar from "./CommandBar";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Container maxWidth="xl" sx={{ px: "0px !important" }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 260,
          backgroundColor: "background.default",
          backgroundImage: isDarkMode
            ? `repeating-linear-gradient(-60deg, transparent 0px, transparent 9px, rgba(255,255,255,0.12) 9px, rgba(255,255,255,0.12) 10px)`
            : `repeating-linear-gradient(-60deg, transparent 0px, transparent 9px, rgba(0,0,0,0.08) 9px, rgba(0,0,0,0.08) 10px)`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: isDarkMode
              ? "rgba(0,0,0,0.35)"
              : "rgba(255,255,255,0.25)",
          }}
        />

        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: isDarkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
            borderRadius: 2.5,
            p: 3,
            mx: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component={motion.div}
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <a
                href="https://vercel.com/open-source-program"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vercel Open Source Program"
              >
                <Image
                  src="/vercel-oss.svg"
                  alt="Vercel OSS Program"
                  width={180}
                  height={32}
                  priority
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    height: "auto",
                    filter: isDarkMode ? "none" : "invert(0.01)",
                  }}
                />
              </a>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                component={motion.div}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                  }}
                >
                  Ship interfaces, not boilerplate
                </Typography>
              </Box>

              <Box
                component={motion.div}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.18 }}
              >
                <Typography
                  color="text.secondary"
                  sx={{
                    maxWidth: 500,
                    lineHeight: 1.55,
                  }}
                >
                  Components, blocks, and charts built with MUI and Motion.
                  <br />
                  Copy the code, install with a CLI, or connect via MCP.
                </Typography>
              </Box>
            </Box>

            <Box
              component={motion.div}
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.24 }}
            >
              <CommandBar isDark={isDarkMode} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default HeroSection;
