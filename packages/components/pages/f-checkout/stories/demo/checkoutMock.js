import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { httpMethods, httpStatusCodes } from '../helpers';
import mockedRequests from './mockResponses';

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
    const requests = mockedRequests()
    requests.forEach(request => setupCheckoutMethod(request));

    mock.onAny().passThrough();
}

export default setupCheckoutMethods;
