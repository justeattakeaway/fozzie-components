export default class AccountWebApi {
    #httpClient;
    #validateUrl;

    constructor ({ httpClient, validateUrl } = {}) {
        this.#httpClient = httpClient;
        this.#validateUrl = validateUrl;
    }

    async postValidateMfaToken (body) {
        const response = await this.#httpClient.post(this.#validateUrl, body);

        return response;
    }
}
