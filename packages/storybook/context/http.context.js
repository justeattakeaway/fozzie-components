import Vue from 'vue';
import httpModule from '@justeat/f-http';

// Refer to f-http documentation for usage
export default () => {
    const mockFactory = new httpModule.MockFactory();
    const httpClient = new httpModule.CreateClient();

    // Make the mock factory available to story files
    process.mockFactory = mockFactory;

    // Make this.$http available
    Vue.prototype.$http = httpClient;
};
