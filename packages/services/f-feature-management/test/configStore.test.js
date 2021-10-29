import mockAxios from 'jest-mock-axios';
import { getFeature, loadFromCdn } from '../src/configStore';

const cdnSettings = {
    scope: 'test-scope',
    environment: 'test-env',
    key: 'test-key',
    poll: true
};

const modifiedPollingCdnSettings = {
    ...cdnSettings,
    host: 'https://test.com',
    pollInterval: 60000
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

function executeSUT (settings = cdnSettings, onUpdated) {
    const loadFromCdnPromise = loadFromCdn(settings, onUpdated, mockAxios);

    mockAxios.mockResponse({ data: mockResponse });

    return loadFromCdnPromise;
}

describe('When calling loadFromCdn', () => {
    beforeEach(async () => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        mockAxios.reset();
    });

    it('should make an initial call to httpClient', async () => {
        await executeSUT();
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(`https://features.api.justeattakeaway.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
    });

    it('should start polling', async () => {
        await executeSUT();

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);

        jest.advanceTimersByTime(29000);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(5000);
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenNthCalledWith(2, `https://features.api.justeattakeaway.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
    });

    it('should not poll if poll setting false', async () => {
        // Arrange
        const newSettings = {
            ...cdnSettings,
            poll: false
        };

        // Act
        await executeSUT(newSettings);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(100000);

        // Assert
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should honour different host', async () => {
        await executeSUT(modifiedPollingCdnSettings);

        expect(mockAxios.get).toHaveBeenCalledWith(`https://test.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
    });

    it('should honour different pollInterval', async () => {
        await executeSUT(modifiedPollingCdnSettings);

        expect(mockAxios.get).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(35000);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(30000);
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenNthCalledWith(2, `https://test.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
    });

    it('should initialise features correctly', async () => {
        await executeSUT();
        expect(mockAxios.get).toHaveBeenCalledTimes(1);

        expect(getFeature('key2')).toBeFalsy();
        expect(getFeature('key1')).toBeTruthy();
        expect(getFeature('key1').testVal).toBe('val1');
    });

    it('should update features when config changes', async () => {
        // Arrange
        mockResponse.features[0].key = 'key2';
        mockResponse.createdAt = '2021-09-11 15:00';

        await executeSUT();

        // Assert
        expect(getFeature('key1')).toBeFalsy();
        expect(getFeature('key2')).toBeTruthy();
        expect(getFeature('key2').testVal).toBe('val1');
    });

    it('should call callback when config timestamp changes', async () => {
        // Arrange
        const callbackMock = jest.fn();

        mockResponse.createdAt = '2021-10-01 09:00';

        // Act
        await executeSUT(cdnSettings, callbackMock);

        // Assert
        expect(callbackMock).toHaveBeenCalled();
    });

    it('should not call callback when config timestamp is not changed', async () => {
        // Arrange
        const callbackMock = jest.fn();

        // Act
        await executeSUT(cdnSettings, callbackMock);

        // Assert
        expect(callbackMock).not.toHaveBeenCalled();
    });
});
