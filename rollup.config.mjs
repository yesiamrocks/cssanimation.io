// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser'; // ✅ Correct for ESM usage

export default [
    // Unminified UMD bundle with sourcemap
    {
        input: 'src/cssanimation-gsap.js',
        output: {
            file: 'dist/cssanimation-gsap.umd.js',
            format: 'umd',
            name: 'cssanimation-gsap',
            sourcemap: true,
            globals: {
                gsap: 'gsap',
            },
        },
        external: ['gsap'],
        plugins: [resolve(), commonjs()],
    },

    // Minified UMD bundle with sourcemap
    {
        input: 'src/cssanimation-gsap.js',
        output: {
            file: 'dist/cssanimation-gsap.umd.min.js',
            format: 'umd',
            name: 'cssanimation-gsap',
            sourcemap: true,
            globals: {
                gsap: 'gsap',
            },
        },
        external: ['gsap'],
        plugins: [resolve(), commonjs(), terser()],
    },

    // ESM bundle
    {
        input: 'src/cssanimation-gsap.js',
        output: {
            file: 'dist/cssanimation-gsap.esm.js',
            format: 'esm',
            sourcemap: true,
        },
        external: ['gsap'],
        plugins: [resolve(), commonjs()],
    },
];
