import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, useTheme } from "@mui/material";
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
    // Allow empty string while typing
    if (value === "") {
      setSelectedTime({
        ...selectedTime,
        [field]: "",
      });
      return;
    }

    let numValue = value.replace(/\D/g, "");

    if (field === "hour") {
      // Allow typing without immediate constraint
      let num = parseInt(numValue);
      if (num > 12) {
        numValue = "12";
      } else if (num < 1 && numValue.length === 2) {
        numValue = "01";
      }
    } else {
      // For minutes
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

    return {
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: isCurrentDay ? "500" : "400",
      borderRadius: "8px",
      cursor: day.isCurrentMonth ? "pointer" : "default",
      color: !day.isCurrentMonth
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
      transition: "all 0.15s ease",
    };
  };

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const containerStyle = {
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    position: "relative",
  };

  const inputStyle = {
    width: "100%",
    height: "44px",
    padding: "0 12px 0 36px",
    border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
    borderRadius: "10px",
    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
    color: isDark ? "#fff" : "#000",
    fontSize: "14px",
    fontWeight: "400",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.15s ease",
  };

  const calendarStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "6px",
    backgroundColor: isDark ? "#1a1a1a" : "#fff",
    border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
    borderRadius: "12px",
    padding: "12px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const renderCalendar = () => (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      style={calendarStyle}
    >
      {variant === "presets" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginBottom: "12px",
            paddingBottom: "12px",
            borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
          }}
        >
          {presets.map((preset) => (
            <button
              key={preset.label}
              style={{
                padding: "6px",
                fontSize: "12px",
                fontWeight: "400",
                color: isDark ? "#fff" : "#000",
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.04)",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onClick={() => handlePresetClick(preset)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.04)";
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDark ? "#fff" : "#000",
            transition: "background-color 0.15s ease",
          }}
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <LuChevronLeft size={16} />
        </button>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: isDark ? "#fff" : "#000",
          }}
        >
          {monthYear}
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDark ? "#fff" : "#000",
            transition: "background-color 0.15s ease",
          }}
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <LuChevronRight size={16} />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
          marginBottom: "6px",
        }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: isDark ? "#666" : "#999",
              textAlign: "center",
              padding: "6px 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}
      >
        {days.map((day, index) => (
          <div
            key={`${day.date.getTime()}-${index}`}
            style={getDayStyle(day)}
            onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
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
          </div>
        ))}
      </div>

      {variant === "with-time" && selectedDate && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "12px",
            padding: "10px",
            backgroundColor: isDark
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.02)",
            borderRadius: "10px",
          }}
        >
          <LuClock size={14} color={isDark ? "#666" : "#999"} />
          <input
            type="text"
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
            maxLength="2"
            style={{
              width: "42px",
              height: "32px",
              padding: "0 6px",
              border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
              borderRadius: "6px",
              backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
              color: isDark ? "#fff" : "#000",
              fontSize: "14px",
              fontWeight: "400",
              textAlign: "center",
              outline: "none",
            }}
          />
          <span style={{ color: isDark ? "#666" : "#999", fontSize: "12px" }}>
            :
          </span>
          <input
            type="text"
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
            maxLength="2"
            style={{
              width: "42px",
              height: "32px",
              padding: "0 6px",
              border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
              borderRadius: "6px",
              backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
              color: isDark ? "#fff" : "#000",
              fontSize: "14px",
              fontWeight: "400",
              textAlign: "center",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: "3px" }}>
            <button
              style={{
                padding: "6px 10px",
                fontSize: "14px",
                fontWeight: "500",
                color:
                  selectedTime.period === "AM"
                    ? isDark
                      ? "#000"
                      : "#fff"
                    : isDark
                      ? "#999"
                      : "#666",
                backgroundColor:
                  selectedTime.period === "AM"
                    ? isDark
                      ? "#fff"
                      : "#000"
                    : "transparent",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onClick={() => setSelectedTime({ ...selectedTime, period: "AM" })}
            >
              AM
            </button>
            <button
              style={{
                padding: "6px 10px",
                fontSize: "14px",
                fontWeight: "500",
                color:
                  selectedTime.period === "PM"
                    ? isDark
                      ? "#000"
                      : "#fff"
                    : isDark
                      ? "#999"
                      : "#666",
                backgroundColor:
                  selectedTime.period === "PM"
                    ? isDark
                      ? "#fff"
                      : "#000"
                    : "transparent",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onClick={() => setSelectedTime({ ...selectedTime, period: "PM" })}
            >
              PM
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div style={containerStyle}>
      <Typography
        variant="body2"
        sx={{ mb: 0.75, textAlign: "center", fontSize: "13px" }}
      >
        {getDescription()}
      </Typography>
      <div style={{ position: "relative" }}>
        <LuCalendar
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "16px",
            color: isDark ? "#666" : "#999",
            pointerEvents: "none",
          }}
        />
        <input
          style={inputStyle}
          placeholder={getPlaceholder()}
          value={getInputValue()}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
        />
        <AnimatePresence>{isOpen && renderCalendar()}</AnimatePresence>
      </div>
    </div>
  );
};

export default DatePickerVariants;
