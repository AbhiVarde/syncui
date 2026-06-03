---
name: syncui
description: >-
  Use this skill when working with Sync UI components, blocks, or templates.
  Sync UI is an animated React component library built with MUI (Material UI)
  and Motion (motion/react). Apply for tasks like: "add a syncui button",
  "use sync ui", "syncui animated card", "add a hero block", "build a pricing
  section with syncui", "animated MUI component", or any project using
  @mui/material with motion/react animations. Provides full component catalog,
  variant reference, animation patterns, and setup for all frameworks.
user-invocable: false
---

# Sync UI

Sync UI is a copy-paste animated React component library.
Components are source code you own, not an npm package to import.
Built with MUI (Material UI) v7 and Motion (motion/react).

- 125+ animated components
- 13+ pre-built blocks (Hero, CTA, Pricing, Stats)
- 3 premium templates (Startup, SaaS, Portfolio)

Docs: https://syncui.design/docs
Components: https://syncui.design/components
Blocks: https://syncui.design/blocks
GitHub: https://github.com/AbhiVarde/syncui

---

## Before writing any code, ask if unclear

If the user's request is ambiguous, ask ONE question before proceeding:

- Which component or block do they want? (e.g., "button", "hero block", "pricing section")
- Which variant? (list available variants from this skill)
- Light or dark mode?
- Which framework: Next.js Pages Router, Next.js App Router, Vite, or React Router?

Do not guess. One short question delivers a better result than wrong code.

---

## Core rules

1. Import animations from `motion/react`, never from `framer-motion`.
2. Wrap MUI components with `motion.create(MuiComponent)` to animate them.
3. Use the MUI `sx` prop for all styling. Do not use className or plain CSS.
4. Every project needs `ThemeProvider` and `CssBaseline`. See setup.md.
5. All components use a `variant` prop to select between visual styles. Always pass a valid variant string.
6. Icons: blocks use `@hugeicons/react` (Hero/CTA) and `react-icons/fi` (Stats). Install the one the component needs.
7. Respect `prefers-reduced-motion`. See animation.md for the pattern.

---

## Dependency install

```bash
npm install @mui/material @emotion/react @emotion/styled motion
```

Optional icon packages (needed by some blocks):

```bash
npm install @hugeicons/react react-icons
```

---

## Core animation pattern

```jsx
import { Button, Card } from "@mui/material";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);
const MotionCard = motion.create(Card);
```

Use `motion.div`, `motion.span`, `motion.ul`, etc. for plain HTML elements directly.

---

## Variant-based architecture

Every Sync UI component and block accepts a `variant` prop.
One component file covers all visual styles via a switch statement.

```jsx
// Correct usage
<ButtonVariants variant="shimmer" />
<HeroVariants variant="center-aligned" />
<PricingVariants variant="three-tier" />

// Wrong: do not pass unknown variant strings
<ButtonVariants variant="custom" />
```

See components.md for every component's available variant strings.
See blocks.md for every block's available variant strings.

---

## Quick example: animated button

```jsx
"use client"; // App Router only

import { Button } from "@mui/material";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);

export function AnimatedButton() {
  return (
    <MotionButton
      variant="contained"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      Get started
    </MotionButton>
  );
}
```

---

## Quick example: staggered card grid

```jsx
import { Grid2 as Grid } from "@mui/material";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function CardGrid({ items }) {
  return (
    <Grid
      container
      spacing={3}
      component={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((card) => (
        <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <motion.div variants={item}>{/* card content */}</motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
```

---

## Reference files in this skill

| File          | What it covers                                    |
| ------------- | ------------------------------------------------- |
| components.md | All 20+ component variants with usage patterns    |
| blocks.md     | All 13 block variants (Hero, CTA, Pricing, Stats) |
| setup.md      | Framework setup for Next.js, Vite, React Router   |
| animation.md  | Motion presets, AnimatePresence, layoutId, scroll |
