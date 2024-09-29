"use client"

import React from "react";
import Giscus from "@giscus/react";
import { Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const GiscusComponent = () => {
  const { isDarkMode } = useTheme();

  return (
    <Box mt>
      <Giscus
        repo="AbhiVarde/syncui"
        repoId="R_kgDOL9N2Lg"
        category="General"
        categoryId="DIC_kwDOL9N2Ls4Cfckr"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={isDarkMode ? "dark" : "light"}
        lang="en"
        crossorigin="anonymous"
        async
      />
    </Box>
  );
};

export default GiscusComponent;
