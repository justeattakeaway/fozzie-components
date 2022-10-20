import { VALID_STAR_RATING_SIZES } from '../constants';

describe('`constants`', () => {
    describe('VALID_STAR_RATING_SIZES', () => {
        it('should contain the correct sizes', () => {
            // Arrange
            const values = {
                small: true,
                medium: true,
                large: true
            };

            // Act & Assert
            expect(VALID_STAR_RATING_SIZES).toEqual(values);
        });
    });
});
