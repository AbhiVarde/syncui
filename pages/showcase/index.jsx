"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  Skeleton,
} from "@mui/material";
import { LuPlus, LuHeart, LuRefreshCw, LuStar } from "react-icons/lu";
import Head from "next/head";

const DISCUSS_URL = "https://github.com/AbhiVarde/syncui/discussions/4";
const SPONSOR_URL = "https://github.com/sponsors/AbhiVarde";
const GITHUB_URL = "https://github.com/AbhiVarde/syncui";

function parseDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function cleanTitle(raw) {
  if (!raw) return raw;
  return raw
    .replace(/\s*:\s+.+$/, "")
    .replace(/\s+[-\u2013\u2014|]\s+.+$/, "")
    .replace(/\s+\/\/\s+.+$/, "")
    .trim();
}

function HeroIllustration({ isDark }) {
  const bg = isDark ? "#1a1a1a" : "#efefef";
  const line = isDark ? "#2f2f2f" : "#d8d8d8";
  const accent = isDark ? "#3d3d3d" : "#c8c8c8";
  const soft = isDark ? "#282828" : "#e4e4e4";

  return (
    <Box
      sx={{
        position: "absolute",
        right: { xs: -100, md: 24 },
        top: "50%",
        transform: "translateY(-50%)",
        opacity: { xs: 0.06, md: 1 },
        pointerEvents: "none",
      }}
    >
      <svg width="280" height="172" viewBox="0 0 280 172" fill="none">
        <rect
          x="16"
          y="16"
          width="76"
          height="52"
          rx="7"
          fill={bg}
          stroke={line}
          strokeWidth="1"
        />
        <rect x="26" y="26" width="40" height="5" rx="2.5" fill={accent} />
        <rect x="26" y="36" width="28" height="4" rx="2" fill={soft} />
        <rect x="26" y="45" width="34" height="4" rx="2" fill={soft} />
        <rect x="72" y="24" width="12" height="12" rx="3" fill={soft} />
        <rect
          x="108"
          y="4"
          width="76"
          height="52"
          rx="7"
          fill={bg}
          stroke={line}
          strokeWidth="1"
        />
        <rect x="118" y="16" width="56" height="28" rx="4" fill={soft} />
        <rect x="118" y="50" width="36" height="4" rx="2" fill={accent} />
        <rect
          x="200"
          y="20"
          width="64"
          height="52"
          rx="7"
          fill={bg}
          stroke={line}
          strokeWidth="1"
        />
        <circle cx="220" cy="40" r="10" fill={soft} />
        <rect x="234" y="34" width="22" height="4" rx="2" fill={accent} />
        <rect x="234" y="43" width="16" height="4" rx="2" fill={soft} />
        <rect
          x="52"
          y="104"
          width="80"
          height="52"
          rx="7"
          fill={bg}
          stroke={line}
          strokeWidth="1"
        />
        <rect x="62" y="114" width="24" height="24" rx="4" fill={soft} />
        <rect x="92" y="116" width="32" height="4" rx="2" fill={accent} />
        <rect x="92" y="125" width="24" height="4" rx="2" fill={soft} />
        <rect x="92" y="134" width="28" height="4" rx="2" fill={soft} />
        <rect
          x="152"
          y="108"
          width="80"
          height="52"
          rx="7"
          fill={bg}
          stroke={line}
          strokeWidth="1"
        />
        <rect x="162" y="118" width="60" height="6" rx="3" fill={soft} />
        <rect x="162" y="129" width="44" height="4" rx="2" fill={accent} />
        <rect x="162" y="138" width="50" height="8" rx="3" fill={soft} />
        <line
          x1="54"
          y1="68"
          x2="84"
          y2="104"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="146"
          y1="56"
          x2="120"
          y2="104"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="200"
          y1="66"
          x2="190"
          y2="108"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <circle cx="54" cy="68" r="2.5" fill={accent} />
        <circle cx="146" cy="56" r="2.5" fill={accent} />
        <circle cx="200" cy="66" r="2.5" fill={accent} />
        <circle cx="84" cy="104" r="2.5" fill={accent} />
        <circle cx="120" cy="104" r="2.5" fill={accent} />
        <circle cx="190" cy="108" r="2.5" fill={accent} />
      </svg>
    </Box>
  );
}

function OutlineButton({ href, target, rel, onClick, startIcon, children }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sx = {
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 1,
    px: 1.5,
    py: 0.5,
    minHeight: 0,
    lineHeight: 1.6,
    fontSize: "0.8125rem",
    boxShadow: "none",
    border: "1px solid",
    borderColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)",
    color: "text.secondary",
    bgcolor: "transparent",
    transition: "border-color 0.15s, background-color 0.15s",
    "&:hover": {
      bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
      borderColor: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
      boxShadow: "none",
    },
  };

  if (href) {
    return (
      <Button
        component="a"
        href={href}
        target={target}
        rel={rel}
        startIcon={startIcon}
        sx={sx}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button onClick={onClick} startIcon={startIcon} sx={sx}>
      {children}
    </Button>
  );
}

function InlineLink({ href, children }) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        fontWeight: 500,
        color: "text.secondary",
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      {children}
    </Box>
  );
}

function CardSkeleton() {
  return (
    <Box
      sx={{
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={172}
        animation="wave"
        sx={{ bgcolor: "action.hover" }}
      />
      <Box sx={{ px: 1.5, py: 1.25, display: "flex", alignItems: "center" }}>
        <Skeleton
          width="55%"
          height={16}
          animation="wave"
          sx={{ bgcolor: "action.hover" }}
        />
      </Box>
    </Box>
  );
}

function ResourceCard({ r }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [loaded, setLoaded] = useState(false);
  const domain = parseDomain(r.url);
  const title = cleanTitle(r.name) || domain;

  return (
    <Box
      onClick={() => window.open(r.url, "_blank", "noopener,noreferrer")}
      sx={{
        border: "1px dashed",
        borderColor: r.sponsored
          ? isDark
            ? "rgba(255,255,255,0.3)"
            : "rgba(0,0,0,0.25)"
          : "divider",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.15s",
        "&:hover": {
          borderColor: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 172,
          bgcolor: isDark ? "#111" : "#f2f2f2",
        }}
      >
        {r.sponsored && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 2,
              bgcolor: "text.primary",
              color: "background.paper",
              px: 0.75,
              py: 0.25,
              borderRadius: 0.75,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            <LuStar size={12} />
            FEATURED
          </Box>
        )}

        {r.image ? (
          <>
            <img
              src={r.image}
              alt=""
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(18px)",
                transform: "scale(1.08)",
                opacity: loaded ? 0 : 1,
                transition: "opacity 0.35s ease",
              }}
            />
            <img
              src={r.image}
              alt={title}
              onLoad={() => setLoaded(true)}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
            />
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              fontWeight={400}
              color="text.disabled"
              sx={{ fontFamily: "monospace" }}
            >
              {domain}
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          px: 1.5,
          py: 1.1,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body2"
          fontWeight={500}
          noWrap
          sx={{ flex: 1, minWidth: 0 }}
        >
          {title}
        </Typography>
        {!r.image && (
          <Typography
            variant="caption"
            fontWeight={400}
            color="text.disabled"
            sx={{
              fontFamily: "monospace",
              flexShrink: 0,
              ml: 1,
              fontSize: "0.65rem",
            }}
          >
            {domain}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default function ShowcasePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetch("/api/showcase-resources")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data) => {
        setResources(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Showcase // Sync UI</title>
        <meta
          name="description"
          content="Explore projects, tools, and libraries shared by the Sync UI community. Discover and get inspired by developer-built creations."
        />
        <link rel="canonical" href="https://www.syncui.design/showcase" />
        <meta
          name="keywords"
          content="developer showcase, UI tools, web projects, open source showcase, developer tools, Sync UI showcase"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.syncui.design/showcase" />
        <meta property="og:site_name" content="Sync UI" />
        <meta property="og:title" content="Developer Showcase | Sync UI" />
        <meta
          property="og:description"
          content="Explore projects, tools, and libraries shared by the Sync UI community."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@syncuidesign" />
        <meta name="twitter:creator" content="@abhivarde" />
        <meta name="twitter:title" content="Developer Showcase | Sync UI" />
        <meta
          name="twitter:description"
          content="Explore projects, tools, and libraries shared by the Sync UI community."
        />
      </Head>

      <Container
        maxWidth="xl"
        sx={{
          px: "0px !important",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ px: { xs: 2, md: 4 }, pt: 3 }}>
            <Box
              sx={{
                position: "relative",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
                p: { xs: 3, md: 4 },
              }}
            >
              <HeroIllustration isDark={isDark} />
              <Box sx={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  letterSpacing="-0.03em"
                  mb={0.75}
                >
                  Built by developers, for developers.
                </Typography>
                <Stack direction="column" gap={0.5} mb={2}>
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    color="text.secondary"
                    lineHeight={1.7}
                  >
                    Tools, libraries, and projects shared by the Sync UI
                    community.
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight={400}
                    color="text.disabled"
                    lineHeight={1.6}
                  >
                    <InlineLink href={SPONSOR_URL}>Sponsor</InlineLink> to
                    feature your project.{" "}
                    <InlineLink href={GITHUB_URL}>Star on GitHub</InlineLink> if
                    you find it useful.
                  </Typography>
                </Stack>
                <Stack direction="row" gap={0.75} flexWrap="wrap">
                  <OutlineButton
                    href={DISCUSS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LuPlus size={11} />}
                  >
                    Share yours
                  </OutlineButton>
                  <OutlineButton
                    href={SPONSOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LuHeart size={11} />}
                  >
                    Sponsor
                  </OutlineButton>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Box sx={{ px: { xs: 2, md: 4 }, pt: 4, pb: 4 }}>
            {error && !loading && (
              <Box
                sx={{
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 1,
                  py: 10,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" fontWeight={500} mb={0.5}>
                  Could not load resources
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={400}
                  color="text.secondary"
                  display="block"
                  mb={2.5}
                >
                  Something went wrong. Please try again.
                </Typography>
                <OutlineButton
                  onClick={load}
                  startIcon={<LuRefreshCw size={11} />}
                >
                  Try again
                </OutlineButton>
              </Box>
            )}

            {!loading && !error && resources.length === 0 && (
              <Box
                sx={{
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 1,
                  py: 10,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" fontWeight={500} mb={0.5}>
                  Nothing here yet
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={400}
                  color="text.secondary"
                  display="block"
                  mb={2.5}
                >
                  Be the first to share a tool with the community.
                </Typography>
                <OutlineButton
                  href={DISCUSS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LuPlus size={11} />}
                >
                  Share yours
                </OutlineButton>
              </Box>
            )}

            {(loading || resources.length > 0) && !error && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <CardSkeleton key={i} />
                    ))
                  : resources.map((r) => <ResourceCard key={r.url} r={r} />)}
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{ px: { xs: 2, md: 4 }, py: 3, textAlign: "center", mt: "auto" }}
        >
          <Typography variant="caption" fontWeight={400} color="text.disabled">
            Design inspired by{" "}
            <Box
              component="a"
              href="https://fumadocs.dev/showcase"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              fumadocs.dev/showcase
            </Box>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
