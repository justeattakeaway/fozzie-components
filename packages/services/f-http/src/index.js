import createClient from './createClient';
import createMockClient from './mocks/mockClient';

import httpVerbs from './constants/httpVerbs';

export default {
    createClient,
    createMockClient,

    constants: {
        httpVerbs
    }
};
