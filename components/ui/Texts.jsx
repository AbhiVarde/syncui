import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const GradualSpacing = ({ text }) => (
  <motion.div
    animate={{ letterSpacing: [0, "0.09em", 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <Typography variant="h5">{text}</Typography>
  </motion.div>
);

const RotateWords = ({ text, words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="h5">{text}</Typography>
      <Box width="150px">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" ml={1}>
              {words[index]}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 1000);
    }
  }, [index, text]);

  return (
    <Typography variant="h5" style={{ minWidth: "300px" }}>
      {displayText}
    </Typography>
  );
};

const StaggeredFade = ({ text }) => (
  <motion.div style={{ display: "flex", justifyContent: "center" }}>
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.05 }}
      >
        <Typography variant="h5" sx={{ mx: 0.2 }}>
          {char}
        </Typography>
      </motion.span>
    ))}
  </motion.div>
);

const LettersPullUp = ({ text }) => (
  <motion.div style={{ display: "flex", justifyContent: "center" }}>
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        animate={{ y: [10, 0, 0, 10], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.05 }}
      >
        <Typography variant="h5" sx={{ mx: 0.2 }}>
          {char}
        </Typography>
      </motion.span>
    ))}
  </motion.div>
);

const WordsPullUp = ({ text }) => (
  <motion.div
    style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
  >
    {text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        animate={{ y: [20, 0, 0, 20], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
        style={{ marginRight: "0.3em" }}
      >
        <Typography variant="h5" sx={{ mx: 0.2 }}>
          {word}
        </Typography>
      </motion.span>
    ))}
  </motion.div>
);

const BlurIn = ({ text }) => (
  <motion.div
    animate={{
      filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"],
      opacity: [0, 1, 1, 0],
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <Typography variant="h5">{text}</Typography>
  </motion.div>
);

const TextFade = ({ text }) => (
  <motion.div
    animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -18] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <Typography variant="h5">{text}</Typography>
  </motion.div>
);

const TextVariants = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={6}
          >
            <GradualSpacing text="Gradual Spacing: Elegant Typography" />
            <TypingEffect text="Typing Effect: Dynamic Text Display" />
            <StaggeredFade text="Staggered Fade: Cascading Reveal" />
            <RotateWords
              text="Rotate Words:"
              words={["Innovative", "Dynamic", "Engaging", "Impressive"]}
            />
            <LettersPullUp text="Letters Pull Up: Character Animation" />
            <WordsPullUp text="Words Pull Up: Phrase Transition" />
            <BlurIn text="Blur In: Focusing Clarity" />
            <TextFade text="Text Fade: Smooth Appearance" />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TextVariants;
