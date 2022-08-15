import AccountWebApi from '../AccountWeb.api';

import {
    CONVERSATION_ID_HEADER_NAME,
    CONVERSATION_ID_COOKIE_NAME
} from '../../constants';
import {
    conversationId,
    postBody,
    validateUrl
} from '../../../test-utils/setup';

let apiProvider;
let httpClientMock;
let cookiesMock;
const cookiesSetSpy = jest.fn();
const httpPostSpy = jest.fn();

describe('AccountWebApi Provider', () => {
    beforeEach(() => {
        httpClientMock = {
            post: httpPostSpy
        };
        cookiesMock = {
            set: cookiesSetSpy
        };

        apiProvider = new AccountWebApi({ httpClient: httpClientMock, cookies: cookiesMock, validateUrl });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When creating a new instance', () => {
        it('should not throw error when instance is created with valid parameters', () => {
            // Act
            const createInstance = () => new AccountWebApi({
                httpClient: {}
            });

            // Assert
            let instance;
            expect(() => { instance = createInstance(); }).not.toThrowError();
            expect(instance).toBeDefined();
        });
    });

    describe('When calling `postValidateMfaToken`', () => {
        it('should send the correct parameters to the api', async () => {
            // Arrange
            const expectedUri = 'https://localhost:8080/mfa/validate';
            const expectedBody = postBody;
            const expectedHeaders = {
                [CONVERSATION_ID_HEADER_NAME]: conversationId
            };

            // Act
            await apiProvider.postValidateMfaToken(postBody, conversationId);

            // Assert
            expect(httpPostSpy).toHaveBeenCalledWith(expectedUri, expectedBody, expectedHeaders);
        });

        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.postValidateMfaToken(postBody);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith(CONVERSATION_ID_COOKIE_NAME, expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.postValidateMfaToken(postBody, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });
    });
});
