import featureManagement from '../src/index';
import expectations from './data/e2e-expectations.json';

const { getBooleanValue, getIntegerValue, getStringValue } = featureManagement('je-web-core');

const functionMap = { boolean: getBooleanValue, integer: getIntegerValue, string: getStringValue };

describe.skip('End-to-End Tests', () => {
    describe.each(expectations)('Expectation %# - ', ({
        description, expectation, feature, valueType
    }) => {
        it(description, () => {
            const { value: expectedValue, experimentKey: expectedKey, experimentVariant: expectedVariant } = expectation;
            const featureValue = functionMap[valueType](feature);
            expect(featureValue.value).toBe(expectedValue);
            if (expectedKey && expectedVariant) {
                expect(feature.experimentKey).toBe(expectedKey);
                expect(feature.experimentVariant).toBe(expectedVariant);
            }
        });
    });
});
