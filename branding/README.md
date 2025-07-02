# cssanimation Branding Assets

This folder contains official branding assets and guidelines for the **cssanimation** project.

## Files

- `cssanimation-logo-1.png`: Primary wave logo
- `cssanimation-logo-2.png`: X/chevron style logo
- `cssanimation-logo-3.png`: Angle brackets + play icon
- `favicon.ico`: Auto-generated favicon
- `brand-guidelines.md`: Full brand identity and usage rules

Please do not modify these files without maintainer approval.

```css
:root {
  --color-brand: #7e2ea0;
  --color-secondary: #4e1671;
  --color-accent: #c24ef2;

  --color-bg-dark: #0e0a1a;
  --color-bg-light: #f5f2fa;
  --color-surface: #1c102b;

  --color-text-dark: #e6d9f3;
  --color-text-light: #1d082b;

  --color-success: #00d288;
  --color-warning: #f5be40;
  --color-error: #f34b7d;
}

:root {
  /* Light Theme */
  --color-bg: #f5f2fa;
  --color-sidebar: #ded0ea;
  --color-header: #7e2ea0;
  --color-btn: #7e2ea0;
  --color-btn-hover: #601e88;
  --color-text: #1d082b;
  --color-text-muted: #5e4c72;
  --color-panel: #ffffff;
  --color-border: #c9bddb;
}

[data-theme='dark'] {
  --color-bg: #0e0a1a;
  --color-sidebar: #1c102b;
  --color-header: #7e2ea0;
  --color-btn: #c24ef2;
  --color-btn-hover: #4e1671;
  --color-text: #e6d9f3;
  --color-text-muted: #aa8cc9;
  --color-panel: #2a1a3d;
  --color-border: #39274f;
}
```

## Brand Color Core

| Role                   | Color Name      | Hex Code  | Notes                                      |
| ---------------------- | --------------- | --------- | ------------------------------------------ |
| **Primary**            | Royal Purple    | `#7c3994` | Main identity color                        |
| **Secondary (Bright)** | Electric Violet | `#d05cff` | High-energy accent color (bright contrast) |
| **Tertiary**           | Deep Grape      | `#4e1a65` | For shadows, hover states                  |
| **Accent**             | Vibrant Coral   | `#E64C3C` | Lighter complementary accent               |
| **Light Neutral**      | Light Grey      | `#F0F0F0` | Lighter complementary accent               |
| **Dark Neutral**       | Charcoal Grey   | `#4A4A4A` | Lighter complementary accent               |
| **Dark Neutral**       | Charcoal Grey   | `#4A4A4A` | Lighter complementary accent               |

## Dark Mode Palette

| UI Element       | Color Name      | Hex Code  | Notes                        |
| ---------------- | --------------- | --------- | ---------------------------- |
| **Background**   | Deep Charcoal   | `#100818` | Full canvas background       |
| **Sidebar**      | Shadow Purple   | `#1a0f25` | Low-glare muted purple-black |
| **Header**       | Vibrant Magenta | `#7c3994` | Strong brand color           |
| **Buttons**      | Electric Violet | `#d05cff` | Call-to-action button        |
| **Button Hover** | Neon Orchid     | `#b948e2` | Hover or focus state         |
| **Text Primary** | Lavender Fog    | `#e5d8f2` | High contrast                |
| **Text Muted**   | Lilac Gray      | `#a89bb5` | Secondary text               |
| **Card Surface** | Night Grape     | `#24142e` | Panels, widgets              |
| **Border**       | Dusty Violet    | `#3a2a4a` | UI separators                |

## Light Mode Palette

| UI Element       | Color Name      | Hex Code  | Notes                       |
| ---------------- | --------------- | --------- | --------------------------- |
| **Background**   | Soft Lavender   | `#f8f5fc` | Light theme base            |
| **Sidebar**      | Pale Mauve      | `#eadbf5` | Clean side panel background |
| **Header**       | Vibrant Magenta | `#7c3994` | Brand reinforcement         |
| **Buttons**      | Magenta Base    | `#7c3994` | Primary CTA                 |
| **Button Hover** | Orchid Pop      | `#b948e2` | Interactive highlight       |
| **Text Primary** | Deep Plum       | `#1d082b` | Dark readable text          |
| **Text Muted**   | Slate Mauve     | `#5f4e6c` | Paragraphs, labels          |
| **Card Surface** | White           | `#ffffff` | Default panel BG            |
| **Border**       | Misty Lilac     | `#c9b6d8` | Divider lines               |
