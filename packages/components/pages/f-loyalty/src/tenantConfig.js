
const bagValues = {
    'en-GB': [
        40,
        50,
        45,
        40,
        55
    ],
    'en-AU': [
        40,
        50,
        45,
        40,
        55
    ],
    'en-NZ': [
        40,
        50,
        45,
        40,
        55
    ],
    'es-ES': [
        25,
        30,
        35,
        25,
        30
    ],
    'en-IE': [
        25,
        30,
        35,
        25,
        30
    ],
    'it-IT': [
        25,
        30,
        35,
        25,
        30
    ]
};

const tenantBagFees = tenant => bagValues[tenant];

const ordinals = {
    'en-GB': true,
    'en-AU': true,
    'en-NZ': true,
    'es-ES': false,
    'en-IE': true,
    'it-IT': false
};

const isCurrencySymbolBefore = {
    'en-GB': true,
    'en-AU': true,
    'en-NZ': true,
    'es-ES': false,
    'en-IE': true,
    'it-IT': false
};

const tenantOrdinals = tenant => ordinals[tenant];

const isTenantCurrencySymbolBefore = tenant => isCurrencySymbolBefore[tenant];

export {
    tenantBagFees,
    tenantOrdinals,
    isTenantCurrencySymbolBefore
};
