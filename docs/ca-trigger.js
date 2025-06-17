(function () {
  function applyAnimation(el, animationClass, reset = false, delay, duration) {
    if (window.__CA_TRIGGER_DISABLED) return;

    // Apply delay and duration
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

      if (!animationClass) return;

      triggers.forEach((trigger) => {
        el.addEventListener(trigger, () => {
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
