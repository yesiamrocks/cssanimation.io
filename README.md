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

You stay in control, just apply the [class names](./docs/cssanimation-reference.md) when and where you want them.
**Zero setup. No JavaScript required. Just clean, reusable animations.**

### Why Developers Love It

- **Over 300 prebuilt animations**: fade, zoom, rotate, fly, bounce, skew, and more.
- **GSAP support:** Add powerful animations with GreenSock.
- Animations for **text, elements and individual letters**.
- **Easy to use**: just add a class, and your animation is live.
- **Customizable**: tweak animation properties to fit your design.
- **Zero JavaScript**, no dependencies, and fine-grained control.

## ![CSS Animation](https://img.shields.io/badge/CSS-Animations-blue) CSS Animation Guide

### Option A: Install with NPM / Yarn

```bash
npm i cssanimationio
# or
yarn add cssanimationio
```

Import it into your file:

```bash
import 'cssanimationio';
```

In your CSS/SCSS (if applicable):

```scss
@import 'cssanimationio/dist/cssanimation.css';
```

### Option B: Install via CDN

Include the `cssanimation.css` library into the `<head>`:

```html
<head>
    <link
        href="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/cssanimation.css"
        rel="stylesheet"
    />
</head>
```

### Usage Examples

After installing `cssanimation.css` library, now add the class `.cssanimation` and the class of animation name like `.ca__fadeIn` for fade in animation to an element. For list of animation class name [click here](./docs/cssanimation-reference.md) or [check the website](https://cssanimation.io/getting-started.html).

```html
<h1 class="cssanimation ca__fadeIn">cssanimation</h1>
```

_That's it! You've got a CSS animated element. Super!_

## How to Use Letter Animations

Want to animate text, letter by letter?

The **cssanimation.io** library includes **100+ letter-based effects** (`.ca__leFadeIn`, `.ca__leZoomIn`, `.ca__leRotateX`, etc.).

**cssanimation.io** also includes **two exclusive types** of letter animations: `.ca__sequence` and `.ca__random`, which must be added to any element you want to animate letter by letter. What Are Sequence and Random Animations?

- **`.sequence`** – Letters animate **one after another**, in order.
- **`.random`** – Letters animate in a **randomized order**, adding playful motion.

#### Step 1. Include the Script

If you're using a `<script>` tag (e.g., for plain HTML), add this right **before the closing `</body>` tag**:

```html
<script src="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/ca-letteranimation.js"></script>
```

⚠️ Note: If you're already importing the library in your JavaScript using: `import 'cssanimationio';` you can skip Step 1, as the animation script is already included in your build.

#### Step 2. Add Animation classes to Your HTML

| Class           | What It Does                                    |
| --------------- | ----------------------------------------------- |
| `.cssanimation` | Base class for all animations                   |
| `.ca__leFadeIn` | A letter animation class (Fades in each letter) |
| `.ca__sequence` | Animates letters in order                       |
| `.ca__random`   | Animates letters in random order                |

```html
<h1 class="cssanimation ca__leFadeIn ca__sequence">cssanimation</h1>
```

```html
<h2 class="cssanimation ca__leFadeIn ca__random">Surprise!</h2>
```

Browse the full list of `ca__le` (letter-based) animation classes: [Cheatsheet on GitHub](https://github.com/yesiamrocks/cssanimation.io/blob/master/docs/cssanimation-reference.md)

> This feature is **exclusive to cssanimation.io** — making it perfect for creative headlines, banners, parallax effect, hero sections, and expressive UI storytelling.

## Modular Import

Only need fade and zoom?

```html
<link
    href="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/modules/ca__fade.css"
    rel="stylesheet"
/>
<link
    href="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/modules/ca__zoom.css"
    rel="stylesheet"
/>
```

#### Available Modules

| Module      | File                  |
| ----------- | --------------------- |
| Fade        | `dist/ca__fade.css`   |
| Zoom        | `dist/ca__zoom.css`   |
| Rotate      | `dist/ca__rotate.css` |
| Bounce      | `dist/ca__bounce.css` |
| Slide       | `dist/ca__slide.css`  |
| ...and more | See `/dist/` folder   |

## Utility Class

**cssanimation.io** offers a powerful set of pre-built utility classes. Just use them along with the `.cssanimation` base class and your chosen animation class.

This includes:

- `.ca__speed-*`: Control speed
- `.ca__ease-*`: Easing control
- `.ca__loop-*`: Repeat settings
- `.ca__delay-*`: Add delays

**Check out the full list of utility classes with details in [`cssanimation-utilities.md`](./docs/cssanimation-utilities.md)**.

Combo Example

```html
<h2
    class="cssanimation ca__zoomIn ca__speed-chill ca__delay-3 ca__ease-snappy ca__loop-bounce"
>
    Magical Entrance!
</h2>
```

# ![GSAP Powered](https://img.shields.io/badge/GSAP-Powered-brightgreen) GSAP Animation Guide

**cssanimation.io** isn’t just about CSS – it also supports [**GSAP** (GreenSock Animation Platform)](https://gsap.com/), the gold standard for JavaScript animations. With GSAP, you get even more powerful, smooth, and flexible control over your animations.

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
<script src="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/cssanimation-gsap.js"></script>
```

### 2. Add Animation Classes to Your Elements

Add the `.cssanimation` class and one of the cssanimation.io's GSAP animation class names, like `.ca__gsap-fadeIn`:

```html
<h1 class="cssanimation ca__gsap-fadeIn">Example</h1>
```

📌 **Tip**: Check the full list of animation class names in the [cssanimation-reference.md](./docs/cssanimation-reference.md).

### 3. Letter Animations

For **letter-by-letter animation**, just use any `le*` animation class like `.ca__gsap-leFadeIn`.

```html
<h1 class="cssanimation ca__gsap-leFadeIn">Amazing!</h1>
```

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

## 📣 Contribute

We welcome issues, pull requests, and suggestions! Make your animations even more magical.

![Built with ❤️ by Pavel](https://img.shields.io/badge/built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange) [![Connect on LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/shafayetul/)
