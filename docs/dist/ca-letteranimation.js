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
            animation-duration: 1s; /* Ensure a default duration */
            animation-fill-mode: both; /* Ensure elements stay in final state */
        }
    `;
  document.head.appendChild(style);

  // Expose the re-initialization function globally for specific elements
  window.CSSAnimationLetter = window.CSSAnimationLetter || {};
  window.CSSAnimationLetter.reinit = reinitSingleElement; // Our new exposed function

  window.addEventListener('DOMContentLoaded', () => {
    // Initial setup on DOMContentLoaded
    document
      .querySelectorAll(
        '.cssanimation[ca__lt-sequence], .cssanimation[ca__lt-random], .cssanimation[ca__lt-reverse], .cssanimation[ca__lt-word], .cssanimation[ca__lt-line]',
      )
      .forEach((el) => reinitSingleElement(el)); // Initialize all recognized elements
  });

  // Function to reinitialize a single element
  function reinitSingleElement(el) {
    if (!el || !el.classList.contains('cssanimation')) {
      console.warn('CSSAnimationLetter.reinit called on non-cssanimation element or invalid element.', el);
      return;
    }

    // Capture the original text content (this is key for re-processing)
    // If it's already set by our preview generator, use that.
    // Otherwise, capture its current text content.
    const originalText = el._originalTextContent || el.textContent;
    el._originalTextContent = originalText; // Ensure it's stored for future reinit calls

    // Clear existing inner HTML to remove old spans before re-processing
    el.innerHTML = '';
    // Re-set the textContent to allow the processing functions to work cleanly
    el.textContent = originalText;

    // Determine which animation type attribute is present
    let animationTypeAttr = null;
    let animationTypeName = null;

    if (el.hasAttribute('ca__lt-sequence')) {
      animationTypeAttr = el.getAttribute('ca__lt-sequence');
      animationTypeName = 'sequence';
    } else if (el.hasAttribute('ca__lt-random')) {
      animationTypeAttr = el.getAttribute('ca__lt-random');
      animationTypeName = 'random';
    } else if (el.hasAttribute('ca__lt-reverse')) {
      animationTypeAttr = el.getAttribute('ca__lt-reverse');
      animationTypeName = 'reverse';
    } else if (el.hasAttribute('ca__lt-word')) {
      animationTypeAttr = el.getAttribute('ca__lt-word');
      animationTypeName = 'word';
    } else if (el.hasAttribute('ca__lt-line')) {
      animationTypeAttr = el.getAttribute('ca__lt-line');
      animationTypeName = 'line';
    } else {
      console.warn('CSSAnimationLetter: Element has .cssanimation but no ca__lt-* animation type attribute.', el);
      return; // No animation type specified
    }

    // Parse common attributes
    const delayAttr = el.getAttribute('ca__lt-delay') || '100';
    const delaySteps = parseMultiValueDelaySteps(delayAttr, 100);
    const classList = (animationTypeAttr || '').trim().split(/\s+/).filter(Boolean); // Filter out empty strings

    if (classList.length === 0) {
      // Fallback if no classes are provided
      console.warn("CSSAnimationLetter: No animation classes found for element. Using 'ca__fx-FadeIn'.", el);
      classList.push('ca__fx-FadeIn');
    }

    let baseDuration = getSingleNumberAttribute(el.getAttribute('ca__lt-base-duration'));
    if (baseDuration === null) {
      const detectedDuration = getCssAnimationDuration(el, classList[0]);
      if (detectedDuration !== null) {
        baseDuration = detectedDuration;
      } else {
        baseDuration = 1000; // Default if nothing else is found
      }
    }

    // Trigger the appropriate processing function
    let animatedHtml = '';
    if (['sequence', 'random', 'reverse'].includes(animationTypeName)) {
      animatedHtml = processTextNodes(el, animationTypeName, delaySteps, classList).join('');
    } else if (animationTypeName === 'word') {
      animatedHtml = processSequentialBy('word', originalText, delaySteps, classList, baseDuration);
    } else if (animationTypeName === 'line') {
      const lineSeparator = el.getAttribute('ca__lt-separator') === 'dot' ? 'dot' : 'br';
      animatedHtml = processSequentialBy('line', originalText, delaySteps, classList, baseDuration, lineSeparator);
    }

    el.innerHTML = animatedHtml;
  }

  // --- The original processing functions (no changes here, they are called by reinitSingleElement) ---

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
        const className = classList[index % classList.length] || classList[classList.length - 1];
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
      return ' ';
    });

    if (animationType === 'random') {
      const nonSpaceSpans = spans.filter((s) => s.trim() !== '');
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

      let currentNonSpaceIndex = 0;
      let finalResult = [];
      for (const s of spans) {
        if (s.trim() !== '') {
          finalResult.push(randomizedAnimatedSpans[currentNonSpaceIndex]);
          currentNonSpaceIndex++;
        } else {
          finalResult.push(s);
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
    const originalText = text;

    if (type === 'word') {
      units = originalText.split(/(\s+)/);
    } else if (type === 'line') {
      if (lineSeparator === 'dot') {
        const rawParts = originalText.split(/(\.)/);
        const finalUnits = [];
        for (let i = 0; i < rawParts.length; i++) {
          let part = rawParts[i].trim();

          if (part === '') continue;

          if (part !== '.' && i + 1 < rawParts.length && rawParts[i + 1] === '.') {
            finalUnits.push(part + '.');
            i++;
          } else if (part !== '.') {
            finalUnits.push(part);
          }
        }
        units = finalUnits;
      } else {
        units = originalText.split(/(\n|<br\s*\/?>)/);
      }
    }

    let animatedContent = [];
    let classAndDelayIndex = 0;
    let animationOffset = 0;

    units.forEach((unit) => {
      if (!unit.trim() && unit !== '\n' && !/<br\s*\/?>/.test(unit)) {
        animatedContent.push(unit);
        return;
      }
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

      const spanClass = type === 'word' ? 'ca__lt-word' : 'ca__lt-line';

      const output = `<span class="${spanClass} ${className}" style="
                        animation-delay:${finalAnimationDelay}ms;
                        -moz-animation-delay:${finalAnimationDelay}ms;
                        -webkit-animation-delay:${finalAnimationDelay}ms;
                    ">${unit}</span>`;

      animatedContent.push(output);

      animationOffset = finalAnimationDelay + baseDuration;

      classAndDelayIndex++;
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
