export default {
    locale: 'en-GB',
    linkHref: 'https://www.just-eat.co.uk/info/cookies-policy',
    linkText: 'cookies notice',
    mainTitle: 'Cookies',
    text1: 'We use required cookies (and similar technologies) to make our platform work.',
    text2: 'We\'d also like to use optional cookies to help us improve our platform by collecting information on how you use it.',
    text3: 'For details about the cookies and technologies we use, see our ',
    text4: '.  Using this banner will set a cookie on your device to remember your preferences.',
    nonAcceptButtonText: 'Accept only required cookies',
    acceptButtonText: 'Accept all cookies',
    legacyBannerText: 'We use cookies to improve your browsing experience. By continuing, you agree to receive cookies on our website.',
    legacyBannerLinkText: 'Learn more about our cookies policy.',

    config: {
        displayLegacy: true,
        cookieExclusionList: [
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
        ],
        storageExclusionList: [
            'optimizely_data$$',
            'je-',
            'JE-'
        ]
    }
};
