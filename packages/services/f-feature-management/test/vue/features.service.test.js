import FeaturesService from '../../src/vue/services/features.service';

const mockStore = {
    state: {
        configuration: {
            settings: {
                featureManagement: {
                    scope: 'je-coreweb',
                    environment: 'development',
                    obfuscationKey: 'abcdefghij0123456789',
                    pollInterval: 1000 * 15
                }
            }
        }
    },
    registerModule: jest.fn(),
    dispatch: jest.fn()
};

const mockResponse = {
    createdAt: '2021-09-10 15:00',
    features: [
        {
            key: 'key1',
            testVal: 'val1'
        }
    ]
};

const mockHttpClient = {
    get: jest.fn(() => Promise.resolve({ data: mockResponse }))
};

const mockCookies = {};

const mockAnalytics = {};

const mockLogger = {
    logInfo: jest.fn()
};

function createSUT () {
    return new FeaturesService(mockStore, {
        httpClient: mockHttpClient,
        cookies: mockCookies,
        analytics: mockAnalytics,
        logger: mockLogger
    });
}

describe('Feature Service tests', () => {
    it('initialises correctly', () => {
        // Arrange & Act
        const service = createSUT();

        // Assert
        expect(mockStore.registerModule).toHaveBeenCalled();
        expect(service.plugin).toBeTruthy();
    });
    it('stores expected config', async () => {
        // Arrange
        const service = createSUT();

        // Act
        await service.update();

        // Assert
        expect(mockStore.dispatch).toBeCalledWith('f-feature-management/update', mockResponse);
    });
});
