import httpVerbs from '../httpVerbs';

describe('httpVerbs', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(httpVerbs).toBeDefined();
    });

    it('should define expected properties with correct values', async () => {
        // Arrange, Act & Assert
        expect(httpVerbs.GET).toBe('GET');
        expect(httpVerbs.POST).toBe('POST');
        expect(httpVerbs.PUT).toBe('PUT');
        expect(httpVerbs.PATCH).toBe('PATCH');
        expect(httpVerbs.DELETE).toBe('DELETE');
    });
});
