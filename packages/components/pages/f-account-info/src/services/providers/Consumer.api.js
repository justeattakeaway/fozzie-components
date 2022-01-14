import { v4 as uuid } from 'uuid';

import {
    CONSUMER_DETAILS_URL,
    CONSUMER_ADDRESSES_URL,
    CONVERSATION_ID_NAME
} from '../../constants';

export default class ConsumerApi {
    constructor ({ httpClient, cookies, baseUrl } = {}) {
        this.httpClient = httpClient;
        this.cookies = cookies;
        this.baseUrl = baseUrl;
    }

    async getConsumerDetails (authToken, conversationId = this.setConversationId()) {
        const headers = {
            [CONVERSATION_ID_NAME]: conversationId,
            Authorization: authToken ? `Bearer ${authToken}` : ''
        };

        const response = await this.httpClient.get(`${this.baseUrl}/${CONSUMER_DETAILS_URL}`, headers);

        return response;
    }

    async getConsumerAddresses (authToken, conversationId = this.setConversationId()) {
        const headers = {
            [CONVERSATION_ID_NAME]: conversationId,
            Authorization: authToken ? `Bearer ${authToken}` : ''
        };

        const response = await this.httpClient.get(`${this.baseUrl}/${CONSUMER_ADDRESSES_URL}`, headers);

        return response;
    }

    setConversationId = conversationId => {
        const cid = conversationId || uuid();

        this.cookies.set(CONVERSATION_ID_NAME, cid);

        return cid;
    };
}
