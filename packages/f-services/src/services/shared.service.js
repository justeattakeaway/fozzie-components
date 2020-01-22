import { throttle } from 'lodash-es';
import root from 'window-or-global';

/**
 * @overview Shared Service
 *
 * @module shared/service
 */

/**
 * Returns the locale for translation localization
 *
 * @param tenantConfigs {object} of localization strings.
 * @param tenantString {string} of the current locale.
 * @param globalTenant {object} of the global localization strings.
 * @param [globalTenant.locale] {string} of the global localization locale.
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
 * @param locale {string} of the current locale.
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
 * @requires root {object} from window-or-global module
 * @requires root.innerWidth {number} for window width
 * @returns {number} for window width
 */
const getWindowWidth = () => root.innerWidth;

/**
 * Returns new window height
 *
 * @requires root {object} from window-or-global module
 * @requires root.innerHeight {number} for window width
 * @returns {number} for window height
 */
const getWindowHeight = () => root.innerHeight;

/**
 * Applies logic to the chosen event and throttles it if needs be
 *
 * @requires root {object} from window-or-global module.
 * @requires root.addEventListener {function} for adding the event listener.
 * @requires throttle {function} from lodash.throttle.
 * @param [throttleTime] {number} for setting the throttle time and toggling throttle off.
 * @param eventName {string} for setting the name of the event listened to.
 * @param callBackFunction {function} for running when the event is listened to.
 */
const addEvent = (eventName, callBackFunction, throttleTime) => {
    const callback =
        throttleTime > 0
            ? throttle(callBackFunction, throttleTime)
            : callBackFunction;
    return root.addEventListener(eventName, callback);
};

/**
 * Removes chosen event.
 *
 * @requires root {object} from window-or-global module.
 * @requires root.removeEventListener {function} for removing the event listener.
 * @param eventName {string} for setting the name of the event listened to.
 * @param callBackFunction {function} for running when the event is listened to.
 */
const removeEvent = (eventName, callBackFunction) => root.removeEventListener(eventName, callBackFunction);

export default {
    getLocale,
    getTheme,
    getWindowWidth,
    getWindowHeight,
    addEvent,
    removeEvent
};
