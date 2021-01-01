const copy = {
    buttonText: 'Buscar restaurantes',
    fieldLabel: 'Indícanos tu dirección: calle, número y ciudad',
    fieldPlaceholder: 'ej. Calle Alcalá, 48, Madrid',
    headlineSubtitle: 'Comida a domicilio online cerca de ti',
    headlineTitle: 'Pide lo que te pida el cuerpo',
    geoTip: 'Trova la mia posizione',
    errors: {
        ADD_STREET: 'Por favor introduce una calle',
        ADDRESS_EMPTY: 'Por favor introduce una dirección para que podamos llevarte tu pedido',
        GEO_ERROR: 'No se puede encontrar la ubicación',
        MORE_SPECIFIC_SEARCH: 'Por favor, indícanos la calle y el número para encontrar los restaurantes que hay en la zona',
        NO_SUGGESTION_FOUND: 'No hemos encontrado la dirección. Por favor, revisa que la dirección es correcta e inténtalo de nuevo',
        STREET_NUMBER_MISSING: 'Por favor, indícanos el número de la calle',
        UNKNOWN_ERROR: 'Error desconocido'
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
        if (location
            && location.street
            && location.houseNo
            && location.postcode
            && location.city) {
            return `${location.street}, ${location.houseNo}, ${location.postcode}, ${location.city}`;
        }
        return '';
    },
    suggestionFormat: suggestion => (
        suggestion.description || suggestion.formattedAddress
    )
};

const addressRegex = /^[^a-zA-Zñáéíóúü]+$/;

/**
 * 1. `autocomplete` Defines and initialises google places (factory).
 * 2. `preSearchValidation` is used before a search is hit (Used via a watcher in form.vue). It checks to make
 * sure it passes the correct tests before checking to see if the address is valid or not.
 *
 * @type {{autocomplete: string, preSearchValidation: {ADD_STREET: (function(*=))}, validation: {ADDRESS_EMPTY: (function(*=): boolean)}}}
 */
const service = {
    autocomplete: 'ES',
    preSearchValidation: {
        ADD_STREET: (value = '') => {
            const parsed = value.trim().replace(/\s/g, '');
            return !addressRegex.test(parsed);
        }
    },
    validation: {
        ADDRESS_EMPTY: (value = '') => !!String(value).trim()
    }
};

export default {
    copy,
    component,
    service
};
