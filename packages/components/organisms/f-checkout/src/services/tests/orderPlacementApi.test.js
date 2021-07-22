import axios from 'axios';
import placeOrderApi from '../orderPlacementApi';
import { version as applicationVersion } from '../../../package.json';
import { mockAuthToken } from '../../components/_tests/helpers/setup';

const authToken = mockAuthToken;

describe('orderPlacementApi', () => {
    let payload;
    let config;
    let state;

    beforeEach(() => {
        // Arrange
        payload = {
            url: 'http://localhost/account/checkout',
            timeout: 10000,
            data: ''
        };

        state = {
            authToken
        };

        config = {
            headers: {
                'Content-Type': 'application/json;v=2',
                'x-je-feature': 'CoreWeb',
                'x-je-application-id': 7, // Responsive Web
                'x-je-application-version': applicationVersion,
                Authorization: `Bearer ${authToken}`
            },
            timeout: payload.timeout
        };

        axios.post = jest.fn(() => Promise.resolve({ status: 200 }));
    });

    describe('placeOrder ::', () => {
        it('should post the order details to the backend', async () => {
            // Act
            await placeOrderApi.placeOrder(payload.url, payload.data, payload.timeout, state);

            // Assert
            expect(axios.post).toHaveBeenCalledWith(payload.url, payload.data, config);
        });
    });
});
