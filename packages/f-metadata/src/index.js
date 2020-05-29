const noop = () => {};

/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

const initialiseBraze = (options = {}) => new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('window is not defined'));

    const {
        apiKey = null,
        userId = null,
        enableLogging = false,
        disableComponent = false,
        callbacks = {}
    } = options;
    const {
        handleContentCards = noop,
        interceptInAppMessageClickEvents = noop,
        interceptInAppMessages = noop
    } = callbacks;

    if (disableComponent || !apiKey || !userId) {
        handleContentCards(null);
        return resolve(null);
    }

    window.dataLayer = window.dataLayer || [];

    return import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk')
        .then(({ default: appboy }) => {
            appboy.initialize(apiKey, { enableLogging, sessionTimeoutInSeconds });

            appboy.subscribeToInAppMessage(message => {
                if (message instanceof appboy.ab.InAppMessage) {
                    /**
                     * Always subscribe click action to second button
                     * as this is always "success" as opposed to "dismiss"
                     * as confirmed with CRM (AS)
                     */
                    const { buttons: { 1: button } } = message;
                    interceptInAppMessages(message);
                    button.subscribeToClickedEvent(() => interceptInAppMessageClickEvents(message));
                }
                appboy.display.showInAppMessage(message);
            });
            appboy.subscribeToContentCardsUpdates(handleContentCards);

            appboy.openSession();
            window.appboy = appboy;

            appboy.changeUser(userId, () => {
                window.dataLayer.push({
                    event: 'appboyReady'
                });
            });

            appboy.requestContentCardsRefresh();

            resolve(appboy);
        })
        .catch(error => reject(new Error(`An error occurred while loading the component: ${error}`)));
});

export default initialiseBraze;
