// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/cssanimation-gsap.js',
    output: {
        file: 'src/cssanimation-gsap.umd.js',
        format: 'umd',
        name: 'cssanimation-gsap',
        globals: {
            gsap: 'gsap',
        },
    },
    external: ['gsap'],
    plugins: [resolve(), commonjs()],
};
