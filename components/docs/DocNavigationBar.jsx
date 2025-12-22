import React, { useState, useEffect } from "react";
import { Box, ButtonBase, Typography, Menu, MenuItem } from "@mui/material";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronDown,
  LuCopy,
} from "react-icons/lu";
import { SiClaude, SiMarkdown, SiOpenai } from "react-icons/si";
import Link from "next/link";

const buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  borderRadius: 1.5,
  flexShrink: 0,
  "&:hover": {
    bgcolor: "action.hover",
  },
};

const menuItemStyle = {
  py: 0.75,
  px: 1.25,
  display: "flex",
  alignItems: "center",
  gap: 1.25,
  fontSize: "15px !important",
  minHeight: "auto",
  borderRadius: 1,
  fontWeight: 500,
  "& *": {
    fontSize: "15px !important",
  },
  "&:hover": {
    bgcolor: "action.hover",
  },
};

const NavButton = ({ page, direction }) => {
  const Icon = direction === "prev" ? LuChevronLeft : LuChevronRight;

  const buttonContent = (
    <ButtonBase
      disabled={!page}
      sx={{
        ...buttonBaseStyle,
        width: 32,
        height: 32,
        opacity: page ? 1 : 0.3,
        cursor: page ? "pointer" : "not-allowed",
      }}
    >
      <Icon size={16} />
    </ButtonBase>
  );

  return page ? (
    <Link href={page.url} style={{ textDecoration: "none" }}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

const AIMenuItem = ({ icon: Icon, label, onClick }) => (
  <MenuItem onClick={onClick} sx={menuItemStyle}>
    <Icon size={15} />
    {label}
  </MenuItem>
);

const findAdjacentPages = (docsTree, currentSlug) => {
  const flatTree = flattenTree(docsTree);
  const currentIndex = flatTree.findIndex(
    (item) => item.url === `/docs${currentSlug ? `/${currentSlug}` : ""}`
  );

  return {
    prevPage: currentIndex > 0 ? flatTree[currentIndex - 1] : null,
    nextPage:
      currentIndex < flatTree.length - 1 ? flatTree[currentIndex + 1] : null,
  };
};

const flattenTree = (tree) => {
  const flattenedTree = [];

  const setupPage = tree.find((node) => node.title === "Setup");
  if (setupPage) {
    flattenedTree.push({ title: "Setup", url: "/docs" });
  }

  const changelogPage = tree.find((node) => node.title === "Changelog");
  if (changelogPage) {
    flattenedTree.push({ title: "Changelog", url: "/docs/changelog" });
  }

  flattenedTree.push({ title: "Templates", url: "/templates" });

  const storyPage = tree.find((node) => node.title === "The Story of Sync UI");
  if (storyPage) {
    flattenedTree.push({
      title: "The Story of Sync UI",
      url: "/docs/story",
    });
  }

  tree.forEach((node) => {
    if (
      node.title !== "Setup" &&
      node.title !== "Changelog" &&
      node.title !== "The Story of Sync UI"
    ) {
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

export const DocNavigationBar = ({ slug, docsTree, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { prevPage, nextPage } = React.useMemo(
    () => findAdjacentPages(docsTree, slug),
    [docsTree, slug]
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (open) {
      const handleScroll = () => {
        handleClose();
      };

      window.addEventListener("scroll", handleScroll, true);
      return () => {
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [open]);

  const handleViewMarkdown = () => {
    const mdxUrl = `/api/raw-mdx?slug=${encodeURIComponent(slug || "index")}`;
    window.open(mdxUrl, "_blank");
    handleClose();
  };

  const handleOpenAI = (aiType) => {
    const url = window.location.href;
    const prompt = `I'm looking at this Sync UI documentation: ${url}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;
    const urls = {
      chatgpt: `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
    };
    window.open(urls[aiType], "_blank");
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={500}
          sx={{
            flex: "1 1 auto",
            minWidth: 0,
            wordBreak: "break-word",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            flexShrink: 0,
          }}
        >
          <ButtonBase
            onClick={handleClick}
            sx={{
              ...buttonBaseStyle,
              gap: 0.75,
              px: 1.5,
              py: 0.75,
            }}
          >
            <LuCopy size={14} />
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: "14px",
              }}
            >
              Copy Page
            </Typography>
            <LuChevronDown size={14} />
          </ButtonBase>

          <Box sx={{ display: "flex", gap: 0.75 }}>
            <NavButton page={prevPage} direction="prev" />
            <NavButton page={nextPage} direction="next" />
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionProps={{
          timeout: 200,
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 0.5,
              minWidth: 200,
              bgcolor: "background.paper",
              border: 1,
              borderColor: "divider",
              borderRadius: 1.5,
              boxShadow: "none",
              p: 0.5,
            },
          },
        }}
        MenuListProps={{
          sx: { p: 0 },
        }}
      >
        <AIMenuItem
          icon={SiMarkdown}
          label="View as Markdown"
          onClick={handleViewMarkdown}
        />
        <AIMenuItem
          icon={SiOpenai}
          label="Open in ChatGPT"
          onClick={() => handleOpenAI("chatgpt")}
        />
        <AIMenuItem
          icon={SiClaude}
          label="Open in Claude"
          onClick={() => handleOpenAI("claude")}
        />
      </Menu>
    </>
  );
};
