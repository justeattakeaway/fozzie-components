const initialiseBraze = (apiKey, enableLogging = false, disableComponent = false) => {
    if (typeof window !== 'undefined') {
        if (!disableComponent) {
            import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk')
                .then(({ default: appboy }) => {
                    appboy.initialize(apiKey, { enableLogging });
                    appboy.display.automaticallyShowNewInAppMessages();
                    appboy.openSession();
                })
                .catch(error => `An error occurred while loading the component: ${error}`);
        }
    }
};

export default initialiseBraze;
