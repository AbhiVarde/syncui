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

  const fg = isDark ? "#FFFFFF" : "#000000";
  const bg = isDark ? "#000000" : "#FFFFFF";
  const border = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const borderSoft = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const muted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const faint = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const hover = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";

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
        <HugeiconsIcon icon={Search01Icon} size={22} color={fg} />
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
            backgroundColor: bg,
            borderRadius: "24px",
            border: `1px solid ${border}`,
            overflow: "hidden",
            height: "520px",
            maxHeight: "520px",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
            boxShadow: isDark
              ? "0 20px 80px rgba(0,0,0,.6)"
              : "0 20px 80px rgba(0,0,0,.1)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${border}`,
            bgcolor: bg,
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
                color: muted,
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
                border: `1px solid ${border}`,
                borderRadius: "14px",
                background: inputBg,
                color: fg,
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
                      color: muted,
                      bgcolor: faint,
                      borderBottom: `1px solid ${borderSoft}`,
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
                          borderBottom: `1px solid ${borderSoft}`,
                          bgcolor: isSelected ? hover : bg,
                          transition: "background-color .1s ease",
                        }}
                      >
                        <HugeiconsIcon
                          icon={File02Icon}
                          size={16}
                          color={muted}
                        />

                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: fg,
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
                color: muted,
              }}
            >
              <HugeiconsIcon icon={Search01Icon} size={28} color={muted} />

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
