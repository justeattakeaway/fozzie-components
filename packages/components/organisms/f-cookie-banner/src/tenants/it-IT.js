export default {
    locale: 'it-IT',
    linkHref: 'https://www.justeat.it/informazioni/politica-dei-cookie',
    linkText: 'la nostra informativa sui cookie',
    mainTitle: 'Cookies',
    text1: 'Utilizziamo i cookie necessari (e tecnologie simili) per far funzionare la nostra piattaforma.',
    text2: 'Vorremmo anche utilizzare cookies facoltativi che ci aiutano a migliorare la nostra piattaforma raccogliendo informazioni su come la utilizzi.',
    text3: 'Per i dettagli sui cookie e sulle tecnologie che utilizziamo puoi leggere ',
    text4: '. L\'utilizzo di questo banner imposter&aacute; un cookie sul tuo dispositivo per ricordare le tue preferenze.',
    nonAcceptButtonText: 'Accetta solo i cookie necessari',
    acceptButtonText: 'Accetta tutti i cookie',

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
