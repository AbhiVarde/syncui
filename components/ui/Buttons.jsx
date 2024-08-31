import React, { useEffect, useState } from "react";
import { Button, Box, useTheme, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { IoSend, IoArrowForward, IoAdd } from "react-icons/io5";

const MotionButton = motion(Button);

const ButtonVariants = () => {
  const theme = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box display="flex" flexWrap="wrap" gap={2.5} justifyContent="center">
            {/* Neubrutalism */}
            <MotionButton
              variant="contained"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "4px 4px 0 currentColor",
                borderRadius: 0,
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                "&:hover": {
                  borderColor: "divider",
                  boxShadow: "2px 2px 0 currentColor",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                },
              }}
            >
              Neubrutalism
            </MotionButton>

            {/* Animated Border */}
            <MotionButton
              variant="outlined"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 1,
                maxWidth: 120,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "divider",
                  outline: "0px !important",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: -2,
                  overflow: "hidden",
                  borderRadius: "inherit",
                  padding: "0px !important",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "-200%",
                    background:
                      theme.palette.mode === "dark"
                        ? "conic-gradient(from 0deg, transparent 0 340deg, #FFF 360deg)"
                        : "conic-gradient(from 0deg, transparent 0 340deg, #000 360deg)",
                    animation: "rotate 5s linear infinite",
                  },
                  "@keyframes rotate": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                  },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 1,
                  borderRadius: "inherit",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                }}
              />
              <Typography
                variant="body2"
                style={{ zIndex: 1, fontWeight: 500 }}
              >
                Border
              </Typography>
            </MotionButton>

            {/* Gradient Shine */}
            <MotionButton
              variant="contained"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(110deg, #fff 45%, #e4e4e7 55%, #fff)"
                    : "linear-gradient(110deg, #000 45%, #333 55%, #000)",
                backgroundSize: "200% 100%",
                animation: "shine 3s linear infinite",
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "divider",
                },
                "@keyframes shine": {
                  "0%": { backgroundPosition: "200% 0" },
                  "100%": { backgroundPosition: "-200% 0" },
                },
              }}
            >
              Gradient Shine
            </MotionButton>

            {/* Underline */}
            <MotionButton
              variant="text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                color: "text.primary",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: "2px",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "text.primary",
                  transform: "scaleX(0)",
                  transformOrigin: "bottom right",
                  transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                  transformOrigin: "bottom left",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Underline
            </MotionButton>

            {/* Send Icon */}
            <MotionButton
              variant="outlined"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                color: "text.primary",
                borderColor: "divider",
                position: "relative",
                overflow: "hidden",
                minWidth: "100px",
                transition: "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
                "&:hover": {
                  backgroundColor: "text.primary",
                  color: "background.paper",
                  borderColor: "divider",
                },
                "& .icon, & .text": {
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                  transition: "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
                },
                "& .icon": {
                  transform: "translateX(-100%)",
                },
                "&:hover .icon": {
                  transform: "translateX(0)",
                },
                "&:hover .text": {
                  transform: "translateX(100%)",
                },
              }}
            >
              <span className="icon">
                <IoSend />
              </span>
              <span className="text">Send</span>
            </MotionButton>

            {/* Expand */}
            <MotionButton
              variant="outlined"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              sx={{
                display: "flex",
                alignItems: "center",
                transition: "0.3s",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "divider",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Expand
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "inline-flex", overflow: "hidden" }}
                    >
                      <IoAdd size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Box>
            </MotionButton>

            {/* Glitch */}
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                position: "relative",
                color: "text.primary",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                padding: "10px 20px",
                transition: "all 0.3s ease",
                "&::before, &::after": {
                  content: `"Glitch"`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "&::before": {
                  left: "2px",
                  textShadow:
                    theme.palette.mode === "dark" ? "2px 0 #fff" : "2px 0 #000",
                  clipPath: "inset(0 100% 0 0)",
                  animation: "glitch-anim 4s infinite linear alternate-reverse",
                },
                "&::after": {
                  left: "-2px",
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "-2px 0 #fff"
                      : "-2px 0 #000",
                  clipPath: "inset(0 0 0 100%)",
                  animation:
                    "glitch-anim 4s infinite linear alternate-reverse 2s",
                },
                "&:hover": {
                  color: theme.palette.mode === "dark" ? "#000" : "#fff",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                  "&::before": {
                    textShadow:
                      theme.palette.mode === "dark"
                        ? "2px 0 #000"
                        : "2px 0 #fff",
                  },
                  "&::after": {
                    textShadow:
                      theme.palette.mode === "dark"
                        ? "-2px 0 #000"
                        : "-2px 0 #fff",
                  },
                },
                "@keyframes glitch-anim": {
                  "0%": { clipPath: "inset(0 100% 0 0)" },
                  "100%": { clipPath: "inset(0 0 0 0)" },
                },
              }}
            >
              Glitch
            </MotionButton>

            {/* Outline Fill */}
            <MotionButton
              variant="outlined"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                color: "text.primary",
                borderColor: "divider",
                position: "relative",
                overflow: "hidden",
                zIndex: 1,

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "text.primary",
                  transform: "scaleX(0)",
                  transformOrigin: "right",
                  transition: "transform 0.3s ease",
                  zIndex: -1,
                },
                "&:hover": {
                  color: "background.paper",
                  "&::before": {
                    transform: "scaleX(1)",
                    transformOrigin: "left",
                  },
                },
              }}
            >
              Fill
            </MotionButton>

            {/* Elastic Slide */}
            <MotionButton
              variant="outlined"
              whileHover="hover"
              sx={{
                color: "text.primary",
                borderColor: "divider",
                overflow: "hidden",
                "&:hover": {
                  borderColor: "divider",
                  backgroundColor: "transparent",
                },
              }}
            >
              <motion.div
                style={{ display: "flex", alignItems: "center" }}
                variants={{
                  hover: {
                    x: -5,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  },
                }}
              >
                Elastic
                <motion.div
                  style={{ marginLeft: 8, display: "flex" }}
                  variants={{
                    hover: {
                      x: [-20, 5, 0],
                      opacity: [0, 1, 1],
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      },
                    },
                  }}
                >
                  <IoArrowForward />
                </motion.div>
              </motion.div>
            </MotionButton>

            {/* Magnetic */}
            <MotionButton
              variant="outlined"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              sx={{
                color: "text.primary",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "divider",
                  backgroundColor: "transparent",
                },
              }}
            >
              Magnetic
            </MotionButton>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ButtonVariants;
