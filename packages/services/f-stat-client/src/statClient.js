const { Client } = require('@elastic/elasticsearch');
/**
 * Create a `f-stat-client`
 * @param {object} options - Any options to override - refer to documentation for options
 * @param {object} mock - Developer option to mock the internal publish api call
 */
export default class StatClient {
    constructor (options, mock) {
        const defaultOptions = {
            statClientUri: 'http://localhost:9200',
            tenant: 'ns',
            featureName: 'Generic Front End',
            statClientUser: null,
            statClientPwd: null,
            statClientIndexName: 'justeat'
        };

        const configuration = {
            ...defaultOptions,
            ...options
        };

        this.tenant = configuration.tenant;
        this.feature = configuration.featureName;
        this.indexName = configuration.statClientIndexName;

        const conn = {
            node: configuration.statClientUri
        };

        if (configuration.statClientUser) {
            conn.auth = {
                username: configuration.statClientUser,
                password: configuration.statClientPwd
            };
        }

        if (mock) {
            conn.Connection = mock.getConnection();
        }

        this.client = new Client(conn);
    }

    /**
     * Publishes a dynamic list of fields (stat) to ElasticSearch
     * @param {object} body - An object of fields/values to publish
     * @param {object} response - The raw response from the ElasticSearch api call
     */
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
