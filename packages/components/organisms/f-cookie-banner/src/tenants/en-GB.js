const messages = {
    locale: 'en-GB',
    mainTitle: 'Cookies',
    nonAcceptButtonText: 'Accept only required cookies',
    acceptButtonText: 'Accept all cookies',
    textLine1: 'We use required cookies (and similar technologies) to make our platform work.',
    textLine2: 'We\'d also like to use optional cookies to help us improve our platform by collecting information on how you use it.',
    textLine3: 'For details about the cookies and technologies we use, see our ',
    textLine4: '.  Using this banner will set a cookie on your device to remember your preferences.',
    cookiePolicyLinkText: 'cookies notice',
    cookiePolicyLinkUrl: 'https://www.just-eat.co.uk/info/cookies-policy',
    legacyBannerText: 'We use cookies to improve your browsing experience. By continuing, you agree to receive cookies on our website.',
    legacyBannerLinkText: 'Learn more about our cookies policy.',
    legacyBannerCloseBannerText: 'Close cookie banner',
    reopenCookieBannerLinkText: 'Check my cookie preferences',

    managePreferencesModal: {
        title: 'Manage your preferences',
        subheading: {
            text1: 'You can find all the information in the ',
            linkText1: 'Cookie Statement',
            link1: '/', // These links will be updated in another PR.
            text2: ' and ',
            linkText2: 'Cookie technology list.',
            link2: '/' // These links will be updated in another PR.
        },
        cookies: {
            necessary: {
                title: 'Necessary',
                text: 'These cookies are necessary to ensure that the website and its features function properly. Services you have asked for cannot be provided without these cookies.'
            },
            functional: {
                title: 'Functional',
                text: 'These cookies allow the website to remember the choices you make to give you better functionality and personal features.'
            },
            analytical: {
                title: 'Analytical',
                text: 'These analytical cookies, including statistics, are used to understand how visitors interact with the website and we can measure and improve the performance of our website.'
            },
            personalised: {
                title: 'Personalized (targeting and advertising)',
                text: 'These marketing cookies are used to tailor the delivery of information to you based upon your interest and to measure the effectiveness of such advertisements, both on our website and our advertising partners\' websites.'
            }
        },
        buttons: {
            onlySelected: 'Only selected',
            acceptAll: 'Accept all'
        }
    }
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
