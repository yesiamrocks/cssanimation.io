const fs = require('fs');
const path = require('path');

// Files to scan
const files = [
    'dist/cssanimation.css',
    'dist/cssanimation-utility.css',
    'dist/cssanimation-gsap.js',
];

// Regex to match class names in both CSS and JS selectors
const classNameRegex = /(?:\.)(ca__[a-zA-Z0-9_-]+)/g;

const groupedClasses = {};

files.forEach((filePath) => {
    const absPath = path.resolve(filePath);
    const content = fs.readFileSync(absPath, 'utf8');
    const fileName = path.basename(filePath);

    groupedClasses[fileName] = new Set();

    let match;
    while ((match = classNameRegex.exec(content)) !== null) {
        const className = match[1];
        groupedClasses[fileName].add(`.${className}`);
    }
});

// Build Markdown output with bullet points
let output = '# cssanimation.io – Animation Class Reference\n\n';

for (const [file, classSet] of Object.entries(groupedClasses)) {
    output += `## ${file}\n`;
    const sorted = Array.from(classSet).sort();
    sorted.forEach((className) => {
        output += `- \`${className}\`\n`;
    });
    output += '\n';
}

fs.writeFileSync('./docs/cssanimation-reference.md', output, 'utf8');
console.log('✅ Grouped class reference saved to cssanimation-reference.md');
