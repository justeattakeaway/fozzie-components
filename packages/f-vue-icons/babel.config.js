module.exports = api => {
    // Use isTest to determine what presets and plugins to use with jest
    const isTest = api.env('test');
    const presets = [];
    const plugins = [];

    if (!isTest) {
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
