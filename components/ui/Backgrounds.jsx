import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Box, useTheme, Typography } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRouter } from "next/router";

const MotionBox = motion.create(Box);

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
              background: `linear-gradient(135deg, #92EFFD, #4E65FF)`,
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
                      fill={`rgba(255,255,255,${0.3 - index * 0.1})`}
                      initial={{
                        d: "M0,160 C320,300,420,240,640,160 C880,80,1200,220,1440,200 V320 H0 Z",
                      }}
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

      case "magneticConnections":
        const [mousePos, setMousePos] = useState(null);
        const [dots, setDots] = useState([]);
        const dotSize = 3;
        const spacing = 40;
        const connectDistance = 80;
        const lineOpacity = 0.6;
        const extraColumns = 4;

        function distance(pos1, pos2) {
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          return Math.sqrt(dx * dx + dy * dy);
        }

        useEffect(() => {
          if (ref.current) {
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;

            const cols = Math.floor(width / spacing) + extraColumns;
            const rows = Math.floor(height / spacing);

            const offsetX =
              (width - (cols - extraColumns) * spacing) / 2 -
              (extraColumns * spacing) / 2;
            const offsetY = (height - rows * spacing) / 2;

            const dots = [];
            for (let row = 0; row < rows; row++) {
              for (let col = 0; col < cols; col++) {
                dots.push({
                  id: `${col}-${row}`,
                  x: offsetX + col * spacing,
                  y: offsetY + row * spacing,
                });
              }
            }
            setDots(dots);
          }

          const handleResize = () => {
            if (ref.current) {
              const width = ref.current.offsetWidth;
              const height = ref.current.offsetHeight;

              const cols = Math.floor(width / spacing) + extraColumns;
              const rows = Math.floor(height / spacing);

              const offsetX =
                (width - (cols - extraColumns) * spacing) / 2 -
                (extraColumns * spacing) / 2;
              const offsetY = (height - rows * spacing) / 2;

              const newDots = [];
              for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                  newDots.push({
                    id: `${col}-${row}`,
                    x: offsetX + col * spacing,
                    y: offsetY + row * spacing,
                  });
                }
              }
              setDots(newDots);
            }
          };

          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, [ref]);

        const handleMouseMove = useCallback((e) => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }, []);

        const handleMouseLeave = useCallback(() => setMousePos(null), []);

        return (
          <MotionBox
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            sx={{
              width: "100%",
              height: "100%",
              background: theme.palette.background.default,
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                pointerEvents: "none",
              }}
            >
              {mousePos &&
                dots.map((dot) => {
                  const dx = mousePos.x - dot.x;
                  const dy = mousePos.y - dot.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);

                  if (distance < connectDistance) {
                    const opacity =
                      lineOpacity * (1 - distance / connectDistance);
                    return (
                      <line
                        key={`line-${dot.id}`}
                        x1={dot.x}
                        y1={dot.y}
                        x2={mousePos.x}
                        y2={mousePos.y}
                        stroke={theme.palette.text.primary}
                        strokeWidth={0.6}
                        opacity={opacity}
                      />
                    );
                  }
                  return null;
                })}
            </svg>

            {dots.map((dot) => (
              <motion.div
                key={dot.id}
                style={{
                  position: "absolute",
                  left: dot.x - dotSize / 2,
                  top: dot.y - dotSize / 2,
                  width: dotSize,
                  height: dotSize,
                  borderRadius: "50%",
                  background: theme.palette.text.primary,
                  zIndex: 1,
                }}
                animate={{
                  scale: mousePos
                    ? 1 +
                      0.5 *
                        (1 -
                          Math.min(
                            1,
                            distance(mousePos, dot) / connectDistance
                          ))
                    : 1,
                  opacity: mousePos
                    ? 0.8 +
                      0.2 *
                        (1 -
                          Math.min(
                            1,
                            distance(mousePos, dot) / connectDistance
                          ))
                    : 0.8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            ))}

            <Typography
              variant="h4"
              sx={{
                position: "relative",
                zIndex: 2,
                color: theme.palette.text.primary,
                pointerEvents: "none",
              }}
            >
              Magnetic Connections
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
              radial-gradient(at 30% 10%, #6EE7B7 0px, transparent 50%),
              radial-gradient(at 80% 0%, #3B82F6 0px, transparent 50%),
              radial-gradient(at 10% 90%, #F87171 0px, transparent 50%),
              radial-gradient(at 90% 80%, #C084FC 0px, transparent 55%)
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

      case "movingShapes":
        return (
          <MotionBox
            sx={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(45deg, #4E65FF, #92EFFD)`,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[...Array(8)].map((_, index) => {
              const gradients = [
                { start: "#00C853", end: "#B2FF59" },
                { start: "#FF4B2B", end: "#FF416C" },
                { start: "#36D1DC", end: "#5B86E5" },
              ];

              const gradient = gradients[index % gradients.length];

              return (
                <MotionBox
                  key={index}
                  sx={{
                    position: "absolute",
                    width: ["60px", "80px", "100px", "120px"][index % 4],
                    height: ["60px", "80px", "100px", "120px"][index % 4],
                    borderRadius: index % 2 === 0 ? "50%" : "30%",
                    background: `linear-gradient(135deg, ${gradient.start}, ${gradient.end})`,
                    opacity: 0.4,
                    filter: "blur(4px)",
                    boxShadow: `0 0 20px rgba(0,0,0,0.1)`,
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
              );
            })}
            <Typography
              variant="h4"
              sx={{
                color: "white",
                zIndex: 1,
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                fontWeight: "bold",
              }}
            >
              Moving Shapes
            </Typography>
          </MotionBox>
        );

      case "interactiveGrid":
        const squareWidth = 30;
        const squareHeight = 30;
        const [gridDimensions, setGridDimensions] = useState({
          width: 0,
          height: 0,
        });
        const [hoveredSquare, setHoveredSquare] = useState(null);

        const containerRef = useRef(null);

        useEffect(() => {
          if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();

            // Calculate how many squares can fit inside the container
            const horizontalSquares = Math.floor(
              containerRect.width / squareWidth
            );
            const verticalSquares = Math.floor(
              containerRect.height / squareHeight
            );

            setGridDimensions({
              width: horizontalSquares,
              height: verticalSquares,
            });
          }
        }, []);

        // Recalculate on window resize
        useEffect(() => {
          const handleResize = () => {
            if (containerRef.current) {
              const containerRect =
                containerRef.current.getBoundingClientRect();

              const horizontalSquares = Math.floor(
                containerRect.width / squareWidth
              );
              const verticalSquares = Math.floor(
                containerRect.height / squareHeight
              );

              setGridDimensions({
                width: horizontalSquares,
                height: verticalSquares,
              });
            }
          };

          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);

        const totalSquares = gridDimensions.width * gridDimensions.height;
        const containerWidth = squareWidth * gridDimensions.width;
        const containerHeight = squareHeight * gridDimensions.height;

        return (
          <MotionBox
            sx={{
              width: "100%",
              height: "100%",
              background: theme.palette.background.default,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            ref={containerRef}
          >
            {gridDimensions.width > 0 && gridDimensions.height > 0 && (
              <Box
                sx={{
                  position: "relative",
                  width: `${containerWidth}px`,
                  height: `${containerHeight}px`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderColor: "rgba(128, 128, 128, 0.3)",
                  borderWidth: 0.5,
                  borderStyle: "solid",
                }}
              >
                {Array.from({ length: totalSquares }).map((_, index) => {
                  const x = (index % gridDimensions.width) * squareWidth;
                  const y =
                    Math.floor(index / gridDimensions.width) * squareHeight;

                  return (
                    <MotionBox
                      key={index}
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        top: `${y}px`,
                        left: `${x}px`,
                        width: `${squareWidth}px`,
                        height: `${squareHeight}px`,
                        borderColor: "rgba(128, 128, 128, 0.3)",
                        borderWidth: 0.5,
                        borderStyle: "solid",
                      }}
                      onMouseEnter={() => setHoveredSquare(index)}
                      onMouseLeave={() => setHoveredSquare(null)}
                      whileHover={{ scale: 1.05 }}
                      animate={{
                        backgroundColor:
                          hoveredSquare === index ? "#FF416C" : "transparent",
                        transition: {
                          duration: 0.05,
                          ease: "easeOut",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            )}
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.text.primary,
                position: "absolute",
                zIndex: 1,
              }}
            >
              Interactive Grid
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

  return asPath !== "/docs/components/backgrounds" ? (
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
