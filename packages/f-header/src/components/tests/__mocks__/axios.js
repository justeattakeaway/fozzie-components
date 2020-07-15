import loggedInUserMock from './api.account.details.json';

/**
 * Mocks axios calls in the header tests
 **/
module.exports = {
    get: jest.fn(url => {
        if (url === '/api/account/details') {
            return Promise.resolve({ data: loggedInUserMock });
        } else if (url === '/analytics/ordercount') {
            return Promise.resolve({
                Count: 1,
                UserId: '6342d07e'
                // Properties below are overwritten in tests, but for completeness of an example API response…
                // Created: '2020-05-07T15:24:19.7875501Z'
                // Expires: '2020-05-07T17:24:19.7875501Z'
            });
        }
        return false;
    })
};
