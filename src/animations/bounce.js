// animations/bounce.js
export function animateBounce(el, options = {}) {
    gsap.to(el, {
        y: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        ...options,
    });
}
