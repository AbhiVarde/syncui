import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Box,
  ButtonBase,
  Typography,
  Popper,
  Paper,
  ClickAwayListener,
  Fade,
} from "@mui/material";
import Link from "next/link";
import { SiMarkdown, SiOpenai, SiClaude } from "react-icons/si";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowLeft01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

const pillSx = {
  display: "flex",
  alignItems: "center",
  height: 32,
  bgcolor: "background.paper",
  border: "1.5px solid",
  borderColor: "divider",
  borderRadius: "10px",
  overflow: "hidden",
};

const squareBtnSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  flexShrink: 0,
  bgcolor: "background.paper",
  border: "1.5px solid",
  borderColor: "divider",
  borderRadius: "10px",
  transition: "background-color 0.1s ease",
  "&:hover": { bgcolor: "action.hover" },
};

const halfBtnSx = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  transition: "background-color 0.1s ease",
  "&:hover": { bgcolor: "action.hover" },
};

const dividerSx = {
  width: "1.5px",
  alignSelf: "stretch",
  bgcolor: "divider",
  flexShrink: 0,
};

const dropdownItemSx = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 1.25,
  px: 0.875,
  py: 0.625,
  borderRadius: "8px",
  textAlign: "left",
  transition: "background-color 0.1s ease",
  "&:hover": { bgcolor: "action.hover" },
};

const iconBoxSx = {
  width: 30,
  height: 30,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "action.hover",
  border: "1.5px solid",
  borderColor: "divider",
  borderRadius: "7px",
  color: "text.secondary",
};

const findAdjacentPages = (docsTree, currentSlug) => {
  const currentUrl = `/docs${currentSlug ? `/${currentSlug}` : ""}`;
  const currentDoc = docsTree.find((item) => item.url === currentUrl);
  if (!currentDoc?.category) return { prevPage: null, nextPage: null };

  const categoryPages = docsTree
    .filter((item) => item.category === currentDoc.category)
    .map(({ title, url }) => ({ title, url }));

  const idx = categoryPages.findIndex((item) => item.url === currentUrl);
  return {
    prevPage: idx > 0 ? categoryPages[idx - 1] : null,
    nextPage: idx < categoryPages.length - 1 ? categoryPages[idx + 1] : null,
  };
};

const NavButton = ({ page, direction }) => {
  const icon = direction === "prev" ? ArrowLeft01Icon : ArrowRight01Icon;
  const btn = (
    <ButtonBase
      disabled={!page}
      sx={{
        ...squareBtnSx,
        opacity: page ? 1 : 0.3,
        pointerEvents: page ? "auto" : "none",
      }}
    >
      <HugeiconsIcon icon={icon} size={14} strokeWidth={2} />
    </ButtonBase>
  );
  return page ? (
    <Link href={page.url} style={{ textDecoration: "none", display: "block" }}>
      {btn}
    </Link>
  ) : (
    btn
  );
};

const CopyIcon = ({ size }) => (
  <HugeiconsIcon icon={Copy01Icon} size={size} strokeWidth={2} />
);

const DropdownItem = ({
  IconComponent,
  label,
  description,
  hasArrow,
  onClick,
}) => (
  <ButtonBase onClick={onClick} sx={dropdownItemSx}>
    <Box sx={iconBoxSx}>
      <IconComponent size={13} />
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
        <Typography
          variant="caption"
          fontWeight={500}
          color="text.primary"
          noWrap
        >
          {label}
        </Typography>
        {hasArrow && (
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ lineHeight: 1 }}
          >
            ↗
          </Typography>
        )}
      </Box>
      {description && (
        <Typography
          variant="caption"
          fontWeight={400}
          color="text.secondary"
          display="block"
        >
          {description}
        </Typography>
      )}
    </Box>
  </ButtonBase>
);

export const DocNavigationBar = ({ slug, docsTree, title }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const anchorRef = useRef(null);
  const timerRef = useRef(null);

  const { prevPage, nextPage } = useMemo(
    () => findAdjacentPages(docsTree, slug),
    [docsTree, slug],
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", close, { capture: true });
  }, [open]);

  const copyMarkdown = useCallback(async () => {
    if (isCopying) return;
    setIsCopying(true);
    setCopied(true);
    try {
      const res = await fetch(
        `/api/raw-mdx?slug=${encodeURIComponent(slug || "index")}`,
      );
      const text = await res.text();
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error(e);
    } finally {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCopied(false);
        setIsCopying(false);
      }, 2000);
    }
  }, [slug, isCopying]);

  const handleViewMarkdown = useCallback(() => {
    window.open(
      `/api/raw-mdx?slug=${encodeURIComponent(slug || "index")}`,
      "_blank",
    );
    setOpen(false);
  }, [slug]);

  const handleOpenAI = useCallback((type) => {
    const prompt = `I'm looking at this documentation: ${window.location.href}. Help me understand how to use it.`;
    window.open(
      type === "chatgpt"
        ? `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
        : `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      "_blank",
    );
    setOpen(false);
  }, []);

  const handleCopyFromMenu = useCallback(() => {
    setOpen(false);
    copyMarkdown();
  }, [copyMarkdown]);

  const toggleOpen = useCallback(() => setOpen((v) => !v), []);
  const handleClose = useCallback(() => setOpen(false), []);

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
          sx={{ flex: "1 1 auto", minWidth: 0, wordBreak: "break-word" }}
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
          <Box ref={anchorRef} sx={pillSx}>
            <ButtonBase
              onClick={copyMarkdown}
              disabled={isCopying}
              sx={{ ...halfBtnSx, gap: 0.75, pl: 1.125, pr: 1.25 }}
            >
              <HugeiconsIcon
                icon={copied ? Tick02Icon : Copy01Icon}
                size={13}
                strokeWidth={2}
              />
              <Typography
                variant="caption"
                fontWeight={500}
                component="span"
                noWrap
                sx={{ display: { xs: "none", sm: "block" }, minWidth: 52 }}
              >
                {copied ? "Copied!" : "Copy page"}
              </Typography>
            </ButtonBase>

            <Box sx={dividerSx} />

            <ButtonBase
              onClick={toggleOpen}
              sx={{ ...halfBtnSx, px: 0.75, justifyContent: "center" }}
            >
              <HugeiconsIcon
                icon={open ? ArrowUp01Icon : ArrowDown01Icon}
                size={13}
                strokeWidth={2}
              />
            </ButtonBase>
          </Box>

          <NavButton page={prevPage} direction="prev" />
          <NavButton page={nextPage} direction="next" />
        </Box>
      </Box>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        style={{ zIndex: 1300 }}
        modifiers={[{ name: "offset", options: { offset: [0, 6] } }]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={120}>
            <Paper
              elevation={0}
              sx={{
                minWidth: 240,
                border: "1.5px solid",
                borderColor: "divider",
                borderRadius: "12px",
                bgcolor: "background.paper",
                p: 0.5,
                boxShadow:
                  "0 8px 28px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <DropdownItem
                    IconComponent={CopyIcon}
                    label="Copy page"
                    description="Copy page as Markdown for LLMs"
                    onClick={handleCopyFromMenu}
                  />
                  <DropdownItem
                    IconComponent={SiMarkdown}
                    label="View as Markdown"
                    description="View this page as plain text"
                    hasArrow
                    onClick={handleViewMarkdown}
                  />
                  <DropdownItem
                    IconComponent={SiOpenai}
                    label="Open in ChatGPT"
                    description="Ask questions about this page"
                    hasArrow
                    onClick={() => handleOpenAI("chatgpt")}
                  />
                  <DropdownItem
                    IconComponent={SiClaude}
                    label="Open in Claude"
                    description="Ask questions about this page"
                    hasArrow
                    onClick={() => handleOpenAI("claude")}
                  />
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
