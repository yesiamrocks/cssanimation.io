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

    const animationMap = {
      "bounce": animateBounce,
      "effect3D": animateEffect3D,
    };

    /**
     * cssanimation-gsap.js - GSAP-powered animation enhancements
     * Part of cssanimation.io
     * Version: 2.2.0
     * Author: Shafayetul Islam Pavel
     * https://cssanimation.io | https://github.com/yesiamrocks/cssanimation.io
     */


    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-gsap]').forEach((el) => {
            const animationName = el.dataset.gsap;
            let options = {};

            // Robust JSON parsing with dev-friendly feedback
            try {
                const raw = el.dataset.gsapOptions;
                if (raw) {
                    options = JSON.parse(raw);
                }
            } catch (err) {
                const raw = el.dataset.gsapOptions;

                console.group(
                    `[cssanimation.io] ❌ Invalid JSON in data-gsap-options`,
                );
                console.warn(`Element:`, el);
                console.warn(`→ Received: ${raw}`);
                console.warn(`→ Error: ${err.message}`);
                console.info(`💡 Fix this by ensuring your JSON is valid:`);
                console.info(`✅ Use double quotes for keys and values`);
                console.info(
                    `✅ Use leading zeros for decimals (e.g., 0.5 not .5)`,
                );
                console.info(`✅ Ensure there are no trailing commas`);
                console.info(`✅ Don't use single quotes`);
                console.info(`✅ Example: '{"y": 50, "duration": 0.5}'`);
                console.groupEnd();

                // Optional: show the broken element visually
                el.style.outline = '2px dashed red';
                el.setAttribute('title', 'Invalid JSON in data-gsap-options');
                return; // prevent attempting animation on invalid config
            }

            const animateFn = animationMap[animationName];

            if (typeof animateFn === 'function') {
                animateFn(el, options);
            } else {
                console.warn(
                    `[cssanimation.io] ⚠️ Animation "${animationName}" not found in animationMap.`,
                );
                el.style.outline = '2px dashed orange';
                el.setAttribute('title', `Unknown animation: "${animationName}"`);
            }
        });
    });

}));
