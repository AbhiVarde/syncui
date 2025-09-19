import React, { useState, useEffect } from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { useRouter } from "next/router";
import { RxChevronRight, RxTextAlignLeft } from "react-icons/rx";
import LinkPreview from "../common/LinkPreview";

const DocsLayout = ({ children, toc, docsTree }) => {
  const router = useRouter();
  const [activeId, setActiveId] = useState("");

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
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
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
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {activeText}
          </Typography>
        )}
      </Breadcrumbs>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
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
          {/* Scrollable content container */}
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
                  <Box key={category}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        letterSpacing: 0.5,
                      }}
                    >
                      {category}
                    </Typography>
                    <Box sx={{ my: 1 }}>
                      {items.map((item) => {
                        const isActive =
                          (item.title === "Setup" &&
                            router.asPath === "/docs") ||
                          (item.title === "Changelog" &&
                            router.asPath === "/docs/changelog") ||
                          (item.title === "Templates" &&
                            router.asPath === "/templates") ||
                          router.asPath === item.url;
                        return (
                          <Link
                            key={item.url}
                            href={item.url}
                            passHref
                            legacyBehavior
                          >
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
                                color: isActive
                                  ? "text.primary"
                                  : "text.secondary",
                                letterSpacing: 0.2,
                                borderRadius: 0.75,
                                transition: "all 0.15s ease-in-out",
                                fontWeight: isActive ? 500 : 400,
                                "&:hover": {
                                  bgcolor: "background.paper",
                                  color: "text.primary",
                                },
                                ...(isActive && {
                                  bgcolor: "background.paper",
                                  boxShadow: (theme) =>
                                    `0 0 0 1px ${theme.palette.divider}`,
                                }),
                              }}
                            >
                              <span>
                                {item.title === "Setup" ? "Setup" : item.title}
                              </span>
                              {(item.title === "Forms" ||
                                item.title === "Autocompletes" ||
                                item.title === "Text Fields" ||
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
                      })}
                    </Box>
                  </Box>
                )
              )}
            </nav>
          </Box>
          {/* Fixed footer */}
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
          overflow: "auto",
          flexGrow: 1,
          py: 3,
          px: { lg: 3, xs: 2 },
          ml: { md: "260px" },
          mr: { lg: "260px" },
          mt: {
            xs: 3,
            md: 0,
          },
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
  };

  // Add Templates to the Getting Started section
  grouped["Getting Started"].push({
    title: "Templates",
    url: "/templates",
    slug: "templates",
  });

  docsTree.forEach((item) => {
    if (item.title === "Setup" || item.title === "Changelog") {
      grouped["Getting Started"].push(item);
    } else {
      if (!grouped["Components"]) {
        grouped["Components"] = [];
      }
      grouped["Components"].push(item);
    }
  });

  grouped["Getting Started"].sort((a, b) => {
    const order = { Setup: 1, Changelog: 2, Templates: 3 };
    return (order[a.title] || 99) - (order[b.title] || 99);
  });

  return grouped;
};

export default DocsLayout;
