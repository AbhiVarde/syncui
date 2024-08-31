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
          bgcolor: isMobile ? "transparent !important" : "background.paper",
          color: isMobile
            ? "text.primary"
            : page
            ? "text.primary"
            : "text.disabled",
          border: isMobile ? "none !important" : 1,
          borderColor: "divider",
          borderRadius: isMobile ? 0 : 1,
          "&:hover": {
            bgcolor: isMobile
              ? "transparent !important"
              : page
              ? "action.hover"
              : "background.paper",
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
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "inherit",
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

const flattenTree = (tree) => {
  return tree.reduce((acc, node) => {
    acc.push(node);
    if (node.children) {
      acc.push(...flattenTree(node.children));
    }
    return acc;
  }, []);
};

const findAdjacentPages = (flatTree, currentSlug) => {
  if (currentSlug === "") {
    const changelogPage = flatTree.find((item) => item.title === "Changelog");
    return { prevPage: null, nextPage: changelogPage };
  }

  if (currentSlug === "changelog") {
    const setupPage = flatTree.find((item) => item.title === "Setup");
    return { prevPage: setupPage, nextPage: null };
  }

  const currentIndex = flatTree.findIndex(
    (item) => item.url === `/docs/${currentSlug}`
  );

  let prevPage = null;
  let nextPage = null;

  if (currentIndex > 0) {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!flatTree[i].children) {
        prevPage = flatTree[i];
        break;
      }
    }
  }

  if (currentIndex < flatTree.length - 1) {
    for (let i = currentIndex + 1; i < flatTree.length; i++) {
      if (!flatTree[i].children) {
        nextPage = flatTree[i];
        break;
      }
    }
  }

  return { prevPage, nextPage };
};

export const DocPager = ({ slug, docsTree }) => {
  const flatTree = useMemo(() => flattenTree(docsTree), [docsTree]);
  const { prevPage, nextPage } = findAdjacentPages(flatTree, slug);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      mt={4}
      gap={2}
    >
      <Box width="50%">
        {prevPage ? (
          <PagerButton direction="prev" page={prevPage} />
        ) : (
          <Box sx={{ visibility: "hidden" }}>
            <PagerButton direction="prev" page={null} />
          </Box>
        )}
      </Box>
      <Box width="50%">
        {nextPage ? (
          <PagerButton direction="next" page={nextPage} />
        ) : (
          <Box sx={{ visibility: "hidden" }}>
            <PagerButton direction="next" page={null} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
