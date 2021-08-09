import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockedRequests, { httpMethods, httpStatusCodes } from './mockResponses';

const mock = new MockAdapter(axios);

function setupCheckoutMethod (mockedRequest) {
    let methodMock;

    switch (mockedRequest.method) {
        case httpMethods.post:
            methodMock = mock.onPost(mockedRequest.url);
            break;
        case httpMethods.get:
            methodMock = mock.onGet(mockedRequest.url);
            break;
        case httpMethods.patch:
            methodMock = mock.onPatch(mockedRequest.url);
            break;
        default:
            throw new Error(`Unknown HTTP method '${mockedRequest.method}'.`);
    }

    if (mockedRequest.responseStatus === httpStatusCodes.noResponse) {
        methodMock.timeout();
    } else {
        methodMock.reply(mockedRequest.responseStatus, mockedRequest.payload);
    }
}

function setupCheckoutMethods () {
    const requests = Object.entries(mockedRequests);

    for (let i = 0; i < requests.length; i++) {
        const [key, value] = requests[i];

        console.dir({ i, key, value });
        setupCheckoutMethod(value);
    }

    mock.onAny().passThrough();
}

export default setupCheckoutMethods;

export {
    mockedRequests
};
