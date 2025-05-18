# cssanimation.io

> A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.

<!-- Tech & Status -->

![CSS](https://img.shields.io/badge/style-CSS-blue)
[![NPM](https://img.shields.io/npm/v/cssanimationio.svg)](https://www.npmjs.com/package/cssanimationio)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/yesiamrocks/cssanimation.io/badge)](https://www.jsdelivr.com/package/gh/yesiamrocks/cssanimation.io)
[![GitHub issues](https://img.shields.io/github/issues/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/issues)
[![GitHub stars](https://img.shields.io/github/stars/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/stargazers)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://cssanimation.io)

[![GSAP Support](https://img.shields.io/badge/Also%20Supports-GSAP%20Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

**cssanimation.io** is a lightweight, modular **CSS animation library** designed for developers, designers, and UI ninjas. It provides over **300+ CSS and GSAP-powered plug-and-play animation** classes to bring your interfaces to life — from simple fades and zooms to dynamic letter effects and 3D transitions.

You stay in control, just apply the [class names](cssanimation-cheatsheet.md) when and where you want them. **No dependencies. No setup. Just clean, reusable animations.**

### Why Developers Love It

- **Over 300 prebuilt animations**: fade, zoom, rotate, fly, bounce, skew, and more.
- **GSAP support:** Add powerful animations with GreenSock.
- Animations for **text, elements and individual letters**.
- **Modular and lightweight**: no unnecessary code, just pure animation goodness.
- **Easy to use**: just add a class, and your animation is live.
- **Customizable**: tweak animation properties to fit your design.
- **Zero JavaScript**, no dependencies, and fine-grained control.
- Great for scroll reveals, UI micro interactions, hero effects, and more.
- **Free** and open-source, with a growing community.

## ![CSS Animation](https://img.shields.io/badge/CSS-Animations-blue) CSS Animation Guide

#### Option A: Install with NPM

```shell
npm i cssanimationio
```

Import it into your file:

```shell
`import 'cssanimation.css';`
```

#### Option B: Install via CDN

Include the `cssanimation.css` library into the `<head>`:

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/cssanimationio/dist/cssanimation.css"
  />
</head>
```

## Usage Examples

After installing `cssanimation.css` library, now add the class `.cssanimation` and the class of animation name like `.fadeIn` for fade in animation to an element. For list of animation class name [click here](cssanimation-cheatsheet.md) or [check the website](https://cssanimation.io/getting-started.html).

```html
<h1 class="cssanimation fadeIn">Hello, World!</h1>
```

_That's it! You've got a CSS animated element. Super!_

## How to Use Letter Animations

Animate your text one letter at a time with style. Our library includes **two exclusive types** of letter animations: `sequence` and `random`.

What Are Sequence and Random Animations?

- **`sequence`** – Letters animate **one after another**, in order.
- **`random`** – Letters animate in a **randomized order**, adding playful motion.

#### Step 1. Include the Script

Add this right **before the closing `</body>` tag**:

```html
<script src="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@latest/letteranimation.min.js"></script>
```

#### Step 2. Add Animation classes to Your HTML

Use:

| Class          | What It Does                                    |
| -------------- | ----------------------------------------------- |
| `cssanimation` | Base class for all animations                   |
| `leFadeIn`     | A letter animation class (Fades in each letter) |
| `sequence`     | Animates letters in order                       |
| `random`       | Animates letters in random order                |

```html
<h1 class="cssanimation leFadeIn sequence">Hello World</h1>
<h2 class="cssanimation leFadeIn random">Surprise!</h2>
```

> This feature is **exclusive to cssanimation.io** — making it perfect for creative headlines, banners, parallax effect, hero sections, and expressive UI storytelling.

## Modular Import

Only need fade and zoom?

```html
<link href="cssanimation.io/src/fade.css" rel="stylesheet" />
<link href="cssanimation.io/src/zoom.css" rel="stylesheet" />
```

#### Available Modules

| Module      | File               |
| ----------- | ------------------ |
| Fade        | `src/fade.css`     |
| Zoom        | `src/zoom.css`     |
| Rotate      | `src/rotate.css`   |
| Bounce      | `src/bounce.css`   |
| Slide       | `src/slide.css`    |
| ...and more | See `/src/` folder |

## Utility Class

cssanimation.io includes handy utility classes to make animations even easier to apply. Just use them along with the `.cssanimation` base class and your chosen animation class.

### Duration (Speed Classes)

| Class Name    | Duration | Description               |
| ------------- | -------- | ------------------------- |
| `speed-blitz` | `0.3s`   | Very fast                 |
| `speed-quick` | `0.6s`   | Default (slightly faster) |
| `speed-chill` | `1.2s`   | Calm and fluid            |
| `speed-drift` | `2s`     | Slow motion               |
| `speed-snail` | `3s`     | Super slow                |

### Delay (Start Later)

| Class Name | Delay   | Description       |
| ---------- | ------- | ----------------- |
| `delay-1`  | `0.25s` | Slight pause      |
| `delay-2`  | `0.5s`  | Half second delay |
| `delay-3`  | `1s`    | One second delay  |
| `delay-5`  | `2s`    | Two seconds delay |

### Easing (Timing Functions)

| Class Name    | Easing Function                | Description           |
| ------------- | ------------------------------ | --------------------- |
| `ease-smooth` | `ease-in-out`                  | Default smooth motion |
| `ease-snappy` | `cubic-bezier(.5, 1.8, .5, 1)` | Spring pop            |
| `ease-chill`  | `ease-in`                      | Gentle start          |
| `ease-punch`  | `ease-out`                     | Quick exit            |
| `ease-linear` | `linear`                       | Constant speed        |

### Repeating (Loops)

| Class Name     | Behavior             | Description             |
| -------------- | -------------------- | ----------------------- |
| `loop-once`    | `1`                  | Play one time (default) |
| `loop-forever` | `infinite`           | Infinite repeat         |
| `loop-triple`  | `3`                  | 3x repeat               |
| `loop-bounce`  | `infinite alternate` | Ping-pong style         |

Combo Example

```html
<h2 class="cssanimation zoomIn speed-chill delay-3 ease-snappy loop-bounce">
  Magical Entrance!
</h2>
```

# ![GSAP Powered](https://img.shields.io/badge/GSAP-Powered-brightgreen) GSAP Animation Guide

cssanimation.io isn’t just about CSS – it also supports **GSAP** (GreenSock Animation Platform), the gold standard for JavaScript animations. With GSAP, you get even more powerful, smooth, and flexible control over your animations.

## Why Use the GSAP Version?

- Smoother and more performant animations.
- Fine control over timing, easing, delays, and sequencing.
- Works great with ScrollTrigger, SplitText, and other GSAP plugins.
- Ideal for creative UI/UX and motion design.

## Getting Started with GSAP Version

Here’s how to animate elements using our GSAP-powered version:

#### 1. Install via NPM

```bash
npm install cssanimationio gsap
```

Then in your JavaScript:

```js
// Import GSAP core
import { TweenMax } from "gsap";

// Import cssanimation.io's GSAP integration
import "cssanimationio/cssanimation-gsap";

// Include CSS styles
import "cssanimationio/cssanimation.css"; // or cssanimation.min.css
```

#### Or Include via CDN. If you're working without a bundler:

```html
<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js"></script>

<!-- cssanimation.io's GSAP script -->
<script src="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@latest/cssanimation-gsap.js"></script>
```

### 2. Add Animation Classes to Your Elements

Add the `cssanimation` class and one of the supported animation class names, like `fadeIn`:

```html
<h1 class="cssanimation fadeIn">Example</h1>
```

📌 **Tip**: Check the full list of animation class names on the [homepage](https://cssanimation.io) or in the cheatsheet.

### 3. Letter Animations (Sequential Only)

For **letter-by-letter animation**, just use any `le*` animation class like `leFadeIn`.

```html
<h1 class="cssanimation leFadeIn">Amazing!</h1>
```

_Note: The GSAP version currently supports **sequential letter animations only**. Random animation support is coming soon!_

## CSS vs. GSAP – Which Animation Version Should You Use?

| Feature / Capability        | **CSS Version**                      | **GSAP Version**                                      |
| --------------------------- | ------------------------------------ | ----------------------------------------------------- |
| 🧱 Technology               | Pure CSS                             | JavaScript (GSAP)                                     |
| ⚡ Performance              | Great for simple UI effects          | Optimized for complex, smooth animations              |
| 🎛 Control                   | Fine-grained control via CSS         | Fine-grained control via JS (timing, easing)          |
| 🎞 Animation Types           | Predefined class-based animations    | Class-based with dynamic GSAP tweening                |
| 🔤 Letter Animation Support | ✅ Sequence & Random                 | ✅ Sequence only (random coming soon)                 |
| 🔁 Looping & Repeating      | `infinite` class                     | Full loop control via JS (e.g. `repeat`, `yoyo`)      |
| ⚙️ Configuration            | Minimal setup                        | Script includes + optional JS tweaks                  |
| 🎨 Customization            | Moderate (via utility classes)       | High — control properties on the fly                  |
| 📦 Size                     | Very lightweight (no JS needed)      | Heavier due to JS dependency                          |
| 🧩 Dependencies             | None                                 | Requires GSAP (`TweenMax`)                            |
| 🌐 CDN Available?           | ✅ Yes                               | ✅ Yes                                                |
| 🛠 NPM Ready?                | ✅ Yes (`cssanimationio`)            | ✅ Yes (`cssanimationio`)                             |
| 🧠 Use Case Examples        | Hover states, hero sections, banners | Interactive animations, scroll triggers, custom flows |

## Accessibility: Reduce Motion Support

By default, cssanimation.io respects user system preferences. When `prefers-reduced-motion: reduce` is enabled, animations are automatically turned off for a better UX.

## License

cssanimation.io is licensed under the [Hippocratic License.](https://firstdonoharm.dev/)

## Having trouble?

If **cssanimation.io** isn't doing what you expect it to please create a [issue](https://github.com/yesiamrocks/cssanimation.io/issues)

![Built with ❤️ by Pavel](https://img.shields.io/badge/built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange)
