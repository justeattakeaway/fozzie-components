import getCardUrlTarget from '../getCardUrlTarget';

describe('services › utils › getCardUrlTarget', () => {
    it('should open in _self for internal routes', async () => {
        // Arrange
        const urls = [
            'https://www.just-eat.co.uk/test-url',
            'https://www.justeat.com/test-url',
            'https://www.just-eat.es/test-url',
            'https://www.menulog.co.nz/test-url'
        ];

        // Act & Assert
        await Promise.all(urls.map(url => expect(getCardUrlTarget(url).attribute).toBe('_self')));
    });

    it('should open in _blank for external routes', () => {
        // Arrange
        const testUrl = 'https://www.helloworld.com/';

        // Act
        const { attribute, rel } = getCardUrlTarget(testUrl);

        // Assert
        expect(attribute).toBe('_blank');
        expect(rel).toBe('noopener');
    });

    it('should default to _blank if URL fails to parse', () => {
        // Arrange
        const testUrl = '__TEST_URL__';

        // Act
        const { attribute } = getCardUrlTarget(testUrl);

        // Assert
        expect(attribute).toBe('_self');
    });
});
