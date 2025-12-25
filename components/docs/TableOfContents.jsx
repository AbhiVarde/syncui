"use client";

import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { RxTextAlignLeft, RxStar, RxStarFilled } from "react-icons/rx";
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

const buttonStyles = {
  mt: 1,
  mx: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1.5,
  width: "100%",
  height: 40,
  borderRadius: "12px",
  color: "inherit",
  textDecoration: "none",
  bgcolor: (theme) => theme.palette.action.hover,
  border: "1px solid",
  borderColor: "divider",
  "&:hover": {
    bgcolor: (theme) => theme.palette.action.selected,
  },
};

export const TableOfContents = ({ toc = [] }) => {
  const { stars, loading } = useGitHub();
  const pathname = usePathname();

  const [activeId, setActiveId] = useState("");
  const [indicatorTop, setIndicatorTop] = useState(null);
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isStarHovered, setIsStarHovered] = useState(false);

  const itemRefs = useRef({});
  const tocIdsRef = useRef("");
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const isChangelogPage = pathname === "/docs/changelog";

  const minLevel = toc.length ? Math.min(...toc.map((item) => item.level)) : 1;

  const tocKey = toc.map((item) => item.id).join(",");

  const adLoadedRef = useRef(false);

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
      // console.log("🔄 Page Changed:", {
      //   from: tocIdsRef.current.substring(0, 30) + "...",
      //   to: tocKey.substring(0, 30) + "...",
      //   pathname,
      //   tocLength: toc.length,
      // });

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
          // console.log("✅ First item activated:", toc[0].id);
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
            component="a"
            href={COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              ...buttonStyles,
              background: "#FD0",
              color: "#000",
              fontWeight: 600,
              border: "1px solid #E6C200",
              boxShadow: "0 2px 8px rgba(255, 221, 0, 0.35)",
              "&:hover": {
                background: "#F2C800",
                boxShadow: "0 4px 12px rgba(255, 221, 0, 0.45)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              ☕
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              Buy Me a Coffee
            </Typography>
          </Box>

          <Box
            component="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsStarHovered(true)}
            onMouseLeave={() => setIsStarHovered(false)}
            sx={buttonStyles}
          >
            {!loading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <RiGithubFill size={20} />
                <Typography variant="body2" fontWeight={500}>
                  Star
                </Typography>
                <AnimatedCounter value={stars || 0} duration={2} />
                {isStarHovered ? (
                  <RxStarFilled size={18} color="#fbc02d" />
                ) : (
                  <RxStar size={18} />
                )}
              </Box>
            ) : (
              <>
                <RiGithubFill size={20} />
                <Typography variant="body2" fontWeight={500}>
                  Star
                </Typography>
              </>
            )}
          </Box>
        </>
      )}

      {/* AdSense Ad - Below Buttons */}
      <Box
        sx={{
          mt: 2,
          mx: 1,
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          minHeight: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            minHeight: "250px",
            width: "100%",
          }}
          data-ad-client="ca-pub-4873815556142919"
          data-ad-slot="1466125258"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Box>
    </Box>
  );
};
