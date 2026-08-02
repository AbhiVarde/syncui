import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/router";

const TabVariants = ({ variant, preview = false }) => {
  const theme = useTheme();
  const router = useRouter();
  const { asPath } = router;
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Home", "Profile", "Settings", "Contact"];

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabClick = (index) => {
    if (preview) return;
    setActiveTab(index);
  };

  const getTabStyle = (index) => ({
    padding: preview ? "6px 10px" : isMobile ? "8px 12px" : "10px 20px",
    cursor: preview ? "default" : "pointer",
    position: "relative",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    fontSize: preview ? "0.75rem" : isMobile ? "0.875rem" : "1rem",
  });

  const renderTabs = () => {
    switch (variant) {
      case "slidingUnderline":
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: preview ? "nowrap" : "wrap",
              justifyContent: "center",
              borderBottom: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.2)"
              }`,
            }}
          >
            {tabs.map((tab, index) => (
              <Box
                key={tab}
                sx={getTabStyle(index)}
                onClick={() => handleTabClick(index)}
              >
                <Typography
                  sx={{
                    fontSize: "inherit",
                    whiteSpace: "nowrap",
                    textShadow:
                      activeTab === index
                        ? theme.palette.mode === "dark"
                          ? "0 0 4px rgba(255,255,255,0.6)"
                          : "0 0 4px rgba(0,0,0,0.35)"
                        : "none",
                  }}
                >
                  {tab}
                </Typography>
                {activeTab === index && (
                  <motion.div
                    layoutId="underline"
                    style={{
                      position: "absolute",
                      bottom: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                      background:
                        theme.palette.mode === "dark" ? "#fff" : "#000",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Box>
            ))}
          </Box>
        );

      case "growingBackground":
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: preview ? "nowrap" : "wrap",
              gap: preview ? 1 : 1.5,
              padding: 1,
              background: theme.palette.mode === "dark" ? "#1A1A1A" : "#F0F0F0",
              justifyContent: "center",
              borderRadius: "12px",
            }}
          >
            {tabs.map((tab, index) => (
              <Box
                key={tab}
                sx={{
                  ...getTabStyle(index),
                  padding: preview ? "4px 8px" : "6px 12px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor:
                    activeTab === index
                      ? theme.palette.mode === "dark"
                        ? "#222"
                        : "#fff"
                      : "transparent",
                  transition: "background-color 0.2s",
                }}
                onClick={() => handleTabClick(index)}
              >
                <Typography
                  sx={{
                    fontSize: "inherit",
                    whiteSpace: "nowrap",
                    position: "relative",
                    zIndex: 1,
                    textShadow:
                      activeTab === index
                        ? theme.palette.mode === "dark"
                          ? "0 0 4px rgba(255,255,255,0.6)"
                          : "0 0 4px rgba(0,0,0,0.35)"
                        : "none",
                  }}
                >
                  {tab}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      case "elevatedCards":
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: preview ? "nowrap" : "wrap",
              gap: preview ? 1 : 1.5,
              padding: 1,
              background: theme.palette.mode === "dark" ? "#1A1A1A" : "#F0F0F0",
              borderRadius: "12px",
              justifyContent: "center",
            }}
          >
            {tabs.map((tab, index) => (
              <motion.div
                key={tab}
                style={{
                  ...getTabStyle(index),
                  padding: preview ? "4px 8px" : "6px 12px",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#222" : "#fff",
                  borderRadius: "8px",
                  boxShadow:
                    activeTab === index
                      ? theme.palette.mode === "dark"
                        ? "0 10px 20px rgba(255,255,255,0.1)"
                        : "0 10px 20px rgba(0,0,0,0.1)"
                      : "none",
                }}
                whileHover={preview ? undefined : { y: -5 }}
                animate={{
                  y: activeTab === index ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleTabClick(index)}
              >
                <Typography
                  sx={{
                    fontSize: "inherit",
                    whiteSpace: "nowrap",
                    textShadow:
                      activeTab === index
                        ? theme.palette.mode === "dark"
                          ? "0 0 5px rgba(255,255,255,0.7)"
                          : "0 0 5px rgba(0,0,0,0.35)"
                        : "0 0 2px rgba(0,0,0,0.15)",
                    color:
                      activeTab === index
                        ? theme.palette.mode === "dark"
                          ? "#fff"
                          : "#000"
                        : theme.palette.mode === "dark"
                          ? "#aaa"
                          : "#666",
                  }}
                >
                  {tab}
                </Typography>
              </motion.div>
            ))}
          </Box>
        );

      case "floatingBackground":
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: preview ? "nowrap" : "wrap",
              gap: preview ? 1 : 1.5,
              padding: 1,
              background: theme.palette.mode === "dark" ? "#1A1A1A" : "#F0F0F0",
              borderRadius: "12px",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {tabs.map((tab, index) => (
              <motion.div
                key={tab}
                style={{
                  ...getTabStyle(index),
                  padding: preview ? "4px 8px" : "6px 12px",
                  borderRadius: 2,
                  position: "relative",
                  zIndex: 1,
                }}
                onClick={() => handleTabClick(index)}
              >
                <Typography
                  sx={{
                    fontSize: "inherit",
                    whiteSpace: "nowrap",
                    textShadow:
                      activeTab === index
                        ? theme.palette.mode === "dark"
                          ? "0 0 4px rgba(255,255,255,0.6)"
                          : "0 0 4px rgba(0,0,0,0.35)"
                        : "none",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  }}
                >
                  {tab}
                </Typography>
                <AnimatePresence>
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTabBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          theme.palette.mode === "dark" ? "#222" : "#fff",
                        borderRadius: "8px",
                        zIndex: -1,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: preview ? 0 : isMobile ? 1 : 2,
        pointerEvents: preview ? "none" : "auto",
      }}
    >
      {renderTabs()}
    </Box>
  );
};

export default TabVariants;
