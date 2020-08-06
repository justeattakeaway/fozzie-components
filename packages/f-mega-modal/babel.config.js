module.exports = api => {
    // Use isTest to determine what presets and plugins to use with jest
    const isTest = api.env('test');
    const presets = [];
    const plugins = [
        '@babel/plugin-proposal-optional-chaining'
    ];
    const builtIns = (api.env('development') ? 'entry' : false);

    if (!isTest) {
        api.cache(true);
        presets.push(['@vue/app', { useBuiltIns: builtIns }]);
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
