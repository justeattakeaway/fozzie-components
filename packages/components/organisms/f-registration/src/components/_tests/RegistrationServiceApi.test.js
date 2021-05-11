import httpModule from '@justeat/f-http';
import RegistrationServiceApi from '../../services/RegistrationServiceApi';

describe('RegistrationServiceApi', () => {
    describe('when creating an account', () => {
        it('should post correct data with accept tenant header', async () => {
            // Arrange
            let receivedData = null;
            let receivedHeaders = null;

            httpModule.createClient = () => ({
                post: (url, data, headers) => {
                    receivedData = data;
                    receivedHeaders = headers;
                }
            });

            const tenant = 'uk';
            const url = 'http://localhost/account/register';
            const data = {
                firstName: 'Joe',
                lastName: 'Test',
                email: 'joe@test.com',
                password: 'Passw0rd'
            };

            // Act
            await RegistrationServiceApi.createAccount(url, data, tenant);

            // Assert
            expect(receivedData).toBe(data);
            expect(receivedHeaders['Accept-Tenant']).toBe('uk');
        });
    });
});
