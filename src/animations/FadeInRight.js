/**
 * GSAP version of `fadeInRight` animation.
 * Equivalent to:
 *   from { opacity: 0; transform: translateX(100%) }
 *   to   { opacity: 1; }
 *
 * @param {HTMLElement | Element[] | NodeList} el - Target element(s)
 * @param {Object} [options={}] - Optional GSAP overrides (from, to, etc.)
 */
export function animateFadeInRight(el, options = {}) {
    const from = options.from || null;
    const to = options.to || null;

    const defaultFrom = {
        opacity: 0,
        x: '100%',
    };

    const defaultTo = {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
    };

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
                to?.onComplete?.();
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
            gsap.set(el, { ...defaultFrom });
        } else if (options.fromOpacity !== undefined) {
            gsap.set(el, { opacity: options.fromOpacity });
        }

        gsap.to(el, finalTo);
    } else {
        gsap.fromTo(el, defaultFrom, {
            ...defaultTo,
            onComplete: cleanup,
        });
    }

    console.log('[cssanimation.io] ✅ animateFadeInRight applied:', el);
}
