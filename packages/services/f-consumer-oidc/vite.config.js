import path from 'path';

export default {
    build: {
        target: 'es2015',
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'f-consumer-oidc'
        },
        sourcemap: true,
        rollupOptions: {
            external: ['js-cookie'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    'js-cookie': 'js-cookie'
                }
            }
        }
    }
};
