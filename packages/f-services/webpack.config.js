const path = require('path');

module.exports = {
    entry: {
        main: [
            '@babel/polyfill',
            './src/index.js'
        ]
    },
    mode: 'development',
    output: {
        filename: 'demo.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
};
