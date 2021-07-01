import { getIntegerValue } from '../src/index';

describe('Integer value retrieval', () => {
    describe('Get zero integer value', () => {
        const key = 'integer-value-zero';
        const result = getIntegerValue(key);
        expect(result.value).toBe(0);
    });

    describe('Get negative integer value', () => {
        const key = 'integer-value-negative';
        const result = getIntegerValue(key);
        expect(result.value).toBe(-321);
    });

    describe('Get positive integer value', () => {
        const key = 'integer-value-positive';
        const result = getIntegerValue(key);
        expect(result.value).toBe(123);
    });

    describe('Get non-existent integer value', () => {
        const key = 'integer-value-non-existent';
        const result = getIntegerValue(key);
        expect(result.value).toBeNull();
    });
});
