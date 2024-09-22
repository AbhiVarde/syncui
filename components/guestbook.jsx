"use client";

import React from "react";
import Giscus from "@giscus/react";
import { Box, useTheme } from "@mui/material";

const GiscusComponent = () => {
  const theme = useTheme();

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
        theme={theme.palette.mode}
        lang="en"
        crossorigin="anonymous"
        async
      />
    </Box>
  );
};

export default GiscusComponent;
