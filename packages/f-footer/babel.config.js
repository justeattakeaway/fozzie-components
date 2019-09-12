module.exports = api => {
    // Use isTest to determine what presets and plugins to use with jest
    const isTest = api.env('test');
    const isSettings = api.env('settings');
    const presets = [];
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        'transform-dynamic-import'
    ];

    if (!isTest && !isSettings) {
        api.cache(true);
        presets.push(['@vue/app']);
    }

    // use for both test and dev/live
    presets.push('@babel/env');

    return {
        presets,
        plugins
    };
};
