import { animationMap } from './gsap-animation-map.js';
import { wrapLettersIfNeeded } from './utils/gsap-letteranimation.js';

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
