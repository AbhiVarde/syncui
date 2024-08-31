import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const LoaderVariants = () => {
  const theme = useTheme();
  const loaderColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const loaderStyle = {
    width: 160,
    height: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
  };

  const typographyStyle = {
    fontWeight: 400,
    marginBottom: 2,
    textAlign: "center",
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
            {/* Pulsating Dots */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Pulsating Dots
              </Typography>
              <Box
                sx={{ height: 40, position: "relative", width: 12 + 2 * 24 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: loaderColor,
                      position: "absolute",
                      left: `${index * 24}px`,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Rotating Square */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Morphing Cube
              </Typography>
              <motion.div
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: loaderColor,
                }}
                animate={{
                  rotate: 360,
                  borderRadius: ["0%", "50%", "0%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </Box>

            {/* Morphing Circle */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Pulsating Ring
              </Typography>
              <motion.div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `3px solid ${loaderColor}`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  borderRadius: ["50%", "30%", "50%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </Box>

            {/* Circular Progress */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Circular Sweep
              </Typography>
              <svg width="50" height="50" viewBox="0 0 50 50">
                <motion.circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke={loaderColor}
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="126"
                  strokeDashoffset="126"
                  animate={{
                    strokeDashoffset: [126, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </svg>
            </Box>

            {/* Fading Squares */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Fading Squares
              </Typography>
              <Box sx={{ height: 40, position: "relative", width: 100 }}>
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: loaderColor,
                      position: "absolute",
                      top: "50%",
                      marginTop: -6,
                      left: `${index * 24 + 8}px`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/*  Orbital Spin */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Orbital Spin
              </Typography>
              <motion.div
                key={Math.random()} // Add this line to force re-render
                style={{
                  width: 40,
                  height: 40,
                  border: `3px solid ${loaderColor}`,
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </Box>

            {/* Triadic Orbit */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Triadic Orbit
              </Typography>
              <motion.div
                style={{
                  width: 40,
                  height: 40,
                  position: "relative",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    style={{
                      position: "absolute",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: loaderColor,
                      top: 15,
                      left: 15,
                      transform: `rotate(${
                        index * 120
                      }deg) translate(0, -15px)`,
                    }}
                    animate={{
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                ))}
              </motion.div>
            </Box>

            {/* Bar wave */}
            <Box sx={loaderStyle}>
              <Typography variant="body1" sx={typographyStyle}>
                Bar Wave
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  height: 40,
                  width: 60,
                }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: 4,
                      backgroundColor: loaderColor,
                      margin: "0 2px",
                    }}
                    animate={{
                      height: [10, 30, 10],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderVariants;
