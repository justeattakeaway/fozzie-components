import getCheckout from './getCheckout';
import errors from './errors';
import {
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_DINEIN,
    CHECKOUT_METHOD_COLLECTION
} from '../../../../src/constants';
import {
    NOTE_TYPES, TENANTS, DELIVERY_TIMES, httpStatusCodes, httpMethods
} from '../../../helpers';

export default {
    'checkout-403-get-error': {
        method: httpMethods.get,
        status: httpStatusCodes.noResponse,
        payload: errors.forbidden
    },
    'checkout-500-get-error': {
        method: httpMethods.get,
        status: httpStatusCodes.noResponse,
        payload: errors.server
    },
    'checkout-timeout-get-error': {
        method: httpMethods.get,
        status: httpStatusCodes.noResponse
    },
    'checkout-collection-user-selected-asap': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true)
    },
    'checkout-collection-user-selected-later': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true, DELIVERY_TIMES.later)
    },
    'checkout-collection-user-selected-time-unavailable': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true, DELIVERY_TIMES.unavailable)
    },
    'checkout-delivery-user-selected-asap': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true)
    },
    'checkout-delivery-user-selected-later': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.later)
    },
    'checkout-delivery-user-selected-time-unavailable': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.unavailable)
    },
    'uk/checkout-collection': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true)
    },
    'uk/checkout-delivery': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true)
    },
    'uk/checkout-dinein': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DINEIN, TENANTS.uk, true)
    },
    'uk/checkout-delivery-split-notes-courier': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.now, NOTE_TYPES.courier)
    },
    'uk/checkout-delivery-split-notes-courier-kitchen': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.now, NOTE_TYPES.split)
    },
    'au/checkout-collection': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.au, true)
    },
    'au/checkout-delivery': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.au, true)
    },
    'au/checkout-dinein': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DINEIN, TENANTS.au, true)
    },
    'au/checkout-delivery-split-notes-courier': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.au, true, DELIVERY_TIMES.now, NOTE_TYPES.courier)
    },
    'au/checkout-delivery-split-notes-courier-kitchen': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.au, true, DELIVERY_TIMES.now, NOTE_TYPES.split)
    },
    'nz/checkout-collection': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.nz, true)
    },
    'nz/checkout-delivery': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.nz, true)
    },
    'nz/checkout-dinein': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DINEIN, TENANTS.nz, true)
    },
    'nz/checkout-delivery-split-notes-courier': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.nz, true, DELIVERY_TIMES.now, NOTE_TYPES.courier)
    },
    'nz/checkout-delivery-split-notes-courier-kitchen': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.nz, true, DELIVERY_TIMES.now, NOTE_TYPES.split)
    }
};
