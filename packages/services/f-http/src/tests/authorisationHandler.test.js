import axios from 'axios';
import setAuthorisationToken from '../authorisationHandler';

describe('setAuthorisationToken', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(setAuthorisationToken).toBeDefined();
    });

    it('should not have an authorisation token set by default', async () => {
        // Arrange, Act & Assert
        expect(axios.defaults.headers.common.Authorization).not.toBeDefined();
    });

    it('should set the provided authorisation token', async () => {
        // Arrange
        const expectedAuthorisationToken = 'Granola';

        // Act
        setAuthorisationToken(expectedAuthorisationToken);

        // Assert
        expect(axios.defaults.headers.common.Authorization).toBe(expectedAuthorisationToken);
    });
});
