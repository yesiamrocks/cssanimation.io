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
const outputHtmlPath = path.resolve(__dirname, '../docs/index.html');
const outputClientJsPath = path.resolve(__dirname, '../docs/cssanimation-client.js'); // Path for client-side JS
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
  const groupsJson = JSON.parse(groupsRawData); // Populate animationCategories Map from JSON and count animations

  for (const categoryName in groupsJson) {
    const classesInGroup = groupsJson[categoryName];
    animationCategories.set(categoryName, classesInGroup);
    animationCounts.set(categoryName, classesInGroup.length); // Initialize count for explicitly defined categories
    classesInGroup.forEach((cls) => allDefinedAnimationClassesInJson.add(cls));
  }
} catch (error) {
  console.error(`Error reading or parsing animation-groups.json at ${animationGroupsPath}:`, error); // If the file is missing or invalid, categories map will be cleared or remain empty
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
  } // If the class is not found in any defined category (including 'Other' if it exists),
  // it means it's a CSS animation but not in animation-groups.json, and 'Other' is also empty.
  // In this edge case, we'll still assign it to 'Other' for the data-category attribute,
  // but the button might not be rendered if 'Other' has 0 count.
  return 'Other';
}

// Client-side JavaScript content
const clientJsContent = `
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

        // New sidebar elements
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const sidebar = document.getElementById('sidebar-aside'); // Renamed from 'aside' in HTML
        const overlay = document.getElementById('mobile-overlay');

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

        // Function to toggle sidebar visibility on mobile
        function toggleSidebar() {
            sidebar.classList.toggle('translate-x-full'); // Slides sidebar in/out
            overlay.classList.toggle('hidden'); // Shows/hides overlay
            document.body.classList.toggle('overflow-hidden'); // Prevents body scroll when overlay is active
        }

        // Event listeners for hamburger button and overlay
        hamburgerBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);

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

        // New function to toggle code expansion
        function toggleCodeExpansion(id) {
            const codeElement = document.getElementById("code-" + id);
            const animationClass = codeElement.dataset.animationClass;
            const isExpanded = codeElement.getAttribute('aria-expanded') === 'true';
            const currentPreviewText = customPreviewTextInput.value.trim();
            const contentToShow = currentPreviewText === '' ? 'Your Content' : currentPreviewText;

            if (!isExpanded) {
                // Escape HTML for display within a <pre> or <code> tag
                codeElement.textContent = \`<div class="cssanimation \${animationClass}">\${contentToShow}</div>\`;
                codeElement.setAttribute('aria-expanded', 'true');
            } else {
                codeElement.textContent = animationClass;
                codeElement.setAttribute('aria-expanded', 'false');
            }
        }

        function copyToClipboard(id) {
            // Get the currently displayed text of the code element
            const text = document.getElementById("code-" + id).textContent.trim(); 
            const feedbackEl = document.getElementById("feedback-" + id);

            // Use execCommand for broader compatibility within iframes
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    feedbackEl.classList.add("show");
                    setTimeout(() => {
                        feedbackEl.classList.remove("show");
                    }, 1500);
                } else {
                    console.error('Fallback: Copying text command was unsuccessful.');
                    // Fallback if execCommand fails
                    showMessageBox('Failed to copy. Please copy manually: ' + text);
                }
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
                showMessageBox('Failed to copy. Please copy manually: ' + text);
            }
            document.body.removeChild(textarea);
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

            // Using document.execCommand('copy') for better iframe compatibility
            const textarea = document.createElement('textarea');
            textarea.value = shareUrl;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    shareFeedbackEl.classList.add("show");
                    setTimeout(() => {
                        shareFeedbackEl.classList.remove("show");
                    }, 1500);
                } else {
                    console.error('Fallback: Copying share link command was unsuccessful.');
                    showMessageBox('Failed to copy share link. Please copy manually: ' + shareUrl);
                }
            } catch (err) {
                console.error('Fallback: Oops, unable to copy share link', err);
                showMessageBox('Failed to copy share link. Please copy manually: ' + shareUrl);
            }
            document.body.removeChild(textarea);
        }

        // Custom Message Box for alerts
        function showMessageBox(message) {
            const messageBox = document.createElement('div');
            messageBox.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black', 'bg-opacity-50');
            messageBox.innerHTML = \`
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                    <p class="text-gray-900 dark:text-gray-100 mb-4">\${message}</p>
                    <button class="px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800" onclick="this.closest('.fixed').remove()">
                        OK
                    </button>
                </div>
            \`;
            document.body.appendChild(messageBox);
        }

        function filterAnimations() {
            const searchTerm = searchInput.value.toLowerCase();
            let hasVisibleElements = false;

            document.querySelectorAll('.animation-box').forEach(box => {
                const previewText = box.querySelector('.preview').textContent.toLowerCase();
                const codeElement = box.querySelector('code'); // Get the code element
                const animationClass = codeElement.dataset.animationClass; // Get original animation class

                // Reset code element content to its original state before filtering
                if (codeElement.getAttribute('aria-expanded') === 'true') {
                    // If it was expanded, collapse it to show only the class
                    codeElement.textContent = animationClass;
                    codeElement.setAttribute('aria-expanded', 'false');
                }

                const matchesSearch = previewText.includes(searchTerm) || animationClass.toLowerCase().includes(searchTerm);
                const boxCategory = box.dataset.category;
                
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
                // Collapse the sidebar on category selection for mobile
                if (window.innerWidth < 1024) { // 1024px is Tailwind's 'lg' breakpoint
                    toggleSidebar();
                }
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
`;

// Generate HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animation Library for Developers and Ninjas - cssanimation.io</title>
    <link rel="shortcut icon" href="assets/favicon.ico">
    <link rel="canonical" href="http://cssanimation.io" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="description" content="Are you looking for css animation? Don’t know how to use css3 keyframe also css transition, want to design websites with animation? Follow us to have all solutions together.">
    <meta name="keywords" content="css animation, website animation, css3, css3 animation, greensock, animation library, html5 animation, transition, animate css, css3 animation examples, css3 transform, css3 effects, css text animation, website designer, creating animation, css3 animation effects, css hover, css3 hover animation, css rotate, scales, css transition">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Pavel">
    <meta name="contact" content="hello@cssanimation.io">
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@cssanimation_io" />
    <meta name="twitter:title" content="CSS Animation Library for Developers and Ninjas" />
    <meta name="twitter:description" content="Are you looking for css animation? Don’t know how to use css3 keyframe also css transition, want to design websites with animation? Follow us to have all solutions together." />
    <meta name="twitter:image" content="assets/cssanimation_icon.png" />
    <meta property="og:title" content="CSS Animation Library for Developers and Ninjas" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Are you looking for css animation? Don’t know how to use css3 keyframe also css transition, want to design websites with animation? Follow us to have all solutions together." />
    <meta property="og:url" content="https://cssanimation.io/" />
    <meta property="og:image" content="assets/cssanimation_icon.png" />
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="CSS Animation">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="#7e2ea0">
    <link rel="apple-touch-icon-precomposed" href="assets/cssanimation_icon.png">
    <meta name="msapplication-TileImage" content="assets/cssanimation_icon.png">
    <meta name="msapplication-TileColor" content="#fcf5f2">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Leckerli+One&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./assets/cssanimation.min.css">
    
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

     <script>
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-78437975-1', 'auto');
    ga('send', 'pageview');
    </script>

    <style type="text/tailwindcss">
      @theme {
        --color-brand: #7e2ea0;
        --color-secondary: #4e1671;
        --color-accent: #ff33cc;

        --color-bg-dark: #0e0a1a;
        --color-bg-light: #f5f2fa;
        --color-surface: #1c102b;

        --color-text-dark: #e6d9f3;
        --color-text-light: #1d082b;

        --color-success: #00d288;
        --color-warning: #f5be40;
        --color-error: #f34b7d;

        --color-bg: #0e0a1a;
        --color-sidebar: #ded0ea;
        --color-sidebarD: #4e1671;
        --color-header: #7e2ea0;
        --color-btn: #c24ef2;
        --color-btn-hover: #4e1671;
        --color-text: #e6d9f3;
        --color-text-muted: #aa8cc9;
        --color-panel: #2a1a3d;
        --color-border: #39274f;
      }
    </style>
    <style>
        :root {
            --color-brand: #7e2ea0;
            --color-secondary: #4e1671;
            --color-accent: #c24ef2;

            --color-bg-dark: #0e0a1a;
            --color-bg-light: #f5f2fa;
            --color-surface: #1c102b;

            --color-text-dark: #e6d9f3;
            --color-text-light: #1d082b;

            --color-success: #00d288;
            --color-warning: #f5be40;
            --color-error: #f34b7d;
        }
        html {
            scroll-behavior: smooth;
        }

        /* Ensure the body and html take full height for proper layout calculation */
        body {
            font-family: "Ubuntu", sans-serif;
            margin: 0;
            padding: 0;
        }
        
        /* Preview box sizing properties */
        .preview {
            min-width: 150px;
            min-height: 80px;
            word-break: break-word; 
        }
        /* Feedback messages for copy/share actions */
        .copy-feedback, .share-feedback {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none; 
            z-index: 10; 
        }
        .copy-feedback.show, .share-feedback.show {
            opacity: 1;
        }
        /* Keyboard focus style */
        .animation-box.focused {
            outline: 3px solid var(--color-brand);
            outline-offset: 2px;
        }
        .category-button.active {
            background-color: var(--color-accent);
            color: #ffffff;
        }
        .dark .category-button.active {
            background-color: var(--color-accent);
            color: #ffffff; /* Tailwind gray-900 */
        }
             

        /* Custom scrollbar for better aesthetics, if desired */
        /* For Webkit browsers (Chrome, Safari) */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px; /* For horizontal scrollbars */
        }

        ::-webkit-scrollbar-track {
            background: #e2e8f0; /* Tailwind gray-200 */
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #94a3b8; /* Tailwind gray-400 */
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #64748b; /* Tailwind gray-600 */
        }
        /* Hide scrollbar when idle (requires -webkit-scrollbar-track-piece for full browser support or JavaScript) */
        /* Note: This is an advanced feature that often requires browser-specific hacks or JS. */
        /* For Webkit: You might need to adjust opacity on ::-webkit-scrollbar-thumb on hover of the container */


        /* For Firefox */
        html {
            scrollbar-width: thin;
            scrollbar-color: #94a3b8 #e2e8f0; /* thumb color track color */
        }
    </style>
</head>
<body class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 ease-in-out">

    <!-- Fixed Header -->
    <header class="fixed bg-header top-0 left-0 right-0 text-white p-4 shadow-lg z-20 flex items-center justify-between h-16">

    <div class="flex items-center">
        <h1 class="text-xl md:text-2xl font-bold rounded-md lg:hidden">
            <img src="./assets/cssanimation-logo.svg" alt="cssanimation brand" width="220">
        </h1>

        <div class="hidden lg:flex items-center">
            <input
                type="text"
                id="search-input"
                placeholder="Search animations..."
                class="px-4 py-2 rounded-md bg-secondary text-bg-light border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bg-light transition-colors duration-300 ease-in-out w-48 sm:w-64"
            />
        </div>
    </div>

    <h1 class="text-xl md:text-2xl font-bold rounded-md hidden lg:block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <img src="./assets/cssanimation-logo.svg" alt="cssanimation brand" width="250">
    </h1>

    <div class="flex items-center space-x-4">
        <a 
            href="https://github.com/yesiamrocks/cssanimation?tab=readme-ov-file#css-animation-library-for-developers-and-ninjas" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out"
            aria-label="Getting Started"
        >
            Getting Started
        </a>
        
        <a 
            href="https://github.com/yesiamrocks/cssanimation" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out hidden lg:flex"
            aria-label="GitHub Profile"
        >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.167 6.839 9.504.499.09.679-.217.679-.481 0-.237-.008-.865-.013-1.702-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.003.07 1.531 1.029 1.531 1.029.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.338-2.22-.253-4.555-1.113-4.555-4.931 0-1.09.39-1.981 1.029-2.675-.103-.253-.446-1.268.098-2.64 0 0 .84-.268 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.025 2.747-1.025.546 1.372.202 2.387.099 2.64.64.694 1.028 1.584 1.028 2.675 0 3.829-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.338-.012 2.419-.012 2.747 0 .268.179.577.688.48C21.137 20.165 24 16.416 24 12.017 24 6.484 19.522 2 14 2h-2z" clip-rule="evenodd" />
            </svg>
        </a>

        <button
            id="theme-toggle"
            class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out hidden lg:flex"
            aria-label="Toggle Dark Mode"
        >
            <svg id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg id="theme-toggle-light-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.939a1 1 0 111.414 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.121-2.121zM10 10a3 3 0 100-6 3 3 0 000 6zm7-3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-9 0a1 1 0 011-1H4a1 1 0 010 2H3a1 1 0 01-1-1zm7 7a1 1 0 011-1v-1a1 1 0 112 0v1a1 1 0 01-1 1h-2zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm7 7a1 1 0 011-1v-1a1 1 0 112 0v1a1 1 0 01-1 1h-2zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
            </svg>
        </button>

        <button id="hamburger-btn" class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out lg:hidden" aria-label="Toggle Navigation">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
</header>

    <!-- Mobile Overlay (hidden by default, shown when sidebar is active) -->
    <div id="mobile-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-15 hidden transition-opacity duration-300 ease-in-out lg:hidden"></div>

    <!-- Main Layout Container (adjusts for fixed header height) -->
    <div class="flex flex-1 pt-16 overflow-hidden">
        <!-- Sticky Left Sidebar -->
        <aside id="sidebar-aside" class="w-full bg-sidebar dark:bg-sidebarD lg:w-64 xl:w-80 p-4 overflow-y-auto flex-shrink-0
                      fixed top-16 right-0 h-[calc(100vh-4rem)] z-20 transform translate-x-full transition-transform duration-300 ease-in-out
                      lg:static lg:h-full lg:translate-x-0 lg:shadow-none
                      border-r border-gray-200 dark:border-gray-700 shadow-md">
            <div id="categories" class="flex flex-col gap-2">
                <button class="category-button cursor-pointer text-left px-2 py-2 rounded-md text-muted hover:bg-accent hover:text-white hover:px-5 dark:hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 ease-in-out" data-category="All">
                    All (${allCssAnimationClassNames.length})
                </button>
                ${Array.from(animationCategories.keys())
                  .sort((a, b) => {
                    if (a === 'Other') return 1;
                    if (b === 'Other') return -1;
                    return a.localeCompare(b);
                  })
                  .map((category) => {
                    const count = animationCounts.get(category) || 0;
                    if (count > 0) {
                      return `
                                <button class="category-button cursor-pointer text-left px-2 py-2 rounded-md text-muted hover:bg-accent hover:text-white hover:px-5 dark:hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-500 ease-in-out" data-category="${category}">
                                    ${category} (${count})
                                </button>
                                `;
                    }
                    return '';
                  })
                  .join('')}
            </div>
        </aside>

        <!-- Main Content (contains custom preview text input and animation gallery) -->
        <main class="flex-1 p-8 overflow-y-auto">
            <p class="text-lg text-center mb-8 text-gray-600 dark:text-gray-400">
               Click on any animation to replay. Click on the code snippet to expand it to full HTML, and use the "Copy" button to grab the code.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center mt-4 mb-8 gap-3">
                <label for="custom-preview-text" class="text-gray-700 dark:text-gray-300 font-semibold">Preview Text:</label>
                <input
                    type="text"
                    id="custom-preview-text"
                    placeholder="Enter custom text for previews..."
                    class="flex-grow px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors duration-300 ease-in-out max-w-sm"
                />
            </div>

            <!-- Animation Gallery -->
            <div id="gallery" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                ${allCssAnimationClassNames
                  .map((cls) => {
                    const fullClass = `cssanimation ${cls}`;
                    const category = getCategoryForClass(cls);
                    return `
                            <div class="animation-box relative bg-zinc-200 dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-between transition-all duration-800 ease-in-out
  hover:scale-[1.03] hover:shadow-xl hover:bg-gradient-to-br hover:from-fuchsia-100 hover:to-violet-200 dark:hover:from-gray-700 dark:hover:to-gray-900
  hover:ring-2 hover:ring-pink-300 dark:hover:ring-purple-500
  focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-purple-400" data-category="${category}" tabindex="0">
                                <button onclick="shareAnimation('${cls}')" class="absolute top-0 right-0 px-1 py-1 bg-slate-50 dark:bg-slate-700 text-slate-500 text-xs rounded-bl-lg hover:bg-slate-500 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-75 group" aria-label="Share direct link for ${cls}">
                                    Share
                                    <span id="share-feedback-${cls}" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap share-feedback">Link Copied!</span>
                                </button>

                                <div class="preview w-full inline-flex items-center justify-center p-4 px-8 mt-6 bg-gray-100 dark:bg-slate-700 font-bold text-center text-slate-700 dark:text-gray-200 cursor-pointer hover:shadow-lg transition-all duration-500 ease-in-out overflow-hidden rounded-md shadow-sm ${fullClass}" id="${cls}" onclick="replay('${cls}')">
                                    ${cls}
                                </div>
                                
                                <div class="flex space-x-2 flex-shrink-0 justify-center mt-4">
                                    <code id="code-${cls}" class="font-mono w-full text-sm text-gray-900 transition-colors duration-500 ease-in-out whitespace-normal break-all p-2 sm:text-left rounded-md dark:bg-gray-800 dark:text-gray-200 cursor-pointer"
                                          data-animation-class="${cls}" tabindex="0" role="button" aria-expanded="false"
                                          onclick="toggleCodeExpansion('${cls}')">
                                        ${cls}
                                    </code>
                                    <button onclick="copyToClipboard('${cls}')" class="relative px-4 py-2 bg-btn dark:bg-btn text-white font-semibold rounded-md hover:bg-btn-hover transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-btn focus:ring-opacity-75 group" aria-label="Copy code for ${cls}">
                                        Copy
                                        <span id="feedback-${cls}" class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap copy-feedback">Copied!</span>
                                    </button>
                                </div>
                            </div>`;
                  })
                  .join('')}
            </div>
            <footer class="text-center p-8 text-sm text-gray-400">
        <p>
            Made with ❤️ by <a href="https://www.linkedin.com/in/shafayetul/" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-600">Pavel</a> — 
            <a href="https://cssanimation.io" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-600">cssanimation</a>
        </p>
    </footer>
        </main>
    </div>

    <button id="scroll-to-top-btn" class="fixed bottom-6 right-6 bg-violet-700 text-white p-3 rounded-full shadow-md transition-all duration-300 ease-in-out opacity-0 pointer-events-none z-50 hover:bg-violet-800 hover:-translate-y-1" aria-label="Scroll to top">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>

    

    <script src="./cssanimation-client.js"></script>
</body>
</html>`;

// Write HTML to file
try {
  fs.writeFileSync(outputHtmlPath, htmlContent);
  console.log(
    `✅ Generated demo.html with ${allCssAnimationClassNames.length} animations (with fixed header and sidebar).`,
  );
} catch (error) {
  console.error(`Error writing HTML file to ${outputHtmlPath}:`, error);
  process.exit(1); // Exit if HTML file cannot be written
}

// Write client-side JavaScript to file
try {
  fs.writeFileSync(outputClientJsPath, clientJsContent);
  console.log(`✅ Generated cssanimation-client.js with client-side JavaScript.`);
} catch (error) {
  console.error(`Error writing client-side JS file to ${outputClientJsPath}:`, error);
  process.exit(1); // Exit if JS file cannot be written
}
