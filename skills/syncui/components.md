# Sync UI Component Catalog

All components live in `components/ui/components/` in the repo.
Every component uses a `variant` prop. Pass the exact string from the tables below.
Browse live: https://syncui.design/components

---

## Buttons

Docs: https://syncui.design/components/buttons

Variants: `default`, `shimmer`, `neon`

```jsx
import { Button } from "@mui/material";
import { motion } from "motion/react";

const MotionButton = motion.create(Button);

// Default
<MotionButton
  variant="contained"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</MotionButton>;

// Shimmer effect using Box overlay
import { Box } from "@mui/material";
const MotionBox = motion.create(Box);

<MotionButton
  variant="contained"
  sx={{ position: "relative", overflow: "hidden" }}
>
  <MotionBox
    component="span"
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    }}
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
  />
  Shimmer
</MotionButton>;
```

---

## Cards

Docs: https://syncui.design/components/cards

```jsx
import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "motion/react";

const MotionCard = motion.create(Card);

<MotionCard
  whileHover={{ y: -8 }}
  transition={{ type: "spring", stiffness: 300, damping: 24 }}
  sx={{ borderRadius: 3, cursor: "pointer" }}
>
  <CardContent>
    <Typography variant="h6" fontWeight={600}>
      Title
    </Typography>
    <Typography variant="body2" color="text.secondary" mt={1}>
      Description text here.
    </Typography>
  </CardContent>
</MotionCard>;
```

---

## Dialogs

Docs: https://syncui.design/components/dialogs

Variants: `slide-up`, `blur`, `form`

```jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "motion/react";

// Slide-up variant
<AnimatePresence>
  {open && (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={motion.create("div")}
      PaperProps={{
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 40 },
        transition: { type: "spring", stiffness: 300, damping: 28 },
      }}
    >
      <DialogTitle>Confirm action</DialogTitle>
      <DialogContent>Are you sure you want to continue?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">Confirm</Button>
      </DialogActions>
    </Dialog>
  )}
</AnimatePresence>;
```

---

## Avatars

Docs: https://syncui.design/components/avatars

Variants: `overlapping`, `minimal-grid`

```jsx
import { Avatar, Box } from "@mui/material";
import { motion } from "motion/react";

const MotionAvatar = motion.create(Avatar);

// Overlapping group with stagger
<Box sx={{ display: "flex" }}>
  {users.map((user, i) => (
    <MotionAvatar
      key={user.id}
      src={user.avatar}
      alt={user.name}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.06 }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      sx={{
        width: 40,
        height: 40,
        ml: i === 0 ? 0 : -1.5,
        border: "2px solid",
        borderColor: "background.paper",
      }}
    />
  ))}
</Box>;
```

Note: `AvatarWithFallback` sub-component handles broken image states with a placeholder initial.

---

## Text Fields

Docs: https://syncui.design/components/textfields

Variants: `otp`, `floating-label`

```jsx
import { TextField } from "@mui/material";
import { motion } from "motion/react";

const MotionTextField = motion.create(TextField);

// Floating label style
<MotionTextField
  label="Email"
  variant="outlined"
  fullWidth
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.25 }}
  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
/>;

// OTP variant: renders 6 individual inputs
// Handles auto-focus on change and paste event splitting
// Copy from: https://syncui.design/components/textfields (OTP variant)
```

---

## Autocomplete

Docs: https://syncui.design/components/autocomplete

Features real-time filtering and viewport-aware dropdown positioning (`calculatePosition` flips to "top" when not enough space below).

```jsx
import { Autocomplete, TextField } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";

<Autocomplete
  options={options}
  renderInput={(params) => <TextField {...params} label="Search" />}
  // Sync UI wraps the listbox with AnimatePresence for entrance animation
  ListboxComponent={motion.create("ul")}
  sx={{ width: 320 }}
/>;
```

---

## Date Picker

Docs: https://syncui.design/components/datepickers

Uses `SingleDatePicker` with a `useMemo`-generated 42-day grid (6 weeks) for stable layout.

```jsx
// Sync UI builds a custom date picker on top of MUI styling.
// The component manages: selectedDate state, calendar grid generation,
// month navigation, and animated date cell hover states.
// Copy the full component from: https://syncui.design/components/datepickers
```

---

## Time Picker

Docs: https://syncui.design/components/timepickers

Variants: `12hour`, `24hour`

Manages `{ hour, minute, second, period }` state with increment/decrement controls and input validation per variant.

```jsx
// Copy from: https://syncui.design/components/timepickers
// State shape: { hour: "12", minute: "00", second: "00", period: "PM" }
```

---

## Tabs

Docs: https://syncui.design/components/tabs

Uses `layoutId` from motion/react for shared layout animation. The active indicator physically slides between tab items.

```jsx
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";

const tabs = ["Overview", "Analytics", "Settings"];
const [active, setActive] = useState(0);

// Sliding underline variant
<Box sx={{ display: "flex", gap: 3, borderBottom: 1, borderColor: "divider" }}>
  {tabs.map((tab, i) => (
    <Box key={tab} onClick={() => setActive(i)} sx={{ pb: 1, cursor: "pointer", position: "relative" }}>
      <Typography
        variant="body2"
        fontWeight={active === i ? 600 : 400}
        color={active === i ? "text.primary" : "text.secondary"}
      >
        {tab}
      </Typography>
      {active === i && (
        <motion.div
          layoutId="underline"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "currentColor",
          }}
        />
      )}
    </Box>
  ))}
</Box>

// Animated tab panel
<AnimatePresence mode="wait">
  <motion.div
    key={active}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.18 }}
  >
    {panels[active]}
  </motion.div>
</AnimatePresence>
```

---

## Accordions

Docs: https://syncui.design/components/accordions

```jsx
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

<Accordion
  sx={{
    borderRadius: "12px !important",
    "&:before": { display: "none" },
    boxShadow: "none",
    border: "1px solid",
    borderColor: "divider",
    mb: 1,
  }}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography fontWeight={500}>Question text</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography variant="body2" color="text.secondary">
      Answer text here.
    </Typography>
  </AccordionDetails>
</Accordion>;
```

---

## Carousels

Docs: https://syncui.design/components/carousels

Includes image preloading (`preloadImages`) to prevent layout shift.

Variants: `fade`, `scale`, `slide`

```jsx
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";

const [[page, dir], setPage] = useState([0, 0]);

const variants = {
  enter: (d) => ({ x: d > 0 ? 400 : -400, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d < 0 ? 400 : -400, opacity: 0 }),
};

const paginate = (newDir) => setPage([page + newDir, newDir]);

<Box sx={{ position: "relative", overflow: "hidden" }}>
  <AnimatePresence custom={dir} mode="wait">
    <motion.div
      key={page}
      custom={dir}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <img
        src={slides[page].src}
        alt={slides[page].alt}
        style={{ width: "100%" }}
      />
    </motion.div>
  </AnimatePresence>
</Box>;
```

---

## Grids

Docs: https://syncui.design/components/grids

Variants: `standard`, `masonry`, `organic-shapes`

```jsx
// Masonry: uses CSS column layout
<Box
  sx={{
    columnCount: { xs: 1, sm: 2, md: 3 },
    columnGap: 2,
  }}
>
  {items.map((item) => (
    <Box key={item.id} sx={{ breakInside: "avoid-column", mb: 2 }}>
      {/* card */}
    </Box>
  ))}
</Box>;

// Organic shapes: border-radius values from useMemo to avoid re-render jitter
const shapes = useMemo(
  () =>
    items.map(() => `${20 + Math.random() * 40}% ${60 + Math.random() * 20}%`),
  [items],
);
```

---

## Loaders / Skeletons

Docs: https://syncui.design/components/loaders  
Docs: https://syncui.design/components/skeletons

Skeleton variants: `shimmer`, `pulse`, `wave`

```jsx
import { Box } from "@mui/material";
import { motion } from "motion/react";

// Shimmer: gradient moves from -100% to 100%
<Box sx={{ position: "relative", overflow: "hidden", bgcolor: "action.hover", borderRadius: 2, height: 120 }}>
  <motion.div
    style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
    }}
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
  />
</Box>

// Pulse: opacity oscillation
<motion.div
  style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, height: 20 }}
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 1.5, repeat: Infinity }}
/>

// Wave: five staggered bars
{[...Array(5)].map((_, i) => (
  <motion.div
    key={i}
    style={{ width: 4, height: 20, background: "currentColor", borderRadius: 2 }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
  />
))}
```

---

## Tables

Docs: https://syncui.design/components/tables

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { motion } from "motion/react";

const MotionRow = motion.create(TableRow);

<Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
  <Table>
    <TableHead>
      <TableRow sx={{ "& th": { fontWeight: 600, bgcolor: "action.hover" } }}>
        <TableCell>Name</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="right">Amount</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, i) => (
        <MotionRow
          key={row.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell align="right">{row.amount}</TableCell>
        </MotionRow>
      ))}
    </TableBody>
  </Table>
</Paper>;
```

---

## Marquees

Docs: https://syncui.design/components/marquees

Variants: `horizontal`, `vertical`

```jsx
import { Box } from "@mui/material";
import { motion } from "motion/react";

// Horizontal infinite scroll
<Box sx={{ overflow: "hidden" }}>
  <motion.div
    style={{ display: "flex", gap: 16 }}
    animate={{ x: ["0%", "-50%"] }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    {/* Render items twice for seamless loop */}
    {[...items, ...items].map((item, i) => (
      <Box key={i}>{item}</Box>
    ))}
  </motion.div>
</Box>;
```

---

## Backgrounds

Docs: https://syncui.design/components/backgrounds

Variants: `magnetic-connections`, `gemini-wave`

Interactive backgrounds use `requestAnimationFrame` and mouse tracking.

- `magnetic-connections`: Calculates distance between mouse position and a dot grid, draws connecting lines below a threshold distance.
- `gemini-wave`: SVG path morphing using an array of path strings in the Motion `animate` prop.

These are canvas/SVG-heavy components. Copy directly from: https://syncui.design/components/backgrounds

---

## Docks

Docs: https://syncui.design/components/docks

macOS-style magnifying dock using `useMotionValue`, `useTransform`, and `useSpring`.

```jsx
import { Box, Tooltip } from "@mui/material";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

function DockItem({ icon, label, mouseX }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - b.x - b.width / 2;
  });

  const sizeSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Tooltip title={label} placement="top">
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {icon}
      </motion.div>
    </Tooltip>
  );
}

function Dock({ items }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <Box
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      sx={{ display: "flex", alignItems: "flex-end", gap: 1, p: 1 }}
    >
      {items.map((item) => (
        <DockItem key={item.label} {...item} mouseX={mouseX} />
      ))}
    </Box>
  );
}
```

---

## Pagination

Docs: https://syncui.design/components/pagination

```jsx
import { Pagination } from "@mui/material";
import { motion } from "motion/react";

const MotionPagination = motion.create(Pagination);

<MotionPagination
  count={10}
  page={page}
  onChange={(_, v) => setPage(v)}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  sx={{ "& .MuiPaginationItem-root": { borderRadius: 2 } }}
/>;
```
