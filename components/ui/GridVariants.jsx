import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const GridVariants = ({ variant = "masonry" }) => {
  const theme = useTheme();

  const unsplashImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2940", // Mountain landscape
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2940", // Beach
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2940", // Forest path
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2940", // Mountain lake
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=2940", // Tropical beach
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=2940", // Mountain peaks
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2940", // Nature landscape
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&q=80&w=2940", // Beach waves
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=2940", // Forest
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2940", // Tropical island
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2940", // Mountain range
  ];

  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    imageUrl: unsplashImages[i % unsplashImages.length],
  }));

  const getVariantName = (variant) => {
    const names = {
      masonry: "Masonry Grid",
      bento: "Bento Grid",
      glassmorphism: "Glassmorphism Grid",
      organicShapes: "Organic Shapes Grid",
      minimalCards: "Minimal Cards Grid",
    };
    return names[variant] || variant;
  };

  const renderVariant = () => {
    switch (variant) {
      case "masonry":
        const getMasonryHeight = (index) => {
          const baseHeights = [
            280, 350, 320, 400, 360, 430, 300, 380, 340, 450, 310, 390,
          ];
          const baseHeight = baseHeights[index % baseHeights.length];
          const variation = ((index * 7) % 60) - 30;
          return Math.max(250, baseHeight + variation);
        };

        const getColumnCount = () => {
          if (typeof window !== "undefined") {
            if (window.innerWidth < 600) return 1;
            if (window.innerWidth < 900) return 2;
            return 3;
          }
          return 3;
        };

        const columnCount = getColumnCount();
        const gap = 16;

        const columns = Array.from({ length: columnCount }, () => []);
        const columnHeights = Array(columnCount).fill(0);

        items.slice(0, 9).forEach((item, index) => {
          const height = getMasonryHeight(index);

          const shortestColumnIndex = columnHeights.reduce(
            (minIndex, height, currentIndex) =>
              height < columnHeights[minIndex] ? currentIndex : minIndex,
            0
          );

          columns[shortestColumnIndex].push({
            ...item,
            originalIndex: index,
            height,
          });

          columnHeights[shortestColumnIndex] += height + gap;
        });

        return (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            sx={{
              display: "flex",
              gap: `${gap}px`,
              width: "100%",
              padding: 2,
              alignItems: "flex-start",
            }}
          >
            {columns.map((column, columnIndex) => (
              <Box
                key={`column-${columnIndex}`}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: `${gap}px`,
                }}
              >
                {column.map((item, itemIndex) => (
                  <MotionBox
                    key={`item-${item.originalIndex}-${itemIndex}`}
                    initial={{
                      opacity: 0,
                      y: 30,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: item.originalIndex * 0.03,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    sx={{
                      height: `${item.height}px`,
                      width: "100%",
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      boxShadow: `0 2px 8px rgba(0, 0, 0, 0.1)`,
                      transition: "box-shadow 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 8px 25px rgba(0, 0, 0, 0.15)`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${item.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: theme.palette.grey[100],
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(transparent, rgba(0,0,0,0.6))",
                          padding: 2,
                          color: "white",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          ".MuiBox-root:hover &": {
                            opacity: 1,
                          },
                        }}
                      >
                        {item.title && (
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {item.title}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </MotionBox>
                ))}
              </Box>
            ))}
          </MotionBox>
        );

      case "bento":
        return (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              padding: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gridTemplateRows: "auto auto auto",
              gap: 2,
              minHeight: "70vh",
            }}
          >
            {/* Large featured image */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              sx={{
                gridColumn: { xs: "1", md: "1" },
                gridRow: { xs: "1", md: "1 / 3" },
                minHeight: { xs: 300, md: 500 },
                backgroundImage: `url(${unsplashImages[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 3,
                boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                backgroundColor: theme.palette.grey[100],
              }}
            />

            {/* Two medium images on the right */}
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              sx={{
                gridColumn: { xs: "1", md: "2" },
                gridRow: { xs: "2", md: "1" },
                minHeight: { xs: 150, md: 240 },
                backgroundImage: `url(${unsplashImages[1]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 3,
                boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                backgroundColor: theme.palette.grey[100],
              }}
            />

            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              sx={{
                gridColumn: { xs: "1", md: "2" },
                gridRow: { xs: "3", md: "2" },
                minHeight: { xs: 150, md: 240 },
                backgroundImage: `url(${unsplashImages[2]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 3,
                boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                backgroundColor: theme.palette.grey[100],
              }}
            />

            {/* Bottom row - 3 equal images */}
            {[3, 4, 5].map((imageIndex, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3 + index * 0.05 },
                }}
                sx={{
                  gridColumn: {
                    xs: "1",
                    md: index === 0 ? "1" : index === 1 ? "2" : "1 / 3",
                  },
                  gridRow: { xs: `${4 + index}`, md: "3" },
                  height: 200,
                  backgroundImage: `url(${unsplashImages[imageIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 3,
                  boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                  backgroundColor: theme.palette.grey[100],
                  display: { xs: index === 2 ? "none" : "block", md: "block" },
                }}
              />
            ))}
          </MotionBox>
        );

      case "glassmorphism":
        return (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
              padding: 2,
            }}
          >
            {items.slice(0, 6).map((item, index) => (
              <MotionBox
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: index * 0.1 },
                }}
                sx={{
                  height: 280,
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    height: "90%",
                    width: "90%",
                    borderRadius: 3,
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </MotionBox>
            ))}
          </MotionBox>
        );

      case "organicShapes":
        return (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
              padding: 2,
            }}
          >
            {items.slice(0, 6).map((item, index) => {
              const topLeft = Math.floor(Math.random() * 30) + 20;
              const topRight = Math.floor(Math.random() * 30) + 20;
              const bottomRight = Math.floor(Math.random() * 30) + 20;
              const bottomLeft = Math.floor(Math.random() * 30) + 20;

              return (
                <MotionBox
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.1, duration: 0.4 },
                  }}
                  sx={{
                    height: 280,
                    borderRadius: `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`,
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                    backgroundColor: theme.palette.grey[100],
                  }}
                />
              );
            })}
          </MotionBox>
        );

      case "minimalCards":
        return (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
              padding: 2,
            }}
          >
            {items.slice(0, 6).map((item, index) => (
              <MotionBox
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.05, duration: 0.4 },
                }}
                sx={{
                  height: 280,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: `0 0 0 1px ${theme.palette.divider}`,
                  overflow: "hidden",
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </MotionBox>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 2,
          fontWeight: 500,
          color: theme.palette.text.primary,
          textAlign: "center",
        }}
      >
        {getVariantName(variant)}
      </Typography>

      <AnimatePresence mode="wait">{renderVariant()}</AnimatePresence>
    </Box>
  );
};

export default GridVariants;
