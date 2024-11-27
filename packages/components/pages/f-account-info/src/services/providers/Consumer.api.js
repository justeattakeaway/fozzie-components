import {
    GET_CONSUMER_DETAILS_URL,
    PATCH_CONSUMER_DETAILS_URL,
    CONSUMER_ADDRESSES_URL,
    AUTHORISATION_HEADER_NAME,
    ACCEPT_TENANT_HEADER_NAME
} from '../../constants';

const BuildHeaders = authToken => {
    const headers = {
        [AUTHORISATION_HEADER_NAME]: authToken ? `Bearer ${authToken}` : '',
        [ACCEPT_TENANT_HEADER_NAME]: 'uk',
    };

    return headers;
};

export default class ConsumerApi {
    #httpClient;
    #baseUrl;

    constructor ({ httpClient, baseUrl } = {}) {
        this.#httpClient = httpClient;
        this.#baseUrl = baseUrl;
    }

    async getConsumerDetails (authToken) {
        const headers = BuildHeaders(authToken);

        const response = await this.#httpClient.get(`${this.#baseUrl}/${GET_CONSUMER_DETAILS_URL}`, headers);

        return response;
    }

    async getConsumerAddresses (authToken) {
        const headers = BuildHeaders(authToken);

        const response = await this.#httpClient.get(`${this.#baseUrl}/${CONSUMER_ADDRESSES_URL}`, headers);

        return response;
    }

    async patchConsumer (authToken, body) {
        const headers = BuildHeaders(authToken);

        const response = await this.#httpClient.patch(`${this.#baseUrl}/${PATCH_CONSUMER_DETAILS_URL}`, body, headers);

        return response;
    }
}
