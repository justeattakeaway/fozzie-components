import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import emailInUse from './email-in-use.json';

const mock = new MockAdapter(axios);

export default {
    setupEmailInUse (createAccountUrl) {
        mock.onPost(createAccountUrl).reply(409, emailInUse);
    },

    passThroughAny () {
        mock.onAny().passThrough();
    }
};
