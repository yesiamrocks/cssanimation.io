// animations/animateBounce.js

import { createGsapAnimation } from '../utils/createGsapAnimation.js';

export function animateBounce(el, options = {}) {
    createGsapAnimation(
        el,
        {
            y: 30,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            duration: 0.8,
        },
        options,
    );
}
