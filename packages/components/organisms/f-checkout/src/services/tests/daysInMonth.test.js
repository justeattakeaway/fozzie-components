import getDaysInMonth from '../daysInMonth';

describe('getDaysInMonth', () => {
    it.each([
        [31, 'January', 0],
        [31, 'March', 2],
        [30, 'April', 8],
        [31, 'May', 4],
        [30, 'June', 5],
        [31, 'July', 6],
        [31, 'August', 7],
        [30, 'September', 8],
        [31, 'October', 9],
        [30, 'November', 10],
        [31, 'December', 11]
    ])('should return %s when month is %s', (expected, monthName, month) => {
        // Arrange
        const date = {
            month,
            year: 2020
        };

        // Act
        const daysInMonth = getDaysInMonth(date);

        // Assert
        expect(daysInMonth).toEqual(expected);
    });

    describe('when month is February', () => {
        const february = 1;

        it('should return 28 for a non-leap year', () => {
            // Arrange
            const date = {
                month: february,
                year: 2010
            };

            // Act
            const daysInMonth = getDaysInMonth(date);

            // Assert
            expect(daysInMonth).toEqual(28);
        });

        it('should return 29 for a leap year', () => {
            // Arrange
            const date = {
                month: february,
                year: 2008
            };

            // Act
            const daysInMonth = getDaysInMonth(date);

            // Assert
            expect(daysInMonth).toEqual(29);
        });
    });
});
