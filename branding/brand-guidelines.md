# cssanimation – Brand Guidelines

> **Version**: 1.0.0 **Updated**: 2025-06-25  
> **Author**: Shafayetul Islam Pavel

## Brand Essence

- **Name**: `cssanimation`
- **Tagline**: _Bringing Interfaces to Life_
- **Mission**: Empower developers and designers with beautiful, modern, and reusable CSS & GSAP-based animations.

## Logo System

### Primary Logo

- Lowercase `cssanimation` in a clean geometric sans-serif
- Icon concepts:
  - Abstract wave (animation flow)
  - Angle brackets & play symbol (code + motion)
  - Overlapping X mark (interaction & transformation)

### Monochrome Logo

- Use for dark or high-contrast layouts

### Icon-Only Mark

- The logo icon can be used standalone as a favicon, badge, or app icon.

## Typography

| Style          | Font Family                            | Usage               |
| -------------- | -------------------------------------- | ------------------- |
| Logo & Headers | `Inter`, `Poppins`, or `Satoshi`       | Brand name, H1, H2  |
| UI & Labels    | `Inter` or `DM Sans`                   | Nav, buttons, tags  |
| Code           | `Fira Code`, `JetBrains Mono`, `Menlo` | Examples & snippets |

## 🎨 Color Palette

| Color         | Hex       | Usage                       |
| ------------- | --------- | --------------------------- |
| Electric Blue | `#00CFFF` | Accent, glow highlights     |
| Magenta Glow  | `#FF3EDB` | Secondary accent, gradients |
| Night Black   | `#111111` | Logo text, dark backgrounds |
| Slate Gray    | `#666D7A` | Subtext, UI elements        |
| White         | `#FFFFFF` | Background, contrast base   |

## Iconography & Visual Motifs

- Waveforms, scanlines, brackets (`<`, `>`), glitch effects, pixel transitions
- Subtle shadows, smooth steps, glowing borders
- Encouraged: animation loops, hover-responsive elements

## Layout & Grid

- Use a **12-column grid**
- Mobile-first with responsive breakpoints:
  - `sm` = 640px, `md` = 768px, `lg` = 1024px, `xl` = 1280px
- Spacing system: 4px base unit (`.p-4`, `.gap-8`, etc.)

## 🔁 Animation Style

| Type      | Preferred Technique            | Example Class              |
| --------- | ------------------------------ | -------------------------- |
| Text FX   | `steps()`, `clip-path`, `blur` | `ca__fx-stepTypeIn`        |
| Entrances | `scale`, `fade`, `slide`       | `ca__fx-slideInSteps`      |
| Exits     | Reversed motion + `opacity: 0` | `ca__fx-stepZoomOut`       |
| Triggers  | Scroll, `mouseenter`, click    | via `ca-gt-` or AnimaticJS |

## Logo Usage Do’s & Don’ts

✅ Do:

- Maintain clear space around the logo
- Use the primary gradient only on light or white backgrounds
- Scale proportionally

❌ Don’t:

- Stretch or distort the logo
- Change color arbitrarily
- Use effects like bevel, drop shadow, or emboss

## 📦 Assets Directory

| Asset                | Filename                  |
| -------------------- | ------------------------- |
| Primary logo (color) | `cssanimation-logo-1.png` |
| Chevron/X logo       | `cssanimation-logo-2.png` |
| Play/code logo       | `cssanimation-logo-3.png` |
| Favicon              | `favicon.ico`             |

## Voice & Tone

- Friendly but professional
- Creative and empowering
- Geared toward front-end developers, designers, and UI engineers
