// import updateCheckout from './update-checkout.json';
import { ISSUES } from '../../helpers';

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
    default: updateCheckout(),
    additionalItemsRequired: updateCheckout(ISSUES.additionalItemsRequired),
    geolocationRequired: updateCheckout(ISSUES.geoLocationRequired),
    restaurantNotTakingOrders: updateCheckout(ISSUES.restaurantNotTakingOrders),
    serviceTypeUnavailable: updateCheckout(ISSUES.serviceTypeUnavailable),
    unavailable: updateCheckout(ISSUES.timeUnavailable),
    error: updateCheckout(false, true)
};
