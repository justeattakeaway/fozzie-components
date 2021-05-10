import createClient from '../createClient';

describe('createClient', () => {
    describe('initialisation', () => {
        it('should be defined', async () => {
            // Arrange, Act & Assert
            expect(createClient).toBeDefined();
        });

        it('should expose expected methods', async () => {
            // Arrange & Act
            const httpClient = createClient();

            // Assert
            expect(httpClient).toBeDefined();
            expect(httpClient.get).toBeDefined();
            expect(httpClient.post).toBeDefined();
            expect(httpClient.put).toBeDefined();
            expect(httpClient.patch).toBeDefined();
            expect(httpClient.delete).toBeDefined();
            expect(httpClient.setAuthorisationToken).toBeDefined();
            expect(httpClient.readConfiguration).toBeDefined();
        });

        it('should use default options when not overridden', async () => {
            // Arrange
            const expectedResult = {
                baseUrl: '',
                timeout: 10000,
                errorCallback: null,
                contentType: 'application/json',
                instanceName: 'Generic Front End'
            };

            // Act
            const httpClient = createClient();
            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toStrictEqual(expectedResult);
        });

        it('should use overridden options when overridden', async () => {
            // Arrange
            const expectedBaseUrl = 'https://www.example.org';
            const expectedTimeout = 2000;
            const expectedErrorCallback = () => {};
            const expectedContentType = 'application/mpeg';
            const expectedInstanceName = 'Test Test Test';

            const expectedResult = {
                baseUrl: expectedBaseUrl,
                timeout: expectedTimeout,
                errorCallback: expectedErrorCallback,
                contentType: expectedContentType,
                instanceName: expectedInstanceName
            };

            // Act
            const httpClient = createClient(expectedResult);

            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toStrictEqual(expectedResult);
        });
    });
});
