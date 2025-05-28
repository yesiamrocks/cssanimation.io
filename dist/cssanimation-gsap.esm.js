/**
 * Fade-in animation using gsap.fromTo() if both from/to are provided,
 * or fallback from { opacity: 0 } to defaultTo.
 *
 * @param {HTMLElement | Element[] | NodeList} el - Target element(s)
 * @param {Object} [options={}] - GSAP animation options
 */
function animateFadeIn(el, options = {}) {
    const from = options.from || null;
    const to = options.to || null;

    const defaultFrom = { opacity: 0 };
    const defaultTo = {
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
        stagger: 0.05,
    };

    // Helper to clean up after animation
    const cleanup = () => {
        if (el instanceof NodeList || Array.isArray(el)) {
            removeLetterAnimationHints(el);
        } else {
            el.style.willChange = 'auto';
            el.style.backfaceVisibility = '';
            el.style.transformStyle = '';
        }
    };

    if (from && to) {
        gsap.fromTo(el, from, {
            ...defaultTo,
            ...to,
            onComplete: () => {
                cleanup();
                to?.onComplete?.(); // if user passed onComplete
            },
        });
    } else if (!from && (to || Object.keys(options).length > 0)) {
        const finalTo = {
            ...defaultTo,
            ...(to || options),
            onComplete: () => {
                cleanup();
                options?.onComplete?.();
            },
        };

        if (
            typeof options.from === 'undefined' &&
            typeof options.fromOpacity === 'undefined' &&
            typeof options.opacity === 'undefined'
        ) {
            gsap.set(el, { opacity: 0 });
        } else if (options.fromOpacity !== undefined) {
            gsap.set(el, { opacity: options.fromOpacity });
        }

        gsap.to(el, finalTo);
    } else {
        gsap.fromTo(el, defaultFrom, {
            ...defaultTo,
            onComplete: () => {
                cleanup();
            },
        });
    }

    console.log('[cssanimation.io] ✅ animateFadeIn applied:', el);
}

/**
 * GSAP version of `fadeInLeft` animation.
 *
 * @param {HTMLElement | Element[] | NodeList} el - Target element(s)
 * @param {Object} [options={}] - Optional GSAP overrides (from, to, etc.)
 */
function animateFadeInLeft(el, options = {}) {
    const from = options.from || null;
    const to = options.to || null;

    const defaultFrom = {
        opacity: 0,
        x: '-100%',
    };

    const defaultTo = {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
    };

    // Cleanup function
    const cleanup = () => {
        if (el instanceof NodeList || Array.isArray(el)) {
            removeLetterAnimationHints(el);
        } else {
            el.style.willChange = 'auto';
            el.style.backfaceVisibility = '';
            el.style.transformStyle = '';
        }
    };

    if (from && to) {
        gsap.fromTo(el, from, {
            ...defaultTo,
            ...to,
            onComplete: () => {
                cleanup();
                to?.onComplete?.();
            },
        });
    } else if (!from && (to || Object.keys(options).length > 0)) {
        const finalTo = {
            ...defaultTo,
            ...(to || options),
            onComplete: () => {
                cleanup();
                options?.onComplete?.();
            },
        };

        if (
            typeof options.from === 'undefined' &&
            typeof options.fromOpacity === 'undefined' &&
            typeof options.opacity === 'undefined'
        ) {
            gsap.set(el, { ...defaultFrom });
        } else if (options.fromOpacity !== undefined) {
            gsap.set(el, { opacity: options.fromOpacity });
        }

        gsap.to(el, finalTo);
    } else {
        gsap.fromTo(el, defaultFrom, {
            ...defaultTo,
            onComplete: cleanup,
        });
    }

    console.log('[cssanimation.io] ✅ animateFadeInLeft applied:', el);
}

/**
 * GSAP version of `fadeInRight` animation.
 * Equivalent to:
 *   from { opacity: 0; transform: translateX(100%) }
 *   to   { opacity: 1; }
 *
 * @param {HTMLElement | Element[] | NodeList} el - Target element(s)
 * @param {Object} [options={}] - Optional GSAP overrides (from, to, etc.)
 */
function animateFadeInRight(el, options = {}) {
    const from = options.from || null;
    const to = options.to || null;

    const defaultFrom = {
        opacity: 0,
        x: '100%',
    };

    const defaultTo = {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
    };

    const cleanup = () => {
        if (el instanceof NodeList || Array.isArray(el)) {
            removeLetterAnimationHints(el);
        } else {
            el.style.willChange = 'auto';
            el.style.backfaceVisibility = '';
            el.style.transformStyle = '';
        }
    };

    if (from && to) {
        gsap.fromTo(el, from, {
            ...defaultTo,
            ...to,
            onComplete: () => {
                cleanup();
                to?.onComplete?.();
            },
        });
    } else if (!from && (to || Object.keys(options).length > 0)) {
        const finalTo = {
            ...defaultTo,
            ...(to || options),
            onComplete: () => {
                cleanup();
                options?.onComplete?.();
            },
        };

        if (
            typeof options.from === 'undefined' &&
            typeof options.fromOpacity === 'undefined' &&
            typeof options.opacity === 'undefined'
        ) {
            gsap.set(el, { ...defaultFrom });
        } else if (options.fromOpacity !== undefined) {
            gsap.set(el, { opacity: options.fromOpacity });
        }

        gsap.to(el, finalTo);
    } else {
        gsap.fromTo(el, defaultFrom, {
            ...defaultTo,
            onComplete: cleanup,
        });
    }

    console.log('[cssanimation.io] ✅ animateFadeInRight applied:', el);
}

/**
 * Auto-generated animation map from ./src/animations
 * Run this file before building: npm run generate:map
 * 
 * This file maps animation names (e.g., 'bounce') to exported GSAP functions (e.g., animateBounce).
 * DO NOT EDIT MANUALLY — instead, edit animation files in /src/animations/
 */


const animationMap = {
  'ca__gx-FadeIn': animateFadeIn,
  'ca__gx-FadeInLeft': animateFadeInLeft,
  'ca__gx-FadeInRight': animateFadeInRight,
};

/**
 * Wraps each character of the element’s textContent in a span
 * for GSAP-based letter animations based on ca__gx-lt mode.
 *
 * Supported modes:
 * - ca__gx-lt="sequence"
 * - ca__gx-lt="reverse"
 * - ca__gx-lt="random"
 *
 * @param {HTMLElement} el - Target element
 * @param {string} spanClass - Class to apply to each span
 * @returns {Element[]} - Array of span-wrapped letters in the correct animation order
 */
function wrapLettersIfNeeded(el, spanClass = 'ca__gsap-letter') {
    const mode = el.getAttribute('ca__gx-lt'); // sequence | reverse | random
    if (!mode) return el.childNodes;

    injectLetterCSS(spanClass); // inject CSS rule once

    const text = el.textContent.trim();
    const chars = [...text];

    el.innerHTML = chars
        .map((char) =>
            char === ' ' ? ' ' : `<span class="${spanClass}">${char}</span>`,
        )
        .join('');

    const spans = el.querySelectorAll(`.${spanClass}`);

    applyAnimationHints(spans); // apply inline GPU-friendly styles

    switch (mode) {
        case 'random':
            return shuffleNodeList(spans);
        case 'reverse':
            return Array.from(spans).reverse();
        default:
            return Array.from(spans); // "sequence"
    }
}

/**
 * Shuffles a NodeList and returns a shuffled array of elements
 */
function shuffleNodeList(nodeList) {
    const array = Array.from(nodeList);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Injects required layout CSS rule (only once)
 */
function injectLetterCSS(spanClass) {
    const styleId = '__ca__gsap_letter_style__';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
    .${spanClass} {
      display: inline-block;
    }
  `;
    document.head.appendChild(style);
}

/**
 * Apply inline animation performance styles to each span
 */
function applyAnimationHints(spans) {
    spans.forEach((el) => {
        el.style.willChange = 'transform, opacity';
        el.style.backfaceVisibility = 'hidden';
        el.style.transformStyle = 'preserve-3d';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalGsapAnimationStyles(); // inject for non-letter animations

    const animatedElements = document.querySelectorAll('[ca-gsap]');

    animatedElements.forEach((el) => {
        const animationName = el.getAttribute('ca-gsap');
        const animateFn = animationMap[animationName];

        if (typeof animateFn !== 'function') {
            console.warn(
                `[cssanimation.io] ⚠️ Unknown animation: "${animationName}" not found in animationMap.`,
            );
            el.style.outline = '2px dashed orange';
            el.setAttribute('title', `Unknown animation: "${animationName}"`);
            return;
        }

        let options = {};
        const raw = el.getAttribute('ca-gsap-options');
        const hasOptions = Boolean(raw);

        if (hasOptions) {
            try {
                options = JSON.parse(raw);
            } catch (err) {
                console.group(
                    `[cssanimation.io] ❌ Invalid JSON in ca-gsap-options`,
                );
                console.warn(`Element:`, el);
                console.warn(`→ Received: ${raw}`);
                console.warn(`→ Error: ${err.message}`);
                console.info(`💡 Fix the JSON format. Examples:`);
                console.info(`✅ '{"y": 30, "duration": 1.5}'`);
                console.groupEnd();
                el.style.outline = '3px dashed red';
                el.setAttribute('title', 'Invalid JSON in ca-gsap-options');
                return;
            }
        }

        const isLetter = el.hasAttribute('ca__gx-lt');
        const target = isLetter
            ? wrapLettersIfNeeded(el, 'ca__gsap-letter')
            : el;

        if (!isLetter) {
            // Inject target-safe styles if not using letter animation
            el.style.willChange = 'transform, opacity';
            el.style.backfaceVisibility = 'hidden';
            el.style.transformStyle = 'preserve-3d';
        }

        if (hasOptions && options.from && options.to) {
            gsap.fromTo(target, options.from, options.to);
        } else if (hasOptions && !options.from) {
            gsap.to(target, options);
        } else {
            animateFn(target);
        }

        console.log(`[cssanimation.io] ✅ '${animationName}' applied`, el);
    });
});

/**
 * Injects a general animation style block for non-letter animations
 * (optional — in case you want shared base styles for future control)
 */
function injectGlobalGsapAnimationStyles() {
    const styleId = '__ca__gsap_global_anim_style__';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
    [ca-gsap]:not([ca__gx-lt]) {
      will-change: transform, opacity;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }
  `;
    document.head.appendChild(style);
}
//# sourceMappingURL=cssanimation-gsap.esm.js.map
