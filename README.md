# CSS Animation Library for Developers and Ninjas

> A Powerful CSS Animation Library for Advanced Motion Design.

<!-- Tech & Status -->

![CSS](https://img.shields.io/badge/style-CSS-blue?style=for-the-badge) [![NPM](https://img.shields.io/npm/v/@hellouxpavel%2Fcssanimation.svg?style=for-the-badge)](https://www.npmjs.com/package/@hellouxpavel/cssanimation) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/@hellouxpavel/cssanimation?style=for-the-badge)](https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/) [![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/@hellouxpavel/cssanimation/) [![GitHub issues](https://img.shields.io/github/issues/yesiamrocks/cssanimation?style=for-the-badge)](https://github.com/yesiamrocks/cssanimation/issues) [![GitHub stars](https://img.shields.io/github/stars/yesiamrocks/cssanimation?style=for-the-badge)](https://github.com/yesiamrocks/cssanimation/stargazers) [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=for-the-badge)](https://yesiamrocks.github.io/cssanimation/cssanimation-demo.html) [![Bundle Size](https://img.shields.io/bundlephobia/minzip/@hellouxpavel/cssanimation?style=for-the-badge)](https://bundlephobia.com/result?p=@hellouxpavel/cssanimation) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg?style=for-the-badge)](CODE_OF_CONDUCT.md) ![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge)

[![GSAP Support](https://img.shields.io/badge/Also%20Supports-GSAP%20Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://github.com/yesiamrocks/gsapanimation)

**cssanimation** is a lightweight, modular CSS animation library built for front-end developers, creative coders, and UI ninjas. Get access to **A Rich Set of Ready-to-Use Animation Classes** to bring your interfaces to life. From simple fades and zooms to dynamic letter effects and 3D transitions, we’ve got your motion design needs covered.

You're in control. Just apply the [class names](https://yesiamrocks.github.io/cssanimation/cssanimation-demo.html) where you want them. **Zero setup. No JavaScript needed (unless you want GSAP). Just clean, reusable animations that "just work."**

## Why Developers Love It

- **Extensive Library of Pre-built Animations:** Easily add fades, zooms, rotates, bounces, skews, and much more.
- **[GSAP support:](https://github.com/yesiamrocks/gsapanimation)** Integrate powerful animations with GreenSock for advanced control.
- Text, Element, & Letter Animations: Bring life to individual letters, words, or entire elements.
- Super Easy to Use: Just add a class and your animation is live. Seriously!
- Highly Customizable: Tweak animation properties to fit your design perfectly.
- Zero JavaScript Dependencies (for CSS-only): Keep your project lean and fast.
- Modern Dev Friendly: Works great with Tailwind CSS, React, and your favorite build tools.

## 🛠️ Get Started: Installation

Choose the method that fits your workflow best.

#### Install via NPM

```bash
npm i @hellouxpavel/cssanimation
```

#### Or install with Yarn

```bash
yarn add @hellouxpavel/cssanimation
```

#### Import Everything (Core Library, CSS Utility Classes & Letter Animation):

```bash
import '@hellouxpavel/cssanimation';
```

#### Individual Imports (if you only need specific parts):

CSS only

```bash
// Core CSS animations
import '@hellouxpavel/cssanimation/css';

// Utility CSS classes (like speed, delay, easing)
import '@hellouxpavel/cssanimation/utility';
```

For Letter Animations (JavaScript required for this part):

```bash
//letter-by-letter, word-by-word, and line-by-line animations
import '@hellouxpavel/cssanimation/letter';
```

### Install via CDN

Quickly add **cssanimation.io** to your HTML. Include these lines in your `<head>`tag:

```html
<head>
  <link
    href="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/cssanimation.min.css"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/cssanimation-utility.min.css"
    rel="stylesheet"
  />
</head>
```

### 🧩 How to Use It

Once installed, simply add the base`.cssanimation` to your element, along with your chosen animation class like `.ca__fx-FadeIn` for fade in animation.

```html
<h1 class="cssanimation ca__fx-fadeIn">cssanimation</h1>
```

_That's it! You've got a CSS animated element. Super! 🎉_

For the demo and list of animation class name [click here](https://yesiamrocks.github.io/cssanimation.io/cssanimation-demo.html).

### Understanding Our Class Prefixes

We use clear prefixes to help you find the right animation or utility class.

| Prefix    | Description                                      | Example Usage                   |
| --------- | ------------------------------------------------ | ------------------------------- |
| `ca__fx-` | Visual FX animations (pure CSS)                  | `<h1 class="ca__fx-bounceX">`   |
| `ca__u-`  | Utility classes (pure CSS spacing, layout, etc.) | `<h1 class="ca__u-speedChill">` |

<br>

## 🔡 Amazing Text & Letter Animations

> Want to animate text beautifully, responsively, and with zero dependencies (for the core CSS parts)?

![npm](https://img.shields.io/npm/dw/@hellouxpavel/cssanimation?style=for-the-badge) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/@hellouxpavel/cssanimation?style=for-the-badge)](https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/) [![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/@hellouxpavel/cssanimation/) [![View Demo](https://img.shields.io/badge/🎬%20Live-Demo-green?style=for-the-badge)](https://yesiamrocks.github.io/cssanimation/text-animation.html)

`ca-letteranimation.js` plugin is a lightweight, CSS-only enhancement script that brings **letter-by-letter, word-by-word, and line-by-line** animations to your projects. It's designed to work seamlessly with [cssanimation.io](https://cssanimation.io), for robust and customizable text effects.

### Key Features

- Highly customizable: Control animations directly with HTML attributes.
- Animate **Letters**, **Words**, and **Lines**: Independent control for precise effects.
- Custom CSS Animation Classes: Use any cssanimation class you like.
- Sequential Animation Logic: Units wait for the previous one to complete.
- Random & Reverse Effects: Get creative with animation order.
- Smart Handling: Safely handles whitespace and provides animation class fallbacks.

### Letter Animation Installation

_If you're already using **cssanimation.io** via NPM, you're all set!_

For plain HTML, include the `ca-letteranimation.js`, plugin just before your closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/ca-letteranimation.js"></script>
```

### Letter Animation Usage

Every animated text block needs the `.cssanimation` class along with a `ca__lt-*` attribute to define how it animates.

#### 1. Letter-by-Letter Animation

Animate text one letter at a time with different sequencing styles:

**➜ Sequential (in order):** `ca__lt-sequence`

```html
<h1 class="cssanimation" ca__lt-sequence="ca__fx-fadeIn">Letters Animate</h1>
```

**➜ Randomized order** `ca__lt-random`

```html
<p class="cssanimation" ca__lt-random="ca__fx-bounceInTop">Randomized entry!</p>
```

**➜ Reverse (last letter first)** `ca__lt-reverse`

```html
<h3 class="cssanimation" ca__lt-reverse="ca__fx-moveFromTop">Backwards Flow</h3>
```

---

#### 2. Word-by-Word Animation `ca__lt-word`

```html
<h2 class="cssanimation" ca__lt-word="ca__fx-fadeIn">Each word animates uniquely</h2>
```

#### 3. Line-by-line Animation `ca__lt-line`

```html
<p class="cssanimation" ca__lt-line="ca__fx-fadeIn">
  First line<br />
  Second line<br />
  Third line
</p>
```

Split lines by periods `"."` or by `<br>` / `\n`. Use `ca__lt-separator="dot"` for period separation.

```html
<p class="cssanimation" ca__lt-line="ca__fx-fadeIn" ca__lt-separator="dot">Step 1. Step 2. Step 3.</p>
```

You don't need to add `ca__lt-separator` for `<br>` or newlines, this is the **default behavior**.

### 🔥You can assign different animation classes and delays to each word and line! Space-separate your class names and delay values.

```html
<h2 class="cssanimation" ca__lt-word="ca__fx-fadeIn ca__fx-moveFromTop ca__fx-moveFromBottom ca__fx-moveFromRight">
  Each word animates uniquely
</h2>
```

```html
<p class="cssanimation" ca__lt-line="ca__fx-blurIn ca__fx-bounceFromTop ca__fx-bounceX">
  First line<br />
  Second line<br />
  Third line
</p>
```

[Check out this Text & Letter Animations Preview Tool to easily generate the animation code for your text.](https://yesiamrocks.github.io/cssanimation/text-animation.html)

<br><br>

## ⏱️ `ca__lt-delay` in Detail

The `ca__lt-delay` attribute specifies the delay before each animated unit (letter, word, or line) begins its animation. The values are in milliseconds (ms).

**Single Value:** If you provide a single value, that delay will be applied to every unit.

```html
<h1 class="cssanimation" ca__lt-sequence="ca__fx-fadeIn" ca__lt-delay="100">Each letter delays by 100ms</h1>
```

**Multiple Values:** This is where it gets powerful! You can provide multiple space-separated values. These values will be applied sequentially to each unit. If you provide fewer delay values than there are units, the last delay value will repeat for the remaining units.

```html
<h2 class="cssanimation" ca__lt-word="ca__fx-fadeIn" ca__lt-delay="0 200 400">
  First word, then 200ms, then 400ms, then 400ms
</h2>
```

This allows you to create rhythmic or staggered entry effects easily, like `ca__lt-delay="50 100 100"` as in your example. The first unit gets 50ms delay, and all subsequent units get 100ms delay.

<br><br>

## ⌛ `ca__lt-base-duration` in Detail

The `ca__lt-base-duration` attribute provides a simple way to set a global default animation duration for all units (letters, words, or lines) in milliseconds (ms).

This value is used to explicitly set the duration for all units, overriding any `animation-duration` or `transition-duration` that might be detected from the CSS classes applied to the element.

```html
<h3 class="cssanimation" ca__lt-sequence="ca__fx-fadeIn" ca__lt-base-duration="750">Global base duration</h3>
```

**Precedence:**

1. `ca__lt-base-duration` (global override)
2. CSS-defined duration (auto-detected from your animation class if `ca__lt-base-duration` is absent)
3. Internal library default (if no duration is specified anywhere)

This means `ca__lt-base-duration` gives you a convenient way to set a project-wide or component-wide default duration without needing to edit CSS.

## 🏷️ Supported Attributes for Text Animations Plugin

| Attribute              | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| `ca__lt-sequence`      | Animates letter-by-letter, in order.                                             |
| `ca__lt-random`        | Animates letter-by-letter, in a randomized order.                                |
| `ca__lt-reverse`       | Animates letter-by-letter, in reverse order (last letter first).                 |
| `ca__lt-word`          | Animates word-by-word.                                                           |
| `ca__lt-line`          | Animates line-by-line.                                                           |
| `ca__lt-delay`         | Accepts one or more delay values (e.g., `100 300 500`) in milliseconds per unit. |
| `ca__lt-base-duration` | Optional base animation duration per unit (in ms)                                |
| `ca__lt-separator`     | Use `dot` to split on periods `( . )`. Default: line breaks (`<br>` or `\n`)     |

## 💡Developer Tips

- The `.cssanimation` **class is always required** for baseline styling and to activate text animations.
- You can provide fewer classes or delay values than units; the last value will simply repeat for the remaining units, making it easy to apply a pattern.
- If you pass more classes or values than needed, the extra elements are skipped, and a warning might be logged to your console to help with debugging.
- Delay and duration values are parsed safely; non-numeric strings will fall back to default behaviors to prevent errors.
- Animation duration is determined in this order of precedence: `ca__lt-base-duration` > CSS-detected duration > internal default.

**Example: Full Setup**

```html
<h2
  class="cssanimation"
  ca__lt-word="ca__fx-fadeIn ca__fx-fadeInLeft ca__fx-slinkyDrop ca__fx-jiggleTransform"
  ca__lt-delay="200 300 400"
  ca__lt-duration="1000"
>
  Animate each word smoothly
</h2>
```

<br>

## 📦 Modular Import

Want to keep your bundle size minimal? Only import the effects you actually use!

HTML

```html
<link rel="stylesheet" href="./dist/modules/ca__FadeIn.css" />
```

CSS or SCSS

```CSS
@import './dist/modules/ca__fx-fadeIn.css';
```

JavaScript (Webpack/Vite/Rollup)

```js
import './dist/modules/ca__fx-fadeIn.css';
```

#### Available Modules

Each module is generated from `./dist/cssanimation.css` and follows the naming convention: `ca__fx-[animationName].css`. Check out the `./dist/modules/` folder to see them all!

| Module      | File                                    |
| ----------- | --------------------------------------- |
| Blur In     | `./dist/modules/ca__fx-blurIn.css`      |
| Blur Out    | `./dist/modules/ca__fx-blurOutLeft.css` |
| Jello       | `./dist/modules/ca__fx-jello.css`       |
| Jitter      | `./dist/modules/ca__fx-jitter.css`      |
| Quiver      | `./dist/modules/ca__fx-quiver.css`      |
| ...and more | See `./dist/modules/` folder            |

<br>

## 🧰 Utility Class

**cssanimation.io** also provides a powerful set of pre-built utility classes to fine-tune your animations. Use them alongside the `.cssanimation` base class and your chosen animation class.

This includes:

- `.ca__u-speed*`: Control animation speed (e.g., `.ca__u-speedChill`).
- `.ca__u-ease*`: Set easing functions (e.g., `.ca__u-easeSnappy`).
- `.ca__u-loop*`: Define repeat settings (e.g., `.ca__u-loopTriple`).
- `.ca__u-delay*`: Add animation delays (e.g., `.ca__u-delay3`).

Check out the full list and details in [`cssanimation-utilities.md`](./reference/cssanimation-reference.md#utility-classes-ungrouped).

### 🎉 That’s It!

## Elevate with GSAPAnimation

Looking to go beyond CSS with scroll triggers, advanced sequencing, and even more control?

### 👉 Check out [**GSAPAnimation**](https://github.com/yesiamrocks/gsapanimation)

> It's a lightweight GSAP toolkit built to extend `cssanimation` with JavaScript superpowers.

- `ca__gx-FadeIn`: Our "Gold Standard" GSAP animations.
- `ca-gsap-options='{}'`: Easily pass GSAP options directly to your animation functions.
- `ca__gx-lt`: For powerful per-letter motion (sequence, random, reverse).
- Zero-setup: Plug-and-play with any HTML — no complex JS setup needed.

```html
<h1 ca-gsap="ca__gx-FadeIn" ca__gx-lt="sequence">cssanimation GSAP</h1>
```

[Explore GSAPAnimation for more magic»](https://github.com/yesiamrocks/gsapanimation)

<br><br>

## Accessibility: Respecting User Preferences

By default, **cssanimation** respects user system preferences. When `prefers-reduced-motion: reduce` is enabled in a user's operating system settings, animations are automatically turned off for a more comfortable user experience.

## License

**cssanimation** is licensed under the [Parity Public License](https://paritylicense.com/).

## Contribute

We welcome issues, pull requests, and suggestions! 🤝 Help us make animations even more magical for everyone.

![Built with ❤️ by Pavel](https://img.shields.io/badge/Built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange?style=for-the-badge) [![Connect on LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/shafayetul/)
