import path from 'path';

export default {
    build: {
        target: 'es2015',
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'core-analytics'
        },
        sourcemap: true
    }
};
