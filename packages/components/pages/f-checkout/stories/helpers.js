import {
    CHECKOUT_NOTE_TYPE_KITCHEN,
    CHECKOUT_NOTE_TYPE_COURIER
} from '../src/constants';

export const NOTE_TYPES = {
    courier: [CHECKOUT_NOTE_TYPE_COURIER],
    split: [CHECKOUT_NOTE_TYPE_COURIER, CHECKOUT_NOTE_TYPE_KITCHEN]
};

export const TENANTS = {
    uk: 'uk',
    au: 'au',
    nz: 'nz'
};

export const DELIVERY_TIMES = {
    later: 'later',
    unavailable: 'unavailable',
    now: 'now'
};

export const ISSUES = {
    timeUnavailable: 'FULFILMENT_TIME_UNAVAILABLE',
    serviceTypeUnavailable: 'SERVICE_TYPE_UNAVAILABLE',
    restaurantNotTakingOrders: 'RESTAURANT_NOT_TAKING_ORDERS',
    geoLocationRequired: 'GEOLOCATION_REQUIRED',
    additionalItemsRequired: 'ADDITIONAL_ITEMS_REQUIRED'
};
