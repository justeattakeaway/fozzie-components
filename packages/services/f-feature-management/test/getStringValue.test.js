import featureManagement from '../src/index';

const { getStringValue } = featureManagement('je-web-core');

describe.skip('String value retrieval', () => {
    describe('Get empty string value', () => {
        const key = 'string-empty-value';
        const result = getStringValue(key);
        expect(result.value).toBe('');
    });

    describe('Get simple string value', () => {
        const key = 'string-simple-value';
        const result = getStringValue(key);
        expect(result.value).toBe('a simple string');
    });

    describe('Get complex string value', () => {
        const key = 'string-complex-value';
        const result = getStringValue(key);
        expect(result.value).toBe('this is a complex string\nwith multiple lines\n and special characters !@£$%^&*()¡€#¢∞§¶•ªº\'"');
    });

    describe('Get whitespace only string', () => {
        const key = 'string-whitespace-only-value';
        const result = getStringValue(key);
        expect(result.value).toBe('\n \n \t \t\t \r \n');
    });

    describe('Get non-existent string value', () => {
        const key = 'string-value-non-existent';
        const result = getStringValue(key);
        expect(result.value).toBeNull();
    });
});
