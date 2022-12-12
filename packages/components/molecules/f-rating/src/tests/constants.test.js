import {
    VALID_STAR_RATING_SIZES,
    VALID_STAR_RATING_DISPLAY_TYPE,
    VALID_STAR_FONT_SIZES
} from '../constants';

describe('`constants`', () => {
    describe('`VALID_STAR_RATING_SIZES`', () => {
        it('should contain the correct sizes', () => {
            // Arrange
            const values = ['xsmall', 'small', 'medium', 'large'];

            // Act & Assert
            expect(VALID_STAR_RATING_SIZES).toEqual(values);
        });
    });

    describe('`VALID_STAR_RATING_DISPLAY_TYPE`', () => {
        it('should contain the correct display types', () => {
            // Arrange
            const values = ['short', 'medium', 'long'];

            // Act
            const result = VALID_STAR_RATING_DISPLAY_TYPE.every(value => values.includes(value));

            // Assert
            expect(result).toBe(true);
        });
    });

    describe('`VALID_STAR_FONT_SIZES`', () => {
        it('should contain the correct font types', () => {
            // Arrange
            const values = ['default', 'large'];

            // Act
            const result = VALID_STAR_FONT_SIZES.every(value => values.includes(value));

            // Assert
            expect(result).toBe(true);
        });
    });
});
