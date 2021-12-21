export class AccountInfoError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.generic.description';
        this.errorCode = errorCode;
    }
}

export default {
    AccountInfoError
};
