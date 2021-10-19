module.exports = api => {
    // Use isTest to determine what presets and plugins to use with jest
    const isTest = api.env('test');
    const presets = [];
    const plugins = [
        '@babel/plugin-proposal-optional-chaining'
    ];

    if (isTest) {
        plugins.push('@babel/plugin-transform-runtime');
    } else {
        api.cache(true);
    }

    // use for both test and dev/live
    presets.push('@babel/env');

    return {
        presets,
        plugins
    };
};
