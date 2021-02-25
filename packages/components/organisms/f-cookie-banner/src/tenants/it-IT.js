const messages = {
    locale: 'it-IT',
    mainTitle: 'Cookies',
    nonAcceptButtonText: 'Accetta solo i cookie necessari',
    acceptButtonText: 'Accetta tutti i cookie',
    textLine1: 'Utilizziamo i cookie necessari (e tecnologie simili) per far funzionare la nostra piattaforma.',
    textLine2: 'Vorremmo anche utilizzare cookies facoltativi che ci aiutano a migliorare la nostra piattaforma raccogliendo informazioni su come la utilizzi.',
    textLine3: 'Per i dettagli sui cookie e sulle tecnologie che utilizziamo puoi leggere ',
    textLine4: '. L\'utilizzo di questo banner imposterá; un cookie sul tuo dispositivo per ricordare le tue preferenze.',
    cookiePolicyLinkText: 'la nostra informativa sui cookie',
    cookiePolicyLinkUrl: 'https://www.justeat.it/informazioni/politica-dei-cookie'
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
