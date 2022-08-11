import { v4 as uuid } from 'uuid';

import {
    CONVERSATION_ID_HEADER_NAME,
    CONVERSATION_ID_COOKIE_NAME
} from '../constants';

export default class AccountWebApi {
    #httpClient;
    #cookies;
    #validateUrl;

    constructor ({ httpClient, cookies, validateUrl } = {}) {
        this.#httpClient = httpClient;
        this.#cookies = cookies;
        this.#validateUrl = validateUrl;
    }

    async postValidateMfaToken (body, conversationId = this.setConversationId()) {
        const headers = {
            [CONVERSATION_ID_HEADER_NAME]: conversationId
        };

        const response = await this.#httpClient.post(this.#validateUrl, body, headers);

        return response;
    }

    setConversationId = conversationId => {
        const cid = conversationId || uuid();

        this.#cookies.set(CONVERSATION_ID_COOKIE_NAME, cid);

        return cid;
    };
}
