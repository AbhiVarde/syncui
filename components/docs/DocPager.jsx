import React, { useMemo } from "react";
import {
  Box,
  ButtonBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import Link from "next/link";

const PagerButton = ({ direction, page }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Link href={page ? page.url : "#"} passHref legacyBehavior>
      <ButtonBase
        disabled={!page}
        sx={{
          justifyContent: direction === "next" ? "flex-end" : "flex-start",
          textAlign: direction === "next" ? "right" : "left",
          p: isMobile ? 1 : 2,
          height: "100%",
          width: "100%",
          bgcolor: "background.paper",
          color: page ? "text.primary" : "text.disabled",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          "&:hover": {
            bgcolor: page ? "action.hover" : "background.paper",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {isMobile ? (
            <Typography
              variant="body1"
              display="block"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {direction === "prev" && <RxChevronLeft />}
              {direction === "prev" ? "Previous" : "Next"}
              {direction === "next" && <RxChevronRight />}
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: direction === "prev" ? "flex-start" : "flex-end",
              }}
            >
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {direction === "prev" && <RxChevronLeft />}
                {direction === "prev" ? "Previous" : "Next"}
                {direction === "next" && <RxChevronRight />}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {page ? page.title : "No page"}
              </Typography>
            </Box>
          )}
        </Box>
      </ButtonBase>
    </Link>
  );
};

const findAdjacentPages = (docsTree, currentSlug) => {
  const flatTree = flattenTree(docsTree);
  const currentIndex = flatTree.findIndex(
    (item) => item.url === `/docs${currentSlug ? `/${currentSlug}` : ""}`
  );

  let prevPage = null;
  let nextPage = null;

  if (currentIndex > 0) {
    prevPage = flatTree[currentIndex - 1];
  }

  if (currentIndex < flatTree.length - 1) {
    nextPage = flatTree[currentIndex + 1];
  }

  return { prevPage, nextPage };
};

const flattenTree = (tree) => {
  const flattenedTree = [];

  // Add Setup page
  const setupPage = tree.find((node) => node.title === "Setup");
  if (setupPage) {
    flattenedTree.push({ title: "Setup", url: "/docs" });
  }

  // Add Changelog page
  const changelogPage = tree.find((node) => node.title === "Changelog");
  if (changelogPage) {
    flattenedTree.push({ title: "Changelog", url: "/docs/changelog" });
  }

  // Add all other pages
  tree.forEach((node) => {
    if (node.title !== "Setup" && node.title !== "Changelog") {
      if (!node.children) {
        flattenedTree.push({
          title: node.title,
          url: `/docs/${
            node.slug || node.title.toLowerCase().replace(/\s+/g, "-")
          }`,
        });
      } else {
        node.children.forEach((child) => {
          flattenedTree.push({
            title: child.title,
            url: `/docs/${
              child.slug || child.title.toLowerCase().replace(/\s+/g, "-")
            }`,
          });
        });
      }
    }
  });

  return flattenedTree;
};

export const DocPager = ({ slug, docsTree }) => {
  const { prevPage, nextPage } = useMemo(
    () => findAdjacentPages(docsTree, slug),
    [docsTree, slug]
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      mt={4}
      gap={2}
    >
      <Box width="50%">
        {prevPage && <PagerButton direction="prev" page={prevPage} />}
      </Box>
      <Box width="50%">
        {nextPage && <PagerButton direction="next" page={nextPage} />}
      </Box>
    </Box>
  );
};
