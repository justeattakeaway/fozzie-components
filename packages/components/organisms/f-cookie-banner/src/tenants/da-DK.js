const messages = {
    locale: 'da-DK',
    mainTitle: 'Cookies',
    nonAcceptButtonText: 'Accepter kun nødvendige cookies',
    acceptButtonText: 'Accepter alle cookies',
    textLine1: 'Vi anvender de cookies (og lignende teknologier), der er nødvendige, for at platformen kan fungere.',
    textLine2: 'Vi vil også gerne bruge valgfri cookies til forbedring af platformen ved at indsamle oplysninger om, hvordan du bruger den.',
    textLine3: 'For nærmere oplysninger om de anvendte cookies og teknologier henviser vi til vores ',
    textLine4: '. Ved brug af denne banner placeres en cookie på din enhed, som husker dine præferencer.',
    cookiePolicyLinkText: 'cookie-meddelelse',
    cookiePolicyLinkUrl: 'https://www.just-eat.dk/cookie-erklaering'
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
