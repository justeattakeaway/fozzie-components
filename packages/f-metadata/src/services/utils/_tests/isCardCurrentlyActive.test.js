import MockDate from 'mockdate';
import isCardCurrentlyActive from '../isCardCurrentlyActive';

const brand = '__BRAND__';

const brands = [brand];

const card = {
    brand,
    displayTimes: {}
};

describe('services › utils › transformCardData', () => {
    it('should return true if card does not contain brand', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive({ displayTimes: {} });

        // Assert
        expect(result).toBe(true);
    });

    it('should return true if card does not contain display times', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive({ brand });

        // Assert
        expect(result).toBe(true);
    });

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
        const date = Date.parse('14 Sep 2020 13:00:00 GMT');
        MockDate.set(date);
        const displayTimes = {
            Mon: {
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
        const date = Date.parse('14 Sep 2020 13:00:00 GMT');
        MockDate.set(date);
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
        const date = Date.parse('14 Sep 2020 08:00:00 GMT');
        MockDate.set(date);
        const displayTimes = {
            Mon: {
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
