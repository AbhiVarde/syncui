import React, { useState, useEffect } from "react";
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
  const [isComponentsOpen, setIsComponentsOpen] = useState(true);

  const topPosition = 60;
  const heightCalc = "calc(100vh - 60px)";

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

  const renderBreadcrumbs = () => {
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
  };

  const renderNavigationItem = (item, isActive) => (
    <Link key={item.url} href={item.url} passHref legacyBehavior>
      <Typography
        component="a"
        variant="caption"
        sx={{
          mb: 0.5,
          px: 1.2,
          py: 0.8,
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: isActive ? "text.primary" : "text.secondary",
          letterSpacing: 0.2,
          borderRadius: 1.2,
          fontWeight: 400,
          textShadow: isActive
            ? "0 0 0.6px currentColor, 0 0 0.6px currentColor"
            : "none",
          border: "1px solid transparent",
          transition:
            "background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease",
          "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
          },
          ...(isActive && {
            bgcolor: "action.hover",
            borderColor: "divider",
          }),
        }}
      >
        <span>{item.title}</span>
        {(item.title === "Time Pickers" ||
          item.title === "Date Pickers" ||
          item.title === "Autocompletes" ||
          item.title === "Templates") && (
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
    </Link>
  );

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
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
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
              {Object.entries(groupDocsTree(docsTree)).map(
                ([category, items]) => (
                  <Box key={category} sx={{ mb: 2 }}>
                    {category === "Components" ? (
                      <>
                        <Box
                          onClick={() => setIsComponentsOpen(!isComponentsOpen)}
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
                            sx={{
                              fontSize: "0.8rem",
                              fontWeight: 500,
                              letterSpacing: 0.5,
                            }}
                          >
                            {category}
                          </Typography>
                          <motion.div
                            animate={{ rotate: isComponentsOpen ? 0 : -90 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                          >
                            <RxChevronDown size={16} />
                          </motion.div>
                        </Box>
                        <AnimatePresence initial={false}>
                          {isComponentsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.25,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <Box>
                                {items.map((item) => {
                                  const isActive = router.asPath === item.url;
                                  return renderNavigationItem(item, isActive);
                                })}
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            letterSpacing: 0.5,
                            mb: 1,
                          }}
                        >
                          {category}
                        </Typography>
                        <Box>
                          {items.map((item) => {
                            const isActive = router.asPath === item.url;
                            return renderNavigationItem(item, isActive);
                          })}
                        </Box>
                      </>
                    )}
                  </Box>
                )
              )}
            </nav>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
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
  const grouped = {
    "Getting Started": [],
    Components: [],
  };

  docsTree.forEach((item) => {
    if (item.category === "Components") {
      grouped["Components"].push(item);
    } else {
      grouped["Getting Started"].push(item);
    }
  });

  grouped["Getting Started"].push({
    title: "Templates",
    url: "/templates",
    slug: "templates",
  });

  grouped["Getting Started"].sort((a, b) => {
    const order = {
      Setup: 1,
      Changelog: 2,
      Templates: 3,
      "The Story of Sync UI": 4,
    };
    return (order[a.title] || 99) - (order[b.title] || 99);
  });

  return grouped;
};

export default DocsLayout;
