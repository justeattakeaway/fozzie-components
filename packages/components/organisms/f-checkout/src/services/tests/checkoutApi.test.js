import axios from 'axios';
import checkoutApi from '../checkoutApi';
import { mockAuthToken } from '../../components/_tests/helpers/setup';

const mobileNumber = '+447111111111';
const authToken = mockAuthToken;

describe('CheckoutApi', () => {
    let payload;
    let rootGetters;
    let state;

    beforeEach(() => {
        // Arrange
        rootGetters = {};
        payload = {
            url: 'http://localhost/account/checkout',
            timeout: 10000
        };
        state = {
            authToken
        };
    });

    describe('getCheckout ::', () => {
        let config;

        beforeEach(() => {
            // Arrange
            config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json;v=2',
                    Authorization: `Bearer ${state.authToken}`
                },
                timeout: payload.timeout
            };

            axios.get = jest.fn(() => Promise.resolve({}));
        });

        it('should get the checkout details from the backend', async () => {
            // Act
            await checkoutApi.getCheckout(payload.url, state, payload.timeout);

            // Assert
            expect(axios.get).toHaveBeenCalledWith(payload.url, config);
        });
    });

    describe('updateCheckout ::', () => {
        let config;

        beforeEach(() => {
            // Arrange
            payload = {
                mobileNumber
            };
            config = {
                headers: {
                    'Content-Type': 'application/json-patch+json;v=2',
                    Authorization: `Bearer ${state.authToken}`
                },
                timeout: payload.timeout
            };

            axios.patch = jest.fn(() => Promise.resolve({ }));
        });

        it('should patch the checkout details to the backend', async () => {
            // Arrange
            const request = {
                url: payload.url,
                state,
                rootGetters,
                data: payload.data,
                timeout: payload.timeout
            };
            // Act
            await checkoutApi.updateCheckout(request);

            // Assert
            expect(axios.patch).toHaveBeenCalledWith(payload.url, payload.data, config);
        });
    });

    describe('getAvailableFulfilment ::', () => {
        let config;

        beforeEach(() => {
            // Arrange
            config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: payload.timeout
            };

            axios.get = jest.fn(() => Promise.resolve({ }));
        });

        it('should get the checkout available fulfilment details from the backend', async () => {
            // Act
            await checkoutApi.getAvailableFulfilment(payload.url, payload.timeout);

            // Assert
            expect(axios.get).toHaveBeenCalledWith(payload.url, config);
        });
    });
});
