import isCardCurrentlyActive from '../isCardCurrentlyActive';

describe('services › utils › transformCardData', () => {
    it('should fallback to current datetime if a value is not provided', () => {});

    it('should return true if no display times are provided', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive({});

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if current datetime is between today's display times", () => {
        // Arrange
        const displayTimes = {
            Wed: {
                start: '09:00',
                end: '17:00'
            }
        };

        // Act
        const result = isCardCurrentlyActive({ displayTimes });

        // Assert
        expect(result).toBe(true);
    });

    it('should return true if current datetime is between "Any" display times', () => {
        // Arrange
        const displayTimes = {
            Any: {
                start: '09:00',
                end: '17:00'
            }
        };

        // Act
        const result = isCardCurrentlyActive({ displayTimes });

        // Assert
        expect(result).toBe(true);
    });

    it('should return false if current datetime is NOT between provided display times', () => {
        // Arrange
        const displayTimes = {
            Wed: {
                start: '12:00',
                end: '17:00'
            }
        };

        // Act
        const result = isCardCurrentlyActive({ displayTimes });

        // Assert
        expect(result).toBe(false);
    });
});
