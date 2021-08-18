import httpModule from '@justeat/f-http';
import emailInUse from './email-in-use.json';

export default {
    setupEmailInUse (createAccountUrl) {
        process.mockFactory.setupMockResponse(
            httpModule.httpVerbs.POST,
            createAccountUrl,
            null,
            409,
            emailInUse
        );
    },

    passThroughAny () {
        process.mockFactory.setupPassThrough();
    }
};
