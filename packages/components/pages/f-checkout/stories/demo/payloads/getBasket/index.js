import { CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_DINEIN } from '../../../../src/constants';
import { getSuccess, getNoResponse } from '../../../helpers';
import getBasket from './getBasket';

const RESTRICTIONS = {
    age: 'ageRestriction',
    invalid: 'invalidProduct',
    offline: 'offlineProduct'
};

function basketRequests () {
    const tenantRequests = [];

    [CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_DINEIN].forEach(method => {
        tenantRequests.push({
            url: `/get-basket-${method}`,
            ...getSuccess,
            payload: getBasket(method)
        });
    });

    return tenantRequests;
}

export default [
    ...basketRequests(),
    {
        url: '/get-basket-invalid-products',
        ...getSuccess,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.invalid)
    },
    {
        url: '/get-basket-offline-products',
        ...getSuccess,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.offline)
    },
    {
        url: '/get-basket-offline-age-restriction',
        ...getSuccess,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.age)
    },
    {
        url: '/get-basket-timeout',
        ...getNoResponse
    }
];
