import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { FiMail, FiChevronDown, FiPaperclip, FiArrowUp } from "react-icons/fi";

const TextFieldVariants = ({ variant = "endIcon" }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));

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
    otp: ["Enter verification code", "6-digit code", "Security code"],
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
  };

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

  const commonTransition = { duration: 0.18, easing: "ease-out" };
  const fadeUpVariant = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: commonTransition },
    exit: { opacity: 0, y: -8, transition: commonTransition },
  };
  const fadeScaleVariant = {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1, transition: commonTransition },
    exit: { opacity: 0, scale: 1.02, transition: commonTransition },
  };

  const subtleButtonTap = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.96 },
  };

  const Addon = ({ children, onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        height: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: "12px",
        backgroundColor: colors.addon,
        borderRadius: "6px",
        border: "transparent",
        flexShrink: 0,
        cursor: onClick ? "pointer" : "default",
        mx: "0px !important",
      }}
    >
      {children}
    </Box>
  );

  const renderVariant = () => {
    switch (variant) {
      case "endIcon":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 42,
                borderRadius: "10px",
                border: `1px solid ${isFocused ? colors.borderFocus : colors.border}`,
                backgroundColor: colors.background,
                overflow: "hidden",
                transition: "border-color 0.15s ease",
                "&:hover": {
                  borderColor: colors.borderFocus,
                },
              }}
            >
              <TextField
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  flex: 1,
                  "& .MuiInputBase-root": {
                    height: 42,
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontSize: "14px",
                    height: 42,
                    px: 2,
                    py: 0,
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline.Mui-focused:after": {
                    borderBottom: "none !important",
                  },
                }}
              />
              <Box sx={{ px: "0px !important" }}>
                <Addon>
                  <FiMail size={20} style={{ color: colors.textSecondary }} />
                </Addon>
              </Box>
            </Box>

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
                    initial={fadeUpVariant.initial}
                    animate={fadeUpVariant.animate}
                    exit={fadeUpVariant.exit}
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

      case "startInline":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 42,
                borderRadius: "10px",
                border: `1px solid ${isFocused ? colors.borderFocus : colors.border}`,
                backgroundColor: colors.background,
                overflow: "hidden",
                transition: "border-color 0.15s ease",
                "&:hover": { borderColor: colors.borderFocus },
              }}
            >
              <Box sx={{ px: "0px !important" }}>
                <Addon>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: colors.textSecondary,
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    https://
                  </Typography>
                </Addon>
              </Box>
              <TextField
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  flex: 1,
                  "& .MuiInputBase-root": {
                    height: 42,
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontSize: "14px",
                    height: 42,
                    px: 1.5,
                    py: 0,
                  },
                  // Completely remove underline
                  "& .MuiInput-underline:before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline.Mui-focused:after": {
                    borderBottom: "none !important",
                  },
                }}
              />
            </Box>

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
                    animate={{ opacity: 1, x: 0, transition: commonTransition }}
                    exit={{ opacity: 0, x: -8, transition: commonTransition }}
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

      case "endInline":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 42,
                borderRadius: "10px",
                border: `1px solid ${isFocused ? colors.borderFocus : colors.border}`,
                backgroundColor: colors.background,
                overflow: "hidden",
                transition: "border-color 0.15s ease",
                "&:hover": { borderColor: colors.borderFocus },
              }}
            >
              <TextField
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  flex: 1,
                  "& .MuiInputBase-root": {
                    height: 42,
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontSize: "14px",
                    height: 42,
                    px: 2,
                    py: 0,
                  },
                  // Completely remove underline
                  "& .MuiInput-underline:before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline.Mui-focused:after": {
                    borderBottom: "none !important",
                  },
                }}
              />
              <Box sx={{ px: "0px !important" }}>
                <Addon>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: colors.textSecondary,
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    .com
                  </Typography>
                </Addon>
              </Box>
            </Box>

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
                    initial={fadeScaleVariant.initial}
                    animate={fadeScaleVariant.animate}
                    exit={fadeScaleVariant.exit}
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

      case "currency":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 42,
                borderRadius: "10px",
                border: `1px solid ${isFocused ? colors.borderFocus : colors.border}`,
                backgroundColor: colors.background,
                overflow: "hidden",
                transition: "border-color 0.15s ease",
                "&:hover": { borderColor: colors.borderFocus },
              }}
            >
              <Box sx={{ px: "0px !important" }}>
                <Addon>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: colors.textSecondary,
                      lineHeight: 1,
                    }}
                  >
                    €
                  </Typography>
                </Addon>
              </Box>
              <TextField
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  flex: 1,
                  "& .MuiInputBase-root": {
                    height: 42,
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontSize: "14px",
                    height: 42,
                    px: 1.5,
                    py: 0,
                  },
                  // Completely remove underline
                  "& .MuiInput-underline:before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInput-underline.Mui-focused:after": {
                    borderBottom: "none !important",
                  },
                }}
              />
              <Box sx={{ px: "0px !important" }}>
                <Addon>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: colors.textSecondary,
                      lineHeight: 1,
                    }}
                  >
                    EUR
                  </Typography>
                </Addon>
              </Box>
            </Box>

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
                    initial={{ opacity: 0, rotateX: 20 }}
                    animate={{
                      opacity: 1,
                      rotateX: 0,
                      transition: { duration: 0.22 },
                    }}
                    exit={{
                      opacity: 0,
                      rotateX: -20,
                      transition: { duration: 0.18 },
                    }}
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

      case "aiPrompt":
        return (
          <Box sx={{ position: "relative", width: "100%" }}>
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
                      fontSize: "14px",
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
                        fontSize: "15px !important",
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
              <motion.div {...subtleButtonTap}>
                <IconButton
                  size="small"
                  sx={{
                    color: isDark ? "#000" : "#FFF",
                    backgroundColor: isDark ? "#FFF" : "#000",
                    borderRadius: "8px",
                    p: "8px",
                    "&:hover": { backgroundColor: isDark ? "#FFF" : "#000" },
                  }}
                >
                  <FiPaperclip size={18} />
                </IconButton>
              </motion.div>
              <motion.div {...subtleButtonTap}>
                <IconButton
                  size="small"
                  sx={{
                    color: isDark ? "#000" : "#FFF",
                    backgroundColor: isDark ? "#FFF" : "#000",
                    borderRadius: "8px",
                    p: "8px",
                    "&:hover": { backgroundColor: isDark ? "#FFF" : "#000" },
                  }}
                >
                  <FiArrowUp size={18} />
                </IconButton>
              </motion.div>
            </Box>

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
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: 100,
                  borderRadius: "12px",
                  backgroundColor: colors.background,
                  alignItems: "flex-start",
                  px: 1,
                  pt: 1,
                  pb: 6,
                  "& fieldset": { borderColor: colors.border },
                  "&:hover fieldset": { borderColor: colors.borderFocus },
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
                  mb: 0,
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
                    initial={fadeUpVariant.initial}
                    animate={fadeUpVariant.animate}
                    exit={fadeUpVariant.exit}
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

      case "otp":
        return (
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 0.8, sm: 1.2 },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {otpValues.map((digit, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.12, delay: index * 0.03 },
                    }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <TextField
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: "15px",
                          fontWeight: 500,
                          padding: "0",
                        },
                        autoComplete: "one-time-code",
                      }}
                      value={digit}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        if (newValue.length <= 1) {
                          const newOtpValues = [...otpValues];
                          newOtpValues[index] = newValue;
                          setOtpValues(newOtpValues);
                          if (newValue && index < 5) {
                            document
                              .querySelector(`input[data-index="${index + 1}"]`)
                              ?.focus();
                          }
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const paste = e.clipboardData
                          .getData("text")
                          .replace(/[^0-9]/g, "");
                        if (paste) {
                          const digits = paste.slice(0, 6).split("");
                          setOtpValues([
                            ...digits,
                            ...Array(6 - digits.length).fill(""),
                          ]);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && index > 0) {
                          document
                            .querySelector(`input[data-index="${index - 1}"]`)
                            ?.focus();
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      sx={{
                        width: { xs: 36, sm: 40 },
                        height: { xs: 36, sm: 40 },
                        "& .MuiOutlinedInput-root": {
                          height: { xs: 36, sm: 40 },
                          borderRadius: "8px",
                          backgroundColor: digit
                            ? colors.addon
                            : colors.background,
                          "& fieldset": {
                            borderColor: colors.border,
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: colors.border,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: colors.borderFocus,
                            borderWidth: "1.5px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: colors.text,
                          height: "100%",
                          boxSizing: "border-box",
                        },
                      }}
                      inputRef={(input) =>
                        input?.setAttribute("data-index", index)
                      }
                    />
                  </motion.div>

                  {index === 2 && (
                    <Box
                      sx={{
                        width: 6,
                        height: 1.5,
                        backgroundColor: colors.textSecondary,
                        borderRadius: 1,
                        opacity: 0.35,
                        mx: 0.2,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>

            {/* Progress dots */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1.8,
                gap: 0.6,
              }}
            >
              {otpValues.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.12 }}
                >
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: digit
                        ? isDark
                          ? "#ffffff"
                          : "#000000"
                        : isDark
                          ? "#333333"
                          : "#e0e0e0",
                      transition: "background-color 0.15s ease",
                    }}
                  />
                </motion.div>
              ))}
            </Box>
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
      transition={{ duration: 0.22 }}
    >
      <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 2 }}>
        {renderVariant()}
      </Box>
    </motion.div>
  );
};

export default TextFieldVariants;
