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

export {
    processLocationCookie,
    onCustomSubmit
};
