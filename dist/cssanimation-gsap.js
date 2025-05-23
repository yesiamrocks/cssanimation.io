/**
 * cssanimation-gsap.js - GSAP-powered animation enhancements
 * Part of cssanimation.io
 * Version: 2.2.0
 * Author: Shafayetul Islam Pavel
 * https://cssanimation.io | https://github.com/yesiamrocks/cssanimation.io
 */

import { animationMap } from './generated-animation-map.js';

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
