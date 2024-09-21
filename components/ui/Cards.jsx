import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCube,
  FaLayerGroup,
  FaPaintBrush,
  FaMeteor,
  FaBolt,
} from "react-icons/fa";
import { RxChevronDown } from "react-icons/rx";
import { FaWandMagicSparkles } from "react-icons/fa6";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const CardVariants = ({ variant }) => {
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
    if (variant === "meteorShower") {
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
    }
  }, [variant]);

  useEffect(() => {
    if (variant === "multilayerStack") {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % stack.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [variant, stack.length]);

  const commonCardStyle = {
    width: 300,
    height: 200,
    borderRadius: 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
    border: "1px solid",
    borderColor: theme.palette.divider,
  };

  const renderCard = () => {
    switch (variant) {
      case "3dCard":
        return (
          <MotionCard
            whileHover={{ rotateY: 15, rotateX: -15, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            sx={{
              ...commonCardStyle,
              transformStyle: "preserve-3d",
              cursor: "pointer",
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
        );

      case "neubrutalism":
        return (
          <MotionCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              ...commonCardStyle,
              color: theme.palette.text.primary,
              boxShadow: "4px 4px 0 currentColor",
              borderRadius: 0,
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              cursor: "pointer",
              "&:hover": {
                borderColor: theme.palette.divider,
                boxShadow: "2px 2px 0 currentColor",
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
                Bold borders and simple design showcase the Neubrutalism style.
              </Typography>
            </CardContent>
          </MotionCard>
        );

      case "infoCard":
        return (
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
              ...commonCardStyle,
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
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
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <RxChevronDown size={20} />
            </MotionBox>
          </MotionCard>
        );

      case "multilayerStack":
        return (
          <Box sx={{ ...commonCardStyle, position: "relative" }}>
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
                      ...commonCardStyle,
                      position: "absolute",
                      top: 0,
                      left: 0,
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
        );

      case "animatedBorder":
        return (
          <MotionCard
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            sx={{
              ...commonCardStyle,
              position: "relative",
              overflow: "hidden",
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
                  theme.palette.mode === "dark"
                    ? "#191919"
                    : theme.palette.background.paper,
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
                >
                  <FaWandMagicSparkles
                    style={{ marginRight: 8, color: "deepskyblue" }}
                  />
                  Animated Border
                </Typography>
                <Typography variant="body2">
                  Sleek card with animated glowing border effect.
                </Typography>
              </MotionBox>
            </CardContent>
          </MotionCard>
        );

      case "meteorShower":
        return (
          <MotionCard
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            sx={{
              ...commonCardStyle,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <CardContent sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                variant="h5"
                gutterBottom
                display="flex"
                alignItems="center"
              >
                <FaMeteor style={{ marginRight: 8, color: "#FF6B6B" }} />
                Meteor Shower
              </Typography>
              <Typography variant="body2">
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
                  background: `linear-gradient(to bottom, ${
                    theme.palette.mode === "dark" ? "#FFFFFF" : "#000000"
                  }, transparent)`,
                  boxShadow: `0 0 10px ${
                    theme.palette.mode === "dark" ? "#FFFFFF" : "#000000"
                  }`,
                  zIndex: 1,
                }}
              />
            ))}
          </MotionCard>
        );

      default:
        return (
          <Card sx={commonCardStyle}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Default Card
              </Typography>
              <Typography variant="body2">
                This is a default card with no special effects.
              </Typography>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {renderCard()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardVariants;
