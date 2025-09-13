import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, useTheme } from "@mui/material";
import { LuX } from "react-icons/lu";

const AutocompleteVariants = ({ variant = "basic" }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Sample data
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

  // Simulate async loading
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

  const containerStyle = {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    position: "relative",
    zIndex: "auto",
  };

  const inputStyle = {
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
  };

  const dropdownStyle = {
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
  };

  const optionStyle = {
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "16px",
    color: isDark ? "#fff" : "#000",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    },
  };

  const chipStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 14px",
    margin: "2px",
    backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
    color: isDark ? "#fff" : "#000",
    borderRadius: "12px",
    fontSize: "14px",
    gap: "6px",
  };

  const avatarStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
    color: isDark ? "#fff" : "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "500",
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
    <div
      style={{
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          border: `2px solid ${isDark ? "#333" : "#e0e0e0"}`,
          borderTop: `2px solid ${isDark ? "#fff" : "#666"}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );

  const renderBasicAutocomplete = () => (
    <div style={{ position: "relative" }}>
      {renderSearchIcon()}
      <input
        style={inputStyle}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => inputValue.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />

      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={dropdownStyle}
          >
            {filteredOptions.map((option, index) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                style={optionStyle}
                onMouseDown={() => handleOptionSelect(option)}
              >
                {option}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderMultiSelectAutocomplete = () => (
    <div>
      <div style={{ position: "relative" }}>
        {renderSearchIcon()}
        <input
          style={inputStyle}
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => inputValue.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />

        <AnimatePresence>
          {isOpen && filteredOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={dropdownStyle}
            >
              {filteredOptions.map((option, index) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  style={optionStyle}
                  onMouseDown={() => handleOptionSelect(option)}
                >
                  {option}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedValues.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          style={{
            marginTop: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          {selectedValues.map((value, index) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              style={chipStyle}
            >
              {value}
              <button
                style={{
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
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );

  const renderAsyncAutocomplete = () => (
    <div style={{ position: "relative" }}>
      {renderSearchIcon()}
      <input
        style={inputStyle}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => inputValue.length > 2 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />
      {isLoading && renderLoadingSpinner()}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={dropdownStyle}
          >
            {isLoading ? (
              <div
                style={{
                  ...optionStyle,
                  textAlign: "center",
                  color: isDark ? "#666" : "#999",
                }}
              >
                Loading...
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  style={optionStyle}
                  onMouseDown={() => handleOptionSelect(option)}
                >
                  {option}
                </motion.div>
              ))
            ) : (
              <div style={{ ...optionStyle, color: isDark ? "#666" : "#999" }}>
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
      <div style={{ position: "relative" }}>
        {renderSearchIcon()}
        <input
          style={inputStyle}
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => inputValue.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />

        <AnimatePresence>
          {isOpen && Object.keys(groupedResults).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ ...dropdownStyle }}
            >
              {Object.entries(groupedResults).map(
                ([groupName, items], groupIndex) => (
                  <div key={groupName}>
                    <div
                      style={{
                        padding: "8px 16px 4px 16px",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: isDark ? "#888" : "#666",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {groupName}
                    </div>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: (groupIndex * items.length + index) * 0.02,
                        }}
                        style={{
                          ...optionStyle,
                          paddingLeft: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                        onMouseDown={() => handleOptionSelect(item)}
                      >
                        <div style={avatarStyle}>{item.avatar}</div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: "500" }}>
                            {item.name}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: isDark ? "#666" : "#999",
                            }}
                          >
                            {item.description || item.email}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderCustomRenderAutocomplete = () => (
    <div style={{ position: "relative" }}>
      {renderSearchIcon()}
      <input
        style={inputStyle}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => inputValue.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      />

      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={dropdownStyle}
          >
            {filteredOptions.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                style={{
                  ...optionStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
                onMouseDown={() => handleOptionSelect(person)}
              >
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      ...avatarStyle,
                      width: "32px",
                      height: "32px",
                      fontSize: "13px",
                    }}
                  >
                    {person.avatar}
                  </div>
                  <div
                    style={{
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
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "2px",
                    }}
                  >
                    {person.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      color: isDark ? "#666" : "#999",
                    }}
                  >
                    <span>{person.role}</span>
                    <div
                      style={{
                        width: "2px",
                        height: "2px",
                        borderRadius: "50%",
                        backgroundColor: person.online ? "#10b981" : "#6b7280",
                      }}
                    />
                    <span>{person.online ? "Online" : "Offline"}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
    <div style={containerStyle}>
      {/* Description */}

      <Typography variant="body1" sx={{ mb: 1, textAlign: "center" }}>
        {getDescription()}
      </Typography>

      {renderAutocomplete()}
    </div>
  );
};

export default AutocompleteVariants;
