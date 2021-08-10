import featureManagement from '../src/index';

const { getValue } = featureManagement({});

describe.skip('Generic value retrieval', () => {
    it('Get simple string value', () => {
        const key = 'string-simple-value';
        const result = getValue(key);
        expect(result.value).toBe('a simple string');
    });

    it('Get negative integer value', () => {
        const key = 'integer-value-negative';
        const result = getValue(key);
        expect(result.value).toBe(-321);
    });

    it('Get positive integer value', () => {
        const key = 'integer-value-positive';
        const result = getValue(key);
        expect(result.value).toBe(123);
    });

    it('Get positive boolean value', () => {
        const key = 'boolean-value-true';
        const result = getValue(key);
        expect(result.value).toBe(true);
    });

    it('Get negative boolean value', () => {
        const key = 'boolean-value-false';
        const result = getValue(key);
        expect(result.value).toBe(false);
    });

    it('Get non-existent boolean value', () => {
        const key = 'boolean-value-non-existent';
        const result = getValue(key);
        expect(result.value).toBeNull();
    });
});
