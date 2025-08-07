# CSS Animation Library for Developers and Ninjas - {css}animation

<!-- Tech & Status -->

![CSS](https://img.shields.io/badge/style-CSS-blue?style=for-the-badge) ![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge) [![NPM](https://img.shields.io/npm/v/@hellouxpavel%2Fcssanimation.svg?style=for-the-badge)](https://www.npmjs.com/package/@hellouxpavel/cssanimation) ![License](https://img.shields.io/badge/license-Apache%202.0-blue?style=for-the-badge) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/@hellouxpavel/cssanimation?style=for-the-badge)](https://www.jsdelivr.com/package/npm/@hellouxpavel/cssanimation) [![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/@hellouxpavel/cssanimation/) [![GitHub issues](https://img.shields.io/github/issues/yesiamrocks/cssanimation?style=for-the-badge)](https://github.com/yesiamrocks/cssanimation/issues) [![GitHub stars](https://img.shields.io/github/stars/yesiamrocks/cssanimation?style=for-the-badge)](https://github.com/yesiamrocks/cssanimation/stargazers) [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=for-the-badge)](https://yesiamrocks.github.io/cssanimation/index.html) [![Bundle Size](https://img.shields.io/bundlephobia/minzip/@hellouxpavel/cssanimation?style=for-the-badge)](https://bundlephobia.com/result?p=@hellouxpavel/cssanimation) [![AnimText](https://img.shields.io/badge/AnimText-Text%20Animation-f43f5e?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/yesiamrocks/animtext) [![Triggle.js](https://img.shields.io/badge/Triggle-Trigger%20Engine-FF6600?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/yesiamrocks/triggle)

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20My%20Work-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks) [![Join Membership](https://img.shields.io/badge/Become%20a%20Member-Monthly%20Support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks/membership)

> A Powerful CSS Animation Library for Advanced Motion Design. Zero JS Required. Over 500 Effects, Letter, Word & Line Stagger Animations, Utilities, and easy CDN or NPM Install.

<a href="https://yesiamrocks.github.io/cssanimation/index.html" target="_bank"><img src="./branding/cssanimation-logo.svg" width="250" style="margin:10px 0 5px 0"></a>

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

## AnimText - Letter, Word & Line Text Animation JS Library

Add Smart Text Animations with [AnimText](https://github.com/yesiamrocks/animtext)

**AnimText** is a lightweight JavaScript plugin that brings your **{css}animation** classes to life — one **letter**, **word**, or **line** at a time.

Perfect for headlines, hero sections, callouts, and more.

- Supports `data-at-sequence`, `data-at-random`, `data-at-word`, `data-at-line`, and more
- Works out of the box with **{css}animation** classes like `ca__fx-fadeIn`
- No dependencies – just plug and play!

[![AnimText](https://img.shields.io/badge/AnimText-Text%20Animation-f43f5e?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/yesiamrocks/animtext)

👉 [Get Started with AnimText →](https://github.com/yesiamrocks/animtext)

## Triggle - Simple Trigger-Based CSS Animation Control

Enhance Your **{css}animation** with Triggers

**Want to animate on click, hover, scroll, or keypress — without writing JavaScript?**  
Meet [**Triggle**](https://github.com/yesiamrocks/triggle) — a zero-dependency helper to trigger **{css}animation** classes using simple `data-triggle-*` attributes.

Works beautifully with **{css}animation** out of the box. Use it to make your animations interactive in seconds.

[![Triggle.js](https://img.shields.io/badge/Triggle-Trigger%20Engine-FF6600?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/yesiamrocks/triggle)

👉 [Get Started with Triggle →](https://github.com/yesiamrocks/triggle)

## Accessibility: Respecting User Preferences

**{css}animation** is built with accessibility in mind. If a user has enabled `prefers-reduced-motion: reduce` in their system preferences, all animations are automatically disabled, ensuring a smoother and more comfortable experience for those sensitive to motion.

No extra configuration required. It's automatic, built-in, and developer-friendly.

## License

**{css}animation** is proudly open-sourced under the [Apache License 2.0](./LICENSE). You can freely use it in personal, commercial, and creative projects.

Want a quick explanation? See the [License Summary →](./ABOUT-LICENSE.md)

## Contribute

We welcome all contributions — whether it’s fixing bugs, adding animations, improving docs, or sharing ideas!

- Found an issue? [Open a GitHub Issue](https://github.com/yesiamrocks/cssanimation/issues)
- Want to improve the library? [Submit a Pull Request](https://github.com/yesiamrocks/cssanimation/pulls)
- Have questions or feature ideas? [Start a Discussion](https://github.com/yesiamrocks/cssanimation/discussions)

Help us make animations even more magical for everyone.

## Need Help?

Running into issues while using **{css}animation** in your project?  
Whether it's a website, landing page, tool, or framework integration — we're here to help!

- Report bugs or problems via [GitHub Issues](https://github.com/yesiamrocks/cssanimation/issues)
- Ask questions or get guidance in [GitHub Discussions](https://github.com/yesiamrocks/cssanimation/discussions)

We’re happy to assist and make sure everything works smoothly in your setup.

## Support {css}animation

If **{css}animation** has helped you bring ideas to life, ship smoother animations, or simply made your UI feel more alive, I’d be truly grateful for your support.

This project is the result of years of late nights, weekends, experiments, and a deep love for motion design.  
I started **{css}animation** to make expressive, cinematic animation easier and more accessible for developers and designers everywhere.

Your support helps me:

- Maintain and improve the library
- Craft new animation packs and modules
- Share insights through my newsletter  
  👉 [Pixels & Projects with Pavel](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/)

Even a small contribution means a lot, it fuels my creativity and helps keep this project alive and growing.

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20My%20Work-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks)

## Become a Community Sponsor

**{css}animation** isn’t just a library, it’s a love letter to motion.  
If it’s helped bring your ideas to life, saved you time, or added delight to your UI, I’d be incredibly grateful for your support as a monthly sponsor.

This project is handcrafted with care — from animation packs to utilities — during nights, weekends, and moments between client work.  
Sponsorship helps keep this creative momentum going and ensures I can continue building tools that empower others.

### As a Community Sponsor, you'll receive:

- A personal shoutout in my newsletter  
  👉 [Pixels & Projects with Pavel](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/)
- Your name or project featured in the official documentation and on the website
- The satisfaction of supporting independent, open-source motion design

Let’s build a more playful, expressive web — together.

[![Join Membership](https://img.shields.io/badge/Become%20a%20Member-Monthly%20Support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/yesiamrocks/membership)

<br>

---

![Built with ❤️ by Pavel](https://img.shields.io/badge/Built%20with-%E2%9D%A4%EF%B8%8F%20by%20Pavel-orange?style=for-the-badge) [![LinkedIn](https://img.shields.io/badge/LinkedIn-@shafayetul-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shafayetul/) [![Twitter](https://img.shields.io/badge/Twitter-@yesiamrocks-1DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/yesiamrocks) [![Email](https://img.shields.io/badge/Email-yesiamrocks@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yesiamrocks@gmail.com) [![Newsletter](https://img.shields.io/badge/Pixels_&_Projects_with_Pavel-Subscribe-a6ca4b?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/newsletters/pixels-projects-with-pavel-7093275757006782464/)
