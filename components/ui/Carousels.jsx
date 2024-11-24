import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Typography, IconButton, useTheme, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuChevronRight,
  LuChevronLeft,
  LuPause,
  LuPlay,
  LuArrowLeft,
  LuArrowRight,
} from "react-icons/lu";

// Motion components with will-change optimization
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// Optimized preload function with Promise.all
const preloadImages = async (images) => {
  const loadPromises = images.map((slideData) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = slideData.image;
    });
  });
  return Promise.all(loadPromises);
};

// Slide data
const imageSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
    title: "Modern Architecture",
    description: "Exploring contemporary design principles",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Natural Landscapes",
    description: "Breathtaking views from around the world",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad",
    title: "Urban Life",
    description: "City experiences and metropolitan moments",
  },
];

const imageSlidesContent = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60",
    title: "Quantum Computing",
    description:
      "Revolutionizing computational possibilities with quantum mechanics",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1683009427513-28e163402d16",
    title: "Sustainable Future",
    description: "Pioneering green technologies for tomorrow's world",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1682687219800-bba120d709c5",
    title: "AI Revolution",
    description: "Shaping the future of human-machine collaboration",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
    title: "Space Exploration",
    description: "Pushing the boundaries of human discovery",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1682686578707-140b042e8f19",
    title: "Neural Interface",
    description: "Breaking barriers between mind and machine",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1682695798522-6e208131916d",
    title: "Quantum Art",
    description: "Where science meets digital creativity",
  },
];

// Animation variants
const slideAnimations = {
  scale: {
    initial: { scale: 0.8, opacity: 0, willChange: "transform, opacity" },
    animate: { scale: 1, opacity: 1, willChange: "transform, opacity" },
    exit: { scale: 0.8, opacity: 0, willChange: "transform, opacity" },
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 35,
      mass: 0.6,
      velocity: 2,
    },
  },
  fade: {
    initial: { opacity: 0, willChange: "opacity" },
    animate: { opacity: 1, willChange: "opacity" },
    exit: { opacity: 0, willChange: "opacity" },
    transition: { duration: 0.2 },
  },
  parallax: {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      willChange: "transform, opacity",
    }),
    animate: {
      x: 0,
      opacity: 1,
      willChange: "transform, opacity",
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      willChange: "transform, opacity",
    }),
    transition: {
      x: { type: "spring", stiffness: 500, damping: 35, velocity: 2 },
      opacity: { duration: 0.15 },
    },
  },
};

const CarouselVariants = ({ variant = "classic" }) => {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize slide data
  const slides = useMemo(() => {
    return variant === "parallax" || variant === "cards"
      ? imageSlidesContent
      : imageSlides;
  }, [variant]);

  // Optimized navigation with debounce
  const handleNext = useCallback(() => {
    if (!isDragging) {
      setDirection(1);
      setActive((prev) => (prev + 1) % slides.length);
    }
  }, [slides.length, isDragging]);

  const handlePrev = useCallback(() => {
    if (!isDragging) {
      setDirection(-1);
      setActive((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, [slides.length, isDragging]);

  // Optimized image preloading
  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      try {
        await preloadImages(slides);
        if (mounted) setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        if (mounted) setIsLoading(false);
      }
    };

    loadImages();
    return () => {
      mounted = false;
    };
  }, [slides]);

  // Optimized autoplay with RAF
  useEffect(() => {
    if (!autoplay || isLoading) return;

    let rafId;
    let lastTime = 0;
    const interval = 5000;

    const tick = (timestamp) => {
      if (!lastTime) lastTime = timestamp;

      const elapsed = timestamp - lastTime;

      if (elapsed >= interval) {
        handleNext();
        lastTime = timestamp;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [autoplay, handleNext, isLoading]);

  // Optimized drag handlers with memoization
  const dragHandlers = useMemo(
    () => ({
      onDragStart: () => setIsDragging(true),
      onDragEnd: (e, { offset, velocity }) => {
        const threshold = 100;
        const velocityThreshold = 500;

        requestAnimationFrame(() => {
          setIsDragging(false);
          if (
            Math.abs(offset.x) > threshold ||
            Math.abs(velocity.x) > velocityThreshold
          ) {
            if (offset.x > 0) {
              handlePrev();
            } else {
              handleNext();
            }
          }
        });
      },
    }),
    [handleNext, handlePrev]
  );

  const renderVariant = () => {
    const commonStyles = {
      transform: "translate3d(0,0,0)",
      backfaceVisibility: "hidden",
      WebkitFontSmoothing: "antialiased",
    };

    switch (variant) {
      case "scale":
        return (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              overflow: "hidden",
              borderRadius: 4,
              bgcolor: theme.palette.background.paper,
              ...commonStyles,
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <MotionPaper
                key={active}
                custom={direction}
                {...slideAnimations.scale}
                sx={{
                  position: "absolute",
                  width: "90%",
                  height: "90%",
                  left: "5%",
                  top: "5%",
                  backgroundImage: `url(${slides[active]?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                >
                  <Typography
                    variant="h5"
                    component={motion.h5}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {slides[active]?.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component={motion.p}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slides[active]?.description}
                  </Typography>
                </Box>
              </MotionPaper>
            </AnimatePresence>

            <Box
              sx={{
                position: "absolute",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 1,
                zIndex: 1,
              }}
            >
              {slides.map((_, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  animate={{
                    scale: active === index ? 1.2 : 1,
                    opacity: active === index ? 1 : 0.5,
                  }}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(index)}
                />
              ))}
            </Box>
          </Box>
        );

      case "cards":
        return (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              ...commonStyles,
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {imageSlidesContent.map((slide, index) => {
                const offset =
                  (index - active + imageSlidesContent.length) %
                  imageSlidesContent.length;
                return (
                  <MotionPaper
                    key={slide.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1 - Math.abs(offset) * 0.1,
                      opacity: 1 - Math.abs(offset) * 0.3,
                      zIndex: imageSlidesContent.length - Math.abs(offset),
                      x: offset * 100,
                      rotateY: offset * -5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                      mass: 0.8,
                      velocity: 2,
                    }}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    dragElastic={0.15}
                    dragTransition={{
                      bounceStiffness: 800,
                      bounceDamping: 25,
                      power: 0.5,
                    }}
                    whileTap={{ cursor: "grabbing" }}
                    {...dragHandlers}
                    sx={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      borderRadius: "16px",
                      overflow: "hidden",
                      cursor: "grab",
                      userSelect: "none",
                      touchAction: "none",
                      boxShadow: theme.shadows[8],
                      mb: 2,
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                      perspective: 1000,
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${slide?.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        pointerEvents: "none",
                        willChange: "transform",
                        transform: "translateZ(0)",
                      }}
                    />
                    <Box
                      component="div"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 4,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        color: "white",
                        borderRadius: "0 0 16px 16px",
                        pointerEvents: "none",
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {slide?.title}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {slide?.description}
                      </Typography>
                    </Box>
                  </MotionPaper>
                );
              })}
            </AnimatePresence>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 2,
                zIndex: imageSlidesContent.length + 1,
              }}
            >
              <IconButton
                onClick={!isDragging ? handlePrev : undefined}
                disabled={isDragging}
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                  "&:disabled": { opacity: 0.5 },
                  borderRadius: "50%",
                }}
              >
                <LuArrowLeft />
              </IconButton>
              <IconButton
                onClick={!isDragging ? handleNext : undefined}
                disabled={isDragging}
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.4)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                  "&:disabled": { opacity: 0.5 },
                  borderRadius: "50%",
                }}
              >
                <LuArrowRight />
              </IconButton>
            </Box>
          </Box>
        );

      case "parallax":
        return (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              overflow: "hidden",
              borderRadius: 4,
              bgcolor: theme.palette.background.paper,
              ...commonStyles,
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <MotionBox
                key={active}
                custom={direction}
                {...slideAnimations.parallax}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              >
                <MotionBox
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${slides[active]?.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 6,
                    color: "white",
                  }}
                >
                  <Typography
                    variant="h3"
                    component={motion.h3}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {slides[active]?.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    component={motion.h6}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {slides[active]?.description}
                  </Typography>
                </Box>
              </MotionBox>
            </AnimatePresence>

            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                zIndex: 1,
              }}
            >
              <IconButton
                onClick={() => setAutoplay(!autoplay)}
                sx={{
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                {autoplay ? <LuPause /> : <LuPlay />}
              </IconButton>
              {slides.map((_, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  animate={{
                    scale: active === index ? 1 : 0.8,
                    opacity: active === index ? 1 : 0.5,
                  }}
                  sx={{
                    width: active === index ? 24 : 12,
                    height: 4,
                    borderRadius: 2,
                    bgcolor: "white",
                    cursor: "pointer",
                    transition: "width 0.3s ease",
                  }}
                  onClick={() => setActive(index)}
                />
              ))}
            </Box>
          </Box>
        );

      case "fade":
        return (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              overflow: "hidden",
              borderRadius: 4,
              ...commonStyles,
            }}
          >
            <AnimatePresence mode="wait">
              <MotionBox
                key={active}
                {...slideAnimations.fade}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${imageSlides[active]?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    p: 3,
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    textAlign: "center",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {imageSlides[active]?.title}
                  </Typography>
                  <Typography variant="body1">
                    {imageSlides[active]?.description}
                  </Typography>
                </Box>
              </MotionBox>
            </AnimatePresence>

            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.3)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
              }}
            >
              <LuChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.3)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
              }}
            >
              <LuChevronRight />
            </IconButton>
          </Box>
        );

      default:
        return null;
    }
  };

  return renderVariant();
};

export default CarouselVariants;
