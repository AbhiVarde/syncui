"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  Skeleton,
} from "@mui/material";
import {
  LuPlus,
  LuHeart,
  LuRefreshCw,
  LuStar,
  LuArrowUpRight,
} from "react-icons/lu";
import { motion } from "motion/react";
import Head from "next/head";
import { getAllDocsSlugs } from "@/lib/docs";

const DISCUSS_URL = "https://github.com/AbhiVarde/syncui/discussions/4";
const SPONSOR_URL = "https://github.com/sponsors/AbhiVarde";
const REF = "syncui";
const SKIP_REF_HOSTS = ["github.com"];

function parseDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function withRef(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (SKIP_REF_HOSTS.includes(host)) return url;
    if (!u.searchParams.has("ref")) u.searchParams.set("ref", REF);
    return u.toString();
  } catch {
    return url;
  }
}

function cleanTitle(raw) {
  if (!raw) return null;
  const cleaned = raw
    .replace(/\s*:\s+.+$/, "")
    .replace(/\s+[-\u2013\u2014|]\s+.+$/, "")
    .replace(/\s+\/\/\s+.+$/, "")
    .trim();
  const lower = cleaned.toLowerCase();
  if (
    !cleaned ||
    lower.includes("attention required") ||
    lower.includes("just a moment") ||
    lower.includes("access denied")
  ) {
    return null;
  }
  return cleaned;
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

function CardSkeleton() {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Skeleton
        variant="rounded"
        height={180}
        animation="wave"
        sx={{ bgcolor: "action.hover", borderRadius: 2 }}
      />
      <Box sx={{ px: 0.5, display: "flex", alignItems: "center" }}>
        <Skeleton
          width="55%"
          height={28}
          animation="wave"
          sx={{ bgcolor: "action.hover" }}
        />
      </Box>
    </Box>
  );
}

function ResourceCard({ r, index }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const domain = parseDomain(r.url);
  const title = cleanTitle(r.name) || domain;

  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showImage = r.image && !imgError;

  return (
    <Box
      component={motion.a}
      href={withRef(r.url)}
      target="_blank"
      rel="noopener"
      aria-label={`Open ${title}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.28,
        ease: "easeOut",
        delay: (index % 2) * 0.05,
      }}
      sx={{
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "transparent",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderColor: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
        },
        "&:hover .icon": { transform: "rotate(45deg)" },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "text.primary",
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 180,
          overflow: "hidden",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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

        {showImage && (
          <img
            src={r.image}
            alt=""
            onLoad={() => setLoaded(true)}
            onError={() => setImgError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />
        )}

        {(!showImage || !loaded) && (
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ fontFamily: "monospace", px: 2, textAlign: "center" }}
          >
            {domain}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          px: 0.5,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={500}
          noWrap
          sx={{ minWidth: 0, flex: 1 }}
        >
          {title}
        </Typography>
        <Box
          className="icon"
          sx={{
            display: "inline-flex",
            flexShrink: 0,
            color: "text.primary",
            transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
            transformOrigin: "center",
          }}
        >
          <LuArrowUpRight size={20} />
        </Box>
      </Box>
    </Box>
  );
}

function StateBox({ title, message, children }) {
  return (
    <Box
      sx={{
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 3,
        py: 10,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" fontWeight={500} mb={0.5}>
        {title}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        mb={2.5}
      >
        {message}
      </Typography>
      {children}
    </Box>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export default function ShowcasePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback((signal) => {
    setLoading(true);
    setError(false);
    fetch("/api/showcase-resources", { signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setResources(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const ogImage = `https://ui.abhivarde.in/api/og?title=${encodeURIComponent("Developer Showcase")}&type=Showcase`;

  const stripes = isDark
    ? "repeating-linear-gradient(-60deg, transparent 0px, transparent 9px, rgba(255,255,255,0.12) 9px, rgba(255,255,255,0.12) 10px)"
    : "repeating-linear-gradient(-60deg, transparent 0px, transparent 9px, rgba(0,0,0,0.08) 9px, rgba(0,0,0,0.08) 10px)";

  return (
    <>
      <Head>
        <title>Showcase // Sync UI</title>
        <meta
          name="description"
          content="Explore projects, tools, and libraries shared by the Sync UI community. Discover what developers are building with MUI and Motion."
        />
        <link rel="canonical" href="https://ui.abhivarde.in/showcase" />
        <meta
          name="keywords"
          content="developer showcase, UI tools, web projects, open source showcase, developer tools, Sync UI community, MUI projects, Motion projects"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ui.abhivarde.in/showcase" />
        <meta property="og:site_name" content="Sync UI" />
        <meta property="og:title" content="Developer Showcase | Sync UI" />
        <meta
          property="og:description"
          content="Explore projects, tools, and libraries shared by the Sync UI community."
        />
        <meta key="og-image" property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sync UI Developer Showcase" />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@syncuidesign" />
        <meta name="twitter:creator" content="@abhivarde" />
        <meta name="twitter:title" content="Developer Showcase | Sync UI" />
        <meta
          name="twitter:description"
          content="Explore projects, tools, and libraries shared by the Sync UI community."
        />
        <meta key="tw-image" name="twitter:image" content={ogImage} />
      </Head>

      <Container maxWidth="xl" sx={{ px: "0px !important" }}>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 280,
            backgroundColor: "background.default",
            backgroundImage: stripes,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: isDark
                ? "rgba(0,0,0,0.35)"
                : "rgba(255,255,255,0.25)",
            }}
          />

          <Container
            maxWidth="md"
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
              mx: 2,
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                component={motion.div}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <Button
                  disableRipple
                  sx={{
                    px: 2,
                    py: 0.5,
                    minHeight: 32,
                    borderRadius: "12px",
                    fontWeight: 500,
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    textTransform: "none",
                    color: "text.primary",
                    pointerEvents: "none",
                    "&:hover": { backgroundColor: "background.paper" },
                  }}
                >
                  Sync UI Showcase
                </Button>
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
                  component={motion.div}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.12 }}
                >
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    Built by developers, for developers.
                  </Typography>
                </Box>

                <Box
                  component={motion.div}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.18 }}
                >
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      fontWeight: 400,
                      color: "text.secondary",
                      lineHeight: 1.6,
                      mx: "auto",
                    }}
                  >
                    Tools, libraries, and projects shared by the Sync UI
                    community.
                  </Typography>
                </Box>
              </Box>

              <Box
                component={motion.div}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.24 }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <OutlineButton
                    href={DISCUSS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LuPlus size={12} />}
                  >
                    Share yours
                  </OutlineButton>

                  <OutlineButton
                    href={SPONSOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LuHeart size={12} />}
                  >
                    Sponsor
                  </OutlineButton>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>

      <Container
        maxWidth="md"
        sx={{
          px: { lg: 0 },
          py: 5,
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 344px)",
        }}
      >
        <Box sx={{ flex: 1 }}>
          {error && !loading && (
            <StateBox
              title="Could not load resources"
              message="Something went wrong. Please try again."
            >
              <OutlineButton
                onClick={() => load()}
                startIcon={<LuRefreshCw size={11} />}
              >
                Try again
              </OutlineButton>
            </StateBox>
          )}

          {!loading && !error && resources.length === 0 && (
            <StateBox
              title="Nothing here yet"
              message="Be the first to share a tool with the community."
            >
              <OutlineButton
                href={DISCUSS_URL}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LuPlus size={11} />}
              >
                Share yours
              </OutlineButton>
            </StateBox>
          )}

          {(loading || resources.length > 0) && !error && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: { xs: 3, sm: 4, md: 5 },
              }}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i} />
                  ))
                : resources.map((r, i) => (
                    <ResourceCard key={r.url} r={r} index={i} />
                  ))}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const docsTree = await getAllDocsSlugs();
  return {
    props: { docsTree },
  };
}
