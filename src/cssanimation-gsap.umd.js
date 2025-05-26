(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    // animations/bounce.js
    function animateBounce(el, options = {}) {
        gsap.to(el, {
            y: 30,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            ...options,
        });
    }

    function animateEffect3D(el, options) {
        gsap.to(el, {
            duration: 1.5,
            textShadow:
                '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15)',
            ease: 'sine.inOut',
            ...options,
        });
    }

    /**
     * animateLeBounce.js
     * GSAP-powered bounce animation for letter-by-letter text
     * Part of cssanimation.io
     *
     * @param {HTMLElement} el - Element to animate (its text will be split into spans)
     * @param {Object} options - Optional GSAP animation settings from `ca-gsap-options`
     */

    function animateLeBounce(el, options = {}) {
        // === Safety Check: GSAP must be loaded ===
        if (typeof gsap === 'undefined') {
            console.error(
                '[cssanimation.io] ❌ GSAP is not loaded. Make sure it is imported before using animateLeBounce.',
            );
            return;
        }

        // === Inject CSS only once ===
        if (!document.querySelector('[data-ca-gsap-style]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ca-gsap-style', 'true');
            style.innerHTML = `
            .ca__gsap-letter {
                display: inline-block;
                will-change: transform;
            }
        `;
            document.head.appendChild(style);
        }

        // === Extract and prepare text ===
        const text = el.textContent.trim();

        // === Convert to letter-by-letter spans ===
        el.innerHTML = text
            .split('')
            .map((char) =>
                char === ' '
                    ? ' ' // preserve spaces
                    : `<span class="ca__gsap-letter">${char}</span>`,
            )
            .join('');

        const letters = el.querySelectorAll('.ca__gsap-letter');

        // === Reset previous animation state (in case of re-init) ===
        gsap.set(letters, { y: 0, opacity: 1 });

        // === Animate all letters with bounce loop ===
        gsap.to(letters, {
            // Default settings, can be overridden by options
            y: options.y ?? -30,
            repeat: options.repeat ?? -1,
            yoyo: options.yoyo ?? true,
            ease: options.ease ?? 'sine.inOut',
            duration: options.duration ?? 0.8,
            stagger: options.stagger ?? 0.1,

            // Spread user options last so they override safely
            ...options,
        });

        console.log('[cssanimation.io] ✅ animateLeBounce applied:', el);
    }

    /**
     * Letter-by-letter GSAP animation: move from left
     * @param {HTMLElement} el - Target element
     * @param {Object} options - GSAP override options
     */
    function animateLeMoveFromLeft(el, options = {}) {
        if (!el || !gsap) return;

        const text = el.textContent.trim();

        // Split into individual span-wrapped letters
        el.innerHTML = text
            .split('')
            .map((char) =>
                char === ' ' ? ' ' : `<span class="ca__gsap-letter">${char}</span>`,
            )
            .join('');

        const letters = el.querySelectorAll('.ca__gsap-letter');

        // Set initial state
        gsap.set(letters, {
            x: options.fromX ?? -800,
            opacity: options.fromOpacity ?? 0,
        });

        // Animate to final position
        gsap.to(letters, {
            x: 0,
            opacity: 1,
            ease: options.ease ?? 'power3.out',
            duration: options.duration ?? 1,
            stagger: options.stagger ?? 0.05,
            ...options,
        });

        console.log('[cssanimation.io] ✅ animateLeMoveFromLeft applied:', el);
    }

    /**
     * Auto-generated animation map from ./src/animations
     * Run this file before building: npm run generate:map
     * 
     * This file maps animation names (e.g., 'bounce') to exported GSAP functions (e.g., animateBounce).
     * DO NOT EDIT MANUALLY — instead, edit animation files in /src/animations/
     */


    const animationMap = {
      'bounce': animateBounce,
      'effect3D': animateEffect3D,
      'leBounce': animateLeBounce,
      'leMoveFromLeft': animateLeMoveFromLeft,
    };

    /**
     * cssanimation-gsap.js - GSAP-powered animation
     * Part of cssanimation.io
     * Version: 3.0.2
     * Author: Shafayetul Islam Pavel
     * https://cssanimation.io | https://github.com/yesiamrocks/cssanimation.io
     *
     * Title: A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.
     * Description: Applies letter-by-letter CSS animations to text.
     * cssanimation.io Copyright © 2025 Shafayetul Islam Pavel
     */


    document.addEventListener('DOMContentLoaded', () => {
        // Find all elements that use the ca-gsap attribute (e.g., <div ca-gsap="bounce">)
        const animatedElements = document.querySelectorAll('[ca-gsap]');

        animatedElements.forEach((el) => {
            // Retrieve the animation type (e.g., "bounce", "fadeIn", etc.)
            const animationName = el.getAttribute('ca-gsap');

            // Initialize animation options (duration, ease, x/y, etc.)
            let options = {};

            // Attempt to parse ca-gsap-options as JSON
            try {
                const raw = el.getAttribute('ca-gsap-options');
                if (raw) {
                    options = JSON.parse(raw);
                }
            } catch (err) {
                const raw = el.getAttribute('ca-gsap-options');

                // Developer-friendly warning block
                console.group(
                    `[cssanimation.io] ❌ Invalid JSON in ca-gsap-options`,
                );
                console.warn(`Element:`, el);
                console.warn(`→ Received: ${raw}`);
                console.warn(`→ Error: ${err.message}`);
                console.info(`💡 Fix the JSON format. Examples:`);
                console.info(`✅ Use double quotes: '{"y": 30, "duration": 1.5}'`);
                console.info(`✅ Don't use single quotes or trailing commas`);
                console.info(
                    `✅ Always use leading zeros for decimals: 0.5 not .5`,
                );
                console.groupEnd();

                // Optional: Visual cue in the UI for debugging
                el.style.outline = '3px dashed red';
                el.setAttribute('title', 'Invalid JSON in ca-gsap-options');
                return; // skip animation if options are invalid
            }

            // Find the corresponding animation function from the auto-generated map
            const animateFn = animationMap[animationName];

            if (typeof animateFn === 'function') {
                // Run the animation with the parsed options
                animateFn(el, options);
            } else {
                // Show a helpful warning for unregistered animations
                console.warn(
                    `[cssanimation.io] ⚠️ Unknown animation: "${animationName}" not found in animationMap.`,
                );
                el.style.outline = '2px dashed orange';
                el.setAttribute('title', `Unknown animation: "${animationName}"`);
            }
        });
    });

}));
