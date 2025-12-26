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
  InputAdornment,
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
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside, {
        passive: true,
      });
      window.addEventListener("scroll", handleScroll, {
        passive: true,
        capture: true,
      });
      rafRef.current = requestAnimationFrame(calculatePosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(calculatePosition);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
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
    []
  );

  const handleTimeChange = useCallback(
    (field, value) => {
      if (value === "") {
        setSelectedTime((prev) => ({
          ...prev,
          [field]: "",
        }));
        return;
      }

      let numValue = value.replace(/\D/g, "");

      if (field === "hour") {
        const max = variant === "24hour" ? 23 : 12;
        const min = variant === "24hour" ? 0 : 1;
        let num = parseInt(numValue);
        if (num > max) {
          numValue = max.toString();
        } else if (num < min && numValue.length === 2) {
          numValue = min.toString().padStart(2, "0");
        }
      } else {
        let num = parseInt(numValue);
        if (num > 59) {
          numValue = "59";
        }
      }

      setSelectedTime((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    },
    [variant]
  );

  const handleIncrement = useCallback(
    (field) => {
      setSelectedTime((prev) => {
        const current = parseInt(prev[field]) || 0;
        let newValue;

        if (field === "hour") {
          if (variant === "24hour") {
            newValue = current === 23 ? 0 : current + 1;
          } else {
            newValue = current === 12 ? 1 : current + 1;
          }
        } else {
          newValue = current === 59 ? 0 : current + 1;
        }

        return {
          ...prev,
          [field]: newValue.toString().padStart(2, "0"),
        };
      });
    },
    [variant]
  );

  const handleDecrement = useCallback(
    (field) => {
      setSelectedTime((prev) => {
        const current = parseInt(prev[field]) || 0;
        let newValue;

        if (field === "hour") {
          if (variant === "24hour") {
            newValue = current === 0 ? 23 : current - 1;
          } else {
            newValue = current === 1 ? 12 : current - 1;
          }
        } else {
          newValue = current === 0 ? 59 : current - 1;
        }

        return {
          ...prev,
          [field]: newValue.toString().padStart(2, "0"),
        };
      });
    },
    [variant]
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
            period: period,
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
    [variant]
  );

  const formatTime = useCallback(() => {
    const hour = selectedTime.hour || (variant === "24hour" ? "00" : "12");
    const minute = selectedTime.minute || "00";
    const second = selectedTime.second || "00";

    if (variant === "24hour") {
      return `${hour}:${minute}`;
    } else if (variant === "with-seconds") {
      return `${hour}:${minute}:${second} ${selectedTime.period}`;
    } else {
      return `${hour}:${minute} ${selectedTime.period}`;
    }
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
    [variant, handleTimeChange]
  );

  const renderTimeInput = useCallback(
    (field, label) => (
      <Box
        sx={{
          display: "flex !important",
          flexDirection: "column !important",
          alignItems: "center !important",
          gap: "4px !important",
        }}
      >
        <IconButton
          onClick={() => handleIncrement(field)}
          disableRipple
          sx={{
            p: "2px !important",
            borderRadius: "4px !important",
            color: `${isDark ? "#fff" : "#000"} !important`,
            bgcolor: "transparent !important",
            transition: "background-color 0.15s ease !important",
            "&:hover": {
              bgcolor: `${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} !important`,
            },
          }}
        >
          <LuChevronUp size={12} />
        </IconButton>
        <Box
          sx={{
            display: "flex !important",
            flexDirection: "column !important",
            alignItems: "center !important",
            gap: "3px !important",
          }}
        >
          <TextField
            value={selectedTime[field]}
            onChange={(e) => handleTimeChange(field, e.target.value)}
            onBlur={(e) => handleBlur(e, field)}
            inputProps={{ maxLength: 2 }}
            sx={{
              width: "48px !important",
              "& .MuiOutlinedInput-root": {
                height: "40px !important",
                bgcolor: `${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"} !important`,
                borderRadius: "8px !important",
                transition:
                  "border-color 0.15s ease, background-color 0.15s ease !important",
                "& fieldset": {
                  borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                },
                "&:hover fieldset": {
                  borderColor: `${isDark ? "#444" : "#d0d0d0"} !important`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${isDark ? "#555" : "#bbb"} !important`,
                  borderWidth: "1px !important",
                },
                "&.Mui-focused": {
                  bgcolor: `${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"} !important`,
                },
              },
              "& .MuiOutlinedInput-input": {
                p: "0 !important",
                textAlign: "center !important",
                color: `${isDark ? "#fff" : "#000"} !important`,
                fontSize: "16px !important",
                fontWeight: "500 !important",
              },
            }}
          />
          <Typography
            sx={{
              fontSize: "10px !important",
              fontWeight: "500 !important",
              color: `${isDark ? "#666" : "#999"} !important`,
              textTransform: "uppercase !important",
              letterSpacing: "0.5px !important",
            }}
          >
            {label}
          </Typography>
        </Box>
        <IconButton
          onClick={() => handleDecrement(field)}
          disableRipple
          sx={{
            p: "2px !important",
            borderRadius: "4px !important",
            color: `${isDark ? "#fff" : "#000"} !important`,
            bgcolor: "transparent !important",
            transition: "background-color 0.15s ease !important",
            "&:hover": {
              bgcolor: `${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} !important`,
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
    ]
  );

  const renderPicker = useMemo(() => {
    if (!isOpen) return null;

    return (
      <Box
        ref={pickerRef}
        sx={{
          position: "absolute !important",
          ...(pickerPosition === "top"
            ? {
                bottom: "calc(100% + 6px) !important",
              }
            : {
                top: "calc(100% + 6px) !important",
              }),
          left: "0 !important",
          right: "0 !important",
          bgcolor: `${isDark ? "#1a1a1a" : "#fff"} !important`,
          border: `1px solid ${isDark ? "#333" : "#e0e0e0"} !important`,
          borderRadius: "12px !important",
          p: "14px !important",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12) !important",
          zIndex: "1000 !important",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        {variant === "presets" && (
          <Box
            sx={{
              display: "flex !important",
              flexWrap: "wrap !important",
              gap: "6px !important",
              mb: "14px !important",
              pb: "14px !important",
              borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"} !important`,
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
                  p: "6px 12px !important",
                  minWidth: "auto !important",
                  minHeight: "auto !important",
                  fontSize: "12px !important",
                  fontWeight: "400 !important",
                  color: `${isDark ? "#fff" : "#000"} !important`,
                  bgcolor: `${
                    hoveredPreset === index
                      ? isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)"
                      : isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)"
                  } !important`,
                  borderRadius: "6px !important",
                  textTransform: "none !important",
                  transition:
                    "background-color 0.15s ease, transform 0.1s ease !important",
                  whiteSpace: "nowrap !important",
                  transform:
                    hoveredPreset === index ? "scale(1.02)" : "scale(1)",
                  willChange: "transform, background-color",
                  "&:hover": {
                    bgcolor: `${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"} !important`,
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
            display: "flex !important",
            flexDirection: "column !important",
            alignItems: "center !important",
            gap: "12px !important",
          }}
        >
          <Box
            sx={{
              display: "flex !important",
              alignItems: "center !important",
              justifyContent: "center !important",
              gap: "10px !important",
            }}
          >
            {renderTimeInput("hour", "Hour")}

            <Typography
              sx={{
                fontSize: "20px !important",
                fontWeight: "300 !important",
                color: `${isDark ? "#666" : "#999"} !important`,
                mt: "-20px !important",
              }}
            >
              :
            </Typography>

            {renderTimeInput("minute", "Min")}

            {variant === "with-seconds" && (
              <>
                <Typography
                  sx={{
                    fontSize: "20px !important",
                    fontWeight: "300 !important",
                    color: `${isDark ? "#666" : "#999"} !important`,
                    mt: "-20px !important",
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
                  display: "flex !important",
                  flexDirection: "column !important",
                  gap: "4px !important",
                  ml: "2px !important",
                }}
              >
                <Button
                  onClick={() =>
                    setSelectedTime((prev) => ({ ...prev, period: "AM" }))
                  }
                  disableRipple
                  disableElevation
                  sx={{
                    p: "6px 10px !important",
                    minWidth: "44px !important",
                    minHeight: "auto !important",
                    fontSize: "11px !important",
                    fontWeight: "600 !important",
                    color:
                      selectedTime.period === "AM"
                        ? `${isDark ? "#000" : "#fff"} !important`
                        : `${isDark ? "#999" : "#666"} !important`,
                    bgcolor: `${
                      selectedTime.period === "AM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : "transparent"
                    } !important`,
                    border: "none !important",
                    borderRadius: "6px !important",
                    textTransform: "none !important",
                    transition:
                      "background-color 0.15s ease, transform 0.1s ease !important",
                    willChange: "transform, background-color",
                    "&:hover": {
                      bgcolor: `${
                        selectedTime.period === "AM"
                          ? isDark
                            ? "#fff"
                            : "#000"
                          : isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)"
                      } !important`,
                      transform:
                        selectedTime.period === "AM"
                          ? "scale(1)"
                          : "scale(1.05)",
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
                    p: "6px 10px !important",
                    minWidth: "44px !important",
                    minHeight: "auto !important",
                    fontSize: "11px !important",
                    fontWeight: "600 !important",
                    color:
                      selectedTime.period === "PM"
                        ? `${isDark ? "#000" : "#fff"} !important`
                        : `${isDark ? "#999" : "#666"} !important`,
                    bgcolor: `${
                      selectedTime.period === "PM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : "transparent"
                    } !important`,
                    border: "none !important",
                    borderRadius: "6px !important",
                    textTransform: "none !important",
                    transition:
                      "background-color 0.15s ease, transform 0.1s ease !important",
                    willChange: "transform, background-color",
                    "&:hover": {
                      bgcolor: `${
                        selectedTime.period === "PM"
                          ? isDark
                            ? "#fff"
                            : "#000"
                          : isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)"
                      } !important`,
                      transform:
                        selectedTime.period === "PM"
                          ? "scale(1)"
                          : "scale(1.05)",
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
                display: "flex !important",
                gap: "6px !important",
                justifyContent: "center !important",
              }}
            >
              <Button
                onClick={() =>
                  setSelectedTime((prev) => ({ ...prev, period: "AM" }))
                }
                disableRipple
                disableElevation
                sx={{
                  p: "6px 16px !important",
                  minWidth: "60px !important",
                  minHeight: "auto !important",
                  fontSize: "11px !important",
                  fontWeight: "600 !important",
                  color:
                    selectedTime.period === "AM"
                      ? `${isDark ? "#000" : "#fff"} !important`
                      : `${isDark ? "#999" : "#666"} !important`,
                  bgcolor: `${
                    selectedTime.period === "AM"
                      ? isDark
                        ? "#fff"
                        : "#000"
                      : "transparent"
                  } !important`,
                  border: "none !important",
                  borderRadius: "6px !important",
                  textTransform: "none !important",
                  transition:
                    "background-color 0.15s ease, transform 0.1s ease !important",
                  willChange: "transform, background-color",
                  "&:hover": {
                    bgcolor: `${
                      selectedTime.period === "AM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.04)"
                    } !important`,
                    transform:
                      selectedTime.period === "AM" ? "scale(1)" : "scale(1.05)",
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
                  p: "6px 16px !important",
                  minWidth: "60px !important",
                  minHeight: "auto !important",
                  fontSize: "11px !important",
                  fontWeight: "600 !important",
                  color:
                    selectedTime.period === "PM"
                      ? `${isDark ? "#000" : "#fff"} !important`
                      : `${isDark ? "#999" : "#666"} !important`,
                  bgcolor: `${
                    selectedTime.period === "PM"
                      ? isDark
                        ? "#fff"
                        : "#000"
                      : "transparent"
                  } !important`,
                  border: "none !important",
                  borderRadius: "6px !important",
                  textTransform: "none !important",
                  transition:
                    "background-color 0.15s ease, transform 0.1s ease !important",
                  willChange: "transform, background-color",
                  "&:hover": {
                    bgcolor: `${
                      selectedTime.period === "PM"
                        ? isDark
                          ? "#fff"
                          : "#000"
                        : isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.04)"
                    } !important`,
                    transform:
                      selectedTime.period === "PM" ? "scale(1)" : "scale(1.05)",
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
        width: "100% !important",
        maxWidth: "320px !important",
        margin: "0 auto !important",
        position: "relative !important",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: "6px !important",
          textAlign: "center !important",
          fontSize: "13px !important",
          color: `${isDark ? "#999" : "#666"} !important`,
        }}
      >
        {getDescription()}
      </Typography>
      <Box sx={{ position: "relative !important" }}>
        <TextField
          fullWidth
          placeholder={getPlaceholder()}
          value={formatTime()}
          onClick={() => {
            calculatePosition();
            setIsOpen(!isOpen);
          }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ ml: "0 !important", mr: "0 !important" }}
              >
                <LuClock size={16} color={isDark ? "#666" : "#999"} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "44px !important",
              bgcolor: `${isDark ? "rgba(255,255,255,0.03)" : "#fff"} !important`,
              borderRadius: "10px !important",
              cursor: "pointer !important",
              transition:
                "border-color 0.15s ease, background-color 0.15s ease !important",
              "& fieldset": {
                borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
              },
              "&:hover fieldset": {
                borderColor: `${isDark ? "#444" : "#d0d0d0"} !important`,
              },
              "&.Mui-focused fieldset": {
                borderColor: `${isDark ? "#555" : "#bbb"} !important`,
                borderWidth: "1px !important",
              },
              "&:hover": {
                bgcolor: `${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"} !important`,
              },
            },
            "& .MuiOutlinedInput-input": {
              cursor: "pointer !important",
              color: `${isDark ? "#fff" : "#000"} !important`,
              fontSize: "14px !important",
              fontWeight: "400 !important",
              pl: "36px !important",
              pr: "12px !important",
            },
            "& .MuiInputAdornment-root": {
              position: "absolute !important",
              left: "12px !important",
            },
          }}
        />
        {renderPicker}
      </Box>
    </Box>
  );
};

export default TimePickerVariants;
