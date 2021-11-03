import { resolve } from 'path';
import { createVuePlugin } from 'vite-plugin-vue2';

export default {
    plugins: [
        createVuePlugin()
    ],

    build: {
        target: 'es2015',
        lib: {
            entry: resolve(__dirname, 'src/ErrorBoundary.vue'),
            name: 'f-error-boundary'
        },
        sourcemap: true
    }
};
