module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    pluginOptions: {
        prerenderSpa: {
            registry: undefined,
            renderRoutes: [
                '/'
            ],
            useRenderEvent: true,
            headless: true,
            onlyProduction: true
        }
    }
};
