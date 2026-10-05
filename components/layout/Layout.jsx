import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { GeistPixelSquare } from "geist/font/pixel";
import Header from "./Header";
import { GitHubProvider } from "@/context/GithubContext";

const HEADER_HEIGHT = 56;

const Layout = ({ children, toggleTheme, isDarkMode, docsTree, toc }) => {
  const router = useRouter();
  const isDocsPage = router.pathname.startsWith("/docs");
  const is404Page = router.pathname === "/404";
  const [count, setCount] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("visitor-number");
      if (saved) return setCount(Number(saved));
    } catch {}

    fetch("/api/visitors", { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        try {
          localStorage.setItem("visitor-number", String(d.count));
        } catch {}
        setCount(d.count);
      })
      .catch(() => {});
  }, []);

  if (is404Page) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {children}
      </Box>
    );
  }

  return (
    <GitHubProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          docsTree={docsTree}
          toc={toc}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: `${HEADER_HEIGHT}px`,
            ...(isDocsPage && { display: "flex" }),
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>{children}</Box>
        </Box>

        <Box component="footer" sx={{ py: 2, textAlign: "center" }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontFamily: GeistPixelSquare.style.fontFamily }}
          >
            {count !== null && (
              <>
                visitor{" "}
                <Box component="span" sx={{ color: "text.primary" }}>
                  #{count.toLocaleString()}
                </Box>
                {" · "}
              </>
            )}
            counting since 05 oct 2026
          </Typography>
        </Box>
      </Box>
    </GitHubProvider>
  );
};

export default Layout;
