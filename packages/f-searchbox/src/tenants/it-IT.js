const copy = {
    buttonText: 'Trova i ristoranti!',
    fieldLabel: 'Inserisci il tuo indirizzo di consegna',
    fieldPlaceholder: 'Indirizzo di consegna',
    headlineSubtitle: 'Ordina online dai tuoi ristoranti preferiti',
    headlineTitle: 'Il bello è prenderci gusto',
    geoTip: 'Trova la mia posizione',
    errors: {
        ADDRESS_EMPTY: 'Compila correttamente l\'indirizzo di ricerca',
        GEO_ERROR: 'Impossibile trovare la posizione',
        MORE_SPECIFIC_SEARCH: 'Per favore inserisci il tuo indirizzo di consegna',
        NO_SUGGESTION_FOUND: 'Ci spiace, non siamo riusciti a trovare il tuo indirizzo',
        STREET_NUMBER_MISSING: 'Per favore indica anche il tuo numero civico, così da trovare tutti i ristoranti che consegnano al tuo indirizzo',
        UNKNOWN_ERROR: 'Errore sconosciuto'
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
    requiredFields: ['streetNumber', 'street', 'locality', 'postcode'],
    locationFormat: location => {
        if (
            location
            && location.street
            && location.houseNo
            && location.postcode
            && location.city
        ) {
            return `${location.street}, ${location.houseNo}, ${location.postcode}, ${location.city}`;
        }
        return '';
    },
    suggestionFormat: suggestion => (
        suggestion.description || suggestion.formattedAddress
    )
};

const service = {
    autocomplete: 'IT',
    validation: {
        ADDRESS_EMPTY: (value = '') => !!String(value).trim()
    }
};

export default {
    copy,
    component,
    service
};
