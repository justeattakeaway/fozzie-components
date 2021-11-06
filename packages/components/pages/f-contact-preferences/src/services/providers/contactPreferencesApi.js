import { v4 as uuid } from 'uuid';

const GetSetConversationId = cookies => {
    const conversationId = uuid();

    cookies.set('x-je-conversation', conversationId);

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

    async getPreferences (url, authToken, conversationId = GetSetConversationId(this.cookies)) {
        const headers = { 'x-je-conversation': conversationId };

        this.httpClient.setAuthorisationToken(authToken);

        console.log('DEBUG1'); // eslint-disable-line

        const response = await this.httpClient.get(`${this.baseUrl}/${url}`, headers);

        console.log('DEBUG2'); // eslint-disable-line

        return response;
    }
}
