export default {
    async createAccount (httpClient, url, data, tenant) {
        return httpClient.post(url, data, {
            'Accept-Tenant': tenant
        });
    }
};
