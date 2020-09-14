import path from 'path';
import { Matchers, Pact } from '@pact-foundation/pact';

const CONSUMERS_REQUEST_DATA = {
    emailAddress: 'test-user@justeat.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'test123',
    registrationSource: 'Native',
    marketingPreferences: []
};

const provider = new Pact({
    consumer: 'f-registration',
    provider: 'AccountApi',
    log: path.resolve('../../pact-logs/pact.log'),
    logLevel: 'INFO',
    dir: path.resolve('../../pacts'),
    spec: 2,
    cors: true,
    pactfileWriteMode: 'update'
});

const respondWith201 = {
    state: 'I have a new customer email address for a tenant',
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
            password: Matchers.like(CONSUMERS_REQUEST_DATA.password),
            registrationSource: Matchers.like(CONSUMERS_REQUEST_DATA.registrationSource),
            marketingPreferences: Matchers.like(CONSUMERS_REQUEST_DATA.marketingPreferences)
        }
    },
    willRespondWith: {
        status: 201,
        headers: {
            'date': Matchers.like('Fri, 04 Oct 2019 11:59:09 GMT'),
            'Content-Type': 'application/json; charset=utf-8'
        }
    },
};

const respondWith409 = {
    state: 'I have an existing customer email address for a tenant',
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
            password: Matchers.like(CONSUMERS_REQUEST_DATA.password),
            registrationSource: Matchers.like(CONSUMERS_REQUEST_DATA.registrationSource),
            marketingPreferences: Matchers.like(CONSUMERS_REQUEST_DATA.marketingPreferences)
        }
    },
    willRespondWith: {
        status: 409,
        headers: {
            'date': Matchers.like('Fri, 04 Oct 2019 11:59:09 GMT'),
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: {
            faultId: Matchers.like('e2ea5f11-f771-487a-9f80-5c6f0981890b'),
            traceId: Matchers.like('80000806-0000-fd00-b63f-84710c7967bb'),
            errors: [{
                description:'The specified email already exists',
                errorCode:'409'
            }]
        }
    }
};

export {
    CONSUMERS_REQUEST_DATA,
    provider,
    respondWith201,
    respondWith409
};
