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
            animation-duration: 1s;
            animation-fill-mode: both;
        }
    `;
  document.head.appendChild(style);

  // Expose initLetterAnimations globally
  // This makes it callable from your custom script (index.html)
  window.CSSAnimationLetter = window.CSSAnimationLetter || {}; // Ensure it exists
  window.CSSAnimationLetter.init = initLetterAnimations; // Assign the function

  window.addEventListener('DOMContentLoaded', () => {
    initLetterAnimations(); // Initial call on DOMContentLoaded
  });

  // Main initialization function for letter animations
  function initLetterAnimations() {
    // Re-run animation functions for all relevant elements
    animateLetters('ca__lt-sequence', 'sequence');
    animateLetters('ca__lt-random', 'random');
    animateLetters('ca__lt-reverse', 'reverse');
    animateWords();
    animateLines();
  }

  function animateLetters(attrName, animationType) {
    // Only process elements that are part of .cssanimation for text effects
    document.querySelectorAll(`.cssanimation[${attrName}]`).forEach((el) => {
      // Store original content if not already stored, to allow re-processing
      if (!el._originalTextContent) {
        el._originalTextContent = el.textContent;
      } else {
        // Reset to original content before re-processing to prevent nested spans
        el.textContent = el._originalTextContent;
      }

      const delayAttr = el.getAttribute('ca__lt-delay') || '100';
      const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);
      const classList = (el.getAttribute(attrName) || 'ca__lt-letter').trim().split(/\s+/);
      const animated = processTextNodes(el, animationType, delaySteps, classList);
      el.innerHTML = animated.join('');
    });
  }

  function animateWords() {
    document.querySelectorAll('.cssanimation[ca__lt-word]').forEach((el) => {
      // Store original content if not already stored, to allow re-processing
      if (!el._originalTextContent) {
        el._originalTextContent = el.textContent;
      } else {
        el.textContent = el._originalTextContent;
      }

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
    document.querySelectorAll('.cssanimation[ca__lt-line]').forEach((el) => {
      // Store original content if not already stored, to allow re-processing
      if (!el._originalTextContent) {
        el._originalTextContent = el.textContent;
      } else {
        el.textContent = el._originalTextContent;
      }

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
        // Handle child elements (like <b>, <i> inside the animated text)
        const wrapper = document.createElement(child.tagName);
        for (const attr of child.attributes) {
          wrapper.setAttribute(attr.name, attr.value);
        }
        // Recursively process text nodes within the child element
        wrapper.innerHTML = processTextNodes(child, animationType, delaySteps, classList).join('');
        result.push(wrapper.outerHTML);
      }
    });

    const spans = chars.map((char, index) => {
      if (char !== ' ') {
        const className = classList[index % classList.length] || classList[classList.length - 1]; // Use modulo for class list
        const delay =
          delaySteps[index % delaySteps.length] != null
            ? delaySteps[index % delaySteps.length]
            : delaySteps[delaySteps.length - 1];
        return `<span class="ca__lt-letter ${className}" style="
                        animation-delay:${delay * index}ms;
                        -moz-animation-delay:${delay * index}ms;
                        -webkit-animation-delay:${delay * index}ms;
                    ">${char}</span>`;
      }
      return ' '; // Preserve spaces outside of spans
    });

    if (animationType === 'random') {
      const nonSpaceSpans = spans.filter((s) => s.trim() !== ''); // Only shuffle actual animated spans
      const spaceSpans = spans.filter((s) => s.trim() === '');

      const indices = nonSpaceSpans.map((_, i) => i);
      shuffle(indices);

      const randomizedAnimatedSpans = Array(nonSpaceSpans.length).fill('');
      indices.forEach((originalIndex, newSequentialIndex) => {
        randomizedAnimatedSpans[originalIndex] = nonSpaceSpans[originalIndex].replace(
          /animation-delay:\d+ms/g,
          `animation-delay:${delaySteps[delaySteps.length - 1] * newSequentialIndex}ms`,
        );
      });

      // Reconstruct the full string including spaces in their original positions
      let currentNonSpaceIndex = 0;
      let finalResult = [];
      for (const s of spans) {
        if (s.trim() !== '') {
          finalResult.push(randomizedAnimatedSpans[currentNonSpaceIndex]);
          currentNonSpaceIndex++;
        } else {
          finalResult.push(s); // Add space back
        }
      }
      result.push(finalResult.join(''));
    } else if (animationType === 'reverse') {
      const nonSpaceSpans = spans.filter((s) => s.trim() !== '');
      const numAnimated = nonSpaceSpans.length;

      const reversedAnimatedSpans = nonSpaceSpans.map((span, i) =>
        span.replace(
          /animation-delay:\d+ms/g,
          `animation-delay:${delaySteps[delaySteps.length - 1] * (numAnimated - 1 - i)}ms`,
        ),
      );

      let currentNonSpaceIndex = 0;
      let finalResult = [];
      for (const s of spans) {
        if (s.trim() !== '') {
          finalResult.push(reversedAnimatedSpans[currentNonSpaceIndex]);
          currentNonSpaceIndex++;
        } else {
          finalResult.push(s);
        }
      }
      result.push(finalResult.join(''));
    } else {
      // sequence
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
    const originalText = text; // Keep original text for splitting

    if (type === 'word') {
      units = originalText.split(/(\s+)/); // Capture spaces to re-insert them
    } else if (type === 'line') {
      if (lineSeparator === 'dot') {
        // Split by capturing the dot to preserve it in the array
        const rawParts = originalText.split(/(\.)/);
        const finalUnits = [];
        for (let i = 0; i < rawParts.length; i++) {
          let part = rawParts[i].trim(); // Trim parts for cleaner logic

          if (part === '') continue; // Skip empty parts from split (e.g., "word." -> ["word", ".", ""])

          // If the current part is text and the next is a dot, combine them
          if (part !== '.' && i + 1 < rawParts.length && rawParts[i + 1] === '.') {
            finalUnits.push(part + '.');
            i++; // Skip the next dot as it's been consumed
          } else if (part !== '.') {
            // It's a text part without a following dot
            finalUnits.push(part);
          }
          // If 'part' is '.', it's a standalone dot that shouldn't be animated as a separate unit
          // unless it's the *only* content. Assuming units are meaningful segments.
        }
        units = finalUnits;
      } else {
        // Default line break
        units = originalText.split(/(\n|<br\s*\/?>)/); // Split by newline or <br>, capture to retain
      }
    }

    let animatedContent = [];
    let classAndDelayIndex = 0;
    let animationOffset = 0; // Cumulative delay for sequential animations

    units.forEach((unit) => {
      // Skip whitespace or empty captured separators if they are not meant to be animated units
      if (!unit.trim() && unit !== '\n' && !/<br\s*\/?>/.test(unit)) {
        animatedContent.push(unit); // Add back un-animated spaces/empty strings
        return;
      }
      // If it's a line break, push it as is, not wrapped in a span
      if (unit === '\n' || /<br\s*\/?>/.test(unit)) {
        animatedContent.push(unit);
        return;
      }

      const className = classList[classAndDelayIndex % classList.length] || classList[classList.length - 1];

      const currentUnitSpecificDelay =
        delaySteps[classAndDelayIndex % delaySteps.length] != null
          ? delaySteps[classAndDelayIndex % delaySteps.length]
          : delaySteps[delaySteps.length - 1];

      const finalAnimationDelay = animationOffset + currentUnitSpecificDelay;

      // Add appropriate class for words/lines
      const spanClass = type === 'word' ? 'ca__lt-word' : 'ca__lt-line';

      const output = `<span class="${spanClass} ${className}" style="
                        animation-delay:${finalAnimationDelay}ms;
                        -moz-animation-delay:${finalAnimationDelay}ms;
                        -webkit-animation-delay:${finalAnimationDelay}ms;
                    ">${unit}</span>`;

      animatedContent.push(output);

      animationOffset = finalAnimationDelay + baseDuration; // Accumulate delay for next unit

      classAndDelayIndex++; // Move to next class/delay in sequence
    });

    return animatedContent.join('');
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
})();
