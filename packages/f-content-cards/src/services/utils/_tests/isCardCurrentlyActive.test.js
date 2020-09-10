import isCardCurrentlyActive from '../isCardCurrentlyActive';

const brands = ['McDonalds'];

const card = {
    brand: 'McDonalds'
};

describe('services › utils › transformCardData', () => {
    it('should fallback to current datetime if a value is not provided', () => {});

    it('should return false if card brand is not in users brand list', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive(card);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true if card brand is in users brand list', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive(card, brands);

        // Assert
        expect(result).toBe(true);
    });

    it('should return true if no display times are provided', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive(card, brands);

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
        const result = isCardCurrentlyActive({ ...card, displayTimes }, brands);

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
        const result = isCardCurrentlyActive({ ...card, displayTimes }, brands);

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
        const result = isCardCurrentlyActive({ ...card, displayTimes }, brands);

        // Assert
        expect(result).toBe(false);
    });
});
