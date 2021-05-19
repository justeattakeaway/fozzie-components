import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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
                instanceName: 'Generic Front End',
                isDevelopment: false
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
            const expectedIsDevelopment = true;

            const expectedResult = {
                baseUrl: expectedBaseUrl,
                timeout: expectedTimeout,
                errorCallback: expectedErrorCallback,
                contentType: expectedContentType,
                instanceName: expectedInstanceName,
                isDevelopment: expectedIsDevelopment
            };

            // Act
            const httpClient = createClient(expectedResult);

            const mergedOptions = httpClient.readConfiguration();

            // Assert
            expect(mergedOptions).toStrictEqual(expectedResult);
        });
    });
});

describe('Http Interceptor', () => {
    // Arrange
    const expected = { test: 'jazz' };
    console.log = jest.fn();
    const mock = new MockAdapter(axios);
    mock.onGet('/test').reply(200, expected);

    it('should output api timing details to console if in development mode', async () => {
        // Arrange
        const config = {
            baseUrl: 'https://www.mockendpoint.com',
            timeout: 1000,
            contentType: 'application/json',
            isDevelopment: true
        };
        const httpClient = createClient(config);

        // Act
        const actual = await httpClient.get('/test');

        // Assert
        expect(actual.statusCode).toBe(200);
        expect(actual.data).toEqual(expected);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('GET|/test|200|'));

        console.log.mockClear();
    });

    it('should not output api timing details to console if not in development mode', async () => {
        // Arrange
        const config = {
            baseUrl: 'https://www.mockendpoint.com',
            timeout: 1000,
            contentType: 'application/json',
            isDevelopment: false
        };
        const httpClient = createClient(config);

        // Act
        const actual = await httpClient.get('/test');

        // Assert
        expect(actual.statusCode).toBe(200);
        expect(actual.data).toEqual(expected);
        expect(console.log).not.toBeCalled();

        console.log.mockClear();
        mock.restore();
    });
});
