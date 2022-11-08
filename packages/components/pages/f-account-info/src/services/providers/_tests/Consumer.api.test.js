import ConsumerApi from '../Consumer.api';

import {
    CONSUMER_DETAILS_URL,
    CONSUMER_ADDRESSES_URL,
    AUTHORISATION_HEADER_NAME
} from '../../../constants';
import {
    baseUrl,
    token,
    consumerUpdateBody
} from '../../../../test-utils/setup';

let apiProvider;
let httpClientMock;
let cookiesMock;
const cookiesSetSpy = jest.fn();
const httpGetSpy = jest.fn();
const httpPatchSpy = jest.fn();

describe('ConsumerApi Provider', () => {
    beforeEach(() => {
        httpClientMock = {
            get: httpGetSpy,
            patch: httpPatchSpy
        };
        cookiesMock = {
            set: cookiesSetSpy
        };

        apiProvider = new ConsumerApi({ httpClient: httpClientMock, cookies: cookiesMock, baseUrl });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When creating a new instance', () => {
        it('should not throw error when instance is created with valid parameters', () => {
            // Act
            const createInstance = () => new ConsumerApi({
                httpClient: {}
            });

            // Assert
            let instance;
            expect(() => { instance = createInstance(); }).not.toThrowError();
            expect(instance).toBeDefined();
        });
    });

    describe('When calling `getConsumerDetails`', () => {
        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/${CONSUMER_DETAILS_URL}`;
            const expectedHeaders = {
                [AUTHORISATION_HEADER_NAME]: `Bearer ${token}`
            };

            // Act
            await apiProvider.getConsumerDetails(token);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });

    describe('When calling `getConsumerAddresses`', () => {
        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/${CONSUMER_ADDRESSES_URL}`;
            const expectedHeaders = {
                [AUTHORISATION_HEADER_NAME]: `Bearer ${token}`
            };

            // Act
            await apiProvider.getConsumerAddresses(token);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });

    describe('When calling `patchConsumer`', () => {
        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/${CONSUMER_DETAILS_URL}`;
            const expectedBody = consumerUpdateBody;
            const expectedHeaders = {
                [AUTHORISATION_HEADER_NAME]: `Bearer ${token}`
            };

            // Act
            await apiProvider.patchConsumer(token, consumerUpdateBody);

            // Assert
            expect(httpPatchSpy).toHaveBeenCalledWith(expectedUri, expectedBody, expectedHeaders);
        });
    });
});
