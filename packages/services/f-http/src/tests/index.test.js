import createClient from '../createClient';

describe('createClient', () => {
    beforeEach(() => {});

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
        expect(httpClient.readConfiguration).toBeDefined();
    });
});
