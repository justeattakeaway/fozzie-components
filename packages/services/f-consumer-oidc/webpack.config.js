const path = require('path');

module.exports = [
    'source-map'
].map(devtool => ({
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'f-consumer-oidc.js',
        library: 'f-consumer-oidc',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    externals: {
        'js-cookie': 'js-cookie'
    },
    devtool
}));
