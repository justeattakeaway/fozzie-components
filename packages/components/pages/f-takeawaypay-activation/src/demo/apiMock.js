import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import activationStatusAvailable from './activation-status-200.json';
import activationStatusBadRequest from './activation-status-400.json';
import activationStatusInternalError from './activation-status-500.json';
import activateSuccess from './activate-200.json';
import activateBadRequest from './activate-400.json';
import activateInternalError from './activate-500.json';

const mock = new MockAdapter(axios);

export default {
    setupApiResponse (path) {
        switch (path) {
            case '/activation-status-200.json':
                mock.onGet(path).reply(200, activationStatusAvailable);
                break;
            case '/activation-status-400.json':
                mock.onGet(path).reply(400, activationStatusBadRequest);
                break;
            case '/activation-status-500.json':
                mock.onGet(path).reply(500, activationStatusInternalError);
                break;
            case '/activate-200.json':
                mock.onPatch(path).reply(200, activateSuccess);
                break;
            case '/activate-400.json':
                mock.onPatch(path).reply(400, activateBadRequest);
                break;
            case '/activate-500.json':
                mock.onPatch(path).reply(500, activateInternalError);
                break;
            default:
                throw new Error(`${path} is not valid`);
        }
    },

    passThroughAny () {
        mock.onAny().passThrough();
    }
};
