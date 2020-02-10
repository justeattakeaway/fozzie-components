const initialiseBraze = (options = {}) => {
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        const {
            apiKey = null,
            userId = null,
            enableLogging = false,
            disableComponent = false,
            callbacks = {}
        } = options;
        const { handleContentCards = null } = callbacks;

        if (!disableComponent) {
            import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk')
                .then(({ default: appboy }) => {
                    if (apiKey && apiKey.length && userId && userId.length) {
                        appboy.initialize(apiKey, { enableLogging });

                        appboy.display.automaticallyShowNewInAppMessages();

                        appboy.openSession();
                        window.appboy = appboy;

                        appboy.changeUser(userId, () => {
                            window.dataLayer.push({
                                event: 'appboyReady'
                            });
                        });

                        appboy.requestContentCardsRefresh();

                        appboy.subscribeToContentCardsUpdates(contentCards => {
                            if (contentCards
                                && contentCards.cards.length
                                && options.callbacks.handleContentCards) {
                                options.callbacks.handleContentCards(contentCards);
                            }
                        });
                    }
                })
                .catch(error => `An error occurred while loading the component: ${error}`);
        }
    }
};

export default initialiseBraze;
