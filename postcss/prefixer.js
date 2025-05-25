module.exports = () => {
    return {
        postcssPlugin: 'cssanimation-prefixer',
        Rule(rule) {
            // These exact selectors should be skipped
            const skipExact = new Set([
                '.cssanimation',
                '.cssanimation span',
                '.infinite',
            ]);

            rule.selectors = rule.selectors.map((selector) => {
                // If the full selector matches a known skip value, skip processing it
                if (skipExact.has(selector.trim())) {
                    return selector;
                }

                return selector.replace(
                    /\.(?!ca__)([a-zA-Z0-9_-]+)/g,
                    (_, className) => {
                        const filename = rule.source?.input?.file ?? '';

                        // Skip specific class names no matter where they appear
                        if (['cssanimation', 'infinite'].includes(className)) {
                            return `.${className}`;
                        }

                        // Utility CSS: prefix all with ca__u-
                        if (filename.includes('cssanimation-utility.css')) {
                            return `.ca__u-${className}`;
                        }

                        // Letter animation: le* -> ca__lt-[suffix]
                        if (className.startsWith('le')) {
                            return `.ca__lt-${className.replace(/^le/, '')}`;
                        }

                        // All other: ca__fx-[className]
                        return `.ca__fx-${className}`;
                    },
                );
            });
        },
    };
};

module.exports.postcss = true;
