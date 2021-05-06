import configBuilder from '../configBuilder';

describe('configBuilder', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(configBuilder).toBeDefined();
    });

    it('should return empty headers when not provided', async () => {
        // Arrange & Act
        const config = configBuilder();

        expect(config).toBeDefined();
        expect(config.headers).toStrictEqual({});
    });

    it('should return headers when provided', async () => {
        // Arrange
        const expectedHeaders = {
            'x-test': 'My test header'
        };

        // Act
        const config = configBuilder(expectedHeaders);

        expect(config.headers).toStrictEqual(expectedHeaders);
    });
});
