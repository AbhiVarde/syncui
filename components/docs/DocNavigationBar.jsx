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
} from "@mui/material";
import Link from "next/link";
import { SiOpenai, SiClaude } from "react-icons/si";
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
  height: 34,
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "10px",
  overflow: "hidden",
};

const squareBtnSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  flexShrink: 0,
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "10px",
  transition: "all 0.15s ease",
  "&:hover": { bgcolor: "action.hover" },
};

const halfBtnSx = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  px: 1,
  gap: 0.5,
  transition: "background 0.15s ease",
  "&:hover": { bgcolor: "action.hover" },
};

const dividerSx = {
  width: "1px",
  alignSelf: "stretch",
  bgcolor: "divider",
  flexShrink: 0,
};

const dropdownItemSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  width: "100%",
  px: 0.75,
  py: 0.75,
  borderRadius: "8px",
  textAlign: "left",
  transition: "background 0.1s",
  "&:hover": { bgcolor: "action.hover" },
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
        opacity: page ? 1 : 0.35,
        pointerEvents: page ? "auto" : "none",
      }}
    >
      <HugeiconsIcon icon={icon} size={14} strokeWidth={2} />
    </ButtonBase>
  );
  return page ? <Link href={page.url}>{btn}</Link> : btn;
};

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
        }}
      >
        <Typography
          variant="h3"
          fontWeight={500}
          sx={{ flex: 1, minWidth: 0, wordBreak: "break-word" }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box ref={anchorRef} sx={pillSx}>
            <ButtonBase
              onClick={copyMarkdown}
              disabled={isCopying}
              sx={halfBtnSx}
            >
              <HugeiconsIcon
                icon={copied ? Tick02Icon : Copy01Icon}
                size={14}
                strokeWidth={2}
              />
              <Typography
                variant="caption"
                fontWeight={500}
                component="span"
                sx={{ minWidth: 52 }}
              >
                {copied ? "Copied!" : "Copy"}
              </Typography>
            </ButtonBase>

            <Box sx={dividerSx} />

            <ButtonBase
              onClick={toggleOpen}
              sx={{
                px: 1.25,
                height: "100%",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <HugeiconsIcon
                icon={open ? ArrowUp01Icon : ArrowDown01Icon}
                size={14}
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
        disablePortal={false}
        modifiers={[
          {
            name: "offset",
            options: { offset: [0, 8] },
          },
          {
            name: "preventOverflow",
            options: { padding: 8 },
          },
        ]}
        sx={{
          zIndex: 1300,
          transition: "opacity 80ms ease",
          opacity: open ? 1 : 0,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            minWidth: 180,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            bgcolor: "background.paper",
            p: 0.5,
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Box>
              <ButtonBase
                onClick={() => handleOpenAI("chatgpt")}
                sx={dropdownItemSx}
              >
                <SiOpenai size={16} />
                <Typography variant="body2" fontWeight={500}>
                  Ask ChatGPT
                </Typography>
              </ButtonBase>
              <ButtonBase
                onClick={() => handleOpenAI("claude")}
                sx={dropdownItemSx}
              >
                <SiClaude size={16} />
                <Typography variant="body2" fontWeight={500}>
                  Ask Claude
                </Typography>
              </ButtonBase>
            </Box>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};
