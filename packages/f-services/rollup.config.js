import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        // commonjs (node)/es module config
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' },

        // browser package config
        {
            file: pkg.browser,
            format: 'umd',
            name: 'f-services'
        }
    ],
    plugins: [
        terser(),
        babel({
            exclude: ['node_modules/**']
        })
    ]
};
