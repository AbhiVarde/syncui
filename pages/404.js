import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, useTheme } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { LiaTelegramPlane } from "react-icons/lia";

const NotFound = () => {
  const theme = useTheme();
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
      },
    },
  };

  // Enhanced plane animation with multiple effects
  const planeVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Trail effect for the plane
  const trailVariants = {
    initial: { opacity: 0, x: 0 },
    animate: (index) => ({
      opacity: [0.7, 0],
      x: [-10 * index, -25 * index],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: index * 0.2,
        ease: "easeOut",
      },
    }),
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
            <LiaTelegramPlane
              size={72}
              color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
            />
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
              404
            </Typography>
          </motion.div>

          {/* Subheading */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                mb: 1,
                color: theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
              }}
            >
              Oops! Page took flight!
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
