---
version: alpha
name: Sync UI
description: Sync UI's design system. Light and Dark theme tokens, typography, motion, and component patterns for AI agents and developers.
colors:
  light:
    background-default: "#FFFFFF"
    background-paper: "#F8F8F8"
    text-primary: "#1A1A1A"
    text-secondary: "#585858"
    primary-main: "#3366FF"
    primary-light: "#6690FF"
    primary-dark: "#0040FF"
    secondary-main: "#FF3366"
    secondary-light: "#FF6690"
    secondary-dark: "#FF0040"
    divider: "rgba(0, 0, 0, 0.12)"
  dark:
    background-default: "#000000"
    background-paper: "#080808"
    text-primary: "#FFFFFF"
    text-secondary: "#B0B0B0"
    primary-main: "#66A3FF"
    primary-light: "#99C2FF"
    primary-dark: "#3385FF"
    secondary-main: "#FF6699"
    secondary-light: "#FF99BB"
    secondary-dark: "#FF3377"
    divider: "rgba(255, 255, 255, 0.12)"
typography:
  fontFamily: "Montserrat, Helvetica, Arial, sans-serif"
  h1:
    fontWeight: 700
    fontSize: 42px
    lineHeight: 1.25
    responsive: { sm: 52px, md: 58px, lg: 64px }
  h2:
    fontWeight: 700
    fontSize: 34px
    lineHeight: 1.33
    responsive: { sm: 40px, md: 44px, lg: 48px }
  h3:
    fontWeight: 600
    fontSize: 26px
    lineHeight: 1.5
    responsive: { sm: 32px, md: 36px, lg: 40px }
  h4:
    fontWeight: 600
    fontSize: 22px
    lineHeight: 1.5
    responsive: { sm: 24px, md: 28px, lg: 32px }
  h5:
    fontWeight: 500
    fontSize: 20px
    lineHeight: 1.5
    responsive: { sm: 20px, md: 24px, lg: 28px }
  h6:
    fontWeight: 500
    fontSize: 18px
    lineHeight: 1.56
    responsive: { sm: 18px, md: 20px, lg: 22px }
  subtitle1:
    fontWeight: 600
    fontSize: 16px
    lineHeight: 1.5
    responsive: { sm: 16px, md: 18px, lg: 20px }
  subtitle2:
    fontWeight: 500
    fontSize: 14px
    lineHeight: 1.57
    responsive: { sm: 14px, md: 16px, lg: 18px }
  body1:
    fontWeight: 400
    fontSize: 16px
    lineHeight: 1.5
    responsive: { sm: 16px, md: 16px, lg: 18px }
  body2:
    fontWeight: 400
    fontSize: 14px
    lineHeight: 1.57
    responsive: { sm: 14px, md: 14px, lg: 16px }
  button:
    fontWeight: 600
    fontSize: 14px
    lineHeight: 1.71
    textTransform: capitalize
    responsive: { sm: 14px, md: 15px, lg: 16px }
  caption:
    fontWeight: 400
    fontSize: 12px
    lineHeight: 1.5
    responsive: { sm: 12px, md: 13px, lg: 14px }
  overline:
    fontWeight: 700
    fontSize: 12px
    lineHeight: 1.5
    textTransform: uppercase
    responsive: { sm: 12px, md: 13px, lg: 14px }
spacing:
  unit: 8px
  base: MUI default spacing scale, multiples of 8px
shape:
  borderRadius: 8px
motion:
  snappy: { type: spring, stiffness: 400, damping: 17 }
  smooth: { type: spring, stiffness: 300, damping: 24 }
  gentle: { duration: 0.4s, ease: easeOut }
  fast: { duration: 0.15s, ease: easeInOut }
components:
  button-contained:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.background-default}"
    border: "1px solid {colors.text-primary}"
    borderRadius: 8px
    padding: "8px 20px"
    fontSize: 16px
    transition: all 0.3s ease-in-out
  button-outlined:
    backgroundColor: "{colors.background-default}"
    textColor: "{colors.text-primary}"
    border: "1px solid {colors.text-primary}"
    borderRadius: 8px
    padding: "8px 20px"
    fontSize: 16px
    transition: all 0.3s ease-in-out
  tooltip:
    backgroundColor: inverted text-primary
    textColor: inverted background-default
    borderRadius: 4px
    padding: 6px
    fontSize: 12px
    fontWeight: 500
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
---

# Sync UI

## Overview

Sync UI is a copy-paste animated component library for React, built on MUI and Motion. The design language pairs MUI's structured component system with Motion driven micro interactions. Every component ships with built in animation, so motion is not optional polish, it is part of the component's identity.

This file covers both Light and Dark themes. Color tokens are nested under `colors.light` and `colors.dark` in the frontmatter above. Typography, spacing, shape, and motion are theme independent and apply to both modes.

## Get the Agent Skill

Full component code, variant references, and animation patterns are maintained as an Agent Skill. Install with one command.

```sh
npx skills add AbhiVarde/syncui
```

Skill repository: https://github.com/AbhiVarde/syncui/tree/main/skills/syncui

## Colors

Each theme follows the same two step background scale and paired text scale.

- `background-default` is the page surface.
- `background-paper` is a secondary surface for cards, panels, and elevated content.
- `text-primary` carries headings and primary content.
- `text-secondary` carries supporting and secondary content.

`primary` and `secondary` each carry a `main`, `light`, and `dark` value for default, hover, and active states. `divider` is a translucent border, black at 12 percent opacity in light mode, white at 12 percent opacity in dark mode.

Dark mode flips both background and text, then shifts `primary` and `secondary` lighter to hold contrast against a black surface. For example `primary-main` moves from `#3366FF` in light mode to `#66A3FF` in dark mode.

## Typography

Montserrat sets all UI and prose. Type scales from `h1` through `overline`, each with a base size and three responsive breakpoints, `sm` at 600px, `md` at 900px, `lg` at 1200px.

Headings, `h1` through `h6`, scale up significantly at wider viewports, `h1` ranges from 42px to 64px. `subtitle1` and `subtitle2` sit between headings and body for section labels and emphasis text. `body1` and `body2` carry main content, `body1` for primary reading text, `body2` for secondary or denser content. `button` uses capitalized text transform with a 600 weight for clear call to action emphasis. `caption` and `overline` are the smallest sizes, `overline` is uppercase and bold for labels and tags.

Typography tokens are identical across both themes, only color changes between light and dark.

## Layout

Spacing follows MUI's default 8px unit scale. Border radius is a flat 8px across all components for visual consistency, buttons, cards, tooltips, and panels all share this radius unless a component explicitly overrides it. Layout structure does not change between themes.

## Motion

Motion is core to Sync UI, not decorative. Every interactive component uses Motion with one of four timing presets depending on the interaction.

- Snappy, spring with stiffness 400 and damping 17, for buttons and immediate feedback.
- Smooth, spring with stiffness 300 and damping 24, for cards and panel transitions.
- Gentle, 0.4 second ease out, for page sections and scroll triggered reveals.
- Fast, 0.15 second ease in out, for micro interactions like tab switches.

Always wrap conditionally unmounting components in AnimatePresence. Always use once true for scroll triggered reveals so animations do not retrigger. Always respect reduced motion preference and skip nonessential animation when the user prefers reduced motion. Motion timing presets are identical across both themes.

## Components

- `button-contained`, solid `text-primary` fill with an inverted text color, the primary action style. Inverts automatically between themes since it references the `text-primary` token.
- `button-outlined`, transparent fill with a `text-primary` border and text, for secondary actions.
- `tooltip`, inverted background and text relative to the active theme, black background with white text in light mode, white background with black text in dark mode.

All buttons share an 8px border radius, 8px by 20px padding, and a 0.3 second ease in out transition on all properties.

## Do's and Don'ts

- Use `text-primary` for headings and primary content, `text-secondary` for supporting text.
- Apply the typography tokens directly instead of setting font size or weight by hand.
- Keep the 8px border radius consistent across all custom components added to a project.
- Pair every interactive component with a motion preset, snappy for clicks, smooth for hover states.
- Reference theme tokens by name so components automatically adapt between light and dark mode.
- Do not import from framer motion, always import from motion react.
- Do not skip AnimatePresence when a component conditionally unmounts, exits will not animate.
- Do not hardcode hex colors directly in components, reference the palette tokens so light and dark mode stay in sync.