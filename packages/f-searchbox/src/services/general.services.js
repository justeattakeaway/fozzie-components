import { normalisePostcode, setCookie } from '../utils/helpers';

const COOKIE_DAYS = 365;

/**
 *
 * Responsible for setting cookies in the browsers storage. This is configured via the
 * `shouldSetCookies: true` a prop passed through to the component when it's rendered. At the moment this only
 * covers UK, it will be extended to cover the other tenants soon.
 *
 * @param shouldSetCookie
 * @param address
 */
const processLocationCookie = (shouldSetCookie, address) => {
    if (!shouldSetCookie) {
        return false;
    }

    if (typeof address === 'string') {
        setCookie('je-location', normalisePostcode(address), COOKIE_DAYS);
    }

    return true;
};

/**
 * Custom submit handler for consuming applications that want to call it's own submit handler.
 * The custom submit handler would be set via the `config` `onSubmit: function() {}` This method prevents
 * f-searchbox from making it's on submission and allows the consuming application to proceed with it's own.
 *
 * @param submit
 * @param address
 * @param e
 */
const onCustomSubmit = (submit, address, e) => {
    if (submit) {
        e.preventDefault();
        submit(address);
    }
};

/**
 * Create a form url query string based off the passed in config `queryString`.
 * For more info see readme for details on the config: `queryString`.
 *
 *
 * @param {string} queryString
 * @param {string} formUrl
 * @returns {string}
 */
const generateFormQueryUrl = (queryString, formUrl) => {
    if (queryString && formUrl) {
        // Loop over the query string object and will return a string in a 'key=val&key=val' format.
        const queryStringUrl = Object.keys(queryString).map(key => {
            // check to see is value is an array, convert to an array if its a string
            const keys = Array.isArray(queryString[key]) ? queryString[key] : [queryString[key]];
            return keys.map(val => (val.length > 0 ? `${key}=${val}` : '')).join('&');
        }).join('&');

        return `${formUrl}?${queryStringUrl}`;
    }

    return formUrl;
};

export {
    processLocationCookie,
    onCustomSubmit,
    generateFormQueryUrl
};
