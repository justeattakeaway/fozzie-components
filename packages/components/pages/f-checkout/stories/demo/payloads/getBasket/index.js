import { CHECKOUT_METHOD_COLLECTION, CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_DINEIN } from '../../../../src/constants';
import getBasket from './getBasket';

const RESTRICTIONS = {
    age: 'ageRestriction',
    invalid: 'invalidProduct',
    offline: 'offlineProduct'
};

export default {
    ageRestriction: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.age),
    collection: getBasket(CHECKOUT_METHOD_DELIVERY),
    delivery: getBasket(CHECKOUT_METHOD_COLLECTION),
    dinein: getBasket(CHECKOUT_METHOD_DINEIN),
    invalidProducts: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.invalid),
    offlineProducts: getBasket(CHECKOUT_METHOD_DELIVERY, RESTRICTIONS.offline)
};
