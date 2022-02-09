import { CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_DINEIN } from '../../src/constants';

const serverTimeout = 'Server timeout';
const serverTimeoutIssue = 'timeout';
const accessForbiddenErrorCode = '403';
export const timeUnavailable = 'time-unavailable';

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

const createGuestErrorOptions = {
    None: null,
    'Create Guest Error': 'error'
};

const getCheckoutOptions = {
    None: null,
    'Error - Access Forbidden (Response from server is an error)': accessForbiddenErrorCode,
    'Error - Any other (Response from server is an error)': '500',
    'Scheduled Time - Asap': 'user-selected-asap',
    'Scheduled Time - Later': 'user-selected-later',
    'Scheduled Time - Unavailable': `user-selected-${timeUnavailable}`,
    [serverTimeout]: serverTimeoutIssue
};

const getBasketOptions = {
    None: null,
    'Error - Basket contains invalid products': 'invalid-products',
    'Error - Basket contains offline products': 'offline-products',
    'Restriction - Age restricted': 'age-restriction'
};

const placeOrderErrorOptions = {
    None: null,
    'Place Order Duplicate Error (Response from server is an error)': 'duplicate',
    [serverTimeout]: serverTimeoutIssue
};

const fulfilmentTimeErrors = {
    none: null,
    'Error - No Time Available': timeUnavailable,
    'Available Time Issues': 'issues'
};

const noteTypeOptions = {
    'Legacy notes': null,
    'Combined note': 'get-notes-config',
    'Delivery and Kitchen notes': 'get-notes-config-split'
};

const serviceTypeOptions = [CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_DINEIN, 'invalid-url'];

export const propOptions = {
    noteTypeOptions,
    patchCheckoutErrorOptions,
    createGuestErrorOptions,
    getCheckoutOptions,
    getBasketOptions,
    placeOrderErrorOptions,
    fulfilmentTimeErrors,
    serviceTypeOptions,
    timeUnavailable
};
