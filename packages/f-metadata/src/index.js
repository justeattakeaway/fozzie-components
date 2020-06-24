import configureBraze from './configureBraze';
import noop from './utils/noop';
import isAppboyInitialised from './utils/isAppboyInitialised';

/**
 * sessionTimeoutInSeconds
 * Set session timeout to 0 in order to avoid caching issues with Braze
 * @type {number}
 */
export const sessionTimeoutInSeconds = 0;

/**
 * appBoyPromise
 * Promise that resolves to appboy when it has been set, for use by dependent utility functions
 * @type {Promise<Object>|null}
 */
let appBoyPromise;

export const initialise = async (options = {}) => {
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

    if (appBoyPromise) {
        await appBoyPromise;
        configureBraze(options);
        return appBoyPromise;
    }

    const isInitialised = await isAppboyInitialised(window.appboy);

    if (isInitialised) {
        configureBraze(options);
        appBoyPromise = Promise.resolve(window.appboy);
        return window.appboy;
    }

    if (disableComponent || !apiKey || !userId) {
        handleContentCards(null);
        appBoyPromise = Promise.resolve();
        return null;
    }

    try {
        const { default: appboy } = await import(/* webpackChunkName: "appboy-web-sdk" */ 'appboy-web-sdk');

        appboy.initialize(apiKey, { enableLogging, sessionTimeoutInSeconds });
        appboy.openSession();

        window.appboy = appboy;

        configureBraze(options);
        appBoyPromise = Promise.resolve(window.appboy);

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

const logEvent = async (type, payload) => {
    if (!appBoyPromise) return false;

    const appboy = await appBoyPromise;

    const output = appboy[type](payload, true);
    appboy.requestImmediateDataFlush();

    return output;
};

/**
 * @param {Object} card Content card for which to log a click event
 * @returns {Promise<boolean|*>}
 */
export const logCardClick = card => logEvent('logCardClick', card);

/**
 * @param {Object[]} cards List of content cards for which to log view impressions
 * @returns {Promise<boolean|*>}
 */
export const logCardImpressions = cards => logEvent('logCardImpressions', cards);

export default initialise;
