import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  Fade,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, File02Icon } from "@hugeicons/core-free-icons";

const Search = ({ docsTree = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  const filteredTree = useMemo(() => {
    return docsTree.filter(
      (item) =>
        ![
          "Changelog",
          "Templates",
          "The Story of Sync UI",
          "Installation",
          "llms.txt",
        ].includes(item.title),
    );
  }, [docsTree]);

  const getDisplayCategory = (item) => {
    const slug = item.slug || item.title.toLowerCase().replace(/\s+/g, "-");

    if (item.category === "Installation" || slug.startsWith("installation/")) {
      return "Installation";
    }

    if (item.category === "Blocks" || slug.startsWith("blocks/")) {
      return "All Blocks";
    }

    return "All Components";
  };

  const defaultSuggestions = useMemo(() => {
    return filteredTree.map((item) => ({
      ...item,
      category: getDisplayCategory(item),
    }));
  }, [filteredTree]);

  const filteredDocs = useMemo(() => {
    if (!searchQuery.trim()) return defaultSuggestions;

    return filteredTree
      .filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((item) => ({
        ...item,
        category: getDisplayCategory(item),
      }));
  }, [searchQuery, filteredTree, defaultSuggestions]);

  const groupedDocs = useMemo(() => {
    return filteredDocs.reduce((acc, doc) => {
      const category = doc.category || "All Components";

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(doc);
      return acc;
    }, {});
  }, [filteredDocs]);

  const sortedCategories = useMemo(() => {
    const categoryOrder = ["Installation", "All Blocks", "All Components"];

    return Object.keys(groupedDocs).sort(
      (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b),
    );
  }, [groupedDocs]);

  const handleSelectDoc = (doc) => {
    router.push(
      `/docs/${doc.slug || doc.title.toLowerCase().replace(/\s+/g, "-")}`,
    );

    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setSearchQuery("");
    setSelectedIndex(0);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredDocs.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === "Enter" && filteredDocs[selectedIndex]) {
      e.preventDefault();
      handleSelectDoc(filteredDocs[selectedIndex]);
    }

    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    const handleShortcut = (e) => {
      const tag = e.target.tagName;

      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        handleOpen();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: "4px",
        }}
      >
        <HugeiconsIcon
          icon={Search01Icon}
          size={22}
          color={isDark ? "#fff" : "#000"}
        />
      </IconButton>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Fade}
        transitionDuration={100}
        keepMounted
        sx={{
          "& .MuiDialog-paper": {
            backgroundImage: "none",
            backgroundColor: isDark ? "#111111" : "#FFFFFF",
            borderRadius: "24px",
            border: `1px solid ${isDark ? "#1F1F1F" : "#EEEEEE"}`,
            overflow: "hidden",
            height: "520px",
            maxHeight: "520px",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
            boxShadow: isDark
              ? "0 20px 80px rgba(0,0,0,.55)"
              : "0 20px 80px rgba(0,0,0,.08)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${isDark ? "#1F1F1F" : "#EEEEEE"}`,
            bgcolor: isDark ? "#111111" : "#FFFFFF",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 14,
                display: "flex",
                alignItems: "center",
                color: isDark ? "#6B6B6B" : "#9E9E9E",
                pointerEvents: "none",
              }}
            >
              <HugeiconsIcon icon={Search01Icon} size={18} />
            </Box>

            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search components..."
              autoFocus
              style={{
                width: "100%",
                height: "40px",
                border: `1px solid ${isDark ? "#1F1F1F" : "#EEEEEE"}`,
                borderRadius: "14px",
                background: isDark ? "#1A1A1A" : "#FAFAFA",
                color: isDark ? "#FFFFFF" : "#111111",
                padding: "0 40px",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          {filteredDocs.length > 0 ? (
            sortedCategories.map((category) => {
              const docs = groupedDocs[category];

              return (
                <Box key={category}>
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".6px",
                      color: isDark ? "#666" : "#999",
                      bgcolor: isDark ? "#0f0f0f" : "#F1F1F1",
                      borderBottom: `1px solid ${
                        isDark ? "#181818" : "#f3f3f3"
                      }`,
                    }}
                  >
                    {category}
                  </Box>

                  {docs.map((doc, i) => {
                    const globalIndex =
                      sortedCategories
                        .slice(0, sortedCategories.indexOf(category))
                        .reduce(
                          (sum, cat) => sum + groupedDocs[cat].length,
                          0,
                        ) + i;

                    const isSelected = selectedIndex === globalIndex;

                    return (
                      <Box
                        key={`${category}-${doc.title}`}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        onMouseDown={() => handleSelectDoc(doc)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                          px: 2,
                          py: 1.1,
                          cursor: "pointer",
                          borderBottom: `1px solid ${
                            isDark ? "#141414" : "#f7f7f7"
                          }`,
                          bgcolor: isSelected
                            ? isDark
                              ? "#1F1F1F"
                              : "#EEEEEE"
                            : isDark
                              ? "#111111"
                              : "#FFFFFF",
                          transition: "background-color .1s ease",
                        }}
                      >
                        <HugeiconsIcon
                          icon={File02Icon}
                          size={16}
                          color={isDark ? "#5e5e5e" : "#b0b0b0"}
                        />

                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: isDark ? "#f2f2f2" : "#111",
                            lineHeight: 1.2,
                          }}
                        >
                          {doc.title}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                py: 10,
                textAlign: "center",
                color: isDark ? "#666" : "#aaa",
              }}
            >
              <HugeiconsIcon icon={Search01Icon} size={28} />

              <Typography
                sx={{
                  mt: 1,
                  fontSize: "14px",
                }}
              >
                No results for "{searchQuery}"
              </Typography>
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default Search;
