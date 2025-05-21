module.exports = (opts = {}) => {
    const prefix = opts.prefix || 'ca__';
    const ignoreList = opts.ignore || [];

    return {
        postcssPlugin: 'postcss-classname-prefixer',
        Rule(rule) {
            rule.selectors = rule.selectors.map((selector) => {
                return selector.replace(
                    /\.(?!ca__)([a-zA-Z0-9_-]+)/g,
                    (match, className) => {
                        if (ignoreList.includes(className)) {
                            return `.${className}`; // Leave it untouched
                        }
                        return `.${prefix}${className}`;
                    },
                );
            });
        },
    };
};

module.exports.postcss = true;
