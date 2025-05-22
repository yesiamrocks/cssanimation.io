# cssanimation.io Utility Class Reference

This document provides a complete reference of utility classes available in **cssanimation.io**. Use these classes in combination with `.cssanimation` and animation effect classes to fine-tune timing, easing, delays, and repetitions.

### Duration Animation Utilities (Speed Classes)

| Class Name        | Duration | Description               |
| ----------------- | -------- | ------------------------- |
| `.ca_speed-blitz` | `0.3s`   | Very fast                 |
| `.ca_speed-quick` | `0.6s`   | Default (slightly faster) |
| `.ca_speed-chill` | `1.2s`   | Calm and fluid            |
| `.ca_speed-drift` | `2s`     | Slow motion               |
| `.ca_speed-snail` | `3s`     | Super slow                |

### Delay Animation Utilities (Start Later)

| Class Name    | Delay   | Description       |
| ------------- | ------- | ----------------- |
| `.ca_delay-1` | `0.25s` | Slight pause      |
| `.ca_delay-2` | `0.5s`  | Half second delay |
| `.ca_delay-3` | `1s`    | One second delay  |
| `.ca_delay-5` | `2s`    | Two seconds delay |

### Easing Animation Utilities (Timing Functions)

| Class Name           | Timing Function                          | Description             |
| -------------------- | ---------------------------------------- | ----------------------- |
| `.ca_ease-smooth`    | `ease-in-out`                            | Smooth in and out       |
| `.ca_ease-snappy`    | `cubic-bezier(0.5, 1.8, 0.5, 1)`         | Snappy elastic feel     |
| `.ca_ease-chill`     | `ease-in`                                | Soft and subtle entry   |
| `.ca_ease-punch`     | `ease-out`                               | Quick exit, punchy      |
| `.ca_ease-linear`    | `linear`                                 | Constant speed          |
| `.ca_easeSoft`       | `ease`                                   | Standard easing         |
| `.ca_easeInFast`     | `ease-in`                                | Fast entrance           |
| `.ca_easeOutChill`   | `ease-out`                               | Gentle exit             |
| `.ca_easeSnap`       | `ease-in-out`                            | Quick in/out transition |
| `.ca_easeBounce`     | `cubic-bezier(0.34, 1.56, 0.64, 1)`      | Bouncy entry            |
| `.ca_easeElastic`    | `cubic-bezier(0.68, -0.55, 0.27, 1.55)`  | Elastic overshoot       |
| `.ca_easeSwoosh`     | `cubic-bezier(0.4, 0, 0.2, 1)`           | Swooshing motion        |
| `.ca_easeGlide`      | `cubic-bezier(0.25, 1, 0.5, 1)`          | Glide with elegance     |
| `.ca_easeStagger`    | `step-end`                               | Sudden final step       |
| `.ca_easeDrift`      | `cubic-bezier(0.55, 0.06, 0.68, 0.19)`   | Lazy and floaty         |
| `.ca_easeJelly`      | `cubic-bezier(0.76, 0, 0.24, 1)`         | Wobbling jelly          |
| `.ca_easePop`        | `cubic-bezier(0.3, 1.3, 0.3, 1)`         | Snappy pop effect       |
| `.ca_easeRocket`     | `cubic-bezier(0.6, 0.05, 1, 0.95)`       | Fast takeoff            |
| `.ca_easeGravity`    | `cubic-bezier(0.8, 0, 0.2, 1)`           | Gravity-like bounce     |
| `.ca_easeRubber`     | `cubic-bezier(0.36, 0.66, 0.04, 1)`      | Elastic stretch         |
| `.ca_easeBoom`       | `cubic-bezier(0.7, 0, 0.3, 1.5)`         | Big bounce boom         |
| `.ca_easeSlideBack`  | `cubic-bezier(0.33, 1, 0.68, 1)`         | Slides back naturally   |
| `.ca_easeQuickStep`  | `steps(3, end)`                          | Step-based snap         |
| `.ca_easeSnapBack`   | `cubic-bezier(0.5, -0.5, 0.5, 1.5)`      | Snap with pullback      |
| `.ca_easeWhip`       | `cubic-bezier(0.6, -0.28, 0.735, 0.045)` | Whiplash effect         |
| `.ca_easeComet`      | `cubic-bezier(0.2, 0.8, 0.4, 1.5)`       | Tail-like motion        |
| `.ca_easeQuick`      | `cubic-bezier(0.5, 0, 0.75, 0)`          | Fast and sharp          |
| `.ca_easeGentle`     | `cubic-bezier(0.25, 0.1, 0.25, 1)`       | Gentle acceleration     |
| `.ca_easeSling`      | `cubic-bezier(0.6, -0.28, 0.74, 0.05)`   | Slingshot effect        |
| `.ca_easeBounceHard` | `cubic-bezier(0.68, -0.6, 0.32, 1.6)`    | Hard bounce impact      |
| `.ca_easeOvershoot`  | `cubic-bezier(0.8, 0, 1, 1)`             | Overshooting motion     |
| `.ca_easeSnapZoom`   | `cubic-bezier(0.2, 0.85, 0.5, 1)`        | Zoom-in snappily        |
| `.ca_easeRipple`     | `cubic-bezier(0.65, 0.05, 0.36, 1)`      | Ripple-like motion      |
| `.ca_easePulse`      | `cubic-bezier(0.47, 0, 0.745, 0.715)`    | Heartbeat rhythm        |
| `.ca_easeStepSmooth` | `steps(5, end)`                          | Smooth stepped motion   |
| `.ca_easeFlow`       | `cubic-bezier(0.25, 0.46, 0.45, 0.94)`   | Natural flow            |
| `.ca_easeWhiplash`   | `cubic-bezier(0.3, 1.5, 0.8, 1)`         | Sharp whip effect       |
| `.ca_easePopIn`      | `cubic-bezier(0.65, 0, 0.35, 1)`         | Subtle pop              |
| `.ca_easeDip`        | `cubic-bezier(0.47, 1.64, 0.41, 0.8)`    | Dip and lift            |
| `.ca_easeBounceSoft` | `cubic-bezier(0.57, 1.45, 0.45, 1)`      | Soft bounce             |
| `.ca_easeZoomSnappy` | `cubic-bezier(0.3, 0, 0.3, 1.5)`         | Snappy zoom             |
| `.ca_easeBackTwist`  | `cubic-bezier(0.9, -0.6, 0.8, 1.8)`      | Back and twist bounce   |

### Repeating Animation Utilities (Loops)

| Class Name         | Behavior             | Description             |
| ------------------ | -------------------- | ----------------------- |
| `.ca_loop-once`    | `1`                  | Play one time (default) |
| `.ca_loop-forever` | `infinite`           | Infinite repeat         |
| `.ca_loop-triple`  | `3`                  | 3x repeat               |
| `.ca_loop-bounce`  | `infinite alternate` | Ping-pong style         |

> **Tip:** You can combine delay, speed, easing, and loop utilities on a single element!

```html
<div
    class="cssanimation ca__leSlideLeft ca__speed-fast ca__ease-out ca__loop-3x ca__delay-1s"
>
    Slide me in style!
</div>
```

_Explore more with live demos and animation playgrounds at [cssanimation.io](https://cssanimation.io)_ 🚀
