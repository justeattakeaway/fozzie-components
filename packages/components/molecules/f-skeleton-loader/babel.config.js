module.exports = api => {
    // Use `isTest` to determine what presets and plugins to use with jest
    const isTest = api.env('test');
    const presets = [];
    const plugins = [
        '@babel/plugin-proposal-optional-chaining' // https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
    ];
    const builtIns = (api.env('development') ? 'entry' : false);

    if (!isTest) {
        api.cache(true); // Caches the computed babel config function – https://babeljs.io/docs/en/config-files#apicache
        presets.push(['@vue/app', { useBuiltIns: builtIns }]);
        // Alias for @babel/preset-env
        // Hooks into browserslist to provide smart Babel transforms
        // https://babeljs.io/docs/en/babel-preset-env
        presets.push('@babel/env');
    } else {
        // use current node version for transpiling test files
        presets.push(['@babel/env', { targets: { node: 'current' } }]);
    }

    return {
        presets,
        plugins
    };
};
