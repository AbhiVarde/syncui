import React from "react";
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
import { RxTwitterLogo } from "react-icons/rx";

const componentTestimonials = [
  {
    name: "Emma Rodriguez",
    handle: "@emma_frontend",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "SyncUI + Framer Motion = dev time cut in half! 🚀",
  },
  {
    name: "Raj Patel",
    handle: "@raj_webdev",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    text: "Perfect MUI components for Next.js! Zero config. ⚡️",
  },
  {
    name: "Mia Chen",
    handle: "@mia_uxdesigner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    text: "Smoothest animations I've ever used in React. 📈",
  },
  {
    name: "Tom Wilson",
    handle: "@tom_nextjs",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    text: "SSR-friendly with buttery transitions. Game changer! 🔥",
  },
  {
    name: "Asha Gupta",
    handle: "@asha_reactdev",
    avatar: "https://images.unsplash.com/photo-1564564295391-7f24f26f568b",
    text: "Free components that look premium. Saved our sprint! ✨",
  },
  {
    name: "David Kim",
    handle: "@david_opensource",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857",
    text: "Built entire UI in days. Open source magic! 💯",
  },
];

const MarqueeVariants = ({ variant }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const renderTweetCard = (tweet, index) => (
    <Card
      key={`${tweet.handle}-${index}`}
      sx={{
        p: { xs: 1.5, md: 2 },
        mx: { xs: 0.75, md: 1 },
        width: { xs: "200px", sm: "240px", md: "280px" },
        flexShrink: 0,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
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
            fontSize: { xs: "0.8rem", md: "0.9rem" },
          }}
        >
          {tweet.text}
        </Typography>
      </Stack>
    </Card>
  );

  const renderMarquee = () => {
    const colors = getGradientColors();

    if (variant === "horizontal") {
      return (
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            py: { xs: 1.5, md: 2 },
            width: "100%",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: { xs: "30px", md: "60px" },
              background: `linear-gradient(to right, ${colors.start}, ${colors.end})`,
              zIndex: 2,
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: { xs: "30px", md: "60px" },
              background: `linear-gradient(to left, ${colors.start}, ${colors.end})`,
              zIndex: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: theme.spacing(1.5),
              width: "max-content",
              animation: `scrollX ${isMobile ? 25 : 35}s linear infinite`,
              "@keyframes scrollX": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
              },
            }}
          >
            {[...componentTestimonials, ...componentTestimonials].map(
              (tweet, index) => renderTweetCard(tweet, index)
            )}
          </Box>
        </Box>
      );
    }

    if (variant === "vertical") {
      return (
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: { xs: "65vh", md: "70vh" },
            mx: "auto",
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
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1.5),
              animation: `scrollY ${isMobile ? 25 : 35}s linear infinite`,
              "@keyframes scrollY": {
                "0%": { transform: "translateY(0)" },
                "100%": { transform: "translateY(-50%)" },
              },
            }}
          >
            {[...componentTestimonials, ...componentTestimonials].map(
              (tweet, index) => renderTweetCard(tweet, index)
            )}
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      {renderMarquee()}
    </Box>
  );
};

export default MarqueeVariants;
