import {
  Avatar,
  Box,
  Button,
  Typography,
  useTheme,
  Container,
  Tooltip,
  Skeleton,
  alpha,
} from "@mui/material";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useGitHub } from "@/context/GithubContext";
import Link from "next/link";
import { RiGithubFill, RiStarFill } from "react-icons/ri";
import { useState, useEffect, memo } from "react";
import { GITHUB_URL } from "../../utils/constants";
import AnimatedCounter from "../AnimatedCounter";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const ContributorAvatar = memo(({ user, index, theme }) => (
  <Tooltip title={user?.login || `Contributor ${index + 1}`} arrow>
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
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
  const [isInView, setIsInView] = useState(false);
  const [isGithubButtonHovered, setIsGithubButtonHovered] = useState(false);

  const starOpacity = useMotionValue(0.5);
  const starScale = useTransform(starOpacity, [0.5, 1], [1, 1.2]);

  useEffect(() => {
    const interval = setInterval(() => {
      starOpacity.set(Math.random() * 0.5 + 0.5);
    }, 1500);
    return () => clearInterval(interval);
  }, [starOpacity]);

  if (error) return null;

  const displayCount = 8;
  const latestStargazers = [...stargazers].reverse().slice(0, displayCount);
  const remainingCount = Math.max(0, stargazers.length - displayCount);

  return (
    <Container maxWidth="lg" sx={{ py: 8, overflow: "hidden" }}>
      <MotionBox
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => setIsInView(true)}
        transition={{ duration: 0.8 }}
      >
        <MotionBox
          textAlign="center"
          mb={5}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
          mb={6}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
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
              maxWidth: "800px",
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
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <motion.div style={{ scale: starScale }}>
                  <RiStarFill
                    size={28}
                    color={
                      theme.palette.mode === "dark" ? "#FFD700" : "#FFB700"
                    }
                  />
                </motion.div>
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
              <Link href={GITHUB_URL} passHref>
                <MotionButton
                  variant="outlined"
                  color="primary"
                  size="large"
                  onMouseEnter={() => setIsGithubButtonHovered(true)}
                  onMouseLeave={() => setIsGithubButtonHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition: "0.3s",
                    border: "1px solid",
                    borderRadius: 4,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AnimatePresence>
                      {isGithubButtonHovered && (
                        <motion.span
                          initial={{ opacity: 0, width: 0, marginRight: 0 }}
                          animate={{
                            opacity: 1,
                            width: "auto",
                            marginRight: 8,
                          }}
                          exit={{ opacity: 0, width: 0, marginRight: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: "inline-flex", overflow: "hidden" }}
                        >
                          <RiGithubFill size={22} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    Star on Github
                    <AnimatePresence>
                      {!isGithubButtonHovered && (
                        <motion.span
                          initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                          animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                          exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: "inline-flex", overflow: "hidden" }}
                        >
                          <RiGithubFill size={22} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Box>
                </MotionButton>
              </Link>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "1px" },
                height: { xs: "1px", md: 50 },
                background:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.common.white, 0.1)
                    : alpha(theme.palette.common.black, 0.1),
                display: { xs: "block", md: "block" },
              }}
            />

            <Box sx={{ textAlign: "center" }}>
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
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: displayCount * 0.05,
                            type: "spring",
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.2 },
                          }}
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
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
                  </motion.div>
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
