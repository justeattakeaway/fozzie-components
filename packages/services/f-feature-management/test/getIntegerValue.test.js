import featureManagement from '../src/index';

const { getIntegerValue } = featureManagement('je-web-core');

describe.skip('Integer value retrieval', () => {
    it('Get zero integer value', () => {
        const key = 'integer-value-zero';
        const result = getIntegerValue(key);
        expect(result.value).toBe(0);
    });

    it('Get negative integer value', () => {
        const key = 'integer-value-negative';
        const result = getIntegerValue(key);
        expect(result.value).toBe(-321);
    });

    it('Get positive integer value', () => {
        const key = 'integer-value-positive';
        const result = getIntegerValue(key);
        expect(result.value).toBe(123);
    });

    it('Get non-existent integer value', () => {
        const key = 'integer-value-non-existent';
        const result = getIntegerValue(key);
        expect(result.value).toBeNull();
    });
});
