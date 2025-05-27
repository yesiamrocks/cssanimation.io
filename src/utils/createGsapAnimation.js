/**
 * Creates a GSAP .to() animation with safe default merging.
 *
 * @param {Element | Element[] | NodeList} el - Target element(s)
 * @param {Object} defaultOptions - Default fallback settings
 * @param {Object} [userOptions={}] - Optional user-provided settings
 */
export function createGsapAnimation(el, defaultOptions, userOptions = {}) {
    const finalOptions = {
        ...defaultOptions,
        ...userOptions,
    };

    gsap.to(el, finalOptions);
}
