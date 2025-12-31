import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  Divider,
} from "@mui/material";
import { motion } from "motion/react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CreditCardIcon,
  RocketIcon,
} from "@hugeicons/core-free-icons";

const CTAVariants = ({ variant = "centered" }) => {
  const theme = useTheme();

  const renderCTA = () => {
    switch (variant) {
      case "centered":
        return (
          <Box
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#000" : "#FFF",
              color: theme.palette.mode === "dark" ? "#FFF" : "#000",
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              py: { xs: 8, md: 12 },
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    mx: "auto",
                    px: { xs: 2, sm: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 600,
                      maxWidth: 720,
                      lineHeight: 1.2,
                    }}
                  >
                    Ready to transform your business?
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 400,
                      maxWidth: 640,
                      lineHeight: 1.6,
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.65)"
                          : "rgba(0,0,0,0.65)",
                    }}
                  >
                    Join thousands of companies already using our platform to
                    streamline operations and accelerate growth.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 500,
                        textTransform: "none",
                        borderRadius: "999px",
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#FFF" : "#000",
                        color: theme.palette.mode === "dark" ? "#000" : "#FFF",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(0,0,0,0.85)",
                        },
                      }}
                    >
                      Start free trial
                    </Button>

                    <Button
                      variant="text"
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 500,
                        textTransform: "none",
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.75)"
                            : "rgba(0,0,0,0.75)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        transition:
                          "color 0.2s ease, background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.06)",
                          color:
                            theme.palette.mode === "dark" ? "#FFF" : "#000",
                          "& .arrow-icon": {
                            transform: "translateX(4px)",
                          },
                        },
                      }}
                    >
                      Schedule demo
                      <Box
                        component="span"
                        className="arrow-icon"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Container>
          </Box>
        );

      case "split":
        return (
          <Box
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#000" : "#FFF",
              color: theme.palette.mode === "dark" ? "#FFF" : "#000",
              minHeight: "40vh",
              display: "flex",
              alignItems: "center",
              py: { xs: 5, md: 8 },
            }}
          >
            <Container maxWidth="lg">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                    gap: { xs: 3, md: 5 },
                  }}
                >
                  <Box sx={{ maxWidth: 560 }}>
                    <Typography variant="h3" fontWeight={600} mb={1}>
                      Accelerate your workflow today
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: 480,
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.6)",
                      }}
                    >
                      Built for modern teams who value speed and clarity.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.25,
                      flexDirection: { xs: "column", sm: "row" },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        px: 2.25,
                        py: 0.75,
                        fontWeight: 500,
                        textTransform: "none",
                        borderRadius: 10,
                        color: "inherit",
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(0,0,0,0.3)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.6)"
                              : "rgba(0,0,0,0.6)",
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.06)",
                        },
                      }}
                    >
                      Talk to Sales
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        px: 2.5,
                        py: 0.75,
                        fontWeight: 500,
                        textTransform: "none",
                        borderRadius: 10,
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#FFF" : "#000",
                        color: theme.palette.mode === "dark" ? "#000" : "#FFF",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(0,0,0,0.85)",
                          "& .arrow": {
                            transform: "translateX(4px)",
                          },
                        },
                      }}
                    >
                      Get Started
                      <Box
                        className="arrow"
                        sx={{
                          display: "inline-flex",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Container>
          </Box>
        );

      case "grid":
        return (
          <Box
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#000" : "#FFF",
              color: theme.palette.mode === "dark" ? "#FFF" : "#000",
              py: { xs: 8, md: 14 },
            }}
          >
            <Container maxWidth="lg">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    maxWidth: 700,
                    mx: "auto",
                    mb: { xs: 5, md: 7 },
                  }}
                >
                  <Typography variant="h2" fontWeight={600} gutterBottom>
                    Build faster with confident decisions
                  </Typography>

                  <Typography
                    variant="body1"
                    fontWeight={400}
                    sx={{
                      maxWidth: 420,
                      mx: "auto",
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.65)"
                          : "rgba(0,0,0,0.65)",
                    }}
                  >
                    A focused platform designed to keep teams aligned and
                    shipping without friction.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.25,
                      justifyContent: "center",
                      flexWrap: "wrap",
                      mt: { xs: 3, md: 4 },
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1.5,
                        fontWeight: 500,
                        textTransform: "none",
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#FFF" : "#000",
                        color: theme.palette.mode === "dark" ? "#000" : "#FFF",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(0,0,0,0.85)",
                        },
                      }}
                    >
                      Start building
                    </Button>

                    <Button
                      variant="text"
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1.5,
                        fontWeight: 500,
                        textTransform: "none",
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.75)"
                            : "rgba(0,0,0,0.75)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.06)",
                          color:
                            theme.palette.mode === "dark" ? "#FFF" : "#000",
                          "& .arrow": {
                            transform: "translateX(4px)",
                          },
                        },
                      }}
                    >
                      View demo
                      <Box
                        className="arrow"
                        sx={{
                          display: "inline-flex",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </motion.div>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
                  alignItems: "center",
                  mt: { xs: 5, md: 6 },
                  gap: { xs: 4, md: 0 },
                }}
              >
                <Box sx={{ textAlign: "center", px: { md: 4 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <HugeiconsIcon icon={CreditCardIcon} size={18} />
                    <Typography variant="h6" fontWeight={600}>
                      Simple pricing
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    fontWeight={400}
                    sx={{
                      maxWidth: 300,
                      mx: "auto",
                      mb: 2,
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.65)"
                          : "rgba(0,0,0,0.65)",
                    }}
                  >
                    Transparent plans that scale with your team as you grow.
                  </Typography>

                  <Button
                    variant="text"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 1.5,
                      fontWeight: 500,
                      textTransform: "none",
                      color: "inherit",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.06)",
                        "& .arrow": {
                          transform: "translateX(4px)",
                        },
                      },
                    }}
                  >
                    Explore pricing
                    <Box
                      className="arrow"
                      sx={{
                        display: "inline-flex",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                    </Box>
                  </Button>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: "none", md: "block" },
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.12)",
                  }}
                />

                <Box sx={{ textAlign: "center", px: { md: 4 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <HugeiconsIcon icon={RocketIcon} size={18} />
                    <Typography variant="h6" fontWeight={600}>
                      Quickstart
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    fontWeight={400}
                    sx={{
                      maxWidth: 300,
                      mx: "auto",
                      mb: 2,
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.65)"
                          : "rgba(0,0,0,0.65)",
                    }}
                  >
                    Get up and running in minutes with a clean setup.
                  </Typography>

                  <Button
                    variant="text"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 1.5,
                      fontWeight: 500,
                      textTransform: "none",
                      color: "inherit",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.06)",
                        "& .arrow": {
                          transform: "translateX(4px)",
                        },
                      },
                    }}
                  >
                    Read docs
                    <Box
                      className="arrow"
                      sx={{
                        display: "inline-flex",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        );

      case "columns":
        return (
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "5fr auto 2.5fr auto 2.5fr",
                },
                alignItems: "stretch",
                color: theme.palette.mode === "dark" ? "#FFF" : "#000",
                py: { xs: 6, md: 10 },
                gap: { xs: 4, md: 0 },
              }}
            >
              <Box
                sx={{
                  gridColumn: { xs: "1 / -1", sm: "1 / -1", md: "auto" },
                  px: { xs: 0, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4" fontWeight={600} mb={1}>
                  Everything you need to ship faster
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 420,
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(0,0,0,0.65)",
                  }}
                >
                  A minimal system for building, launching, and iterating with
                  confidence.
                </Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: "none", md: "block" },
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.12)",
                }}
              />

              <Box
                sx={{
                  px: { xs: 0, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <HugeiconsIcon icon={CreditCardIcon} size={18} />
                  <Typography variant="body2" fontWeight={600}>
                    Pricing
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(0,0,0,0.65)",
                  }}
                >
                  Simple and transparent
                </Typography>

                <Button
                  variant="text"
                  sx={{
                    mt: 0.5,
                    px: 1.5,
                    py: 0.4,
                    fontSize: "15px !important",
                    width: "fit-content",
                    borderRadius: 10,
                    fontWeight: 500,
                    textTransform: "none",
                    color: theme.palette.mode === "dark" ? "#FFF" : "#000",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)",
                      "& .arrow": {
                        transform: "translateX(4px)",
                      },
                    },
                  }}
                >
                  View pricing
                  <Box
                    className="arrow"
                    sx={{
                      display: "inline-flex",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                  </Box>
                </Button>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: "none", md: "block" },
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.12)",
                }}
              />

              <Box
                sx={{
                  px: { xs: 0, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <HugeiconsIcon icon={RocketIcon} size={18} />
                  <Typography variant="body2" fontWeight={600}>
                    Quickstart
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(0,0,0,0.65)",
                  }}
                >
                  Setup in minutes
                </Typography>

                <Button
                  variant="text"
                  sx={{
                    mt: 0.5,
                    px: 1.5,
                    py: 0.4,
                    fontSize: "15px !important",
                    width: "fit-content",
                    borderRadius: 10,
                    fontWeight: 500,
                    textTransform: "none",
                    color: theme.palette.mode === "dark" ? "#FFF" : "#000",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)",
                      "& .arrow": {
                        transform: "translateX(4px)",
                      },
                    },
                  }}
                >
                  Read docs
                  <Box
                    className="arrow"
                    sx={{
                      display: "inline-flex",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                  </Box>
                </Button>
              </Box>
            </Box>
          </Container>
        );

      default:
        return null;
    }
  };

  return <Box sx={{ width: "100%" }}>{renderCTA()}</Box>;
};

export default CTAVariants;
