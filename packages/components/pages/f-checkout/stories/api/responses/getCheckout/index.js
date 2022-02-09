import getCheckout from './getCheckout';
import errors from './errors';
import {
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_DINEIN,
    CHECKOUT_METHOD_COLLECTION
} from '../../../../src/constants';
import {
    NOTE_TYPES, TENANTS, DELIVERY_TIMES, httpMethods, httpStatusCodes, getSuccess
} from '../../../helpers';

function serviceType (tenant = TENANTS.uk) {
    return {
        delivery: [CHECKOUT_METHOD_DELIVERY, tenant],
        collection: [CHECKOUT_METHOD_COLLECTION, tenant],
        dinein: [CHECKOUT_METHOD_DINEIN, tenant]
    };
}

function buildTenantSpecificGetCheckoutRequests () {
    const tenantRequests = [];

    Object.values(TENANTS).forEach(tenant => {
        tenantRequests.push(
            {
                url: `/checkout-collection-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...serviceType(tenant).collection)
            },
            {
                url: `/checkout-delivery-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...serviceType(tenant).delivery)
            },
            {
                url: `/checkout-dinein-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...serviceType(tenant).dinein)
            },
            {
                url: `/checkout-delivery-split-notes-courier-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...serviceType(tenant).delivery, { notes: NOTE_TYPES.courier })
            },
            {
                url: `/checkout-delivery-split-notes-courier-kitchen-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...serviceType(tenant).delivery, { notes: NOTE_TYPES.split })
            }
        );
    });

    return tenantRequests;
}

function deliveryRequests () {
    const tenantRequests = [];

    Object.values([
        CHECKOUT_METHOD_DELIVERY,
        CHECKOUT_METHOD_DINEIN,
        CHECKOUT_METHOD_COLLECTION
    ]).forEach(type => {
        tenantRequests.push(
            {
                url: `/checkout-${type}-user-selected-asap`,
                ...getSuccess,
                payload: getCheckout(...serviceType().collection, { isPreOrder: false, scheduledTime: DELIVERY_TIMES.asap })
            },
            {
                url: `/checkout-${type}-user-selected-later`,
                ...getSuccess,
                payload: getCheckout(...serviceType().delivery, { isPreOrder: true, scheduledTime: DELIVERY_TIMES.later })
            },
            {
                url: `/checkout-${type}-user-selected-time-unavailable`,
                ...getSuccess,
                payload: getCheckout(...serviceType().dinein, { isPreOrder: true, scheduledTime: DELIVERY_TIMES.unavailable })
            },
            {
                url: `/checkout-${type}-403`,
                method: httpMethods.get,
                responseStatus: httpStatusCodes.forbidden,
                payload: errors.forbidden
            },
            {
                url: `/checkout-${type}-500`,
                method: httpMethods.get,
                responseStatus: httpStatusCodes.internalServerError,
                payload: errors.server
            },
            {
                url: `/checkout-${type}-timeout`,
                method: httpMethods.get,
                responseStatus: httpStatusCodes.noResponse
            }
        );
    });

    return tenantRequests;
}

export default [
    ...deliveryRequests(),
    ...buildTenantSpecificGetCheckoutRequests()
];
