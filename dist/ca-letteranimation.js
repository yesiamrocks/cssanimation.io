/**
 * ca-letteranimation.js - Letter-by-letter animation enhancements
 * Part of cssanimation.io
 * Version: 2.1.0
 * Author: Shafayetul Islam Pavel
 * Find me at: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * Github: https://github.com/yesiamrocks/cssanimation.io
 * Title: A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.
 * Description: Applies letter-by-letter CSS animations to text.
 * cssanimation.io Copyright © 2025 Shafayetul Islam Pavel
 **/

window.addEventListener('DOMContentLoaded', () => {
    animateSequence();
    animateRandom();
});
/**
 * ca-letteranimation.js
 * Part of cssanimation.io
 * Version: 2.2.0
 * Author: Shafayetul Islam Pavel
 * Description: Applies letter-by-letter CSS animations to text,
 * while preserving inner HTML elements like icons or spans.
 */

window.addEventListener('DOMContentLoaded', () => {
    // Trigger animations when the DOM is fully loaded
    animateSequence();
    animateRandom();
});

/**
 * Recursively processes child nodes of an element.
 * Wraps text characters in span tags with animation delay.
 * Skips and preserves HTML elements like <span> or <i>.
 *
 * @param {Node} node - DOM node to process
 * @param {string} animationType - 'sequence' or 'random'
 * @returns {string[]} - Array of HTML strings with animation spans
 */
function processTextNodes(node, animationType) {
    // Initial delay for animations
    let delay = animationType === 'sequence' ? 100 : 70;
    const result = [];

    node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
            // If the node is a raw text node (not an HTML element)
            const text = child.textContent;
            const chars = [...text];

            if (animationType === 'random') {
                // Shuffle animation delay for random type
                const indices = chars.map((_, i) => i);
                shuffle(indices);
                const randomized = Array(chars.length).fill('');

                indices.forEach((i) => {
                    if (chars[i] !== ' ') {
                        randomized[i] = createAnimatedSpan(chars[i], delay);
                        delay += 80;
                    } else {
                        randomized[i] = ' ';
                    }
                });

                result.push(randomized.join(''));
            } else {
                // Sequential animation with increasing delay
                const sequenced = chars.map((char) => {
                    if (char !== ' ') {
                        const span = createAnimatedSpan(char, delay);
                        delay += 150;
                        return span;
                    }
                    return ' ';
                });
                result.push(sequenced.join(''));
            }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            // If the node is an HTML element (e.g., <span>, <i>, etc.)
            // We preserve it but process its children recursively
            const wrapper = document.createElement(child.tagName);

            // Copy all attributes from the original element
            for (const attr of child.attributes) {
                wrapper.setAttribute(attr.name, attr.value);
            }

            // Recursively process inner content
            wrapper.innerHTML = processTextNodes(child, animationType).join('');
            result.push(wrapper.outerHTML);
        }
    });

    return result;
}

/**
 * Animate text using sequential delays per character
 * Targets elements with class 'ca__sequence'
 */
function animateSequence() {
    document.querySelectorAll('.ca__sequence').forEach((el) => {
        const animated = processTextNodes(el, 'sequence');
        el.innerHTML = animated.join('');
    });
}

/**
 * Animate text using random delays per character
 * Targets elements with class 'ca__random'
 */
function animateRandom() {
    document.querySelectorAll('.ca__random').forEach((el) => {
        const animated = processTextNodes(el, 'random');
        el.innerHTML = animated.join('');
    });
}

/**
 * Wraps a character in a span with inline animation delay styles
 *
 * @param {string} char - The character to animate
 * @param {number} delay - The delay in milliseconds
 * @returns {string} - HTML span element as string
 */
function createAnimatedSpan(char, delay) {
    return `<span style="
        animation-delay:${delay}ms;
        -moz-animation-delay:${delay}ms;
        -webkit-animation-delay:${delay}ms;
    ">${char}</span>`;
}

/**
 * Shuffles an array in-place using Fisher-Yates algorithm
 *
 * @param {Array} array - The array to shuffle
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
