import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, ButtonBase, Typography, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { SiClaude, SiMarkdown, SiOpenai } from "react-icons/si";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowLeft01Icon,
  ArrowDown01Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

const buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  flexShrink: 0,
  transition: "all 0.15s ease",
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
  const icon = direction === "prev" ? ArrowLeft01Icon : ArrowRight01Icon;

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
      <HugeiconsIcon icon={icon} size={16} />
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
    <Icon size={16} />
    {label}
  </MenuItem>
);

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

export const DocNavigationBar = ({ slug, docsTree, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const open = Boolean(anchorEl);

  const { prevPage, nextPage } = useMemo(
    () => findAdjacentPages(docsTree, slug),
    [docsTree, slug]
  );

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    if (open) {
      const handleScroll = () => handleClose();
      window.addEventListener("scroll", handleScroll, true);
      return () => window.removeEventListener("scroll", handleScroll, true);
    }
  }, [open, handleClose]);

  const handleCopyMarkdown = useCallback(async () => {
    if (isCopying) return;

    setIsCopying(true);
    setCopied(true);

    try {
      const mdxUrl = `/api/raw-mdx?slug=${encodeURIComponent(slug || "index")}`;
      const response = await fetch(mdxUrl);
      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);

      setTimeout(() => {
        setCopied(false);
        setIsCopying(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy markdown:", error);
      setCopied(false);
      setIsCopying(false);
    }
  }, [slug, isCopying]);

  const handleViewMarkdown = useCallback(() => {
    const mdxUrl = `/api/raw-mdx?slug=${encodeURIComponent(slug || "index")}`;
    window.open(mdxUrl, "_blank");
    handleClose();
  }, [slug, handleClose]);

  const handleOpenAI = useCallback(
    (aiType) => {
      const url = window.location.href;
      const prompt = `I'm looking at this Sync UI documentation: ${url}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;
      const urls = {
        chatgpt: `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
        claude: `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      };
      window.open(urls[aiType], "_blank");
      handleClose();
    },
    [handleClose]
  );

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
          <Box
            sx={{
              ...buttonBaseStyle,
              height: 32,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <ButtonBase
              onClick={handleCopyMarkdown}
              disabled={isCopying}
              sx={{
                px: { xs: 1, sm: 1.5 },
                gap: { xs: 0.25, sm: 0.75 },
                display: "flex",
                alignItems: "center",
                height: "100%",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <HugeiconsIcon
                icon={copied ? Tick02Icon : Copy01Icon}
                size={16}
              />
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                  minWidth: "65px",
                }}
              >
                {copied ? "Copied!" : "Copy Page"}
              </Typography>
            </ButtonBase>

            <Box
              sx={{
                width: "1px",
                height: 20,
                bgcolor: "divider",
                flexShrink: 0,
              }}
            />

            <ButtonBase
              onClick={handleClick}
              sx={{
                px: 0.75,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                transition: "all 0.15s ease",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
            </ButtonBase>
          </Box>

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
              borderRadius: 1,
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
