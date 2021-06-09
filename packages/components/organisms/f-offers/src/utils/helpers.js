import Cookies from 'js-cookie';
import Trak from '@justeat/f-trak';

/**
 * Function that sets the cookies using js-cookie
 * @param name
 * @param value
 * @param minutes
 */
const setCookie = (name, value, minutes = 1) => {
    let expires = '';
    const millisecondsPerMinute = 60 * 1000;
    if (minutes) {
        const date = new Date();
        expires = date.setTime(date.getTime() + (minutes * millisecondsPerMinute));
    }
    Cookies.set(name, (value || ''), { expires, path: '/' });
};

/**
 * Pushes to the GTM datalayer using the f-trak library
 * @param category
 * @param action
 * @param label
 */
export const pushToDataLayer = (category, action, label) => {
    // TODO look into how we can make f-trak SSR compatible
    if (window) {
        Trak.event({
            event: 'trackEvent',
            category,
            action,
            label
        });
    }
};

/**
 * Sets a cookie for GTM event
 * @param category
 * @param action
 * @param label
 */
export const setGtmEventCookie = (category, action, label) => {
    setCookie('je-gtm-event', `${category}|${action}|${label}`);
};
