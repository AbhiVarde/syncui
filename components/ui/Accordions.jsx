import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "motion/react";
import { RxChevronDown, RxChevronRight, RxPlus, RxMinus } from "react-icons/rx";

const AccordionVariants = ({ variant = "modern" }) => {
  const theme = useTheme();
  const [expandedPanels, setExpandedPanels] = useState({});

  const handleChange = (panel) => (event, isExpanded) =>
    setExpandedPanels((prev) => ({ ...prev, [panel]: isExpanded }));

  const accordionData = [
    {
      id: "panel1",
      title: "Getting Started",
      content: "Quick introduction to our platform with essential setup steps.",
    },
    {
      id: "panel2",
      title: "Key Features",
      content: "Explore powerful tools designed to enhance your workflow.",
    },
    {
      id: "panel3",
      title: "Best Practices",
      content: "Learn proven strategies for optimal performance and results.",
    },
  ];

  const baseContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const baseInnerStyle = {
    width: "100%",
    maxWidth: 700,
  };

  const renderAccordion = () => {
    switch (variant) {
      case "brutalist":
        return (
          <Box sx={baseContainerStyle}>
            <Box sx={baseInnerStyle}>
              {accordionData.map((item) => (
                <Accordion
                  key={item.id}
                  expanded={expandedPanels[item.id] || false}
                  onChange={handleChange(item.id)}
                  disableGutters
                  elevation={0}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#111" : "#FFF",
                    border: "2px solid",
                    borderColor:
                      theme.palette.mode === "dark" ? "#FFF" : "#111",
                    boxShadow: `3px 3px 0 ${
                      theme.palette.mode === "dark" ? "#FFF" : "#111"
                    }`,
                    borderRadius: 0,
                    mb: 2,
                    "&::before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <motion.div
                        animate={{ rotate: expandedPanels[item.id] ? 180 : 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <RxChevronDown
                          size={20}
                          color={
                            theme.palette.mode === "dark" ? "#FFF" : "#111"
                          }
                        />
                      </motion.div>
                    }
                    sx={{
                      color: theme.palette.mode === "dark" ? "#FFF" : "#111",
                    }}
                  >
                    <Typography variant="h6">{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      borderTop: "1px solid",
                      borderColor:
                        theme.palette.mode === "dark" ? "#FFF" : "#111",
                    }}
                  >
                    <Typography variant="body2">{item.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        );

      case "dashed":
        return (
          <Box sx={baseContainerStyle}>
            <Box sx={baseInnerStyle}>
              {accordionData.map((item) => (
                <Accordion
                  key={item.id}
                  expanded={expandedPanels[item.id] || false}
                  onChange={handleChange(item.id)}
                  disableGutters
                  elevation={0}
                  sx={{
                    border: "2px dashed",
                    borderColor:
                      theme.palette.mode === "dark" ? "#FFF" : "#111",
                    borderRadius: 1,
                    mb: 2,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#111" : "#FFF",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <motion.div
                        animate={{ rotate: expandedPanels[item.id] ? 90 : 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <RxChevronRight
                          size={20}
                          color={
                            theme.palette.mode === "dark" ? "#FFF" : "#111"
                          }
                        />
                      </motion.div>
                    }
                  >
                    <Typography variant="h6">{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      borderTop: "1px dashed",
                      borderColor:
                        theme.palette.mode === "dark" ? "#FFF" : "#111",
                    }}
                  >
                    <Typography variant="body2">{item.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        );

      case "minimal":
        return (
          <Box sx={baseContainerStyle}>
            <Box sx={baseInnerStyle}>
              {accordionData.map((item) => (
                <Accordion
                  key={item.id}
                  expanded={expandedPanels[item.id] || false}
                  onChange={handleChange(item.id)}
                  disableGutters
                  elevation={0}
                  sx={{
                    borderBottom: "1px solid",
                    borderColor:
                      theme.palette.mode === "dark" ? "#FFF" : "#111",
                    backgroundColor: "transparent",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <motion.div
                        animate={{ rotate: expandedPanels[item.id] ? 90 : 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <RxChevronRight
                          size={20}
                          color={
                            theme.palette.mode === "dark" ? "#FFF" : "#111"
                          }
                        />
                      </motion.div>
                    }
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(17,17,17,0.05)",
                      },
                    }}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{item.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        );

      case "modern":
      default:
        return (
          <Box sx={baseContainerStyle}>
            <Box sx={baseInnerStyle}>
              {accordionData.map((item) => (
                <Paper
                  key={item.id}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor:
                      theme.palette.mode === "dark" ? "#FFF" : "#111",
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#111" : "#FFF",
                  }}
                >
                  <Accordion
                    expanded={expandedPanels[item.id] || false}
                    onChange={handleChange(item.id)}
                    disableGutters
                    elevation={0}
                    sx={{
                      backgroundColor: "transparent",
                      "&::before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        expandedPanels[item.id] ? (
                          <RxMinus
                            size={20}
                            color={
                              theme.palette.mode === "dark" ? "#FFF" : "#111"
                            }
                          />
                        ) : (
                          <RxPlus
                            size={20}
                            color={
                              theme.palette.mode === "dark" ? "#FFF" : "#111"
                            }
                          />
                        )
                      }
                    >
                      <Typography variant="h6">{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: "1px solid",
                        borderColor:
                          theme.palette.mode === "dark" ? "#FFF" : "#111",
                      }}
                    >
                      <Typography variant="body2">{item.content}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              ))}
            </Box>
          </Box>
        );
    }
  };

  return <Box sx={{ width: "100%" }}>{renderAccordion()}</Box>;
};

export default AccordionVariants;
