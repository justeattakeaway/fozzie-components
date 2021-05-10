import httpModule from '../index';

describe('httpModule', () => {
    beforeEach(() => {});

    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(httpModule).toBeDefined();
    });

    it('should define expected properties', async () => {
        // Arrange, Act & Assert
        expect(httpModule.createClient).toBeDefined();
        expect(httpModule.mockFactory).toBeDefined();
        expect(httpModule.httpVerbs).toBeDefined();
    });
});
