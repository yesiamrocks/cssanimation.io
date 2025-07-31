# CSS Animation Library for Developers and Ninjas - {css}animation

> A Powerful CSS Animation Library for Advanced Motion Design.

<!-- Tech & Status -->

![CSS](https://img.shields.io/badge/style-CSS-blue?style=for-the-badge) ![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge) [![NPM](https://img.shields.io/npm/v/@hellouxpavel%2Fcssanimation.svg?style=for-the-badge)](https://www.npmjs.com/package/@hellouxpavel/cssanimation) ![License](https://img.shields.io/badge/license-Apache%202.0-blue?style=for-the-badge) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/@hellouxpavel/cssanimation?style=for-the-badge)](https://www.jsdelivr.com/package/npm/@hellouxpavel/cssanimation) [![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/@hellouxpavel/cssanimation/) [![GitHub issues](https://img.shields.io/github/issues/yesiamrocks/cssanimation?style=for-the-badge)](https://github.com/yesiamrocks/cssanimation/issues) [![GitHub stars](https://img.shields.io/github/stars/yesiamrocks/cssanimation?style=for-the-badge)](https://github.com/yesiamrocks/cssanimation/stargazers) [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=for-the-badge)](https://yesiamrocks.github.io/cssanimation/index.html) [![Bundle Size](https://img.shields.io/bundlephobia/minzip/@hellouxpavel/cssanimation?style=for-the-badge)](https://bundlephobia.com/result?p=@hellouxpavel/cssanimation) ![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge) [![Triggle JS](https://img.shields.io/badge/Triggle%20JS-00c853?style=for-the-badge&logo=flash&logoColor=white)](https://github.com/yesiamrocks/triggle) [![AnimText](https://img.shields.io/badge/AnimText%20JS-22d3ee?style=for-the-badge&logo=typography&logoColor=white)](https://github.com/yesiamrocks/animtext) [![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20me%20a%20coffee-ffdd00?logo=buy-me-a-coffee&logoColor=000000&style=for-the-badge)](https://www.buymeacoffee.com/yesiamrocks) [![Sponsor](https://img.shields.io/badge/Sponsor-%E2%98%95-lightgrey?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/yesiamrocks/membership) [![Newsletter](https://img.shields.io/badge/Subscribe-Pixels%20&%20Projects%20-A6CA4B?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/)

<a href="https://yesiamrocks.github.io/cssanimation/index.html" target="_bank"><img src="./branding/cssanimation-logo.svg" width="250" style="margin:10px 0 10px 0"></a>

**{css}animation** is a lightweight, modular CSS animation library built for front-end developers, creative coders, and UI ninjas. Get access to **A Rich Set of Ready-to-Use Animation Classes** to bring your interfaces to life. From simple fades and zooms to dynamic letter effects and 3D transitions, we’ve got your motion design needs covered.

You're in control. Just apply the [class names](https://yesiamrocks.github.io/cssanimation/index.html) where you want them. **Zero setup. No JavaScript needed. Just clean, reusable animations that "just work."**

## Why Developers Love It

- **Extensive Library of Pre-built Animations:** Easily add fades, zooms, rotates, bounces, skews, and much more.
- Text, Element, & Letter Animations: Bring life to individual letters, words, or entire elements.
- Super Easy to Use: Just add a class and your animation is live. Seriously!
- Highly Customizable: Tweak animation properties to fit your design perfectly.
- Zero JavaScript Dependencies: Keep your project lean and fast.
- Modern Dev Friendly: Works great with Tailwind CSS, React, and your favorite build tools.

👉 [Live Demo](https://yesiamrocks.github.io/cssanimation/) | [Download via NPM](https://www.npmjs.com/package/@hellouxpavel/cssanimation) | [CDN jsDelivr](https://www.jsdelivr.com/package/npm/@hellouxpavel/cssanimation) | [CDN unpkg](https://app.unpkg.com/@hellouxpavel/cssanimation@6.10.1)

## Get Started: Installation

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

Quickly add **{css}animation** to your HTML. Include these lines in your `<head>`tag:

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

### How to Use It

Once installed, simply add the base`.cssanimation` to your element, along with your chosen animation class like `.ca__fx-FadeIn` for fade in animation.

```html
<h1 class="cssanimation ca__fx-fadeIn">cssanimation</h1>
```

_That's it! You've got a CSS animated element. Super! 🎉_

For the demo and list of animation class name [click here](https://yesiamrocks.github.io/cssanimation.io/).

### Understanding Our Class Prefixes

We use clear prefixes to help you find the right animation or utility class.

| Prefix    | Description                                      | Example Usage                   |
| --------- | ------------------------------------------------ | ------------------------------- |
| `ca__fx-` | Visual FX animations (pure CSS)                  | `<h1 class="ca__fx-bounceX">`   |
| `ca__u-`  | Utility classes (pure CSS spacing, layout, etc.) | `<h1 class="ca__u-speedChill">` |

## Modular Import

Want to keep your CSS bundle size minimal? You can import only the **animation groups** or **individual effects** you actually use!

HTML

```html
<!-- Grouped animation (e.g., ca__BlurIn module) -->
<link rel="stylesheet" href="./dist/modules/ca__BlurIn.css" />
```

CSS, SCSS or JavaScript (Webpack, Vite, Rollup)

```CSS
// Grouped module
@import './dist/modules/ca__BlurIn.css';
```

#### Available Modules

Check out the `./dist/modules/` folder to see all available animation groups:

| Module                  | File                             |
| ----------------------- | -------------------------------- |
| Blob Animation Group    | `./dist/modules/ca__Blob.css`    |
| Blur In Animation Group | `./dist/modules/ca__BlurIn.css`  |
| Bounce Animation Group  | `./dist/modules/ca__Bounce.css`  |
| Elastic Animation Group | `./dist/modules/ca__Elastic.css` |
| FadeIn Animation Group  | `./dist/modules/ca__FadeIn.css`  |
| ...and more             | See `./dist/modules/` folder     |

## Individual Animation Imports

Need just one animation, like `fadeIn`, `bounceX`, or `zoomIn`? You can import individual effect files too.

HTML

```html
<!-- Individual effect (e.g., fadeIn only) -->
<link rel="stylesheet" href="./dist/animations/ca__fadeIn.css" />
```

CSS, SCSS or JavaScript (Webpack, Vite, Rollup)

```CSS
// Individual effect
@import './dist/animations/ca__fadeIn.css';
```

#### Available Individual Effects

Each file in the `./dist/animations/` folder is a standalone animation with scoped styles and keyframes. Explore and import only what you need!

## Utility Class

**{css}animation** also provides a powerful set of pre-built utility classes to fine-tune your animations. Use them alongside the `.cssanimation` base class and your chosen animation class.

This includes:

- `.ca__u-speed*`: Control animation speed (e.g., `.ca__u-speedChill`).
- `.ca__u-ease*`: Set easing functions (e.g., `.ca__u-easeSnappy`).
- `.ca__u-loop*`: Define repeat settings (e.g., `.ca__u-loopTriple`).
- `.ca__u-delay*`: Add animation delays (e.g., `.ca__u-delay3`).

Check out the full list and details in [`cssanimation-utilities.md`](./reference/cssanimation-reference.md#utility-classes-ungrouped).

### 🎉 That’s It!

## Accessibility: Respecting User Preferences

By default, **{css}animation** respects user system preferences. When `prefers-reduced-motion: reduce` is enabled in a user's operating system settings, animations are automatically turned off for a more comfortable user experience.

## License

**{css}animation** is licensed under the [Apache License, Version 2.0](https://github.com/yesiamrocks/cssanimation/blob/master/LICENSE).

## Contribute

We welcome issues, pull requests, and suggestions! 🤝 Help us make animations even more magical for everyone.

## Need Help?

If you’re building a **Website, Landing page, Tool, Visual Editor, or Framework** integration using **{css}animation**, feel free to reach out or contribute via GitHub Issues or Discussions.

<br>

## AnimText

Add Smart Text Animations with [AnimText](https://github.com/yesiamrocks/animtext)

**AnimText** is a lightweight JavaScript plugin that brings your **{css}animation** classes to life — one **letter**, **word**, or **line** at a time.

Perfect for headlines, hero sections, callouts, and more.

- Supports `data-at-sequence`, `data-at-random`, `data-at-word`, `data-at-line`, and more
- Works out of the box with **{css}animation** classes like `ca__fx-fadeIn`
- No dependencies – just plug and play!

[![AnimText](https://img.shields.io/badge/AnimText%20JS-4B9CE2?style=for-the-badge&logo=typography&logoColor=white)](https://github.com/yesiamrocks/animtext)

👉 [Get Started with AnimText →](https://github.com/yesiamrocks/animtext)

<br>

## Triggle

Enhance Your **{css}animation** with Triggers

**Want to animate on click, hover, scroll, or keypress — without writing JavaScript?**  
Meet [**Triggle**](https://github.com/yesiamrocks/triggle) — a zero-dependency helper to trigger **{css}animation** classes using simple `data-triggle-*` attributes.

Works beautifully with **{css}animation** out of the box. Use it to make your animations interactive in seconds.

[![Triggle JS](https://img.shields.io/badge/Triggle%20JS-00c853?style=for-the-badge&logo=flash&logoColor=white)](https://github.com/yesiamrocks/triggle)

👉 [Get Started with Triggle →](https://github.com/yesiamrocks/triggle)

<br>

## ☕ Support This Project

If you find **{css}animation** helpful, consider supporting my work. Your support helps me keep building open source tools, adding more animation packs, and writing design/dev insights in my newsletter [Pixels & Projects with Pavel](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/).

[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-ffdd00?style=flat&logo=buy-me-a-coffee&logoColor=000000)](https://www.buymeacoffee.com/pavelrocks)

<br>

## 💛 Become a Community Sponsor

If you enjoy **{css}animation**, help support its development by becoming a monthly sponsor

**As a Community Sponsor**, you’ll get:

- A shoutout in my newsletter [Pixels & Projects with Pavel](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/)
- Your name or project listed in the documentation and on the site.

Help keep this open-source project alive and growing

👉 [Join the Membership](https://buymeacoffee.com/yesiamrocks/membership)

<br>

![Built with ❤️ by Pavel](https://img.shields.io/badge/Built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange?style=for-the-badge) [![Connect on LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin&style=for-the-badge)](https://www.linkedin.com/in/shafayetul/) [![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20me%20a%20coffee-ffdd00?logo=buy-me-a-coffee&logoColor=000000&style=for-the-badge)](https://www.buymeacoffee.com/yesiamrocks)
