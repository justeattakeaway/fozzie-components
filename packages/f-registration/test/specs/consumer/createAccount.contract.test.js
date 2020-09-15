import RegistrationServiceApi from '../../../src/services/RegistrationServiceApi';
import {
    CONSUMERS_REQUEST_DATA,
    provider,
    respondWith201
} from '../constants/consumer';

describe('Pact setup', () => {
    afterEach(async () => {
        await provider.verify();
    });

    afterAll(async () => {
        await provider.finalize();
    });

    it('should successfully create a consumer', async () => {
        // Arrange
        await provider.setup().then(() => {
            provider.addInteraction(respondWith201);
        });

        // Act
        const response = await RegistrationServiceApi.createAccount(`${provider.mockService.baseUrl}/consumers/uk`, 'uk', CONSUMERS_REQUEST_DATA)

        // Assert
        expect(response.status).toBe(201);
    });
});
