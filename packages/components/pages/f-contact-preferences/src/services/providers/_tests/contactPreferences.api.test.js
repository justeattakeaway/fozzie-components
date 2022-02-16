import ContactPreferencesApi from '../contactPreferences.api';

import {
    baseUrl,
    token,
    conversationId,
    contactPreferencesUpdateBody
} from '../../../../test-utils/setup';

describe('ContactPreferencesApi Provider', () => {
    let apiProvider;
    let httpMock;
    let cookiesMock;
    const locale = 'en-GB';
    const cookiesSetSpy = jest.fn();
    const httpGetSpy = jest.fn();
    const httpPostSpy = jest.fn();

    beforeEach(() => {
        // Arrange mocks/spies
        httpMock = {
            get: httpGetSpy,
            post: httpPostSpy
        };
        cookiesMock = {
            set: cookiesSetSpy
        };

        // Arrange - sut
        apiProvider = new ContactPreferencesApi({
            httpClient: httpMock,
            cookies: cookiesMock,
            baseUrl,
            locale
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When creating a new instance', () => {
        it('should not throw error when instance is created with valid parameters', () => {
            // Act
            const createInstance = () => new ContactPreferencesApi({
                httpClient: httpMock,
                cookies: cookiesMock,
                baseUrl
            });

            // Assert
            let instance;
            expect(() => {
                instance = createInstance();
            }).not.toThrowError();
            expect(instance).toBeDefined();
        });
    });

    describe('When calling `getPreferences`', () => {
        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.getPreferences(token);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith('x-je-conversation', expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.getPreferences(token, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/consumer/preferences`;
            const expectedHeaders = {
                Authorization: `Bearer ${token}`,
                'x-je-conversation': conversationId,
                'Accept-Language': locale
            };

            // Act
            await apiProvider.getPreferences(token, conversationId);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });

    describe('When calling `postPreferences`', () => {
        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.postPreferences(token, contactPreferencesUpdateBody);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith('x-je-conversation', expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.postPreferences(token, contactPreferencesUpdateBody, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/consumer/preferences`;
            const expectedBody = contactPreferencesUpdateBody;
            const expectedHeaders = {
                Authorization: `Bearer ${token}`,
                'x-je-conversation': conversationId,
                'Accept-Language': locale
            };

            // Act
            await apiProvider.postPreferences(token, contactPreferencesUpdateBody, conversationId);

            // Assert
            expect(httpPostSpy).toHaveBeenCalledWith(expectedUri, expectedBody, expectedHeaders);
        });
    });
});
