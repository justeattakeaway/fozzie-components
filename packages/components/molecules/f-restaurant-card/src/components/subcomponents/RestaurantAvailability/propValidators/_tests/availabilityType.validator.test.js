import availabilityTypes from '../../availabilityTypes';
import sut from '../availabilityType.validator';

describe('availabilityType.validator', () => {
    it.each([
        availabilityTypes.PREORDER,
        availabilityTypes.COLLECTION
    ])('returns `true` if a type of %p is provided', availabilityType => {
        // act
        const result = sut(availabilityType);

        // assert
        expect(result).toBe(true);
    });

    it('returns `false` if an unrecognised availability type is provided', () => {
        // arrange
        const availabilityType = 'foo';

        // act
        const result = sut(availabilityType);

        // assert
        expect(result).toBe(false);
    });
});
