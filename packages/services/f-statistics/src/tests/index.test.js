import StatisticsClient from '../index';

describe('f-statistics', () => {
    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(StatisticsClient).toBeDefined();
    });

    it('should define expected method', () => {
        // Arrange, Act & Assert
        expect(new StatisticsClient().publish).toBeDefined();
    });
});
