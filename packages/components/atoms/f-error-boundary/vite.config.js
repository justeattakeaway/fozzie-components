import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
    plugins: [
        createVuePlugin()
    ],

    build: {
        target: 'es2015',
        lib: {
            entry: resolve(__dirname, 'src/components/ErrorBoundary.vue'),
            name: 'f-error-boundary'
        },
        sourcemap: true
    }
});
