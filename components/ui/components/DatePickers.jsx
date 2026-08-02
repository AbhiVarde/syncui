import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Typography,
  useTheme,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuClock,
} from "react-icons/lu";

const DatePickerVariants = ({ variant = "single" }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    hour: "12",
    minute: "00",
    period: "PM",
  });
  const [calendarPosition, setCalendarPosition] = useState("bottom");

  const containerRef = useRef(null);
  const calendarRef = useRef(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const calculatePosition = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const calendarHeight = 400;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    setCalendarPosition(
      spaceBelow < calendarHeight && spaceAbove > calendarHeight
        ? "top"
        : "bottom",
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      calculatePosition();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) calculatePosition();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const presets = useMemo(
    () => [
      {
        label: "Today",
        getValue: () => {
          const d = new Date();
          d.setHours(0, 0, 0, 0);
          return { start: d, end: new Date(d) };
        },
      },
      {
        label: "Yesterday",
        getValue: () => {
          const d = new Date();
          d.setDate(d.getDate() - 1);
          d.setHours(0, 0, 0, 0);
          const end = new Date(d);
          end.setHours(23, 59, 59, 999);
          return { start: d, end };
        },
      },
      {
        label: "This Week",
        getValue: () => {
          const date = new Date();
          const day = date.getDay();
          const start = new Date(date);
          start.setDate(date.getDate() - day);
          start.setHours(0, 0, 0, 0);
          const end = new Date();
          end.setHours(23, 59, 59, 999);
          return { start, end };
        },
      },
      {
        label: "Last 7 Days",
        getValue: () => {
          const end = new Date();
          end.setHours(23, 59, 59, 999);
          const start = new Date();
          start.setDate(end.getDate() - 6);
          start.setHours(0, 0, 0, 0);
          return { start, end };
        },
      },
      {
        label: "Last 30 Days",
        getValue: () => {
          const end = new Date();
          end.setHours(23, 59, 59, 999);
          const start = new Date();
          start.setDate(end.getDate() - 29);
          start.setHours(0, 0, 0, 0);
          return { start, end };
        },
      },
      {
        label: "This Month",
        getValue: () => {
          const date = new Date();
          const start = new Date(date.getFullYear(), date.getMonth(), 1);
          start.setHours(0, 0, 0, 0);
          const end = new Date();
          end.setHours(23, 59, 59, 999);
          return { start, end };
        },
      },
    ],
    [],
  );

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const result = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      result.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      result.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    const remainingDays = 42 - result.length;
    for (let i = 1; i <= remainingDays; i++) {
      result.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return result;
  }, [currentMonth]);

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() === d2.getTime();
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    return checkDate >= start && checkDate <= end;
  };

  const isToday = (date) => isSameDay(date, new Date());

  const handleDateClick = (date) => {
    if (variant === "range" || variant === "presets") {
      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
      } else {
        if (date < startDate) {
          setEndDate(startDate);
          setStartDate(date);
        } else {
          setEndDate(date);
        }
      }
    } else {
      setSelectedDate(date);
      if (variant !== "with-time") setIsOpen(false);
    }
  };

  const handlePresetClick = (preset) => {
    const value = preset.getValue();
    if (value.start && value.end) {
      setStartDate(value.start);
      setEndDate(value.end);
    } else {
      setSelectedDate(value);
      setIsOpen(false);
    }
  };

  const handleTimeChange = (field, value) => {
    if (value === "") {
      setSelectedTime({ ...selectedTime, [field]: "" });
      return;
    }

    let numValue = value.replace(/\D/g, "");

    if (field === "hour") {
      let num = parseInt(numValue);
      if (num > 12) numValue = "12";
      else if (num < 1 && numValue.length === 2) numValue = "01";
    } else {
      let num = parseInt(numValue);
      if (num > 59) numValue = "59";
    }

    setSelectedTime({ ...selectedTime, [field]: numValue });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateRange = () => {
    if (!startDate) return "";
    if (!endDate) return formatDate(startDate);
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const formatDateTime = () => {
    if (!selectedDate) return "";
    return `${formatDate(selectedDate)} ${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`;
  };

  const getInputValue = () => {
    switch (variant) {
      case "range":
      case "presets":
        return formatDateRange();
      case "with-time":
        return formatDateTime();
      default:
        return formatDate(selectedDate);
    }
  };

  const getPlaceholder = () => {
    switch (variant) {
      case "range":
        return "Select date range...";
      case "presets":
        return "Select or choose preset...";
      case "with-time":
        return "Select date and time...";
      default:
        return "Select date...";
    }
  };

  const getDescription = () => {
    switch (variant) {
      case "single":
        return "Standard calendar date picker";
      case "range":
        return "Select start and end dates";
      case "presets":
        return "Quick select with preset options";
      case "with-time":
        return "Combined date and time selection";
      default:
        return "Interactive date picker";
    }
  };

  const getDayStyle = (day) => {
    const isSelected = isSameDay(day.date, selectedDate);
    const isStart = isSameDay(day.date, startDate);
    const isEnd = isSameDay(day.date, endDate);
    const inRange = isInRange(day.date);
    const isCurrentDay = isToday(day.date);
    const shouldShowDate = day.isCurrentMonth || inRange || isStart || isEnd;

    return {
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: isCurrentDay ? 500 : 400,
      borderRadius: "8px",
      cursor: shouldShowDate ? "pointer" : "default",
      color: !shouldShowDate
        ? isDark
          ? "#333"
          : "#ccc"
        : isSelected || isStart || isEnd
          ? isDark
            ? "#000"
            : "#fff"
          : isDark
            ? "#fff"
            : "#000",
      backgroundColor:
        isSelected || isStart || isEnd
          ? isDark
            ? "#fff"
            : "#000"
          : inRange
            ? isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.06)"
            : "transparent",
      border:
        isCurrentDay && !isSelected && !isStart && !isEnd
          ? `1px solid ${isDark ? "#666" : "#999"}`
          : "1px solid transparent",
      transition: "background-color 0.15s ease, transform 0.15s ease",
    };
  };

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const renderCalendar = () => (
    <Box
      ref={calendarRef}
      sx={{
        position: "absolute",
        ...(calendarPosition === "top"
          ? { bottom: "calc(100% + 6px)" }
          : { top: "calc(100% + 6px)" }),
        left: 0,
        right: 0,
        bgcolor: isDark ? "#1a1a1a" : "#fff",
        border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
        borderRadius: "12px",
        p: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        zIndex: 1000,
      }}
    >
      {variant === "presets" && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            mb: "12px",
            pb: "12px",
            borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
          }}
        >
          {presets.map((preset) => (
            <Button
              key={preset.label}
              onClick={() => handlePresetClick(preset)}
              disableRipple
              disableElevation
              sx={{
                p: "6px 10px",
                minWidth: "auto",
                minHeight: "auto",
                fontSize: 12,
                fontWeight: 400,
                color: isDark ? "#fff" : "#000",
                bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                borderRadius: "6px",
                textTransform: "none",
                transition: "background-color 0.15s ease",
                whiteSpace: "nowrap",
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
          justifyContent: "space-between",
          alignItems: "center",
          mb: "12px",
        }}
      >
        <IconButton
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
            )
          }
          disableRipple
          sx={{
            p: "6px",
            borderRadius: "6px",
            color: isDark ? "#fff" : "#000",
            bgcolor: "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": {
              bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            },
          }}
        >
          <LuChevronLeft size={16} />
        </IconButton>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: isDark ? "#fff" : "#000",
          }}
        >
          {monthYear}
        </Typography>

        <IconButton
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
            )
          }
          disableRipple
          sx={{
            p: "6px",
            borderRadius: "6px",
            color: isDark ? "#fff" : "#000",
            bgcolor: "transparent",
            transition: "background-color 0.15s ease",
            "&:hover": {
              bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            },
          }}
        >
          <LuChevronRight size={16} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
          mb: "6px",
        }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <Typography
            key={day}
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: isDark ? "#666" : "#999",
              textAlign: "center",
              py: "6px",
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}
      >
        {days.map((day, index) => (
          <Box
            key={`${day.date.getTime()}-${index}`}
            sx={getDayStyle(day)}
            onClick={() => handleDateClick(day.date)}
            onMouseEnter={(e) => {
              if (
                day.isCurrentMonth &&
                !isSameDay(day.date, selectedDate) &&
                !isSameDay(day.date, startDate) &&
                !isSameDay(day.date, endDate)
              ) {
                e.currentTarget.style.backgroundColor = isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (
                day.isCurrentMonth &&
                !isSameDay(day.date, selectedDate) &&
                !isSameDay(day.date, startDate) &&
                !isSameDay(day.date, endDate) &&
                !isInRange(day.date)
              ) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {day.day}
          </Box>
        ))}
      </Box>

      {variant === "with-time" && selectedDate && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            mt: "12px",
            p: "10px",
            bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            borderRadius: "10px",
          }}
        >
          <LuClock size={14} color={isDark ? "#666" : "#999"} />
          <TextField
            value={selectedTime.hour}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            onBlur={(e) => {
              let value = e.target.value;
              if (value === "" || parseInt(value) < 1 || parseInt(value) > 12) {
                handleTimeChange("hour", "12");
              } else if (value.length === 1) {
                setSelectedTime({
                  ...selectedTime,
                  hour: value.padStart(2, "0"),
                });
              }
            }}
            inputProps={{ maxLength: 2 }}
            sx={{
              width: 42,
              "& .MuiOutlinedInput-root": {
                height: 32,
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                borderRadius: "6px",
                transition: "border-color 0.15s ease",
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
              },
              "& .MuiOutlinedInput-input": {
                p: "0 6px",
                textAlign: "center",
                color: isDark ? "#fff" : "#000",
                fontSize: 14,
                fontWeight: 400,
              },
            }}
          />
          <Typography sx={{ color: isDark ? "#666" : "#999", fontSize: 12 }}>
            :
          </Typography>
          <TextField
            value={selectedTime.minute}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            onBlur={(e) => {
              let value = e.target.value;
              if (value === "" || parseInt(value) > 59) {
                handleTimeChange("minute", "00");
              } else if (value.length === 1) {
                setSelectedTime({
                  ...selectedTime,
                  minute: value.padStart(2, "0"),
                });
              }
            }}
            inputProps={{ maxLength: 2 }}
            sx={{
              width: 42,
              "& .MuiOutlinedInput-root": {
                height: 32,
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                borderRadius: "6px",
                transition: "border-color 0.15s ease",
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
              },
              "& .MuiOutlinedInput-input": {
                p: "0 6px",
                textAlign: "center",
                color: isDark ? "#fff" : "#000",
                fontSize: 14,
                fontWeight: 400,
              },
            }}
          />
          <Box sx={{ display: "flex", gap: "3px" }}>
            <Button
              onClick={() => setSelectedTime({ ...selectedTime, period: "AM" })}
              disableRipple
              disableElevation
              sx={{
                p: "6px 10px",
                minWidth: "auto",
                minHeight: "auto",
                fontSize: 12,
                fontWeight: 500,
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
              onClick={() => setSelectedTime({ ...selectedTime, period: "PM" })}
              disableRipple
              disableElevation
              sx={{
                p: "6px 10px",
                minWidth: "auto",
                minHeight: "auto",
                fontSize: 12,
                fontWeight: 500,
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
        </Box>
      )}
    </Box>
  );

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
          onClick={() => {
            calculatePosition();
            setIsOpen(!isOpen);
          }}
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
          {/* Custom calendar icon */}
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
            <LuCalendar size={16} color={isDark ? "#666" : "#999"} />
          </Box>

          {/* Value / Placeholder */}
          <Box
            sx={{
              flex: 1,
              height: 44,
              display: "flex",
              alignItems: "center",
              color: isDark ? "#fff" : "#000",
              fontSize: 14,
              fontWeight: 400,
              pr: "12px",
              userSelect: "none",
            }}
          >
            {getInputValue() || (
              <span style={{ color: isDark ? "#666" : "#999" }}>
                {getPlaceholder()}
              </span>
            )}
          </Box>
        </Box>

        {isOpen && renderCalendar()}
      </Box>
    </Box>
  );
};

export default DatePickerVariants;
