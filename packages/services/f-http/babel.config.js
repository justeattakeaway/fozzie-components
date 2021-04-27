module.exports = api => {
    // Use isTest to determine what presets and plugins to use with jest
    const isTest = api.env('test');
    const presets = [];
    const plugins = [
        '@babel/plugin-proposal-optional-chaining'
    ];

    if (isTest) {
        plugins.push('dynamic-import-node'); // to support dynamic imports (and webpack dynamic imports) when running unit tests
        presets.push(['@babel/env', { targets: { node: 'current' } }]);
    } else {
        api.cache(true);
        presets.push('@babel/env');
    }

    return {
        presets,
        plugins
    };
};
