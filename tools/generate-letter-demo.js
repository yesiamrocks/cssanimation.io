const fs = require('fs');
const path = require('path');

const outputHtmlPath = path.resolve(__dirname, '../src/letter-demo.html');

const demoItems = [
  {
    title: 'Letter-by-Letter: Sequence',
    markup: `<h1 class="cssanimation" ca__lt-sequence="ca__fx-FadeIn">Letters in order</h1>`,
    attribute: 'ca__lt-sequence="ca__fx-FadeIn"',
  },
  {
    title: 'Letter-by-Letter: Random',
    markup: `<p class="cssanimation" ca__lt-random="ca__fx-BounceInTop">Randomized entry!</p>`,
    attribute: 'ca__lt-random="ca__fx-BounceInTop"',
  },
  {
    title: 'Letter-by-Letter: Reverse',
    markup: `<h3 class="cssanimation" ca__lt-reverse="ca__fx-MoveFromTop">Backwards Flow</h3>`,
    attribute: 'ca__lt-reverse="ca__fx-MoveFromTop"',
  },
  {
    title: 'Word-by-Word Animation',
    markup: `<h2 class="cssanimation" ca__lt-word="ca__fx-FadeIn">Each word animates uniquely</h2>`,
    attribute: 'ca__lt-word="ca__fx-FadeIn"',
  },
  {
    title: 'Line-by-Line Animation',
    markup: `<p class="cssanimation" ca__lt-line="ca__fx-FadeIn">
      First line<br />
      Second line<br />
      Third line
    </p>`,
    attribute: 'ca__lt-line="ca__fx-FadeIn"',
  },
];

// HTML content
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Letter & Word Animation Preview</title>
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
    .animation-box code, button {
      z-index: 999;
      position: relative;
    }
    .animation-box .preview {
      display: block;
      margin-bottom: 0.5rem;
    }
    button {
      margin-right: 0.5rem;
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
  <h1>cssanimation.io — Letter & Word Animation Modes</h1>
  <p>Preview of animations using <code>ca__lt-*</code> attributes.</p>
  <div id="gallery">
    ${demoItems
      .map(({title, markup, attribute}, idx) => {
        const id = `demo-${idx}`;
        return `
<div class="animation-box">
  <div class="preview" id="${id}">${markup}</div>
  <code id="code-${id}">${markup.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code><br/>
  <button onclick="replay('${id}')">Repeat</button>
  <button onclick="copyToClipboard('${id}')">Copy</button>
</div>`;
      })
      .join('')}
  </div>

  <script>
    function replay(id) {
      const box = document.getElementById(id);
      const html = box.innerHTML;
      box.innerHTML = html; // Reset content to replay
    }
    function copyToClipboard(id) {
      const text = document.getElementById("code-" + id).textContent;
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied: " + text);
      });
    }
  </script>
  <script src="./ca-letteranimation.js"></script>
</body>
</html>`;

// Write file
fs.writeFileSync(outputHtmlPath, html);
console.log(`✅ Generated letter-demo.html with ${demoItems.length} examples.`);
