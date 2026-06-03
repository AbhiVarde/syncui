# Sync UI Animation Reference

All animations use `motion/react`. Import path: `import { motion } from "motion/react"`.
Never import from `framer-motion`.

---

## Wrapping MUI components

```jsx
import { Button, Card, Box, Typography } from "@mui/material";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
```

Use `motion.div`, `motion.span`, `motion.ul`, `motion.li` for plain HTML elements.

---

## Transition presets

| Feel                      | Config                                            |
| ------------------------- | ------------------------------------------------- |
| Snappy (buttons, icons)   | `{ type: "spring", stiffness: 400, damping: 17 }` |
| Smooth (cards, panels)    | `{ type: "spring", stiffness: 300, damping: 24 }` |
| Gentle (page sections)    | `{ duration: 0.4, ease: "easeOut" }`              |
| Fast (micro interactions) | `{ duration: 0.15, ease: "easeInOut" }`           |

---

## Hover and tap (buttons and cards)

```jsx
<MotionButton
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click
</MotionButton>

<MotionCard
  whileHover={{ y: -8 }}
  transition={{ type: "spring", stiffness: 300, damping: 24 }}
>
  Card content
</MotionCard>
```

---

## Fade in on mount

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  Content
</motion.div>
```

---

## Staggered list (used in Stats, Grids, Tables)

```jsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.li key={i.id} variants={item}>
      {i.content}
    </motion.li>
  ))}
</motion.ul>;
```

---

## Scroll-triggered reveal (used in Blocks)

```jsx
<motion.div
  variants={item}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
>
  Section content
</motion.div>
```

Use `viewport={{ once: true }}` so the animation only runs once.
Use `amount: 0.2` so the element does not have to be fully in view.

---

## Exit animations with AnimatePresence

Wrap any conditionally rendered component in `AnimatePresence`.

```jsx
import { motion, AnimatePresence } from "motion/react";

<AnimatePresence>
  {isVisible && (
    <motion.div
      key="panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>;
```

For tab panels use `mode="wait"` so the exiting panel finishes before the new one enters:

```jsx
<AnimatePresence mode="wait">
  <motion.div key={activeTab} ...>
    {panels[activeTab]}
  </motion.div>
</AnimatePresence>
```

---

## Shared layout animation with layoutId (used in Tabs)

```jsx
{
  tabs.map((tab, i) => (
    <Box
      key={tab}
      onClick={() => setActive(i)}
      sx={{ position: "relative", pb: 1 }}
    >
      <Typography>{tab}</Typography>
      {active === i && (
        <motion.div
          layoutId="active-indicator"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
          }}
        />
      )}
    </Box>
  ));
}
```

The indicator physically slides between tabs. Only one element with the same `layoutId` should exist in the DOM at a time.

---

## Dock magnification (used in Docks)

```jsx
import { useMotionValue, useTransform, useSpring } from "motion/react";

const mouseX = useMotionValue(Infinity);

const distance = useTransform(mouseX, (val) => {
  const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
  return val - bounds.x - bounds.width / 2;
});

const sizeSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });
```

---

## Scroll-driven parallax

```jsx
import { useScroll, useTransform } from "motion/react";

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, -120]);

<motion.div style={{ y }}>Parallax layer</motion.div>;
```

---

## Imperative animation with useAnimate

```jsx
import { useAnimate } from "motion/react";

const [scope, animate] = useAnimate();

const handleClick = async () => {
  await animate(scope.current, { scale: 1.08 }, { duration: 0.1 });
  await animate(scope.current, { scale: 1 }, { duration: 0.1 });
};

<div ref={scope} onClick={handleClick}>
  Target
</div>;
```

---

## Reduced motion (accessibility)

Always respect the user's system preference:

```jsx
import { useReducedMotion } from "motion/react";

function AnimatedCard({ children }) {
  const reduce = useReducedMotion();

  return (
    <MotionCard
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
    </MotionCard>
  );
}
```

---

## Rules

1. Animate `transform` properties: `scale`, `x`, `y`, `rotate`, `opacity`. Do not animate `width`, `height`, `top`, or `left` as these cause layout recalculations.
2. Keep UI animation duration between 150ms and 400ms.
3. Use `AnimatePresence` whenever a component conditionally unmounts.
4. Use `once: true` in `viewport` for scroll-triggered animations to avoid re-triggering.
5. Always handle `useReducedMotion` for accessible interfaces.
