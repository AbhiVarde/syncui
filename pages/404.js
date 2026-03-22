import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { LiaTelegramPlane } from "react-icons/lia";
import Head from "next/head";
import { useRouter } from "next/router";

const getRandomInt = (max) => Math.floor(Math.random() * max);

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const NUMBER_CHARACTER_SET = "0123456789".split("");

const ScrambleText = ({
  text,
  duration = 800,
  delay = 0,
  characterSet = DEFAULT_CHARACTER_SET,
  monospace = false,
  animate = true,
}) => {
  const [displayText, setDisplayText] = useState(() => text.split(""));
  const iterationCount = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!animate) {
      setDisplayText(text.split(""));
      return;
    }
    const startTimeout = setTimeout(() => setIsAnimating(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay, animate, text]);

  useEffect(() => {
    if (!isAnimating || !animate) return;

    const maxIterations = text.length;
    const startTime = performance.now();
    let animationFrameId;

    const animateFrame = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = Math.pow(progress, 1.5);

      iterationCount.current = easedProgress * maxIterations;

      setDisplayText((currentText) =>
        currentText.map((letter, index) =>
          letter === " "
            ? letter
            : index <= iterationCount.current
              ? text[index]
              : characterSet[getRandomInt(characterSet.length)],
        ),
      );

      if (progress < 1) animationFrameId = requestAnimationFrame(animateFrame);
    };

    animationFrameId = requestAnimationFrame(animateFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [text, duration, isAnimating, characterSet, animate]);

  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        fontFamily: monospace ? "'Roboto Mono', monospace" : "inherit",
      }}
    >
      {displayText.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: animate ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.06 }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Box>
  );
};

const ScrambleNumber = ({ number }) => (
  <ScrambleText
    text={number.toString()}
    characterSet={NUMBER_CHARACTER_SET}
    monospace
  />
);

const NotFound = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 // Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          backgroundColor:
            theme.palette.mode === "dark" ? "#121212" : "#ffffff",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "520px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 0.5 }}>
            <LiaTelegramPlane
              size={90}
              color={theme.palette.mode === "dark" ? "#fff" : "#000"}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4rem", sm: "5rem" },
              fontWeight: 600,
              mb: 1,
              fontFamily: "'Roboto Mono', monospace",
            }}
          >
            <ScrambleNumber number={404} />
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              mb: 1,
              color: theme.palette.mode === "dark" ? "#e0e0e0" : "#333",
            }}
          >
            Page not found
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 3,
              color: theme.palette.mode === "dark" ? "#bdbdbd" : "#666",
              maxWidth: "380px",
            }}
          >
            The page you’re looking for doesn’t exist.
          </Typography>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="contained"
              onClick={() => router.push("/")}
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: "8px",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#fff" : "#000",
                color: theme.palette.mode === "dark" ? "#000" : "#fff",
                fontWeight: 500,
                fontSize: "13px",
                textTransform: "none",
                minHeight: "32px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#e5e5e5" : "#222",
                  boxShadow: "none",
                },
                transition: "background-color 0.15s ease",
              }}
            >
              Home
            </Button>

            <Button
              variant="outlined"
              onClick={() => window.history.back()}
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "13px",
                textTransform: "none",
                minHeight: "32px",
                borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                "&:hover": {
                  borderColor: theme.palette.mode === "dark" ? "#ccc" : "#333",
                  backgroundColor: "transparent",
                },
                transition: "border-color 0.15s ease",
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
