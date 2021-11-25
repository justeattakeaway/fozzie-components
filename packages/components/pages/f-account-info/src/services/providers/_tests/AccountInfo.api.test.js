import AccountInfoApi from '../AccountInfo.api';
import {
    baseUrl,
    token,
    conversationId
} from '../../../../test-utils/setup';

let apiProvider;
let httpClientMock;
let cookiesMock;
const cookiesSetSpy = jest.fn();
const httpGetSpy = jest.fn();

describe('AccountInfoApi Provider', () => {
    beforeEach(() => {
        httpClientMock = {
            get: httpGetSpy
        };
        cookiesMock = {
            set: cookiesSetSpy
        };

        apiProvider = new AccountInfoApi({ httpClient: httpClientMock, cookies: cookiesMock, baseUrl });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When creating a new instance', () => {
        it('should not throw error when instance is created with valid parameters', () => {
            // Act
            const createInstance = () => new AccountInfoApi({
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
            expect(cookiesSetSpy).toHaveBeenCalledWith('x-je-conversation', expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.getConsumerDetails(token, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/consumer`;
            const expectedHeaders = {
                Authorization: `Bearer ${token}`,
                'x-je-conversation': conversationId
            };

            // Act
            await apiProvider.getConsumerDetails(token, conversationId);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });
});
