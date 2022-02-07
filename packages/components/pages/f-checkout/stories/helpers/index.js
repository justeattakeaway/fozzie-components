import {
    CHECKOUT_NOTE_TYPE_KITCHEN,
    CHECKOUT_NOTE_TYPE_COURIER
} from '../../src/constants';

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
    unavailable: 'unavailable-time',
    asap: 'asap'
};

export const httpStatusCodes = {
    noResponse: 0,
    ok: 200,
    badRequest: 400,
    forbidden: 403,
    internalServerError: 500
};

export const httpMethods = {
    get: 'get',
    post: 'post',
    patch: 'patch'
};

export const getSuccess = {
    method: httpMethods.get,
    responseStatus: httpStatusCodes.ok
};

export const getNoResponse = {
    method: httpMethods.get,
    responseStatus: httpStatusCodes.ok
};

export const postSuccess = {
    method: httpMethods.post,
    responseStatus: httpStatusCodes.ok
};

export const patchSuccess = {
    method: httpMethods.patch,
    responseStatus: httpStatusCodes.ok
};

export const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

export const ISSUES = {
    timeUnavailable: 'FULFILMENT_TIME_UNAVAILABLE',
    serviceTypeUnavailable: 'SERVICE_TYPE_UNAVAILABLE',
    restaurantNotTakingOrders: 'RESTAURANT_NOT_TAKING_ORDERS',
    geoLocationRequired: 'GEOLOCATION_REQUIRED',
    additionalItemsRequired: 'ADDITIONAL_ITEMS_REQUIRED',
    forbidden: 'forbidden'
};

