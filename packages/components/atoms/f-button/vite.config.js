import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

const rootDir = join(__dirname, '..', '..');
const sassOptions = require('../../../../config/sassOptions')(rootDir);

export default defineConfig({
    plugins: [
        createVuePlugin()
    ],

    css: {
        preprocessorOptions: {
            scss: {
                ...sassOptions,
                additionalData: `
                    @use "sass:math";
                    @use "../assets/scss/common.scss";
                `
            }
        }
    },

    build: {
        target: 'es2015',
        lib: {
            entry: resolve(__dirname, 'src/components/Button.vue'),
            name: 'f-button'
        },
        sourcemap: true
    }
});
