import { httpMethods, httpStatusCodes } from '../../helpers';

function placeOrder (isDuplicate = false) {
    if (isDuplicate) {
        return {
            errorCode: 'DuplicateOrder',
            errorId: 'bfa0a088-0f63-4b70-aadb-708da9cd9cea',
            message: 'A similar order has been created within the time window.',
            fingerprint: 'dc731273ecb92e9207a69800b6bae8b1190211bc',
            _links: {},
            requestId: '8000143f-0000-fa00-b63f-84710c7967bb',
            statusCode: 400,
            timestamp: '2021-04-14T10:50:54.458067+00:00',
            version: '1.0.2634 (bfa3c1e)'
        };
    }

    return {
        orderId: 'abcdefgh1',
        friendlyOrderId: 1234
    };
}

export default {
    'place-order': {
        method: httpMethods.post,
        status: httpStatusCodes.ok,
        payload: placeOrder()
    },
    'place-order-duplicate': {
        method: httpMethods.post,
        status: httpStatusCodes.badRequest,
        payload: placeOrder(true)
    },
    'place-order-timeout': {
        method: httpMethods.post,
        status: httpStatusCodes.noResponse
    }
};
