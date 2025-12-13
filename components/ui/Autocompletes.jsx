// autocompletes.jsx - Optimized with motion/react
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Typography, useTheme, Box } from "@mui/material";
import { LuX } from "react-icons/lu";

const AutocompleteVariants = ({ variant = "basic" }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sampleData = {
    basic: [
      "Apple",
      "Banana",
      "Cherry",
      "Date",
      "Elderberry",
      "Fig",
      "Grape",
      "Honeydew",
      "Kiwi",
      "Lemon",
      "Mango",
      "Orange",
      "Papaya",
      "Quinoa",
      "Raspberry",
      "Strawberry",
    ],
    multiSelect: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Angular",
      "Node.js",
      "Python",
      "Java",
      "C++",
      "Go",
      "Rust",
      "PHP",
      "Ruby",
      "Swift",
      "Kotlin",
    ],
    grouped: {
      Users: [
        { id: 1, name: "John Smith", email: "john@example.com", avatar: "J" },
        {
          id: 2,
          name: "Sarah Wilson",
          email: "sarah@example.com",
          avatar: "S",
        },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", avatar: "M" },
      ],
      Projects: [
        {
          id: 4,
          name: "Design System",
          description: "UI Components",
          avatar: "D",
        },
        { id: 5, name: "Mobile App", description: "React Native", avatar: "M" },
        { id: 6, name: "Dashboard", description: "Analytics", avatar: "D" },
      ],
      Documents: [
        {
          id: 7,
          name: "API Documentation",
          description: "Technical specs",
          avatar: "A",
        },
        { id: 8, name: "User Guide", description: "How-to guide", avatar: "U" },
      ],
    },
    customRender: [
      {
        id: 1,
        name: "Alice Cooper",
        role: "Designer",
        avatar: "A",
        online: true,
      },
      {
        id: 2,
        name: "Bob Smith",
        role: "Developer",
        avatar: "B",
        online: false,
      },
      {
        id: 3,
        name: "Carol Davis",
        role: "Manager",
        avatar: "C",
        online: true,
      },
      {
        id: 4,
        name: "David Wilson",
        role: "Designer",
        avatar: "D",
        online: false,
      },
      {
        id: 5,
        name: "Emma Brown",
        role: "Developer",
        avatar: "E",
        online: true,
      },
    ],
  };

  const simulateAsyncLoad = async (query) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const filtered = sampleData.basic.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
    setIsLoading(false);
  };

  const handleInputChange = (value) => {
    setInputValue(value);

    if (variant === "async") {
      if (value.length > 2) {
        simulateAsyncLoad(value);
      } else {
        setFilteredOptions([]);
        setIsLoading(false);
      }
    } else {
      filterOptions(value);
    }

    setIsOpen(value.length > 0);
  };

  const filterOptions = (query) => {
    let options = [];

    switch (variant) {
      case "basic":
        options = sampleData.basic.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        break;
      case "multi-select":
        options = sampleData.multiSelect.filter(
          (item) =>
            item.toLowerCase().includes(query.toLowerCase()) &&
            !selectedValues.includes(item)
        );
        break;
      case "grouped":
        options = sampleData.grouped;
        break;
      case "custom-render":
        options = sampleData.customRender.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.role.toLowerCase().includes(query.toLowerCase())
        );
        break;
      default:
        options = [];
    }

    setFilteredOptions(options);
  };

  const handleOptionSelect = (option) => {
    if (variant === "multi-select") {
      if (!selectedValues.includes(option)) {
        setSelectedValues([...selectedValues, option]);
      }
      setInputValue("");
    } else {
      setInputValue(typeof option === "string" ? option : option.name);
      setIsOpen(false);
    }
  };

  const handleChipDelete = (valueToDelete) => {
    setSelectedValues(
      selectedValues.filter((value) => value !== valueToDelete)
    );
  };

  const getDescription = () => {
    switch (variant) {
      case "basic":
        return "Simple search with real-time filtering";
      case "multi-select":
        return "Select multiple items with chip display";
      case "async":
        return "Simulated API search with loading states";
      case "grouped":
        return "Organized results by category";
      case "custom-render":
        return "Rich content with avatars and status";
      default:
        return "Interactive search component";
    }
  };

  const getPlaceholder = () => {
    switch (variant) {
      case "basic":
        return "Search fruits...";
      case "multi-select":
        return "Select technologies...";
      case "async":
        return "Type at least 3 characters...";
      case "grouped":
        return "Search users, projects, documents...";
      case "custom-render":
        return "Search team members...";
      default:
        return "Start typing...";
    }
  };

  const renderSearchIcon = () => (
    <svg
      style={{
        position: "absolute",
        left: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "18px",
        height: "18px",
        color: isDark ? "#666" : "#999",
        pointerEvents: "none",
      }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const renderCloseIcon = () => <LuX />;

  const renderLoadingSpinner = () => (
    <Box
      sx={{
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Box
        sx={{
          width: "16px",
          height: "16px",
          border: `2px solid ${isDark ? "#333" : "#e0e0e0"}`,
          borderTop: `2px solid ${isDark ? "#fff" : "#666"}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />
    </Box>
  );

  const renderBasicAutocomplete = () => (
    <Box sx={{ position: "relative" }}>
      {renderSearchIcon()}
      <Box
        component="input"
        sx={{
          width: "100%",
          height: "44px",
          padding: "0 16px 0 44px",
          border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
          borderRadius: "12px",
          backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
          color: isDark ? "#fff" : "#000",
          fontSize: "16px",
          outline: "none",
          transition: "all 0.2s ease",
          "&:focus": {
            borderColor: isDark ? "#666" : "#000",
          },
        }}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => inputValue.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />

      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "4px",
              maxHeight: "180px",
              overflowY: "auto",
              backgroundColor: isDark ? "#1a1a1a" : "#fff",
              border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              zIndex: 9999,
            }}
          >
            {filteredOptions.map((option, index) => (
              <Box
                key={option}
                component={motion.div}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                sx={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#000",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                  },
                }}
                onMouseDown={() => handleOptionSelect(option)}
              >
                {option}
              </Box>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );

  const renderMultiSelectAutocomplete = () => (
    <Box>
      <Box sx={{ position: "relative" }}>
        {renderSearchIcon()}
        <Box
          component="input"
          sx={{
            width: "100%",
            height: "44px",
            padding: "0 16px 0 44px",
            border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
            borderRadius: "12px",
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
            color: isDark ? "#fff" : "#000",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.2s ease",
            "&:focus": {
              borderColor: isDark ? "#666" : "#000",
            },
          }}
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => inputValue.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />

        <AnimatePresence>
          {isOpen && filteredOptions.length > 0 && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "4px",
                maxHeight: "180px",
                overflowY: "auto",
                backgroundColor: isDark ? "#1a1a1a" : "#fff",
                border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                zIndex: 9999,
              }}
            >
              {filteredOptions.map((option, index) => (
                <Box
                  key={option}
                  component={motion.div}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  sx={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: isDark ? "#fff" : "#000",
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                    },
                  }}
                  onMouseDown={() => handleOptionSelect(option)}
                >
                  {option}
                </Box>
              ))}
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {selectedValues.length > 0 && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          sx={{
            marginTop: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          {selectedValues.map((value, index) => (
            <Box
              key={value}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.05,
                duration: 0.2,
                ease: "easeOut",
              }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 14px",
                margin: "2px",
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
                color: isDark ? "#fff" : "#000",
                borderRadius: "12px",
                fontSize: "14px",
                gap: "6px",
              }}
            >
              {value}
              <Box
                component="button"
                sx={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  color: isDark ? "#ccc" : "#666",
                }}
                onClick={() => handleChipDelete(value)}
              >
                {renderCloseIcon()}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );

  const renderAsyncAutocomplete = () => (
    <Box sx={{ position: "relative" }}>
      {renderSearchIcon()}
      <Box
        component="input"
        sx={{
          width: "100%",
          height: "44px",
          padding: "0 16px 0 44px",
          border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
          borderRadius: "12px",
          backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
          color: isDark ? "#fff" : "#000",
          fontSize: "16px",
          outline: "none",
          transition: "all 0.2s ease",
          "&:focus": {
            borderColor: isDark ? "#666" : "#000",
          },
        }}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => inputValue.length > 2 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />
      {isLoading && renderLoadingSpinner()}

      <AnimatePresence>
        {isOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "4px",
              maxHeight: "180px",
              overflowY: "auto",
              backgroundColor: isDark ? "#1a1a1a" : "#fff",
              border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              zIndex: 9999,
            }}
          >
            {isLoading ? (
              <Typography
                variant="body2"
                sx={{
                  padding: "6px 12px",
                }}
              >
                Loading...
              </Typography>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <Box
                  key={option}
                  component={motion.div}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  sx={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: isDark ? "#fff" : "#000",
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                    },
                  }}
                  onMouseDown={() => handleOptionSelect(option)}
                >
                  {option}
                </Box>
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{
                  padding: "6px 12px",
                }}
              >
                No results found
              </Typography>
            )}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );

  const renderGroupedAutocomplete = () => {
    const groupedResults = {};

    if (inputValue.length > 0) {
      Object.entries(sampleData.grouped).forEach(([groupName, items]) => {
        const filtered = items.filter((item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (filtered.length > 0) {
          groupedResults[groupName] = filtered;
        }
      });
    }

    return (
      <Box sx={{ position: "relative" }}>
        {renderSearchIcon()}
        <Box
          component="input"
          sx={{
            width: "100%",
            height: "44px",
            padding: "0 16px 0 44px",
            border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
            borderRadius: "12px",
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
            color: isDark ? "#fff" : "#000",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.2s ease",
            "&:focus": {
              borderColor: isDark ? "#666" : "#000",
            },
          }}
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => inputValue.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />

        <AnimatePresence>
          {isOpen && Object.keys(groupedResults).length > 0 && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "4px",
                maxHeight: "180px",
                overflowY: "auto",
                backgroundColor: isDark ? "#1a1a1a" : "#fff",
                border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                zIndex: 9999,
              }}
            >
              {Object.entries(groupedResults).map(
                ([groupName, items], groupIndex) => (
                  <Box key={groupName}>
                    <Box
                      sx={{
                        padding: "8px 16px 4px 16px",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: isDark ? "#888" : "#666",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {groupName}
                    </Box>
                    {items.map((item, index) => (
                      <Box
                        key={item.id}
                        component={motion.div}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: (groupIndex * items.length + index) * 0.02,
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        sx={{
                          padding: "6px 12px",
                          paddingLeft: "20px",
                          cursor: "pointer",
                          fontSize: "16px",
                          color: isDark ? "#fff" : "#000",
                          transition: "background-color 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          "&:hover": {
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.04)",
                          },
                        }}
                        onMouseDown={() => handleOptionSelect(item)}
                      >
                        <Box
                          sx={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.15)"
                              : "rgba(0,0,0,0.1)",
                            color: isDark ? "#fff" : "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: "500",
                          }}
                        >
                          {item.avatar}
                        </Box>
                        <Box>
                          <Box sx={{ fontSize: "13px", fontWeight: "500" }}>
                            {item.name}
                          </Box>
                          <Box
                            sx={{
                              fontSize: "11px",
                              color: isDark ? "#666" : "#999",
                            }}
                          >
                            {item.description || item.email}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )
              )}
            </Box>
          )}
        </AnimatePresence>
      </Box>
    );
  };

  const renderCustomRenderAutocomplete = () => (
    <Box sx={{ position: "relative" }}>
      {renderSearchIcon()}
      <Box
        component="input"
        sx={{
          width: "100%",
          height: "44px",
          padding: "0 16px 0 44px",
          border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
          borderRadius: "12px",
          backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
          color: isDark ? "#fff" : "#000",
          fontSize: "16px",
          outline: "none",
          transition: "all 0.2s ease",
          "&:focus": {
            borderColor: isDark ? "#666" : "#000",
          },
        }}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => inputValue.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />

      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "4px",
              maxHeight: "180px",
              overflowY: "auto",
              backgroundColor: isDark ? "#1a1a1a" : "#fff",
              border: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              zIndex: 9999,
            }}
          >
            {filteredOptions.map((person, index) => (
              <Box
                key={person.id}
                component={motion.div}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                sx={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#000",
                  transition: "background-color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                  },
                }}
                onMouseDown={() => handleOptionSelect(person)}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.1)",
                      color: isDark ? "#fff" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {person.avatar}
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: person.online ? "#10b981" : "#6b7280",
                      border: `2px solid ${isDark ? "#1a1a1a" : "#fff"}`,
                    }}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "2px",
                    }}
                  >
                    {person.name}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      color: isDark ? "#666" : "#999",
                    }}
                  >
                    <Box component="span">{person.role}</Box>
                    <Box
                      sx={{
                        width: "2px",
                        height: "2px",
                        borderRadius: "50%",
                        backgroundColor: person.online ? "#10b981" : "#6b7280",
                      }}
                    />
                    <Box component="span">
                      {person.online ? "Online" : "Offline"}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );

  const renderAutocomplete = () => {
    switch (variant) {
      case "basic":
        return renderBasicAutocomplete();
      case "multi-select":
        return renderMultiSelectAutocomplete();
      case "async":
        return renderAsyncAutocomplete();
      case "grouped":
        return renderGroupedAutocomplete();
      case "custom-render":
        return renderCustomRenderAutocomplete();
      default:
        return renderBasicAutocomplete();
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        position: "relative",
        zIndex: "auto",
      }}
    >
      <Typography variant="body1" sx={{ mb: 1, textAlign: "center" }}>
        {getDescription()}
      </Typography>
      {renderAutocomplete()}
    </Box>
  );
};
export default AutocompleteVariants;
