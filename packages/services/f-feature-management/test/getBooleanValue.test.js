import featureManagement from '../src/index';

const { getBooleanValue } = featureManagement('je-web-core');

describe.skip('Boolean value retrieval', () => {
    it('Get positive boolean value', () => {
        const key = 'boolean-value-true';
        const result = getBooleanValue(key);
        expect(result.value).toBe(true);
    });

    it('Get negative boolean value', () => {
        const key = 'boolean-value-false';
        const result = getBooleanValue(key);
        expect(result.value).toBe(false);
    });

    it('Get non-existent boolean value', () => {
        const key = 'boolean-value-non-existent';
        const result = getBooleanValue(key);
        expect(result.value).toBeNull();
    });
});
