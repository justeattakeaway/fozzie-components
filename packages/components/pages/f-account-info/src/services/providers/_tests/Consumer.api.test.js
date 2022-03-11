import ConsumerApi from '../Consumer.api';

import {
    CONSUMER_DETAILS_URL,
    CONSUMER_ADDRESSES_URL,
    CONVERSATION_ID_HEADER_NAME,
    AUTHORISATION_HEADER_NAME,
    CONVERSATION_ID_COOKIE_NAME
} from '../../../constants';
import {
    baseUrl,
    token,
    conversationId,
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
        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.getConsumerDetails(token);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith(CONVERSATION_ID_COOKIE_NAME, expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.getConsumerDetails(token, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/${CONSUMER_DETAILS_URL}`;
            const expectedHeaders = {
                [AUTHORISATION_HEADER_NAME]: `Bearer ${token}`,
                [CONVERSATION_ID_HEADER_NAME]: conversationId
            };

            // Act
            await apiProvider.getConsumerDetails(token, conversationId);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });

    describe('When calling `getConsumerAddresses`', () => {
        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.getConsumerAddresses(token);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith(CONVERSATION_ID_COOKIE_NAME, expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.getConsumerAddresses(token, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/${CONSUMER_ADDRESSES_URL}`;
            const expectedHeaders = {
                [AUTHORISATION_HEADER_NAME]: `Bearer ${token}`,
                [CONVERSATION_ID_HEADER_NAME]: conversationId
            };

            // Act
            await apiProvider.getConsumerAddresses(token, conversationId);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });

    describe('When calling `patchConsumer`', () => {
        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.patchConsumer(token);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith(CONVERSATION_ID_COOKIE_NAME, expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.patchConsumer(token, consumerUpdateBody, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/${CONSUMER_DETAILS_URL}`;
            const expectedBody = consumerUpdateBody;
            const expectedHeaders = {
                [AUTHORISATION_HEADER_NAME]: `Bearer ${token}`,
                [CONVERSATION_ID_HEADER_NAME]: conversationId
            };

            // Act
            await apiProvider.patchConsumer(token, consumerUpdateBody, conversationId);

            // Assert
            expect(httpPatchSpy).toHaveBeenCalledWith(expectedUri, expectedBody, expectedHeaders);
        });
    });
});
