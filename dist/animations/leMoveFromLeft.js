/**
 * Letter-by-letter GSAP animation: move from left
 * @param {HTMLElement} el - Target element
 * @param {Object} options - GSAP override options
 */
export function animateLeMoveFromLeft(el, options = {}) {
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
