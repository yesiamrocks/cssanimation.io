## 🖱️ Trigger-based Animation Control

Enable trigger-based animations using simple `data-ca-trigger` attributes. This plugin works seamlessly with `cssanimation.css` classes and lets you apply them on user interactions. It supports mouse, keyboard, touch, and custom event triggers — with optional animation control via delay, duration, reset, and key filters.

### Features

- Multiple animation triggers: click, mouseenter, keydown, blur, etc.
- Attribute-based configuration with no JavaScript required
- Support for specific keys (e.g. Enter, Escape, ctrl+z, shift+a)
- Wildcard key matching (en*, arrow*, etc.)
- Custom JS-dispatched events (e.g. customEvent)
- Global enable/disable toggle
- Dev mode with logs and diagnostics

### Try It Live

Explore all supported triggers and features in the interactive playground: 👉 [Live Demo](https://yesiamrocks.github.io/cssanimation/ca-trigger.html)

### Include the Plugin

_If you're already using cssanimation via NPM, you're all set!_

For plain HTML, include the `ca-trigger.js`, plugin just before your closing </body> tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/plugins/ca-trigger.js"></script>
```

Add `data-ca-*` attributes to your element:

```html
<div class="cssanimation" data-ca-trigger="click" data-ca-class="ca__fx-bounceX" data-ca-reset="true">
  Click to Animate
</div>
```

### Supported Triggers

You can animate elements using the following trigger types via `data-ca-trigger`:

| Trigger         | Description                          |
| --------------- | ------------------------------------ |
| `click`         | On mouse click                       |
| `dblclick`      | On double click                      |
| `mouseenter`    | When the mouse enters the element    |
| `mouseleave`    | When the mouse leaves the element    |
| `mousedown`     | On mouse button press                |
| `mouseup`       | On mouse button release              |
| `focus`         | When an input or element gains focus |
| `blur`          | When focus is lost                   |
| `input`         | When input value changes             |
| `keydown`       | On key press down                    |
| `keyup`         | On key release                       |
| `touchstart`    | On mobile touch start                |
| `touchend`      | On mobile touch end                  |
| `animationend`  | After a CSS animation completes      |
| `transitionend` | After a CSS transition completes     |
| `customEvent`   | Dispatched manually via JavaScript   |

**You can combine multiple triggers using a comma:**

> `data-ca-trigger="mouseenter,click,keydown"`

### Attributes Reference

| Attribute              | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| `data-ca-trigger`      | Required. One or more DOM events to trigger the animation.            |
| `data-ca-class`        | Required. Animation class(es) to add. Separate multiple with a space. |
| `data-ca-reset="true"` | Optional. Removes class after animation ends (allows re-triggering).  |
| `data-ca-delay`        | Optional. Adds `animation-delay` (e.g. `"0.5s"`).                     |
| `data-ca-duration`     | Optional. Adds `animation-duration` (e.g. `"2s"`).                    |

### Example: Hover with Delay and Reset

```html
<div
  class="cssanimation"
  data-ca-trigger="mouseenter"
  data-ca-class="ca__fx-fadeIn"
  data-ca-delay="0.5s"
  data-ca-duration="2s"
  data-ca-reset="true"
>
  Hover me to fade in
</div>
```

### data-ca-key

Limit animations to specific key presses:

```html
<input data-ca-trigger="keydown" data-ca-key="Enter,Escape" data-ca-class="ca__fx-bounce" />
```

### Modifier Support

`data-ca-key="ctrl+z, shift+a, alt+x"`

### Wildcard Support

`data-ca-key="en*, arrow*"`

### Trigger Animation Reset: Reset the animation class after it finishes:

`data-ca-reset="true"`

### Timing Controls

- `data-ca-delay="0.2s"`
- `data-ca-duration="1.5s"`

You can use any valid CSS time units.

## Custom Events

Trigger animation manually via JavaScript:

```js
document.getElementById('myBox').dispatchEvent(new Event('customEvent'));
```

```html
<div id="myBox" data-ca-trigger="customEvent" data-ca-class="ca__fx-pop"></div>
```

### Global Disable (Optional)

To disable all animations globally (e.g., for accessibility/testing), set:

```js
window.__CA_TRIGGER_DISABLED = true;
```

To re-enable:

```js
window.__CA_TRIGGER_DISABLED = false;
caTrigger.init(); // Re-initialize manually
```

### Integration Tips

- Core class `.cssanimation` is mandatory to use.
- Avoid using the same data-ca-trigger on deeply nested elements to prevent event conflicts. <br><br>

### Plugin Architecture Summary

- Written in vanilla JS (no dependencies)
- Supports multiple triggers and classes
- Respects animation timing via native CSS
- Easy to drop in any project

[← Return to the main README](./README.md)
