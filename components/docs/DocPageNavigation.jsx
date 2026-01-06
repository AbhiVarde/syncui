import React from "react";
import { Box, Typography, ButtonBase } from "@mui/material";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

const findAdjacentPages = (docsTree, currentSlug) => {
  const currentUrl = `/docs${currentSlug ? `/${currentSlug}` : ""}`;

  const currentDoc = docsTree.find((item) => item.url === currentUrl);

  if (!currentDoc || !currentDoc.category) {
    return { prevPage: null, nextPage: null };
  }

  const currentCategory = currentDoc.category;

  const categoryPages = docsTree
    .filter((item) => item.category === currentCategory)
    .map((item) => ({
      title: item.title,
      url: item.url,
    }));

  const currentIndex = categoryPages.findIndex(
    (item) => item.url === currentUrl
  );

  return {
    prevPage: currentIndex > 0 ? categoryPages[currentIndex - 1] : null,
    nextPage:
      currentIndex < categoryPages.length - 1
        ? categoryPages[currentIndex + 1]
        : null,
  };
};

const NavButton = ({ page, direction }) => {
  if (!page) return <Box sx={{ flex: 1 }} />;

  const isPrev = direction === "prev";

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: isPrev ? "flex-start" : "flex-end",
      }}
    >
      <Link href={page.url} style={{ textDecoration: "none" }}>
        <ButtonBase
          sx={{
            px: 1.25,
            py: 0.75,
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            bgcolor: "background.paper",
            borderRadius: 1,
            transition: "all 0.15s ease",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          {isPrev && <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "text.primary",
              fontSize: "0.875rem",
            }}
          >
            {page.title}
          </Typography>
          {!isPrev && <HugeiconsIcon icon={ArrowRight02Icon} size={18} />}
        </ButtonBase>
      </Link>
    </Box>
  );
};

export const DocPageNavigation = ({ slug, docsTree }) => {
  const { prevPage, nextPage } = React.useMemo(
    () => findAdjacentPages(docsTree, slug),
    [docsTree, slug]
  );

  if (!prevPage && !nextPage) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mt: 6,
        pt: 4,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <NavButton page={prevPage} direction="prev" />
      <NavButton page={nextPage} direction="next" />
    </Box>
  );
};
