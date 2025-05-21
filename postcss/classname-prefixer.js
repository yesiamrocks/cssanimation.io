// postcss/classname-prefixer.js
module.exports = (opts = {}) => {
    const prefix = opts.prefix || 'ca__';

    return {
        postcssPlugin: 'postcss-classname-prefixer',
        Rule(rule) {
            rule.selectors = rule.selectors.map((selector) => {
                return selector.replace(
                    /\.(?!ca__)([a-zA-Z0-9_-]+)/g,
                    `.${prefix}$1`,
                );
            });
        },
    };
};

module.exports.postcss = true;