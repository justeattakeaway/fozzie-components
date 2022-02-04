import { CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_DINEIN } from '../../../../src/constants';
import { httpMethods, httpStatusCodes } from '../../../helpers';
import getBasket from './getBasket';

const RESTRICTIONS = {
    age: 'ageRestriction',
    invalid: 'invalidProduct',
    offline: 'offlineProduct'
};

const success = {
    method: httpMethods.get,
    responseStatus: httpStatusCodes.ok
};

export default [
    {
        url: '/get-basket-delivery',
        ...success,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY)
    },
    {
        url: '/get-basket-collection',
        ...success,
        payload: getBasket(CHECKOUT_METHOD_COLLECTION)
    },
    {
        url: '/get-basket-dinein',
        ...success,
        payload: getBasket(CHECKOUT_METHOD_DINEIN)
    },
    {
        url: '/get-basket-invalid-products',
        ...success,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.invalid)
    },
    {
        url: '/get-basket-offline-products',
        ...success,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.offline)
    },
    {
        url: '/get-basket-offline-age-restriction',
        ...success,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.age)
    },
    {
        url: '/get-basket-timeout',
        method: httpMethods.get,
        responseStatus: httpStatusCodes.noResponse
    }
];
