# Sync UI Blocks

Blocks are pre-built composite sections for landing pages and SaaS dashboards.
Each block combines multiple MUI elements and Motion animations into one ready-to-use layout.
All blocks use the same variant-based architecture as components.

Browse live: https://syncui.design/blocks

Block files live in `components/ui/blocks/` in the repo.
Icon dependencies: `@hugeicons/react` (Hero, CTA blocks) and `react-icons/fi` (Stats blocks).

---

## Hero Blocks

Docs: https://syncui.design/blocks/hero
Component: `HeroVariants`
Variants: `left-aligned`, `center-aligned`, `search`

Usage:

```jsx
<HeroVariants variant="left-aligned" />
<HeroVariants variant="center-aligned" />
<HeroVariants variant="search" />
```

Variant details:

`left-aligned` - Minimalist layout with clean typography and subtle entrance animations.
Best for content-heavy value propositions. Headline on the left with a supporting paragraph and CTA buttons.

`center-aligned` - Balanced centered layout with a primary call-to-action.
Common for SaaS product launches. Uses staggered `motion.div` entrance from bottom.

`search` - Integrates a `TextField` input directly in the hero area.
Best for utility-driven landing pages where the first action is a search or signup input.

Animation pattern shared by all Hero variants:

```jsx
import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

<motion.div variants={containerVariants} initial="hidden" animate="show">
  <motion.h1 variants={childVariants}>Headline</motion.h1>
  <motion.p variants={childVariants}>Subheading</motion.p>
  <motion.div variants={childVariants}>{/* CTA buttons */}</motion.div>
</motion.div>;
```

Dark mode: backgrounds use `theme.palette.mode === "dark" ? "#000000" : "#FFFFFF"`.

---

## CTA Blocks

Docs: https://syncui.design/blocks/cta
Component: `CtaVariants`
Variants: `centered`, `split`, `card`

Usage:

```jsx
<CtaVariants variant="centered" />
<CtaVariants variant="split" />
<CtaVariants variant="card" />
```

Variant details:

`centered` - High-visibility section with a headline and two action buttons side by side.
Standard bottom-of-page CTA. Headline + subtext + primary and secondary buttons.

`split` - Horizontal layout separating the text block from the action buttons.
Good for mid-page transitions. Left side holds headline and description, right side holds the buttons.

`card` - The entire CTA is wrapped in a bordered or elevated `Card` container.
Adds visual separation and draws attention within a busy page.

Icon usage: `HugeiconsIcon` from `@hugeicons/react` in Hero and CTA blocks.

```jsx
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/react";

<Button endIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={18} />}>
  Get started
</Button>;
```

---

## Pricing Blocks

Docs: https://syncui.design/blocks/pricing
Component: `PricingVariants`
Variants: `three-tier`, `two-tier`, `row`

Usage:

```jsx
<PricingVariants variant="three-tier" />
<PricingVariants variant="two-tier" />
<PricingVariants variant="row" />
```

Variant details:

`three-tier` - Standard Starter, Pro, and Enterprise card grid.
Each card has a plan name, price, feature list, and CTA button. Cards animate in with staggered delays.

`two-tier` - Simplified two-column comparison for basic vs. advanced plans.
Cleaner layout, less cognitive load. Good for early-stage products.

`row` - Horizontal list layout for enterprise feature comparison tables.
Features run as rows, plans as columns. Good for complex feature matrices.

Animation: each tier card uses `motion.div` with an entrance delay per index:

```jsx
{
  tiers.map((tier, i) => (
    <motion.div
      key={tier.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: i * 0.1,
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
    >
      {/* tier card */}
    </motion.div>
  ));
}
```

---

## Stats Blocks

Docs: https://syncui.design/blocks/stats
Component: `StatsVariants`
Variants: `simple`, `with-icons`

Usage:

```jsx
<StatsVariants variant="simple" />
<StatsVariants variant="with-icons" />
```

Variant details:

`simple` - Large numeric values with sub-labels in a responsive grid.
Clean and minimal. Numbers animate in with staggered entrance from bottom.

`with-icons` - Combines metric numbers with icon badges using `react-icons/fi`.
Each stat card has an icon, a large number, and a label. Good for adding visual hierarchy.

Icon usage for Stats blocks:

```jsx
import { FiUsers, FiStar, FiDownload } from "react-icons/fi";
```

Animation: container uses `staggerChildren` to create a sequential reveal effect:

```jsx
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const statVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {stats.map((stat) => (
    <motion.div key={stat.label} variants={statVariants}>
      <Typography variant="h3" fontWeight={700}>
        {stat.value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {stat.label}
      </Typography>
    </motion.div>
  ))}
</motion.div>;
```

Responsive grid pattern used in all Stats blocks:

```jsx
sx={{
  display: "grid",
  gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
  gap: 3,
}}
```
