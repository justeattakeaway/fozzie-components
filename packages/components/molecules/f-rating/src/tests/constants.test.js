import { VALID_STAR_RATING_SIZES } from '../constants';

describe('`constants`', () => {
    describe(`${VALID_STAR_RATING_SIZES}`, () => {
        it('should contain the correct sizes', () => {
            // Arrange
            const values = ['small', 'medium', 'large'];

            // Act
            const result = VALID_STAR_RATING_SIZES.every(value => values.includes(value));

            // Assert
            expect(result).toBe(true);
        });
    });
});
