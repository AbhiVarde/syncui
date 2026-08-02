import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "motion/react";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

const TOP_OFFSET = 60;
const HEIGHT_CALC = "calc(100vh - 60px)";
const COLLAPSIBLE_CATEGORIES = ["Components", "Blocks", "Charts", "Templates"];
const CATEGORY_ORDER = [
  "Getting Started",
  "Components",
  "Blocks",
  "Charts",
  "Templates",
];

const groupDocsTree = (docsTree) => {
  const grouped = new Map(CATEGORY_ORDER.map((category) => [category, []]));

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
    },
  );

  return Object.fromEntries(grouped);
};

const getActiveCategory = (docsTree, path) =>
  docsTree.find((item) => item.url === path)?.category || null;

const DocsLayout = ({ children, toc, docsTree }) => {
  const router = useRouter();
  const [openCategory, setOpenCategory] = useState(null);
  const [activeUrl, setActiveUrl] = useState(router.asPath);

  useEffect(() => {
    const activeCategory = getActiveCategory(docsTree, router.asPath);
    if (activeCategory && COLLAPSIBLE_CATEGORIES.includes(activeCategory)) {
      setOpenCategory(activeCategory);
    }
  }, [router.asPath, docsTree]);

  useEffect(() => {
    setActiveUrl(router.asPath);
  }, [router.asPath]);

  const toggleCategory = useCallback((category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  }, []);

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
            ...(isHighlighted && { bgcolor: "action.hover" }),
          }}
        >
          {item.title}
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
    [activeUrl, router.asPath],
  );

  const renderCollapsibleCategory = useCallback(
    (category, items) => {
      const isOpen = openCategory === category;

      return (
        <>
          <Box
            onClick={() => toggleCategory(category)}
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
                <Box
                  sx={{
                    overflow: "hidden",
                    maxHeight: 280,
                    overflowY: items.length > 8 ? "auto" : "visible",
                    pr: items.length > 8 ? 0.5 : 0,
                    "&::-webkit-scrollbar": { width: 4 },
                    "&::-webkit-scrollbar-track": { background: "transparent" },
                    "&::-webkit-scrollbar-thumb": {
                      background: "rgba(128,128,128,0.3)",
                      borderRadius: 1,
                    },
                  }}
                >
                  {items.map((item) =>
                    renderNavigationItem(
                      item,
                      router.asPath === item.url,
                      category === "Templates",
                    ),
                  )}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    },
    [openCategory, router.asPath, renderNavigationItem, toggleCategory],
  );

  const groupedDocsTree = useMemo(() => groupDocsTree(docsTree), [docsTree]);

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box
        component="nav"
        sx={{
          width: 260,
          height: HEIGHT_CALC,
          position: "fixed",
          top: TOP_OFFSET,
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
            {CATEGORY_ORDER.map((category) => {
              const items = groupedDocsTree[category] || [];
              if (items.length === 0) return null;

              return (
                <Box key={category} sx={{ mb: 2 }}>
                  {COLLAPSIBLE_CATEGORIES.includes(category) ? (
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
                            (item.title === "Setup" &&
                              router.asPath === "/docs"),
                        ),
                      )}
                    </>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { lg: 3, xs: 2 },
          ml: { lg: "260px" },
          mr: { lg: "260px" },
          mt: { xs: 3, lg: 0 },
          maxWidth: "100%",
        }}
      >
        {children}
      </Box>

      <Box
        sx={{
          width: 260,
          position: "fixed",
          top: TOP_OFFSET,
          height: HEIGHT_CALC,
          right: 0,
          display: { xs: "none", lg: "block" },
        }}
      >
        <TableOfContents toc={toc} />
      </Box>
    </Box>
  );
};

export default DocsLayout;
