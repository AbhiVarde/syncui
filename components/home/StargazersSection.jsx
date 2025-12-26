import {
  Avatar,
  Box,
  Typography,
  useTheme,
  Container,
  Skeleton,
  alpha,
} from "@mui/material";
import { useGitHub } from "@/context/GithubContext";
import {
  RiGithubFill,
  RiStarFill,
  RiHeartFill,
  RiHeartLine,
} from "react-icons/ri";
import { useState, memo, useEffect, useRef } from "react";
import { GITHUB_URL, SPONSOR_URL } from "../../utils/constants";
import AnimatedCounter from "../animatedCounter";

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

const ContributorAvatar = memo(({ user, index, theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 30);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.9)",
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.15s ease-out",
        },
      }}
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
    </Box>
  );
});

ContributorAvatar.displayName = "ContributorAvatar";

const StargazersSection = () => {
  const { stars, stargazers, loading, error } = useGitHub();
  const theme = useTheme();
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (error) return null;

  const displayCount = 8;
  const latestStargazers = [...stargazers].reverse().slice(0, displayCount);
  const remainingCount = Math.max(0, stargazers.length - displayCount);

  return (
    <Container maxWidth="lg" ref={sectionRef} sx={{ py: { xs: 8, md: 10 } }}>
      <Box
        sx={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        }}
      >
        <Box
          textAlign="center"
          mb={5}
          sx={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease-out 0.1s",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 500,
              mb: 2,
              letterSpacing: "-0.02em",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
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
            }}
          >
            Powerful, flexible components to help you build better.
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.4s ease-out 0.2s",
          }}
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

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  alignItems: "center",
                }}
              >
                <Box
                  component="a"
                  href={SPONSOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHeartHovered(true)}
                  onMouseLeave={() => setIsHeartHovered(false)}
                  sx={buttonStyles}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {isHeartHovered ? (
                      <RiHeartFill size={20} color="#e91e63" />
                    ) : (
                      <RiHeartLine size={20} />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ lineHeight: 1 }}
                  >
                    Support Sync UI
                  </Typography>
                </Box>

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

            <Box
              sx={{
                width: { xs: "100%", md: "1px" },
                height: { xs: "1px", md: 120 },
                background:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.common.white, 0.1)
                    : alpha(theme.palette.common.black, 0.1),
                order: { xs: 2, md: 2 },
              }}
            />

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
                <Box sx={{ textAlign: "center" }}>
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
                      <Box
                        sx={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "scale(1)" : "scale(0.9)",
                          transition: `opacity 0.2s ease-out ${displayCount * 0.03}s, transform 0.2s ease-out ${displayCount * 0.03}s`,
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.15s ease-out",
                          },
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
                      </Box>
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
        </Box>
      </Box>
    </Container>
  );
};

export default StargazersSection;
