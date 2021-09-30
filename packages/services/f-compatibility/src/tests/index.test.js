import Compatibility from '../index';

describe('f-compatibility', () => {
    it('should be defined', () => {
        // Arrange, Act & Assert
        expect(Compatibility).toBeDefined();
    });

    it('should define expected method', () => {
        // Arrange, Act & Assert
        expect(new Compatibility().isCompatible).toBeDefined();
    });
});
