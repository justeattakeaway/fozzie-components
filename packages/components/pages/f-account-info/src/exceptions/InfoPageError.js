export default class InfoPageError extends Error {
    constructor (message, errorCode, translationKey) {
        super(message);
        this.messageKey = translationKey;
        this.errorCode = errorCode;
    }
}
