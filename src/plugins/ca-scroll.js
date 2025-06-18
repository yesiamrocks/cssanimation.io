// ca-scroll.js — AOS-style scroll animation handler for cssanimation.io

(function () {
  const ATTR_NAME = 'ca-scroll';
  const ATTR_OFFSET = 'ca-scroll-offset';
  const ATTR_REPEAT = 'ca-scroll-repeat';
  const ATTR_DELAY = 'ca-delay';
  const ATTR_DURATION = 'ca-duration';
  const FX_CLASS_SELECTOR = '[class*="ca__fx-"]';
  const DEBUG = window.__CA_DEBUG || false;

  function log(...args) {
    if (DEBUG) console.log('[ca-scroll]', ...args);
  }

  function getFxClass(el) {
    return Array.from(el.classList).find((cls) => cls.startsWith('ca__fx-'));
  }

  function prepareElement(el) {
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    const fx = getFxClass(el);
    if (fx) el.dataset.caFx = fx;
  }

  function animateElement(el) {
    const delay = el.getAttribute(ATTR_DELAY);
    const duration = el.getAttribute(ATTR_DURATION);
    if (delay) el.style.animationDelay = delay;
    if (duration) el.style.animationDuration = duration;

    const fxClass = el.dataset.caFx;
    if (fxClass && !el.classList.contains(fxClass)) {
      el.classList.add(fxClass);
    }

    el.classList.add('ca-animate');
    el.style.opacity = '1';
    el.style.pointerEvents = 'auto';
    log('animateElement', el);
  }

  function resetElement(el) {
    const fxClass = el.dataset.caFx;
    if (fxClass) el.classList.remove(fxClass);
    el.classList.remove('ca-animate');
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    log('resetElement', el);
  }

  function createObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const repeat = el.getAttribute(ATTR_REPEAT) === 'true';

          if (entry.isIntersecting) {
            animateElement(el);
            if (!repeat) observer.unobserve(el);
          } else {
            if (repeat) resetElement(el);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      },
    );
  }

  function initCAScroll() {
    const elements = document.querySelectorAll(`[${ATTR_NAME}]`);
    if (!elements.length) return;

    const observer = createObserver();

    elements.forEach((el) => {
      prepareElement(el);
      const offset = el.getAttribute(ATTR_OFFSET);
      if (offset) {
        const px = parseInt(offset, 10);
        observer.rootMargin = `0px 0px -${px}px 0px`;
      }
      observer.observe(el);
      log('observe', el);
    });
  }

  document.addEventListener('DOMContentLoaded', initCAScroll);
  window.initCAScroll = initCAScroll;
})();
