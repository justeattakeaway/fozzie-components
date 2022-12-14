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

            // Assert
            expect(VALID_STAR_RATING_DISPLAY_TYPE).toEqual(values);
        });
    });

    describe('`VALID_STAR_FONT_SIZES`', () => {
        it('should contain the correct font types', () => {
            // Arrange
            const values = ['default', 'large'];

            // Assert
            expect(VALID_STAR_FONT_SIZES).toEqual(values);
        });
    });
});
