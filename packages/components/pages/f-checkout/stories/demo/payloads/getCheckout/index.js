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

const success = {
    method: httpMethods.get,
    responseStatus: httpStatusCodes.ok
};

const noResponse = {
    method: httpMethods.get,
    responseStatus: httpStatusCodes.noResponse
};

function buildTenantSpecificGetCheckoutRequests () {
    const tenants = ['uk', 'au', 'nz'];
    const tenantRequests = [];

    tenants.forEach(tenant => {
        tenantRequests.push(
            {
                url: `/${tenant}/checkout-collection`,
                ...success,
                payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS[tenant], { isAsap: true })
            },
            {
                url: `/${tenant}/checkout-delivery`,
                ...success,
                payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS[tenant], { isAsap: true })
            },
            {
                url: `/${tenant}/checkout-dinein`,
                ...success,
                payload: getCheckout(CHECKOUT_METHOD_DINEIN, TENANTS[tenant], { isAsap: true })
            },
            {
                url: `/${tenant}/checkout-delivery-split-notes-courier`,
                ...success,
                payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS[tenant], { isAsap: true, scheduledTime: DELIVERY_TIMES.now, notes: NOTE_TYPES.courier })
            },
            {
                url: `/${tenant}/checkout-delivery-split-notes-courier-kitchen`,
                ...success,
                payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS[tenant], { isAsap: true, scheduledTime: DELIVERY_TIMES.now, notes: NOTE_TYPES.split })
            }
        );
    });

    return tenantRequests;
}

export default [
    {
        url: '/checkout-403-get-error',
        ...noResponse,
        payload: errors.forbidden
    },
    {
        url: '/checkout-500-get-error',
        ...noResponse,
        payload: errors.server
    },
    {
        url: '/checkout-timeout-get-error',
        ...noResponse
    },
    {
        url: '/checkout-collection-user-selected-asap',
        ...success,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, { isAsap: true })
    },
    {
        url: '/checkout-collection-user-selected-later',
        ...success,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, { isAsap: true, scheduledTime: DELIVERY_TIMES.later })
    },
    {
        url: '/checkout-collection-user-selected-time-unavailable',
        ...success,
        payload: getCheckout(CHECKOUT_METHOD_COLLECTION, TENANTS.uk, { isAsap: true, scheduledTime: DELIVERY_TIMES.unavailable })
    },
    {
        url: '/checkout-delivery-user-selected-asap',
        ...success,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, { isAsap: true })
    },
    {
        url: '/checkout-delivery-user-selected-later',
        ...success,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, { isAsap: true, scheduledTime: DELIVERY_TIMES.later })
    },
    {
        url: '/checkout-delivery-user-selected-time-unavailable',
        ...success,
        payload: getCheckout(CHECKOUT_METHOD_DELIVERY, TENANTS.uk, { isAsap: true, scheduledTime: DELIVERY_TIMES.unavailable })
    },
    ...buildTenantSpecificGetCheckoutRequests()
];
