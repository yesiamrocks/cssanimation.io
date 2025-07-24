
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
                codeElement.textContent = `<div class="cssanimation ${animationClass}">${contentToShow}</div>`;
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
            messageBox.innerHTML = `
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                    <p class="text-gray-900 dark:text-gray-100 mb-4">${message}</p>
                    <button class="px-4 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-800" onclick="this.closest('.fixed').remove()">
                        OK
                    </button>
                </div>
            `;
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
