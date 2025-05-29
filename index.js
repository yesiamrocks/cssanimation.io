// Import core CSS styles
import './dist/cssanimation.css';
import './dist/cssanimation-utility.css';

// Import the letter animation engine
import './dist/ca-letteranimation.js';

if (typeof window !== 'undefined' && window.__CA_DEBUG) {
    window.addEventListener('DOMContentLoaded', () => {
        console.log('[cssanimation.io] Core CSS & letter animations loaded');
    });
}
