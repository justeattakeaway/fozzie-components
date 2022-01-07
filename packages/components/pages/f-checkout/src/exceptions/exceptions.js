/* eslint-disable max-classes-per-file */
import { CHECKOUT_ERROR_FORM_TYPE, DUPLICATE_ORDER, ERROR_TYPES } from '../constants';

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
        this.errorType = ERROR_TYPES.alert;
        this.errorCode = formatUpdateCheckoutErrorCode(error);
        this.traceId = error.response && error.response.data ? error.response.data.traceId : null;
    }
}

class UpdateCheckoutAccessForbiddenError extends UpdateCheckoutError {
    constructor (error) {
        super(error);
        this.messageKey = CHECKOUT_ERROR_FORM_TYPE.accessForbidden;
        this.eventMessage = 'CheckoutUpdateForbidden';
        this.errorType = ERROR_TYPES.errorPage;
    }
}

class PlaceOrderError extends Error {
    constructor (message, errorCode) {
        super(message);

        if (errorCode === DUPLICATE_ORDER) {
            this.messageKey = DUPLICATE_ORDER;
            this.eventMessage = 'CheckoutPlaceOrderDuplicateOrder';
            this.errorType = ERROR_TYPES.dialog;
        } else {
            this.messageKey = 'errorMessages.genericServerError';
            this.eventMessage = 'CheckoutPlaceOrderFailure';
            this.errorType = ERROR_TYPES.alert;
        }

        this.errorCode = errorCode;
    }
}

class GetCheckoutError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = CHECKOUT_ERROR_FORM_TYPE.default;
        this.eventMessage = 'CheckoutGetFailure';
        this.errorType = ERROR_TYPES.errorPage;
        this.errorCode = errorCode;
    }
}

class GetCheckoutAccessForbiddenError extends GetCheckoutError {
    constructor (message) {
        super(message, 403);
        this.messageKey = CHECKOUT_ERROR_FORM_TYPE.accessForbidden;
        this.eventMessage = 'CheckoutGetForbidden';
        this.errorType = ERROR_TYPES.errorPage;
    }
}

class AvailableFulfilmentEmptyError extends Error {
    constructor (message) {
        super(message);
        this.messageKey = CHECKOUT_ERROR_FORM_TYPE.noTimeAvailable;
        this.eventMessage = 'CheckoutAvailableFulfilmentEmpty';
        this.errorType = ERROR_TYPES.errorPage;
    }
}
class AvailableFulfilmentGetError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = CHECKOUT_ERROR_FORM_TYPE.default;
        this.eventMessage = 'CheckoutAvailableFulfilmentGetFailure';
        this.errorType = ERROR_TYPES.errorPage;
        this.errorCode = errorCode;
    }
}

class GetBasketError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = CHECKOUT_ERROR_FORM_TYPE.default;
        this.eventMessage = 'CheckoutBasketGetFailure';
        this.errorType = ERROR_TYPES.errorPage;
        this.errorCode = errorCode;
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
    AvailableFulfilmentEmptyError,
    GetBasketError
};
