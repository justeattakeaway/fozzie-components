import AccountWebApi from '../AccountWeb.api';

import {
    SUBMIT_LOGIN_CHALLENGE_URL,
    CONVERSATION_ID_HEADER_NAME,
    CONVERSATION_ID_COOKIE_NAME
} from '../../constants';
import {
    baseUrl,
    conversationId,
    postChallengeBody
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

        apiProvider = new AccountWebApi({ httpClient: httpClientMock, cookies: cookiesMock, baseUrl });
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

    describe('When calling `postChallenge`', () => {
        it('should send the correct parameters to the api', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/${SUBMIT_LOGIN_CHALLENGE_URL}`;
            const expectedBody = postChallengeBody;
            const expectedHeaders = {
                [CONVERSATION_ID_HEADER_NAME]: conversationId
            };

            // Act
            await apiProvider.postChallenge(postChallengeBody, conversationId);

            // Assert
            expect(httpPostSpy).toHaveBeenCalledWith(expectedUri, expectedBody, expectedHeaders);
        });

        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.postChallenge(postChallengeBody);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith(CONVERSATION_ID_COOKIE_NAME, expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.postChallenge(postChallengeBody, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });
    });
});
