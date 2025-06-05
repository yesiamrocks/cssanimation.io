const fs = require('fs');
const path = require('path');

// Paths
const cssFilePath = path.resolve(__dirname, '../src/cssanimation.css');
const groupConfigPath = path.resolve(__dirname, './animation-groups.json');
const outputHtmlPath = path.resolve(__dirname, '../docs/animation-preview.html');

// Extract animation class names
const css = fs.readFileSync(cssFilePath, 'utf-8');
const allClassNames = Array.from(new Set(css.match(/\.ca__fx-[a-zA-Z0-9_-]+/g) || [])).map((cls) => cls.slice(1));

// Read group config
const groupConfig = JSON.parse(fs.readFileSync(groupConfigPath, 'utf-8'));
const grouped = {...groupConfig};

// Add unassigned classes to "Other"
const assigned = new Set(Object.values(groupConfig).flat());
const unassigned = allClassNames.filter((cls) => !assigned.has(cls));
if (!grouped['Other']) grouped['Other'] = [];
grouped['Other'].push(...unassigned);

// HTML Template
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>cssanimation.io — Demo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../src/cssanimation-index.css" />
  <style>
    .animate-preview {
      animation-duration: 1s;
      animation-fill-mode: both;
    }
    .selected {
      background-color: #dbeafe !important;
      font-weight: 600;
    }
  </style>
</head>
<body class="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition-all">
  <button id="toggleDark" class="fixed top-4 right-4 z-50 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
    Toggle Dark Mode
  </button>

  <div class="flex flex-col md:flex-row min-h-screen">
    <div class="flex-1 flex flex-col items-center justify-center bg-white p-10 shadow-inner dark:bg-gray-900">
      <h1 class="text-3xl font-semibold mb-4">cssanimation.io Preview</h1>
      <p class="text-gray-500 dark:text-gray-300 mb-6">Click an animation class to preview. Click 📋 to copy.</p>
      <h2 id="previewText" class="text-5xl font-bold transition-all">cssanimation</h2>
      <p id="copyNotice" class="text-sm text-green-600 mt-4 h-6 opacity-0 transition-opacity duration-300"></p>
    </div>

    <div class="w-full md:w-1/3 max-h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 border-l p-4">
      <input type="text" id="filterInput" placeholder="Search animation..."
        class="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />

      ${Object.entries(grouped)
        .map(
          ([group, classes]) => `
        <details class="mb-4 group" open>
          <summary class="text-lg font-semibold cursor-pointer select-none mb-2 group-open:mb-4">${group}</summary>
          <div class="space-y-2">
            ${classes
              .map(
                (cls) => `
              <div class="flex items-center group" data-class="${cls}">
                <button
                  class="flex-1 text-left px-4 py-2 bg-white dark:bg-gray-700 rounded-l shadow hover:bg-blue-100 transition font-mono text-sm"
                  onclick="applyAnimation('${cls}', this)"
                >${cls}</button>
                <button
                  class="px-3 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition"
                  onclick="copyClass('${cls}')"
                  title="Copy"
                >📋</button>
              </div>`,
              )
              .join('')}
          </div>
        </details>`,
        )
        .join('')}
    </div>
  </div>

  <script>
    const preview = document.getElementById("previewText");
    const notice = document.getElementById("copyNotice");
    let lastSelected = null;

    window.applyAnimation = function(cls, btn) {
      const fullClass = "cssanimation " + cls;
      preview.className = "text-5xl font-bold animate-preview cssanimation";
      preview.classList.remove(cls);
      void preview.offsetWidth;
      preview.classList.add(cls);
      preview.addEventListener("animationend", function handler() {
        preview.classList.remove(cls);
        preview.removeEventListener("animationend", handler);
      });
      if (lastSelected) lastSelected.classList.remove("selected");
      btn.classList.add("selected");
      lastSelected = btn;
    };

    window.copyClass = function(cls) {
      const full = "cssanimation " + cls;
      navigator.clipboard.writeText(full).then(() => {
        notice.textContent = "Copied: " + full;
        notice.style.opacity = 1;
        setTimeout(() => (notice.style.opacity = 0), 2000);
      });
    };

    document.getElementById("filterInput").addEventListener("input", () => {
      const filter = filterInput.value.toLowerCase();
      document.querySelectorAll("[data-class]").forEach(el => {
        const name = el.dataset.class.toLowerCase();
        el.style.display = name.includes(filter) ? "" : "none";
      });
    });

    const toggleBtn = document.getElementById("toggleDark");
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
    }
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    });
  </script>
</body>
</html>`;

fs.writeFileSync(outputHtmlPath, html);
console.log(`✅ Generated demo.html with ${allClassNames.length} animations and categories from JSON.`);
