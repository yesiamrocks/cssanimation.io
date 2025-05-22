/**
 * cssanimation-gsap.js - GSAP-powered animation enhancements
 * Part of cssanimation.io
 * Version: 2.2.0
 * Author: Shafayetul Islam Pavel
 * Find me at: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * Github: https://github.com/yesiamrocks/cssanimation.io
 * Title: A Powerful CSS Animation Library with GSAP Support for Advanced Motion Design.
 * Description: Integrates GSAP for advanced motion control, scroll triggers, and timeline-based animations.
 * cssanimation.io Copyright © 2025 Shafayetul Islam Pavel
 **/

function initGsapAnimations() {
    gsap.to('.ca__gsap-hu__hu__', {
        y: 30,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
    });

    gsap.to('.ca__gsap-snake span', {
        y: 30,
        duration: 0.75,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.2,
    });

    gsap.to('.ca__gsap-effect3d', {
        duration: 1.5,
        textShadow:
            '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15)',
        ease: 'sine.inOut',
    });
}
