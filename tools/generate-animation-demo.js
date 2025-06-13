// tools/generate-animation-demo.js

// 1. Change `require()` to `import` statements
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url'; // Needed to construct __dirname equivalent

// 2. Define __filename and __dirname equivalents for path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Adjust all path.resolve calls to use the new __dirname
const cssFilePath = path.resolve(__dirname, '../dist/cssanimation.css');
const outputHtmlPath = path.resolve(__dirname, '../docs/cssanimation-demo.html');
const animationGroupsPath = path.resolve(__dirname, './animation-groups.json'); // Path to the JSON file

let cssContent = '';
try {
  // Read CSS content
  cssContent = fs.readFileSync(cssFilePath, 'utf-8');
} catch (error) {
  console.error(`Error reading CSS file at ${cssFilePath}:`, error);
  process.exit(1); // Exit if CSS file cannot be read
}

let animationCategories = new Map();
let allDefinedAnimationClassesInJson = new Set(); // To track all classes defined in JSON
let animationCounts = new Map(); // New: To store counts for each category

try {
  const groupsRawData = fs.readFileSync(animationGroupsPath, 'utf-8');
  const groupsJson = JSON.parse(groupsRawData);

  // Populate animationCategories Map from JSON and count animations
  for (const categoryName in groupsJson) {
    const classesInGroup = groupsJson[categoryName];
    animationCategories.set(categoryName, classesInGroup);
    animationCounts.set(categoryName, classesInGroup.length); // Initialize count for explicitly defined categories
    classesInGroup.forEach((cls) => allDefinedAnimationClassesInJson.add(cls));
  }
} catch (error) {
  console.error(`Error reading or parsing animation-groups.json at ${animationGroupsPath}:`, error);
  // If the file is missing or invalid, categories map will be cleared or remain empty
}

// Extract all .ca__fx-* classes from CSS
const allCssAnimationClassNames = Array.from(new Set(cssContent.match(/\.ca__fx-[a-zA-Z0-9_-]+/g) || [])).map((cls) =>
  cls.slice(1),
); // remove dot

// New: Identify animations not explicitly categorized
let uncategorizedAnimations = [];
allCssAnimationClassNames.forEach((cls) => {
  if (!allDefinedAnimationClassesInJson.has(cls)) {
    uncategorizedAnimations.push(cls);
  }
});

// Add 'Other' category if there are uncategorized animations
if (uncategorizedAnimations.length > 0) {
  animationCategories.set('Other', uncategorizedAnimations);
  animationCounts.set('Other', uncategorizedAnimations.length);
} else {
  // Ensure 'Other' is not present in the map if there are no uncategorized animations
  animationCategories.delete('Other');
  animationCounts.delete('Other');
}

// Helper to get category for a given class name
function getCategoryForClass(className) {
  for (let [category, classes] of animationCategories) {
    if (classes.includes(className)) {
      return category;
    }
  }
  // If the class is not found in any defined category (including 'Other' if it exists),
  // it means it's a CSS animation but not in animation-groups.json, and 'Other' is also empty.
  // In this edge case, we'll still assign it to 'Other' for the data-category attribute,
  // but the button might not be rendered if 'Other' has 0 count.
  return 'Other';
}

// Generate HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CA Animation Gallery</title>
    <link rel="stylesheet" href="./dist/cssanimation.css">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles */
        body {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
        .preview {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            min-width: 150px;
            min-height: 80px;
            padding: 1rem 2rem;
            background-color: #f0f4f8; /* Light background for preview in light mode */
            border: 1px dashed #cbd5e1;
            font-weight: bold;
            text-align: center;
            color: #334155;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out;
            /* Ensure text wraps inside preview */
            word-break: break-word; 
            overflow: hidden;
        }
        /* Dark mode adjustments for preview */
        .dark .preview {
            background-color: #334155; /* Dark background for preview in dark mode */
            border-color: #475569;
            color: #cbd5e1;
        }
        
        /* Dark mode adjustments for code display */
        .dark .code-display {
            background-color: #1a202c;
            color: #cbd5e1;
        }
        .copy-feedback, .share-feedback { /* Combined feedback styles */
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none; /* Prevent interaction while hidden */
            z-index: 10; /* Ensure it's above other elements */
        }
        .copy-feedback.show, .share-feedback.show {
            opacity: 1;
        }
        .category-button.active {
            background-color: #6d28d9; /* Blue 600 */
            color: #ffffff;
        }
        .dark .category-button.active {
            background-color: #60a5fa; /* Blue 400 */
            color: #1f2937; /* Gray 900 */
        }
        /* Scroll to Top Button Styles */
        #scroll-to-top-btn {
            position: fixed;
            bottom: 1.5rem; /* 24px */
            right: 1.5rem; /* 24px */
            background-color: #6d28d9; /* Blue 600 */
            color: white;
            padding: 0.75rem; /* 12px */
            border-radius: 9999px; /* Full circle */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
            opacity: 0;
            pointer-events: none; /* Hidden and not clickable when opacity is 0 */
            z-index: 1000; /* Ensure it's above other content */
        }
        #scroll-to-top-btn.show {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }
        #scroll-to-top-btn:hover {
            background-color: #8b5cf6; /* Blue 700 */
            transform: translateY(-5px);
        }

        /* Improved category button layout adjustments */
        #categories {
            margin-bottom: 2rem; /* Ensure enough space below categories */
        }
        .custom-preview-controls {
            margin-top: 1rem;
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
        }
        @media (min-width: 640px) {
            .custom-preview-controls {
                flex-direction: row;
                justify-content: center;
            }
        }

        /* Keyboard focus style */
        .animation-box.focused {
            outline: 3px solid #7c3aed; /* Tailwind blue-400 */
            outline-offset: 2px;
        }
    </style>
</head>
<body class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 ease-in-out">
    <div class="max-w-7xl mx-auto pt-6 pb-6">
        <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-300 text-center sm:text-left">Explore CSS Animations</h1>

            <div class="flex items-center space-x-4 w-full sm:w-auto justify-center">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search animations..."
                    class="flex-grow px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out"
                />
                <button
                    id="theme-toggle"
                    class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out"
                    aria-label="Toggle Dark Mode"
                >
                    <svg
                        id="theme-toggle-dark-icon"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                        ></path>
                    </svg>
                    <svg
                        id="theme-toggle-light-icon"
                        class="w-5 h-5 hidden"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.939a1 1 0 111.414 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.121-2.121zM10 10a3 3 0 100-6 3 3 0 000 6zm7-3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-9 0a1 1 0 011-1H4a1 1 0 010 2H3a1 1 0 01-1-1zm7 7a1 1 0 011-1v-1a1 1 0 112 0v1a1 1 0 01-1 1h-2zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm7 7a1 1 0 011-1v-1a1 1 0 112 0v1a1 1 0 01-1 1h-2zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
        <p class="text-lg text-center mb-8 text-gray-600 dark:text-gray-400">
            Click on any animation to replay, and use the "Copy" button to grab the class.
        </p>

        <div class="custom-preview-controls">
            <label for="custom-preview-text" class="text-gray-700 dark:text-gray-300 font-semibold">Preview Text:</label>
            <input
                type="text"
                id="custom-preview-text"
                placeholder="Enter custom text for previews..."
                class="flex-grow px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out max-w-sm"
            />
        </div>

        <div id="categories" class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 px-2 sm:px-4">
            <button class="category-button px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out active" data-category="All">All (${allCssAnimationClassNames.length})</button>
            ${Array.from(animationCategories.keys())
              .sort((a, b) => {
                // Custom sort function to place 'Other' at the end
                if (a === 'Other') return 1; // 'Other' comes after 'b'
                if (b === 'Other') return -1; // 'b' comes after 'Other'
                return a.localeCompare(b); // For all other categories, sort alphabetically
              })
              .map((category) => {
                const count = animationCounts.get(category) || 0;
                if (count > 0) {
                  return `
                        <button class="category-button px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out" data-category="${category}">${category} (${count})</button>
                    `;
                }
                return '';
              })
              .join('')}
        </div>

        <div id="gallery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${allCssAnimationClassNames
              .map((cls) => {
                const fullClass = `cssanimation ${cls}`;
                const category = getCategoryForClass(cls);
                return `
                    <div class="animation-box relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-between transition-all duration-300 ease-in-out" data-category="${category}" tabindex="0">
                        <button onclick="shareAnimation('${cls}')" class="absolute top-0 right-0 px-1 py-1 bg-slate-700 text-slate-500 text-xs rounded-bl-lg hover:bg-slate-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-75 group" aria-label="Share direct link for ${cls}">
                            Share
                            <span id="share-feedback-${cls}" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap share-feedback">Link Copied!</span>
                        </button>

                        <div class="preview ${fullClass} w-full mt-6 rounded-md shadow-2xl" id="${cls}" onclick="replay('${cls}')">
                            ${cls}
                        </div>
                        
                        <div class="flex space-x-2 flex-shrink-0 justify-center mt-6 mb-4">
                            <code id="code-${cls}" class="font-mono w-full text-sm bg-gray-200 text-gray-900 transition-colors duration-300 ease-in-out whitespace-normal break-all p-2 sm:text-left rounded-md dark:bg-gray-800 dark:text-gray-200" data-full-class="${fullClass}">${cls}</code>
                            <button onclick="copyToClipboard('${cls}')" class="relative px-4 py-2 bg-violet-700 text-white font-semibold rounded-md hover:bg-violet-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 group" aria-label="Copy code for ${cls}">
                                Copy
                                <span id="feedback-${cls}" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap copy-feedback">Copied!</span>
                            </button>                                
                        </div>                            
                    </div>`;
              })
              .join('')}
        </div>
    </div>

    <button id="scroll-to-top-btn" aria-label="Scroll to top">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>

    <footer style="text-align: center; padding: 2rem 1rem; font-size: 0.875rem; color: #888;">
        <p>
            Made with ❤️ by <a href="https://www.linkedin.com/in/shafayetul/" target="_blank" rel="noopener noreferrer" style="color: #555;">Shafayetul Islam Pavel</a> — 
            <a href="https://cssanimation.io" target="_blank" rel="noopener noreferrer" style="color: #555;">cssanimation.io</a>
        </p>
    </footer>

    <script>
        const gallery = document.getElementById('gallery');
        const searchInput = document.getElementById('search-input');
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        const categoryButtons = document.querySelectorAll('.category-button');
        const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
        const customPreviewTextInput = document.getElementById('custom-preview-text'); 
        let currentCategoryFilter = 'All'; 
        let focusedAnimationIndex = -1; 

        // --- URL Parameter Management ---
        function updateURLParams(params) {
            const url = new URL(window.location);
            for (const key in params) {
                if (params[key]) {
                    url.searchParams.set(key, params[key]);
                } else {
                    url.searchParams.delete(key); 
                }
            }
            window.history.replaceState({}, '', url.toString());
        }

        function getURLParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                search: params.get('search') || '',
                category: params.get('category') || 'All',
                theme: params.get('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
                animation: params.get('animation') || '', 
                previewText: params.get('previewText') || '' 
            };
        }

        function applyURLParams() {
            const params = getURLParams();

            searchInput.value = params.search;

            currentCategoryFilter = params.category;
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === currentCategoryFilter) {
                    btn.classList.add('active');
                }
            });

            if (params.theme === 'dark') {
                document.documentElement.classList.add('dark');
                themeToggleLightIcon.classList.remove('hidden');
                themeToggleDarkIcon.classList.add('hidden');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                themeToggleDarkIcon.classList.remove('hidden');
                themeToggleLightIcon.classList.add('hidden');
                localStorage.setItem('color-theme', 'light');
            }

            customPreviewTextInput.value = params.previewText;
            updatePreviewElementsContent(params.previewText);

            filterAnimations(); 
            
            setTimeout(() => {
                if (params.animation) {
                    const animationElement = document.getElementById(params.animation);
                    if (animationElement) {
                        const animationBox = animationElement.closest('.animation-box');
                        setFocus(Array.from(document.querySelectorAll('.animation-box:not([style*="display: none"])')).indexOf(animationBox));
                        replay(params.animation); 
                        if (!isElementInViewport(animationBox)) {
                           animationBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                }
            }, 100); 
        }

        function updatePreviewElementsContent(text) {
            const previewElements = document.querySelectorAll('.preview');
            previewElements.forEach(el => {
                if (!el.dataset.originalText) {
                    el.dataset.originalText = el.textContent.trim();
                }

                if (text.trim() === '') {
                    el.textContent = el.dataset.originalText;
                } else {
                    el.textContent = text;
                }
            });
        }

        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // --- Keyboard Navigation Functions ---
        function getVisibleAnimationBoxes() {
            return Array.from(document.querySelectorAll('.animation-box:not([style*="display: none"])'));
        }

        function removeFocus() {
            const currentFocused = document.querySelector('.animation-box.focused');
            if (currentFocused) {
                currentFocused.classList.remove('focused');
                currentFocused.classList.remove('ring-2', 'ring-violet-500', 'ring-offset-2', 'ring-offset-gray-100', 'dark:ring-offset-gray-900');
            }
        }

        function setFocus(index) {
            const visibleBoxes = getVisibleAnimationBoxes();
            if (visibleBoxes.length === 0) {
                focusedAnimationIndex = -1;
                return;
            }

            removeFocus(); 

            if (index < 0) {
                focusedAnimationIndex = visibleBoxes.length - 1;
            } else if (index >= visibleBoxes.length) {
                focusedAnimationIndex = 0;
            } else {
                focusedAnimationIndex = index;
            }

            const newFocusedBox = visibleBoxes[focusedAnimationIndex];
            if (newFocusedBox) {
                newFocusedBox.classList.add('focused');
                if (!isElementInViewport(newFocusedBox)) {
                    newFocusedBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }

        function getColumnsPerRow() {
            const visibleBoxes = getVisibleAnimationBoxes();
            if (visibleBoxes.length === 0) return 1; 
            if (visibleBoxes.length === 1) return 1;

            const firstBoxRect = visibleBoxes[0].getBoundingClientRect();
            let columns = 1;
            for (let i = 1; i < visibleBoxes.length; i++) {
                const boxRect = visibleBoxes[i].getBoundingClientRect();
                if (Math.abs(boxRect.top - firstBoxRect.top) < 5) { 
                    columns++;
                } else {
                    break; 
                }
            }
            return Math.max(1, Math.min(4, columns)); 
        }

        function moveFocus(direction) {
            const visibleBoxes = getVisibleAnimationBoxes();
            if (visibleBoxes.length === 0) {
                focusedAnimationIndex = -1; 
                return;
            }

            let newIndex = focusedAnimationIndex;

            if (focusedAnimationIndex === -1) { 
                setFocus(0);
                return;
            }

            const currentBox = visibleBoxes[focusedAnimationIndex];
            if (!currentBox) { 
                setFocus(0);
                return;
            }
            
            const columns = getColumnsPerRow(); 

            switch (direction) {
                case 'left':
                    newIndex = (focusedAnimationIndex - 1 + visibleBoxes.length) % visibleBoxes.length;
                    break;
                case 'right':
                    newIndex = (focusedAnimationIndex + 1) % visibleBoxes.length;
                    break;
                case 'up':
                    newIndex = focusedAnimationIndex - columns;
                    if (newIndex < 0) {
                        const lastRowStart = Math.floor((visibleBoxes.length - 1) / columns) * columns;
                        newIndex = lastRowStart + (focusedAnimationIndex % columns);
                        if (newIndex >= visibleBoxes.length) {
                            newIndex = visibleBoxes.length - 1;
                        }
                    }
                    break;
                case 'down':
                    newIndex = focusedAnimationIndex + columns;
                    if (newIndex >= visibleBoxes.length) {
                        newIndex = focusedAnimationIndex % columns;
                        if (newIndex >= visibleBoxes.length) {
                            newIndex = 0;
                        }
                    }
                    break;
            }
            
            setFocus(newIndex);
        }

        // --- Event Listeners and Functions ---

        themeToggleBtn.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            updateURLParams({ theme: newTheme });
            applyURLParams(); 
        });

        // MODIFIED REPLAY FUNCTION
        function replay(className) {
            const el = document.getElementById(className);
            // className already holds the specific ca__fx-* class (e.g., "ca__fx-zoomIn")

            // Remove the specific animation class to reset it
            el.classList.remove(className);
            void el.offsetWidth; // Trigger reflow to restart animation

            // Add the specific animation class to trigger the animation
            el.classList.add(className);

            let animationEndTimeout; // To store the timeout ID

            const handleAnimationEnd = () => {
                clearTimeout(animationEndTimeout); // Clear the timeout if animation ends naturally
                el.classList.remove(className); // Only remove the specific ca__fx-* class
                el.removeEventListener('animationend', handleAnimationEnd);
            };

            // Listen for the animationend event
            el.addEventListener('animationend', handleAnimationEnd);

            // Set a fallback timeout to remove the class after 5 seconds
            animationEndTimeout = setTimeout(() => {
                if (el.classList.contains(className)) { // Only remove if animation is still active
                    el.classList.remove(className); // Only remove the specific ca__fx-* class
                    el.removeEventListener('animationend', handleAnimationEnd); // Clean up listener if timeout triggers
                }
            }, 5000); // 5000 milliseconds = 5 seconds

            // Remove previous focus highlight and add to the currently replayed box
            document.querySelectorAll('.animation-box').forEach(box => box.classList.remove('ring-2', 'ring-violet-500', 'ring-offset-2', 'ring-offset-gray-100', 'dark:ring-offset-gray-900'));
            el.closest('.animation-box').classList.add('ring-2', 'ring-violet-500', 'ring-offset-2', 'ring-offset-gray-100', 'dark:ring-offset-gray-900');
            
            updateURLParams({ animation: className });
        }

        function copyToClipboard(id) {
            // Get the full class from the data-full-class attribute
            const text = document.getElementById("code-" + id).dataset.fullClass; 
            const feedbackEl = document.getElementById("feedback-" + id);

            navigator.clipboard.writeText(text).then(() => {
                feedbackEl.classList.add("show");
                setTimeout(() => {
                    feedbackEl.classList.remove("show");
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy. Please copy manually: ' + text);
            });
        }

        function shareAnimation(id) {
            const currentUrl = new URL(window.location.origin + window.location.pathname);
            currentUrl.searchParams.set('animation', id); 
            
            const params = getURLParams();
            if (params.search) currentUrl.searchParams.set('search', params.search);
            if (params.category && params.category !== 'All') currentUrl.searchParams.set('category', params.category);
            if (params.theme === 'dark') currentUrl.searchParams.set('theme', params.theme);
            if (params.previewText) currentUrl.searchParams.set('previewText', params.previewText);


            const shareUrl = currentUrl.toString();
            const shareFeedbackEl = document.getElementById("share-feedback-" + id);

            navigator.clipboard.writeText(shareUrl).then(() => {
                shareFeedbackEl.classList.add("show");
                setTimeout(() => {
                    shareFeedbackEl.classList.remove("show");
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy share link: ', err);
                alert('Failed to copy share link. Please copy manually: ' + shareUrl);
            });
        }

        function filterAnimations() {
            const searchTerm = searchInput.value.toLowerCase();
            let hasVisibleElements = false;

            document.querySelectorAll('.animation-box').forEach(box => {
                const previewText = box.querySelector('.preview').textContent.toLowerCase();
                const boxCategory = box.dataset.category;
                
                const matchesSearch = previewText.includes(searchTerm);
                const matchesCategory = (currentCategoryFilter === 'All' || boxCategory === currentCategoryFilter);

                box.style.display = (matchesSearch && matchesCategory) ? 'flex' : 'none';
                if ((matchesSearch && matchesCategory)) {
                    hasVisibleElements = true;
                }
            });

            const visibleBoxes = getVisibleAnimationBoxes();
            if (focusedAnimationIndex !== -1 && !visibleBoxes.includes(document.querySelector('.animation-box.focused'))) {
                    removeFocus(); 
                    focusedAnimationIndex = -1;
            }
            if (focusedAnimationIndex === -1 && hasVisibleElements) {
                setFocus(0);
            }
        }

        searchInput.addEventListener('input', () => {
            updateURLParams({ search: searchInput.value, animation: '' }); 
            filterAnimations();
        });

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const newCategory = button.dataset.category;
                updateURLParams({ category: newCategory, animation: '' }); 
                applyURLParams(); 
            });
        });
        
        customPreviewTextInput.addEventListener('input', (event) => {
            const newText = event.target.value;
            updatePreviewElementsContent(newText);
            updateURLParams({ previewText: newText, animation: '' }); 
        });

        document.addEventListener('keydown', (event) => {
            if (document.activeElement === searchInput || 
                document.activeElement === customPreviewTextInput ||
                Array.from(categoryButtons).includes(document.activeElement) ||
                document.activeElement === themeToggleBtn) {
                return;
            }
            
            if (event.key === 'Tab') {
                removeFocus(); 
                focusedAnimationIndex = -1;
                return;
            }

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault(); 
                    moveFocus('left');
                    break;
                case 'ArrowRight':
                    event.preventDefault(); 
                    moveFocus('right');
                    break;
                case 'ArrowUp':
                    event.preventDefault(); 
                    moveFocus('up');
                    break;
                case 'ArrowDown':
                    event.preventDefault(); 
                    moveFocus('down');
                    break;
                case 'Enter':
                    event.preventDefault(); 
                    const focusedBox = document.querySelector('.animation-box.focused');
                    if (focusedBox) {
                        // Get the specific animation class from the preview element's ID
                        const animationClass = focusedBox.querySelector('.preview').id; 
                        replay(animationClass);
                    }
                    break;
                case 'Escape': 
                    removeFocus();
                    focusedAnimationIndex = -1;
                    break;
            }
        });

        window.addEventListener('popstate', () => {
            applyURLParams();
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Function to handle initial animation cleanup for elements already on the page
        function initializeAnimationsOnLoad() {
            document.querySelectorAll('.preview.cssanimation').forEach(el => {
                // Extract the specific animation class from the element's ID
                const className = el.id; 

                let animationEndTimeout;

                const handleAnimationEnd = () => {
                    clearTimeout(animationEndTimeout);
                    el.classList.remove(className);
                    el.removeEventListener('animationend', handleAnimationEnd);
                };

                // Listen for the animationend event for each element
                el.addEventListener('animationend', handleAnimationEnd);

                // Set a fallback timeout for each element
                animationEndTimeout = setTimeout(() => {
                    if (el.classList.contains(className)) {
                        el.classList.remove(className);
                        el.removeEventListener('animationend', handleAnimationEnd);
                    }
                }, 5000); // 5 seconds fallback
            });
        }

        // Call initializeAnimationsOnLoad on DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            applyURLParams();
            initializeAnimationsOnLoad(); // Call this function on initial load
        });

        gallery.addEventListener('click', (event) => {
            const clickedBox = event.target.closest('.animation-box');
            if (clickedBox) {
                const visibleBoxes = getVisibleAnimationBoxes();
                const index = visibleBoxes.indexOf(clickedBox);
                if (index !== -1) {
                    setFocus(index);
                }
            }
        });
    </script>
</body>
</html>`;

// Write HTML to file
try {
  fs.writeFileSync(outputHtmlPath, htmlContent);
  console.log(
    `✅ Generated demo.html with ${allCssAnimationClassNames.length} animations (with code above preview and buttons).`,
  );
} catch (error) {
  console.error(`Error writing HTML file to ${outputHtmlPath}:`, error);
  process.exit(1); // Exit if HTML file cannot be written
}
