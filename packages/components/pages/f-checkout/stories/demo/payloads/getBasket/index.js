import { CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_DINEIN } from '../../../../src/constants';
import { httpMethods, httpStatusCodes } from '../../../helpers';
import getBasket from './getBasket';

const RESTRICTIONS = {
    age: 'ageRestriction',
    invalid: 'invalidProduct',
    offline: 'offlineProduct'
};

export default {
    'get-basket-delivery': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY)
    },
    'get-basket-collection': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getBasket(CHECKOUT_METHOD_COLLECTION)
    },
    'get-basket-dinein': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getBasket(CHECKOUT_METHOD_DINEIN)
    },
    'get-basket-invalid-products': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.invalid)
    },
    'get-basket-offline-products': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.offline)
    },
    'get-basket-offline-age-restriction': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.age)
    },
    'get-basket-timeout': {
        method: httpMethods.get,
        responseStatus: httpStatusCodes.noResponse
    }
};
