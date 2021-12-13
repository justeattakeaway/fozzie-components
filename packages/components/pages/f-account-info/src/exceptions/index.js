import SaveAccountInfoError from './save-account-info';

export class GetAccountInfoError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.errorCode = errorCode;
    }
}

export default {
    GetAccountInfoError,
    SaveAccountInfoError
};
