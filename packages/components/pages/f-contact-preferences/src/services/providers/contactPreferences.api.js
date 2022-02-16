import { v4 as uuid } from 'uuid';
import {
    CONSUMER_PREFERENCES_URL,
    CONVERSATION_ID_COOKIE_NAME,
    CONVERSATION_ID_HEADER_NAME,
    AUTHORISATION_HEADER_NAME,
    ACCEPT_LANGUAGE_HEADER_NAME
} from '../../constants';

const GetSetConversationId = cookies => {
    const conversationId = uuid();

    cookies.set(CONVERSATION_ID_COOKIE_NAME, conversationId);

    return conversationId;
};

const BuildHeaders = (conversationId, authToken, locale) => {
    const headers = {
        [CONVERSATION_ID_HEADER_NAME]: conversationId,
        [AUTHORISATION_HEADER_NAME]: authToken ? `Bearer ${authToken}` : '',
        [ACCEPT_LANGUAGE_HEADER_NAME]: locale
    };

    return headers;
};
export default class ContactPreferencesApi {
    #httpClient;
    #cookies;
    #baseUrl;
    #locale;

    constructor ({
        httpClient, cookies, baseUrl, locale
    } = {}) {
        this.#httpClient = httpClient;
        this.#cookies = cookies;
        this.#baseUrl = baseUrl;
        this.#locale = locale;
    }

    async getPreferences (authToken, conversationId = GetSetConversationId(this.#cookies)) {
        const headers = BuildHeaders(conversationId, authToken, this.#locale);

        const response = await this.#httpClient.get(`${this.#baseUrl}/${CONSUMER_PREFERENCES_URL}`, headers);

        return response;
    }

    async postPreferences (authToken, body, conversationId = GetSetConversationId(this.#cookies)) {
        const headers = BuildHeaders(conversationId, authToken, this.#locale);

        const response = await this.#httpClient.post(`${this.#baseUrl}/${CONSUMER_PREFERENCES_URL}`, body, headers);

        return response;
    }
}
