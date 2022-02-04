import { httpMethods, httpStatusCodes } from '../../helpers';

function getAvailableTimes (payload) {
    const asapUnavailable = payload?.asapUnavailable;
    const timesUnavailable = payload?.timesUnavailable;
    const issues = payload?.issues;

    const times = [
        {
            from: '2020-01-01T01:30:00.000Z',
            to: '2020-01-01T01:30:00.000Z'
        },
        {
            from: '2020-01-01T01:45:00.000Z',
            to: '2020-01-01T01:45:00.000Z'
        },
        {
            from: '2020-01-01T02:00:00.000Z',
            to: '2020-01-01T02:00:00.000Z'
        },
        {
            from: '2020-01-01T02:15:00.000Z',
            to: '2020-01-01T02:15:00.000Z'
        }
    ];

    return {
        times: timesUnavailable ? [] : times,
        asapAvailable: !asapUnavailable,
        issues: issues ? [{ code: 'RESTAURANT_NOT_TAKING_ORDERS' }] : []
    };
}

const success = {
    method: httpMethods.get,
    responseStatus: httpStatusCodes.ok
};

export default [
    {
        url: '/checkout-available-fulfilment-preorder',
        ...success,
        payload: getAvailableTimes({ asapUnavailable: true })
    },
    {
        url: '/checkout-available-fulfilment',
        ...success,
        payload: getAvailableTimes()
    },
    {
        url: '/checkout-available-fulfilment-time-unavailable',
        ...success,
        payload: getAvailableTimes({ asapUnavailable: true, timesUnavailable: true })
    },

    {
        url: '/checkout-available-fulfilment-issues',
        ...success,
        payload: getAvailableTimes({ issues: true })
    }
];
