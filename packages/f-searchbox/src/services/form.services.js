import { normalisePostcode, setCookie } from '../utils/helpers';

const COOKIE_DAYS = 365;

/**
 *
 * Responsible for setting cookies in the browsers storage. This is configured via the
 * `setCookies: true` a prop passed through to the component when it's rendered. At the moment this only
 * covers UK, it will be extended to cover the other tenants soon.
 *
 * @param shouldSetCookie
 * @param address
 */
const processLocationCookie = (shouldSetCookie, address) => {
    if (!shouldSetCookie) {
        return;
    }
    
    if (typeof address === 'string') {
        setCookie('je-location', normalisePostcode(address), COOKIE_DAYS);
    }
};

export {
    processLocationCookie
};
