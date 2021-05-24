const { Client } = require('@elastic/elasticsearch');

export default class StatClient {
    constructor (
        uri = 'http://localhost:9200',
        tenant = 'ns',
        featureName = 'Generic Front End',
        user = null,
        pwd = null,
        indexName = 'justeat',
        mock = null
    ) {
        this.tenant = tenant;
        this.feature = featureName;
        this.indexName = indexName;

        const conn = {
            node: uri
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
    }

    async publish (body) {
        const payload = {
            index: this.indexName,
            body: {
                tenant: this.tenant,
                feature: this.feature,
                timeStamp: new Date().toISOString(),
                ...body
            }
        };

        const response = await this.client.index(payload);

        return response;
    }
}
