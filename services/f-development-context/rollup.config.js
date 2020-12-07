import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'f-development-context'
        },
        { file: pkg.module, format: 'es' }
    ],
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs({
            include: /node_modules/
        }),
        terser(),
        babel({
            exclude: ['node_modules/**']
        }),
        json()
    ]
};
