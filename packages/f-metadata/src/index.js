import configureBraze from './configureBraze';
import noop from './utils/noop';
import isAppboyInitialised from './utils/isAppboyInitialised';


/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

const initialise = (options = {}) => new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('window is not defined'));

    const {
        apiKey,
        userId,
        disableComponent = false,
        callbacks = {},
        enableLogging
    } = options;
    const { handleContentCards = noop } = callbacks;

    if (disableComponent || !apiKey || !userId) {
        handleContentCards(null);
        return resolve(null);
    }

    window.dataLayer = window.dataLayer || [];

    if (isAppboyInitialised(window.appboy)) {
        configureBraze(options);
        return resolve(window.appboy);
    }

    return import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk')
        .then(({ default: appboy }) => {
            appboy.initialize(apiKey, { enableLogging, sessionTimeoutInSeconds });
            appboy.openSession();

            window.appboy = appboy;

            configureBraze(options);

            appboy.changeUser(userId, () => {
                window.dataLayer.push({
                    event: 'appboyReady'
                });
            });

            resolve(appboy);
        })
        .catch(error => reject(new Error(`An error occurred while loading the component: ${error}`)));
});

export default initialise;
