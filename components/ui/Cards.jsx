import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBolt,
  FaCube,
  FaLayerGroup,
  FaPaintBrush,
  FaMeteor,
} from "react-icons/fa";
import { RxChevronDown } from "react-icons/rx";
import { FaWandMagicSparkles } from "react-icons/fa6";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const CardVariants = () => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [stack, setStack] = useState([0, 1, 2]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [meteors, setMeteors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const createMeteor = () => {
      const newMeteor = {
        id: Math.random(),
        x: Math.random() * 320,
        delay: Math.random() * 2,
      };
      setMeteors((prev) => [...prev, newMeteor]);
      setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== newMeteor.id));
      }, 2000);
    };

    const interval = setInterval(createMeteor, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stack.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [stack.length]);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
            {/* Meteor Shower */}
            <MotionCard
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              sx={{
                width: 320,
                height: 200,
                borderRadius: 2,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
                overflow: "hidden",
                position: "relative",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ position: "relative", zIndex: 2 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                  }}
                >
                  <FaMeteor style={{ marginRight: 8, color: "#FF6B6B" }} />
                  Meteor Shower
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#CCCCCC" : "#333333",
                  }}
                >
                  Watch the meteors streak across the night sky.
                </Typography>
              </CardContent>
              {meteors.map((meteor) => (
                <MotionBox
                  key={meteor.id}
                  initial={{ x: meteor.x, y: -20, opacity: 0 }}
                  animate={{
                    y: 220,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: meteor.delay,
                    ease: "linear",
                  }}
                  sx={{
                    position: "absolute",
                    width: "2px",
                    height: "20px",
                    background: (theme) =>
                      `linear-gradient(to bottom, ${
                        theme.palette.mode === "dark" ? "#FFFFFF" : "#000000"
                      }, transparent)`,
                    boxShadow: (theme) =>
                      `0 0 10px ${
                        theme.palette.mode === "dark" ? "#FFFFFF" : "#000000"
                      }`,
                    zIndex: 1,
                  }}
                />
              ))}
            </MotionCard>

            {/* Card Animated Border */}
            <Box
              sx={{
                width: "100%",
                maxWidth: 320,
                borderRadius: 2,
                backgroundColor:
                  theme.palette.mode === "dark" ? "#0D0D0D" : "#FFFFFF",
                cursor: "pointer",
              }}
            >
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                  width: 320,
                  height: 200,
                  boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#0D0D0D" : "#FFFFFF",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: -1,
                    overflow: "hidden",
                    borderRadius: 2,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: "-50%",
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
                    borderRadius: 2,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#0D0D0D" : "#FFFFFF",
                  }}
                />
                <CardContent sx={{ position: "relative", zIndex: 1, p: 2 }}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      display="flex"
                      alignItems="center"
                      sx={{ color: "text.primary" }}
                    >
                      <FaWandMagicSparkles
                        style={{ marginRight: 8, color: "deepskyblue" }}
                      />
                      Animated Border
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Sleek card with animated glowing border effect.
                    </Typography>
                  </MotionBox>
                </CardContent>
              </MotionCard>
            </Box>

            {/* Multilayer Stack Card */}
            <Box
              sx={{
                position: "relative",
                width: 320,
                height: 200,
              }}
            >
              <AnimatePresence>
                {stack.map((item, index) => {
                  const isCurrent = index === currentIndex;
                  const nextIndex = (currentIndex + 1) % stack.length;
                  const isNext = index === nextIndex;

                  return (
                    <MotionCard
                      key={item}
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{
                        y: isCurrent ? 0 : index * 10,
                        scale: isCurrent ? 1 : 1 - index * 0.05,
                        zIndex: isCurrent ? 4 : 3 - index,
                        opacity: isCurrent ? 1 : isNext ? 0.5 : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.8, y: 50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          gutterBottom
                          display="flex"
                          alignItems="center"
                        >
                          <FaLayerGroup
                            style={{ marginRight: 8, color: "#2196F3" }}
                          />
                          {`Stack Card ${item + 1}`}
                        </Typography>
                        <Typography variant="body2">
                          Smooth stack animation in action.
                        </Typography>
                      </CardContent>
                    </MotionCard>
                  );
                })}
              </AnimatePresence>
            </Box>

            {/* Info Card */}
            <MotionCard
              layout
              initial={{ borderRadius: 20 }}
              animate={{
                width: isExpanded ? 320 : 250,
                height: isExpanded ? 200 : 150,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                layout: { duration: 0.3 },
              }}
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                position: "relative",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                >
                  <FaBolt style={{ marginRight: 8, color: "#FFD700" }} />
                  Info Card
                </Typography>
                {!isExpanded && (
                  <Typography variant="body2" mt={1} display="block">
                    Tap to expand for more details.
                  </Typography>
                )}
                {isExpanded && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="body2">
                      Expandable card with smooth animation and interactive
                      content.
                    </Typography>
                  </MotionBox>
                )}
              </CardContent>
              <MotionBox
                animate={{
                  rotate: isExpanded ? 180 : 0,
                  scale: isExpanded ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                }}
              >
                <RxChevronDown size={20} />
              </MotionBox>
            </MotionCard>

            {/* Neubrutalism Card */}
            <MotionCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                width: 320,
                height: 200,
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "4px 4px 0 currentColor",
                borderRadius: 0,
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "divider",
                  boxShadow: "2px 2px 0 currentColor",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                >
                  <FaPaintBrush style={{ marginRight: 8, color: "#4CAF50" }} />
                  Neubrutalism Card
                </Typography>
                <Typography variant="body2">
                  Bold borders and simple design showcase the Neubrutalism
                  style.
                </Typography>
              </CardContent>
            </MotionCard>

            {/* 3D Card */}
            <MotionCard
              whileHover={{ rotateY: 15, rotateX: -15, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              sx={{
                width: 320,
                height: 200,
                borderRadius: 2,
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
                transformStyle: "preserve-3d",
                cursor: "pointer",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  sx={{ transform: "translateZ(40px)" }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    display="flex"
                    alignItems="center"
                  >
                    <FaCube style={{ marginRight: 8, color: "#9C27B0" }} />
                    3D Card
                  </Typography>
                  <Typography variant="body2">
                    Enjoy enhanced 3D effect with depth on hover.
                  </Typography>
                </MotionBox>
              </CardContent>
            </MotionCard>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardVariants;
