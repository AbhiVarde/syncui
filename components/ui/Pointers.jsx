import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/router";

const PointerVariants = ({ variant = "glowingDot" }) => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getGradientColors = () => {
    switch (variant) {
      case "glowingDot":
        return {
          start: "#FF5F6D",
          end: "#FFC371",
        };
      case "followingRing":
        return { start: "#4E65FF", end: "#92EFFD" };
      case "magneticArrow":
        return { start: "#00C853", end: "#B2FF59" };
      case "trailingDots":
        return { start: "#9D50BB", end: "#6E48AA" };
      case "emojiFollower":
        return { start: "#FF4B2B", end: "#FF416C" };
      case "gradientBlob":
        return { start: "#36D1DC", end: "#5B86E5" };
      default:
        return { start: "#4E65FF", end: "#92EFFD" };
    }
  };

  const { start, end } = getGradientColors();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const renderPointer = () => {
    if (!isHovering) return null;

    switch (variant) {
      case "glowingDot":
        return <GlowingDot position={mousePosition} />;
      case "followingRing":
        return <FollowingRing position={mousePosition} />;
      case "magneticArrow":
        return <MagneticArrow position={mousePosition} />;
      case "trailingDots":
        return <TrailingDots position={mousePosition} />;
      case "emojiFollower":
        return <EmojiFollower position={mousePosition} />;
      case "gradientBlob":
        return <GradientBlob position={mousePosition} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: !isHome ? "250px" : "100%",
        width: !isHome ? "300px" : "100%",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "none",
        background: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        minHeight: "180px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Typography variant="body2" color="white" textAlign="center">
        Move your cursor here
      </Typography>

      {renderPointer()}
    </Box>
  );
};

// Pointer variant components
const GlowingDot = ({ position }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        x: -15,
        y: -15,
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.5)",
        pointerEvents: "none",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    />
  );
};

const FollowingRing = ({ position }) => {
  // Create spring for smoother movement
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x: xSpring,
        y: ySpring,
        translateX: "-50%",
        translateY: "-50%",
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "2px solid white",
        pointerEvents: "none",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.2 }}
    />
  );
};

const MagneticArrow = ({ position }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        x: -12,
        y: -12,
        pointerEvents: "none",
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: 45 }}
      transition={{ duration: 0.2 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
    </motion.div>
  );
};

const TrailingDots = ({ position }) => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    // Add position to trail
    setTrail((prevTrail) => {
      const newTrail = [
        ...prevTrail,
        { x: position.x, y: position.y, id: Date.now() },
      ];
      // Keep only the last 5 positions
      return newTrail.slice(-5);
    });
  }, [position]);

  return (
    <>
      {trail.map((dot, index) => {
        const size = 12 - index * 2;
        const opacity = 1 - index * 0.2;

        return (
          <motion.div
            key={dot.id}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              x: -size / 2,
              y: -size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "white",
              opacity,
              pointerEvents: "none",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </>
  );
};

const EmojiFollower = ({ position }) => {
  const emojis = ["✨", "🎯", "👆", "👀", "🔥"];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);

  useEffect(() => {
    // Change emoji every second
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      setCurrentEmoji(emojis[randomIndex]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        x: -15,
        y: -15,
        fontSize: "24px",
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ duration: 0.3 }}
    >
      {currentEmoji}
    </motion.div>
  );
};

const GradientBlob = ({ position }) => {
  // Create spring for smoother movement
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        x: xSpring,
        y: ySpring,
        translateX: "-50%",
        translateY: "-50%",
        width: 60,
        height: 60,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
        pointerEvents: "none",
      }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

export default PointerVariants;
