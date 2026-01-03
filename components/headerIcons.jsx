import { Box, IconButton, Typography, Divider } from "@mui/material";
import { GITHUB_URL, TWITTER_URL } from "@/utils/constants";
import AnimatedCounter from "./AnimatedCounter";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  NewTwitterIcon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";

const HeaderIcons = ({ stars, loading, toggleTheme, isDarkMode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {(typeof stars === "number" || loading) && (
          <Box
            component="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.primary",
              textDecoration: "none",
              cursor: "pointer",
              transition: "opacity 0.1s ease",
              "&:hover": {
                opacity: 0.7,
              },
            }}
          >
            <HugeiconsIcon icon={GithubIcon} size={20} />
            {!loading && stars > 0 && (
              <Typography
                variant="body2"
                component="span"
                fontWeight={500}
                sx={{ fontSize: 14 }}
              >
                <AnimatedCounter
                  value={stars}
                  duration={1}
                  formatter={(val) => val.toLocaleString()}
                  delay={0}
                />
              </Typography>
            )}
          </Box>
        )}

        <IconButton
          component="a"
          href={TWITTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseLeave={(e) => e.target.blur()}
          sx={{
            color: "text.primary",
            p: 0.5,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "transparent",
              opacity: 0.7,
            },
            "&:focus": {
              backgroundColor: "transparent",
              opacity: 1,
            },
            "&:active": {
              backgroundColor: "transparent",
              opacity: 0.7,
            },
          }}
        >
          <HugeiconsIcon icon={NewTwitterIcon} size={18} />
        </IconButton>
      </Box>

      <IconButton
        onClick={toggleTheme}
        onMouseLeave={(e) => e.target.blur()}
        aria-label="Toggle theme"
        sx={{
          color: "text.primary",
          p: 0.5,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 0.7,
          },
          "&:focus": {
            backgroundColor: "transparent",
            opacity: 1,
          },
          "&:active": {
            backgroundColor: "transparent",
            opacity: 0.7,
          },
        }}
      >
        <HugeiconsIcon icon={isDarkMode ? Sun01Icon : Moon01Icon} size={22} />
      </IconButton>
    </Box>
  );
};

export default HeaderIcons;
