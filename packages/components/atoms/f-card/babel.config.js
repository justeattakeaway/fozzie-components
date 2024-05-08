module.exports = api => {
    // Use `isTest` to determine what presets and plugins to use with jest
    const isTest = api.env('test');
    const presets = [];
    const builtIns = (api.env('development') ? 'entry' : false);

    if (!isTest) {
        api.cache(true); // Caches the computed babel config function – https://babeljs.io/docs/en/config-files#apicache
        presets.push(['@vue/app', { useBuiltIns: builtIns }]);
    } else {
        // use current node version for transpiling test files
        presets.push(['@babel/env', { targets: { node: 'current' } }]);
    }

    return {
        presets
    };
};
