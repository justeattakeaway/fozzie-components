import { v4 as uuid } from 'uuid';

import {
    CONSUMER_DETAILS_URL,
    CONSUMER_ADDRESSES_URL,
    CONVERSATION_ID_HEADER_NAME,
    AUTHORISATION_HEADER_NAME,
    CONVERSATION_ID_COOKIE_NAME
} from '../../constants';

const BuildHeaders = (conversationId, authToken) => {
    const headers = {
        [CONVERSATION_ID_HEADER_NAME]: conversationId,
        [AUTHORISATION_HEADER_NAME]: authToken ? `Bearer ${authToken}` : ''
    };

    return headers;
};

export default class ConsumerApi {
    #httpClient;
    #cookies;
    #baseUrl;

    constructor ({ httpClient, cookies, baseUrl } = {}) {
        this.#httpClient = httpClient;
        this.#cookies = cookies;
        this.#baseUrl = baseUrl;
    }

    async getConsumerDetails (authToken, conversationId = this.setConversationId()) {
        const headers = BuildHeaders(conversationId, authToken);

        const response = await this.#httpClient.get(`${this.#baseUrl}/${CONSUMER_DETAILS_URL}`, headers);

        return response;
    }

    async getConsumerAddresses (authToken, conversationId = this.setConversationId()) {
        const headers = BuildHeaders(conversationId, authToken);

        const response = await this.#httpClient.get(`${this.#baseUrl}/${CONSUMER_ADDRESSES_URL}`, headers);

        return response;
    }

    async patchConsumer (authToken, body, conversationId = this.setConversationId()) {
        const headers = BuildHeaders(conversationId, authToken);

        const response = await this.#httpClient.patch(`${this.#baseUrl}/${CONSUMER_DETAILS_URL}`, body, headers);

        return response;
    }

    setConversationId = conversationId => {
        const cid = conversationId || uuid();

        this.#cookies.set(CONVERSATION_ID_COOKIE_NAME, cid);

        return cid;
    };
}
