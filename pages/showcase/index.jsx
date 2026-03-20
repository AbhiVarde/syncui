"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  Skeleton,
} from "@mui/material";

import { LuPlus, LuHeart } from "react-icons/lu";
import Head from "next/head";

const RESOURCES = [
  // { id: 1, name: "Sync UI", url: "https://syncui.design", sponsored: false },
];

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function useOgImage(url) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;
    fetch(`/api/og-image?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((data) => setImg(data.image ?? null))
      .catch(() => setImg(null))
      .finally(() => setLoading(false));
  }, [url]);

  return { img, loading };
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
        opacity: { xs: 0.08, md: 1 },
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

function ResourceCard({ r, isDark }) {
  const { img } = useOgImage(r.url);
  const domain = getDomain(r.url);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Box
      onClick={() => window.open(r.url, "_blank")}
      sx={{
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 172,
          bgcolor: isDark ? "#111" : "#f0f0f0",
        }}
      >
        {r.sponsored && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 2,
              bgcolor: isDark ? "#fff" : "#000",
              color: isDark ? "#000" : "#fff",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              px: 0.75,
              py: 0.2,
              borderRadius: 1,
            }}
          >
            SPONSORED
          </Box>
        )}

        {img ? (
          <>
            <img
              src={img}
              alt=""
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(20px)",
                transform: "scale(1.1)",
                opacity: isLoaded ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            />
            <img
              src={img}
              alt={r.name}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.4s ease",
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
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" fontWeight={500}>
          {r.name}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ShowcasePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [resources] = useState(RESOURCES);
  const sorted = useMemo(() => [...resources], [resources]);
  const discussUrl = "https://github.com/AbhiVarde/syncui/discussions/4";

  const btn = (extra = {}) => ({
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 1,
    px: 1.5,
    py: 0.45,
    minHeight: 0,
    lineHeight: 1.6,
    fontSize: "inherit",
    boxShadow: "none",
    "&:hover": { bgcolor: "transparent" },
    ...extra,
  });

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
      <Container maxWidth="xl" sx={{ px: "0px !important" }}>
        <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 5 } }}>
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
            <Box sx={{ position: "relative", zIndex: 1, maxWidth: 400 }}>
              <Typography
                variant="h5"
                fontWeight={600}
                letterSpacing="-0.03em"
                mb={1}
              >
                Built by developers, for developers.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={400}
                lineHeight={1.7}
                mb={2.5}
              >
                A curated list of tools, libraries and open source projects
                shared by the Sync UI community. Ship something worth sharing.
              </Typography>
              <Stack direction="row" gap={0.75}>
                <Button
                  component="a"
                  href={discussUrl}
                  target="_blank"
                  startIcon={<LuPlus size={12} />}
                  sx={btn({
                    border: "1px solid",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(0,0,0,0.18)",
                    color: "text.primary",
                  })}
                >
                  Share yours
                </Button>
                <Button
                  component="a"
                  href="https://github.com/sponsors/AbhiVarde"
                  target="_blank"
                  startIcon={<LuHeart size={12} />}
                  sx={btn({
                    border: "1px solid",
                    borderColor: "divider",
                    color: "text.secondary",
                  })}
                >
                  Sponsor
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          {sorted.length === 0 ? (
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
                color="text.secondary"
                display="block"
                mb={2.5}
              >
                Be the first to share a tool with the community
              </Typography>
              <Button
                component="a"
                href={discussUrl}
                target="_blank"
                startIcon={<LuPlus size={12} />}
                sx={btn({
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.secondary",
                })}
              >
                Share yours
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                  lg: "repeat(4,1fr)",
                },
                gap: 2,
              }}
            >
              {sorted.map((r) => (
                <ResourceCard key={r.id} r={r} isDark={isDark} />
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, pb: 4, textAlign: "center" }}>
          <Typography variant="caption" color="text.disabled">
            Design inspired by{" "}
            <Box
              component="a"
              href="https://fumadocs.dev/showcase"
              target="_blank"
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
