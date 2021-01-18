export default {
    locale: 'da-DK',
    linkHref: 'https://www.just-eat.dk/info/cookiepolitik',
    linkText: 'cookie-meddelelse',
    mainTitle: 'Cookies',
    text1: 'Vi anvender de cookies (og lignende teknologier), der er nødvendige, for at platformen kan fungere.',
    text2: 'Vi vil også gerne bruge valgfri cookies til forbedring af platformen ved at indsamle oplysninger om, hvordan du bruger den.',
    text3: 'For nærmere oplysninger om de anvendte cookies og teknologier henviser vi til vores ',
    text4: '. Ved brug af denne banner placeres en cookie på din enhed, som husker dine præferencer.',
    buttonText1: 'Accepter kun nødvendige cookies',
    buttonText2: 'Accepter alle cookies',

    config: {
        displayLegacy: false,
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
