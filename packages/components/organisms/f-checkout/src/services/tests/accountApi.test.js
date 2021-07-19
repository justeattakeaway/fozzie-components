import axios from 'axios';
import accountApi from '../accountApi';

const customerData = {
    firstName: 'Joe',
    lastName: 'Bloggs',
    email: 'joe@test.com'
};

describe('AccountApi', () => {
    let payload;
    let config;

    beforeEach(() => {
        payload = {
            url: 'http://localhost/account/createguest',
            tenant: 'uk',
            data: {
                customerData
            },
            timeout: 10000
        };

        config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': payload.tenant
            },
            timeout: payload.timeout
        };

        axios.post = jest.fn(() => Promise.resolve({ status: 200 }));
    });

    describe('createGuestUser ::', () => {
        it('should post guest user details to the backend', async () => {
            // Act
            await accountApi.createGuestUser(payload.url, payload.data, payload.timeout, payload.tenant);

            // Assert
            expect(axios.post).toHaveBeenCalledWith(payload.url, payload.data, config);
        });
    });
});
