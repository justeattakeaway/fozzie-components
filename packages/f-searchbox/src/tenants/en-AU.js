const copy = {
    buttonText: 'Find food',
    fieldLabel: 'Your street address or suburb',
    fieldPlaceholder: 'Your street address or suburb',
    headlineSubtitle: 'Your favourite local restaurants delivered',
    headlineTitle: 'Did somebody say Menulog',
    geoTip: '',
    errors: {
        ADDRESS_EMPTY: 'Enter your location to find food near you',
        GEO_ERROR: 'Unable to find location',
        MORE_SPECIFIC_SEARCH: 'Enter your location to find food near you',
        NO_SUGGESTION_FOUND: 'We didn\'t recognise this location, try entering your suburb instead',
        STREET_NUMBER_MISSING: 'Enter your location to find food near you',
        UNKNOWN_ERROR: 'Unknown error'
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
    addressField: {
        isNumeric: false,
        name: 'postcode',
        type: 'text'
    },
    shouldClearAddressOnValidSubmit: false,
    theme: 'anz',
    requiredFields: ['locality', 'postcode'],
    locationFormat: location => {
        if (
            location
            && location.street
            && location.city
            && location.state
            && location.postcode
        ) {
            const output = `${location.street}, ${location.city}, ${location.state} ${location.postcode}`;
            return location.houseNo
                ? `${location.houseNo} ${output}`
                : output;
        }
        return '';
    },
    suggestionFormat: suggestion => (
        suggestion.description || suggestion.formattedAddress
    )
};

const service = {
    autocomplete: 'AU',
    validation: {
        ADDRESS_EMPTY: (value = '') => !!String(value).trim()
    }
};

export default {
    copy,
    component,
    service
};
