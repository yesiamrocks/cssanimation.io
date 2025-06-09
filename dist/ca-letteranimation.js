/*!
 * ca-letteranimation.js - Letter, word, and line animation enhancements
 * Part of: https://cssanimation.io/
 * Version: 5.1.1
 *
 * Author: Shafayetul Islam Pavel
 * LinkedIn: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * GitHub: https://github.com/yesiamrocks/cssanimation.io
 *
 * Title: A lightweight, CSS-only enhancement script for text animations.
 * Description: Provides dynamic letter-by-letter, word-by-word, and line-by-line animation
 * capabilities, enhancing HTML elements with customizable text effects via HTML attributes.
 *
 * © 2025 Shafayetul Islam Pavel – All rights reserved.
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  (function () {
    if (typeof window === 'undefined') return;

    // --- Utility Function to get Computed Animation Duration ---
    function getCssAnimationDuration(element, className) {
      if (!element || !className) return null;

      const tempEl = document.createElement('span');
      tempEl.style.visibility = 'hidden';
      tempEl.style.position = 'absolute';
      tempEl.className = className;
      document.body.appendChild(tempEl);

      const computedStyle = window.getComputedStyle(tempEl);
      let duration = computedStyle.getPropertyValue('animation-duration');

      document.body.removeChild(tempEl);

      if (duration) {
        duration = duration.trim();
        if (duration.endsWith('ms')) {
          return parseFloat(duration);
        } else if (duration.endsWith('s')) {
          return parseFloat(duration) * 1000;
        }
      }
      return null;
    }
    // --- End Utility Function ---

    // --- Utility Function to get a single number from an attribute ---
    function getSingleNumberAttribute(attrValue) {
      if (attrValue) {
        const num = Number(attrValue.trim());
        if (!isNaN(num)) {
          return num;
        }
      }
      return null; // Return null if not a valid number
    }
    // --- End Utility Function ---

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
        const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);
        const classList = (el.getAttribute(attrName) || 'ca__lt-letter').trim().split(/\s+/);
        const animated = processTextNodes(el, animationType, delaySteps, classList);
        el.innerHTML = animated.join('');
      });
    }

    function animateWords() {
      document.querySelectorAll('[ca__lt-word]').forEach((el) => {
        const delayAttr = el.getAttribute('ca__lt-delay') || '100';
        const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);

        const classList = (el.getAttribute('ca__lt-word') || 'ca__lt-word').trim().split(/\s+/);

        let baseDuration = getSingleNumberAttribute(el.getAttribute('ca__lt-base-duration'));

        if (baseDuration === null && classList.length > 0) {
          const firstClassName = classList[0];
          const detectedDuration = getCssAnimationDuration(el, firstClassName);
          if (detectedDuration !== null) {
            baseDuration = detectedDuration;
          }
        }

        if (baseDuration === null) {
          baseDuration = 1000; // Default if nothing else is found
        }

        el.innerHTML = processSequentialBy('word', el.textContent, delaySteps, classList, baseDuration);
      });
    }

    function animateLines() {
      document.querySelectorAll('[ca__lt-line]').forEach((el) => {
        const delayAttr = el.getAttribute('ca__lt-delay') || '150';
        const delaySteps = parseMultiValueDelaySteps(delayAttr, 150);

        const classList = (el.getAttribute('ca__lt-line') || 'ca__lt-line').trim().split(/\s+/);
        const lineSeparator = el.getAttribute('ca__lt-separator') === 'dot' ? 'dot' : 'br';

        let baseDuration = getSingleNumberAttribute(el.getAttribute('ca__lt-base-duration'));

        if (baseDuration === null && classList.length > 0) {
          const firstClassName = classList[0];
          const detectedDuration = getCssAnimationDuration(el, firstClassName);
          if (detectedDuration !== null) {
            baseDuration = detectedDuration;
          }
        }

        if (baseDuration === null) {
          baseDuration = 1000; // Default if nothing else is found
        }

        el.innerHTML = processSequentialBy('line', el.textContent, delaySteps, classList, baseDuration, lineSeparator);
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
          wrapper.innerHTML = processTextNodes(child, animationType, delaySteps, classList).join('');
          result.push(wrapper.outerHTML);
        }
      });

      const spans = chars.map((char, index) => {
        if (char !== ' ') {
          const className = classList[index] || classList[classList.length - 1];
          const delay = delaySteps[index] != null ? delaySteps[index] : delaySteps[delaySteps.length - 1];
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

    function parseMultiValueDelaySteps(delayAttr, defaultValue) {
      if (!delayAttr) {
        return [defaultValue];
      }
      const parsed = delayAttr
        .trim()
        .split(/\s+/)
        .map((x) => {
          const num = Number(x);
          return isNaN(num) ? defaultValue : num;
        });
      return parsed.length > 0 ? parsed : [defaultValue];
    }

    function processSequentialBy(type, text, delaySteps, classList, baseDuration, lineSeparator = 'br') {
      let units = [];

      if (type === 'word') {
        units = text.split(/(\s+)/);
      } else if (type === 'line') {
        if (lineSeparator === 'dot') {
          // FIX: Smarter splitting and re-assembly for dot separator
          // Split by capturing the dot to preserve it in the array
          const rawParts = text.split(/(\.)/);
          const finalUnits = [];
          for (let i = 0; i < rawParts.length; i++) {
            let part = rawParts[i];

            // Skip empty parts that result from splitting (e.g., if text ends with a dot)
            if (part === '') continue;

            // If the current part is a text segment and the next part is a dot, combine them
            if (part !== '.' && i + 1 < rawParts.length && rawParts[i + 1] === '.') {
              finalUnits.push(part + '.');
              i++; // Increment 'i' to consume the dot part that was just combined
            } else if (part !== '.') {
              // It's a text part without a following dot
              finalUnits.push(part);
            }
            // If 'part' is '.' and it wasn't combined, it's a standalone dot that should be skipped.
            // The 'part !== '.' ' check handles this by only pushing non-dot parts.
          }
          units = finalUnits;
        } else {
          units = text.split(/(\n|<br\s*\/?>)/);
        }
      }

      let classAndDelayIndex = 0;
      let animationOffset = 0;

      return units
        .map((unit) => {
          if (!unit.trim()) {
            return unit;
          }

          const className = classList[classAndDelayIndex] || classList[classList.length - 1];

          const currentUnitSpecificDelay =
            delaySteps[classAndDelayIndex] != null ? delaySteps[classAndDelayIndex] : delaySteps[delaySteps.length - 1];

          const finalAnimationDelay = animationOffset + currentUnitSpecificDelay;

          const output = `<span class="${className}" style="
                    animation-delay:${finalAnimationDelay}ms;
                    -moz-animation-delay:${finalAnimationDelay}ms;
                    -webkit-animation-delay:${finalAnimationDelay}ms;
                ">${unit}</span>`;

          animationOffset = finalAnimationDelay + baseDuration;

          classAndDelayIndex++;

          return output;
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

}));
