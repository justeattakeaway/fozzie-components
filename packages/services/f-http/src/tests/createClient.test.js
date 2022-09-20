import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import CreateClient from '../createClient';

describe('createClient', () => {
    describe('initialisation', () => {
        it('should be defined', async () => {
            // Arrange, Act & Assert
            expect(CreateClient).toBeDefined();
        });

        it('should expose expected methods', async () => {
            // Arrange & Act
            const httpClient = new CreateClient();

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
                contentType: 'application/json'
            };

            // Act
            const httpClient = new CreateClient();
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

            const expectedResult = {
                baseUrl: expectedBaseUrl,
                timeout: expectedTimeout,
                errorCallback: expectedErrorCallback,
                contentType: expectedContentType
            };

            // Act
            const httpClient = new CreateClient(expectedResult);

            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toStrictEqual(expectedResult);
        });

        it('should provide conversation header when cookie function is supplied', async () => {
            // Arrange
            const getCookieFunction = (cookieName) => {
                return `${cookieName}-123456`
            }

            const axiosMock = new MockAdapter(axios);
            axiosMock.onGet('/test.json').reply(200, {
                fakeResult: null
            });

            const httpClient = new CreateClient(null, getCookieFunction);

            // Act
            const result = await httpClient.get('/test.json')

            // Assert
            expect(result.data).toEqual({ fakeResult: null});
            expect(result.headers['x-je-conversation']).toEqual('x-je-conversation-123456');
        });
    });
});
