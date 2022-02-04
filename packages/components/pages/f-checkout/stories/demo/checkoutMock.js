import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { httpMethods, httpStatusCodes } from '../helpers';
import mockedRequests from './mockResponses';

const mock = new MockAdapter(axios);

export default function () {
    mockedRequests.forEach(request => {
        const methods = {
            [httpMethods.post]: mock.onPost(request.url),
            [httpMethods.get]: mock.onGet(request.url),
            [httpMethods.patch]: mock.onPatch(request.url)
        };

        const methodMock = methods[request.method];

        if (!methodMock) {
            throw new Error(`Unknown HTTP method '${request.method}'.`);
        }

        if (request.responseStatus === httpStatusCodes.noResponse) {
            methodMock.timeout();
        } else {
            methodMock.reply(request.responseStatus, request.payload);
        }
    });

    mock.onAny().passThrough();
}
