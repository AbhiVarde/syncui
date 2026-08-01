import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "motion/react";
import {
  FiUsers,
  FiStar,
  FiUploadCloud,
  FiShield,
  FiTrendingUp,
  FiClock,
  FiGlobe,
  FiZap,
} from "react-icons/fi";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const StatsVariants = ({ variant = "simple", height }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const compact = Boolean(height);

  const renderStats = () => {
    switch (variant) {
      case "simple": {
        const stats = [
          { value: "1B+", label: "API requests per day" },
          { value: "99.9%", label: "Uptime guaranteed" },
          { value: "<200ms", label: "Median latency" },
          { value: "180+", label: "Countries served" },
        ];
        const visible = compact ? stats.slice(0, 3) : stats;

        return (
          <Box
            sx={{
              backgroundColor: isDark ? "#000" : "#FFF",
              color: isDark ? "#FFF" : "#000",
              py: compact ? 2 : { xs: 6, md: 10 },
              height: compact ? height : undefined,
              overflow: compact ? "hidden" : "visible",
              display: compact ? "flex" : "block",
              alignItems: compact ? "center" : undefined,
            }}
          >
            <Container maxWidth="lg">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr 1fr",
                      md: `repeat(${visible.length}, 1fr)`,
                    },
                    gap: compact ? 2 : { xs: 4, md: 2 },
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  {visible.map((stat, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Typography
                          variant={compact ? "h5" : "h3"}
                          sx={{
                            fontWeight: 500,
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant={compact ? "caption" : "body2"}
                          sx={{
                            fontWeight: 400,
                            color: isDark
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(0,0,0,0.5)",
                            lineHeight: 1.4,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Container>
          </Box>
        );
      }

      case "with-icons": {
        const stats = [
          {
            icon: FiUsers,
            value: "50K+",
            label: "Developers",
            sublabel: "Building with our API",
          },
          {
            icon: FiTrendingUp,
            value: "10x",
            label: "Faster shipping",
            sublabel: "Reported by customers",
          },
          {
            icon: FiShield,
            value: "99.9%",
            label: "Uptime SLA",
            sublabel: "Enterprise reliability",
          },
          {
            icon: FiStar,
            value: "4.9",
            label: "Rating",
            sublabel: "From 12,000+ reviews",
          },
        ];
        const visible = compact ? stats.slice(0, 2) : stats;

        return (
          <Box
            sx={{
              backgroundColor: isDark ? "#000" : "#FFF",
              color: isDark ? "#FFF" : "#000",
              py: compact ? 2 : { xs: 6, md: 10 },
              height: compact ? height : undefined,
              overflow: compact ? "hidden" : "visible",
              display: compact ? "flex" : "block",
              alignItems: compact ? "center" : undefined,
            }}
          >
            <Container maxWidth="lg">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {!compact && (
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{ px: { xs: 2, sm: 3 }, mb: 6, textAlign: "center" }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          fontWeight: 500,
                          color: isDark
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(0,0,0,0.4)",
                        }}
                      >
                        Trusted by AI teams globally
                      </Typography>
                    </Box>
                  </motion.div>
                )}

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: `repeat(${visible.length}, 1fr)`,
                    },
                    px: { xs: 2, sm: 3 },
                    gap: compact ? 2 : 0,
                  }}
                >
                  {visible.map((stat, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          gap: compact ? 0.75 : 1.5,
                          px: { xs: 0, md: 3 },
                        }}
                      >
                        {!compact && (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.05)",
                            }}
                          >
                            <stat.icon
                              size={18}
                              style={{ opacity: isDark ? 0.8 : 0.7 }}
                            />
                          </Box>
                        )}
                        <Box>
                          <Typography
                            variant={compact ? "h6" : "h4"}
                            sx={{
                              fontWeight: 500,
                              lineHeight: 1,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant={compact ? "caption" : "body2"}
                            sx={{
                              fontWeight: 500,
                              mt: 0.75,
                              color: isDark ? "#FFF" : "#000",
                            }}
                          >
                            {stat.label}
                          </Typography>
                          {!compact && (
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 400,
                                display: "block",
                                color: isDark
                                  ? "rgba(255,255,255,0.4)"
                                  : "rgba(0,0,0,0.4)",
                                mt: 0.25,
                              }}
                            >
                              {stat.sublabel}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Container>
          </Box>
        );
      }

      case "cards": {
        const stats = [
          {
            icon: FiUsers,
            value: "50K+",
            label: "Developers",
            description:
              "Teams across startups and enterprises ship faster with our platform.",
          },
          {
            icon: FiUploadCloud,
            value: "1B+",
            label: "Daily API calls",
            description:
              "Handling production AI workloads with zero cold starts.",
          },
          {
            icon: FiZap,
            value: "10x",
            label: "Faster deployment",
            description: "From model to production in minutes, not weeks.",
          },
        ];
        const visible = compact ? stats.slice(0, 3) : stats;

        return (
          <Box
            sx={{
              backgroundColor: isDark ? "#000" : "#FFF",
              color: isDark ? "#FFF" : "#000",
              py: compact ? 2 : { xs: 6, md: 10 },
              height: compact ? height : undefined,
              overflow: compact ? "hidden" : "visible",
              display: compact ? "flex" : "block",
              alignItems: compact ? "center" : undefined,
            }}
          >
            <Container maxWidth="lg">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {!compact && (
                  <motion.div variants={itemVariants}>
                    <Box sx={{ px: { xs: 2, sm: 3 }, mb: 6, maxWidth: 520 }}>
                      <Typography variant="h4" sx={{ fontWeight: 500, mb: 1 }}>
                        Infrastructure built for AI scale
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 400,
                          color: isDark
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.5)",
                          lineHeight: 1.6,
                        }}
                      >
                        Real numbers from production workloads not benchmarks.
                      </Typography>
                    </Box>
                  </motion.div>
                )}

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: `repeat(${visible.length}, 1fr)`,
                    },
                    gap: compact ? 1 : 1.5,
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  {visible.map((stat, i) => (
                    <motion.div key={i} variants={itemVariants}>
                      <Box
                        sx={{
                          p: compact ? 1.5 : 3,
                          borderRadius: 2,
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                          backgroundColor: isDark
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(0,0,0,0.01)",
                          display: "flex",
                          flexDirection: "column",
                          gap: compact ? 0.5 : 1.5,
                          height: "100%",
                        }}
                      >
                        {!compact && (
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 1.25,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.05)",
                            }}
                          >
                            <stat.icon
                              size={16}
                              style={{ opacity: isDark ? 0.75 : 0.65 }}
                            />
                          </Box>
                        )}

                        <Box>
                          <Typography
                            variant={compact ? "body1" : "h5"}
                            sx={{
                              fontWeight: 500,
                              lineHeight: 1,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {stat.value}
                          </Typography>
                          <Typography
                            variant={compact ? "caption" : "body2"}
                            sx={{ fontWeight: 600, mt: 0.5 }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>

                        {!compact && (
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 400,
                              color: isDark
                                ? "rgba(255,255,255,0.4)"
                                : "rgba(0,0,0,0.4)",
                              lineHeight: 1.5,
                            }}
                          >
                            {stat.description}
                          </Typography>
                        )}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Container>
          </Box>
        );
      }

      default:
        return null;
    }
  };

  return <Box sx={{ width: "100%" }}>{renderStats()}</Box>;
};

export default StatsVariants;
