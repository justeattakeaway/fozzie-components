import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
    plugins: [
        createVuePlugin()
    ],

    build: {
        // target: 'es2015',
        lib: {
            entry: resolve(__dirname, 'src/components/MegaModal.vue'),
            name: 'f-mega-modal'
        },
        sourcemap: true
    },

    rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled into your library
        external: [
            // 'vue',
            // '@justeat/f-button',
            // 'body-scroll-lock'
            /node_modules/
        ]
        // output: {
        //     // Provide global variables to use in the UMD build
        //     // for externalized deps
        //     globals: {
        //         vue: 'Vue',
        //         '@justeat/f-button': '@justeat/f-button',
        //         'body-scroll-lock': 'body-scroll-lock'
        //     }
        // }
    }
});
