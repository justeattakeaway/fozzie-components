import webPerf from '../index';

describe('webPerf Module', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(webPerf).toBeDefined();
    });

    it('should define expected properties', async () => {
        // Arrange, Act & Assert
        expect(webPerf.install).toBeDefined();
    });
});
