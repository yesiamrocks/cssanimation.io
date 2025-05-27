// animations/animateLeMoveFromLeft.js

import { createGsapAnimation } from '../utils/createGsapAnimation.js';

/**
 * Letter-by-letter GSAP animation: move from left.
 *
 * @param {HTMLElement} el - Target element
 * @param {Object} [options={}] - GSAP override options
 */
export function animateLeMoveFromLeft(el, options = {}) {
    if (!el || !gsap) return;

    const text = el.textContent.trim();

    // Wrap each character in a span
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

    // Animate to final state using shared GSAP utility
    createGsapAnimation(
        letters,
        {
            x: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1,
            stagger: 0.05,
        },
        options,
    );

    console.log('[cssanimation.io] ✅ animateLeMoveFromLeft applied:', el);
}
