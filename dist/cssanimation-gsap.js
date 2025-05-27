import { initGsapTriggers } from './utils/initGsapTriggers.js';

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[ca-gsap]');

    animatedElements.forEach((el) => {
        const animationName = el.getAttribute('ca-gsap');
        let options = {};

        try {
            const raw = el.getAttribute('ca-gsap-options');
            if (raw) {
                options = JSON.parse(raw);
            }
        } catch (err) {
            console.warn('Invalid ca-gsap-options', el, err);
        }

        const finalOptions = {
            ...animationMap[animationName],
            ...options,
        };

        gsap.to(el, finalOptions);
    });

    // 🔽 Add this
    initGsapTriggers();
});
