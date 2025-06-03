const fs = require('fs');
const path = require('path');

const animationsDir = path.resolve(__dirname, '../src/animations');
const outputFile = path.resolve(animationsDir, 'ca__index.css');

// All CSS files in the folder
let files = fs.readdirSync(animationsDir).filter((file) => file.endsWith('.css') && file !== 'ca__index.css');

// Always put these at the top (if they exist)
const pinnedFiles = ['ca__vars.css', 'ca__base.css'];
const pinnedImports = pinnedFiles.filter((f) => files.includes(f));
files = files.filter((f) => !pinnedFiles.includes(f));

// Sort remaining files
files.sort();

// Final list: pinned files first, then sorted others
const allImports = [...pinnedImports, ...files];

// Build CSS content
const header = `/* Auto-generated index of all CA animations */\n\n`;
const imports = allImports.map((file) => `@import './${file}';`).join('\n');

fs.writeFileSync(outputFile, header + imports + '\n');
console.log(`✅ Generated ca__index.css with ${allImports.length} imports.`);
