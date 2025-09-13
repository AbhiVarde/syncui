import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { RxTwitterLogo } from "react-icons/rx";

const componentTestimonials = [
  {
    name: "Emma Rodriguez",
    handle: "@emma_frontend",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "SyncUI + Framer Motion = dev time cut in half! 🚀",
    verified: true,
  },
  {
    name: "Raj Patel",
    handle: "@raj_webdev",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    text: "Perfect MUI components for Next.js! Zero config. ⚡️",
    verified: true,
  },
  {
    name: "Mia Chen",
    handle: "@mia_uxdesigner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    text: "Smoothest animations I've ever used in React. 📈",
    verified: true,
  },
  {
    name: "Tom Wilson",
    handle: "@tom_nextjs",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    text: "SSR-friendly with buttery transitions. Game changer! 🔥",
    verified: true,
  },
  {
    name: "Asha Gupta",
    handle: "@asha_reactdev",
    avatar: "https://images.unsplash.com/photo-1564564295391-7f24f26f568b",
    text: "Free components that look premium. Saved our sprint! ✨",
    verified: true,
  },
  {
    name: "David Kim",
    handle: "@david_opensource",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
    text: "Built entire UI in days. Open source magic! 💯",
    verified: true,
  },
];

const MarqueeVariants = ({ variant }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  // Adjusted animation durations based on screen size
  const getDuration = () => {
    return isMobile ? 15 : 20;
  };

  const startAnimation = async () => {
    const duration = getDuration();

    switch (variant) {
      case "horizontal":
        await controls.start({
          x: "-50%",
          transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
        break;
      case "vertical":
        await controls.start({
          y: "-50%",
          transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
        break;
      case "diagonal":
        await controls.start({
          x: "-50%",
          y: "-50%",
          transition: {
            duration: getDuration(),
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
        break;
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startAnimation();
    } else {
      controls.stop();
    }
    return () => controls.stop();
  }, [variant, isPaused, isMobile]);

  const getGradientColors = () => {
    return theme.palette.mode === "dark"
      ? {
          start: "rgba(18, 18, 18, 0)",
          end: theme.palette.background.default,
        }
      : {
          start: "rgba(255, 255, 255, 0)",
          end: theme.palette.background.default,
        };
  };

  const renderTweetCard = (tweet, index) => {
    return (
      <Card
        key={`${tweet.handle}-${index}`}
        sx={{
          p: { xs: 1.5, md: 2 },
          mx: { xs: 0.75, md: 1 },
          width: { xs: "220px", sm: "280px", md: "320px" },
          flexShrink: 0,
          borderRadius: "12px",
          position: "relative",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              src={tweet.avatar}
              sx={{
                width: { xs: 36, md: 40 },
                height: { xs: 36, md: 40 },
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: `0 2px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.25)"
                    : "rgba(0,0,0,0.1)"
                }`,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={500}>
                {tweet.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: "0.75rem", md: "0.825rem" },
                }}
              >
                {tweet.handle}
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{
                color: "#1DA1F2",
                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(29, 161, 242, 0.15)"
                      : "rgba(29, 161, 242, 0.1)",
                },
              }}
            >
              <RxTwitterLogo />
            </IconButton>
          </Stack>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.5,
              color: theme.palette.text.primary,
              fontWeight: 400,
              fontSize: { xs: "0.825rem", md: "0.95rem" },
            }}
          >
            {tweet.text}
          </Typography>
        </Stack>
      </Card>
    );
  };

  const renderMarquee = () => {
    const colors = getGradientColors();

    switch (variant) {
      case "horizontal":
        return (
          <Stack spacing={1}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 1.5, md: 2 },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: { xs: "40px", md: "80px" },
                  background: `linear-gradient(to right, ${colors.start}, ${colors.end})`,
                  zIndex: 2,
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: { xs: "40px", md: "80px" },
                  background: `linear-gradient(to left, ${colors.start}, ${colors.end})`,
                  zIndex: 2,
                },
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <motion.div
                animate={controls}
                style={{
                  display: "flex",
                  gap: theme.spacing(1.5),
                }}
                initial={{ x: 0 }}
              >
                {[
                  ...componentTestimonials,
                  ...componentTestimonials,
                  ...componentTestimonials,
                ].map((tweet, index) => renderTweetCard(tweet, index))}
              </motion.div>
            </Box>
          </Stack>
        );

      case "vertical":
        return (
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: { xs: "65vh", md: "75vh" },
                maxWidth: { xs: "100%", md: "90%" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: { xs: "40px", md: "80px" },
                  background: `linear-gradient(to bottom, ${colors.start}, ${colors.end})`,
                  zIndex: 2,
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: { xs: "40px", md: "80px" },
                  background: `linear-gradient(to top, ${colors.start}, ${colors.end})`,
                  zIndex: 2,
                },
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <motion.div
                animate={controls}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing(1.5),
                }}
                initial={{ y: 0 }}
              >
                {[
                  ...componentTestimonials,
                  ...componentTestimonials,
                  ...componentTestimonials,
                ].map((tweet, index) => renderTweetCard(tweet, index))}
              </motion.div>
            </Box>
          </Stack>
        );

      case "diagonal":
        return (
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: "400px",
              mx: "auto",
              perspective: "1000px",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: `
            linear-gradient(35deg, ${colors.end} 0%, ${colors.start} 12%, ${colors.start} 88%, ${colors.end} 100%),
            linear-gradient(-35deg, ${colors.end} 0%, ${colors.start} 12%, ${colors.start} 88%, ${colors.end} 100%)
          `,
                zIndex: 2,
                pointerEvents: "none",
              },
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              animate={controls}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: theme.spacing(4),
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "rotate(-8deg)",
              }}
            >
              {[
                ...componentTestimonials,
                ...componentTestimonials,
                ...componentTestimonials,
              ].map((tweet, index) => (
                <motion.div
                  key={`diag-${index}`}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    transform: `rotate(${index % 2 ? 3 : -3}deg)`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 3,
                    transition: { duration: 0.25 },
                    filter: "brightness(1.1)",
                  }}
                >
                  {renderTweetCard(
                    {
                      ...tweet,
                      text: `${tweet.text} ${index % 2 ? "✨" : "🚀"}`,
                    },
                    index
                  )}
                </motion.div>
              ))}
            </motion.div>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          overflow: "hidden",
        }}
      >
        {renderMarquee()}
      </Box>
    </AnimatePresence>
  );
};

export default MarqueeVariants;
