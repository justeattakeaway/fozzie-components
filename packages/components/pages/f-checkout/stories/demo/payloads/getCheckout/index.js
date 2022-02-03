import getCheckout from './getCheckout';
import errors from './errors';
import {
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_DINEIN,
    CHECKOUT_METHOD_COLLECTION
} from '../../../../src/constants';
import { NOTE_TYPES, TENANTS, DELIVERY_TIMES } from '../../../helpers';

export default {
    error403: errors.forbidden,
    error500: errors.server,
    collectionUserSelectedAsap: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true),
    collectionUserSelectedLater: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true, DELIVERY_TIMES.later),
    collectionUserSelectedUnavailableTime: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true, DELIVERY_TIMES.unavailable),
    deliveryUserSelectedAsap: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true),
    deliveryUserSelectedLater: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.later),
    deliveryUserSelectedUnavailableTime: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.unavailable),
    uk: {
        collection: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, true),
        delivery: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true),
        dinein: getCheckout(CHECKOUT_METHOD_DINEIN, TENANTS.uk, true),
        deliveryNoteType: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.now, NOTE_TYPES.courier),
        deliveryAndKitchenNoteTypes: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, true, DELIVERY_TIMES.now, NOTE_TYPES.split)
    },
    au: {
        collection: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.au, true),
        delivery: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.au, true),
        dinein: getCheckout(CHECKOUT_METHOD_DINEIN, TENANTS.au, true)
    },
    nz: {
        collection: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.nz, true),
        delivery: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.nz, true),
        dinein: getCheckout(CHECKOUT_METHOD_DINEIN, TENANTS.nz, true)
    }
};
