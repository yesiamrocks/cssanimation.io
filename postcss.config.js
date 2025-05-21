module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-preset-env')(),
        require('./postcss/classname-prefixer')({
            prefix: 'ca__',
            ignore: ['cssanimation', 'infinite'],
        }),
    ],
};
