import { v4 as uuid } from 'uuid';

import {
    SUBMIT_LOGIN_CHALLENGE_URL,
    CONVERSATION_ID_HEADER_NAME,
    CONVERSATION_ID_COOKIE_NAME
} from '../constants';

export default class AccountWebApi {
    #httpClient;
    #cookies;
    #baseUrl;

    constructor ({ httpClient, cookies, baseUrl } = {}) {
        this.#httpClient = httpClient;
        this.#cookies = cookies;
        this.#baseUrl = baseUrl;
    }

    async postValidateMfaToken (body, conversationId = this.setConversationId()) {
        const headers = {
            [CONVERSATION_ID_HEADER_NAME]: conversationId
        };

        const response = await this.#httpClient.post(`${this.#baseUrl}/${SUBMIT_LOGIN_CHALLENGE_URL}`, body, headers);

        return response;
    }

    setConversationId = conversationId => {
        const cid = conversationId || uuid();

        this.#cookies.set(CONVERSATION_ID_COOKIE_NAME, cid);

        return cid;
    };
}
