// Import CSS core styles and utilities
import './dist/cssanimation.css';
import './dist/cssanimation-utility.css';

// Import and initialize letter animation engine
import { initLetterAnimations } from './dist/ca-letteranimation.js';

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        initLetterAnimations();

        // Optional dev debug
        if (window.__CA_DEBUG) {
            console.log(
                '[cssanimation.io] Core CSS & Letter animations loaded',
            );
        }
    });
}

// Import GSAP animations
// Note: This file registers `animationMap` but does not auto-run anything
import './dist/cssanimation-gsap.js';

// Optionally export features for advanced users
export { initLetterAnimations };
