import fPerf from '../index';

describe('fPerf Module', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(fPerf).toBeDefined();
    });

    it('should define expected properties', async () => {
        // Arrange, Act & Assert
        expect(fPerf.install).toBeDefined();
    });
});
