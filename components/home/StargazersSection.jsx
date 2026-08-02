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
} from "@mui/material";
import { useGitHub } from "@/context/GithubContext";
import { GITHUB_URL, SPONSOR_URL } from "../../utils/constants";
import AnimatedCounter from "../AnimatedCounter";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  StarIcon,
  FavouriteIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

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
      fontSize: 14,
      color: "text.primary",
      display: "inline-flex",
      alignItems: "center",
      gap: 0.5,
      "&:hover": {
        backgroundColor: "transparent",
        "& .chevron": { transform: "translateX(4px)" },
      },
    }}
  >
    {children}
    <Box
      className="chevron"
      sx={{ display: "inline-flex", transition: "transform 0.18s ease" }}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
    </Box>
  </Button>
);

const StargazersSection = () => {
  const { stars, stargazers, loading, error } = useGitHub();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  if (error) return null;

  const displayCount = isXs ? 6 : 8;
  const latestStargazers = [...stargazers].reverse().slice(0, displayCount);
  const remainingCount = Math.max(0, stargazers.length - displayCount);
  const skeletonBg =
    theme.palette.mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.06);

  return (
    <Container maxWidth="md" sx={{ px: { lg: 0 }, py: 5 }}>
      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          px: { xs: 2.5, sm: 3.5 },
          py: { xs: 2.5, sm: 3 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {loading
              ? Array.from({ length: displayCount }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="circular"
                    width={36}
                    height={36}
                    sx={{
                      ml: index > 0 ? "-10px" : 0,
                      flexShrink: 0,
                      border: "2px solid",
                      borderColor: "background.paper",
                      bgcolor: skeletonBg,
                      borderRadius: "50%",
                      zIndex: displayCount - index,
                    }}
                  />
                ))
              : latestStargazers.map((user, index) => (
                  <Avatar
                    key={user?.id || index}
                    src={user?.avatar_url}
                    alt={user?.login}
                    sx={{
                      width: 36,
                      height: 36,
                      ml: index > 0 ? "-10px" : 0,
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
                  width: 36,
                  height: 36,
                  ml: "-10px",
                  border: "2px solid",
                  borderColor: "background.paper",
                  bgcolor:
                    theme.palette.mode === "dark" ? "#f5f5f5" : "#111111",
                  color: theme.palette.mode === "dark" ? "#111111" : "#f5f5f5",
                  fontWeight: 600,
                  fontSize: 12,
                  zIndex: displayCount + 1,
                }}
              >
                +{remainingCount}
              </Avatar>
            )}
          </Box>

          {loading ? (
            <Skeleton
              variant="rounded"
              width={130}
              height={18}
              sx={{ borderRadius: 1, bgcolor: skeletonBg }}
            />
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <HugeiconsIcon icon={StarIcon} size={16} />
              <Typography variant="body2" fontWeight={500}>
                <AnimatedCounter value={stars || 0} duration={1.6} />
              </Typography>
              <Typography
                variant="body2"
                fontWeight={400}
                color="text.secondary"
              >
                GitHub stars
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2.5, flexShrink: 0 }}>
          {loading ? (
            <>
              <Skeleton
                variant="rounded"
                width={100}
                height={18}
                sx={{ borderRadius: 1, bgcolor: skeletonBg }}
              />
              <Skeleton
                variant="rounded"
                width={116}
                height={18}
                sx={{ borderRadius: 1, bgcolor: skeletonBg }}
              />
            </>
          ) : (
            <>
              <TextLink href={GITHUB_URL}>
                <HugeiconsIcon icon={GithubIcon} size={16} />
                Star on GitHub
              </TextLink>
              <TextLink href={SPONSOR_URL}>
                <HugeiconsIcon icon={FavouriteIcon} size={16} />
                Support Sync UI
              </TextLink>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default StargazersSection;
