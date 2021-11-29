/* eslint-disable max-classes-per-file */
import { CHECKOUT_ERROR_FORM_TYPE, ERROR_TYPES } from '../constants';

const formatUpdateCheckoutErrorCode = error => {
    const errorList = error?.response?.data?.errors ?? [];
    const errorCodes = errorList.map(el => el.errorCode);
    const result = errorCodes.join(',');

    return result;
};

class CreateGuestUserError extends Error {
    constructor (message) {
        super(message);
        this.messageKey = 'errorMessages.guestUserCreationFailure';
        this.eventMessage = 'CheckoutSetupGuestFailure';
        this.errorType = ERROR_TYPES.alert;
    }
}

class UpdateCheckoutError extends Error {
    constructor (error) {
        super(error.message);
        this.messageKey = 'errorMessages.genericServerError';
        this.eventMessage = 'CheckoutUpdateFailure';
        this.errorCode = formatUpdateCheckoutErrorCode(error);
        this.errorType = ERROR_TYPES.alert;
        this.traceId = error.response && error.response.data ? error.response.data.traceId : null;
    }
}

class UpdateCheckoutAccessForbiddenError extends UpdateCheckoutError {
    constructor (error) {
        super(error);
        this.messageKey = 'errorMessages.accessForbiddenError.description';
        this.eventMessage = 'CheckoutUpdateForbidden';
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.accessForbidden;
        this.errorType = ERROR_TYPES.errorPage;
    }
}

class PlaceOrderError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.genericServerError';
        this.eventMessage = errorCode === 'DuplicateOrder'
            ? 'CheckoutPlaceOrderDuplicateOrder'
            : 'CheckoutPlaceOrderFailure';
        this.errorCode = errorCode;
        this.errorType = errorCode === 'DuplicateOrder'
            ? ERROR_TYPES.dialog
            : ERROR_TYPES.alert;
    }
}

class GetCheckoutError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.eventMessage = 'CheckoutGetFailure';
        this.errorCode = errorCode;
        this.errorType = ERROR_TYPES.errorPage;
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.default;
    }
}

class GetCheckoutAccessForbiddenError extends GetCheckoutError {
    constructor (message) {
        super(message, 403);
        this.messageKey = 'errorMessages.accessForbiddenError.description';
        this.eventMessage = 'CheckoutGetForbidden';
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.accessForbidden;
        this.errorType = ERROR_TYPES.errorPage;
    }
}

class AvailableFulfilmentGetError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.eventMessage = 'CheckoutAvailableFulfilmentGetFailure';
        this.errorCode = errorCode;
        this.errorType = ERROR_TYPES.errorPage;
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.default;
    }
}

class GetBasketError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.eventMessage = 'CheckoutBasketGetFailure';
        this.errorCode = errorCode;
        this.errorType = ERROR_TYPES.errorPage;
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.default;
    }
}

export default {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError,
    UpdateCheckoutAccessForbiddenError,
    GetCheckoutError,
    GetCheckoutAccessForbiddenError,
    AvailableFulfilmentGetError,
    GetBasketError
};
