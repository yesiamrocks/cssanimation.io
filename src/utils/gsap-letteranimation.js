/**
 * Wraps each character of the element’s textContent in a span
 * for GSAP-based letter animations based on ca__gx-lt mode.
 *
 * Supported modes:
 * - ca__gx-lt="sequence"
 * - ca__gx-lt="reverse"
 * - ca__gx-lt="random"
 *
 * @param {HTMLElement} el - Target element
 * @param {string} spanClass - Class to apply to each span
 * @returns {Element[]} - Array of span-wrapped letters in the correct animation order
 */
export function wrapLettersIfNeeded(el, spanClass = 'ca__gsap-letter') {
    const mode = el.getAttribute('ca__gx-lt'); // sequence | reverse | random
    if (!mode) return el.childNodes;

    injectLetterCSS(spanClass); // inject CSS rule once

    const text = el.textContent.trim();
    const chars = [...text];

    el.innerHTML = chars
        .map((char) =>
            char === ' ' ? ' ' : `<span class="${spanClass}">${char}</span>`,
        )
        .join('');

    const spans = el.querySelectorAll(`.${spanClass}`);

    applyAnimationHints(spans); // apply inline GPU-friendly styles

    switch (mode) {
        case 'random':
            return shuffleNodeList(spans);
        case 'reverse':
            return Array.from(spans).reverse();
        default:
            return Array.from(spans); // "sequence"
    }
}

/**
 * Shuffles a NodeList and returns a shuffled array of elements
 */
function shuffleNodeList(nodeList) {
    const array = Array.from(nodeList);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Injects required layout CSS rule (only once)
 */
function injectLetterCSS(spanClass) {
    const styleId = '__ca__gsap_letter_style__';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
    .${spanClass} {
      display: inline-block;
    }
  `;
    document.head.appendChild(style);
}

/**
 * Apply inline animation performance styles to each span
 */
function applyAnimationHints(spans) {
    spans.forEach((el) => {
        el.style.willChange = 'transform, opacity';
        el.style.backfaceVisibility = 'hidden';
        el.style.transformStyle = 'preserve-3d';
    });
}

/**
 * Optional helper: cleanup styles after animation completes
 */
export function removeLetterAnimationHints(spans) {
    spans.forEach((el) => {
        el.style.willChange = 'auto';
        el.style.backfaceVisibility = '';
        el.style.transformStyle = '';
    });
}
