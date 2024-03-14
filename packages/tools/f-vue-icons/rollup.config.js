const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = [
    {
        input: ['icons/index.js'],
        output: {
            exports: 'named',
            dir: 'esm',
            format: 'esm',
            name: '@justeattakeaway/f-vue-icons',
            preserveModulesRoot: 'icons',
            entryFileNames: '[name].mjs',
            preserveModules: true
        },
        plugins: [
            nodeResolve(),
            commonjs()
        ]
    },
    {
        input: ['icons/index.js'],
        output: {
            exports: 'named',
            dir: 'dist',
            format: 'cjs',
            name: '@justeattakeaway/f-vue-icons',
            preserveModulesRoot: 'icons',
            entryFileNames: '[name].cjs',
            preserveModules: true
        },
        plugins: [
            nodeResolve(),
            commonjs()
        ]
    }
];
