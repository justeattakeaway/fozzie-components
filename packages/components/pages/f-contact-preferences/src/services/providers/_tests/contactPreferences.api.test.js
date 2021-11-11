import ContactPreferencesApi from '../contactPreferences.api';

let apiProvider;
let httpMock;
const httpGetSpy = jest.fn();
const httpPostSpy = jest.fn();
let cookiesMock;
const cookiesSetSpy = jest.fn();
const baseUrlMock = 'https://smartGatewayBaseUrl.com';
const authTokenMock = 'some-auth-token';
const conversationId = 'b7386108-95e6-4e73-9421-5b066c089153';
const bodyMock = {
    Preference: [{
        DisplayName: 'Order status',
        Sort: 1,
        Key: 'orderstatus',
        Push: false,
        Email: true,
        Sms: true
    }, {
        DisplayName: 'Review meal',
        Sort: 2,
        Key: 'reviewmeal',
        Push: false,
        Email: false,
        Sms: false
    }, {
        DisplayName: 'News & offers',
        Sort: 3,
        Key: 'news',
        Push: false,
        Email: true,
        Sms: false
    }
    ],
    DeviceToken: null,
    DeviceType: null,
    PhoneNumber: null,
    PreferenceVersionViewed: 0
};

describe('ContactPreferencesApi Provider', () => {
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
            baseUrl: baseUrlMock
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
                baseUrl: baseUrlMock
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
            await apiProvider.getPreferences(authTokenMock);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith('x-je-conversation', expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.getPreferences(authTokenMock, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrlMock}/consumer/preferences`;
            const expectedHeaders = {
                Authorization: `Bearer ${authTokenMock}`,
                'x-je-conversation': conversationId
            };

            // Act
            await apiProvider.getPreferences(authTokenMock, conversationId);

            // Assert
            expect(httpGetSpy).toHaveBeenCalledWith(expectedUri, expectedHeaders);
        });
    });

    describe('When calling `postPreferences`', () => {
        it('should set the cookie with a new conversation id if not provided with one', async () => {
            // Act
            await apiProvider.postPreferences(authTokenMock, bodyMock);

            // Assert
            expect(cookiesSetSpy).toHaveBeenCalledWith('x-je-conversation', expect.anything());
        });

        it('should not set the cookie if already provided with a conversation id', async () => {
            // Act
            await apiProvider.postPreferences(authTokenMock, bodyMock, conversationId);

            // Assert
            expect(cookiesSetSpy).not.toHaveBeenCalled();
        });

        it('should send the correct parameters', async () => {
            // Arrange
            const expectedUri = `${baseUrlMock}/consumer/preferences`;
            const expectedBody = bodyMock;
            const expectedHeaders = {
                Authorization: `Bearer ${authTokenMock}`,
                'x-je-conversation': `${conversationId}`
            };

            // Act
            await apiProvider.postPreferences(authTokenMock, bodyMock, conversationId);

            // Assert
            expect(httpPostSpy).toHaveBeenCalledWith(expectedUri, expectedBody, expectedHeaders);
        });
    });
});
