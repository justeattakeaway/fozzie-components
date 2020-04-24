/**
 * Mocks axios calls in the header tests
 **/
module.exports = {
    get: jest.fn(url => {
        if (url === '/api/account/details') {
            return Promise.resolve({
                friendlyName: 'Bob',
                isAuthenticated: true,
                email: 'bob.magoo@just-eat.com'
            });
        } else if (url === '/analytics/ordercount') {
            return Promise.resolve({
                Count: 1,
                UserId: '6342d07e',
                Created: '2020-05-07T15:24:19.7875501Z',
                Expires: '2020-05-07T17:24:19.7875501Z'
            });
        }
        return false;
    })
};
