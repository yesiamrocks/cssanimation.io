/*!
 * ca-trigger.js
 * Title: Trigger-based animation control for HTML elements
 * Description: Enables animations on user interactions like click, hover, focus, blur using HTML attributes.
 * Part of: https://cssanimation.io/
 * Version: 6.9.0
 *
 * Author: Shafayetul Islam Pavel
 * LinkedIn: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * GitHub: https://github.com/yesiamrocks/cssanimation
 *
 * © 2025 Shafayetul Islam Pavel – All rights reserved.
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  (function () {
    function applyAnimation(el, animationClass, reset = false, delay, duration) {
      if (window.__CA_TRIGGER_DISABLED) return;

      if (delay) el.style.animationDelay = delay;
      if (duration) el.style.animationDuration = duration;

      const classList = animationClass.split(' ').filter(Boolean);
      classList.forEach((cls) => el.classList.add(cls));

      if (reset) {
        const onAnimationEnd = () => {
          classList.forEach((cls) => el.classList.remove(cls));
          el.style.animationDelay = '';
          el.style.animationDuration = '';
          el.removeEventListener('animationend', onAnimationEnd);
        };
        el.addEventListener('animationend', onAnimationEnd);
      }
    }

    function matchesKeyFilter(keyFilter, event) {
      const rules = keyFilter.split(',').map((k) => k.trim().toLowerCase());
      return rules.some((rule) => {
        if (rule.includes('+')) {
          const [mod, key] = rule.split('+');
          const match =
            key === event.key.toLowerCase() &&
            ((mod === 'ctrl' && event.ctrlKey) || (mod === 'shift' && event.shiftKey) || (mod === 'alt' && event.altKey));
          if (window.__CA_DEBUG)
            console.log(`[ca-trigger] modifier match: ${match}, rule: ${rule}, event.key: ${event.key}`);
          return match;
        } else if (rule.endsWith('*')) {
          const prefix = rule.replace('*', '');
          const match = event.key.toLowerCase().startsWith(prefix);
          if (window.__CA_DEBUG)
            console.log(`[ca-trigger] wildcard match: ${match}, rule: ${rule}, event.key: ${event.key}`);
          return match;
        } else {
          const match = rule === event.key.toLowerCase();
          if (window.__CA_DEBUG)
            console.log(`[ca-trigger] exact match: ${match}, rule: ${rule}, event.key: ${event.key}`);
          return match;
        }
      });
    }

    function initTriggerAnimations() {
      const elements = document.querySelectorAll('[data-ca-trigger]');

      elements.forEach((el) => {
        const triggers = el
          .getAttribute('data-ca-trigger')
          .split(',')
          .map((t) => t.trim());
        const animationClass = el.getAttribute('data-ca-class');
        const reset = el.getAttribute('data-ca-reset') === 'true';
        const delay = el.getAttribute('data-ca-delay');
        const duration = el.getAttribute('data-ca-duration');
        const keyFilter = el.getAttribute('data-ca-key');

        if (!animationClass) return;

        triggers.forEach((trigger) => {
          el.addEventListener(trigger, (event) => {
            if ((trigger === 'keydown' || trigger === 'keyup') && keyFilter) {
              if (!matchesKeyFilter(keyFilter, event)) return;
            }

            if (window.__CA_DEBUG) {
              console.log(`[ca-trigger] trigger: ${trigger}`, {
                element: el,
                animationClass,
                reset,
                delay,
                duration,
              });
            }

            applyAnimation(el, animationClass, reset, delay, duration);
          });
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTriggerAnimations);
    } else {
      initTriggerAnimations();
    }

    window.caTrigger = {
      init: initTriggerAnimations,
    };
  })();

}));
