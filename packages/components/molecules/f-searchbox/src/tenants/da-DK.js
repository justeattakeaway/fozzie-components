const copy = {
    buttonText: 'Find restauranter',
    fieldLabel: 'Indtast dit postnummer',
    fieldPlaceholder: 'Indtast dit postnummer',
    headlineSubtitle: 'Gå på opdagelse i over 2.000 restauranter',
    headlineTitle: 'Din smag, dit valg',
    errors: {
        ADDRESS_EMPTY: 'Indtast et postnummer',
        ADDRESS_INVALID: 'Vi kan ikke genkende dette som et dansk postnummer. Venligst indtast dit postnummer igen',
        ADDRESS_LONG: 'Dit postnummer skal være på fire tal. Venligst prøv igen.',
        NO_SUGGESTION_FOUND: 'Beklager, vi kunne ikke finde din adresse',
        UNKNOWN_ERROR: 'Ukendt fejl'
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
