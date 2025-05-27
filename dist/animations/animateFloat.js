// animations/animateFloat.js

import { createGsapAnimation } from '../utils/createGsapAnimation.js';

export function animateAnimateFloat(el, options = {}) {
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
