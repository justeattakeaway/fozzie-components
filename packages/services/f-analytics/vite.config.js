import path from 'path';

export default {
    build: {
        target: 'es2015',
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'f-analytics'
        },
        sourcemap: true
    },
    test: {
        dir: '.',
        environment: 'jsdom',
        globals: true,
        include: [
            './src/services/_tests/**/*.{spec,test}.{js,ts}'
        ],
        exclude: ['**/node_modules/**']
    }
};
