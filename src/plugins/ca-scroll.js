// ca-scroll.js — AOS-style scroll animation handler for cssanimation.io (self-contained, no manual CSS)

(function () {
  // --- Constants ---
  const ATTR_PREFIX = 'ca-scroll';
  const ATTR_OFFSET = `${ATTR_PREFIX}-offset`;
  const ATTR_REPEAT = `${ATTR_PREFIX}-repeat`;
  const ATTR_DELAY = 'ca-delay';
  const ATTR_DURATION = 'ca-duration';
  const ATTR_ANIMATION_CLASS = `${ATTR_PREFIX}-animation-class`; // New: Custom animation class
  const ATTR_TOGGLE_CLASS = `${ATTR_PREFIX}-toggle-class`; // New: Class to apply when out of view

  const CLASS_ANIMATE = 'ca-animate';
  const CLASS_CSSANIMATION = 'cssanimation';
  const PREFIX_FX = 'ca__fx-'; // Prefix for animation effect classes

  const DEFAULT_THRESHOLD = 0.15; // Default Intersection Observer threshold
  const DEFAULT_TRANSITION_DURATION = '0.6s';
  const DEFAULT_TRANSITION_TIMING_FUNCTION = 'ease';

  const DEBUG = window.__CA_DEBUG || false;

  // Stores active observers for re-initialization
  let activeObservers = [];

  // --- Helper Functions ---

  /**
   * Injects the necessary CSS styles for scroll animations.
   * Ensures the style block is only injected once.
   */
  function injectCAScrollStyles() {
    if (document.getElementById(`${ATTR_PREFIX}-style`)) {
      return;
    }

    const style = document.createElement('style');
    style.id = `${ATTR_PREFIX}-style`;
    style.textContent = `
            [${ATTR_PREFIX}] {
                visibility: hidden;
                transition-property: opacity, transform;
                transition-timing-function: ${DEFAULT_TRANSITION_TIMING_FUNCTION};
                transition-duration: ${DEFAULT_TRANSITION_DURATION};
            }

            [${ATTR_PREFIX}].${CLASS_ANIMATE} {
                visibility: visible;
            }

            .${CLASS_CSSANIMATION} {
                animation-play-state: paused;
            }

            .${CLASS_CSSANIMATION}.${CLASS_ANIMATE} {
                animation-play-state: running;
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Logs messages to the console if debug mode is enabled.
   * @param {...any} args - Arguments to log.
   */
  function log(...args) {
    if (DEBUG) {
      console.log(`[${ATTR_PREFIX}]`, ...args);
    }
  }

  /**
   * Retrieves an attribute value from an element, returning a default if not found.
   * @param {Element} el - The DOM element.
   * @param {string} attrName - The name of the attribute.
   * @param {string} defaultValue - The default value to return if the attribute is not found.
   * @returns {string} The attribute value or the default value.
   */
  function getAttributeValue(el, attrName, defaultValue = '') {
    return el.getAttribute(attrName) || defaultValue;
  }

  /**
   * Determines the animation effect class for an element.
   * Prioritizes `data-ca-animation-class` over `ca__fx-` prefix.
   * @param {Element} el - The DOM element.
   * @returns {string|null} The animation class or null if not found.
   */
  function getAnimationClass(el) {
    const customClass = getAttributeValue(el, ATTR_ANIMATION_CLASS);
    if (customClass) {
      return customClass;
    }
    return Array.from(el.classList).find((cls) => cls.startsWith(PREFIX_FX));
  }

  /**
   * Prepares an element for animation by storing its animation class.
   * @param {Element} el - The DOM element.
   */
  function prepareElement(el) {
    const animationClass = getAnimationClass(el);
    if (animationClass) {
      el.dataset.caAnimationClass = animationClass;
    } else {
      log(
        'Warning: Element',
        el,
        'has',
        ATTR_PREFIX,
        'but no animation class found (e.g.,',
        PREFIX_FX,
        'or',
        ATTR_ANIMATION_CLASS,
        ').',
      );
    }

    const toggleClass = getAttributeValue(el, ATTR_TOGGLE_CLASS);
    if (toggleClass) {
      el.dataset.caToggleClass = toggleClass;
      // Apply toggle class initially if element is not meant to be visible
      // This assumes elements start outside the viewport
      el.classList.add(toggleClass);
    }
  }

  /**
   * Applies animation styles and classes to an element.
   * @param {Element} el - The DOM element to animate.
   */
  function animateElement(el) {
    const delay = getAttributeValue(el, ATTR_DELAY);
    const duration = getAttributeValue(el, ATTR_DURATION);
    const animationClass = el.dataset.caAnimationClass;
    const toggleClass = el.dataset.caToggleClass;

    if (delay) {
      el.style.transitionDelay = delay;
      el.style.animationDelay = delay;
    }
    if (duration) {
      el.style.transitionDuration = duration;
      el.style.animationDuration = duration;
    }

    if (toggleClass) {
      el.classList.remove(toggleClass); // Remove toggle class when animating
    }

    if (animationClass) {
      el.classList.add(animationClass);
    }
    el.classList.add(CLASS_ANIMATE);
    log('Animating element:', el);
  }

  /**
   * Resets animation styles and classes on an element.
   * @param {Element} el - The DOM element to reset.
   */
  function resetElement(el) {
    const animationClass = el.dataset.caAnimationClass;
    const toggleClass = el.dataset.caToggleClass;

    if (animationClass) {
      el.classList.remove(animationClass);
    }
    el.classList.remove(CLASS_ANIMATE);

    // Reset inline styles for delay/duration if needed for repeat
    el.style.transitionDelay = '';
    el.style.animationDelay = '';
    el.style.transitionDuration = '';
    el.style.animationDuration = '';

    if (toggleClass) {
      el.classList.add(toggleClass); // Re-apply toggle class when out of view
    }
    log('Resetting element:', el);
  }

  /**
   * Initializes the scroll animation logic.
   * This function can be called multiple times safely.
   */
  function initCAScroll() {
    // Disconnect previous observers if re-initializing
    activeObservers.forEach((observer) => observer.disconnect());
    activeObservers = [];

    injectCAScrollStyles();

    const elements = document.querySelectorAll(`[${ATTR_PREFIX}]`);
    if (!elements.length) {
      log('No elements with', ATTR_PREFIX, 'found.');
      return;
    }

    // Group elements by their offset for efficient observer creation
    const groupedElements = {};
    elements.forEach((el) => {
      prepareElement(el);
      const offset = getAttributeValue(el, ATTR_OFFSET, '0');
      if (!groupedElements[offset]) {
        groupedElements[offset] = [];
      }
      groupedElements[offset].push(el);
    });

    // Create an Intersection Observer for each unique offset
    Object.entries(groupedElements).forEach(([offset, els]) => {
      const rootMarginPx = parseInt(offset, 10);
      const rootMargin = `0px 0px -${rootMarginPx}px 0px`; // Negative margin for 'offset' from bottom

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            const repeat = getAttributeValue(el, ATTR_REPEAT) === 'true';

            if (entry.isIntersecting) {
              animateElement(el);
              if (!repeat) {
                observer.unobserve(el); // Stop observing if not repeatable
              }
            } else {
              if (repeat) {
                resetElement(el); // Reset if repeatable and out of view
              }
            }
          });
        },
        {
          root: null, // relative to the viewport
          rootMargin,
          threshold: DEFAULT_THRESHOLD,
        },
      );

      els.forEach((el) => {
        observer.observe(el);
        log('Observing element with offset:', offset, el);
      });
      activeObservers.push(observer); // Store observer for potential disconnection
    });
  }

  // --- Initialization ---
  // Initialize when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initCAScroll);

  // Expose initCAScroll to the global scope for manual re-initialization (e.g., after AJAX content loads)
  window.initCAScroll = initCAScroll;
})();
