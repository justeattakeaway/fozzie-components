import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockedRequests, { httpMethods, httpStatusCodes } from './mockResponses';

const mock = new MockAdapter(axios);

function setupCheckoutMethod (mockedRequest) {
    if (mockedRequest.responseStatus === httpStatusCodes.noResponse) {
        switch (mockedRequest.method) {
            case httpMethods.post:
                mock.onPost(mockedRequest.url).timeout();
                break;
            case httpMethods.get:
                mock.onGet(mockedRequest.url).timeout();
                break;
            case httpMethods.patch:
                mock.onPatch(mockedRequest.url).timeout();
                break;
            default:
                throw new Error(`Unknown HTTP method '${mockedRequest.method}'.`);
        }
    } else {
        const { payload } = mockedRequest;

        switch (mockedRequest.method) {
            case httpMethods.post:
                mock.onPost(mockedRequest.url).reply(mockedRequest.responseStatus, payload);
                break;
            case httpMethods.get:
                mock.onGet(mockedRequest.url).reply(mockedRequest.responseStatus, payload);
                break;
            case httpMethods.patch:
                mock.onPatch(mockedRequest.url).reply(mockedRequest.responseStatus, payload);
                break;
            default:
                throw new Error(`Unknown HTTP method '${mockedRequest.method}'.`);
        }
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
