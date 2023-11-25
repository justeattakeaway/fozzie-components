import { GET_EXCLUSIONS_URL, PUT_ALCOHOL_EXCLUSION_URL, AUTHORISATION_HEADER_NAME } from '../../constants';

const BuildHeaders = authToken => {
    const headers = {
        [AUTHORISATION_HEADER_NAME]: authToken ? `Bearer ${authToken}` : ''
    };

    return headers;
};

export default class SelfExclusionApi {
    #httpClient;
    #baseUrl;
    #tenant;

    constructor ({
        httpClient, baseUrl, tenant
    } = {}) {
        this.#httpClient = httpClient;
        this.#baseUrl = baseUrl;
        this.#tenant = tenant;
    }

    async getExclusions (authToken) {
        const headers = BuildHeaders(authToken);
        const url = GET_EXCLUSIONS_URL.replace('{tenant}', this.#tenant);

        const response = this.#httpClient.get(`${this.#baseUrl}/${url}`, headers);

        return response;
    }

    async updateAlcoholExclusion (authToken, body) {
        const headers = BuildHeaders(authToken);
        const url = PUT_ALCOHOL_EXCLUSION_URL.replace('{tenant}', this.#tenant);

        const response = this.#httpClient.put(`${this.#baseUrl}/${url}`, body, headers);

        return response;
    }
}
