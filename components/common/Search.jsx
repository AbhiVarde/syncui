import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useTheme,
  Slide,
} from "@mui/material";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, File02Icon } from "@hugeicons/core-free-icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = ({ docsTree = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // dialog open state
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getFilteredDocsTree = (docs) => {
    return docs.filter(
      (item) =>
        item.title !== "Setup" &&
        item.title !== "Changelog" &&
        item.title !== "Templates" &&
        item.title !== "The Story of Sync UI",
    );
  };

  const getDefaultSuggestions = () => {
    const filtered = getFilteredDocsTree(docsTree);
    const latestNames = ["Hero", "Pricing", "Skeletons", "Time Pickers"];
    const latest = [];
    const allBlocks = [];
    const allComponents = [];

    filtered.forEach((item) => {
      const slug = item.slug || item.title.toLowerCase().replace(/\s+/g, "-");
      const isBlock = slug.startsWith("blocks/");
      if (isBlock) {
        allBlocks.push({ ...item, category: "All Blocks" });
      } else {
        allComponents.push({ ...item, category: "All Components" });
      }
    });

    latestNames.forEach((name) => {
      const found = filtered.find((item) => item.title === name);
      if (found) {
        latest.push({ ...found, category: "Latest" });
      }
    });

    return [...latest, ...allBlocks, ...allComponents];
  };

  const simulateAsyncLoad = async (query) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (!query.trim()) {
      setFilteredDocs(getDefaultSuggestions());
    } else {
      const filtered = getFilteredDocsTree(docsTree)
        .filter((doc) => doc.title.toLowerCase().includes(query.toLowerCase()))
        .map((item) => {
          const slug =
            item.slug || item.title.toLowerCase().replace(/\s+/g, "-");
          const isBlock = slug.startsWith("blocks/");
          return {
            ...item,
            category: isBlock ? "All Blocks" : "Search Results",
          };
        });
      setFilteredDocs(filtered);
    }
    setIsLoading(false);
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    if (value.length > 0) {
      simulateAsyncLoad(value);
    } else {
      setFilteredDocs(getDefaultSuggestions());
      setIsLoading(false);
    }
    setSelectedIndex(0);
  };

  const handleSelectDoc = (doc) => {
    const url = `/docs/${doc.slug || doc.title.toLowerCase().replace(/\s+/g, "-")}`;
    router.push(url);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (!isOpen) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredDocs.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        event.preventDefault();
        if (filteredDocs[selectedIndex]) {
          handleSelectDoc(filteredDocs[selectedIndex]);
        }
        break;
      case "Escape":
        handleClose();
        break;
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setSearchQuery("");
    setFilteredDocs(getDefaultSuggestions());
    setSelectedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    setFilteredDocs([]);
    setSelectedIndex(0);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (
        e.key === "/" &&
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        handleOpen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    const category = doc.category || "All Components";
    if (!acc[category]) acc[category] = [];
    acc[category].push(doc);
    return acc;
  }, {});

  const categoryOrder = [
    "Latest",
    "All Blocks",
    "All Components",
    "Search Results",
  ];
  const sortedCategories = Object.keys(groupedDocs).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    return indexA - indexB;
  });

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ padding: "4px" }}>
        <HugeiconsIcon
          icon={Search01Icon}
          size={22}
          color={isDark ? "#FFF" : "#000"}
        />
      </IconButton>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundImage: "none",
            bgcolor: isDark ? "#000" : "#fff",
            color: isDark ? "#f9fafb" : "#000",
            borderRadius: "12px",
            border: `1px solid ${isDark ? "#222" : "#e5e5e5"}`,
            height: "60vh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderBottom: `1px solid ${isDark ? "#222" : "#e5e5e5"}`,
            position: "sticky",
            top: 0,
            bgcolor: isDark ? "#000" : "#fff",
            zIndex: 1,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: isDark ? "#6b7280" : "#999",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HugeiconsIcon icon={Search01Icon} size={18} />
            </Box>
            <input
              ref={inputRef}
              style={{
                width: "100%",
                height: "38px",
                padding: "0 40px 0 40px",
                borderRadius: "8px",
                border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
                backgroundColor: isDark ? "#111" : "#f8f9fa",
                color: isDark ? "#f9fafb" : "#000",
                fontSize: "14px",
                outline: "none",
              }}
              placeholder="Search components…"
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: `2px solid ${isDark ? "#222" : "#e0e0e0"}`,
                    borderTop: `2px solid ${isDark ? "#666" : "#666"}`,
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
            )}
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
          {isLoading ? (
            <Box
              sx={{
                py: 6,
                textAlign: "center",
                color: isDark ? "#6b7280" : "#999",
                fontSize: "14px",
              }}
            >
              Loading...
            </Box>
          ) : filteredDocs.length > 0 ? (
            sortedCategories.map((category) => {
              const docs = groupedDocs[category];
              return (
                <Box key={category}>
                  <Box
                    sx={{
                      padding: "8px 16px 4px 16px",
                      backgroundColor: isDark ? "#111" : "#f9fafb",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: isDark ? "#9ca3af" : "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: `1px solid ${isDark ? "#222" : "#e5e5e5"}`,
                    }}
                  >
                    {category}
                  </Box>
                  {docs.map((doc, index) => {
                    const globalIndex =
                      sortedCategories
                        .slice(0, sortedCategories.indexOf(category))
                        .reduce(
                          (sum, cat) => sum + groupedDocs[cat].length,
                          0,
                        ) + index;
                    return (
                      <motion.div
                        key={`${category}-${doc.title}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.12, delay: index * 0.015 }}
                        onMouseDown={() => handleSelectDoc(doc)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 14px",
                            fontSize: "13px",
                            gap: "10px",
                            cursor: "pointer",
                            borderBottom: `1px solid ${isDark ? "#1a1a1a" : "#f0f0f0"}`,
                            backgroundColor:
                              globalIndex === selectedIndex
                                ? isDark
                                  ? "#1a1a1a"
                                  : "rgba(0,0,0,0.06)"
                                : "transparent",
                            "&:hover": {
                              backgroundColor: isDark
                                ? "#1a1a1a"
                                : "rgba(0,0,0,0.06)",
                            },
                          }}
                        >
                          <HugeiconsIcon
                            icon={File02Icon}
                            size={16}
                            color={isDark ? "#666" : "#6b7280"}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark ? "#f9fafb" : "#111",
                              fontWeight: 400,
                              fontSize: "15px",
                            }}
                          >
                            {doc.title}
                          </Typography>
                        </Box>
                      </motion.div>
                    );
                  })}
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                py: 6,
                textAlign: "center",
                color: isDark ? "#6b7280" : "#999",
              }}
            >
              <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
                <HugeiconsIcon icon={Search01Icon} size={28} />
              </Box>
              <Typography variant="body2">
                No results for "{searchQuery}"
              </Typography>
            </Box>
          )}
        </Box>
      </Dialog>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Search;
