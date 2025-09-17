import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useTheme,
  Slide,
} from "@mui/material";
import { RxMagnifyingGlass, RxFile } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = ({ docsTree = [], isMediumUp = true }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getFilteredDocsTree = (docs) =>
    docs.filter(
      (item) =>
        item.title !== "Setup" &&
        item.title !== "Changelog" &&
        item.title !== "Templates"
    );

  const getDefaultSuggestions = () => {
    const filtered = getFilteredDocsTree(docsTree);
    const latestNames = ["Forms", "Autocompletes", "Text Fields"];
    const latest = [];
    const others = [];
    filtered.forEach((item) => {
      if (latestNames.includes(item.title)) {
        latest.push({ ...item, category: "Latest" });
      } else {
        others.push({ ...item, category: "All Components" });
      }
    });
    return [...latest, ...others];
  };

  const simulateAsyncLoad = async (query) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (!query.trim()) {
      setFilteredDocs(getDefaultSuggestions());
    } else {
      const filtered = getFilteredDocsTree(docsTree)
        .filter((doc) => doc.title.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({ ...item, category: "Search Results" }));
      setFilteredDocs(filtered);
    }
    setIsLoading(false);
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    if (value.length > 0) {
      simulateAsyncLoad(value);
      setIsOpen(true);
    } else {
      setFilteredDocs(getDefaultSuggestions());
      setIsOpen(true);
      setIsLoading(false);
    }
    setSelectedIndex(0);
  };

  const handleSelectDoc = (doc) => {
    const url = `/docs/${
      doc.slug || doc.title.toLowerCase().replace(/\s+/g, "-")
    }`;
    router.push(url);
    setSearchQuery("");
    setIsOpen(false);
    setMobileOpen(false);
  };

  const handleKeyDown = (event) => {
    if (!isOpen && !mobileOpen) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredDocs.length - 1 ? prev + 1 : prev
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
        setIsOpen(false);
        setMobileOpen(false);
        setSearchQuery("");
        setSelectedIndex(0);
        inputRef.current?.blur();
        mobileInputRef.current?.blur();
        break;
    }
  };

  // Hotkey "/"
  useEffect(() => {
    const handleKey = (e) => {
      if (
        e.key === "/" &&
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        if (isMediumUp) {
          inputRef.current?.focus();
          setIsOpen(true);
        } else {
          setMobileOpen(true);
        }
        if (!searchQuery.trim()) setFilteredDocs(getDefaultSuggestions());
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchQuery, docsTree, isMediumUp]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isMediumUp) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMediumUp]);

  const handleMobileOpen = () => {
    setMobileOpen(true);
    setSearchQuery("");
    setFilteredDocs(getDefaultSuggestions());
    setSelectedIndex(0);
    setTimeout(() => mobileInputRef.current?.focus(), 100);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
    setSearchQuery("");
    setFilteredDocs([]);
    setSelectedIndex(0);
  };

  const containerStyle = { width: 300, position: "relative", zIndex: "auto" };

  const inputStyle = {
    width: "100%",
    height: "36px",
    padding: "0 32px 0 32px",
    border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
    borderRadius: "8px",
    backgroundColor: isDark ? "#000" : "#fff",
    color: isDark ? "#f9fafb" : "#000",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  const mobileInputStyle = {
    width: "100%",
    height: "48px",
    padding: "0 48px 0 48px",
    border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
    borderRadius: "12px",
    backgroundColor: isDark ? "#111" : "#f8f9fa",
    color: isDark ? "#f9fafb" : "#000",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "4px",
    maxHeight: "320px",
    overflowY: "auto",
    backgroundColor: isDark ? "#000" : "#fff",
    border: `1px solid ${isDark ? "#111" : "#e0e0e0"}`,
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    zIndex: 9999,
  };

  const renderSearchIcon = () => (
    <RxMagnifyingGlass
      size={19}
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: isDark ? "#6b7280" : "#999",
        pointerEvents: "none",
      }}
    />
  );

  const renderLoadingSpinner = () => (
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
  );

  const renderSlashKey = () =>
    !searchQuery &&
    !isOpen && (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "8px",
          transform: "translateY(-50%)",
          bgcolor: isDark ? "#111" : "#f3f4f6",
          color: isDark ? "#666" : "#6b7280",
          borderRadius: "4px",
          padding: "2px 6px",
          fontSize: "12px",
          fontWeight: 500,
          pointerEvents: "none",
        }}
      >
        /
      </Box>
    );

  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    const category = doc.category || "All Components";
    if (!acc[category]) acc[category] = [];
    acc[category].push(doc);
    return acc;
  }, {});

  const renderResultsList = (isMobile = false) => (
    <div style={isMobile ? {} : dropdownStyle}>
      {isLoading ? (
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            color: isDark ? "#6b7280" : "#999",
            fontSize: "14px",
          }}
        >
          Loading...
        </div>
      ) : filteredDocs.length > 0 ? (
        Object.entries(groupedDocs).map(([category, docs]) => (
          <div key={category}>
            <div
              style={{
                padding: "8px 16px 4px 16px",
                backgroundColor: isDark ? "#111" : "#f9fafb",
                fontSize: "11px",
                fontWeight: 500,
                color: isDark ? "#9ca3af" : "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                borderBottom: isMobile
                  ? `1px solid ${isDark ? "#222" : "#e5e5e5"}`
                  : "none",
              }}
            >
              {category}
            </div>
            {docs.map((doc, docIndex) => {
              const globalIndex =
                Object.entries(groupedDocs)
                  .slice(0, Object.keys(groupedDocs).indexOf(category))
                  .reduce((sum, [, items]) => sum + items.length, 0) + docIndex;
              return (
                <motion.div
                  key={`${category}-${doc.title}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: docIndex * 0.03 }}
                  style={{
                    padding: "8px 14px",
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor:
                      globalIndex === selectedIndex
                        ? isDark
                          ? "#1a1a1a"
                          : "rgba(0,0,0,0.06)"
                        : "transparent",
                    borderBottom: isMobile
                      ? `1px solid ${isDark ? "#1a1a1a" : "#f0f0f0"}`
                      : "none",
                    transition: "background-color 0.2s ease",
                    fontWeight: 400,
                    color: isDark ? "#f9fafb" : "#000",
                  }}
                  onMouseDown={() => handleSelectDoc(doc)}
                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                  whileHover={{
                    backgroundColor: isDark ? "#1a1a1a" : "rgba(0,0,0,0.04)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RxFile
                    size={isMobile ? 18 : 14}
                    style={{
                      color: isDark ? "#666" : "#6b7280",
                      flexShrink: 0,
                    }}
                  />
                  <span>{doc.title}</span>
                </motion.div>
              );
            })}
          </div>
        ))
      ) : searchQuery && !isLoading ? (
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            color: isDark ? "#6b7280" : "#999",
            fontSize: "14px",
          }}
        >
          <RxMagnifyingGlass
            size={24}
            style={{ marginBottom: "8px", opacity: 0.5 }}
          />
          <div>No results found for "{searchQuery}"</div>
        </div>
      ) : null}
    </div>
  );

  if (!isMediumUp) {
    return (
      <>
        <IconButton onClick={handleMobileOpen} sx={{ padding: "4px" }}>
          <RxMagnifyingGlass size={22} />
        </IconButton>

        <Dialog
          fullWidth
          maxWidth="xs"
          open={mobileOpen}
          onClose={handleMobileClose}
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
              <RxMagnifyingGlass
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: isDark ? "#6b7280" : "#999",
                }}
              />
              <input
                ref={mobileInputRef}
                style={{
                  ...mobileInputStyle,
                  height: "38px",
                  padding: "0 40px 0 40px",
                  borderRadius: "8px",
                }}
                placeholder="Search components…"
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {isLoading && renderLoadingSpinner()}
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
              Object.entries(groupedDocs).map(([category, docs]) => (
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
                  {docs.map((doc, index) => (
                    <motion.div
                      key={`${category}-${doc.title}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.02 }}
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
                          "&:hover": {
                            backgroundColor: isDark
                              ? "#1a1a1a"
                              : "rgba(0,0,0,0.06)",
                          },
                        }}
                      >
                        <RxFile
                          size={16}
                          style={{
                            color: isDark ? "#666" : "#6b7280",
                            flexShrink: 0,
                          }}
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
                  ))}
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  py: 6,
                  textAlign: "center",
                  color: isDark ? "#6b7280" : "#999",
                }}
              >
                <RxMagnifyingGlass size={28} style={{ marginBottom: "6px" }} />
                <Typography variant="body2">
                  No results for "{searchQuery}"
                </Typography>
              </Box>
            )}
          </Box>
        </Dialog>
      </>
    );
  }

  return (
    <div style={containerStyle} ref={inputRef}>
      <div style={{ position: "relative" }}>
        {renderSearchIcon()}
        <input
          style={inputStyle}
          placeholder="Search components…"
          value={searchQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchQuery.length > 0) {
              setIsOpen(true);
            } else {
              setFilteredDocs(getDefaultSuggestions());
              setIsOpen(true);
            }
          }}
        />
        {isLoading && renderLoadingSpinner()}
        {renderSlashKey()}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {renderResultsList(false)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
    </div>
  );
};

export default Search;
