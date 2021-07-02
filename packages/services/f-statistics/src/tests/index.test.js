import statsModule from '../index';

describe('f-statistics', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(statsModule).toBeDefined();
    });

    it('should define expected method', async () => {
        // Arrange, Act & Assert
        expect(statsModule().publish).toBeDefined();
    });
});
