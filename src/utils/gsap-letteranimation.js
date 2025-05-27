// utils/wrapLettersIfNeeded.js

/**
 * Wraps each character of the element’s textContent in a span
 * only if the attribute `ca__letter="true"` is present.
 *
 * @param {HTMLElement} el - The target element
 * @param {string} spanClass - Class to apply to each span
 * @returns {NodeListOf<Element>} All generated span elements
 */
export function wrapLettersIfNeeded(el, spanClass = 'ca__gsap-letter') {
    if (!el.hasAttribute('ca__letter')) return el.childNodes;

    const text = el.textContent.trim();

    el.innerHTML = text
        .split('')
        .map((char) =>
            char === ' ' ? ' ' : `<span class="${spanClass}">${char}</span>`,
        )
        .join('');

    return el.querySelectorAll(`.${spanClass}`);
}
