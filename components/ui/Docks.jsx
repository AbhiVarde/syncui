import React, { useState } from "react";
import { Box, Tooltip, Paper, Divider, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiSettings,
  FiMail,
  FiCamera,
  FiGlobe,
  FiFolder,
  FiTerminal,
} from "react-icons/fi";

const DockVariants = ({ variant = "minimal" }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const dockItems = [
    { icon: FiHome, label: "Home", group: "main" },
    { icon: FiFolder, label: "Files", group: "main" },
    { icon: FiGlobe, label: "Browser", group: "apps" },
    { icon: FiMail, label: "Mail", group: "apps" },
    { icon: FiCamera, label: "Camera", group: "apps" },
    { icon: FiTerminal, label: "Terminal", group: "system" },
    { icon: FiSettings, label: "Settings", group: "system" },
  ];

  // Theme-aware color configurations
  const themeColors = {
    background: isDark ? "rgba(30, 32, 35, 0.95)" : "rgba(255, 255, 255, 0.95)",
    paperGradient: isDark
      ? "linear-gradient(145deg, #2d3135 0%, #1e2023 100%)"
      : "linear-gradient(145deg, #ffffff 0%, #f0f2f5 100%)",
    iconHoverGradient: isDark
      ? "linear-gradient(135deg, #404549 0%, #2d3135 100%)"
      : "linear-gradient(135deg, #90caf9 0%, #42a5f5 100%)",
    iconColor: isDark ? theme.palette.text.primary : "text.primary",
    iconHoverColor: "#ffffff",
    borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)",
    dividerColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
  };

  // Consistent size configurations
  const config = {
    iconSize: 22,
    buttonSize: 45,
    gapSize: 2,
    hoverScale: 1.2,
    baseAnimation: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
  };

  const renderVariant = () => {
    switch (variant) {
      case "modern":
        return (
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              padding: 2,
              background: themeColors.paperGradient,
              border: `1px solid ${themeColors.borderColor}`,
              boxShadow: isDark
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.12)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: config.gapSize,
                position: "relative",
              }}
            >
              {dockItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredIndex === index;
                const distance = Math.abs(hoveredIndex - index);
                const neighborScale =
                  hoveredIndex !== null ? Math.max(1, 1.1 - distance * 0.1) : 1;

                return (
                  <motion.div
                    key={index}
                    {...config.baseAnimation}
                    transition={{
                      ...config.baseAnimation.transition,
                      delay: index * 0.05,
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <Tooltip title={item.label} placement="top" arrow>
                      <motion.div
                        animate={{
                          scale: isHovered ? config.hoverScale : neighborScale,
                          rotate: isHovered ? [0, -10, 10, 0] : 0,
                          y: isHovered ? -12 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                          rotate: {
                            duration: 0.5,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: config.buttonSize,
                            height: config.buttonSize,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 3,
                            cursor: "pointer",
                            background: isHovered
                              ? themeColors.iconHoverGradient
                              : themeColors.background,
                            boxShadow: isHovered
                              ? isDark
                                ? "0 8px 16px rgba(0, 0, 0, 0.3)"
                                : "0 8px 16px rgba(99, 102, 241, 0.3)"
                              : "0 2px 8px rgba(0, 0, 0, 0.06)",
                            color: isHovered
                              ? themeColors.iconHoverColor
                              : themeColors.iconColor,
                            transition: "all 0.3s ease",
                            position: "relative",
                          }}
                        >
                          <Icon size={config.iconSize} />
                        </Box>
                      </motion.div>
                    </Tooltip>
                  </motion.div>
                );
              })}
            </Box>
          </Paper>
        );

      case "categorical":
        return (
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              padding: 2,
              background: themeColors.paperGradient,
              border: `1px solid ${themeColors.borderColor}`,
              backdropFilter: "blur(8px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {dockItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredIndex === index;
                const showDivider =
                  index < dockItems.length - 1 &&
                  dockItems[index].group !== dockItems[index + 1].group;

                return (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <motion.div
                      initial={config.baseAnimation.initial}
                      animate={config.baseAnimation.animate}
                      transition={{
                        ...config.baseAnimation.transition,
                        delay: index * 0.05,
                      }}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <Tooltip title={item.label} placement="top" arrow>
                        <motion.div
                          animate={{
                            scale: isHovered ? config.hoverScale : 1,
                            y: isHovered ? -8 : 0,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <Box
                            sx={{
                              width: config.buttonSize,
                              height: config.buttonSize,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 2,
                              cursor: "pointer",
                              color: isHovered
                                ? !isDark
                                  ? "#42a5f5"
                                  : themeColors.iconColor
                                : themeColors.iconColor,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: isDark
                                  ? "rgba(255, 255, 255, 0.05)"
                                  : "rgba(0, 0, 0, 0.04)",
                              },
                            }}
                          >
                            <Icon size={config.iconSize} />
                          </Box>
                        </motion.div>
                      </Tooltip>
                    </motion.div>

                    {showDivider && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          ml: 2,
                          height: "32px",
                          alignSelf: "center",
                          borderColor: themeColors.dividerColor,
                          opacity: 1,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        );

      case "dynamic":
        return (
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 3,
                    padding: 2,
                    background: themeColors.paperGradient,
                    border: `1px solid ${themeColors.borderColor}`,
                    boxShadow: isDark
                      ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                      : "0 4px 20px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <Box sx={{ display: "flex", gap: config.gapSize }}>
                    {dockItems.map((item, index) => {
                      const Icon = item.icon;
                      const isHovered = hoveredIndex === index;
                      const distance = Math.abs(hoveredIndex - index);
                      const scale = isHovered
                        ? config.hoverScale
                        : hoveredIndex !== null
                        ? Math.max(1, config.hoverScale - distance * 0.15)
                        : 1;

                      return (
                        <motion.div
                          key={index}
                          {...config.baseAnimation}
                          transition={{
                            ...config.baseAnimation.transition,
                            delay: index * 0.05,
                          }}
                          onHoverStart={() => setHoveredIndex(index)}
                          onHoverEnd={() => setHoveredIndex(null)}
                        >
                          <Tooltip title={item.label} placement="top" arrow>
                            <motion.div
                              animate={{
                                scale,
                                y: isHovered ? -8 : 0,
                                rotateZ: isHovered ? -8 : 0,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              <Paper
                                elevation={isHovered ? 4 : 1}
                                sx={{
                                  width: config.buttonSize,
                                  height: config.buttonSize,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: 2,
                                  cursor: "pointer",
                                  background: isHovered
                                    ? themeColors.iconHoverGradient
                                    : themeColors.background,
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    background: themeColors.iconHoverGradient,
                                    color: themeColors.iconHoverColor,
                                  },
                                }}
                              >
                                <Icon size={config.iconSize} />
                              </Paper>
                            </motion.div>
                          </Tooltip>
                        </motion.div>
                      );
                    })}
                  </Box>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        );

      case "glass":
        return (
          <Box
            sx={{
              background: themeColors.paperGradient,
              borderRadius: 3,
              padding: 2,
              boxShadow: isDark
                ? "0 4px 30px rgba(0, 0, 0, 0.2)"
                : "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${themeColors.borderColor}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{
                background: [
                  `linear-gradient(0deg, ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"
                  }, ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"
                  })`,
                  `linear-gradient(90deg, ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)"
                  }, ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"
                  })`,
                  `linear-gradient(180deg, ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"
                  }, ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"
                  })`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "12px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: config.gapSize,
                position: "relative",
              }}
            >
              {dockItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredIndex === index;

                return (
                  <motion.div
                    key={index}
                    {...config.baseAnimation}
                    transition={{
                      ...config.baseAnimation.transition,
                      delay: index * 0.05,
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <Tooltip title={item.label} placement="top" arrow>
                      <motion.div
                        animate={{
                          scale: isHovered ? config.hoverScale : 1,
                          y: isHovered ? -8 : 0,
                          rotateY: isHovered ? [0, 180, 360] : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                          rotateY: {
                            duration: 0.8,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: config.buttonSize,
                            height: config.buttonSize,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            cursor: "pointer",
                            background: isHovered
                              ? isDark
                                ? "rgba(255, 255, 255, 0.15)"
                                : "rgba(255, 255, 255, 0.2)"
                              : isDark
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(255, 255, 255, 0.1)",
                            border: isDark
                              ? "1px solid rgba(255, 255, 255, 0.2)"
                              : "1px solid rgba(255, 255, 255, 0.3)",
                            boxShadow: isHovered
                              ? isDark
                                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                                : "0 8px 32px rgba(31, 38, 135, 0.15)"
                              : "none",
                            color: isHovered
                              ? !isDark
                                ? "#42a5f5"
                                : themeColors.iconColor
                              : themeColors.iconColor,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              background: isDark
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(255, 255, 255, 0.25)",
                              border: isDark
                                ? "1px solid rgba(255, 255, 255, 0.3)"
                                : "1px solid rgba(255, 255, 255, 0.4)",
                            },
                          }}
                        >
                          <Icon size={config.iconSize} />
                        </Box>
                      </motion.div>
                    </Tooltip>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "100%",
        minHeight: 90,
        padding: 2,
      }}
    >
      {renderVariant()}
    </Box>
  );
};

export default DockVariants;
