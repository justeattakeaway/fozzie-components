import createClient from '../createClient';

describe('createClient', () => {
    describe('initialisation', () => {
        it('httpClient should be defined', async () => {
        // Arrange & Act
        // Assert
            expect(createClient).toBeDefined();
        });

        it('httpClient should use default options when not overridden', async () => {
        // Arrange & Act
            const httpClient = createClient();
            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toBeDefined();
            expect(mergedOptions.baseUrl).toBe('');
            expect(mergedOptions.timeout).toBe(10000);
            expect(mergedOptions.errorCallback).toBe(null);
        });

        it('httpClient should use overridden options when overridden', async () => {
        // Arrange & Act
            const expectedBaseUrl = 'https://www.example.org';
            const expectedTimeout = 2000;
            const expectedErrorCallback = () => {};

            const httpClient = createClient({
                baseUrl: expectedBaseUrl,
                timeout: expectedTimeout,
                errorCallback: expectedErrorCallback
            });
            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toBeDefined();
            expect(mergedOptions.baseUrl).toBe(expectedBaseUrl);
            expect(mergedOptions.timeout).toBe(expectedTimeout);
            expect(mergedOptions.errorCallback).toBe(expectedErrorCallback);
        });
    });
});
