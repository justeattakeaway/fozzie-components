const messages = {
    locale: 'nb-NO',
    mainTitle: 'Informasjonskapsler',
    nonAcceptButtonText: 'Aksepterer kun nødvendige informasjonskapsler',
    acceptButtonText: 'Aksepter alle informasjonskapsler',
    textLine1: 'Vi bruker nødvendige informasjonskapsler (og lignende teknologier) for å få plattformen vår til å fungere.',
    textLine2: 'Vi ønsker også å bruke valgfrie informasjonskapsler for å hjelpe oss med å forbedre plattformen vår ved å samle inn informasjon om hvordan du bruker den.',
    textLine3: 'For detaljer om hvilke informasjonskapsler og teknologier vi bruker, se vår ',
    textLine4: '. Ved å bruke dette banneret, plasseres en informasjonskapsel på enheten din for å huske dine preferanser.',
    cookiePolicyLinkText: 'melding om informasjonskapsler',
    cookiePolicyLinkUrl: 'https://www.just-eat.no/informasjonskapselerklaering'
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
