import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "motion/react";
import LinkPreview from "../common/LinkPreview";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

const DocsLayout = ({ children, toc, docsTree }) => {
  const router = useRouter();
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
    setActiveUrl(router.asPath);
  }, [router.asPath]);

  const renderNavigationItem = useCallback(
    (item, isActive, isExternal = false) => {
      const isInstallationActive =
        router.asPath.startsWith("/docs/installation") &&
        item.url === "/docs/installation";

      const isHighlighted =
        isActive || activeUrl === item.url || isInstallationActive;

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
    [activeUrl, router.asPath]
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
              <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
            </motion.div>
          </Box>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "grid", overflow: "hidden" }}
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
      {/* Left nav */}
      <Box
        component="nav"
        sx={{
          width: 260,
          height: heightCalc,
          position: "fixed",
          top: topPosition,
          display: { xs: "none", lg: "block" },
        }}
      >
        <Box
          sx={{
            height: "100%",
            borderRight: "1.5px dashed",
            borderColor: "divider",
          }}
        >
          <Box sx={{ height: "calc(100% - 60px)", overflowY: "auto", p: 2 }}>
            {Object.entries(groupedDocsTree).map(([category, items]) => (
              <Box key={category} sx={{ mb: 2 }}>
                {["Components", "Blocks", "Templates"].includes(category) ? (
                  renderCollapsibleCategory(category, items)
                ) : (
                  <>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8rem", fontWeight: 500, mb: 1 }}
                    >
                      {category}
                    </Typography>
                    {items.map((item) =>
                      renderNavigationItem(
                        item,
                        router.asPath === item.url ||
                          (item.title === "Setup" && router.asPath === "/docs")
                      )
                    )}
                  </>
                )}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1.5px dashed",
              borderColor: "divider",
              p: 1.5,
            }}
          >
            <Typography variant="caption">
              Brought to you by{" "}
              <LinkPreview url="https://abhivarde.in">abhivarde.in</LinkPreview>
              .
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { lg: 3, xs: 2 },
          ml: { lg: "260px" },
          mr: { lg: "260px" },
        }}
      >
        {children}
      </Box>

      {/* TOC */}
      <Box
        sx={{
          width: 260,
          position: "fixed",
          top: topPosition,
          height: heightCalc,
          right: 0,
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
    ["Blocks", []],
    ["Components", []],
  ]);

  docsTree.forEach((item) => {
    grouped.get(item.category)?.push(item);
  });

  grouped.get("Templates").push(
    {
      title: "Startup",
      url: "https://abhivarde.gumroad.com/l/startup-template-syncui",
    },
    {
      title: "SaaS",
      url: "https://abhivarde.gumroad.com/l/saas-template-syncui",
    },
    {
      title: "Portfolio",
      url: "https://abhivarde.gumroad.com/l/portfolio-template-syncui",
    }
  );

  return Object.fromEntries(grouped);
};

export default DocsLayout;
