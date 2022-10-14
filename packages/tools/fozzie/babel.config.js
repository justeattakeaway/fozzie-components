module.exports = api => {
    const isTest = api.env('test');
    const plugins = [];
    const presets = [];

    if (!isTest) {
        api.cache(true);
        presets.push('@babel/env');
    } else {
        // use current node version for transpiling test files
        presets.push(['@babel/env', { targets: { node: 'current' } }]);
    }

    return {
        plugins,
        presets
    };
};
