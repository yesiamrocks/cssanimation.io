/**
 * cssanimation-gsap.js - GSAP-powered animation
 * Part of cssanimation.io
 * Version: 2.3.0
 * Author: Shafayetul Islam Pavel
 * https://cssanimation.io | https://github.com/yesiamrocks/cssanimation.io
 *
 * Title: A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.
 * Description: Applies letter-by-letter CSS animations to text.
 * cssanimation.io Copyright © 2025 Shafayetul Islam Pavel
 */

import { animationMap } from './generated-animation-map.js';

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
