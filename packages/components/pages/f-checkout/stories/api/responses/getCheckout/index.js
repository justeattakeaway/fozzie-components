import getCheckout from './getCheckout';
import errors from './errors';
import {
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_DINEIN,
    CHECKOUT_METHOD_COLLECTION
} from '../../../../src/constants';
import {
    NOTE_TYPES, TENANTS, DELIVERY_TIMES, getSuccess, getNoResponse
} from '../../../helpers';

function args (tenant = TENANTS.uk) {
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
                payload: getCheckout(...args(tenant).collection)
            },
            {
                url: `/checkout-delivery-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).delivery)
            },
            {
                url: `/checkout-dinein-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).dinein)
            },
            {
                url: `/checkout-delivery-split-notes-courier-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).delivery, { notes: NOTE_TYPES.courier })
            },
            {
                url: `/checkout-delivery-split-notes-courier-kitchen-${tenant}`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).delivery, { notes: NOTE_TYPES.split })
            }
        );
    });

    return tenantRequests;
}

function scheduledTimes () {
    const tenantRequests = [];

    Object.values(DELIVERY_TIMES).forEach(time => {
        tenantRequests.push(
            {
                url: `/checkout-collection-user-selected-${time}`,
                ...getSuccess,
                payload: getCheckout(...args().collection, { scheduledTime: DELIVERY_TIMES.asap })
            },
            {
                url: `/checkout-delivery-user-selected-${time}`,
                ...getSuccess,
                payload: getCheckout(...args().delivery, { scheduledTime: DELIVERY_TIMES.asap })
            },
            {
                url: `/checkout-dinein-user-selected-${time}`,
                ...getSuccess,
                payload: getCheckout(...args().dinein, { scheduledTime: DELIVERY_TIMES.asap })
            }
        );
    });

    return tenantRequests;
}

export default [
    {
        url: '/checkout-403-error',
        ...getNoResponse,
        payload: errors.forbidden
    },
    {
        url: '/checkout-500-error',
        ...getNoResponse,
        payload: errors.server
    },
    {
        url: '/checkout-timeout-error',
        ...getNoResponse
    },
    ...scheduledTimes(),
    ...buildTenantSpecificGetCheckoutRequests()
];
