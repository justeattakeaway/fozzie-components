import Vue from 'vue';
import httpModule from '@justeat/f-http';

// Refer to f-http documentation for usage
export default () => {
    const httpClient = new httpModule.CreateClient();

    Vue.prototype.$http = httpClient;
};
