import getDaysInMonth from '../daysInMonth';

describe('getDaysInMonth', () => {
    it.each([
        [31, 'January', 0],
        [28, 'February', 1],
        [31, 'March', 2],
        [30, 'April', 3],
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
            year: 2010
        };

        // Act
        const daysInMonth = getDaysInMonth(date);

        // Assert
        expect(daysInMonth).toEqual(expected);
    });

    describe('when year is a leap year and month is February', () => {
        it('should return 29', () => {
            // Arrange
            const date = {
                month: 1,
                year: 2008
            };

            // Act
            const daysInMonth = getDaysInMonth(date);

            // Assert
            expect(daysInMonth).toEqual(29);
        });
    });
});
