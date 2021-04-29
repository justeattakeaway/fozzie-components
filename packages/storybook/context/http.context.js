import Vue from 'vue';
import http from '@justeat/f-http';

// Refer to f-http documentation for usage
export default () => {
    const httpClient = http.createClient();

    Vue.prototype.$http = httpClient;
};
