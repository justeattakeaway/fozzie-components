import getCardUrlTarget from '../getCardUrlTarget';

describe('services › utils › getCardUrlTarget', () => {
    it('should open in _self for internal routes', async () => {
        const urls = [
            'https://www.just-eat.co.uk/test-url',
            'https://www.justeat.com/test-url',
            'https://www.just-eat.es/test-url',
            'https://www.menulog.co.nz/test-url'
        ];

        await Promise.all(urls.map(url => expect(getCardUrlTarget(url).attribute).toBe('_self')));
    });

    it('should open in _blank for external routes', () => {
        const testUrl = 'https://www.helloworld.com/';

        const { attribute, rel } = getCardUrlTarget(testUrl);

        expect(attribute).toBe('_blank');
        expect(rel).toBe('noopener noreferrer');
    });

    it('should default to _blank if URL fails to parse', () => {
        const testUrl = '__TEST_URL__';

        const { attribute } = getCardUrlTarget(testUrl);

        expect(attribute).toBe('_self');
    });
});
