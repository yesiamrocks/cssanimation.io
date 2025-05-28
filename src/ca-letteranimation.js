/**
 * ca-letteranimation.js - Letter-by-letter animation enhancements
 * Part of cssanimation.io
 * Version: 3.1.2
 * Author: Shafayetul Islam Pavel
 * Find me at: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * Github: https://github.com/yesiamrocks/cssanimation.io
 * Title: A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.
 * Description: Applies letter-by-letter CSS animations to text.
 * cssanimation.io Copyright © 2025 Shafayetul Islam Pavel
 **/

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
function processTextNodes(node, animationType, delayStep) {
    let delay = animationType === 'sequence' ? 100 : 70;
    const result = [];

    node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent;
            const chars = [...text];

            if (animationType === 'random') {
                const indices = chars.map((_, i) => i);
                shuffle(indices);
                const randomized = Array(chars.length).fill('');

                indices.forEach((i) => {
                    if (chars[i] !== ' ') {
                        randomized[i] = createAnimatedSpan(chars[i], delay);
                        delay += delayStep;
                    } else {
                        randomized[i] = ' ';
                    }
                });

                result.push(randomized.join(''));
            } else {
                const sequenced = chars.map((char) => {
                    if (char !== ' ') {
                        const span = createAnimatedSpan(char, delay);
                        delay += delayStep;
                        return span;
                    }
                    return ' ';
                });
                result.push(sequenced.join(''));
            }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            const wrapper = document.createElement(child.tagName);
            for (const attr of child.attributes) {
                wrapper.setAttribute(attr.name, attr.value);
            }
            wrapper.innerHTML = processTextNodes(
                child,
                animationType,
                delayStep,
            ).join('');
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
    document.querySelectorAll('.ca__lt-sequence').forEach((el) => {
        const delayStep = parseInt(el.getAttribute('ca__lt-delay')) || 150;
        const animated = processTextNodes(el, 'sequence', delayStep);
        el.innerHTML = animated.join('');
    });
}

/**
 * Animate text using random delays per character
 * Targets elements with class 'ca__random'
 */
function animateRandom() {
    document.querySelectorAll('.ca__lt-random').forEach((el) => {
        const delayStep = parseInt(el.getAttribute('ca__lt-delay')) || 80;
        const animated = processTextNodes(el, 'random', delayStep);
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
