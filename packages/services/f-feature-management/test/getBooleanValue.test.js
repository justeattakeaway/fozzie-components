import { getBooleanValue } from '../src/index';

describe('Boolean value retrieval', () => {
    describe('Get positive boolean value', () => {
        const key = 'boolean-value-true';
        const result = getBooleanValue(key);
        expect(result.value).toBe(true);
    });

    describe('Get negative boolean value', () => {
        const key = 'boolean-value-false';
        const result = getBooleanValue(key);
        expect(result.value).toBe(false);
    });

    describe('Get non-existent boolean value', () => {
        const key = 'boolean-value-non-existent';
        const result = getBooleanValue(key);
        expect(result.value).toBeNull();
    });
});
