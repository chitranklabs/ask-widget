---
title: Customize chat widget themes
description: Style ask-widget with light and dark presets, CSS variables and custom colors that match your React website.
---

**ask-widget** comes with a premium, monochrome design based on the "zinc" and "neutral" color palettes popular in the modern developer ecosystem.

## Built-in Themes

You can toggle between `dark` and `light` themes with the `theme` prop:

```tsx
<ChatWidget theme="light" />
```

## Custom Colors

If you need to align the widget's colors with your personal site, you can pass a `colors` object:

```tsx
<ChatWidget
  colors={{
    primary: '#f43f5e' /* Accent color for bubbles and buttons */,
    background: '#09090b' /* Background color of the chat panel */,
    text: '#fafafa' /* Main text color */,
    border: '#27272a' /* Border colors for the widget */,
    userBubble: '#18181b' /* Background of user messages */,
    surface: '#111113' /* Background of input and system chips */,
  }}
/>
```

### Note on Custom Colors

These values are applied as CSS variables to ensure they are consistent across the UI. They will override the theme defaults for both `dark` and `light` presets.
