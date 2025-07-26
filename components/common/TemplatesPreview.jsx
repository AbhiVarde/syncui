import React, { useState, useRef } from "react";
import { Box, useTheme, Portal, Typography } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

const TemplatesPreview = ({
  children,
  width = 360,
  height = 220,
  placement = "bottom",
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("startup");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef();
  const triggerRef = useRef();

  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });

  const templates = [
    {
      name: "🚀 Startup",
      key: "startup",
      url: "https://startup-syncui.vercel.app/",
      image: "/images/Startup.png",
    },
    {
      name: "☁️ SaaS",
      key: "saas",
      url: "https://saas-syncui.vercel.app/",
      image: "/images/SaaS.png",
    },
    {
      name: "💼 Portfolio",
      key: "portfolio",
      url: "https://portfolio-syncui.vercel.app/",
      image: "/images/Portfolio.png",
    },
  ];

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      const topPosition = rect.bottom + scrollTop + 20;
      const leftPosition = rect.left + scrollLeft + rect.width / 2 - width / 2;

      setPosition({
        top: topPosition,
        left: Math.max(
          20,
          Math.min(leftPosition, window.innerWidth - width - 20)
        ),
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
    if (triggerRef.current) {
      const targetRect = triggerRef.current.getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
      x.set(offsetFromCenter);
    }
  };

  const animationProps = {
    initial: { opacity: 0, y: -15, scale: 0.8, rotateX: 10 },
    animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    exit: { opacity: 0, y: -15, scale: 0.85, rotateX: 10 },
  };

  const selectedTemplateData = templates.find(
    (t) => t.key === selectedTemplate
  );

  return (
    <>
      <Box
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        sx={{
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
            zIndex: theme.zIndex.tooltip + 1,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={animationProps.initial}
                animate={{
                  ...animationProps.animate,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8,
                  },
                }}
                exit={animationProps.exit}
                style={{
                  x: translateX,
                  transformStyle: "preserve-3d",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: width,
                    height: height,
                    bgcolor: "background.paper",
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
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
                  {/* Left: Template List */}
                  <Box
                    sx={{
                      width: "35%",
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        width: "100%",
                        flexGrow: 1,
                      }}
                    >
                      {templates.map((template, index) => {
                        const isSelected = selectedTemplate === template.key;

                        return (
                          <Box
                            key={index}
                            onMouseEnter={() =>
                              setSelectedTemplate(template.key)
                            }
                            sx={{
                              cursor: "pointer",
                              borderRadius: 1,
                              px: 1.25,
                              py: 0.75,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              backgroundColor: isSelected
                                ? "action.selected"
                                : "transparent",
                              transition: "background-color 120ms ease",
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: isSelected ? 500 : 400,
                                color: "text.primary",
                                fontSize: "13.5px",
                                lineHeight: 1.4,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {template.name}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>

                    {typeof window !== "undefined" &&
                      !window.location.pathname.includes("/templates") && (
                        <Box
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/templates");
                          }}
                          sx={{
                            mt: 1,
                            px: 1.25,
                            py: 0.75,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            borderRadius: 1,
                            color: "text.secondary",
                            fontSize: "13.25px",
                            cursor: "pointer",
                            transition:
                              "background-color 120ms ease, color 120ms ease",
                            "&:hover": {
                              backgroundColor: "action.hover",
                              color: "text.primary",
                              fontWeight: 500,
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ whiteSpace: "nowrap" }}
                          >
                            Browse
                          </Typography>
                          <LuArrowRight size={15} />
                        </Box>
                      )}
                  </Box>

                  {/* Right: Image Preview */}
                  <Box
                    sx={{
                      width: "65%",
                      p: 1.5,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      component="a"
                      href={selectedTemplateData?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedTemplateData?.url) {
                          window.open(
                            selectedTemplateData.url,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                      sx={{
                        display: "block",
                        textDecoration: "none",
                        flex: 1,
                        borderRadius: 1,
                        overflow: "hidden",
                        transition: "transform 0.2s ease",
                        border: 1,
                        borderColor: theme.palette.divider,
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={selectedTemplateData?.image}
                        alt={`${selectedTemplateData?.name} template preview`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          filter: "brightness(1.02) contrast(1.05)",
                          borderRadius: "inherit",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Portal>
    </>
  );
};

export default TemplatesPreview;
