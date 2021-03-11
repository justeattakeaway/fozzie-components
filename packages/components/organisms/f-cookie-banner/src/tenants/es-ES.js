const messages = {
    locale: 'es-ES',
    mainTitle: 'Cookies',
    nonAcceptButtonText: 'Aceptar solo las cookies necesarias',
    acceptButtonText: 'Aceptar todas las cookies',
    textLine1: 'Usamos cookies necesarias y tecnologías similares para facilitar el funcionamiento de nuestra plataforma.',
    textLine2: 'También nos gustaría usar cookies opcionales para ayudarnos a mejorar nuestra plataforma recopilando información sobre cómo la utiliza.',
    textLine3: 'Para más detalles sobre las cookies y tecnologías que usamos, visite nuestro ',
    textLine4: '. El uso de este banner provocará que se instale una cookie en su dispositivo para recordar sus preferencias.',
    cookiePolicyLinkText: 'aviso sobre cookies',
    cookiePolicyLinkUrl: 'https://www.just-eat.es/cookies-policy'
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
