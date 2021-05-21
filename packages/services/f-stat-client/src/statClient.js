const { Client } = require('@elastic/elasticsearch');

export default class StatClient {
    constructor (url, port, tenant, featureName, user, pwd, indexName, mock) {
        const conn = {
            node: `${url || 'http://localhost'}:${port || 9200}`
        };

        if (user) {
            conn.auth = {
                username: user,
                password: pwd
            };
        }

        if (mock) {
            conn.Connection = mock.getConnection();
        }

        this.client = new Client(conn);
        this.tenant = tenant || 'ns';
        this.feature = featureName || 'NotSpecified';
        this.indexName = indexName || 'justeat';
    }

    async publish ({
        verb, segment, status, timing
    }) {
        const payload = {
            index: this.indexName,
            body: {
                tenant: this.tenant,
                feature: this.feature,
                timeStamp: new Date().toISOString(),
                verb,
                segment,
                status,
                timing
            }
        };

        const response = await this.client.index(payload);

        return response;
    }
}
