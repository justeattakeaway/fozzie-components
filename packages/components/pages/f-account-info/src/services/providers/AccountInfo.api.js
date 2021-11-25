import { v4 as uuid } from 'uuid';

import {
    CONSUMER_DETAILS_URL,
    CONVERSATION_ID_NAME
} from '../../constants';

const GetSetConversationId = cookies => {
    const conversationId = uuid();

    cookies.set(CONVERSATION_ID_NAME, conversationId);

    return conversationId;
};

export default class AccountInfoApi {
    #httpClient;
    #cookies;
    #baseUrl;

    constructor ({ httpClient, cookies, baseUrl } = {}) {
        this.#httpClient = httpClient;
        this.#cookies = cookies;
        this.#baseUrl = baseUrl;
    }

    async getConsumerDetails (authToken, conversationId = GetSetConversationId(this.#cookies)) {
        const headers = {
            [CONVERSATION_ID_NAME]: conversationId,
            Authorization: authToken ? `Bearer ${authToken}` : ''
        };

        const response = await this.#httpClient.get(`${this.#baseUrl}/${CONSUMER_DETAILS_URL}`, headers);

        return response;
    }
}
