// animations/animateFadeIn.js

/**
 * Fade-in animation using gsap.fromTo() if both from/to are provided,
 * or fallback from { opacity: 0 } to defaultTo.
 *
 * @param {HTMLElement | Element[] | NodeList} el - Target element(s)
 * @param {Object} [options={}] - GSAP animation options
 */
export function animateFadeIn(el, options = {}) {
    const from = options.from || null;
    const to = options.to || null;

    const defaultFrom = { opacity: 0 };
    const defaultTo = {
        opacity: 1,
        duration: 20,
        ease: 'power1.out',
        stagger: 0.05,
    };

    if (from && to) {
        // Full fromTo specified
        gsap.fromTo(el, from, { ...defaultTo, ...to });
    } else if (!from && (to || Object.keys(options).length > 0)) {
        // If user passed only to-style values (or a partial config)
        const finalTo = {
            ...defaultTo,
            ...(to || options),
        };

        // Optionally set fromOpacity
        if (options.fromOpacity !== undefined) {
            gsap.set(el, { opacity: options.fromOpacity });
        }

        gsap.to(el, finalTo);
    } else {
        // No user config: use default fade fromTo
        gsap.fromTo(el, defaultFrom, defaultTo);
    }

    console.log('[cssanimation.io] ✅ animateFadeIn applied:', el);
}
