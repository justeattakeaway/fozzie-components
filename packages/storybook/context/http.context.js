import Vue from 'vue';
import httpModule from '@justeat/f-http';
import Cookie from 'cookie-universal';

// Refer to f-http documentation for usage
export default () => {
    const cookieUniversal = Cookie();
    const getCookieFunction = (cookieName) => cookieUniversal.get(cookieName);

    const mockFactory = new httpModule.MockFactory();
    const httpClient = new httpModule.CreateClient(null, getCookieFunction);

    // Make the mock factory available to story files
    process.mockFactory = mockFactory;

    // Make this.$http available
    Vue.prototype.$http = httpClient;
};
