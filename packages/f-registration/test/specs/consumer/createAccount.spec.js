import path from "path";
import { Pact, Matchers } from "@pact-foundation/pact";
import RegistrationServiceApi from '../../../src/services/RegistrationServiceApi';

const provider = new Pact({
    consumer: 'f-registration',
    provider: 'AccountApi',
    log: path.resolve('../../pact-logs/pact.log'),
    logLevel: "INFO",
    dir: path.resolve('../../pacts'),
    spec: 2,
    cors:true,
});

const CONSUMERS_REQUEST_DATA =
  {
    "emailAddress": "test-user@justeat.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "test123"
  }

describe("Pact setup", () => {
  beforeAll(async () => {
    await provider.setup().then(() => {
         provider.addInteraction({
            state: 'i have a new customer email address for a tenant',
            uponReceiving: 'a POST request to create a consumer',
            withRequest: {
                method: 'POST',
                path: '/consumers/uk',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': 'uk'
                },
                body: {
                    firstName: Matchers.like(CONSUMERS_REQUEST_DATA.firstName),
                    lastName: Matchers.like(CONSUMERS_REQUEST_DATA.lastName),
                    emailAddress: Matchers.like(CONSUMERS_REQUEST_DATA.emailAddress),
                    password: Matchers.like(CONSUMERS_REQUEST_DATA.password)
                }
            },
            willRespondWith: {
                status: 201,
                headers: {
                    "date": Matchers.like("Fri, 04 Oct 2019 11:59:09 GMT"),
                    "Content-Type": "application/json; charset=utf-8"
                }
            },
          });
    });
  });
  test("successfully creates a consumer", async () => {

    await RegistrationServiceApi.createAccount(`${provider.mockService.baseUrl}/consumers/uk`, 'uk', CONSUMERS_REQUEST_DATA)
    .then(repsonse => {
      expect(repsonse.status).toBe(201);
    })
  })
  afterEach(async () => {
    await provider.verify();
  });
  afterAll(async () => {
    return provider.finalize();
  });
})
