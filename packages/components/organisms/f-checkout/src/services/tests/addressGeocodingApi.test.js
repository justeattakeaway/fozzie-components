import axios from 'axios';
import addressGeocodingApi from '../addressGeocodingApi';
import { mockAuthToken } from '../../components/_tests/helpers/setup';

const locationData = {
    addressLines: [
        '1 Jazz Avenue',
        'Strange Town',
        'JZ1 1AA'
    ]
};

const authToken = mockAuthToken;

describe('AddressGeocodingApi', () => {
    let payload;
    let state;
    let config;

    beforeEach(() => {
        // Arrange
        payload = {
            url: 'http://localhost/account/checkout',
            timeout: 10000,
            postData: locationData
        };
        config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            timeout: payload.timeout
        };
        state = {
            authToken
        };

        axios.post = jest.fn(() => Promise.resolve({ status: 200 }));
    });

    describe('getGeoLocation ::', () => {
        it('should post address and return the geolocation from the backend', async () => {
            // Act
            await addressGeocodingApi.getGeoLocation(payload.url, payload.postData, payload.timeout, state);

            // Assert
            expect(axios.post).toHaveBeenCalledWith(payload.url, payload.postData, config);
        });
    });
});
