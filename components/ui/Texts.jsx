import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const TextVariants = ({ variant }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const texts = [
    "blurIn",
    "splitReveal",
    "staggeredScale",
    "lettersPullUp",
    "waveEffect",
    "neonGlow",
    "wordsPullUp",
    "typewriter",
    "rotateWords",
    "morphingText",
    "videoText",
  ];

  const renderText = () => {
    const index = texts.indexOf(variant);
    if (index === -1) {
      return (
        <Typography variant="h5" sx={{ fontSize: "32px !important" }}>
          Interactive Text
        </Typography>
      );
    }

    const components = [
      <BlurIn text="Soft Blur Entrance" />,
      <SplitReveal text="Split & Reveal" />,
      <StaggeredScale text="Staggered Scaling" />,
      <LettersPullUp text="Letters Pull Up" />,
      <WaveEffect text="Wave Text Animation" />,
      <NeonGlow text="Neon Glow Effect" />,
      <WordsPullUp text="Smooth Words Pull Up" />,
      <TypewriterEffect text="Building the Future" />,
      <RotateWords
        text="Rotating:"
        words={["Solutions", "Ideas", "Concepts", "Designs"]}
      />,
      <MorphingText words={["Innovate", "Create", "Design", "Develop"]} />,
      <VideoText text="Waves" />,
    ];

    return components[index];
  };

  return (
    <AnimatePresence mode="wait">
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderText()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RotateWords = ({ text, words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant="h5"
        fontWeight={500}
        sx={{ fontSize: "32px !important" }}
      >
        {text}
      </Typography>
      <Box flexShrink={0} ml={1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 500, fontSize: "32px !important" }}
            >
              {words[index]}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

const LettersPullUp = ({ text }) => {
  const [alignment, setAlignment] = useState("center");

  useEffect(() => {
    if (window.location.pathname.startsWith("/docs")) {
      setAlignment("flex-start");
    } else {
      setAlignment("center");
    }
  }, []);

  return (
    <motion.div style={{ display: "flex", justifyContent: alignment }}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          animate={{ y: [10, 0, 0, 10], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
        >
          <Typography
            variant="h5"
            sx={{ mx: 0.2, fontSize: "32px !important" }}
          >
            {char}
          </Typography>
        </motion.span>
      ))}
    </motion.div>
  );
};

const WordsPullUp = ({ text }) => {
  const [alignment, setAlignment] = useState("center");

  useEffect(() => {
    if (window.location.pathname.startsWith("/docs")) {
      setAlignment("flex-start");
    } else {
      setAlignment("center");
    }
  }, []);

  return (
    <motion.div
      style={{ display: "flex", justifyContent: alignment, flexWrap: "wrap" }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 2,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "anticipate",
          }}
          style={{ marginRight: "0.4em" }}
        >
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{ fontSize: "32px !important" }}
          >
            {word}
          </Typography>
        </motion.span>
      ))}
    </motion.div>
  );
};

const BlurIn = ({ text }) => (
  <motion.div
    initial={{ filter: "blur(12px)", opacity: 0 }}
    animate={{
      filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Typography
      variant="h4"
      sx={{ fontWeight: 500, letterSpacing: 0.2, fontSize: "32px !important" }}
    >
      {text}
    </Typography>
  </motion.div>
);

const MorphingText = ({ words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <Box sx={{ position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              letterSpacing: 0.2,
              fontSize: "32px !important",
            }}
          >
            {words[index]}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

const NeonGlow = ({ text }) => (
  <motion.div
    animate={{
      textShadow: [
        "0 0 6px rgba(0,0,0,0.2)",
        "0 0 12px rgba(255,153,51,0.6)",
        "0 0 12px rgba(255,255,255,0.6)",
        "0 0 12px rgba(19,136,8,0.6)",
      ],
    }}
    transition={{ duration: 2, repeat: Infinity }}
    style={{
      background: "linear-gradient(90deg, #FF9933, #FFFFFF, #138808)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
    }}
  >
    <Typography
      variant="h4"
      fontWeight={500}
      sx={{ fontSize: "32px !important" }}
    >
      {text}
    </Typography>
  </motion.div>
);

const StaggeredScale = ({ text }) => (
  <div style={{ display: "flex", gap: "0.2rem" }}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          sx={{ fontSize: "32px !important" }}
        >
          {char}
        </Typography>
      </motion.span>
    ))}
  </div>
);

const WaveEffect = ({ text }) => (
  <div style={{ display: "flex", gap: "0.2rem" }}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity }}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          sx={{ fontSize: "32px !important" }}
        >
          {char}
        </Typography>
      </motion.span>
    ))}
  </div>
);

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (displayText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setDisplayText("");
          setIsTyping(true);
        }, 2000);
      }
    }
  }, [displayText, text, isTyping]);

  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant="h4"
        fontWeight={500}
        sx={{ fontSize: "32px !important" }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ borderRight: "2px solid currentColor" }}
        >
          &nbsp;
        </motion.span>
      </Typography>
    </Box>
  );
};

const SplitReveal = ({ text }) => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{
          y: ["100%", "0%", "0%", "-100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.3, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.2rem",
            fontSize: "32px !important",
          }}
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
              }}
            >
              {char}
            </motion.span>
          ))}
        </Typography>
      </motion.div>
    </Box>
  );
};

const VideoText = ({ text, videoSrc = "/videos/nature.mp4" }) => {
  const [alignment, setAlignment] = useState("center");

  useEffect(() => {
    if (window.location.pathname.startsWith("/docs")) {
      setAlignment("flex-start");
    } else {
      setAlignment("center");
    }
  }, []);

  const textAnchor = alignment === "center" ? "middle" : "start";
  const xPosition = alignment === "center" ? "50%" : "10%";

  const svgMask = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <text 
      x="${xPosition}" 
      y="50%" 
      dominant-baseline="middle" 
      text-anchor="${textAnchor}"
      font-family="Montserrat, sans-serif"
      font-weight="700"
      font-size="42px"
      letter-spacing="8px"
    >
      ${text.toUpperCase()}
    </text>
  </svg>
`);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      sx={{
        padding: "0px !important",
        margin: "0px !important",
        position: "relative",
        width: "100%",
        height: "60px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          maskImage: `url("data:image/svg+xml,${svgMask}")`,
          WebkitMaskImage: `url("data:image/svg+xml,${svgMask}")`,
          maskSize: "80% auto",
          WebkitMaskSize: "80% auto",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: alignment === "center" ? "center" : "left",
          WebkitMaskPosition: alignment === "center" ? "center" : "left",
        }}
      >
        <Box
          component={motion.video}
          autoPlay
          loop
          muted
          playsInline
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </Box>
      </Box>

      <Typography
        variant="h1"
        sx={{
          visibility: "hidden",
          position: "absolute",
          textAlign: alignment,
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: "32px !important",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default TextVariants;
