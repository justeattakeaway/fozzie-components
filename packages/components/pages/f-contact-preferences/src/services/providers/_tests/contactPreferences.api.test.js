import ContactPreferencesApi from '../contactPreferences.api';

import {
    baseUrl,
    token,
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
        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/consumer/preferences`;
            const expectedHeaders = {
                Authorization: `Bearer ${token}`,
                'Accept-Language': locale
            };

            // Act
            await apiProvider.getPreferences(token);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });

    describe('When calling `postPreferences`', () => {
        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrl}/consumer/preferences`;
            const expectedBody = contactPreferencesUpdateBody;
            const expectedHeaders = {
                Authorization: `Bearer ${token}`,
                'Accept-Language': locale
            };

            // Act
            await apiProvider.postPreferences(token, contactPreferencesUpdateBody);

            // Assert
            expect(httpPostSpy).toHaveBeenCalledWith(expectedUri, expectedBody, expectedHeaders);
        });
    });
});
