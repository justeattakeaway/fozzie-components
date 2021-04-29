import createClient from '../createClient';

describe('createClient', () => {
    describe('initialisation', () => {
        it('should be defined', async () => {
            // Arrange, Act & Assert
            expect(createClient).toBeDefined();
        });

        it('should use default options when not overridden', async () => {
            // Arrange & Act
            const expectedResult = {
                baseUrl: '',
                timeout: 10000,
                errorCallback: null
            };

            const httpClient = createClient();
            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toStrictEqual(expectedResult);
        });

        it('should use overridden options when overridden', async () => {
            // Arrange & Act
            const expectedBaseUrl = 'https://www.example.org';
            const expectedTimeout = 2000;
            const expectedErrorCallback = () => {};

            const expectedResult = {
                baseUrl: expectedBaseUrl,
                timeout: expectedTimeout,
                errorCallback: expectedErrorCallback
            };

            const httpClient = createClient({
                baseUrl: expectedBaseUrl,
                timeout: expectedTimeout,
                errorCallback: expectedErrorCallback
            });

            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toStrictEqual(expectedResult);
        });
    });
});
