# Getting started with cssanimation.io

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/yesiamrocks/cssanimation.io/blob/master/LICENSE)

> In modern web concept, cssanimation.io is the best controlling animation library for CSS and [GreenSock](https://greensock.com/), Moving forward with this library, you need to have a basic idea on HTML and CSS3. We believe you have that. If you are pretty confused, just refreshing your idea from [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations) to go along more easily.

This library is too easy to install and implement. Anything you can be done with our relevant animation class name. So [Download](https://codeload.github.com/yesiamrocks/cssanimation.io/zip/master) and let’s get started with this library.

**_We also offer to you [GreenSock](https://greensock.com/) animation, just fly over [here](https://cssanimation.io/how-to-use.html) to get the guideline._**

To get started, from the outset you download the complete library or use a CDN hosted version by jsDelivr. All CDN URLs below:

- **cssanimation.css:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css
- **cssanimation.min.css:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css
- **letteranimation.js:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.js
- **letteranimation.min.js:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.min.js
- **cssanimation greenSock version:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.js
- **cssanimation greenSock min version:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.min.js

## Usage

1. Include the `cssanimation.css` or `cssanimation.min.css` stylesheet into the head

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSS Animation Library for Developers and Ninjas</title>
    <link
      href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css"
      rel="stylesheet"
    />
  </head>
  <body></body>
</html>
```

2. Now add the class `cssanimation` and class of animation name like `fadeIn` for fade in animation to the element that you want to animate. For list of animation class name check out the [home page](http://cssanimation.io/)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSS Animation Library for Developers and Ninjas</title>
    <link
      href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <h1 class="cssanimation fadeIn">Example</h1>
  </body>
</html>
```

3. And if you want letter animation, There are two versions here. One is the sequential and the other is random animation. Just add the file `letteranimation.js` before the body tag. Now add a letter animation class like `leFadeIn` for letter fade in animation then must be add `sequential` class for to get an animation in sequence or `random` class for animate randomly.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSS Animation Library for Developers and Ninjas</title>
    <link
      href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <h1 class="cssanimation leFadeIn sequence">Example</h1>
    <h1 class="cssanimation leFadeIn random">Example</h1>

    <script
      type="text/javascript"
      src=" https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.min.js"
    ></script>
  </body>
</html>
```

4. You may also want to include the class `infinite` for an infinite loop.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSS Animation Library for Developers and Ninjas</title>
    <link
      href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <h1 class="cssanimation fadeIn infinite">Example</h1>

    <script
      type="text/javascript"
      src=" https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.min.js"
    ></script>
  </body>
</html>
```

## Extremely light weight

Unlike all the other complicated vendors, our `cssanimation.css` **is only 84kb with 300 animations, 165kb in the minified version with all prefix and only 10kb when compressed.
And the letteranimation.js only 3kb, with 1kb in the minified version and only 0.6kb when compressed.**

**Hard to believe it!!! We know, Believe it!!!**

# cssanimation.io — A Developer and Designer's Animation Playground

Bring your interfaces to life with over **300 CSS and GSAP-powered animations**.  
Lightweight, modular, and super easy to use — no bloated frameworks, just clean motion.

Whether you're building a landing page, a portfolio, sliders, or an onboarding experience,  
**cssanimation.io** gives you plug-and-play classes to animate text, elements, and letters — right out of the box.

## CSS Animation Library for Modern Developers and Designers

## 🪶 Why Developers Love It

- **Over 300 prebuilt animations**: fade, zoom, rotate, fly, bounce, skew, and more.
- Animations for **text, elements and letters**.
- Lightweight, pure CSS (no JavaScript).
- **Zero JavaScript**, no dependencies, and fine-grained control.
- Modular — import only what you need.
- Great for scroll reveals, UI micro interactions, hero effects, and more.
- CDN & NPM ready.

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

After installing `cssanimation.css` add the class `.cssanimation` and the class of animation name like `.fadeIn` for fade in animation to an element. For list of animation class name check out the home page

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
