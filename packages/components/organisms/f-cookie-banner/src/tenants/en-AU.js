const messages = {
    locale: 'en-AU',
    mainTitle: 'Cookies',
    nonAcceptButtonText: 'Accept only required cookies',
    acceptButtonText: 'Accept all cookies',
    textLine1: 'We use required cookies (and similar technologies) to make our platform work.',
    textLine2: 'We\'d also like to use optional cookies to help us improve our platform by collecting information on how you use it.',
    textLine3: 'For details about the cookies and technologies we use, see our {cookiePolicy}.  Using this banner will set a cookie on your device to remember your preferences.',
    cookiePolicyLinkText: 'cookies notice',
    cookiePolicyLinkUrl: 'https://www.menulog.com.au/info/cookies-policy'
};

const displayLegacy = false;

const cookieExclusionList = [
    '_dc_gtm_',
    '_ga',
    '_gac_',
    '_gid',
    'AMP_TOKEN',
    'incap_ses_',
    'je-',
    'nlbi_',
    'optimizelyEndUserId',
    'optimizelyRedirectData',
    'optimizelyDomainTestCookie',
    'optimizelyOptOut',
    'ravelinDeviceId',
    'ravelinSessionUuid',
    'ravelinUuid',
    '__zlcmid',
    '__zlcprivacy'
];

const storageExclusionList = [
    'optimizely_data$$',
    'je-',
    'JE-'
];

export default {
    displayLegacy,
    cookieExclusionList,
    storageExclusionList,
    messages
};
