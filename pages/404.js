import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, useTheme } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { LiaTelegramPlane } from "react-icons/lia";

const getRandomInt = (max) => Math.floor(Math.random() * max);

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const NUMBER_CHARACTER_SET = "0123456789".split("");

const ScrambleText = ({
  text,
  duration = 1200,
  delay = 0,
  characterSet = DEFAULT_CHARACTER_SET,
}) => {
  const [displayText, setDisplayText] = useState(() => text.split(""));
  const iterationCount = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isAnimating) return;

    const maxIterations = text.length;
    const startTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      iterationCount.current = progress * maxIterations;

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
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [text, duration, isAnimating, characterSet]);

  return (
    <Box component="span" sx={{ display: "inline-block" }}>
      {displayText.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Box>
  );
};

const ScrambleNumber = ({ number, duration = 1500, delay = 200 }) => {
  return (
    <ScrambleText
      text={number.toString()}
      duration={duration}
      delay={delay}
      characterSet={NUMBER_CHARACTER_SET}
    />
  );
};

const NotFound = () => {
  const theme = useTheme();
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  };

  const planeVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    animate: {
      y: [-5, 5, -5],
      rotate: [-3, 3, -3],
      scale: [1, 1.03, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <Head>
        <title>Page Not Found // Sync UI</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist or has moved."
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
          <Box sx={{ mb: 1 }}>
            <motion.div
              variants={planeVariants}
              initial="hidden"
              animate={["visible", "animate"]}
            >
              <LiaTelegramPlane
                size={72}
                color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
              />
            </motion.div>
          </Box>

          {/* 404 Heading */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "4rem", sm: "5rem" },
                fontWeight: 800,
                mb: 1,
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
              }}
            >
              <ScrambleNumber number={404} />
            </Typography>
          </motion.div>

          {/* Subheading with scramble animation */}
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
              <ScrambleText
                text="Oops! Page took flight!"
                delay={800}
                duration={1500}
              />
            </Typography>
          </motion.div>

          {/* Description */}
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

          {/* Action buttons */}
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
                  px: 3,
                  py: 1,
                  borderRadius: "4px",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Return Home
              </Button>

              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: "4px",
                  fontWeight: 500,
                  textTransform: "none",
                  borderColor:
                    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor:
                      theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
                    backgroundColor: "transparent",
                  },
                  transition: "all 0.3s ease",
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
