import { v4 as uuid } from 'uuid';
import {
    CONSUMER_PREFERENCES_URL,
    CONVERSATION_ID_NAME
} from '../../constants';

const GetSetConversationId = cookies => {
    const conversationId = uuid();

    cookies.set(CONVERSATION_ID_NAME, conversationId);

    return conversationId;
};

export default class ContactPreferencesApi {
    constructor ({
        httpClient, cookies, baseUrl
    } = {}) {
        this.httpClient = httpClient;
        this.cookies = cookies;
        this.baseUrl = baseUrl;
    }

    async getPreferences (authToken, conversationId = GetSetConversationId(this.cookies)) {
        const headers = {
            [CONVERSATION_ID_NAME]: conversationId,
            Authorization: authToken ? `Bearer ${authToken}` : ''
        };

        const response = await this.httpClient.get(`${this.baseUrl}/${CONSUMER_PREFERENCES_URL}`, headers);

        return response;
    }

    async postPreferences (authToken, body, conversationId = GetSetConversationId(this.cookies)) {
        const headers = {
            [CONVERSATION_ID_NAME]: conversationId,
            Authorization: authToken ? `Bearer ${authToken}` : ''
        };

        const response = await this.httpClient.post(`${this.baseUrl}/${CONSUMER_PREFERENCES_URL}`, body, headers);

        return response;
    }
}
