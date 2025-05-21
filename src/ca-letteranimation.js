/**
 * ca-letteranimation.js - Letter-by-letter animation enhancements
 * Part of cssanimation.io
 * Version: 2.0.5
 * Author: Shafayetul Islam Pavel
 * Find me at: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * Github: https://github.com/yesiamrocks/cssanimation.io
 * Title: A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.
 * Description: Handles sequence-based and randomized letter-by-letter animations with span-wrapping and timed delays.
 * cssanimation.io Copyright © 2025 Shafayetul Islam Pavel
 **/

window.addEventListener('DOMContentLoaded', () => {
    animateSequence();
    animateRandom();
});

function animateSequence() {
    const elements = document.querySelectorAll('.sequence');

    elements.forEach((el) => {
        const text = el.textContent.trim();
        let delay = 100;

        const animated = [...text].map((char) => {
            if (char !== ' ') {
                const span = createAnimatedSpan(char, delay);
                delay += 150;
                return span;
            }
            return char;
        });

        el.innerHTML = animated.join('');
    });
}

function animateRandom() {
    const elements = document.querySelectorAll('.random');

    elements.forEach((el) => {
        const text = el.textContent.trim();
        let delay = 70;

        const indices = [...Array(text.length).keys()];
        shuffle(indices);

        const result = Array(text.length).fill('');

        indices.forEach((i) => {
            if (text[i] !== ' ') {
                result[i] = createAnimatedSpan(text[i], delay);
                delay += 80;
            } else {
                result[i] = text[i];
            }
        });

        el.innerHTML = result.join('');
    });
}

function createAnimatedSpan(char, delay) {
    return `<span style="
    animation-delay:${delay}ms;
    -moz-animation-delay:${delay}ms;
    -webkit-animation-delay:${delay}ms;
  ">${char}</span>`;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
