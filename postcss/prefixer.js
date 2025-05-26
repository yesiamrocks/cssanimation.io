module.exports = () => {
    return {
        postcssPlugin: 'cssanimation-prefixer',
        Rule(rule) {
            // Exact selectors that should be left untouched
            const skipExact = new Set([
                '.cssanimation',
                '.cssanimation span',
                '.infinite',
            ]);

            // Converts class name to PascalCase
            const toPascalCase = (str) => {
                return str
                    .replace(/[-_]+/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                    .replace(/\s+/g, '');
            };

            rule.selectors = rule.selectors.map((selector) => {
                // Skip selectors that match the full string exactly
                if (skipExact.has(selector.trim())) {
                    return selector;
                }

                return selector.replace(
                    /\.(?!ca__)([a-zA-Z0-9_-]+)/g,
                    (_, className) => {
                        const filename = rule.source?.input?.file ?? '';

                        // Skip common class exclusions
                        if (['cssanimation', 'infinite'].includes(className)) {
                            return `.${className}`;
                        }

                        // Utility CSS: apply ca__u- prefix
                        if (filename.includes('cssanimation-utility.css')) {
                            return `.ca__u-${toPascalCase(className)}`;
                        }

                        // Letter animation: le* ➝ ca__lt-[PascalCase]
                        if (className.startsWith('le')) {
                            return `.ca__lt-${toPascalCase(className.replace(/^le/, ''))}`;
                        }

                        // All other CSS animation classes ➝ ca__fx-[PascalCase]
                        return `.ca__fx-${toPascalCase(className)}`;
                    },
                );
            });
        },
    };
};

module.exports.postcss = true;
