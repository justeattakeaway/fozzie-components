import { SELF_EXCLUSION_URL, AUTHORISATION_HEADER_NAME } from '../constants';

const BuildHeaders = authToken => {
    const headers = {
        [AUTHORISATION_HEADER_NAME]: authToken ? `Bearer ${authToken}` : ''
    };

    return headers;
};

export default class SelfExclusionApi {
    #httpClient;
    #baseUrl;

    constructor ({
        httpClient, baseUrl
    } = {}) {
        this.#httpClient = httpClient;
        this.#baseUrl = baseUrl;
    }

    async getSelfExclusionStatus (authToken) {
        const headers = BuildHeaders(authToken);

        const response = await this.#httpClient.get(`${this.#baseUrl}/${SELF_EXCLUSION_URL}`, headers);

        return response;
    }

    async updateSelfExclusionStatus (authToken, body) {
        const headers = BuildHeaders(authToken);

        const response = await this.#httpClient.put(`${this.#baseUrl}/${SELF_EXCLUSION_URL}`, body, headers);

        return response;
    }
}
