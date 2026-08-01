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

const CTAVariants = ({ variant = "centered", height }) => {
  const theme = useTheme();
  const compact = Boolean(height);

  const renderCTA = () => {
    switch (variant) {
      case "centered":
        return (
          <Box
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#000" : "#FFF",
              color: theme.palette.mode === "dark" ? "#FFF" : "#000",
              minHeight: compact ? height : "50vh",
              height: compact ? height : undefined,
              overflow: compact ? "hidden" : "visible",
              display: "flex",
              flexDirection: "column",
              py: compact ? 2 : { xs: 8, md: 12 },
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
                    gap: compact ? 1.5 : 3,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant={compact ? "h5" : "h3"}
                    sx={{ fontWeight: 600, maxWidth: 720, lineHeight: 1.2 }}
                  >
                    Ready to transform your business?
                  </Typography>

                  {!compact && (
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
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: compact ? 0 : 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size={compact ? "small" : "medium"}
                      sx={{
                        px: 2,
                        py: 0.5,
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

                    {!compact && (
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
                            "& .arrow-icon": { transform: "translateX(4px)" },
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
                    )}
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
              minHeight: compact ? height : "40vh",
              height: compact ? height : undefined,
              overflow: compact ? "hidden" : "visible",
              display: "flex",
              alignItems: "center",
              py: compact ? 2 : { xs: 5, md: 8 },
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
                    gap: compact ? 2 : { xs: 3, md: 5 },
                  }}
                >
                  <Box sx={{ maxWidth: 560 }}>
                    <Typography
                      variant={compact ? "h6" : "h3"}
                      fontWeight={600}
                      sx={{ mb: compact ? 0 : 1 }}
                    >
                      Accelerate your workflow today
                    </Typography>

                    {!compact && (
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
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.25,
                      flexDirection: { xs: "column", sm: "row" },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {!compact && (
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
                        }}
                      >
                        Talk to Sales
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      size={compact ? "small" : "medium"}
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
                      }}
                    >
                      Get Started
                      <Box sx={{ display: "inline-flex" }}>
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
              height: compact ? height : undefined,
              overflow: compact ? "hidden" : "visible",
              py: compact ? 2 : { xs: 8, md: 14 },
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
                    mb: compact ? 2 : { xs: 5, md: 7 },
                  }}
                >
                  <Typography
                    variant={compact ? "h6" : "h2"}
                    fontWeight={600}
                    gutterBottom
                  >
                    Build faster with confident decisions
                  </Typography>

                  {!compact && (
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
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.25,
                      justifyContent: "center",
                      flexWrap: "wrap",
                      mt: compact ? 1.5 : { xs: 3, md: 4 },
                    }}
                  >
                    <Button
                      variant="contained"
                      size={compact ? "small" : "medium"}
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1.5,
                        fontWeight: 500,
                        textTransform: "none",
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#FFF" : "#000",
                        color: theme.palette.mode === "dark" ? "#000" : "#FFF",
                      }}
                    >
                      Start building
                    </Button>
                  </Box>
                </Box>

                {!compact && (
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
                    </Box>
                  </Box>
                )}
              </motion.div>
            </Container>
          </Box>
        );

      case "columns":
        return (
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: compact
                  ? "1fr"
                  : {
                      xs: "1fr",
                      sm: "1fr 1fr",
                      md: "5fr auto 2.5fr auto 2.5fr",
                    },
                alignItems: "stretch",
                color: theme.palette.mode === "dark" ? "#FFF" : "#000",
                height: compact ? height : undefined,
                overflow: compact ? "hidden" : "visible",
                py: compact ? 2 : { xs: 6, md: 10 },
                gap: compact ? 0 : { xs: 4, md: 0 },
              }}
            >
              <Box
                sx={{
                  px: { xs: 0, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant={compact ? "h6" : "h4"}
                  fontWeight={600}
                  sx={{ mb: 1 }}
                >
                  Everything you need to ship faster
                </Typography>

                {!compact && (
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
                )}
              </Box>

              {!compact && (
                <>
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
                  </Box>
                </>
              )}
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
