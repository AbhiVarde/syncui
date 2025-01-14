import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const TabVariants = ({ variant }) => {
  const theme = useTheme();
  const router = useRouter();
  const { asPath } = router;
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Home", "Profile", "Settings", "Contact"];

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getTabStyle = (index) => ({
    padding: isMobile ? "8px 12px" : "10px 20px",
    cursor: "pointer",
    position: "relative",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    transition: "color 0.3s ease",
    fontSize: isMobile ? "0.875rem" : "1rem",
  });

  const renderTabs = () => {
    switch (variant) {
      case "slidingUnderline":
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
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
                onClick={() => setActiveTab(index)}
              >
                <Typography
                  sx={{ fontWeight: activeTab === index ? 500 : 400 }}
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
              flexWrap: "wrap",
              gap: isMobile ? 1 : 2,
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
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                onClick={() => setActiveTab(index)}
              >
                <Typography
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    fontWeight: activeTab === index ? 500 : 400,
                  }}
                >
                  {tab}
                </Typography>
                <AnimatePresence>
                  {activeTab === index && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#222" : "#fff",
                        borderRadius: "8px",
                        zIndex: 0,
                      }}
                    />
                  )}
                </AnimatePresence>
              </Box>
            ))}
          </Box>
        );

      case "elevatedCards":
        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: isMobile ? 1 : 2,
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
                  padding: isMobile ? "10px 16px" : "12px 24px",
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
                whileHover={{ y: -5 }}
                animate={{
                  y: activeTab === index ? -10 : 0,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                onClick={() => setActiveTab(index)}
              >
                <Typography
                  sx={{
                    fontWeight: activeTab === index ? 500 : 400,
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
              flexWrap: "wrap",
              gap: isMobile ? 1 : 2,
              padding: 1,
              background: theme.palette.mode === "dark" ? "#1A1A1A" : "#F0F0F0",
              borderRadius: "12px",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.5,
              }}
              animate={{
                x: [-20, 20, -20],
                y: [-20, 20, -20],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: 20,
                  ease: "easeInOut",
                },
                y: {
                  repeat: Infinity,
                  duration: 30,
                  ease: "easeInOut",
                },
              }}
            />
            {tabs.map((tab, index) => (
              <motion.div
                key={tab}
                style={{
                  ...getTabStyle(index),
                  padding: isMobile ? "10px 16px" : "12px 24px",
                  borderRadius: "8px",
                  position: "relative",
                  zIndex: 1,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => setActiveTab(index)}
              >
                <Typography
                  sx={{
                    fontWeight: activeTab === index ? 500 : 400,
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
                      transition={{ duration: 0.2 }}
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
        padding: isMobile ? 1 : 2,
      }}
    >
      {renderTabs()}
    </Box>
  );
};

export default TabVariants;
