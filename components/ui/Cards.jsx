import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCube,
  FaLayerGroup,
  FaPaintBrush,
  FaMeteor,
  FaBolt,
  FaImage,
  FaAdjust,
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
    width: "100%",
    height: 245,
    borderRadius: 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
    border: "1px solid",
    borderColor: theme.palette.divider,
    maxWidth: 345,
    overflow: "hidden",
    position: "relative",
    mx: 1,
    cursor: "pointer",
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
              <Typography variant="h5" display="flex" alignItems="center">
                <FaCube style={{ marginRight: 8, color: "#9C27B0" }} />
                3D Card
              </Typography>
              <Typography mt variant="body2">
                Transform your content with an immersive 3D perspective effect
                that responds to user interaction.
              </Typography>
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
              cursor: "pointer",
              "&:hover": {
                borderColor: theme.palette.divider,
                boxShadow: "2px 2px 0 currentColor",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" display="flex" alignItems="center">
                <FaPaintBrush style={{ marginRight: 8, color: "#4CAF50" }} />
                Neubrutalism Card
              </Typography>
              <Typography mt variant="body2">
                Embrace raw aesthetics with bold shadows and sharp edges,
                perfect for modern brutalist designs.
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
              width: {
                xs: "100%",
                sm: isExpanded ? 345 : 290,
              },
              height: isExpanded ? 245 : 160,
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
              width: {
                xs: "100%",
                sm: isExpanded ? 345 : 290,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" display="flex" alignItems="center">
                <FaBolt style={{ marginRight: 8, color: "#FFD700" }} />
                Info Card
              </Typography>
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <Typography mt variant="body2">
                    Click to reveal additional information with smooth
                    transitions.
                  </Typography>
                ) : (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography mt variant="body2">
                      Dynamic content expansion with fluid animations creates an
                      engaging user experience.
                    </Typography>
                  </MotionBox>
                )}
              </AnimatePresence>
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
          <Box
            sx={{
              position: "relative",
              width: {
                xs: "100%",
                sm: 345,
              },
              height: 245,
              mx: "auto",
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
                      ...commonCardStyle,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      margin: "0 auto",
                      height: 245,
                      width: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        display="flex"
                        alignItems="center"
                      >
                        <FaLayerGroup
                          style={{ marginRight: 8, color: "#2196F3" }}
                        />
                        {`Stack Card ${item + 1}`}
                      </Typography>
                      <Typography mt variant="body2">
                        Experience seamless transitions between layered cards
                        with elegant stack animations.
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
            sx={commonCardStyle}
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
            <CardContent sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h5" display="flex" alignItems="center">
                <FaWandMagicSparkles
                  style={{ marginRight: 8, color: "deepskyblue" }}
                />
                Animated Border
              </Typography>
              <Typography mt variant="body2">
                Captivate users with a mesmerizing rotating gradient border
                animation.
              </Typography>
            </CardContent>
          </MotionCard>
        );

      case "meteorShower":
        return (
          <MotionCard
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            sx={commonCardStyle}
          >
            <CardContent sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h5" display="flex" alignItems="center">
                <FaMeteor style={{ marginRight: 8, color: "#FF6B6B" }} />
                Meteor Shower
              </Typography>
              <Typography mt variant="body2">
                Create an ethereal atmosphere with animated meteor particles
                streaking across your card.
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

      case "contentCard":
        return (
          <MotionCard
            sx={commonCardStyle}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 1,
            }}
          >
            <CardContent
              sx={{
                padding: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <motion.div
                style={{
                  position: "relative",
                  height: "160px",
                  backgroundImage: `url('https://plus.unsplash.com/premium_photo-1667126447968-f02d4cb36114?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden",
                }}
                whileHover={{
                  backgroundImage: `url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3N0Ym81cmZ1Zmgxanh4eTJreDF1dWhrYXRjYnE1MDc3MTMxMWc4biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0ISMA5iGiROl4U8/giphy.gif')`,
                  scale: 1.02,
                  transition: {
                    scale: {
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      mass: 1,
                    },
                    duration: 0.3,
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </motion.div>

              <Box
                sx={{
                  pt: 1,
                  px: 2,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaImage
                      size={20}
                      style={{ marginRight: 8, color: "#008080" }}
                    />
                    Content Card
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      minWidth: "60px",
                      height: "28px",
                      p: "4px 12px",
                    }}
                  >
                    View
                  </Button>
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.5,
                    mt: "auto",
                  }}
                >
                  Engaging visuals with dynamic interactions.
                </Typography>
              </Box>
            </CardContent>
          </MotionCard>
        );

      case "dynamicOverlay":
        return (
          <MotionCard
            whileHover="hover"
            initial="initial"
            animate="animate"
            sx={{
              ...commonCardStyle,
              backgroundImage: `url('https://cdn.webshopapp.com/shops/268192/files/433182622/tommy-shelby.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              border: "1px solid",
              borderColor: theme.palette.divider,
              zIndex: 2,
            }}
          >
            <motion.div
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjBvZWV0MmgxYTR5dmtweDl5aG1oMTE3b25yYzQ1Y3EyMGN1cjRoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X3Zr6miqq2KuQ/giphy.gif')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
            <motion.div
              variants={{
                initial: { opacity: 0.2 },
                hover: { opacity: 0.5 },
              }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 2,
              }}
            />
            <CardContent sx={{ position: "relative", zIndex: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <FaAdjust style={{ marginRight: 8 }} />
                Dynamic Overlay
              </Typography>
              <Typography
                mt
                variant="body2"
                sx={{
                  color: "white",
                  overflow: "hidden",
                }}
              >
                Transform static images with hover-triggered animated overlays.
              </Typography>
            </CardContent>
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
