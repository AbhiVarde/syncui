import React, { useState, useRef, useCallback, useMemo } from "react";
import { Box, useTheme, Portal, Typography } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

const LinkPreview = ({
  children,
  url,
  width = 200,
  height = 125,
  staticImage = null,
  placement = "top",
  description = null,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef();
  const linkRef = useRef();

  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 150, damping: 20 });

  const imageSrc = useMemo(() => staticImage, [staticImage]);

  const updatePosition = useCallback(() => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const topPosition =
      placement === "top"
        ? rect.top + scrollTop - height - 20
        : rect.bottom + scrollTop + 20;

    setPosition({
      top: topPosition,
      left: rect.left + scrollLeft + rect.width / 2 - width / 2,
    });
  }, [placement, height, width]);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsOpen(true);
    }, 50);
  }, [updatePosition]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!linkRef.current) return;
      const targetRect = linkRef.current.getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
      x.set(offsetFromCenter);
    },
    [x]
  );

  const animationProps = useMemo(
    () =>
      placement === "top"
        ? {
            initial: { opacity: 0, y: 10, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 10, scale: 0.95 },
          }
        : {
            initial: { opacity: 0, y: -10, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -10, scale: 0.95 },
          },
    [placement]
  );

  return (
    <>
      <Box
        component="a"
        ref={linkRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        sx={{
          textDecorationLine: "underline",
          textUnderlineOffset: "4px",
          fontWeight: 500,
          color: "inherit",
          cursor: "pointer",
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>

      <Portal>
        <Box
          sx={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: theme.zIndex.tooltip,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={animationProps.initial}
                animate={animationProps.animate}
                exit={animationProps.exit}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.5,
                }}
                style={{ x: translateX, willChange: "transform" }}
              >
                <Box
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    bgcolor: "background.paper",
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
                    textDecoration: "none",
                    overflow: "hidden",
                    willChange: "transform",
                    border: 1,
                    borderRadius: 1.5,
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {description && (
                    <Box sx={{ p: 1.5, pb: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "12px !important",
                          color: "text.primary",
                          fontWeight: 500,
                          display: "block",
                          wordBreak: "break-word",
                          overflowWrap: "anywhere",
                          maxWidth: `${width - 24}px`,
                        }}
                      >
                        {description}
                      </Typography>
                    </Box>
                  )}

                  {imageSrc && (
                    <Box sx={{ p: description ? "0 12px 12px 12px" : 1 }}>
                      <Box
                        component="img"
                        src={imageSrc}
                        alt="Link preview"
                        loading="eager"
                        sx={{
                          width: description ? width - 24 : width,
                          height,
                          borderRadius: 1,
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Portal>
    </>
  );
};

export default LinkPreview;
