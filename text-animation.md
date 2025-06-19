## 🔡 Amazing Text & Letter Animations

![Plugin](https://img.shields.io/badge/Type-Plugin-4B9CE2?style=for-the-badge) ![Vanilla JS](https://img.shields.io/badge/JS-Vanilla%20JS-brightgreen?style=for-the-badge) ![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge) ![npm](https://img.shields.io/npm/dw/@hellouxpavel/cssanimation?style=for-the-badge) [![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/@hellouxpavel/cssanimation?style=for-the-badge)](https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/) [![unpkg](https://img.shields.io/badge/CDN-unpkg-blue?style=for-the-badge)](https://unpkg.com/browse/@hellouxpavel/cssanimation/) [![View Demo](https://img.shields.io/badge/🎬%20Live-Demo-green?style=for-the-badge)](https://yesiamrocks.github.io/cssanimation/text-animation.html)

`ca-letteranimation.js` plugin is a lightweight, CSS-only enhancement script that brings **letter-by-letter, word-by-word, and line-by-line** animations to your projects. It's designed to work seamlessly with [cssanimation](https://cssanimation.io), for robust and customizable text effects.

### Key Features

- Highly customizable: Control animations directly with HTML attributes.
- Animate **Letters**, **Words**, and **Lines**: Independent control for precise effects.
- Custom CSS Animation Classes: Use any cssanimation class you like.
- Sequential Animation Logic: Units wait for the previous one to complete.
- Random & Reverse Effects: Get creative with animation order.
- Smart Handling: Safely handles whitespace and provides animation class fallbacks.

### ⚠️ Migration Notice (v5.7.3)

As of version `6.0.0`, all plugins are now organized under a unified directory:

- Previous location: `dist/ca-letteranimation.js`
- New location: `dist/plugins/ca-letteranimation.js`

If you're using this plugin via `<script>`, be sure to update your path accordingly.

### Letter Animation Installation

_If you're already using **cssanimation** via NPM, you're all set!_

For plain HTML, include the `ca-letteranimation.js`, plugin just before your closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/plugins/ca-letteranimation.js"></script>
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

### `ca__lt-delay` in Detail

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

### `ca__lt-base-duration` in Detail

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

### 🏷️ Supported Attributes for Text Animations Plugin

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

### 💡Developer Tips

- The `.cssanimation` **class is always required** for baseline styling and to activate text animations.
- You can provide fewer classes or delay values than units; the last value will simply repeat for the remaining units, making it easy to apply a pattern.
- If you pass more classes or values than needed, the extra elements are skipped, and a warning might be logged to your console to help with debugging.
- Delay and duration values are parsed safely; non-numeric strings will fall back to default behaviors to prevent errors.
- Animation duration is determined in this order of precedence: `ca__lt-base-duration` > CSS-detected duration > internal default.

[← Return to the main README](./README.md)
