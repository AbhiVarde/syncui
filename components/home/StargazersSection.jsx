import {
  Avatar,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Skeleton,
  alpha,
  Button,
  Paper,
} from "@mui/material";
import { useGitHub } from "@/context/GithubContext";
import { useState, memo, useEffect } from "react";
import { GITHUB_URL, SPONSOR_URL } from "../../utils/constants";
import AnimatedCounter from "../AnimatedCounter";
import { motion } from "motion/react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  StarIcon,
  FavouriteIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

const ContributorAvatar = memo(({ user, index }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 40);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <Box
      sx={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease-out" }}
    >
      <Avatar
        src={user?.avatar_url}
        alt={user?.login}
        sx={{ width: 44, height: 44, bgcolor: "background.paper" }}
      />
    </Box>
  );
});

ContributorAvatar.displayName = "ContributorAvatar";

const TextLink = ({ children, href }) => (
  <Button
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variant="text"
    sx={{
      px: 0,
      py: 0.25,
      fontWeight: 500,
      textTransform: "none",
      color: "text.primary",
      display: "inline-flex",
      alignItems: "center",
      gap: 0.5,
      "&:hover": {
        backgroundColor: "transparent",
        "& .chevron": {
          transform: "translateX(4px)",
        },
      },
    }}
  >
    {children}
    <Box
      className="chevron"
      sx={{
        display: "inline-flex",
        transition: "transform 0.18s ease",
      }}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
    </Box>
  </Button>
);

const StargazersSection = () => {
  const { stars, stargazers, loading, error } = useGitHub();
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  if (error) return null;

  const displayCount = isXs ? 6 : isSm ? 8 : 10;
  const latestStargazers = [...stargazers].reverse().slice(0, displayCount);
  const remainingCount = Math.max(0, stargazers.length - displayCount);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        elevation={0}
        sx={{
          borderRadius: 3,
          backgroundColor: "transparent",
          p: { xs: 4, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight={500} gutterBottom>
          Trusted by developers
        </Typography>

        <Typography
          variant="body1"
          fontWeight={400}
          color="text.secondary"
          sx={{ maxWidth: 520, mx: "auto", mb: 5 }}
        >
          Open source and community driven. Built with feedback from developers
          shipping real products.
        </Typography>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            p: 4,
            borderRadius: 3,
            maxWidth: 640,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              height: 44,
              mb: 2.5,
            }}
          >
            {loading
              ? Array.from({ length: displayCount }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="circular"
                    width={44}
                    height={44}
                    sx={{
                      ml: index > 0 ? "-12px" : 0,
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? alpha("#fff", 0.1)
                          : alpha("#000", 0.06),
                    }}
                  />
                ))
              : latestStargazers.map((user, index) => (
                  <Avatar
                    key={user?.id || index}
                    src={user?.avatar_url}
                    alt={user?.login}
                    sx={{
                      width: 44,
                      height: 44,
                      ml: index > 0 ? "-12px" : 0,
                      border: "2px solid",
                      borderColor: "background.paper",
                      bgcolor: "background.paper",
                      zIndex: displayCount - index,
                    }}
                  />
                ))}

            {!loading && remainingCount > 0 && (
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  ml: "-12px",
                  border: "2px solid",
                  borderColor: "background.paper",
                  bgcolor: "background.paper",
                  fontWeight: 500,
                  zIndex: 0,
                }}
              >
                +{remainingCount}
              </Avatar>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <HugeiconsIcon icon={StarIcon} size={18} />
            <Typography variant="body1" fontWeight={500}>
              {loading ? (
                <Skeleton width={48} />
              ) : (
                <AnimatedCounter value={stars || 0} duration={1.6} />
              )}
            </Typography>
            <Typography variant="body2" fontWeight={400} color="text.secondary">
              GitHub stars
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <TextLink href={GITHUB_URL}>
              <HugeiconsIcon icon={GithubIcon} size={18} />
              Star on GitHub
            </TextLink>

            <TextLink href={SPONSOR_URL}>
              <HugeiconsIcon icon={FavouriteIcon} size={18} />
              Support Sync UI
            </TextLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default StargazersSection;
