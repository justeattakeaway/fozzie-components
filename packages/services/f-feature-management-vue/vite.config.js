import path from 'path';

export default {
    build: {
        target: 'es2015',
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'f-feature-management-vue'
        },
        sourcemap: true,
        rollupOptions: {
            external: ['vue', 'f-feature-management'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'vue',
                    'f-feature-management': 'f-feature-management'
                }
            }
        }
    }
};
