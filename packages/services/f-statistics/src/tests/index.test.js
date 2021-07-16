import StatisticsClient from '../index';

describe('f-statistics', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(StatisticsClient).toBeDefined();
    });

    it('should define expected method', async () => {
        // Arrange, Act & Assert
        expect(new StatisticsClient().publish).toBeDefined();
    });
});
