# Sync UI Setup

---

## Step 1: Install dependencies

```bash
# npm
npm install @mui/material @emotion/react @emotion/styled motion

# yarn
yarn add @mui/material @emotion/react @emotion/styled motion

# pnpm
pnpm add @mui/material @emotion/react @emotion/styled motion
```

Install icon packages only if a component or block requires them:

```bash
npm install @hugeicons/react   # used by Hero and CTA blocks
npm install react-icons        # used by Stats blocks
```

---

## Step 2: Wrap your app in ThemeProvider

Pick the section below that matches your framework.

---

## Next.js (Pages Router)

```jsx
// pages/_app.jsx
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: { mode: "dark" },
  typography: { fontFamily: "inherit" },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

---

## Next.js (App Router)

MUI requires a client boundary at the provider level.

```jsx
// components/providers.jsx
"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: { mode: "dark" },
  typography: { fontFamily: "inherit" },
});

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

```jsx
// app/layout.jsx
import { Providers } from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

Any Sync UI component used inside the App Router also needs `"use client"` at the top.

---

## Vite

```jsx
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App";

const theme = createTheme({ palette: { mode: "dark" } });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
```

---

## React Router v7

```jsx
// app/root.jsx
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({ palette: { mode: "dark" } });

export function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

---

## Dark and light mode toggle

```jsx
import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

export function ThemeWrapper({ children }) {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

---

## TypeScript

MUI is fully typed. Combine MUI and Motion prop types like this:

```ts
import type { ButtonProps } from "@mui/material";
import type { MotionProps } from "motion/react";

type AnimatedButtonProps = ButtonProps &
  MotionProps & {
    label: string;
  };
```

---

## Common mistakes

| Mistake                                 | Fix                                                 |
| --------------------------------------- | --------------------------------------------------- |
| Using `framer-motion` imports           | Use `motion/react` exclusively                      |
| Missing `ThemeProvider`                 | Wrap the app root, not individual components        |
| Forgetting `"use client"` in App Router | Add it to any file that uses hooks or motion        |
| Using `className` for styling           | Use MUI `sx` prop instead                           |
| Passing an unknown `variant` string     | Check components.md or blocks.md for valid variants |
