export class GetPreferencesError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.errorCode = errorCode;
    }
}

export default {
    GetPreferencesError
};
