module.exports = () => {
    // Use isTest to determine what presets and plugins to use with jest
    const presets = [];
    const plugins = [];

    presets.push(['poi/babel', { jsx: 'vue' }]);

    return {
        plugins,
        presets
    };
};
