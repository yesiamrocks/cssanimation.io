# cssanimation.io Utility Class Reference

This document provides a complete reference of utility classes available in **cssanimation.io**. Use these classes in combination with `.cssanimation` and animation effect classes to fine-tune timing, easing, delays, and repetitions.

### Duration Animation Utilities (Speed Classes)

| Class Name         | Duration | Description               |
| ------------------ | -------- | ------------------------- |
| `.ca__speed-blitz` | `0.3s`   | Very fast                 |
| `.ca__speed-quick` | `0.6s`   | Default (slightly faster) |
| `.ca__speed-chill` | `1.2s`   | Calm and fluid            |
| `.ca__speed-drift` | `2s`     | Slow motion               |
| `.ca__speed-snail` | `3s`     | Super slow                |

### Delay Animation Utilities (Start Later)

| Class Name     | Delay   | Description       |
| -------------- | ------- | ----------------- |
| `.ca__delay-1` | `0.25s` | Slight pause      |
| `.ca__delay-2` | `0.5s`  | Half second delay |
| `.ca__delay-3` | `1s`    | One second delay  |
| `.ca__delay-5` | `2s`    | Two seconds delay |

### Easing Animation Utilities (Timing Functions)

| Class Name            | Timing Function                          | Description             |
| --------------------- | ---------------------------------------- | ----------------------- |
| `.ca__ease-smooth`    | `ease-in-out`                            | Smooth in and out       |
| `.ca__ease-snappy`    | `cubic-bezier(0.5, 1.8, 0.5, 1)`         | Snappy elastic feel     |
| `.ca__ease-chill`     | `ease-in`                                | Soft and subtle entry   |
| `.ca__ease-punch`     | `ease-out`                               | Quick exit, punchy      |
| `.ca__ease-linear`    | `linear`                                 | Constant speed          |
| `.ca__easeSoft`       | `ease`                                   | Standard easing         |
| `.ca__easeInFast`     | `ease-in`                                | Fast entrance           |
| `.ca__easeOutChill`   | `ease-out`                               | Gentle exit             |
| `.ca__easeSnap`       | `ease-in-out`                            | Quick in/out transition |
| `.ca__easeBounce`     | `cubic-bezier(0.34, 1.56, 0.64, 1)`      | Bouncy entry            |
| `.ca__easeElastic`    | `cubic-bezier(0.68, -0.55, 0.27, 1.55)`  | Elastic overshoot       |
| `.ca__easeSwoosh`     | `cubic-bezier(0.4, 0, 0.2, 1)`           | Swooshing motion        |
| `.ca__easeGlide`      | `cubic-bezier(0.25, 1, 0.5, 1)`          | Glide with elegance     |
| `.ca__easeStagger`    | `step-end`                               | Sudden final step       |
| `.ca__easeDrift`      | `cubic-bezier(0.55, 0.06, 0.68, 0.19)`   | Lazy and floaty         |
| `.ca__easeJelly`      | `cubic-bezier(0.76, 0, 0.24, 1)`         | Wobbling jelly          |
| `.ca__easePop`        | `cubic-bezier(0.3, 1.3, 0.3, 1)`         | Snappy pop effect       |
| `.ca__easeRocket`     | `cubic-bezier(0.6, 0.05, 1, 0.95)`       | Fast takeoff            |
| `.ca__easeGravity`    | `cubic-bezier(0.8, 0, 0.2, 1)`           | Gravity-like bounce     |
| `.ca__easeRubber`     | `cubic-bezier(0.36, 0.66, 0.04, 1)`      | Elastic stretch         |
| `.ca__easeBoom`       | `cubic-bezier(0.7, 0, 0.3, 1.5)`         | Big bounce boom         |
| `.ca__easeSlideBack`  | `cubic-bezier(0.33, 1, 0.68, 1)`         | Slides back naturally   |
| `.ca__easeQuickStep`  | `steps(3, end)`                          | Step-based snap         |
| `.ca__easeSnapBack`   | `cubic-bezier(0.5, -0.5, 0.5, 1.5)`      | Snap with pullback      |
| `.ca__easeWhip`       | `cubic-bezier(0.6, -0.28, 0.735, 0.045)` | Whiplash effect         |
| `.ca__easeComet`      | `cubic-bezier(0.2, 0.8, 0.4, 1.5)`       | Tail-like motion        |
| `.ca__easeQuick`      | `cubic-bezier(0.5, 0, 0.75, 0)`          | Fast and sharp          |
| `.ca__easeGentle`     | `cubic-bezier(0.25, 0.1, 0.25, 1)`       | Gentle acceleration     |
| `.ca__easeSling`      | `cubic-bezier(0.6, -0.28, 0.74, 0.05)`   | Slingshot effect        |
| `.ca__easeBounceHard` | `cubic-bezier(0.68, -0.6, 0.32, 1.6)`    | Hard bounce impact      |
| `.ca__easeOvershoot`  | `cubic-bezier(0.8, 0, 1, 1)`             | Overshooting motion     |
| `.ca__easeSnapZoom`   | `cubic-bezier(0.2, 0.85, 0.5, 1)`        | Zoom-in snappily        |
| `.ca__easeRipple`     | `cubic-bezier(0.65, 0.05, 0.36, 1)`      | Ripple-like motion      |
| `.ca__easePulse`      | `cubic-bezier(0.47, 0, 0.745, 0.715)`    | Heartbeat rhythm        |
| `.ca__easeStepSmooth` | `steps(5, end)`                          | Smooth stepped motion   |
| `.ca__easeFlow`       | `cubic-bezier(0.25, 0.46, 0.45, 0.94)`   | Natural flow            |
| `.ca__easeWhiplash`   | `cubic-bezier(0.3, 1.5, 0.8, 1)`         | Sharp whip effect       |
| `.ca__easePopIn`      | `cubic-bezier(0.65, 0, 0.35, 1)`         | Subtle pop              |
| `.ca__easeDip`        | `cubic-bezier(0.47, 1.64, 0.41, 0.8)`    | Dip and lift            |
| `.ca__easeBounceSoft` | `cubic-bezier(0.57, 1.45, 0.45, 1)`      | Soft bounce             |
| `.ca__easeZoomSnappy` | `cubic-bezier(0.3, 0, 0.3, 1.5)`         | Snappy zoom             |
| `.ca__easeBackTwist`  | `cubic-bezier(0.9, -0.6, 0.8, 1.8)`      | Back and twist bounce   |

### Repeating Animation Utilities (Loops)

| Class Name          | Behavior             | Description             |
| ------------------- | -------------------- | ----------------------- |
| `.ca__loop-once`    | `1`                  | Play one time (default) |
| `.ca__loop-forever` | `infinite`           | Infinite repeat         |
| `.ca__loop-triple`  | `3`                  | 3x repeat               |
| `.ca__loop-bounce`  | `infinite alternate` | Ping-pong style         |

> **Tip:** You can combine delay, speed, easing, and loop utilities on a single element!

```html
<div
    class="cssanimation ca__leSlideLeft ca__speed-fast ca__ease-out ca__loop-3x ca__delay-1s"
>
    Slide me in style!
</div>
```

_Explore more with live demos and animation playgrounds at [cssanimation.io](https://cssanimation.io)_ 🚀
