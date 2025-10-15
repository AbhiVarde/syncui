import React, { useState, useMemo } from "react";
import {
  Typography,
  useTheme,
  Box,
  TextField,
  Button,
  InputAdornment,
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

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

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
    []
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
      if (variant !== "with-time") {
        setIsOpen(false);
      }
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
      setSelectedTime({
        ...selectedTime,
        [field]: "",
      });
      return;
    }

    let numValue = value.replace(/\D/g, "");

    if (field === "hour") {
      let num = parseInt(numValue);
      if (num > 12) {
        numValue = "12";
      } else if (num < 1 && numValue.length === 2) {
        numValue = "01";
      }
    } else {
      let num = parseInt(numValue);
      if (num > 59) {
        numValue = "59";
      }
    }

    setSelectedTime({
      ...selectedTime,
      [field]: numValue,
    });
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
      fontSize: "14px !important",
      fontWeight: isCurrentDay ? "500 !important" : "400 !important",
      borderRadius: "8px",
      cursor: shouldShowDate ? "pointer" : "default",
      color: `${
        !shouldShowDate
          ? isDark
            ? "#333"
            : "#ccc"
          : isSelected || isStart || isEnd
            ? isDark
              ? "#000"
              : "#fff"
            : isDark
              ? "#fff"
              : "#000"
      } !important`,
      backgroundColor: `${
        isSelected || isStart || isEnd
          ? isDark
            ? "#fff"
            : "#000"
          : inRange
            ? isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.06)"
            : "transparent"
      } !important`,
      border: `${
        isCurrentDay && !isSelected && !isStart && !isEnd
          ? `1px solid ${isDark ? "#666" : "#999"}`
          : "1px solid transparent"
      } !important`,
      transition: "all 0.15s ease !important",
    };
  };

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const renderCalendar = () => (
    <Box
      sx={{
        position: "absolute !important",
        top: "100% !important",
        left: "0 !important",
        right: "0 !important",
        mt: "6px !important",
        bgcolor: `${isDark ? "#1a1a1a" : "#fff"} !important`,
        border: `1px solid ${isDark ? "#333" : "#e0e0e0"} !important`,
        borderRadius: "12px !important",
        p: "12px !important",
        boxShadow: "0 6px 24px rgba(0,0,0,0.1) !important",
        zIndex: "1000 !important",
      }}
    >
      {variant === "presets" && (
        <Box
          sx={{
            display: "flex !important",
            flexWrap: "wrap !important",
            gap: "4px !important",
            mb: "12px !important",
            pb: "12px !important",
            borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"} !important`,
          }}
        >
          {presets.map((preset) => (
            <Button
              key={preset.label}
              onClick={() => handlePresetClick(preset)}
              disableRipple
              disableElevation
              sx={{
                p: "6px !important",
                minWidth: "auto !important",
                minHeight: "auto !important",
                fontSize: "12px !important",
                fontWeight: "400 !important",
                color: `${isDark ? "#fff" : "#000"} !important`,
                bgcolor: `${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} !important`,
                borderRadius: "6px !important",
                textTransform: "none !important",
                transition: "all 0.15s ease !important",
                whiteSpace: "nowrap !important",
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
          justifyContent: "space-between !important",
          alignItems: "center !important",
          mb: "12px !important",
        }}
      >
        <IconButton
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
          disableRipple
          sx={{
            p: "4px !important",
            borderRadius: "6px !important",
            color: `${isDark ? "#fff" : "#000"} !important`,
            bgcolor: "transparent !important",
            transition: "background-color 0.15s ease !important",
            "&:hover": {
              bgcolor: `${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} !important`,
            },
          }}
        >
          <LuChevronLeft size={16} />
        </IconButton>
        <Typography
          sx={{
            fontSize: "14px !important",
            fontWeight: "500 !important",
            color: `${isDark ? "#fff" : "#000"} !important`,
          }}
        >
          {monthYear}
        </Typography>
        <IconButton
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
          disableRipple
          sx={{
            p: "4px !important",
            borderRadius: "6px !important",
            color: `${isDark ? "#fff" : "#000"} !important`,
            bgcolor: "transparent !important",
            transition: "background-color 0.15s ease !important",
            "&:hover": {
              bgcolor: `${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} !important`,
            },
          }}
        >
          <LuChevronRight size={16} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid !important",
          gridTemplateColumns: "repeat(7, 1fr) !important",
          gap: "2px !important",
          mb: "6px !important",
        }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <Typography
            key={day}
            sx={{
              fontSize: "14px !important",
              fontWeight: "500 !important",
              color: `${isDark ? "#666" : "#999"} !important`,
              textAlign: "center !important",
              py: "6px !important",
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid !important",
          gridTemplateColumns: "repeat(7, 1fr) !important",
          gap: "4px !important",
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
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: "center !important",
            gap: "6px !important",
            mt: "12px !important",
            p: "10px !important",
            bgcolor: `${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"} !important`,
            borderRadius: "10px !important",
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
              width: "42px !important",
              "& .MuiOutlinedInput-root": {
                height: "32px !important",
                bgcolor: `${isDark ? "rgba(255,255,255,0.03)" : "#fff"} !important`,
                borderRadius: "6px !important",
                "& fieldset": {
                  borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                },
                "&:hover fieldset": {
                  borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                  borderWidth: "1px !important",
                },
              },
              "& .MuiOutlinedInput-input": {
                p: "0 6px !important",
                textAlign: "center !important",
                color: `${isDark ? "#fff" : "#000"} !important`,
                fontSize: "14px !important",
                fontWeight: "400 !important",
              },
            }}
          />
          <Typography
            sx={{
              color: `${isDark ? "#666" : "#999"} !important`,
              fontSize: "12px !important",
            }}
          >
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
              width: "42px !important",
              "& .MuiOutlinedInput-root": {
                height: "32px !important",
                bgcolor: `${isDark ? "rgba(255,255,255,0.03)" : "#fff"} !important`,
                borderRadius: "6px !important",
                "& fieldset": {
                  borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                },
                "&:hover fieldset": {
                  borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                  borderWidth: "1px !important",
                },
              },
              "& .MuiOutlinedInput-input": {
                p: "0 6px !important",
                textAlign: "center !important",
                color: `${isDark ? "#fff" : "#000"} !important`,
                fontSize: "14px !important",
                fontWeight: "400 !important",
              },
            }}
          />
          <Box sx={{ display: "flex !important", gap: "3px !important" }}>
            <Button
              onClick={() => setSelectedTime({ ...selectedTime, period: "AM" })}
              disableRipple
              disableElevation
              sx={{
                p: "6px 10px !important",
                minWidth: "auto !important",
                minHeight: "auto !important",
                fontSize: "14px !important",
                fontWeight: "500 !important",
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
                transition: "all 0.15s ease !important",
                "&:hover": {
                  bgcolor: `${
                    selectedTime.period === "AM"
                      ? isDark
                        ? "#fff"
                        : "#000"
                      : "transparent"
                  } !important`,
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
                p: "6px 10px !important",
                minWidth: "auto !important",
                minHeight: "auto !important",
                fontSize: "14px !important",
                fontWeight: "500 !important",
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
                transition: "all 0.15s ease !important",
                "&:hover": {
                  bgcolor: `${
                    selectedTime.period === "PM"
                      ? isDark
                        ? "#fff"
                        : "#000"
                      : "transparent"
                  } !important`,
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
        }}
      >
        {getDescription()}
      </Typography>
      <Box sx={{ position: "relative !important" }}>
        <TextField
          fullWidth
          placeholder={getPlaceholder()}
          value={getInputValue()}
          onClick={() => setIsOpen(!isOpen)}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ ml: "0 !important", mr: "0 !important" }}
              >
                <LuCalendar size={16} color={isDark ? "#666" : "#999"} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "44px !important",
              bgcolor: `${isDark ? "rgba(255,255,255,0.03)" : "#fff"} !important`,
              borderRadius: "10px !important",
              cursor: "pointer !important",
              transition: "all 0.15s ease !important",
              "& fieldset": {
                borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
              },
              "&:hover fieldset": {
                borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
              },
              "&.Mui-focused fieldset": {
                borderColor: `${isDark ? "#333" : "#e0e0e0"} !important`,
                borderWidth: "1px !important",
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
        {isOpen && renderCalendar()}
      </Box>
    </Box>
  );
};

export default DatePickerVariants;
