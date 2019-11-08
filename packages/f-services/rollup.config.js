import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        // commonjs (node)/es module config
        {
            file: pkg.main,
            format: 'umd',
            name: 'f-services'
        },
        { file: pkg.module, format: 'es' }
    ],
    plugins: [
        resolve(),
        commonjs({
            include: /node_modules/
        }),
        terser(),
        babel({
            exclude: ['node_modules/**']
        })
    ]
};
