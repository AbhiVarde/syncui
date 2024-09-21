import React, { useRef, useEffect, useMemo } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRouter } from "next/router";

const MotionBox = motion(Box);

const BackgroundVariants = ({ variant }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const renderBackground = () => {
    switch (variant) {
      case "geminiWave":
        return (
          <MotionBox
            sx={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MotionBox
              sx={{
                position: "absolute",
                width: "150%",
                height: "100%",
                left: "-25%",
              }}
            >
              {[...Array(3)].map((_, index) => (
                <MotionBox
                  key={index}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.7 - index * 0.2,
                  }}
                >
                  <svg
                    viewBox="0 0 1440 320"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <motion.path
                      d="M0,160 C320,300,420,240,640,160 C880,80,1200,220,1440,200 V320 H0 Z"
                      fill={`rgba(255,255,255,${0.3 - index * 0.1})`}
                      animate={{
                        d: [
                          "M0,160 C320,300,420,240,640,160 C880,80,1200,220,1440,200 V320 H0 Z",
                          "M0,200 C320,100,420,260,640,200 C880,140,1200,180,1440,240 V320 H0 Z",
                          "M0,160 C320,300,420,240,640,160 C880,80,1200,220,1440,200 V320 H0 Z",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 10 - index * 2,
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </MotionBox>
              ))}
            </MotionBox>
            <Typography variant="h4" sx={{ color: "white", zIndex: 1 }}>
              Gemini Wave
            </Typography>
          </MotionBox>
        );

      case "movingShapes":
        return (
          <MotionBox
            sx={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(45deg, ${theme.palette.background.default}, ${theme.palette.primary.light})`,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[...Array(8)].map((_, index) => (
              <MotionBox
                key={index}
                sx={{
                  position: "absolute",
                  width: ["60px", "80px", "100px", "120px"][index % 4],
                  height: ["60px", "80px", "100px", "120px"][index % 4],
                  borderRadius: index % 2 === 0 ? "50%" : "30%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  opacity: 0.2,
                  filter: "blur(4px)",
                }}
                animate={{
                  x: ["-20%", "120%"],
                  y: ["-20%", "120%"],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15 + index * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                style={{
                  left: `${(index * 25) % 100}%`,
                  top: `${(index * 35) % 100}%`,
                }}
              />
            ))}
            <Typography variant="h4" sx={{ color: "white", zIndex: 1 }}>
              Moving Shapes
            </Typography>
          </MotionBox>
        );

      case "gradientMesh":
        return (
          <MotionBox
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1 } },
            }}
            sx={{
              width: "100%",
              height: "100%",
              background: `
                radial-gradient(at 40% 20%, ${theme.palette.primary.light} 0px, transparent 50%),
                radial-gradient(at 80% 0%, ${theme.palette.secondary.light} 0px, transparent 50%),
                radial-gradient(at 0% 50%, ${theme.palette.primary.main} 0px, transparent 50%),
                radial-gradient(at 80% 50%, ${theme.palette.secondary.main} 0px, transparent 50%),
                radial-gradient(at 0% 100%, ${theme.palette.primary.dark} 0px, transparent 50%),
                radial-gradient(at 80% 100%, ${theme.palette.secondary.dark} 0px, transparent 50%)
              `,
              backgroundSize: "100% 100%",
              animation: "gradientShift 15s ease infinite",
              "@keyframes gradientShift": {
                "0%, 100%": { backgroundPosition: "0% 0%" },
                "50%": { backgroundPosition: "100% 100%" },
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              Gradient Mesh
            </Typography>
          </MotionBox>
        );

      case "flickeringGrid":
        const squareSize = 2;
        const gridGap = 0.5;
        const flickerChance = 0.3;
        const maxOpacity = 0.3;
        const flickerDuration = 0.5;

        const gridSize = useMemo(() => {
          const cols = Math.floor(100 / (squareSize + gridGap));
          const rows = Math.floor(100 / (squareSize + gridGap));
          return { cols, rows };
        }, []);

        const squares = useMemo(() => {
          return Array.from({ length: gridSize.cols * gridSize.rows }, () => ({
            opacity: Math.random() * maxOpacity,
          }));
        }, [gridSize, maxOpacity]);

        const flickerControls = useAnimation();
        const isMounted = useRef(false);

        useEffect(() => {
          isMounted.current = true;
          return () => {
            isMounted.current = false;
          };
        }, []);

        useEffect(() => {
          const animateFlicker = async () => {
            while (isMounted.current) {
              await flickerControls.start((i) => ({
                opacity:
                  Math.random() < flickerChance
                    ? Math.random() * maxOpacity
                    : squares[i].opacity,
                transition: { duration: flickerDuration, ease: "easeInOut" },
              }));
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          };

          if (isMounted.current) {
            animateFlicker();
          }

          return () => {
            flickerControls.stop();
          };
        }, [
          flickerControls,
          squares,
          flickerChance,
          maxOpacity,
          flickerDuration,
        ]);

        return (
          <MotionBox
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
              background: theme.palette.background.default,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {squares.map((square, i) => (
              <MotionBox
                key={i}
                custom={i}
                animate={flickerControls}
                initial={{ opacity: square.opacity }}
                sx={{
                  position: "absolute",
                  width: `${squareSize}%`,
                  height: `${squareSize}%`,
                  left: `${(i % gridSize.cols) * (squareSize + gridGap)}%`,
                  top: `${
                    Math.floor(i / gridSize.cols) * (squareSize + gridGap)
                  }%`,
                  backgroundColor: "#34D399",
                }}
              />
            ))}
            <Typography
              variant="h4"
              sx={{ color: theme.palette.text.primary, zIndex: 1 }}
            >
              Flickering Grid
            </Typography>
          </MotionBox>
        );

      case "dots":
        return (
          <MotionBox
            sx={{
              width: "100%",
              height: "100%",
              background: theme.palette.background.default,
              backgroundImage: `radial-gradient(${theme.palette.text.secondary} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Dots</Typography>
          </MotionBox>
        );

      case "grid":
        return (
          <MotionBox
            sx={{
              width: "100%",
              height: "100%",
              background: theme.palette.background.default,
              backgroundImage: `linear-gradient(${theme.palette.divider} 1px, transparent 1px),
                                 linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Grid</Typography>
          </MotionBox>
        );

      default:
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: theme.palette.background.default,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
              Default Background
            </Typography>
          </Box>
        );
    }
  };

  return asPath !== "/docs/backgrounds" ? (
    <AnimatePresence>
      <Box sx={{ width: "100%", height: "300px", overflow: "hidden" }}>
        {renderBackground()}
      </Box>
    </AnimatePresence>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        overflow: "hidden",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <AnimatePresence>
        <Box sx={{ width: "100%", height: "300px", overflow: "hidden" }}>
          {renderBackground()}
        </Box>
      </AnimatePresence>
    </Box>
  );
};

export default BackgroundVariants;
