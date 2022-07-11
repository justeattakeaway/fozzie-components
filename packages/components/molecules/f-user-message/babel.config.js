module.exports = api => {
    // Use isTest to determine what presets and plugins to use with jest
    const presets = [];
    const plugins = [
        '@babel/plugin-proposal-optional-chaining'
    ];
    const builtIns = (api.env('development') ? 'entry' : false);

    api.cache(true);
    presets.push(['@vue/app', { useBuiltIns: builtIns }]);

    // use for both test and dev/live
    presets.push(['@babel/env', { targets: { node: 'current' } }]);

    return {
        presets,
        plugins
    };
};
