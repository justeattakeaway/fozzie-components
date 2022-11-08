
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

export default tenantBagFees;
