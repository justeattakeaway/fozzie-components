function getAvailableTimes (isAsapAvailable = true, availableTimes = true) {
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
        times: availableTimes ? times : [],
        asapAvailable: isAsapAvailable
    };
}


export default {
    default: getAvailableTimes(),
    noTimeAvailable: getAvailableTimes(false, false),
    preOrder: getAvailableTimes(false)
};
