import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/router";

const LoaderVariants = ({ variant }) => {
  const theme = useTheme();
  const router = useRouter();
  const { asPath } = router;
  const loaderColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const loaderStyle = {
    width: 160,
    height: asPath === "/docs/components/loaders" ? 60 : 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:
      asPath === "/docs/components/loaders" ? "center" : "space-between",
    padding: asPath === "/docs/components/loaders" ? "0px" : "16px 0",
  };

  const typographyStyle = {
    fontWeight: 400,
    marginBottom: 2,
    textAlign: "center",
  };

  const renderLoader = () => {
    switch (variant) {
      case "pulsatingDots":
        return (
          <Box sx={{ height: 40, position: "relative", width: 60 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: loaderColor,
                  position: "absolute",
                  left: i * 24,
                  top: "50%",
                  y: "-50%",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </Box>
        );

      case "morphingCube":
        return (
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
              duration: 1.6,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
            }}
          />
        );

      case "pulsatingRing":
        return (
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
              duration: 1.6,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
            }}
          />
        );

      case "circularSweep":
        return (
          <svg width="50" height="50" viewBox="0 0 50 50">
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              stroke={loaderColor}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="126"
              initial={{ strokeDashoffset: 126 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.45, 0, 0.55, 1],
                repeat: Infinity,
              }}
            />
          </svg>
        );

      case "fadingSquares":
        return (
          <Box sx={{ height: 40, position: "relative", width: 100 }}>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: loaderColor,
                  position: "absolute",
                  top: "50%",
                  y: -6,
                  left: i * 24 + 8,
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </Box>
        );

      case "orbitalSpin":
        return (
          <motion.div
            style={{
              width: 40,
              height: 40,
              border: `3px solid ${loaderColor}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.8,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        );

      case "triadicOrbit":
        return (
          <motion.div
            style={{
              width: 40,
              height: 40,
              position: "relative",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: loaderColor,
                  top: 15,
                  left: 15,
                  transform: `rotate(${i * 120}deg) translate(0, -15px)`,
                }}
                animate={{
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        );

      case "barWave":
        return (
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
                  duration: 0.8,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                  delay: i * 0.08,
                }}
              />
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Box sx={loaderStyle}>
            {asPath !== "/docs/components/loaders" && (
              <Typography variant="body1" sx={typographyStyle}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Typography>
            )}
            {renderLoader()}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderVariants;
