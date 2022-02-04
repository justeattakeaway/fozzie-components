import { getSuccess } from '../../helpers';

export function getAvailableTimes (payload) {
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
        ...(issues ? {issues: [{ code: 'RESTAURANT_NOT_TAKING_ORDERS' }]} : {})
    };
}

export default [
    {
        url: '/checkout-available-fulfilment-preorder',
        ...getSuccess,
        payload: getAvailableTimes({ asapUnavailable: true })
    },
    {
        url: '/checkout-available-fulfilment',
        ...getSuccess,
        payload: getAvailableTimes()
    },
    {
        url: '/checkout-available-fulfilment-time-unavailable',
        ...getSuccess,
        payload: getAvailableTimes({ asapUnavailable: true, timesUnavailable: true })
    },

    {
        url: '/checkout-available-fulfilment-issues',
        ...getSuccess,
        payload: getAvailableTimes({ issues: true })
    }
];
