import Cookies from 'js-cookie';
import Trak from '@justeat/f-trak';

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
 * @param minutes
 */
export const setGtmEventCookie = (category, action, label, minutes = 1) => {
    let expires = '';
    const millisecondsPerMinute = 60 * 1000;
    if (minutes) {
        const date = new Date();
        expires = date.setTime(date.getTime() + (minutes * millisecondsPerMinute));
    }
    Cookies.set('je-gtm-event', (`${category}|${action}|${label}` || ''), { expires, path: '/' });
};
