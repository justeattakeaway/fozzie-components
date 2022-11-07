import {
    VALID_STAR_RATING_SIZES,
    VALID_STAR_RATING_DISPLAY_TYPE
} from '../constants';

describe('`constants`', () => {
    describe('`VALID_STAR_RATING_SIZES`', () => {
        it('should contain the correct sizes', () => {
            // Arrange
            const values = ['small', 'medium', 'large'];

            // Act & Assert
            expect(VALID_STAR_RATING_SIZES).toEqual(values);
        });
    });

    describe('`VALID_STAR_RATING_DISPLAY_TYPE`', () => {
        it('should contain the correct display types', () => {
            // Arrange
            const values = ['noRating', 'short', 'medium', 'long'];

            // Act
            const result = VALID_STAR_RATING_DISPLAY_TYPE.every(value => values.includes(value));

            // Assert
            expect(result).toBe(true);
        });
    });
});
