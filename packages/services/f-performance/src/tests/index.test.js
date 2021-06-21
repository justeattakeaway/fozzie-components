import fPerformance from '../index';

describe('fPerformance Module', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(fPerformance).toBeDefined();
    });

    it('should define expected properties', async () => {
        // Arrange, Act & Assert
        expect(fPerformance.install).toBeDefined();
    });
});
