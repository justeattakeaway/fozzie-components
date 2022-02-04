// import updateCheckout from './update-checkout.json';
import { httpMethods, httpStatusCodes, ISSUES } from '../../helpers';

const updateCheckout = error => {
    if (error === ISSUES.forbidden) {
        return {
            faultId: 'cdc59433-391e-4299-abbb-4ab03d4e0d6c',
            traceId: '9fdec3c2-b78a-45eb-9ee4-b8ccc5e66da5',
            errors: [
                {
                    description: 'Access to the resource is forbidden',
                    errorCode: null
                }
            ]
        };
    }

    return {
        isFulfillable: true,
        issues: error ? [{ code: error }] : []
    };
};

const http = {
    method: httpMethods.patch,
    responseStatus: httpStatusCodes.ok
};

export default [
    {
        url: '/update-checkout',
        ...http,
        payload: updateCheckout()
    },
    {
        url: '/update-checkout-restaurant-not-taking-orders',
        ...http,
        payload: updateCheckout(ISSUES.restaurantNotTakingOrders)
    },
    {
        url: '/update-checkout-service-type-unavailable',
        ...http,
        payload: updateCheckout(ISSUES.serviceTypeUnavailable)
    },
    {
        url: '/update-checkout-additional-items-required',
        ...http,
        payload: updateCheckout(ISSUES.additionalItemsRequired)
    },
    {
        url: '/update-checkout-403',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.forbidden,
        payload: updateCheckout(ISSUES.forbidden)
    },
    {
        url: '/update-checkout-time-unavailable',
        ...http,
        payload: updateCheckout(ISSUES.timeUnavailable)
    },
    {
        url: '/update-checkout-geolocation-required',
        ...http,
        payload: updateCheckout(ISSUES.geolocationRequired)
    },
    {
        url: '/update-checkout-timeout',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.noResponse
    }
];
