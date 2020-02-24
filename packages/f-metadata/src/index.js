const noop = () => {};

const initialiseBraze = (options = {}) => new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('window is not defined'));

    const {
        apiKey = null,
        userId = null,
        enableLogging = false,
        disableComponent = false,
        callbacks = {}
    } = options;
    const { handleContentCards = noop } = callbacks;

    if (disableComponent) return resolve(null);

    window.dataLayer = window.dataLayer || [];

    return import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk')
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

                appboy.subscribeToContentCardsUpdates(handleContentCards);

                resolve(appboy);
            }
        })
        .catch(error => reject(new Error(`An error occurred while loading the component: ${error}`)));
});

export default initialiseBraze;
