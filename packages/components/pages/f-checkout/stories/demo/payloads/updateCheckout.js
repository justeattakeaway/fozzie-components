import {
    httpMethods, httpStatusCodes, ISSUES, patchSuccess
} from '../../helpers';

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

export default [
    {
        url: '/update-checkout',
        ...patchSuccess,
        payload: updateCheckout()
    },
    {
        url: '/update-checkout-restaurant-not-taking-orders',
        ...patchSuccess,
        payload: updateCheckout(ISSUES.restaurantNotTakingOrders)
    },
    {
        url: '/update-checkout-service-type-unavailable',
        ...patchSuccess,
        payload: updateCheckout(ISSUES.serviceTypeUnavailable)
    },
    {
        url: '/update-checkout-additional-items-required',
        ...patchSuccess,
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
        ...patchSuccess,
        payload: updateCheckout(ISSUES.timeUnavailable)
    },
    {
        url: '/update-checkout-geolocation-required',
        ...patchSuccess,
        payload: updateCheckout(ISSUES.geolocationRequired)
    },
    {
        url: '/update-checkout-timeout',
        method: httpMethods.patch,
        responseStatus: httpStatusCodes.noResponse
    }
];
