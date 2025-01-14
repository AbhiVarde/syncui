import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const dummyTweets = [
  {
    id: 1,
    author: "Alice",
    handle: "@alice",
    content: "Just learned about Framer Motion. It's amazing!",
    gradient: ["#ff9a9e", "#fad0c4"],
  },
  {
    id: 2,
    author: "Bob",
    handle: "@bob",
    content: "React hooks have changed the way I think about state management.",
    gradient: ["#a18cd1", "#fbc2eb"],
  },
  {
    id: 3,
    author: "Charlie",
    handle: "@charlie",
    content: "TypeScript + React is my new favorite combo!",
    gradient: ["#84fab0", "#8fd3f4"],
  },
  {
    id: 4,
    author: "Diana",
    handle: "@diana",
    content: "Just deployed my first Next.js app. So smooth!",
    gradient: ["#ffecd2", "#fcb69f"],
  },
  {
    id: 5,
    author: "Alice",
    handle: "@alice",
    content: "Just learned about Framer Motion. It's amazing!",
    gradient: ["#ff9a9e", "#fad0c4"],
  },
  {
    id: 6,
    author: "Bob",
    handle: "@bob",
    content: "React hooks have changed the way I think about state management.",
    gradient: ["#a18cd1", "#fbc2eb"],
  },
  {
    id: 7,
    author: "Charlie",
    handle: "@charlie",
    content: "TypeScript + React is my new favorite combo!",
    gradient: ["#84fab0", "#8fd3f4"],
  },
  {
    id: 8,
    author: "Diana",
    handle: "@diana",
    content: "Just deployed my first Next.js app. So smooth!",
    gradient: ["#ffecd2", "#fcb69f"],
  },
];

const TweetCard = ({ tweet, onHoverStart, onHoverEnd }) => {
  const theme = useTheme();

  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        sx={{
          minWidth: 250,
          maxWidth: 300,
          height: "200px",
          m: 1,
          cursor: "pointer",
          bgcolor: theme.palette.background.paper,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: `linear-gradient(45deg, ${tweet.gradient[0]}, ${tweet.gradient[1]})`,
                mr: 1,
              }}
            >
              {tweet.author[0]}
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {tweet.author}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {tweet.handle}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.primary",
              lineHeight: 1.6,
            }}
          >
            {tweet.content}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MarqueeVariants = ({ variant }) => {
  const router = useRouter();
  const { asPath } = router;
  const [isPaused, setIsPaused] = useState(false);

  const handleHoverStart = () => setIsPaused(true);
  const handleHoverEnd = () => setIsPaused(false);

  const commonStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  const renderMarquee = () => {
    switch (variant) {
      case "horizontal":
        return (
          <Box sx={{ ...commonStyles, width: "100%", my: 2 }}>
            <motion.div
              animate={{ x: isPaused ? 0 : [0, -50 + "%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              style={{ display: "flex" }}
            >
              {[...dummyTweets, ...dummyTweets, ...dummyTweets].map(
                (tweet, index) => (
                  <TweetCard
                    key={`${tweet.id}-${index}`}
                    tweet={tweet}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />
                )
              )}
            </motion.div>
          </Box>
        );

      case "vertical":
        return (
          <Box
            sx={{
              ...commonStyles,
              flexDirection: "column",
              height: 400,
              my: 2,
            }}
          >
            <motion.div
              animate={{ y: isPaused ? 0 : [0, -50 + "%"] }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {[...dummyTweets, ...dummyTweets, ...dummyTweets].map(
                (tweet, index) => (
                  <TweetCard
                    key={`${tweet.id}-${index}`}
                    tweet={tweet}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />
                )
              )}
            </motion.div>
          </Box>
        );

      case "3D":
        return (
          <Box
            sx={{
              ...commonStyles,
              perspective: "1000px",
              height: 300,
            }}
          >
            <motion.div
              animate={{
                rotateY: isPaused ? 0 : [0, 360],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              }}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              style={{
                transformStyle: "preserve-3d",
                width: 250,
                height: 250,
                position: "relative",
              }}
            >
              {dummyTweets.map((tweet, index) => (
                <Box
                  key={tweet.id}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: `rotateY(${index * 90}deg) translateZ(125px)`,
                  }}
                >
                  <TweetCard
                    tweet={tweet}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />
                </Box>
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
