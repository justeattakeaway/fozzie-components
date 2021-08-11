/* eslint-disable max-classes-per-file */
import EventNames from '../event-names';
import checkoutIssues from '../checkout-issues';
import { CHECKOUT_ERROR_FORM_TYPE } from '../constants';

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
        this.eventToEmit = EventNames.CheckoutSetupGuestFailure;
        this.logMessage = 'Checkout Setup Guest Failure';
        this.shouldShowInDialog = false;
    }
}

class UpdateCheckoutError extends Error {
    constructor (error) {
        super(error.message);
        this.messageKey = 'errorMessages.genericServerError';
        this.eventToEmit = EventNames.CheckoutUpdateFailure;
        this.logMessage = 'Checkout Update Failure';
        this.errorCode = formatUpdateCheckoutErrorCode(error);
        this.shouldShowInDialog = false;
        this.traceId = error.response && error.response.data ? error.response.data.traceId : null;
    }
}

class UpdateCheckoutAccessForbiddenError extends UpdateCheckoutError {
    constructor (error, logger) {
        super(error);
        this.messageKey = 'errorMessages.accessForbiddenError.description';
        this.logMessage = 'Checkout Update Failure: Access Forbidden';
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.accessForbidden;
        this.logMethod = logger.logWarn;
    }
}

class PlaceOrderError extends Error {
    constructor (message, errorCode, logger) {
        super(message);
        this.messageKey = 'errorMessages.genericServerError';
        this.eventToEmit = EventNames.CheckoutPlaceOrderFailure;
        this.logMessage = 'Place Order Failure';
        this.errorCode = errorCode;
        const issue = checkoutIssues[errorCode] || {};
        this.shouldShowInDialog = issue.shouldShowInDialog || false;
        this.logMethod = errorCode === 'DuplicateOrder'
            ? logger.logWarn
            : logger.logError;
    }
}

class GetCheckoutError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.eventToEmit = EventNames.CheckoutGetFailure;
        this.logMessage = 'Get Checkout Failure';
        this.errorCode = errorCode;
        this.shouldShowInDialog = false;
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.default;
    }
}

class GetCheckoutAccessForbiddenError extends GetCheckoutError {
    constructor (message, logger) {
        super(message, 403);
        this.messageKey = 'errorMessages.accessForbiddenError.description';
        this.logMessage = 'Get Checkout Failure: Access Forbidden';
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.accessForbidden;
        this.logMethod = logger.logWarn;
    }
}

class AvailableFulfilmentGetError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.eventToEmit = EventNames.CheckoutAvailableFulfilmentGetFailure;
        this.logMessage = 'Get Checkout Available Fulfilment Times Failure';
        this.errorCode = errorCode;
        this.shouldShowInDialog = false;
        this.errorFormType = CHECKOUT_ERROR_FORM_TYPE.default;
    }
}

class GetBasketError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.eventToEmit = EventNames.CheckoutBasketGetFailure;
        this.logMessage = 'Get Basket Failure';
        this.errorCode = errorCode;
        this.shouldShowInDialog = false;
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
