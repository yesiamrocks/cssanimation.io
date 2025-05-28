# CSS Animation Library for Developers and Ninjas — cssanimation.io

> A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.

<!-- Tech & Status -->

![CSS](https://img.shields.io/badge/style-CSS-blue)
[![NPM](https://img.shields.io/npm/v/cssanimationio.svg)](https://www.npmjs.com/package/cssanimationio)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/yesiamrocks/cssanimation.io/badge)](https://www.jsdelivr.com/package/gh/yesiamrocks/cssanimation.io)
[![GitHub issues](https://img.shields.io/github/issues/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/issues)
[![GitHub stars](https://img.shields.io/github/stars/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/stargazers)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://cssanimation.io)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./docs/code_of_conduct.md)

[![GSAP Support](https://img.shields.io/badge/Also%20Supports-GSAP%20Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

**cssanimation.io** is a lightweight, modular **CSS animation library** designed for developers, designers, and UI ninjas. It provides over **300+ CSS and GSAP-powered plug-and-play animation** classes to bring your interfaces to life — from simple fades and zooms to dynamic letter effects and 3D transitions.

You stay in control, just apply the [class names](./docs/cssanimation-reference.md) when and where you want them. **Zero setup. Just clean, reusable animations.**

### Why Developers Love It

- **Over 300 prebuilt animations**: fade, zoom, rotate, fly, bounce, skew, and more.
- **GSAP support:** Add powerful animations with GreenSock.
- Animations for **text, elements and individual letters**.
- **Easy to use**: just add a class, and your animation is live.
- **Customizable**: tweak animation properties to fit your design.
- **Zero JavaScript**, no dependencies, and fine-grained control.

## ![CSS Animation](https://img.shields.io/badge/CSS-Animations-blue) CSS Animation Guide

### Installation Guide

#### Install via NPM

```bash
npm i cssanimationio
```

#### Import Everything with One Line

```bash
import 'cssanimationio';
```

This will:

- Load all core CSS animations
- Load all utility classes
- Initialize the letter animation engine
- Import all GSAP animations and make them ready to use

#### Full GSAP + CSS Import (Bundler)

```bash
import 'cssanimationio/css';
import { animationMap } from 'cssanimationio/gsap';
```

#### Individual Imports

CSS only

```bash
import 'cssanimationio/css';           // Core CSS
import 'cssanimationio/utility';       // Utility CSS
```

GSAP only

```bash
import { animationMap } from 'cssanimationio/gsap';
// or use CDN/UMD from cssanimationio/gsap/min.js
```

CSS Letter Animation

```bash
import { initLetterAnimations } from 'cssanimationio/letter';
```

### Install via CDN

Include the `cssanimation.css` library into the `<head>`:

```html
<head>
    <link
        href="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/cssanimation.min.css"
        rel="stylesheet"
    />
</head>
```

### Usage Examples

After installing `cssanimation.css` library, now add the class `.cssanimation` and the class of animation name like `.ca__fx-FadeIn` for fade in animation to an element. For list of animation class name [click here](./docs/cssanimation-reference.md).

```html
<h1 class="cssanimation ca__fx-FadeIn">cssanimation</h1>
```

_That's it! You've got a CSS animated element. Super! 🎉_

### Prefix System for CSS Animations & CSS Utilities

| Prefix    | Description                                      | Example Usage                   |
| --------- | ------------------------------------------------ | ------------------------------- |
| `ca__fx-` | Visual FX animations (pure CSS)                  | `<h1 class="ca__fx-BounceX">`   |
| `ca__u-`  | Utility classes (pure CSS spacing, layout, etc.) | `<h1 class="ca__u-SpeedChill">` |
| `ca__lt-` | Letter-based animations                          | `<h1 class="ca__lt-PopOut">`    |

<br>

## How to Use CSS Letter Animations

Want to animate text, letter by letter?

The **cssanimation.io** library includes **100+ letter-based effects** (`.ca__lt-FadeIn`, `.ca__lt-ZoomIn`, `.ca__lt-Snake`, etc.).

**cssanimation.io** also includes **two exclusive types** of letter animations: `.ca__lt-sequence` and `.ca__lt-random`, which must be added to any element you want to animate letter by letter.

What Are **Sequence** and **Random** Animations?

- **`.ca__lt-sequence`** – Letters animate **one after another**, in order.
- **`.ca__lt-random`** – Letters animate in a **randomized order**, adding playful motion.

#### Step 1. Include the Script

You’ve already installed the cssanimation.io library, so there’s nothing else you need to do if you’re bundling it via a module system like Vite, Webpack, or using itwith a framework (React, Vue, etc.).

If you’re using plain HTML without a bundler, just add the following `<script>` **before the closing `</body>` tag**:

```html
<script src="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/ca-letteranimation.js"></script>
```

#### Step 2. Add Animation classes to Your HTML

| Class              | What It Does                                    |
| ------------------ | ----------------------------------------------- |
| `.cssanimation`    | Base class for all animations (\*required)      |
| `.ca__lt-FadeIn`   | A letter animation class (Fades in each letter) |
| `.ca__lt-sequence` | Animates letters in order or                    |
| `.ca__lt-random`   | Animates letters in random order                |

```html
<h1 class="cssanimation ca__lt-FadeIn ca__lt-sequence">cssanimation</h1>
```

```html
<h2 class="cssanimation ca__lt-FadeIn ca__lt-random">Surprise!</h2>
```

#### CSS Letter Animation Delay Control

You can now customize the animation delay between letters using the `ca__lt-delay` **attribute**, no need to edit JavaScript!

```html
<div class="cssanimation ca__lt-FadeIn ca__lt-sequence" ca__lt-delay="200">
    This will animate letter-by-letter with a 200ms step
</div>

<div class="cssanimation ca__lt-FadeIn ca__lt-random" ca__lt-delay="50">
    Random delay with 50ms steps
</div>
```

- `ca__lt-delay` sets the delay step in milliseconds for each letter span.
- Works for both `.ca__lt-sequence` and `.ca__lt-random` classes.

Browse the full list of `ca__lt` (letter-based) animation classes: [Cheatsheet on GitHub](./docs/cssanimation-reference.md#letter-abound-animations)

> This feature is **exclusive to cssanimation.io** — making it perfect for creative headlines, banners, parallax effect, hero sections, and expressive UI storytelling.

<br>

## Modular Import

#### Only need one effect? Import it like this:

HTML

```html
<link rel="stylesheet" href="./dist/modules/ca__LetterFadeIn.css" />
```

CSS or SCSS

```CSS
@import './dist/modules/ca__LetterFadeIn.css';
```

JavaScript (Webpack/Vite/Rollup)

```js
import './dist/modules/ca__LetterFadeIn.css';
```

Import everything in one go using the index file:

```html
<link rel="stylesheet" href="./dist/modules/ca__index.css" />
```

```js
import './dist/modules/ca__index.css';
```

#### Available Modules

| Module          | File                             |
| --------------- | -------------------------------- |
| Blur In         | `./dist/modules/ca__BlurIn.css`  |
| Blur Out        | `./dist/modules/ca__BlurOut.css` |
| Bounce          | `./dist/modules/ca__Bounce.css`  |
| Door Open Close | `./dist/modules/ca__Door.css`    |
| Dance           | `./dist/modules/ca__Dance.css`   |
| ...and more     | See `./dist/modules/` folder     |

- Each file is generated from `./dist/modules/cssanimation.css`
- Follows the naming convention: `ca__[AnimationName].css` (PascalCase)
- `ca__index.css` imports all animation modules

<br>

## Utility Class

**cssanimation.io** offers a powerful set of pre-built utility classes. Just use them along with the `.cssanimation` base class and your chosen animation class.

This includes:

- `.ca__u-Speed*`: Control speed
- `.ca__u-Ease*`: Easing control
- `.ca__u-Loop*`: Repeat settings
- `.ca__u-Delay*`: Add delays

Check out the full list of utility classes with details in [`cssanimation-utilities.md`](./docs/cssanimation-reference.md#utility-classes-ungrouped).

Combo Example

```html
<p
    class="cssanimation ca__fx-zoomIn ca__u-SpeedChill ca__u-Delay3 ca__u-EaseSnappy ca__u-LoopTriple"
>
    Magical Entrance!
</p>
```

<br>

# ![GSAP Powered](https://img.shields.io/badge/GSAP-Powered-brightgreen) GSAP Animation Guide

**cssanimation.io** isn’t just about CSS – it also supports [**GSAP** (GreenSock Animation Platform)](https://gsap.com/), the gold standard for JavaScript animations. With GSAP, you get even more powerful, smooth, and flexible control over your animations.

Supports animations via HTML using `ca-gsap` attributes, with JSON-configurable options.

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
import { gsap } from 'gsap';
```

#### Or Include via CDN. If you're working without a bundler:

```html
<!-- GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>

<!-- cssanimation.io's GSAP script -->
<script src="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/cssanimation-gsap.umd.min.js"></script>
```

### 2. Add Animation Classes to Your Elements

Add the GSAP animation name in the `ca-gsap` data atribute like:

```html
<h1 ca-gsap="ca__gx-FadeIn">cssanimation.io GSAP</h1>
```

- `ca-gsap="ca__gx-FadeIn"` – selects which animation to use
- `ca-gsap-options='{}'` – passes GSAP options to the animation function

📌 **Tip**: Check the full list of animation class names in the [cssanimation-reference.md](./docs/cssanimation-reference.md).

### Custom Animation Options with `ca-gsap-options`

You can control GSAP animation parameters using a JSON string inside the `ca-gsap-options` attribute:

```html
<div
    ca-gsap="ca__gx-FadeIn"
    ca-gsap-options='{
  "from": { "opacity": 0, "y": 80, "scale": 0 },
  "to": { "opacity": 1, "y": 0, "duration": 1.5, "ease": "sine.out", "scale": 1.2 }
}'
>
    Custom Animated Box
</div>
```

You can use any valid GSAP properties, including:
| Option | Example |
| ------------------ | ---------------------- |
| `x`, `y` | `"y": 50` |
| `duration` | `"duration": 1.2` |
| `delay` | `"delay": 0.5` |
| `repeat` | `"repeat": -1` |
| `yoyo` | `"yoyo": true` |
| `ease` | `"ease": "sine.inOut"` |
| `opacity` | `"opacity": 0.7` |
| `rotation` | `"rotation": 45` |
| `scaleX`, `scaleY` | `"scaleX": 1.3` |

### Common Mistakes

Invalid JSON:

```html
<div data-gsap-options='{"duration": .5}'>❌ Missing leading 0</div>
```

Correct:

```html
<div data-gsap-options='{"duration": 0.5}'>✔️ Valid</div>
```

### General Tips:

- Always use double quotes (")
- Include leading zeros (0.5, not .5)
- No trailing commas

### 3. GSAP Letter Animations

You can apply **letter-by-letter GSAP animation**, by using the `ca__gx-lt` attribute with one of the following modes:

- `sequence` – animates letters from left to right
- `reverse` – animates letters from right to left
- `random` – animates letters in random order

Use it alongside the `ca-gsap` attribute like this:

```html
<h2 ca-gsap="ca__gx-FadeIn" ca__gx-lt="sequence">
    letter-by-letter GSAP animation
</h2>
<h2 ca-gsap="ca__gx-FadeIn" ca__gx-lt="reverse">
    letter-by-letter GSAP animation
</h2>
<h2 ca-gsap="ca__gx-FadeIn" ca__gx-lt="random">
    letter-by-letter GSAP animation
</h2>
```

Each letter will be automatically wrapped in a `<span>` and animated based on the chosen order mode.

### 🎉 That’s It!

## CSS vs. GSAP – Which Animation Version Should You Use?

| Feature / Capability        | **CSS Version**                      | **GSAP Version**                                      |
| --------------------------- | ------------------------------------ | ----------------------------------------------------- |
| 🧱 Technology               | Pure CSS                             | JavaScript (GSAP)                                     |
| ⚡ Performance              | Great for simple UI effects          | Optimized for complex, smooth animations              |
| 🎛 Control                  | Fine-grained control via CSS         | Fine-grained control via JS (timing, easing)          |
| 🎞 Animation Types          | Predefined class-based animations    | Class-based with dynamic GSAP tweening                |
| 🔤 Letter Animation Support | ✅ Sequence & Random                 | ✅ Sequence only (random coming soon)                 |
| 🔁 Looping & Repeating      | `infinite` class                     | Full loop control via JS (e.g. `repeat`, `yoyo`)      |
| ⚙️ Configuration            | Minimal setup                        | Script includes + optional JS tweaks                  |
| 🎨 Customization            | Moderate (via utility classes)       | High — control properties on the fly                  |
| 📦 Size                     | Very lightweight (no JS needed)      | Heavier due to JS dependency                          |
| 🧩 Dependencies             | None                                 | Requires GSAP (`TweenMax`)                            |
| 🌐 CDN Available?           | ✅ Yes                               | ✅ Yes                                                |
| 🛠 NPM Ready?               | ✅ Yes (`cssanimationio`)            | ✅ Yes (`cssanimationio`)                             |
| 🧠 Use Case Examples        | Hover states, hero sections, banners | Interactive animations, scroll triggers, custom flows |

## Accessibility: Reduce Motion Support

By default, **cssanimation.io** respects user system preferences. When `prefers-reduced-motion: reduce` is enabled, animations are automatically turned off for a better UX.

## License

**cssanimation.io** is licensed under the [Parity Public License](https://paritylicense.com/).

## Contribute

We welcome issues, pull requests, and suggestions! Make your animations even more magical.

![Built with ❤️ by Pavel](https://img.shields.io/badge/built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange) [![Connect on LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/shafayetul/)
