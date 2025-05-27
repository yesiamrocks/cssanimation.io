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
        duration: 1,
        ease: 'power1.out',
        stagger: 0.05,
    };

    // Helper to clean up after animation
    const cleanup = () => {
        if (el instanceof NodeList || Array.isArray(el)) {
            removeLetterAnimationHints(el);
        } else {
            el.style.willChange = 'auto';
            el.style.backfaceVisibility = '';
            el.style.transformStyle = '';
        }
    };

    if (from && to) {
        gsap.fromTo(el, from, {
            ...defaultTo,
            ...to,
            onComplete: () => {
                cleanup();
                to?.onComplete?.(); // if user passed onComplete
            },
        });
    } else if (!from && (to || Object.keys(options).length > 0)) {
        const finalTo = {
            ...defaultTo,
            ...(to || options),
            onComplete: () => {
                cleanup();
                options?.onComplete?.();
            },
        };

        if (
            typeof options.from === 'undefined' &&
            typeof options.fromOpacity === 'undefined' &&
            typeof options.opacity === 'undefined'
        ) {
            gsap.set(el, { opacity: 0 });
        } else if (options.fromOpacity !== undefined) {
            gsap.set(el, { opacity: options.fromOpacity });
        }

        gsap.to(el, finalTo);
    } else {
        gsap.fromTo(el, defaultFrom, {
            ...defaultTo,
            onComplete: () => {
                cleanup();
            },
        });
    }

    console.log('[cssanimation.io] ✅ animateFadeIn applied:', el);
}
