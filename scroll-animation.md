CA-Scroll.js Developer Guide ca-scroll.js is a lightweight, AOS-style JavaScript library for triggering CSS animations and transitions based on scroll position. It's designed to be self-contained and offers both global settings and element-specific overrides.

Table of Contents Installation

Basic Usage

Global Settings (window.\_\_CA_SETTINGS)

Element Data Attributes

ca-scroll

ca-scroll-offset

ca-scroll-repeat

ca-delay

ca-duration

data-ca-animation-class

data-ca-toggle-class

CSS Requirements & Custom Animations

Re-initialization

Debugging

1. Installation There are two primary ways to include ca-scroll.js in your project:

A. Directly in your HTML (recommended for self-contained usage): Place the JavaScript code directly within a <script> tag at the end of your <body>.

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your head content -->
</head>
<body>
    <!-- Your page content -->

    <!-- Your ca-scroll.js code goes here -->
    <script>
        // ca-scroll.js code as provided
        (function () {
            // ... all the ca-scroll.js code ...
        })();
    </script>

</body>
</html>

B. External JavaScript File: Save the provided JavaScript code into a file (e.g., ca-scroll.js) and link it just before the closing </body> tag.

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your head content -->
</head>
<body>
    <!-- Your page content -->

    <!-- Link to your external ca-scroll.js file -->
    <script src="path/to/your/ca-scroll.js"></script>

</body>
</html>

Note: If you are using cssanimation.min.css (or similar external animation libraries), make sure to link it in your <head>:

<link href="https://cdn.jsdelivr.net/npm/@hellouxpavel/cssanimation@latest/dist/cssanimation.min.css" rel="stylesheet" />

2. Basic Usage To make an element animate on scroll, simply add the ca-scroll attribute to it and apply an animation class.

<div ca-scroll class="cssanimation ca__fx-fadeInLeft">
    Hello, I will fade in from the left!
</div>

Explanation:

ca-scroll: This attribute tells the script to observe this element for scroll events.

cssanimation: This base class is crucial. ca-scroll.js relies on this class to control the animation-play-state (pausing animations when out of view). If you're using ca\_\_fx- classes or data-ca-animation-class, the script will automatically add cssanimation if it's not present.

ca\_\_fx-fadeInLeft: This is an example animation class (likely from the cssanimation.io library).

3. Global Settings (window.**CA_SETTINGS) You can configure global behavior for ca-scroll.js by defining a window.**CA_SETTINGS object before the ca-scroll.js script runs.

<script>
    window.__CA_SETTINGS = {
        offset: 100,    // Default distance (in pixels) from the bottom of the viewport to trigger animation. Default: 0
        mobile: false,  // If false, animations are disabled on mobile devices. Default: true
        live: true      // If false, all ca-scroll animations are globally disabled. Default: true
    };
</script>
<!-- Then your ca-scroll.js script -->
<script src="path/to/your/ca-scroll.js"></script>

offset: Sets a default scroll offset for all elements that do not specify their own ca-scroll-offset attribute.

mobile: Controls whether animations are triggered on mobile devices. If set to false and the user is on a mobile device, ca-scroll.js will not initialize.

live: A global toggle. If set to false, ca-scroll.js will not initialize at all, effectively disabling all scroll animations.

4. Element Data Attributes These attributes are added directly to your HTML elements to customize their individual animation behavior. Element-specific attributes override global settings.

ca-scroll Purpose: Marks an element as eligible for scroll animation.

Value: No value needed (it's a boolean attribute).

Example:

<div ca-scroll></div>

ca-scroll-offset Purpose: Specifies the distance (in pixels) from the bottom of the viewport at which the animation should trigger for this specific element.

Value: An integer representing pixels.

Default: Uses the offset from window.\_\_CA_SETTINGS, or 0 if not set globally.

Example:

<div ca-scroll ca-scroll-offset="200" class="cssanimation ca__fx-fadeIn">
    Animates when 200px from bottom.
</div>

ca-scroll-repeat Purpose: Determines if the animation should repeat every time the element scrolls into view.

Value: "true" or "false".

Default: false (animation triggers once and then stops observing).

Example:

<div ca-scroll ca-scroll-repeat="true" class="cssanimation ca__fx-shakeX">
    I will shake every time you scroll me into view!
</div>

ca-delay Purpose: Sets a delay before the animation starts for this specific element.

Value: A CSS time value (e.g., "0.5s", "500ms").

Example:

<div ca-scroll ca-delay="0.8s" class="cssanimation ca__fx-bounceIn">
    I will bounce in after an 0.8s delay.
</div>

ca-duration Purpose: Sets the duration of the animation for this specific element.

Value: A CSS time value (e.g., "1.2s", "1200ms").

Example:

<div ca-scroll ca-duration="2s" class="cssanimation ca__fx-pulse">
    I will pulse for 2 seconds.
</div>

data-ca-animation-class Purpose: Allows you to specify a custom CSS animation class that doesn't follow the ca\_\_fx- prefix convention. This is useful for integrating with other CSS animation libraries or your own custom @keyframes.

Value: The name of your custom CSS class.

Example (with custom CSS): CSS:

.my-custom-slide-up { animation: slideUpAnimation 1s ease-out forwards; } @keyframes slideUpAnimation { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }

HTML:

<div ca-scroll data-ca-animation-class="my-custom-slide-up">
    I use a custom slide-up animation.
</div>

Note: The script will automatically add the cssanimation class to elements using data-ca-animation-class to manage its animation-play-state.

data-ca-toggle-class Purpose: Specifies a CSS class to be applied to the element when it is out of view, and removed when it enters the viewport. If ca-scroll-repeat="true", this class will be re-applied every time the element leaves the view.

Value: The name of the CSS class.

Example (with custom CSS): CSS:

.initial-invisible-and-shifted { opacity: 0; transform: translateX(-100px); transition: opacity 0.6s ease, transform 0.6s ease; /_ For smooth initial state _/ }

HTML:

<div ca-scroll ca-scroll-repeat="true" data-ca-animation-class="ca__fx-fadeInRight" data-ca-toggle-class="initial-invisible-and-shifted">
    I start hidden and slide, then reset when out of view.
</div>

Note: This is ideal for setting initial positions/opacity. If the data-ca-toggle-class itself contains an animation, ca-scroll.js will ensure the cssanimation class is present on the element to pause its animation while out of view.

5. CSS Requirements & Custom Animations For ca-scroll.js to work effectively, your CSS animations need to adhere to a few conventions:

Initial Hidden State (visibility: hidden): The script injects a global style that sets visibility: hidden; for all [ca-scroll] elements by default. When .ca-animate is added, it becomes visibility: visible;.

Transitions: The injected style also provides default transition-property, transition-timing-function, and transition-duration for non-CSSAnimation effects.

cssanimation Class: Any element that should have its animation paused and played by ca-scroll.js (this includes ca\_\_fx- animations and custom animations specified via data-ca-animation-class) needs to have the cssanimation class. The script automatically adds this if it detects an animation class. This class is where animation-play-state: paused; is applied.

ca-animate Class: This class is added by ca-scroll.js when an element is in view. It sets visibility: visible; and animation-play-state: running;.

Custom @keyframes: If you define your own @keyframes animations (as in the my-custom-bounceX example in the demo), ensure they are part of a CSS class that you then apply using data-ca-animation-class.

6. Re-initialization If you dynamically load new content into your page (e.g., via AJAX), you might need to re-initialize ca-scroll.js to observe the new elements.

Simply call:

window.initCAScroll();

This function will disconnect any previous Intersection Observers and set up new ones for all currently present [ca-scroll] elements in the DOM.

7. Debugging To get verbose console logs about which elements are being observed, animated, and reset, enable debug mode by setting window.\_\_CA_DEBUG to true before the ca-scroll.js script runs:

<script>
    window.__CA_DEBUG = true;
</script>
<script src="path/to/your/ca-scroll.js"></script>

Then, open your browser's developer console (usually F12) and check the "Console" tab.
