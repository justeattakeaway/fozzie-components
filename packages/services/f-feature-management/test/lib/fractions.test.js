import calculateFractions from '../src/lib/calculateFractions';

//TODO: we have a whole load of known good values - we will include these in due course
describe('When calculating fractions for use in IdHashLogicEvaluator', () => {
    it('Calculates the correct values', () => {
        const { audienceFraction, variantFraction } = calculateFractions('prefix29e108cb-d1cc-49b0-8b22-7d182e8031a2');
        expect(audienceFraction).toBe(0.1913786526283665);
        expect(variantFraction).toBe(0.7525597009231708);
    });
});
