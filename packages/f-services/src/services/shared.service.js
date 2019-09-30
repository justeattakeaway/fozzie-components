import { throttle } from 'lodash-es';

/**
 * @overview Shared Service
 *
 * @module shared/service
 */

/**
 * Returns the locale for translation localization
 *
 * @param {tenantConfigs} object of localization strings.
 * @param {tenantString} string of the current locale.
 * @param {globalTenant} object of the global localization strings.
 * @returns {string}
 */
const getLocale = (tenantConfigs, tenantString, globalTenant) => {
    let locale = tenantString === '' ? globalTenant?.locale : tenantString;

    // if the locale is either
    // a) not set
    // or b) set to a country code that this component does not recognise
    // it will be set to 'en-GB'
    if (!tenantConfigs[locale]) locale = 'en-GB';

    return locale;
};

/**
 * Returns the theme from the given locale
 *
 * @param {locale} string of the current locale.
 * @returns {string} for the theme toggle
 */
const getTheme = locale => {
    switch (locale) {
        case 'en-AU':
        case 'en-NZ':
            return 'ml';
        default:
            return 'je';
    }
};

/**
 * Returns new window width
 *
 * @returns {float} for window width
 */
const getWindowWidth = () => window.innerWidth;

/**
 * Returns new window height
 *
 * @returns {float} for window height
 */
const getWindowHeight = () => window.innerHeight;

/**
 * Applies logic to the chosen event and throttles it if needs be
 *
 * @param {throttleTime} integer for setting the throttle time and toggling throttle off.
 * @param {eventName} integer for setting the name of the event listened to.
 * @param {callBackFunction} function for running when the event is listened to.
 */
const addEvent = (eventName, throttleTime, callBackFunction) => {
    if (throttleTime > 0) {
        return window.addEventListener(eventName, throttle(callBackFunction, throttleTime));
    }
    return window.addEventListener(eventName, callBackFunction);
};

/**
 * Removes chosen event.
 *
 * @param {eventName} integer for setting the name of the event listened to.
 * @param {callBackFunction} function for running when the event is listened to.
 */
const removeEvent = (eventName, callBackFunction) => {
    window.removeEventListener(eventName, callBackFunction);
};

export default {
    getLocale,
    getTheme,
    getWindowWidth,
    getWindowHeight,
    addEvent,
    removeEvent
};
