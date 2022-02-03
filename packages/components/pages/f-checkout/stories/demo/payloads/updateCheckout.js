// import updateCheckout from './update-checkout.json';
import { httpMethods, httpStatusCodes, ISSUES } from '../../helpers';

const updateCheckout = (issue, isForbidden = false) => {
    if (isForbidden) {
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
        issues: issue ? [{ code: issue }] : []
    };
};

export default {
    'update-checkout': {
        method: httpMethods.patch,
        status: httpStatusCodes.ok,
        payload: updateCheckout()
    },
    'update-checkout-restaurant-not-taking-orders': {
        method: httpMethods.patch,
        status: httpStatusCodes.ok,
        payload: updateCheckout(ISSUES.restaurantNotTakingOrders)
    },
    'update-checkout-service-type-unavailable': {
        method: httpMethods.patch,
        status: httpStatusCodes.ok,
        payload: updateCheckout(ISSUES.serviceTypeUnavailable)
    },
    'update-checkout-additional-items-required': {
        method: httpMethods.patch,
        status: httpStatusCodes.ok,
        payload: updateCheckout(ISSUES.additionalItemsRequired)
    },
    'update-checkout-403': {
        method: httpMethods.patch,
        status: httpStatusCodes.forbidden,
        payload: updateCheckout(false, true)
    },
    'update-checkout-time-unavailable': {
        method: httpMethods.patch,
        status: httpStatusCodes.ok,
        payload: updateCheckout(ISSUES.timeUnavailable)
    },
    'update-checkout-geolocation-required': {
        method: httpMethods.patch,
        status: httpStatusCodes.ok,
        payload: updateCheckout(ISSUES.geolocationRequired)
    },
    'update-checkout-timeout': {
        method: httpMethods.patch,
        status: httpStatusCodes.ok
    }
};
