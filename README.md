# CSS Animation Library for Developers and Ninjas — cssanimation.io

> A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.

<!-- Tech & Status -->

![CSS](https://img.shields.io/badge/style-CSS-blue) [![NPM](https://img.shields.io/npm/v/cssanimationio.svg)](https://www.npmjs.com/package/cssanimationio) [![jsDelivr](https://data.jsdelivr.com/v1/package/gh/yesiamrocks/cssanimation.io/badge)](https://www.jsdelivr.com/package/gh/yesiamrocks/cssanimation.io) [![GitHub issues](https://img.shields.io/github/issues/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/issues) [![GitHub stars](https://img.shields.io/github/stars/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/stargazers) [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://cssanimation.io) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./docs/code_of_conduct.md)

[![GSAP Support](https://img.shields.io/badge/Also%20Supports-GSAP%20Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://github.com/yesiamrocks/gsapanimation)

**cssanimation.io** is a lightweight, modular **CSS animation library** designed for developers, designers, and UI ninjas. It provides over **300+ CSS and GSAP-powered plug-and-play animation** classes to bring your interfaces to life — from simple fades and zooms to dynamic letter effects and 3D transitions.

You stay in control, just apply the [class names](./reference/cssanimation-reference.md) when and where you want them. **Zero setup. No JavaScript, Just clean, reusable animations.**

### Why Developers Love It

- **Over 300 prebuilt animations**: fade, zoom, rotate, fly, bounce, skew, and more.
- **[GSAP support:](https://github.com/yesiamrocks/gsapanimation)** Add powerful animations with GreenSock.
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

#### Individual Imports

CSS only

```bash
import 'cssanimationio/css';           // Core CSS
import 'cssanimationio/utility';       // Utility CSS
```

CSS Letter Animation

```bash
import { initLetterAnimations } from 'cssanimationio/letter';
```

### Install via CDN

Include the `cssanimation.css` library into the `<head>`:

```html
<head>
  <link href="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/cssanimation.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/cssanimation-utility.min.css" rel="stylesheet" />
</head>
```

### Usage Examples

After installing `cssanimation.css` library, now add the class `.cssanimation` and the class of animation name like `.ca__fx-FadeIn` for fade in animation to an element. For list of animation class name [click here](./reference/cssanimation-reference.md).

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

## CSS Text / Letter Animations

> Want to animate text beautifully, responsively, and with zero dependencies?

`ca-letteranimation.js` is a lightweight, CSS-only enhancement script that brings letter-by-letter, word-by-word, and line-by-line animations to your web projects. Designed to work seamlessly with [cssanimation.io](https://cssanimation.io), it offers a robust and customizable solution for dynamic text effects.

### Features

- Zero dependencies: Keep your project lean.
- Highly customizable: Control animations directly with HTML attributes.
- Animate **letters**, **words**, or **lines** independently
- Supports **custom css animation classes**
- Auto-detect or override animation duration using `ca__lt-duration`
- Sequential animation logic (each unit waits for the previous to complete)
- Includes random and reverse animation effects.
- Handles whitespace safely and provides animation class fallbacks.

### Installation

If you're already using `cssanimation.io` via NPM, you're all set!

For plain HTML, include the `ca-letteranimation.js`, script just before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/cssanimationio@latest/dist/ca-letteranimation.js"></script>
```

### Usage Guide

Every animated text block must include the `cssanimation` class along with the `ca__lt-*` attribute that defines how it animates.

#### 1. **Letter-by-letter Animation**. Animate text letter by letter with three distinct sequencing styles:

**Sequential Letter Animation:**

```html
<h1 class="cssanimation" ca__lt-sequence="ca__fx-FadeIn">Letters Animate</h1>
```

**Randomized letter order**

```html
<p class="cssanimation" ca__lt-random="ca__fx-BounceInTop">Randomized entry!</p>
```

**Reverse (last letter first)**

```html
<h3 class="cssanimation" ca__lt-reverse="ca__fx-MoveFromTop">Backwards Flow</h3>
```

---

#### 2. **Word-by-word** Animation with Delay and Custom Classes

```html
<h2
  class="cssanimation"
  ca__lt-word="ca__fx-FadeIn ca__fx-MoveFromTop ca__fx-MoveFromBottom ca__fx-MoveFromRight"
  ca__lt-delay="50 100 100"
  ca__lt-duration="500"
>
  Each word animates uniquely
</h2>
```

🔥 You can assign **different animation classes and delays per word**. Delays value and class names are space-separated.

---

#### 3. **Line-by-line Animation**.

You can split lines by periods `.` or by `<br>` / `\n`. Use `ca__lt-separator="dot"` to use the periods `.` separator.

**Dot-separated lines**

```html
<p
  class="cssanimation"
  ca__lt-line="ca__fx-FadeIn"
  ca__lt-delay="400 800"
  ca__lt-duration="1000"
  ca__lt-separator="dot"
>
  Step 1. Step 2. Step 3.
</p>
```

**Line break by default (br or newline)**

```html
<p class="cssanimation" ca__lt-line="ca__fx-FadeIn">
  First line<br />
  Second line<br />
  Third line
</p>
```

You don't need to add `ca__lt-separator` for `<br>` or newlines, this is the **default behavior**.

## Supported Attributes

| Attribute          | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `ca__lt-sequence`  | Letter-by-letter, in order                                       |
| `ca__lt-random`    | Letter-by-letter, randomized                                     |
| `ca__lt-reverse`   | Letter-by-letter, reversed                                       |
| `ca__lt-word`      | Word-by-word animation                                           |
| `ca__lt-line`      | Line-by-line animation                                           |
| `ca__lt-delay`     | Accepts one or more values like `100 300 500` per unit           |
| `ca__lt-duration`  | Optional base animation duration per unit (in ms)                |
| `ca__lt-separator` | Use `dot` to split on `.`. Default: line breaks (`<br>` or `\n`) |

## Developer Tips

- The `cssanimation` class is **required** to enable baseline styling.
- You can pass fewer classes or delays than units — the last value will repeat.
- If you pass more classes than needed, the element is skipped and a warning is logged.
- Delay values are parsed safely, non-numeric strings fall back to defaults.
- Animation duration is auto-detected from CSS or can be overridden manually.

## 💡 Example: Full Setup

```html
<h2 class="cssanimation" ca__lt-word="fadeIn bounce slide rotate" ca__lt-delay="200 300 400" ca__lt-duration="1000">
  Animate each word smoothly
</h2>
```

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

Check out the full list of utility classes with details in [`cssanimation-utilities.md`](./reference/cssanimation-reference.md#utility-classes-ungrouped).

Combo Example

```html
<p class="cssanimation ca__fx-zoomIn ca__u-SpeedChill ca__u-Delay3 ca__u-EaseSnappy ca__u-LoopTriple">
  Magical Entrance!
</p>
```

### 🎉 That’s It!

Looking to go beyond CSS with scroll triggers, letter-by-letter effects, and animation sequencing?

### 👉 Check out [**GSAPAnimation**](https://github.com/yesiamrocks/gsapanimation)

> A lightweight, utility-first GSAP toolkit built to extend `cssanimation.io` with JavaScript superpowers.

- `ca__gx-FadeIn` Gold Standerd GSAP animations.
- `ca-gsap-options='{}'` – passes GSAP options to the animation function
- `ca__gx-lt` for per-letter motion (sequence, random, reverse).
- Zero-setup: plug-and-play with any HTML.

```html
<h1 ca-gsap="ca__gx-FadeIn" ca__gx-lt="sequence">cssanimation.io GSAP</h1>
```

[Explore GSAPAnimation for more magic»](https://github.com/yesiamrocks/gsapanimation)

## CSS vs. GSAP – Which Animation Version Should You Use?

| Feature / Capability | **CSS Version** | **GSAP Version** |
| --- | --- | --- |
| 🧱 Technology | Pure CSS | JavaScript (GSAP) |
| ⚡ Performance | Great for simple UI effects | Optimized for complex, smooth animations |
| 🎛 Control | Fine-grained control via CSS | Fine-grained control via JS (timing, easing) |
| 🎞 Animation Types | Predefined class-based animations | Class-based with dynamic GSAP tweening |
| 🔤 Letter Animation Support | ✅ Sequence & Random | ✅ Sequence only (random coming soon) |
| 🔁 Looping & Repeating | `infinite` class | Full loop control via JS (e.g. `repeat`, `yoyo`) |
| ⚙️ Configuration | Minimal setup | Script includes + optional JS tweaks |
| 🎨 Customization | Moderate (via utility classes) | High — control properties on the fly |
| 📦 Size | Very lightweight (no JS needed) | Heavier due to JS dependency |
| 🧩 Dependencies | None | Requires GSAP (`TweenMax`) |
| 🌐 CDN Available? | ✅ Yes | ✅ Yes |
| 🛠 NPM Ready? | ✅ Yes (`cssanimationio`) | ✅ Yes (`cssanimationio`) |
| 🧠 Use Case Examples | Hover states, hero sections, banners | Interactive animations, scroll triggers, custom flows |

## Accessibility: Reduce Motion Support

By default, **cssanimation.io** respects user system preferences. When `prefers-reduced-motion: reduce` is enabled, animations are automatically turned off for a better UX.

## License

**cssanimation.io** is licensed under the [Parity Public License](https://paritylicense.com/).

## Contribute

We welcome issues, pull requests, and suggestions! Make your animations even more magical.

![Built with ❤️ by Pavel](https://img.shields.io/badge/built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange) [![Connect on LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/shafayetul/)
