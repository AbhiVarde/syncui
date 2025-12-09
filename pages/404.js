import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { LiaTelegramPlane } from "react-icons/lia";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

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

    const startTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, delay);
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
              : characterSet[getRandomInt(characterSet.length)]
        )
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateFrame);
      }
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
          transition={{ duration: 0.08, delay: index * 0.015 }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Box>
  );
};

const ScrambleNumber = ({ number, duration = 1000, delay = 100 }) => {
  return (
    <ScrambleText
      text={number.toString()}
      duration={duration}
      delay={delay}
      characterSet={NUMBER_CHARACTER_SET}
      monospace={true}
    />
  );
};

const NotFound = () => {
  const theme = useTheme();
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4,
      },
    },
  };

  const planeVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    animate: {
      y: [-3, 3, -3],
      rotate: [-2, 2, -2],
      scale: [1, 1.02, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <NextSeo
        title="404 // Page Not Found"
        description="The page you're looking for doesn't exist or has moved."
        noindex={true}
        nofollow={true}
      />
      <Head>
        <title>Page Not Found // Sync UI</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist or has moved."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div
            variants={planeVariants}
            initial="hidden"
            animate={["visible", "animate"]}
          >
            <LiaTelegramPlane
              size={100}
              color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "4rem", sm: "5rem" },
                fontWeight: 800,
                mb: 1,
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                fontFamily: "'Roboto Mono', monospace",
              }}
            >
              <ScrambleNumber number={404} />
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 1,
                color: theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
                height: "1.5em",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Oops! Page took flight!
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: theme.palette.mode === "dark" ? "#bdbdbd" : "#666666",
                maxWidth: "400px",
                mx: "auto",
              }}
            >
              Looks like this page decided to go on vacation. Maybe try our
              homepage instead?
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                onClick={() => router.push("/")}
                sx={{
                  px: 2.5,
                  py: 0.75,
                  borderRadius: "12px",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  fontWeight: 500,
                  fontSize: "14px",
                  textTransform: "none",
                  minHeight: "36px",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Return Home
              </Button>

              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                sx={{
                  px: 2.5,
                  py: 0.75,
                  borderRadius: "12px",
                  fontWeight: 500,
                  fontSize: "14px",
                  textTransform: "none",
                  minHeight: "36px",
                  borderColor:
                    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    borderColor:
                      theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
                    backgroundColor: "transparent",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Go Back
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </>
  );
};

export default NotFound;
