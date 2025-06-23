import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiSend,
  FiImage,
  FiChevronDown,
  FiPaperclip,
  FiArrowUp,
} from "react-icons/fi";

const TextFieldVariants = ({ variant = "endIcon" }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const placeholderSets = {
    endIcon: [
      "Enter your email address",
      "Your professional email",
      "Contact email address",
    ],
    startInline: ["Your website URL", "Business domain", "Custom domain"],
    endInline: ["Search anything", "Find content", "Explore here"],
    currency: ["Enter amount", "Your budget", "Price value"],
    aiPrompt: [
      "Ask me anything...",
      "What can I help you with?",
      "How can I assist you?",
      "Type your question...",
    ],
  };

  const aiModels = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-3.5", label: "GPT-3.5 Turbo" },
    { value: "claude", label: "Claude" },
    { value: "gemini", label: "Gemini Pro" },
  ];

  const colors = {
    background: isDark ? "#121212" : "#ffffff",
    border: isDark ? "#333333" : "#e0e0e0",
    borderFocus: isDark ? "#90caf9" : "#1976d2",
    text: isDark ? "#ffffff" : "#212121",
    textSecondary: isDark ? "#b0b0b0" : "#757575",
    addon: isDark ? "#1e1e1e" : "#f5f5f5",
    hover: isDark ? "#2a2a2a" : "#f0f0f0",
  };

  // Rotate placeholders
  useEffect(() => {
    if (!isFocused && !value) {
      const currentSet = placeholderSets[variant] || placeholderSets.endIcon;
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % currentSet.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [variant, isFocused, value]);

  const getCurrentPlaceholder = () => {
    const currentSet = placeholderSets[variant] || placeholderSets.endIcon;
    return currentSet[placeholderIndex];
  };

  const renderVariant = () => {
    switch (variant) {
      case "endIcon":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      m: 0,
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: "12px !important",
                        backgroundColor: colors.addon,
                        borderRadius: "6px",
                        border: `1px solid ${colors.border}`,
                        cursor: "pointer",
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ margin: "0px" }}
                      >
                        <FiMail
                          size={20}
                          style={{ color: colors.textSecondary }}
                        />
                      </motion.div>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: colors.background,
                  pr: 0,
                  "& fieldset": {
                    borderColor: colors.border,
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: colors.borderFocus,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.borderFocus,
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: colors.text,
                  fontSize: "14px",
                },
              }}
            />

            {/* Animated Placeholder */}
            {!isFocused && !value && (
              <Box
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                      }}
                    >
                      {getCurrentPlaceholder()}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            )}
          </Box>
        );

      case "startInline":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      m: 0,
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        px: "10px",
                        backgroundColor: colors.addon,
                        borderRadius: "6px",
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: colors.textSecondary,
                          fontWeight: 500,
                          lineHeight: "1",
                        }}
                      >
                        https://
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: colors.background,
                  pl: 0,
                  "& fieldset": {
                    borderColor: colors.border,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.borderFocus,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.borderFocus,
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: colors.text,
                  fontSize: "14px",
                },
              }}
            />

            {!isFocused && !value && (
              <Box
                sx={{
                  position: "absolute",
                  left: 100,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={placeholderIndex}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                      }}
                    >
                      {getCurrentPlaceholder()}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            )}
          </Box>
        );

      case "endInline":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      m: 0,
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        px: "10px",
                        backgroundColor: colors.addon,
                        borderRadius: "6px",
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: colors.textSecondary,
                          fontWeight: 500,
                          lineHeight: "1",
                        }}
                      >
                        .com
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: colors.background,
                  pr: 0,
                  "& fieldset": {
                    borderColor: colors.border,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.borderFocus,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.borderFocus,
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: colors.text,
                  fontSize: "14px",
                },
              }}
            />

            {!isFocused && !value && (
              <Box
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={placeholderIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                      }}
                    >
                      {getCurrentPlaceholder()}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            )}
          </Box>
        );

      case "currency":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      m: 0,
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        px: "10px",
                        backgroundColor: colors.addon,
                        borderRadius: "6px",
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: colors.textSecondary,
                          lineHeight: "1",
                        }}
                      >
                        €
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      m: 0,
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        px: "10px",
                        backgroundColor: colors.addon,
                        borderRadius: "6px",
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: colors.textSecondary,
                          lineHeight: "1",
                        }}
                      >
                        EUR
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: colors.background,
                  pl: 0,
                  pr: 0,
                  "& fieldset": {
                    borderColor: colors.border,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.borderFocus,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.borderFocus,
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: colors.text,
                  fontSize: "14px",
                },
              }}
            />

            {!isFocused && !value && (
              <Box
                sx={{
                  position: "absolute",
                  left: 60,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={placeholderIndex}
                    initial={{ opacity: 0, rotateX: 45 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: -45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                      }}
                    >
                      {getCurrentPlaceholder()}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            )}
          </Box>
        );

      case "aiPrompt":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            {/* Dropdown - Bottom Left */}
            <Box sx={{ position: "absolute", bottom: 8, left: 8, zIndex: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  IconComponent={FiChevronDown}
                  sx={{
                    height: 32,
                    fontSize: "0.875rem",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiSelect-select": {
                      color: colors.text,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      backgroundColor: colors.addon,
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.5,
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: "8px",
                        mt: 1,
                        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        fontSize: "0.875rem",
                      },
                    },
                  }}
                >
                  {aiModels.map((model) => (
                    <MenuItem
                      key={model.value}
                      value={model.value}
                      sx={{
                        fontSize: "0.875rem",
                        minHeight: "36px",
                        "&.Mui-selected": {
                          backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
                        },
                      }}
                    >
                      {model.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Send & Attachment Icons - Bottom Right */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                display: "flex",
                gap: 1,
                zIndex: 2,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: isDark ? "#000" : "#FFF",
                    backgroundColor: isDark ? "#FFF" : "#000",
                    borderRadius: "8px",
                    p: "8px",
                    "&:hover": {
                      backgroundColor: isDark ? "#FFF" : "#000",
                    },
                  }}
                >
                  <FiPaperclip size={18} />
                </IconButton>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: isDark ? "#000" : "#FFF",
                    backgroundColor: isDark ? "#FFF" : "#000",
                    borderRadius: "8px",
                    p: "8px",
                    "&:hover": {
                      backgroundColor: isDark ? "#FFF" : "#000",
                    },
                  }}
                >
                  <FiArrowUp size={18} />
                </IconButton>
              </motion.div>
            </Box>

            {/* Input Field */}
            <TextField
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder=" "
              InputProps={{}}
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: 100,
                  borderRadius: "12px",
                  backgroundColor: colors.background,
                  alignItems: "flex-start",
                  px: 1,
                  pt: 1,
                  pb: 0,
                  "& fieldset": {
                    borderColor: colors.border,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.borderFocus,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.borderFocus,
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: colors.text,
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  padding: 0,
                  ml: 1,
                  mt: 1,
                },
                "& .MuiInputBase-inputMultiline": {
                  padding: 0,
                  mb: 3.5,
                },
              }}
            />

            {!isFocused && !value && (
              <Box
                sx={{
                  position: "absolute",
                  left: 10,
                  top: 8,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: colors.textSecondary }}
                    >
                      {getCurrentPlaceholder()}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          padding: 2,
        }}
      >
        {renderVariant()}
      </Box>
    </motion.div>
  );
};

export default TextFieldVariants;
