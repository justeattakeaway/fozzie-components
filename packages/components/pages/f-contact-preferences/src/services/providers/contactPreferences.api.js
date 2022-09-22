import {
    CONSUMER_PREFERENCES_URL,
    AUTHORISATION_HEADER_NAME,
    ACCEPT_LANGUAGE_HEADER_NAME
} from '../../constants';

const BuildHeaders = (authToken, locale) => {
    const headers = {
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

    async getPreferences (authToken) {
        const headers = BuildHeaders(authToken, this.#locale);

        const response = await this.#httpClient.get(`${this.#baseUrl}/${CONSUMER_PREFERENCES_URL}`, headers);

        return response;
    }

    async postPreferences (authToken, body) {
        const headers = BuildHeaders(authToken, this.#locale);

        const response = await this.#httpClient.post(`${this.#baseUrl}/${CONSUMER_PREFERENCES_URL}`, body, headers);

        return response;
    }
}
