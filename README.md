# cssanimation.io

> A Developer and Designer's Animation Playground

<!-- Tech & Status -->

![CSS](https://img.shields.io/badge/style-CSS-blue)
[![NPM](https://img.shields.io/npm/v/cssanimationio.svg)](https://www.npmjs.com/package/cssanimationio)
[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/yesiamrocks/cssanimation.io/badge)](https://www.jsdelivr.com/package/gh/yesiamrocks/cssanimation.io)
[![GitHub issues](https://img.shields.io/github/issues/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/issues)
[![GitHub stars](https://img.shields.io/github/stars/yesiamrocks/cssanimation.io)](https://github.com/yesiamrocks/cssanimation.io/stargazers)
[![GSAP Support](https://img.shields.io/badge/Also%20Supports-GSAP%20Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

<!-- Live Demo (Optional) -->

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://cssanimation.io)

## CSS Animation Library for Modern Developers and Designers

Bring your interfaces to life with over **300+ CSS and GSAP-powered animations**. Lightweight, modular, and super easy to use — no bloated frameworks, just clean motion.

Whether you're building a landing page, a portfolio, sliders, or an onboarding experience, **cssanimation.io** gives you plug-and-play classes to animate text, elements, and letters — right out of the box.

## Why Developers Love It

- **Over 300 prebuilt animations**: fade, zoom, rotate, fly, bounce, skew, and more.
- **GSAP support:** Add powerful animations with GreenSock.
- Animations for **text, elements and individual letters**.
- **Modular and lightweight**: no unnecessary code, just pure animation goodness.
- **Easy to use**: just add a class, and your animation is live.
- **Customizable**: tweak animation properties to fit your design.
- **Zero JavaScript**, no dependencies, and fine-grained control.
- Great for scroll reveals, UI micro interactions, hero effects, and more.
- Easy to start: CDN and NPM ready.
- **Free** and open-source, with a growing community.
- Ideal for creative developers, motion designers, and product teams who need high-fidelity motion in the browser.

## Installing

### Option A: Install with NPM

```bash
npm i cssanimationio
```

Import it into your file:

```bash
`import 'cssanimation.css';`
```

### Option B: Install via CDN

Include in your `<head>`:

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/cssanimationio/dist/cssanimation.css"
  />
</head>
```

## Usage Examples

After installing `cssanimation.css` add the class `.cssanimation` and the class of animation name like `.fadeIn` for fade in animation to an element. For list of animation class name [click here](cssanimation-cheatsheet.md)]

```html
<h1 class="cssanimation fadeIn">Hello, World!</h1>
```

That's it! You've got a CSS animated element. Super!

### Letter-by-Letter Animation

Include the letter animation script:

```html
<script src="https://cdn.jsdelivr.net/npm/cssanimationio/dist/letteranimation.min.js"></script>
```

Then animate letter-by-letter:

```html
<h1 class="cssanimation leFadeIn sequence">Sequence</h1>
<h1 class="cssanimation leFadeIn random">Random</h1>
```

### Modular Import

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

## Utility Class System for Animations

Animate.css comes packed with a few utility classes to simplify its use. All classes should be added alongside .cssanimation and your animation class, like:

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

### Combo Example

```html
<h2 class="cssanimation zoomIn speed-chill delay-3 ease-snappy loop-bounce">
  Magical Entrance!
</h2>
```

## Accessibility: Reduce Motion Support

By default, cssanimation.io respects user system preferences.  
When `prefers-reduced-motion: reduce` is enabled, animations are automatically turned off for a better UX.

## License

cssanimation.io is licensed under the [Hippocratic License.](https://firstdonoharm.dev/)

## Having trouble?

If **cssanimation.io** isn't doing what you expect it to please create a [issue](https://github.com/yesiamrocks/cssanimation.io/issues)

<!-- Project Identity -->

![Built with ❤️ by Pavel](https://img.shields.io/badge/built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange)
