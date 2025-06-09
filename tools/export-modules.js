// tools/export-modules.js

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const sourceFile = path.resolve(__dirname, '../dist/cssanimation.css');
const outputDir = path.resolve(__dirname, '../src/modules'); // Output individual animation files here
const indexFile = path.join(outputDir, 'ca__modules-index.css'); // Index file to import all modules

// Common classes to add to every individual animation file
const commonClasses = `
.cssanimation {
  animation-duration: var(--cssanimation-duration, 1s);
  animation-fill-mode: var(--cssanimation-fill-mode, both);
}

.cssanimation span {
  display: var(--cssanimation-display, inline-block);
}

.infinite {
  animation-iteration-count: var(--cssanimation-infinite, infinite) !important;
}
`;

// Root CSS variables to add to every individual animation file
const rootCssVariables = `
:root {
  --cssanimation-duration: 1s;
  --cssanimation-fill-mode: both;
  --cssanimation-infinite: infinite;
  --cssanimation-backface-visibility: hidden;
  --cssanimation-transform-style: preserve-3d;
  --cssanimation-will-change: transform, opacity;
  --cssanimation-display: inline-block;
  --move-distance: -800px;
}
`;

// NEW: Predefined block for @media (prefers-reduced-motion: reduce)
const reducedMotionClasses = `
@media (prefers-reduced-motion: reduce) {
  .cssanimation,
  .cssanimation span {
    animation: none !important;
    transition: none !important;
  }
}
`;

// --- Ensure Output Directory Exists ---
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, {recursive: true});
}

// --- Read Source CSS ---
let cssContent = '';
try {
  cssContent = fs.readFileSync(sourceFile, 'utf-8');
} catch (error) {
  console.error(`❌ Error reading source CSS file at ${sourceFile}:`, error);
  process.exit(1);
}

// --- Regex to Extract Individual Animation Components ---
const classRuleRegex = /(\.ca__fx-([a-zA-Z0-9_-]+))\s*{([^}]*?)}/g;
const keyframesRuleRegex = /@keyframes\s+([a-zA-Z0-9_-]+)\s*{([\s\S]*?)}\s*(?=[.@]|@keyframes|$)/g;

const animationData = new Map(); // Map to store { baseName -> { classCode, keyframesCode } }

// --- Step 1: Extract all Class Rules ---
let match;
while ((match = classRuleRegex.exec(cssContent)) !== null) {
  const fullSelector = match[1];
  const baseName = match[2];
  const ruleContent = match[3];

  if (!animationData.has(baseName)) {
    animationData.set(baseName, {classCode: '', keyframesCode: ''});
  }
  animationData.get(baseName).classCode = `${fullSelector} {${ruleContent}}\n`;
}

// --- Step 2: Extract all Keyframes Rules ---
while ((match = keyframesRuleRegex.exec(cssContent)) !== null) {
  const keyframeName = match[1];
  const keyframeContent = match[2];

  if (!animationData.has(keyframeName)) {
    animationData.set(keyframeName, {classCode: '', keyframesCode: ''});
  }
  animationData.get(keyframeName).keyframesCode = `@keyframes ${keyframeName} {${keyframeContent}}\n`;
}

// --- Step 3: Generate Individual Module Files ---
const indexImports = [];

if (animationData.size === 0) {
  console.warn(`⚠️ No animations found in ${sourceFile} matching the pattern '.ca__fx-*' or '@keyframes'.`);
  process.exit(0);
}

for (const [baseName, data] of animationData.entries()) {
  if (data.classCode || data.keyframesCode) {
    const fullFileName = `ca__fx-${baseName}`;
    const cssFilePath = path.join(outputDir, `${fullFileName}.css`);

    // --- Module Content Assembly ---
    let moduleContent = `/*!
 * Module: ${baseName} Animation
 * Usage: <div class="cssanimation ${fullFileName}">Your Content</div>
 */
`;

    // NEW: Inject Stylelint disable/enable comments around the fixed blocks
    moduleContent += `/* stylelint-disable */\n`; // Disable linting here
    moduleContent += rootCssVariables;
    moduleContent += commonClasses;
    moduleContent += reducedMotionClasses; // Include the reduced motion media query here
    moduleContent += `/* stylelint-enable */\n`; // Enable linting here

    // Add the specific class rule (if found)
    if (data.classCode) {
      moduleContent += `\n${data.classCode}`;
    }

    // Add the keyframes rule (if found)
    if (data.keyframesCode) {
      moduleContent += `\n${data.keyframesCode}`;
    }

    // --- Write File ---
    fs.writeFileSync(cssFilePath, moduleContent.trim() + '\n');
    console.log(`✔ Created: ${cssFilePath}`);
    indexImports.push(`@import url('./${fullFileName}.css');`);
  }
}

// --- Step 4: Write Index File ---
fs.writeFileSync(indexFile, `${indexImports.join('\n')}\n`);
console.log(`\n📦 Index Created: ${indexFile} with ${indexImports.length} imports.`);
console.log(`\n✅ Individual animation modules exported successfully.`);
