import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationMap } from '../generated-animation-map.js';

gsap.registerPlugin(ScrollTrigger);

const defaultOptions = {
    duration: 1,
    opacity: 0,
    y: 30,
    ease: 'power2.out',
};

function parseDataOptions(el) {
    try {
        return JSON.parse(el.getAttribute('data-gsap') || '{}');
    } catch (e) {
        console.warn('[cssanimation.io] Invalid data-gsap on', el);
        return {};
    }
}

function getAnimationPreset(name) {
    return animationMap[name] || {};
}

function animateElement(el) {
    const presetName = el.getAttribute('ca-gsap');
    const presetOptions = presetName ? getAnimationPreset(presetName) : {};
    const dataOptions = parseDataOptions(el);
    const finalOptions = {
        ...defaultOptions,
        ...presetOptions,
        ...dataOptions,
    };

    gsap.to(el, finalOptions);
}

export function initGsapTriggers() {
    // Scroll
    document.querySelectorAll('.ca__gt-scroll').forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => animateElement(el),
        });
    });

    // Hover
    document.querySelectorAll('.ca__gt-hover').forEach((el) => {
        el.addEventListener('mouseenter', () => animateElement(el));
    });

    // Click
    document.querySelectorAll('.ca__gt-click').forEach((el) => {
        el.addEventListener('click', () => animateElement(el));
    });

    // Load
    window.addEventListener('load', () => {
        document.querySelectorAll('.ca__gt-load').forEach((el) => {
            animateElement(el);
        });
    });
}
