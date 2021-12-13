export default class SaveAccountInfoError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.saveDetails.description';
        this.errorCode = errorCode;
    }
}
