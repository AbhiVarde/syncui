import {
  Avatar,
  Box,
  Typography,
  useTheme,
  Container,
  Tooltip,
  Skeleton,
  alpha,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useGitHub } from "@/context/GithubContext";
import {
  RiGithubFill,
  RiStarFill,
  RiHeartFill,
  RiHeartLine,
} from "react-icons/ri";
import { useState, memo } from "react";
import { GITHUB_URL, SPONSOR_URL } from "../../utils/constants";
import AnimatedCounter from "../AnimatedCounter";

const MotionBox = motion(Box);

const buttonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  width: 180,
  height: 40,
  borderRadius: "10px",
  color: "inherit",
  textDecoration: "none",
  bgcolor: (theme) => theme.palette.action.hover,
  border: "1px solid",
  borderColor: "divider",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    bgcolor: (theme) => theme.palette.action.selected,
    transform: "translateY(-2px)",
    boxShadow: (theme) => `0 4px 8px ${theme.palette.divider}`,
  },
};

const ContributorAvatar = memo(({ user, index, theme }) => (
  <Tooltip title={user?.login || `Contributor ${index + 1}`} arrow>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
    >
      <Avatar
        src={user?.avatar_url}
        alt={user?.login || `Contributor ${index + 1}`}
        sx={{
          width: 48,
          height: 48,
          border: "2px solid",
          cursor: "pointer",
          borderColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.common.white, 0.1)
              : "background.paper",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      />
    </motion.div>
  </Tooltip>
));

ContributorAvatar.displayName = "ContributorAvatar";

const StargazersSection = () => {
  const { stars, stargazers, loading, error } = useGitHub();
  const theme = useTheme();
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  if (error) return null;

  const displayCount = 8;
  const latestStargazers = [...stargazers].reverse().slice(0, displayCount);
  const remainingCount = Math.max(0, stargazers.length - displayCount);

  return (
    <Container maxWidth="lg" sx={{ py: 8, overflow: "hidden" }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <MotionBox
          textAlign="center"
          mb={5}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 1,
              letterSpacing: "-0.02em",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(180deg, #fff 30%, rgba(255,255,255,0.7) 100%)"
                  : "linear-gradient(180deg, #000 30%, rgba(0,0,0,0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            Trusted by Top Developers
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "text.secondary"
                  : alpha("#000", 0.7),
              maxWidth: 600,
              mx: "auto",
              fontWeight: 400,
              mb: 2,
            }}
          >
            Sync UI offers powerful, flexible components to help you ship
            faster, design better, and scale confidently.
          </Typography>
        </MotionBox>

        <MotionBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mb={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 4, md: 4 },
              borderRadius: 4,
              py: 3,
              px: { xs: 3, md: 5 },
              width: "100%",
              maxWidth: "900px",
              background:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.common.white, 0.04)
                  : alpha(theme.palette.common.black, 0.03),
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.common.white, 0.1)
                  : alpha(theme.palette.common.black, 0.06)
              }`,
            }}
          >
            {/* Stars Section */}
            <Box
              sx={{
                textAlign: "center",
                order: { xs: 3, md: 1 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <RiStarFill
                  size={28}
                  color={theme.palette.mode === "dark" ? "#FFD700" : "#FFB700"}
                />
                <Typography
                  variant="h4"
                  component="span"
                  ml={1}
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  }}
                >
                  {loading ? (
                    <Skeleton
                      width={80}
                      height={45}
                      sx={{ display: "inline-block" }}
                    />
                  ) : (
                    <AnimatedCounter value={stars || 0} duration={2} />
                  )}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  alignItems: "center",
                }}
              >
                {/* Support Button */}
                <Box
                  component="a"
                  href={SPONSOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHeartHovered(true)}
                  onMouseLeave={() => setIsHeartHovered(false)}
                  sx={buttonStyles}
                >
                  <AnimatePresence mode="wait">
                    {isHeartHovered ? (
                      <motion.div
                        key="filled"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <RiHeartFill size={20} color="#e91e63" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="outline"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <RiHeartLine size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ lineHeight: 1 }}
                  >
                    Support Sync UI
                  </Typography>
                </Box>

                {/* Star Button */}
                <Box
                  component="a"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={buttonStyles}
                >
                  <RiGithubFill size={20} />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ lineHeight: 1 }}
                  >
                    Star on GitHub
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Divider */}
            <Box
              sx={{
                width: { xs: "100%", md: "1px" },
                height: { xs: "1px", md: 120 },
                background:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.common.white, 0.1)
                    : alpha(theme.palette.common.black, 0.1),
                display: { xs: "block", md: "block" },
                order: { xs: 2, md: 2 },
              }}
            />

            {/* Contributors Section */}
            <Box
              sx={{
                textAlign: "center",
                order: { xs: 1, md: 3 },
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "center",
                    mb: 2,
                    maxWidth: 320,
                    mx: "auto",
                  }}
                >
                  {Array.from({ length: displayCount }).map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="circular"
                      width={48}
                      height={48}
                      sx={{
                        borderRadius: "50%",
                        background:
                          theme.palette.mode === "dark"
                            ? alpha(theme.palette.common.white, 0.1)
                            : alpha(theme.palette.common.black, 0.06),
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", position: "relative" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: "center",
                      maxWidth: 320,
                      mb: 2,
                      mx: "auto",
                    }}
                  >
                    {latestStargazers.map((user, index) => (
                      <ContributorAvatar
                        key={user?.id || index}
                        user={user}
                        index={index}
                        theme={theme}
                      />
                    ))}
                    {remainingCount > 0 && (
                      <Tooltip
                        title={`${remainingCount} more stargazers`}
                        arrow
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: displayCount * 0.03,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              border: "2px solid",
                              cursor: "pointer",
                              borderColor: theme.palette.divider,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              backgroundColor: theme.palette.background.paper,
                              color:
                                theme.palette.mode === "dark" ? "#fff" : "#000",
                              fontWeight: 500,
                              fontSize: "15px",
                            }}
                          >
                            +{remainingCount}
                          </Avatar>
                        </motion.div>
                      </Tooltip>
                    )}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color:
                        theme.palette.mode === "dark"
                          ? "text.secondary"
                          : "text.primary",
                    }}
                  >
                    Be part of our community!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </MotionBox>
      </MotionBox>
    </Container>
  );
};

export default StargazersSection;
