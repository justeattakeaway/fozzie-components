const copy = {
    buttonText: 'Søk',
    fieldLabel: 'Tast inn ditt postnummer',
    fieldPlaceholder: 'Tast inn ditt postnummer',
    headlineSubtitle: 'Gå på oppdagelse i hundrevis av forskjellige restauranter',
    headlineTitle: 'Din smak, ditt valg',
    errors: {
        ADDRESS_EMPTY: 'Inntast et postnummer',
        ADDRESS_INVALID: 'Vi kan ikke gjenkjenne dette som et norsk postnummer... Vennligst inntast ditt postnummer på nytt',
        ADDRESS_LONG: 'Din postadresse må bestå av fire tall. Prøv vennligst igjen.',
        NO_SUGGESTION_FOUND: 'Beklager, vi kunne ikke finne adressen din',
        UNKNOWN_ERROR: 'Ukjent feil'
    }
};

const component = {
    formUrl: '/homecw/searchresult/',
    address: '',
    cuisine: '',
    isShellHidden: false,
    isCompressed: false,
    query: '',
    queryString: '',
    shouldSetCookies: false,
    onSubmit: false,
    shouldAutoPopulateAddress: true,
    shouldClearAddressOnValidSubmit: false,
    addressField: {
        isNumeric: true,
        maxlength: 4,
        name: 'where'
    },
    locationFormat: location => location.postcode
};

const service = {
    validation: {
        ADDRESS_EMPTY: (value = '') => !!String(value).trim(),
        ADDRESS_INVALID: value => /\d{4}/.test(value),
        ADDRESS_LONG: (value = '') => String(value).trim().length < 5
    }
};

export default {
    copy,
    component,
    service
};
