import featureManagement from '../src/index';
import expectations from './data/e2e-expectations.json';

const { getBooleanValue, getIntegerValue, getStringValue } = featureManagement('je-web-core');

const functionMap = { boolean: getBooleanValue, integer: getIntegerValue, string: getStringValue };

describe.skip('End-to-End Tests', () => {
    expectations.expectations.forEach(ex => {
        describe(ex.description, () => {
            const { value: expectedValue, experimentKey: expectedKey, experimentVariant: expectedVariant } = ex.expectation;
            const feature = functionMap[ex.valueType](ex.feature);
            expect(feature.value).toBe(expectedValue);
            if (expectedKey && expectedVariant) {
                expect(feature.experimentKey).toBe(expectedKey);
                expect(feature.experimentVariant).toBe(expectedVariant);
            }
        });
    });
});
