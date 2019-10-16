const initialiseBraze = (options = {
    apiKey: null,
    enableLogging: false,
    disableComponent: false,
    callbacks: {
        handleContentCards: null
    }
}) => {
    if (typeof window !== 'undefined') {
        if (!options.disableComponent) {
            import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk')
                .then(({ default: appboy }) => {
                    appboy.initialize(options.apiKey, { enableLogging: options.enableLogging });
                    appboy.display.automaticallyShowNewInAppMessages();
                    appboy.openSession();

                    if (options.callbacks.handleContentCards) {
                        appboy.subscribeToContentCardsUpdates(options.callbacks.handleContentCards);
                    }

                    appboy.requestContentCardsRefresh();
                })
                .catch(error => `An error occurred while loading the component: ${error}`);
        }
    }
};

export default initialiseBraze;
