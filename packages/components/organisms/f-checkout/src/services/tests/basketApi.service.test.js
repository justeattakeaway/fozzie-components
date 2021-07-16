import axios from 'axios';
import basketApi from '../basketApi';

describe('BasketApi', () => {
    let payload;
    let config;

    beforeEach(() => {
        // Arrange
        payload = {
            url: 'http://localhost/account/checkout',
            timeout: 10000,
            tenant: 'uk',
            language: 'en-GB'
        };
        config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': payload.tenant,
                'Accept-Language': payload.language
            },
            timeout: payload.timeout
        };

        axios.get = jest.fn(() => Promise.resolve({ status: 200 }));
    });
    describe('getBasket ::', () => {
        it('should get the basket details from the backend', async () => {
            // Act
            await basketApi.getBasket(payload.url, payload.tenant, payload.language, payload.timeout);

            // Assert
            expect(axios.get).toHaveBeenCalledWith(payload.url, config);
        });
    });
});
