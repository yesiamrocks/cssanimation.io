const fs = require('fs');
const path = require('path');

// List of CSS and JS distribution files to scan for class names
const files = [
    'dist/cssanimation.css',
    'dist/cssanimation-utility.css',
    'dist/cssanimation-gsap.js',
];

// Regular expression to match general utility/animation classes that start with `.ca__` but NOT `.ca__le`
const generalClassRegex = /(?:\.)(ca__(?!le)[a-zA-Z0-9_-]+)/g;

// Regular expression to match only letter animation classes that start with `.ca__le`
const letterClassRegex = /(?:\.)(ca__le[a-zA-Z0-9_-]+)/g;

// Object to store matched classes grouped by file
const groupedClasses = {};

// Set to store all `.ca__le*` letter animation classes globally
const letterClasses = new Set();

// Iterate over each file to extract class names
files.forEach((filePath) => {
    const absPath = path.resolve(filePath); // Get absolute path of the file
    const content = fs.readFileSync(absPath, 'utf8'); // Read file contents as text
    const fileName = path.basename(filePath); // Get file name (e.g., cssanimation.css)

    // Initialize set for this file
    groupedClasses[fileName] = new Set();

    // Match and store general utility or animation classes (excluding .ca__le*)
    let match;
    while ((match = generalClassRegex.exec(content)) !== null) {
        groupedClasses[fileName].add(`.${match[1]}`); // Add with leading dot for consistency
    }

    // Match and store all letter animation classes globally
    while ((match = letterClassRegex.exec(content)) !== null) {
        letterClasses.add(`.${match[1]}`);
    }
});

// Start building the Markdown output for class reference
let output = '# cssanimation.io – Animation Class Reference\n\n';

// Loop over each file’s extracted class names
for (const [file, classSet] of Object.entries(groupedClasses)) {
    output += `## ${file}\n`;

    // Sort and format class names as bullet list
    const sorted = Array.from(classSet).sort();
    sorted.forEach((className) => {
        output += `- \`${className}\`\n`;
    });
    output += '\n';

    // Insert the Letter Animation Classes section after cssanimation.css
    if (file === 'cssanimation.css' && letterClasses.size > 0) {
        output += '## Letter Animations Class\n';

        // Sort and format letter animation class list
        const sortedLetters = Array.from(letterClasses).sort();
        sortedLetters.forEach((cls) => {
            output += `- \`${cls}\`\n`;
        });
        output += '\n';
    }
}

// Output file location
const outPath = './docs/cssanimation-reference.md';

// Write final Markdown output to disk
fs.writeFileSync(outPath, output, 'utf8');

// Log confirmation
console.log(`✅ Grouped class reference saved to ${outPath}`);
