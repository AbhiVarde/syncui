import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { RiGithubFill, RiTwitterXLine } from "react-icons/ri";
import { GITHUB_URL, TWITTER_URL } from "../../utils/constants";

const Footer = () => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  const socialLinkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.8,
    color: "inherit",
    textDecoration: "none",
    bgcolor: (theme) => theme.palette.action.hover,
    px: 1.4, // Increased padding-x slightly for better balance
    py: 0.8, // Increased padding-y slightly for better balance
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
    border: "1px solid",
    borderColor: "divider",
    height: "32px", // Fixed height for consistency
    "&:hover": {
      bgcolor: (theme) => theme.palette.action.selected,
      transform: "translateY(-1px)",
    },
  };

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={socialLinkStyle}
            >
              <RiGithubFill size={20} />
            </Box>
            <Box
              component="a"
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={socialLinkStyle}
            >
              <RiTwitterXLine size={16} />
              <Typography
                variant="caption"
                component="span"
                sx={{
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                Follow
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
