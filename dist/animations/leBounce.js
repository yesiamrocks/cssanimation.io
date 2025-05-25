/**
 * animateLeBounce.js
 * GSAP-powered bounce animation for letter-by-letter text
 * Part of cssanimation.io
 *
 * @param {HTMLElement} el - Element to animate (its text will be split into spans)
 * @param {Object} options - Optional GSAP animation settings from `ca-gsap-options`
 */

export function animateLeBounce(el, options = {}) {
    // === Safety Check: GSAP must be loaded ===
    if (typeof gsap === 'undefined') {
        console.error(
            '[cssanimation.io] ❌ GSAP is not loaded. Make sure it is imported before using animateLeBounce.',
        );
        return;
    }

    // === Inject CSS only once ===
    if (!document.querySelector('[data-ca-gsap-style]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ca-gsap-style', 'true');
        style.innerHTML = `
            .ca__gsap-letter {
                display: inline-block;
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
    }

    // === Extract and prepare text ===
    const text = el.textContent.trim();

    // === Convert to letter-by-letter spans ===
    el.innerHTML = text
        .split('')
        .map((char) =>
            char === ' '
                ? ' ' // preserve spaces
                : `<span class="ca__gsap-letter">${char}</span>`,
        )
        .join('');

    const letters = el.querySelectorAll('.ca__gsap-letter');

    // === Reset previous animation state (in case of re-init) ===
    gsap.set(letters, { y: 0, opacity: 1 });

    // === Animate all letters with bounce loop ===
    gsap.to(letters, {
        // Default settings, can be overridden by options
        y: options.y ?? -30,
        repeat: options.repeat ?? -1,
        yoyo: options.yoyo ?? true,
        ease: options.ease ?? 'sine.inOut',
        duration: options.duration ?? 0.8,
        stagger: options.stagger ?? 0.1,

        // Spread user options last so they override safely
        ...options,
    });

    console.log('[cssanimation.io] ✅ animateLeBounce applied:', el);
}
