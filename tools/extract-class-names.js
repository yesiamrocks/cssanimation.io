const fs = require('fs');
const path = require('path');

const files = [
    'dist/cssanimation.css',
    'dist/cssanimation-utility.css',
    'dist/cssanimation-gsap.js',
];

const classNameRegex = /\.([a-zA-Z0-9_-]+)/g;
const groupedClasses = {};

files.forEach((filePath) => {
    const absPath = path.resolve(filePath);
    const content = fs.readFileSync(absPath, 'utf8');

    const fileName = path.basename(filePath);
    groupedClasses[fileName] = new Set();

    let match;
    while ((match = classNameRegex.exec(content)) !== null) {
        const className = match[1];
        if (!className.startsWith('ca__')) continue;
        groupedClasses[fileName].add(`.${className}`);
    }
});

// Build markdown output
let output = '# Class Name Reference by File\n\n';

for (const [file, classSet] of Object.entries(groupedClasses)) {
    output += `## ${file}\n`;
    const sorted = Array.from(classSet).sort();
    for (const className of sorted) {
        output += `- \`${className}\`\n`;
    }
    output += '\n';
}

fs.writeFileSync('cssanimation-reference.md', output, 'utf8');
console.log('✅ Grouped class reference saved to cssanimation-reference.md');
