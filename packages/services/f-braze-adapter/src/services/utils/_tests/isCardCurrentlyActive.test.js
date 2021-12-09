import MockDate from 'mockdate';
import isCardCurrentlyActive from '../isCardCurrentlyActive';

const card = {
    displayTimes: {}
};

describe('services › utils › transformCardData', () => {
    it('should return true if card contains neither brand, visibility indicator, or display times', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive({});

        // Assert
        expect(result).toBeTrue();
    });

    it('should return true if card does not contain brand', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive(card);

        // Assert
        expect(result).toBeTrue();
    });

    it('should return true if visibility indicator is true', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive({
            isVisible: true
        });

        // Assert
        expect(result).toBeTrue();
    });

    it('should return false if visibility indicator is false', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive({
            isVisible: false
        });

        // Assert
        expect(result).toBeFalse();
    });

    it('should return true if card does not contain display times', () => {
        // Arrange & Act
        const result = isCardCurrentlyActive({ id: 'test' });

        // Assert
        expect(result).toBeTrue();
    });

    it("should return true if current datetime is between today's display times", () => {
        // Arrange
        const date = Date.parse('14 Sep 2020 13:00:00 GMT');
        MockDate.set(date);
        const displayTimes = {
            Mon: [
                {
                    Start: '09:00',
                    End: '17:00'
                }
            ]
        };

        // Act
        const result = isCardCurrentlyActive({ displayTimes });

        // Assert
        expect(result).toBeTrue();
    });

    it('should return true if current datetime is between "Any" display times', () => {
        // Arrange
        const date = Date.parse('14 Sep 2020 13:00:00 GMT');
        MockDate.set(date);
        const displayTimes = {
            Any: [
                {
                    Start: '09:00',
                    End: '17:00'
                }
            ]
        };

        // Act
        const result = isCardCurrentlyActive({ displayTimes });

        // Assert
        expect(result).toBeTrue();
    });

    it('should return false if current datetime is NOT between provided display times', () => {
        // Arrange
        const date = Date.parse('14 Sep 2020 08:00:00 GMT');
        MockDate.set(date);
        const displayTimes = {
            Mon: [
                {
                    Start: '12:00',
                    End: '17:00'
                }
            ],
            Any: [
                {
                    Start: '05:00',
                    End: '07:00'
                }
            ]
        };

        // Act
        const result = isCardCurrentlyActive({ displayTimes });

        // Assert
        expect(result).toBeFalse();
    });
});
