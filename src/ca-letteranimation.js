/**
 * ca-letteranimation.js - Letter, word, and line animation enhancements
 * Part of cssanimation.io (CSS-only version)
 * Version: 4.4.1
 * Author: Shafayetul Islam Pavel
 * Description: Applies letter-by-letter, word-by-word, and line-by-line CSS animations to text.
 */

(function () {
    if (typeof window === 'undefined') return;

    // Inject fallback styles for animated spans
    const style = document.createElement('style');
    style.textContent = `
        .ca__lt-letter, .ca__lt-word, .ca__lt-line {
            display: inline-block;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('DOMContentLoaded', () => {
        initLetterAnimations();
    });

    function initLetterAnimations() {
        animateLetters('ca__lt-sequence', 'sequence');
        animateLetters('ca__lt-random', 'random');
        animateLetters('ca__lt-reverse', 'reverse');
        animateWords();
        animateLines();
    }

    function animateLetters(attrName, animationType) {
        document.querySelectorAll(`[${attrName}]`).forEach((el) => {
            const delayAttr = el.getAttribute('ca__lt-delay') || '100';
            const delaySteps = delayAttr.trim().split(/\s+/).map(Number);
            const classList = (el.getAttribute(attrName) || 'ca__lt-letter')
                .trim()
                .split(/\s+/);
            const animated = processTextNodes(
                el,
                animationType,
                delaySteps,
                classList,
            );
            el.innerHTML = animated.join('');
        });
    }

    function animateWords() {
        document.querySelectorAll('[ca__lt-word]').forEach((el) => {
            const delayAttr = el.getAttribute('ca__lt-delay') || '120';
            const delaySteps = delayAttr.trim().split(/\s+/).map(Number);
            const classList = (el.getAttribute('ca__lt-word') || 'ca__lt-word')
                .trim()
                .split(/\s+/);
            el.innerHTML = processTextBy(
                'word',
                el.textContent,
                delaySteps,
                classList,
            );
        });
    }

    function animateLines() {
        document.querySelectorAll('[ca__lt-line]').forEach((el) => {
            const delayAttr = el.getAttribute('ca__lt-delay') || '150';
            const delaySteps = delayAttr.trim().split(/\s+/).map(Number);
            const classList = (el.getAttribute('ca__lt-line') || 'ca__lt-line')
                .trim()
                .split(/\s+/);
            const lineSeparator =
                el.getAttribute('ca__lt-separator') === 'dot' ? 'dot' : 'br';
            el.innerHTML = processTextBy(
                'line',
                el.textContent,
                delaySteps,
                classList,
                lineSeparator,
            );
        });
    }

    function processTextNodes(node, animationType, delaySteps, classList) {
        const result = [];
        const chars = [];

        node.childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                chars.push(...child.textContent);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const wrapper = document.createElement(child.tagName);
                for (const attr of child.attributes) {
                    wrapper.setAttribute(attr.name, attr.value);
                }
                wrapper.innerHTML = processTextNodes(
                    child,
                    animationType,
                    delaySteps,
                    classList,
                ).join('');
                result.push(wrapper.outerHTML);
            }
        });

        const total = chars.length;
        const spans = chars.map((char, index) => {
            if (char !== ' ') {
                const className =
                    classList[index] || classList[classList.length - 1];
                const delay =
                    delaySteps[index] != null
                        ? delaySteps[index]
                        : delaySteps[delaySteps.length - 1];
                return `<span class="${className}" style="
                    animation-delay:${delay * index}ms;
                    -moz-animation-delay:${delay * index}ms;
                    -webkit-animation-delay:${delay * index}ms;
                ">${char}</span>`;
            }
            return ' ';
        });

        if (animationType === 'random') {
            const indices = spans.map((_, i) => i);
            shuffle(indices);
            const randomized = Array(spans.length).fill('');
            indices.forEach((i, idx) => {
                randomized[i] = spans[i].replace(
                    /animation-delay:\d+ms/g,
                    `animation-delay:${delaySteps[delaySteps.length - 1] * idx}ms`,
                );
            });
            result.push(randomized.join(''));
        } else if (animationType === 'reverse') {
            result.push(
                spans
                    .map((span, i, arr) =>
                        span.replace(
                            /animation-delay:\d+ms/g,
                            `animation-delay:${delaySteps[delaySteps.length - 1] * (arr.length - 1 - i)}ms`,
                        ),
                    )
                    .join(''),
            );
        } else {
            result.push(spans.join(''));
        }

        return result;
    }

    function processTextBy(
        type,
        text,
        delaySteps,
        classList,
        lineSeparator = 'br',
    ) {
        let units = [];

        if (type === 'word') {
            units = text.split(/(\s+)/);
        } else if (type === 'line') {
            units =
                lineSeparator === 'dot'
                    ? text.split(/\./).map((s) => s + '.')
                    : text.split(/(\n|<br\s*\/?>)/);
        }

        return units
            .map((unit, index) => {
                if (!unit.trim()) return unit;
                const className =
                    classList[index] || classList[classList.length - 1];
                const delay =
                    delaySteps[index] != null
                        ? delaySteps[index]
                        : delaySteps[delaySteps.length - 1];
                return `<span class="${className}" style="
                animation-delay:${delay * index}ms;
                -moz-animation-delay:${delay * index}ms;
                -webkit-animation-delay:${delay * index}ms;
            ">${unit}</span>`;
            })
            .join('');
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
})();
