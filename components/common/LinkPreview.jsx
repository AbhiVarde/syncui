import React, { useState, useRef } from "react";
import { Box, useTheme, Portal } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { encode } from "qss";

const LinkPreview = ({
  children,
  url,
  width = 200,
  height = 125,
  staticImage = null,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef();
  const linkRef = useRef();

  // Framer Motion for subtle mouse tracking
  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });

  // Generate image source
  const imageSrc =
    staticImage ||
    (() => {
      const params = encode({
        url,
        screenshot: true,
        meta: false,
        embed: "screenshot.url",
        colorScheme: theme.palette.mode,
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": width * 3,
        "viewport.height": height * 3,
      });
      return `https://api.microlink.io/?${params}`;
    })();

  const updatePosition = () => {
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      setPosition({
        top: rect.top + scrollTop - height - 20,
        left: rect.left + scrollLeft + rect.width / 2 - width / 2,
      });
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsOpen(true);
    }, 50);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  const handleMouseMove = (event) => {
    if (linkRef.current) {
      const targetRect = linkRef.current.getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
      x.set(offsetFromCenter);
    }
  };

  return (
    <>
      {/* Link with hover trigger */}
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

      {/* Preview portal */}
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
                initial={{ opacity: 0, y: 15, scale: 0.8, rotateX: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8,
                  },
                }}
                exit={{ opacity: 0, y: 15, scale: 0.85, rotateX: -10 }}
                style={{
                  x: translateX,
                  transformStyle: "preserve-3d",
                }}
              >
                <Box
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    p: 1,
                    bgcolor: "background.paper",
                    boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)`,
                    textDecoration: "none",
                    overflow: "hidden",
                    transform: "translateZ(0)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: 1,
                    borderRadius: 1.5,
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Box
                    component="img"
                    src={imageSrc}
                    alt="Link preview"
                    sx={{
                      width,
                      height,
                      borderRadius: 1,
                      display: "block",
                      objectFit: "cover",
                      filter: "brightness(1.02) contrast(1.05)",
                    }}
                  />
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
