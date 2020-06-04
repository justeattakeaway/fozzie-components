import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        { dir: 'dist', format: 'esm' }
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
