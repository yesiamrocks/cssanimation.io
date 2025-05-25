# cssanimation.io Utility Class Reference

This document provides a complete reference of utility classes available in **cssanimation.io**. Use these classes in combination with `.cssanimation` and animation effect classes to fine-tune timing, easing, delays, and repetitions.

### Duration Animation Utilities (Speed Classes)

| Class Name           | Duration | Description               |
| -------------------- | -------- | ------------------------- |
| `.ca__u-speed-blitz` | `0.3s`   | Very fast                 |
| `.ca__u-speed-quick` | `0.6s`   | Default (slightly faster) |
| `.ca__u-speed-chill` | `1.2s`   | Calm and fluid            |
| `.ca__u-speed-drift` | `2s`     | Slow motion               |
| `.ca__u-speed-snail` | `3s`     | Super slow                |

### Delay Animation Utilities (Start Later)

| Class Name       | Delay   | Description       |
| ---------------- | ------- | ----------------- |
| `.ca__u-delay-1` | `0.25s` | Slight pause      |
| `.ca__u-delay-2` | `0.5s`  | Half second delay |
| `.ca__u-delay-3` | `1s`    | One second delay  |
| `.ca__u-delay-5` | `2s`    | Two seconds delay |

### Easing Animation Utilities (Timing Functions)

| Class Name              | Timing Function                          | Description             |
| ----------------------- | ---------------------------------------- | ----------------------- |
| `.ca__u-ease-smooth`    | `ease-in-out`                            | Smooth in and out       |
| `.ca__u-ease-snappy`    | `cubic-bezier(0.5, 1.8, 0.5, 1)`         | Snappy elastic feel     |
| `.ca__u-ease-chill`     | `ease-in`                                | Soft and subtle entry   |
| `.ca__u-ease-punch`     | `ease-out`                               | Quick exit, punchy      |
| `.ca__u-ease-linear`    | `linear`                                 | Constant speed          |
| `.ca__u-easeSoft`       | `ease`                                   | Standard easing         |
| `.ca__u-easeInFast`     | `ease-in`                                | Fast entrance           |
| `.ca__u-easeOutChill`   | `ease-out`                               | Gentle exit             |
| `.ca__u-easeSnap`       | `ease-in-out`                            | Quick in/out transition |
| `.ca__u-easeBounce`     | `cubic-bezier(0.34, 1.56, 0.64, 1)`      | Bouncy entry            |
| `.ca__u-easeElastic`    | `cubic-bezier(0.68, -0.55, 0.27, 1.55)`  | Elastic overshoot       |
| `.ca__u-easeSwoosh`     | `cubic-bezier(0.4, 0, 0.2, 1)`           | Swooshing motion        |
| `.ca__u-easeGlide`      | `cubic-bezier(0.25, 1, 0.5, 1)`          | Glide with elegance     |
| `.ca__u-easeStagger`    | `step-end`                               | Sudden final step       |
| `.ca__u-easeDrift`      | `cubic-bezier(0.55, 0.06, 0.68, 0.19)`   | Lazy and floaty         |
| `.ca__u-easeJelly`      | `cubic-bezier(0.76, 0, 0.24, 1)`         | Wobbling jelly          |
| `.ca__u-easePop`        | `cubic-bezier(0.3, 1.3, 0.3, 1)`         | Snappy pop effect       |
| `.ca__u-easeRocket`     | `cubic-bezier(0.6, 0.05, 1, 0.95)`       | Fast takeoff            |
| `.ca__u-easeGravity`    | `cubic-bezier(0.8, 0, 0.2, 1)`           | Gravity-like bounce     |
| `.ca__u-easeRubber`     | `cubic-bezier(0.36, 0.66, 0.04, 1)`      | Elastic stretch         |
| `.ca__u-easeBoom`       | `cubic-bezier(0.7, 0, 0.3, 1.5)`         | Big bounce boom         |
| `.ca__u-easeSlideBack`  | `cubic-bezier(0.33, 1, 0.68, 1)`         | Slides back naturally   |
| `.ca__u-easeQuickStep`  | `steps(3, end)`                          | Step-based snap         |
| `.ca__u-easeSnapBack`   | `cubic-bezier(0.5, -0.5, 0.5, 1.5)`      | Snap with pullback      |
| `.ca__u-easeWhip`       | `cubic-bezier(0.6, -0.28, 0.735, 0.045)` | Whiplash effect         |
| `.ca__u-easeComet`      | `cubic-bezier(0.2, 0.8, 0.4, 1.5)`       | Tail-like motion        |
| `.ca__u-easeQuick`      | `cubic-bezier(0.5, 0, 0.75, 0)`          | Fast and sharp          |
| `.ca__u-easeGentle`     | `cubic-bezier(0.25, 0.1, 0.25, 1)`       | Gentle acceleration     |
| `.ca__u-easeSling`      | `cubic-bezier(0.6, -0.28, 0.74, 0.05)`   | Slingshot effect        |
| `.ca__u-easeBounceHard` | `cubic-bezier(0.68, -0.6, 0.32, 1.6)`    | Hard bounce impact      |
| `.ca__u-easeOvershoot`  | `cubic-bezier(0.8, 0, 1, 1)`             | Overshooting motion     |
| `.ca__u-easeSnapZoom`   | `cubic-bezier(0.2, 0.85, 0.5, 1)`        | Zoom-in snappily        |
| `.ca__u-easeRipple`     | `cubic-bezier(0.65, 0.05, 0.36, 1)`      | Ripple-like motion      |
| `.ca__u-easePulse`      | `cubic-bezier(0.47, 0, 0.745, 0.715)`    | Heartbeat rhythm        |
| `.ca__u-easeStepSmooth` | `steps(5, end)`                          | Smooth stepped motion   |
| `.ca__u-easeFlow`       | `cubic-bezier(0.25, 0.46, 0.45, 0.94)`   | Natural flow            |
| `.ca__u-easeWhiplash`   | `cubic-bezier(0.3, 1.5, 0.8, 1)`         | Sharp whip effect       |
| `.ca__u-easePopIn`      | `cubic-bezier(0.65, 0, 0.35, 1)`         | Subtle pop              |
| `.ca__u-easeDip`        | `cubic-bezier(0.47, 1.64, 0.41, 0.8)`    | Dip and lift            |
| `.ca__u-easeBounceSoft` | `cubic-bezier(0.57, 1.45, 0.45, 1)`      | Soft bounce             |
| `.ca__u-easeZoomSnappy` | `cubic-bezier(0.3, 0, 0.3, 1.5)`         | Snappy zoom             |
| `.ca__u-easeBackTwist`  | `cubic-bezier(0.9, -0.6, 0.8, 1.8)`      | Back and twist bounce   |

### Repeating Animation Utilities (Loops)

| Class Name            | Behavior             | Description             |
| --------------------- | -------------------- | ----------------------- |
| `.ca__u-loop-once`    | `1`                  | Play one time (default) |
| `.ca__u-loop-forever` | `infinite`           | Infinite repeat         |
| `.ca__u-loop-triple`  | `3`                  | 3x repeat               |
| `.ca__u-loop-bounce`  | `infinite alternate` | Ping-pong style         |

> **Tip:** You can combine delay, speed, easing, and loop utilities on a single element!

```html
<h1
    class="cssanimation ca__lt-SlideLeft ca__u-speed-fast ca__u-ease-out ca__u-loop-3x ca__u-delay-1s"
>
    Slide me in style!
</h1>
```

_Explore more with live demos and animation playgrounds at [cssanimation.io](https://cssanimation.io)_ 🚀
