import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { RiGithubFill, RiTwitterXLine, RiInstagramLine } from "react-icons/ri";
import { GITHUB_URL, TWITTER_URL, INSTAGRAM_URL } from "../../utils/constants";

const Footer = () => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="footer"
      sx={{
        height: "60px",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          padding: isMediumUp ? "12px 24px" : "16px 8px",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Box display="flex" alignItems="center">
            <Typography variant="caption">
              Brought to you by{" "}
              <a
                href="https://abhivarde.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 500,
                  color: "inherit",
                }}
              >
                abhivarde.in
              </a>
              .
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              color="inherit"
            >
              <RiGithubFill size={22} />
            </IconButton>
            <IconButton
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              color="inherit"
            >
              <RiInstagramLine size={20} />
            </IconButton>
            <IconButton
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              color="inherit"
            >
              <RiTwitterXLine size={17} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
