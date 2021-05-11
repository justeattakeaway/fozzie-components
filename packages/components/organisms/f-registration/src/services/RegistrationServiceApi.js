import httpModule from '@justeat/f-http';

export default {
    async createAccount (url, data, tenant) {
        const httpClient = httpModule.createClient({
            instanceName: 'Account Web'
        });

        return httpClient.post(url, data, {
            'Accept-Tenant': tenant
        });
    }
};
