import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Typography,
  useTheme,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { LuClock, LuChevronUp, LuChevronDown } from "react-icons/lu";

const TimePickerVariants = ({ variant = "12hour" }) => {
  const [selectedTime, setSelectedTime] = useState({
    hour: "06",
    minute: "00",
    second: "00",
    period: "PM",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [pickerPosition, setPickerPosition] = useState("bottom");
  const [hoveredPreset, setHoveredPreset] = useState(null);

  const containerRef = useRef(null);
  const pickerRef = useRef(null);
  const rafRef = useRef(null);
  const isTogglingRef = useRef(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const calculatePosition = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const pickerHeight = 320;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const newPosition =
      spaceBelow < pickerHeight && spaceAbove > pickerHeight ? "top" : "bottom";
    setPickerPosition(newPosition);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isTogglingRef.current) return;

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside, {
          passive: true,
        });
        document.addEventListener("touchstart", handleClickOutside, {
          passive: true,
        });
      }, 100);

      window.addEventListener("scroll", handleScroll, {
        passive: true,
        capture: true,
      });
      rafRef.current = requestAnimationFrame(calculatePosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(calculatePosition);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, calculatePosition]);

  const presets = useMemo(
    () => [
      { label: "Now", hour: "12", minute: "00", period: "PM" },
      { label: "9:00 AM", hour: "09", minute: "00", period: "AM" },
      { label: "12:00 PM", hour: "12", minute: "00", period: "PM" },
      { label: "3:00 PM", hour: "03", minute: "00", period: "PM" },
      { label: "5:00 PM", hour: "05", minute: "00", period: "PM" },
      { label: "6:00 PM", hour: "06", minute: "00", period: "PM" },
    ],
    [],
  );

  const handleTimeChange = useCallback(
    (field, value) => {
      if (value === "") {
        setSelectedTime((prev) => ({ ...prev, [field]: "" }));
        return;
      }

      let numValue = value.replace(/\D/g, "");

      if (field === "hour") {
        const max = variant === "24hour" ? 23 : 12;
        const min = variant === "24hour" ? 0 : 1;
        let num = parseInt(numValue);
        if (num > max) numValue = max.toString();
        else if (num < min && numValue.length === 2)
          numValue = min.toString().padStart(2, "0");
      } else {
        let num = parseInt(numValue);
        if (num > 59) numValue = "59";
      }

      setSelectedTime((prev) => ({ ...prev, [field]: numValue }));
    },
    [variant],
  );

  const handleIncrement = useCallback(
    (field) => {
      setSelectedTime((prev) => {
        const current = parseInt(prev[field]) || 0;
        let newValue;

        if (field === "hour") {
          newValue =
            variant === "24hour"
              ? current === 23
                ? 0
                : current + 1
              : current === 12
                ? 1
                : current + 1;
        } else {
          newValue = current === 59 ? 0 : current + 1;
        }

        return {
          ...prev,
          [field]: newValue.toString().padStart(2, "0"),
        };
      });
    },
    [variant],
  );

  const handleDecrement = useCallback(
    (field) => {
      setSelectedTime((prev) => {
        const current = parseInt(prev[field]) || 0;
        let newValue;

        if (field === "hour") {
          newValue =
            variant === "24hour"
              ? current === 0
                ? 23
                : current - 1
              : current === 1
                ? 12
                : current - 1;
        } else {
          newValue = current === 0 ? 59 : current - 1;
        }

        return {
          ...prev,
          [field]: newValue.toString().padStart(2, "0"),
        };
      });
    },
    [variant],
  );

  const handlePresetClick = useCallback(
    (preset) => {
      const now = new Date();
      if (preset.label === "Now") {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        if (variant === "24hour") {
          setSelectedTime((prev) => ({
            ...prev,
            hour: hours.toString().padStart(2, "0"),
            minute: minutes.toString().padStart(2, "0"),
            second: seconds.toString().padStart(2, "0"),
          }));
        } else {
          const period = hours >= 12 ? "PM" : "AM";
          const hour12 = hours % 12 || 12;
          setSelectedTime((prev) => ({
            ...prev,
            hour: hour12.toString().padStart(2, "0"),
            minute: minutes.toString().padStart(2, "0"),
            second: seconds.toString().padStart(2, "0"),
            period,
          }));
        }
      } else {
        setSelectedTime((prev) => ({
          ...prev,
          hour: preset.hour,
          minute: preset.minute,
          period: preset.period,
        }));
      }
    },
    [variant],
  );

  const formatTime = useCallback(() => {
    const hour = selectedTime.hour || (variant === "24hour" ? "00" : "12");
    const minute = selectedTime.minute || "00";
    const second = selectedTime.second || "00";

    if (variant === "24hour") return `${hour}:${minute}`;
    if (variant === "with-seconds")
      return `${hour}:${minute}:${second} ${selectedTime.period}`;
    return `${hour}:${minute} ${selectedTime.period}`;
  }, [selectedTime, variant]);

  const getPlaceholder = useCallback(() => {
    switch (variant) {
      case "24hour":
        return "Select time (24h)...";
      case "with-seconds":
        return "Select time with seconds...";
      case "presets":
        return "Select or choose preset...";
      default:
        return "Select time...";
    }
  }, [variant]);

  const getDescription = useCallback(() => {
    switch (variant) {
      case "12hour":
        return "Standard 12-hour time picker";
      case "24hour":
        return "24-hour format time selection";
      case "with-seconds":
        return "Time picker with seconds";
      case "presets":
        return "Quick select with preset times";
      default:
        return "Interactive time picker";
    }
  }, [variant]);

  const handleBlur = useCallback(
    (e, field) => {
      let value = e.target.value;
      if (value === "") {
        const defaultValue =
          field === "hour" ? (variant === "24hour" ? "00" : "12") : "00";
        handleTimeChange(field, defaultValue);
      } else if (value.length === 1) {
        setSelectedTime((prev) => ({
          ...prev,
          [field]: value.padStart(2, "0"),
        }));
      }
    },
    [variant, handleTimeChange],
  );

  const handleToggle = useCallback(() => {
    isTogglingRef.current = true;
    calculatePosition();
    setIsOpen(!isOpen);
    setTimeout(() => {
      isTogglingRef.current = false;
    }, 150);
  }, [isOpen, calculatePosition]);

  const renderTimeInput = useCallback(
    (field, label) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <IconButton
          onClick={() => handleIncrement(field)}
          disableRipple
          sx={{
            p: "2px",
            borderRadius: "4px",
            color: isDark ? "#fff" : "#000",
            bgcolor: "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": {
              bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            },
          }}
        >
          <LuChevronUp size={12} />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <TextField
            value={selectedTime[field]}
            onChange={(e) => handleTimeChange(field, e.target.value)}
            onBlur={(e) => handleBlur(e, field)}
            inputProps={{
              maxLength: 2,
              inputMode: "numeric",
              pattern: "[0-9]*",
              autoComplete: "off",
            }}
            sx={{
              width: 48,
              "& .MuiOutlinedInput-root": {
                height: 40,
                bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                borderRadius: "8px",
                transition:
                  "border-color 0.15s ease, background-color 0.15s ease",
                "& fieldset": {
                  borderColor: isDark ? "#333" : "#e0e0e0",
                },
                "&:hover fieldset": {
                  borderColor: isDark ? "#444" : "#d0d0d0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: isDark ? "#555" : "#bbb",
                  borderWidth: "1px",
                },
                "&.Mui-focused": {
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.04)",
                },
              },
              "& .MuiOutlinedInput-input": {
                p: 0,
                textAlign: "center",
                color: isDark ? "#fff" : "#000",
                fontSize: 16,
                fontWeight: 500,
              },
            }}
          />
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 500,
              color: isDark ? "#666" : "#999",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {label}
          </Typography>
        </Box>

        <IconButton
          onClick={() => handleDecrement(field)}
          disableRipple
          sx={{
            p: "2px",
            borderRadius: "4px",
            color: isDark ? "#fff" : "#000",
            bgcolor: "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": {
              bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            },
          }}
        >
          <LuChevronDown size={12} />
        </IconButton>
      </Box>
    ),
    [
      selectedTime,
      isDark,
      handleIncrement,
      handleDecrement,
      handleTimeChange,
      handleBlur,
    ],
  );

  const renderPicker = useMemo(() => {
    if (!isOpen) return null;

    return (
      <Box
        ref={pickerRef}
        sx={{
          position: "absolute",
          ...(pickerPosition === "top"
            ? { bottom: "calc(100% + 6px)" }
            : { top: "calc(100% + 6px)" }),
          left: 0,
          right: 0,
          bgcolor: isDark ? "#1a1a1a" : "#fff",
          border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
          borderRadius: "12px",
          p: "14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          zIndex: 1000,
        }}
      >
        {variant === "presets" && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              mb: "14px",
              pb: "14px",
              borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
            }}
          >
            {presets.map((preset, index) => (
              <Button
                key={index}
                onClick={() => handlePresetClick(preset)}
                onMouseEnter={() => setHoveredPreset(index)}
                onMouseLeave={() => setHoveredPreset(null)}
                disableRipple
                disableElevation
                sx={{
                  p: "6px 12px",
                  minWidth: "auto",
                  minHeight: "auto",
                  fontSize: 12,
                  fontWeight: 400,
                  color: isDark ? "#fff" : "#000",
                  bgcolor:
                    hoveredPreset === index
                      ? isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)"
                      : isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                  borderRadius: "6px",
                  textTransform: "none",
                  transition:
                    "background-color 0.15s ease, transform 0.1s ease",
                  whiteSpace: "nowrap",
                  transform:
                    hoveredPreset === index ? "scale(1.02)" : "scale(1)",
                  "&:hover": {
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)",
                  },
                }}
              >
                {preset.label}
              </Button>
            ))}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {renderTimeInput("hour", "Hour")}

            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 300,
                color: isDark ? "#666" : "#999",
                mt: "-20px",
              }}
            >
              :
            </Typography>

            {renderTimeInput("minute", "Min")}

            {variant === "with-seconds" && (
              <>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 300,
                    color: isDark ? "#666" : "#999",
                    mt: "-20px",
                  }}
                >
                  :
                </Typography>
                {renderTimeInput("second", "Sec")}
              </>
            )}

            {variant !== "24hour" && variant !== "with-seconds" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  ml: "2px",
                }}
              >
                <Button
                  onClick={() =>
                    setSelectedTime((prev) => ({ ...prev, period: "AM" }))
                  }
                  disableRipple
                  disableElevation
                  sx={{
                    p: "6px 10px",
                    minWidth: 44,
                    minHeight: "auto",
                    fontSize: 11,
                    fontWeight: 600,
                    color:
                      selectedTime.period === "AM"
                        ? isDark
                          ? "#000"
                          : "#fff"
                        : isDark
                          ? "#999"
                          : "#666",
                    bgcolor:
                      selectedTime.period === "AM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : "transparent",
                    borderRadius: "6px",
                    textTransform: "none",
                    transition: "background-color 0.15s ease",
                    "&:hover": {
                      bgcolor:
                        selectedTime.period === "AM"
                          ? isDark
                            ? "#fff"
                            : "#000"
                          : isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  AM
                </Button>
                <Button
                  onClick={() =>
                    setSelectedTime((prev) => ({ ...prev, period: "PM" }))
                  }
                  disableRipple
                  disableElevation
                  sx={{
                    p: "6px 10px",
                    minWidth: 44,
                    minHeight: "auto",
                    fontSize: 11,
                    fontWeight: 600,
                    color:
                      selectedTime.period === "PM"
                        ? isDark
                          ? "#000"
                          : "#fff"
                        : isDark
                          ? "#999"
                          : "#666",
                    bgcolor:
                      selectedTime.period === "PM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : "transparent",
                    borderRadius: "6px",
                    textTransform: "none",
                    transition: "background-color 0.15s ease",
                    "&:hover": {
                      bgcolor:
                        selectedTime.period === "PM"
                          ? isDark
                            ? "#fff"
                            : "#000"
                          : isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  PM
                </Button>
              </Box>
            )}
          </Box>

          {variant === "with-seconds" && (
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() =>
                  setSelectedTime((prev) => ({ ...prev, period: "AM" }))
                }
                disableRipple
                disableElevation
                sx={{
                  p: "6px 16px",
                  minWidth: 60,
                  minHeight: "auto",
                  fontSize: 11,
                  fontWeight: 600,
                  color:
                    selectedTime.period === "AM"
                      ? isDark
                        ? "#000"
                        : "#fff"
                      : isDark
                        ? "#999"
                        : "#666",
                  bgcolor:
                    selectedTime.period === "AM"
                      ? isDark
                        ? "#fff"
                        : "#000"
                      : "transparent",
                  borderRadius: "6px",
                  textTransform: "none",
                  transition: "background-color 0.15s ease",
                  "&:hover": {
                    bgcolor:
                      selectedTime.period === "AM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                AM
              </Button>
              <Button
                onClick={() =>
                  setSelectedTime((prev) => ({ ...prev, period: "PM" }))
                }
                disableRipple
                disableElevation
                sx={{
                  p: "6px 16px",
                  minWidth: 60,
                  minHeight: "auto",
                  fontSize: 11,
                  fontWeight: 600,
                  color:
                    selectedTime.period === "PM"
                      ? isDark
                        ? "#000"
                        : "#fff"
                      : isDark
                        ? "#999"
                        : "#666",
                  bgcolor:
                    selectedTime.period === "PM"
                      ? isDark
                        ? "#fff"
                        : "#000"
                      : "transparent",
                  borderRadius: "6px",
                  textTransform: "none",
                  transition: "background-color 0.15s ease",
                  "&:hover": {
                    bgcolor:
                      selectedTime.period === "PM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                PM
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    );
  }, [
    isOpen,
    pickerPosition,
    isDark,
    variant,
    presets,
    hoveredPreset,
    selectedTime,
    handlePresetClick,
    renderTimeInput,
  ]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: "6px",
          textAlign: "center",
          fontSize: 13,
          color: isDark ? "#999" : "#666",
        }}
      >
        {getDescription()}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* Custom clean input (no InputAdornment) */}
        <Box
          onClick={handleToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 44,
            borderRadius: "10px",
            border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
            cursor: "pointer",
            transition: "border-color 0.15s ease, background-color 0.15s ease",
            overflow: "hidden",
            "&:hover": {
              borderColor: isDark ? "#444" : "#d0d0d0",
              backgroundColor: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.02)",
            },
          }}
        >
          {/* Custom clock icon box */}
          <Box
            sx={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: "12px",
              flexShrink: 0,
            }}
          >
            <LuClock size={16} color={isDark ? "#666" : "#999"} />
          </Box>

          {/* Value */}
          <Box
            sx={{
              flex: 1,
              height: 44,
              display: "flex",
              alignItems: "center",
              color: isDark ? "#fff" : "#000",
              fontSize: 16,
              fontWeight: 400,
              pr: "12px",
              userSelect: "none",
            }}
          >
            {formatTime() || (
              <span style={{ color: isDark ? "#666" : "#999" }}>
                {getPlaceholder()}
              </span>
            )}
          </Box>
        </Box>

        {renderPicker}
      </Box>
    </Box>
  );
};

export default TimePickerVariants;
