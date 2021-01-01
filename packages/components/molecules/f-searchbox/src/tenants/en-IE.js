const copy = {
    buttonText: 'Find restaurants',
    fieldLabel: 'Find a takeaway restaurant in...',
    fieldPlaceholder: 'E.g. 21 Stonewall Drive, Saggart Abbey, Dublin 24, D24 TF12',
    headlineSubtitle: 'Find restaurants delivering right now, near you',
    headlineTitle: 'Tuck into a takeaway today',
    errors: {
        ADDRESS_EMPTY: 'Please enter a location',
        NO_SUGGESTION_FOUND: 'No suggestions found',
        UNKNOWN_ERROR: 'There has been an error. Please try again.',
        GEO_ERROR: 'Unable to find location. Please enter your address manually.',
        MORE_SPECIFIC_SEARCH: 'Location needs to be more specific',
        STREET_NUMBER_MISSING: 'Provide a house or building number'
    }
};

const component = {
    formUrl: undefined,
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
    requiredFields: ['locality'],
    addressField: {
        isNumeric: false,
        name: 'postcode',
        type: 'text'
    },
    locationFormat: location => {
        if (location && location.suggestion) {
            return location.suggestion;
        }
        return '';
    },
    suggestionFormat: suggestion => (suggestion.description || suggestion.formattedAddress)
};

const addressRegex = /^[^a-zA-Zñáéíóúü]+$/;

const service = {
    autocomplete: 'IE',
    zipcodeAutocomplete: false,
    validation: {
        ADDRESS_EMPTY: (value = '') => !!String(value).trim()
    },
    presearchValidation: {
        ADDRESS_EMPTY: (value = '') => {
            const parsed = value.trim().replace(/\s/g, '');
            return !addressRegex.test(parsed);
        }
    }
};

export default {
    copy,
    component,
    service
};
