import { animationMap } from './gsap-animation-map.js';
import { wrapLettersIfNeeded } from './utils/gsap-letteranimation.js';

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
