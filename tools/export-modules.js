const fs = require('fs');
const path = require('path');

const sourceFile = 'dist/cssanimation.css';
const outputDir = 'src/modules';
const indexFile = path.join(outputDir, 'ca__index.css');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const css = fs.readFileSync(sourceFile, 'utf-8');

// Regex to split by comment blocks
const blockRegex = /\/\*{5,}\s*([\s\S]*?)\s*\*{5,}\/([\s\S]*?)(?=\/\*{5,}|$)/g;

// Utility: Convert "letter fade in" → "LetterFadeIn"
const toPascalCase = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

let match;
const indexImports = [];

while ((match = blockRegex.exec(css)) !== null) {
    const rawTitle = match[1].trim();
    const blockContent = match[2].trim();

    const pascalTitle = toPascalCase(rawTitle); // e.g., LetterFadeIn
    const baseFileName = `ca__${pascalTitle}`;
    const cssFilePath = path.join(outputDir, `${baseFileName}.css`);

    // Metadata comment
    const metaHeader = `/**
 * Module: ${rawTitle}
 * Filename: ${baseFileName}.css
 * Description: This animation block was auto-exported from cssanimation.css
 * Usage:
 *   <div class="${baseFileName}">Your Text</div>
 */
`;

    fs.writeFileSync(cssFilePath, `${metaHeader}\n${blockContent}\n`);
    console.log(`✔ Created: ${cssFilePath}`);

    indexImports.push(`@import './${baseFileName}.css';`);
}

// Write ca__index.css with all imports
fs.writeFileSync(
    indexFile,
    `/* Auto-generated index of all CA modules */\n\n${indexImports.join('\n')}\n`,
);
console.log(`\n📦 Index Created: ${indexFile}`);
console.log(`\n✅ Modules exported in PascalCase with metadata.`);
