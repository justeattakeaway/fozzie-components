import configureBraze from './configureBraze';
import noop from './utils/noop';
import isAppboyInitialised from './utils/isAppboyInitialised';


/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

const initialise = async (options = {}) => {
    if (typeof window === 'undefined') throw new Error('window is not defined');

    const {
        apiKey,
        userId,
        disableComponent = false,
        callbacks = {},
        enableLogging
    } = options;
    const { handleContentCards = noop } = callbacks;

    window.dataLayer = window.dataLayer || [];

    const isInitialised = await isAppboyInitialised(window.appboy);

    if (isInitialised) {
        configureBraze(options);
        return window.appboy;
    }

    if (disableComponent || !apiKey || !userId) {
        handleContentCards(null);
        return null;
    }

    try {
        const { default: appboy } = await import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk');

        appboy.initialize(apiKey, { enableLogging, sessionTimeoutInSeconds });
        appboy.openSession();

        window.appboy = appboy;

        configureBraze(options);

        appboy.changeUser(userId, () => {
            window.dataLayer.push({
                event: 'appboyReady'
            });
        });

        return appboy;
    } catch (error) {
        throw new Error(`An error occurred while loading the component: ${error}`);
    }
};

export default initialise;
