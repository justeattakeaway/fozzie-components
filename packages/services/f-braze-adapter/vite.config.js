// vite.config.js
const path = require('path');

module.exports = {
    build: {
        target: 'es2015',
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'f-braze-adapter'
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['@braze/web-sdk'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    '@braze/web-sdk': 'appboy'
                }
            }
        }
    }
};
