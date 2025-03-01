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
import { FaMeteor, FaAdjust, FaTwitter } from "react-icons/fa";
import { RxImage } from "react-icons/rx";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const twitterImages = [
  "https://images.unsplash.com/photo-1511497584788-876760111969",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
];

const CardVariants = ({ variant }) => {
  const theme = useTheme();
  const [meteors, setMeteors] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (variant === "twitterCarousel") {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % twitterImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  useEffect(() => {
    if (variant === "meteorShower") {
      const createMeteor = () => {
        const newMeteor = {
          id: Math.random(),
          x: Math.random() * 320,
          delay: Math.random() * 2,
        };
        setMeteors((prev) => [...prev.slice(-5), newMeteor]); // Keep only last 5 meteors
      };

      const interval = setInterval(createMeteor, 500);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const commonCardStyle = {
    width: { xs: "100%", sm: "350px" },
    maxWidth: "350px", 
    height: "300px",
    borderRadius: 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
    border: "1px solid",
    borderColor: theme.palette.divider,
    overflow: "hidden",
    position: "relative",
    // mx: { xs: 0, sm: 1 },
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const renderCard = () => {
    switch (variant) {
      case "lens":
        return (
          <MotionCard
            sx={{
              ...commonCardStyle,
              overflow: "visible",
              position: "relative",
            }}
            whileHover={{ scale: 1.02 }}
          >
            <CardContent sx={{ p: 0, height: "100%", position: "relative" }}>
              {/* Image Container */}
              <Box
                sx={{
                  position: "relative",
                  height: "180px",
                  overflow: "hidden",
                  borderRadius: 2,
                  "&:hover .lens": {
                    opacity: 1,
                  },
                }}
                onMouseMove={(e) => {
                  const container = e.currentTarget.getBoundingClientRect();
                  const x =
                    ((e.clientX - container.left) / container.width) * 100;
                  const y =
                    ((e.clientY - container.top) / container.height) * 100;
                  setLensPosition({ x, y });
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Main Image */}
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.3s ease",
                  }}
                />
                {/* Magnifying Lens */}
                {isHovered && (
                  <Box
                    className="lens"
                    sx={{
                      position: "absolute",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.8)",
                      pointerEvents: "none",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      background: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
                      backgroundSize: "400% 400%",
                      backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                      boxShadow: "0 0 25px rgba(0,0,0,0.2)",
                      left: `calc(${lensPosition.x}% - 50px)`,
                      top: `calc(${lensPosition.y}% - 50px)`,
                      zIndex: 2,
                      willChange: "background-position, left, top",
                    }}
                  />
                )}
              </Box>
              {/* Content Area */}
              <Box sx={{ p: 2, pt: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                      color: "text.primary",
                      gap: 1,
                    }}
                  >
                    <LuSearch size={22} color="#00BCD4" />
                    Interactive Preview
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Explore intricate details of our advanced circuitry design
                  with dynamic magnification.
                </Typography>
              </Box>
            </CardContent>
          </MotionCard>
        );

      case "twitterCarousel":
        return (
          <MotionCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={commonCardStyle}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FaTwitter style={{ color: "#1DA1F2", marginRight: 8 }} />
                <Typography variant="h6">Twitter Carousel</Typography>
              </Box>

              <Typography mt={0.5} variant="body2">
                Smooth auto-scrolling image carousel with fluid transitions
              </Typography>

              <Box
                sx={{
                  mt: 1.5,
                  position: "relative",
                  height: 170,
                  overflow: "hidden",
                  borderRadius: 1,
                }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween", duration: 0.5 }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${twitterImages[currentImageIndex]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1,
                  }}
                >
                {twitterImages.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        cursor: "pointer",
                        backgroundColor:
                          index === currentImageIndex
                            ? "primary.main"
                            : "rgba(255, 255, 255, 0.5)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </MotionCard>
        );

      case "meteorShower":
        return (
          <MotionCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={commonCardStyle}
          >
            <CardContent sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h5" display="flex" alignItems="center">
                <FaMeteor style={{ marginRight: 8, color: "#F44336" }} />
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
                  y: 250,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: meteor.delay,
                  ease: "linear",
                }}
                style={{ willChange: "transform, opacity" }}
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
            {/* Static Image Background */}
            <motion.div
              initial={{ opacity: 1 }}
              variants={{
                initial: { opacity: 1 },
                hover: { opacity: 0 },
              }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 1,
              }}
            />

            {/* Animated GIF Overlay */}
            <motion.div
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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

            {/* Dynamic Overlay */}
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
                  height: "100%",
                  backgroundImage: `url('https://plus.unsplash.com/premium_photo-1667126447968-f02d4cb36114?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden",
                  borderRadius: "16px",
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
                    <RxImage
                      size={24}
                      style={{ marginRight: 8, color: "#FFC107" }}
                    />
                    Content Card
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      minWidth: "60px",
                      height: "28px",
                      p: "8px",
                      fontSize: "14px !important",
                      fontWeight: 400,
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
                  }}
                >
                  Engaging visuals with dynamic interactions.
                </Typography>
              </Box>
            </CardContent>
          </MotionCard>
        );

      case "animatedBorder":
        return (
          <MotionCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
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
                animation. Now optimized for better performance.
              </Typography>
            </CardContent>
          </MotionCard>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%", height: "100%" }}
      >
        {renderCard()}
      </motion.div>
    </AnimatePresence>
  );
};

export default CardVariants;
