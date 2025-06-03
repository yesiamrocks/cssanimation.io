const fs = require('fs');
const path = require('path');

const cssFilePath = path.resolve(__dirname, '../src/cssanimation-index.css');
const outputHtmlPath = path.resolve(__dirname, '../src/demo.html');

// Read CSS content
const css = fs.readFileSync(cssFilePath, 'utf-8');

// Extract all .ca__fx-* classes
const classNames = Array.from(new Set(css.match(/\.ca__fx-[a-zA-Z0-9_-]+/g) || [])).map((cls) => cls.slice(1)); // remove dot

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CA Animation Preview</title>
  <link rel="stylesheet" href="./cssanimation-index.css">
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
      background: #f9f9f9;
    }
    .animation-box {
      margin: 1rem 0;
      padding: 1rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: fit-content;
    }
      code, button {
      z-index:999;
      position:relative
      }
    .preview {
      display: inline-block;
      padding: 1rem 2rem;
      margin-right: 1rem;
      background: #eee;
      border: 1px dashed #ccc;
      font-weight: bold;
    }
    button {
      margin-left: 1rem;
      padding: 0.3rem 0.6rem;
      border: none;
      border-radius: 4px;
      background: #007bff;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <h1>cssanimation.io — Animation Gallery</h1>
  <p>Preview of all <code>ca__fx-*</code> animations. Click “Repeat” to replay each.</p>
  <div id="gallery">
    ${classNames
      .map((cls) => {
        const fullClass = `cssanimation ${cls}`;
        return `
<div class="animation-box">
  <div class="preview ${fullClass}" id="${cls}">${cls}</div>
  <code id="code-${cls}">${fullClass}</code>
  <button onclick="replay('${cls}')">Repeat</button>
  <button onclick="copyToClipboard('${cls}')">Copy</button>
</div>`;
      })
      .join('')}
  </div>

  <script>
    function replay(className) {
      const el = document.getElementById(className);
      el.classList.remove(className);
      void el.offsetWidth; // force reflow
      el.classList.add(className);
    }
      function copyToClipboard(id) {
    const text = document.getElementById("code-" + id).textContent;
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied: " + text);
    });
  }
  </script>
</body>
</html>`;

// Write HTML to file
fs.writeFileSync(outputHtmlPath, html);
console.log(`✅ Generated demo.html with ${classNames.length} animations.`);
