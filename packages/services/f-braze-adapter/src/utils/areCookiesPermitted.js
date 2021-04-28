import CookieHelper from 'js-cookie';

const consentCookieName = 'je-cookieConsent';

export default () => {
    const cookieConsent = CookieHelper.get(consentCookieName);
    return cookieConsent === 'full';
};
