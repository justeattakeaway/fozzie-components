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
                url: `/${tenant}/checkout-collection`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).collection)
            },
            {
                url: `/${tenant}/checkout-delivery`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).delivery)
            },
            {
                url: `/${tenant}/checkout-dinein`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).dinein)
            },
            {
                url: `/${tenant}/checkout-delivery-split-notes-courier`,
                ...getSuccess,
                payload: getCheckout(...args(tenant).delivery, { notes: NOTE_TYPES.courier })
            },
            {
                url: `/${tenant}/checkout-delivery-split-notes-courier-kitchen`,
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
        url: '/checkout-403-get-error',
        ...getNoResponse,
        payload: errors.forbidden
    },
    {
        url: '/checkout-500-get-error',
        ...getNoResponse,
        payload: errors.server
    },
    {
        url: '/checkout-timeout-get-error',
        ...getNoResponse
    },
    ...scheduledTimes(),
    ...buildTenantSpecificGetCheckoutRequests()
];
