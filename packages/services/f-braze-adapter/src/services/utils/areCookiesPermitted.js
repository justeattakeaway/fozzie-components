import CookieHelper from 'js-cookie';

export const consentCookieName = 'je-cookieConsent';
export const consentCookieValue = 'full';

export const legacyBannerCookieName = 'je-banner_cookie';
export const legacyBannerCookieValue = '130315';

export default () => (CookieHelper.get(consentCookieName) === consentCookieValue)
        || (CookieHelper.get(legacyBannerCookieName) === legacyBannerCookieValue);
