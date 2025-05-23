const fs = require('fs');
const path = require('path');

// Input files to scan
const files = [
    'dist/cssanimation.css',
    'dist/cssanimation-utility.css',
    'dist/cssanimation-gsap.js',
];

// Optional titles for ungrouped fallback
const sectionTitles = {
    'cssanimation.css': 'Core Animation Classes',
    'cssanimation-utility.css': 'Utility Classes',
    'cssanimation-gsap.js': 'GSAP Integration Classes',
};

// Load grouped class descriptions
const groupedDescPath = path.resolve(__dirname, 'class-descriptions.json');
let groupedDescriptions = {};
try {
    groupedDescriptions = JSON.parse(fs.readFileSync(groupedDescPath, 'utf8'));
} catch (error) {
    console.warn('⚠️ Could not load class-descriptions.json');
}

// Regex to capture any .ca__class
const generalClassRegex = /(?:\.)(ca__[a-zA-Z0-9_-]+)/g;
const discoveredClasses = new Set();

// Step 1: Discover all classes
files.forEach((filePath) => {
    const absPath = path.resolve(filePath);
    const content = fs.readFileSync(absPath, 'utf8');
    let match;
    while ((match = generalClassRegex.exec(content)) !== null) {
        discoveredClasses.add(match[1]); // store without dot
    }
});

// Step 2: Separate groupings into main and utility types
let output = '# cssanimation.io – Animation Class Reference\n\n';
const utilityGroupNames = [];
const animationGroupNames = [];

for (const groupName of Object.keys(groupedDescriptions)) {
    const isUtility = /utility|utilities|control/i.test(groupName);
    if (isUtility) {
        utilityGroupNames.push(groupName);
    } else {
        animationGroupNames.push(groupName);
    }
}

// Step 3: Render grouped animation-related sections first
[...animationGroupNames, ...utilityGroupNames].forEach((groupName) => {
    const classMap = groupedDescriptions[groupName];
    const included = Object.entries(classMap).filter(([className]) =>
        discoveredClasses.has(className),
    );
    if (included.length) {
        output += `## ${groupName}\n`;
        included.forEach(([className, description]) => {
            output += `- \`${className}\` — ${description}\n`;
        });
        output += '\n';
    }
});

// Step 4: Fallback for ungrouped classes from scanned files
for (const filePath of files) {
    const fileName = path.basename(filePath);
    const sectionTitle = sectionTitles[fileName] || fileName;
    const absPath = path.resolve(filePath);
    const content = fs.readFileSync(absPath, 'utf8');

    const unmatched = new Set();
    let match;
    while ((match = generalClassRegex.exec(content)) !== null) {
        const className = match[1];
        const isGrouped = Object.values(groupedDescriptions).some(
            (group) => className in group,
        );
        if (!isGrouped) {
            unmatched.add(className);
        }
    }

    if (unmatched.size > 0) {
        output += `## ${sectionTitle} (Ungrouped)\n`;
        Array.from(unmatched)
            .sort()
            .forEach((className) => {
                output += `- \`${className}\`\n`;
            });
        output += '\n';
    }
}

// Step 5: Write output
const outPath = './docs/cssanimation-reference.md';
fs.writeFileSync(outPath, output, 'utf8');
console.log(`✅ Class reference with grouped descriptions saved to ${outPath}`);
