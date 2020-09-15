import RegistrationServiceApi from '../../../src/services/RegistrationServiceApi';
import {
    CONSUMERS_REQUEST_DATA,
    provider,
    respondWith409
} from '../constants/consumer';

describe('Pact setup', () => {
    afterEach(async () => {
        await provider.verify();
    });

    afterAll(async () => {
        await provider.finalize();
    });

    it('consumer email is already in use', async () => {
        // Arrange
        await provider.setup().then(() => {
            provider.addInteraction(respondWith409);
        });

        // Act
        await RegistrationServiceApi.createAccount(`${provider.mockService.baseUrl}/consumers/uk`, 'uk', CONSUMERS_REQUEST_DATA)
            .then(() => {
                fail()
            })
            .catch(error => {
                // Assert
                expect(error.response.status).toBe(409)
                expect(error.response.data.errors.length).toBe(1);
                expect(error.response.data.errors[0].description).toBe('The specified email already exists');
            });
    });
});
