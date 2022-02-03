const serverTimeout = 'Server timeout';
const serverTimeoutIssue = 'timeout';
const accessForbiddenErrorCode = '403';
const timeUnavailable = 'time-unavailable';

const patchCheckoutErrorOptions = {
    None: null,
    'Restaurant Not Taking Orders Issue (Response from server but order not fulfillable)': 'restaurant-not-taking-orders',
    'ServiceType is not available (Response from server but order not fulfillable)': 'service-type-unavailable',
    'Additional Items Required Issue (Response from server but order not fulfillable)': 'additional-items-required',
    'Checkout Error (Response from server is an error)': 'SERVER',
    'Access Forbidden (Response from server is 403)': accessForbiddenErrorCode,
    'Selected time no longer available': timeUnavailable,
    'Geolocation required': 'geolocation-required',
    [serverTimeout]: serverTimeoutIssue
};

const restrictionOptions = {
    None: null,
    'Age restricted': 'age-restriction'
};

const createGuestErrorOptions = {
    None: null,
    'Create Guest Error': 'error'
};

const getCheckoutErrorOptions = {
    None: null,
    'Access Forbidden Get Checkout Error (Response from server is an error)': accessForbiddenErrorCode,
    'Any other Get Checkout Error (Response from server is an error)': '500',
    'No Time Available': timeUnavailable,
    [serverTimeout]: serverTimeoutIssue
};

const getBasketErrorOptions = {
    None: null,
    'Basket contains invalid products': 'invalid-products',
    'Basket contains offline products': 'offline-products'
};

const placeOrderErrorOptions = {
    None: null,
    'Place Order Duplicate Error (Response from server is an error)': 'duplicate',
    [serverTimeout]: serverTimeoutIssue
};

const fulfilmentTimeOptions = {
    none: null,
    'Selected Asap Time': 'user-selected-asap',
    'Selected Later Time': 'user-selected-later',
    'Selected Unavailable Time': timeUnavailable,
    'Available Time Issues': 'issues'
};

const noteTypeOptions = {
    'Legacy notes': null,
    'Combined note': 'get-notes-config',
    'Delivery and Kitchen notes': 'get-notes-config-split'
};

export {
    noteTypeOptions,
    patchCheckoutErrorOptions,
    restrictionOptions,
    createGuestErrorOptions,
    getCheckoutErrorOptions,
    getBasketErrorOptions,
    placeOrderErrorOptions,
    fulfilmentTimeOptions,
    timeUnavailable
};
