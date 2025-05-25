module.exports = {
    plugins: [
        require('./postcss/prefixer'),
        require('postcss-preset-env'),
        ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
    ],
};
