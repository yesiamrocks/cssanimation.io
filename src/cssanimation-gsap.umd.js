(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /**
     * Creates a GSAP .to() animation with safe default merging.
     *
     * @param {Element | Element[] | NodeList} el - Target element(s)
     * @param {Object} defaultOptions - Default fallback settings
     * @param {Object} [userOptions={}] - Optional user-provided settings
     */
    function createGsapAnimation(el, defaultOptions, userOptions = {}) {
        const finalOptions = {
            ...defaultOptions,
            ...userOptions,
        };

        gsap.to(el, finalOptions);
    }

    // animations/animateFloat.js


    function animateAnimateFloat(el, options = {}) {
        createGsapAnimation(
            el,
            {
                y: -20,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            },
            options,
        );
    }

    // animations/animateFadeIn.js

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
            duration: 20,
            ease: 'power1.out',
            stagger: 0.05,
        };

        if (from && to) {
            // Full fromTo specified
            gsap.fromTo(el, from, { ...defaultTo, ...to });
        } else if (!from && (to || Object.keys(options).length > 0)) {
            // If user passed only to-style values (or a partial config)
            const finalTo = {
                ...defaultTo,
                ...(to || options),
            };

            // Optionally set fromOpacity
            if (options.fromOpacity !== undefined) {
                gsap.set(el, { opacity: options.fromOpacity });
            }

            gsap.to(el, finalTo);
        } else {
            // No user config: use default fade fromTo
            gsap.fromTo(el, defaultFrom, defaultTo);
        }

        console.log('[cssanimation.io] ✅ animateFadeIn applied:', el);
    }

    /**
     * Auto-generated animation map from ./src/animations
     * Run this file before building: npm run generate:map
     * 
     * This file maps animation names (e.g., 'bounce') to exported GSAP functions (e.g., animateBounce).
     * DO NOT EDIT MANUALLY — instead, edit animation files in /src/animations/
     */


    const animationMap = {
      'ca__gx-animateFloat': animateAnimateFloat,
      'ca__gx-FadeIn': animateFadeIn,
    };

    // utils/wrapLettersIfNeeded.js

    /**
     * Wraps each character of the element’s textContent in a span
     * only if the attribute `ca__letter="true"` is present.
     *
     * @param {HTMLElement} el - The target element
     * @param {string} spanClass - Class to apply to each span
     * @returns {NodeListOf<Element>} All generated span elements
     */
    function wrapLettersIfNeeded(el, spanClass = 'ca__gsap-letter') {
        if (!el.hasAttribute('ca__letter')) return el.childNodes;

        const text = el.textContent.trim();

        el.innerHTML = text
            .split('')
            .map((char) =>
                char === ' ' ? ' ' : `<span class="${spanClass}">${char}</span>`,
            )
            .join('');

        return el.querySelectorAll(`.${spanClass}`);
    }

    document.addEventListener('DOMContentLoaded', () => {
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

            const target = el.hasAttribute('ca__letter')
                ? wrapLettersIfNeeded(el, 'ca__gsap-letter')
                : el;

            if (hasOptions && options.from && options.to) {
                gsap.fromTo(target, options.from, options.to);
            } else if (hasOptions && !options.from) {
                gsap.to(target, options);
            } else {
                // ✅ Use default registered function with default values
                animateFn(target);
            }

            console.log(`[cssanimation.io] ✅ '${animationName}' applied`, el);
        });
    });

}));
