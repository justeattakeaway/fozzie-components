import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import RegistrationServiceApi from '../../../src/services/RegistrationServiceApi';

const axiosMock = new MockAdapter(axios);

const tenant = 'uk';
const endpoint = `consumers/${tenant}`
const CONSUMERS_REQUEST_DATA =
    {
        "emailAddress": "test-user@justeat.com",
        "firstName": "Test",
        "lastName": "User",
        "password": "test123"
    };

describe('Registration API service', () => {

    it('responds with 201 when request is made with valid details', async () => {

        // Arrange
        axiosMock.onPost(endpoint, {

            firstName: CONSUMERS_REQUEST_DATA.firstName,
            lastName: CONSUMERS_REQUEST_DATA.lastName,
            emailAddress: CONSUMERS_REQUEST_DATA.emailAddress,
            password: CONSUMERS_REQUEST_DATA.password

        }).reply(201);

        // Act
        await RegistrationServiceApi.createAccount(endpoint, tenant, CONSUMERS_REQUEST_DATA)
        .then(response => {

            // Assert
            expect(response.status).toEqual(201);
        })
    });

    it('responds with 409 when request is made with valid details', async () => {

        // Arrange
        axiosMock.onPost(endpoint, {

            firstName: CONSUMERS_REQUEST_DATA.firstName,
            lastName: CONSUMERS_REQUEST_DATA.lastName,
            emailAddress: CONSUMERS_REQUEST_DATA.emailAddress,
            password: CONSUMERS_REQUEST_DATA.password

        }).reply(409, {

            faultId: "e2ea5f11-f771-487a-9f80-5c6f0981890b",
            traceId: "80000806-0000-fd00-b63f-84710c7967bb",
            errors: [{
              description:"The specified email already exists",
              errorCode:"409"
            }]

        });

        // Act
        await RegistrationServiceApi.createAccount(endpoint, tenant, CONSUMERS_REQUEST_DATA)
        .then()
        .catch(error => {

            // Assert
            expect(error.response.status).toBe(409);
            expect(error.response.data.errors.length).toBe(1);
            expect(error.response.data.errors[0].description).toBe('The specified email already exists');

        })
    });

});
