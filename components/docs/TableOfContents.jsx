"use client";

import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { RxTextAlignLeft, RxChevronRight } from "react-icons/rx";
import { RiGithubFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import {
  GITHUB_URL,
  COFFEE_URL,
  ADSENSE_CLIENT,
  ADSENSE_SLOT,
} from "../../utils/constants";
import { useGitHub } from "@/context/GithubContext";
import AnimatedCounter from "../AnimatedCounter";

const SCROLL_OFFSET = 80;

export const TableOfContents = ({ toc = [] }) => {
  const { stars, loading } = useGitHub();
  const pathname = usePathname();

  const [activeId, setActiveId] = useState("");
  const [indicatorTop, setIndicatorTop] = useState(null);

  const itemRefs = useRef({});
  const tocIdsRef = useRef("");
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const adLoadedRef = useRef(false);

  const isChangelogPage = pathname === "/docs/changelog";
  const minLevel = toc.length ? Math.min(...toc.map((item) => item.level)) : 1;
  const tocKey = toc.map((item) => item.id).join(",");

  useEffect(() => {
    if (!adLoadedRef.current) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      adLoadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    try {
      if (window.adsbygoogle && !isChangelogPage) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [isChangelogPage, pathname]);

  useEffect(() => {
    if (tocIdsRef.current !== tocKey) {
      isClickScrollingRef.current = false;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      setActiveId("");
      setIndicatorTop(null);
      tocIdsRef.current = tocKey;

      window.scrollTo({ top: 0, behavior: "instant" });

      setTimeout(() => {
        if (toc.length > 0) {
          setActiveId(toc[0].id);
        }
      }, 150);
    }
  }, [tocKey, pathname, toc]);

  useEffect(() => {
    if (!toc.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66% 0px",
        threshold: 0.1,
      }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    if (toc.length > 0) {
      const firstElement = document.getElementById(toc[0].id);
      if (firstElement) {
        const rect = firstElement.getBoundingClientRect();
        if (rect.top < 200) {
          setActiveId(toc[0].id);
        }
      }
    }

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      if (window.scrollY < 100 && toc.length > 0) {
        setActiveId(toc[0].id);
        return;
      }

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (scrolledToBottom && toc.length > 0) {
        setActiveId(toc[toc.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc]);

  useEffect(() => {
    if (!activeId) {
      setIndicatorTop(null);
      return;
    }

    const updateIndicatorPosition = () => {
      const item = itemRefs.current[activeId];
      if (!item) return;

      const text = item.firstElementChild;
      if (!text) return;

      const itemRect = item.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      const offset = textRect.top - itemRect.top + textRect.height / 2;
      const newTop = item.offsetTop + offset;

      setIndicatorTop(newTop);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(updateIndicatorPosition, 50);
      });
    });
  }, [activeId, tocKey]);

  const handleClick = (e, id) => {
    e.preventDefault();

    isClickScrollingRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - SCROLL_OFFSET;

      setActiveId(id);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 1000);
    }
  };

  if (!toc.length) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="body2"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "0.8rem",
          fontWeight: 500,
        }}
        gutterBottom
      >
        <RxTextAlignLeft size={18} />
        On this page
      </Typography>

      <Box sx={{ position: "relative", pl: 2 }}>
        <Box
          sx={{
            position: "absolute",
            left: 6,
            top: 6,
            bottom: 6,
            borderLeft: "1.5px dashed",
            borderColor: "divider",
          }}
        />

        {indicatorTop !== null && (
          <Box
            sx={{
              position: "absolute",
              left: 6.75,
              top: indicatorTop - 9,
              width: 3,
              height: 18,
              borderRadius: "999px",
              bgcolor: "text.primary",
              transform: "translateX(-50%)",
              transition: "top 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        )}

        <List dense sx={{ pl: 0 }}>
          {toc.map((item) => (
            <ListItem
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              component="a"
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              sx={{
                pl: (item.level - minLevel) * 0.75 + 2,
                py: 0,
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <Typography
                variant="caption"
                color={activeId === item.id ? "text.primary" : "text.secondary"}
                sx={{
                  fontWeight: 400,
                  textShadow:
                    activeId === item.id ? "0 0 0.6px currentColor" : "none",
                  my: 0.5,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.text.split("–")[0].trim()}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {!isChangelogPage && (
        <>
          <Box
            sx={{
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 2,
            }}
          >
            <Box
              component="a"
              href={COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 0,
                py: 0.25,
                fontSize: "0.875rem",
                fontWeight: 500,
                fontFamily: "inherit",
                color: "text.primary",
                textDecoration: "none",
                cursor: "pointer",
                width: "fit-content",

                "&:hover .chevron": {
                  transform: "translateX(4px)",
                },

                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                  borderRadius: 1,
                },
              }}
            >
              ☕ Buy me a coffee
              <Box
                className="chevron"
                sx={{
                  display: "inline-flex",
                  transition: "transform 0.18s ease",
                }}
              >
                <RxChevronRight size={14} />
              </Box>
            </Box>

            <Box
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 0,
                py: 0.25,
                fontSize: "0.875rem",
                fontWeight: 500,
                fontFamily: "inherit",
                color: "text.primary",
                textDecoration: "none",
                cursor: "pointer",
                width: "fit-content",

                "&:hover .chevron": {
                  transform: "translateX(4px)",
                },

                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                  borderRadius: 1,
                },
              }}
            >
              <RiGithubFill size={16} />
              Star
              {!loading && (
                <Box component="span" sx={{ fontWeight: 500 }}>
                  <AnimatedCounter value={stars || 0} duration={1.4} />
                </Box>
              )}
              <Box
                className="chevron"
                sx={{
                  display: "inline-flex",
                  transition: "transform 0.18s ease",
                }}
              >
                <RxChevronRight size={14} />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 2,
              mx: 1,
              borderRadius: "12px",
              border: "1px solid",
              borderColor: "divider",
              maxHeight: 300,
              overflow: "hidden",
              position: "relative",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(0,0,0,0.02)",
            }}
          >
            <ins
              className="adsbygoogle"
              style={{
                display: "block",
                width: "100%",
              }}
              data-ad-client={ADSENSE_CLIENT}
              data-ad-slot={ADSENSE_SLOT}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </Box>
        </>
      )}
    </Box>
  );
};
