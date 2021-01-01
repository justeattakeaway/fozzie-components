import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RegistrationServiceApi from '../../services/RegistrationServiceApi';

describe('RegistrationServiceApi', () => {
    allure.feature('Registration Service API');
    const axiosMock = new MockAdapter(axios);

    describe('when creating an account', () => {
        afterEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
        });

        it('should post correct data with accept tenant header', async () => {
            // Arrange
            const tenant = 'uk';
            const url = 'http://localhost/account/register';
            const data = {
                firstName: 'Ashton',
                lastName: 'Adamms',
                email: 'ashton.adamms+jetest@example.com',
                password: 'Passw0rd'
            };
            axiosMock.onPost(url).reply(201);

            // Act
            await RegistrationServiceApi.createAccount(url, tenant, data);

            // Assert
            expect(axiosMock.history.post.length).toBe(1);
            expect(axiosMock.history.post[0].data).toBe(JSON.stringify(data));
            expect(axiosMock.history.post[0].headers['Accept-Tenant']).toBe('uk');
        });
    });
});
