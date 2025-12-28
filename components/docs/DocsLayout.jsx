import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { useRouter } from "next/router";
import { RxChevronRight, RxTextAlignLeft, RxChevronDown } from "react-icons/rx";
import LinkPreview from "../common/LinkPreview";
import { motion, AnimatePresence } from "motion/react";

const DocsLayout = ({ children, toc, docsTree }) => {
  const router = useRouter();
  const [activeId, setActiveId] = useState("");
  const [openCategories, setOpenCategories] = useState(() => new Set());
  const [activeUrl, setActiveUrl] = useState(router.asPath);

  const topPosition = 60;
  const heightCalc = "calc(100vh - 60px)";

  const getActiveCategory = (docsTree, path) => {
    const activeItem = docsTree.find((item) => item.url === path);
    return activeItem?.category || null;
  };

  useEffect(() => {
    const activeCategory = getActiveCategory(docsTree, router.asPath);

    if (!activeCategory) return;

    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.add(activeCategory);
      return next;
    });
  }, [router.asPath, docsTree]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  useEffect(() => {
    setActiveUrl(router.asPath);
  }, [router.asPath]);

  const renderBreadcrumbs = useCallback(() => {
    const activeTocItem = toc.find((item) => item.id === activeId);
    const activeText = activeTocItem ? activeTocItem.text : "";

    return (
      <Breadcrumbs
        separator={<RxChevronRight size={18} />}
        aria-label="breadcrumb"
        sx={{ mb: 2, display: { xs: "none", md: "flex", lg: "none" } }}
      >
        <Typography
          color="text.primary"
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
        >
          <RxTextAlignLeft size={20} />
          On this page
        </Typography>
        {activeText && (
          <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            {activeText}
          </Typography>
        )}
      </Breadcrumbs>
    );
  }, [toc, activeId]);

  const renderNavigationItem = useCallback(
    (item, isActive, isExternal = false) => {
      const isHighlighted = isActive || activeUrl === item.url;

      const content = (
        <Typography
          component="span"
          variant="caption"
          sx={{
            mb: 0.5,
            px: 1.2,
            py: 0.8,
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: isHighlighted ? "text.primary" : "text.secondary",
            letterSpacing: 0.2,
            borderRadius: 1.2,
            fontWeight: 400,
            textShadow: isHighlighted
              ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
              : "none",
            transition: "color 0.15s ease, background-color 0.15s ease",
            "&:hover": {
              bgcolor: "action.hover",
              color: "text.primary",
            },
            ...(isHighlighted && {
              bgcolor: "action.hover",
            }),
          }}
        >
          <span>{item.title}</span>
          {(item.title === "Skeletons" || item.title === "Time Pickers") && (
            <Box
              component="span"
              sx={{
                ml: 1,
                px: 0.8,
                py: 0.2,
                bgcolor: "#008080",
                color: "#ffffff",
                borderRadius: "10px",
                fontSize: "0.65rem",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "0.02em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              New
            </Box>
          )}
        </Typography>
      );

      if (isExternal) {
        return (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            {content}
          </a>
        );
      }

      return (
        <Link key={item.url} href={item.url} scroll={false}>
          {content}
        </Link>
      );
    },
    [activeUrl]
  );

  const renderCollapsibleCategory = useCallback(
    (category, items) => {
      const isOpen = openCategories.has(category);

      return (
        <>
          <Box
            onClick={() =>
              setOpenCategories((prev) => {
                const next = new Set(prev);
                next.has(category) ? next.delete(category) : next.add(category);
                return next;
              })
            }
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              mb: 1,
              userSelect: "none",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              {category}
            </Typography>

            <motion.div
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.15 }}
            >
              <RxChevronDown size={16} />
            </motion.div>
          </Box>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                transition={{
                  duration: 0.18,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  display: "grid",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ overflow: "hidden" }}>
                  {items.map((item) =>
                    renderNavigationItem(
                      item,
                      router.asPath === item.url,
                      category === "Templates"
                    )
                  )}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    },
    [openCategories, router.asPath, renderNavigationItem]
  );

  const groupedDocsTree = useMemo(() => groupDocsTree(docsTree), [docsTree]);

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box
        component="nav"
        sx={{
          width: 260,
          flexShrink: 0,
          height: heightCalc,
          position: "fixed",
          top: topPosition,
          left: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            borderRight: "1.5px dashed",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              height: "calc(100% - 60px)",
              overflowY: "auto",
              p: 2,
            }}
          >
            <nav>
              {Object.entries(groupedDocsTree).map(([category, items]) => (
                <Box key={category} sx={{ mb: 2 }}>
                  {["Components", "Templates"].includes(category) ? (
                    renderCollapsibleCategory(category, items)
                  ) : (
                    <>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "0.8rem", fontWeight: 500, mb: 1 }}
                      >
                        {category}
                      </Typography>
                      <Box>
                        {items.map((item) =>
                          renderNavigationItem(
                            item,
                            router.asPath === item.url ||
                              (item.title === "Setup" &&
                                router.asPath === "/docs")
                          )
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              ))}
            </nav>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: "1.5px dashed",
              borderColor: "divider",
              p: 1.5,
              bgcolor: "background.default",
            }}
          >
            <Typography variant="caption">
              Brought to you by{" "}
              <LinkPreview url="https://abhivarde.in" placement="top">
                abhivarde.in
              </LinkPreview>
              .
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          overflowY: "hidden",
          overflowX: "auto",
          flexGrow: 1,
          py: 3,
          px: { lg: 3, xs: 2 },
          ml: { md: "260px" },
          mr: { lg: "260px" },
          mt: { xs: 3, md: 0 },
        }}
      >
        {renderBreadcrumbs()}
        <Box>{children}</Box>
      </Box>

      <Box
        sx={{
          width: 260,
          flexShrink: 0,
          position: "fixed",
          top: topPosition,
          height: heightCalc,
          right: 0,
          overflowY: "auto",
          display: { xs: "none", lg: "block" },
        }}
      >
        <TableOfContents toc={toc} />
      </Box>
    </Box>
  );
};

const groupDocsTree = (docsTree) => {
  const grouped = new Map([
    ["Getting Started", []],
    ["Templates", []],
    // ["Blocks", []],
    ["Components", []],
  ]);

  docsTree.forEach((item) => {
    if (item.category === "Components") {
      grouped.get("Components").push(item);
    } /* else if (item.category === "Blocks") {
      grouped.get("Blocks").push(item);
    } */ else {
      grouped.get("Getting Started").push(item);
    }
  });

  grouped.get("Templates").push(
    {
      title: "Startup",
      url: "https://abhivarde.gumroad.com/l/startup-template-syncui",
      slug: "startup-template",
    },
    {
      title: "SaaS",
      url: "https://abhivarde.gumroad.com/l/saas-template-syncui",
      slug: "saas-template",
    },
    {
      title: "Portfolio",
      url: "https://abhivarde.gumroad.com/l/portfolio-template-syncui",
      slug: "portfolio-template",
    }
  );

  grouped.get("Getting Started").sort((a, b) => {
    const order = {
      Setup: 1,
      Changelog: 2,
      "The Story of Sync UI": 3,
    };
    return (order[a.title] || 99) - (order[b.title] || 99);
  });

  return Object.fromEntries(grouped);
};

export default DocsLayout;
