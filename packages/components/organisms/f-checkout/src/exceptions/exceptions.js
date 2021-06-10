/* eslint-disable max-classes-per-file */
import EventNames from '../event-names';
import checkoutIssues from '../checkout-issues';
import { CHEKOUT_ERROR_FORM_TYPE } from '../constants';

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
        this.shouldShowInDialog = false;
        this.traceId = error.response && error.response.data ? error.response.data.traceId : null;
    }
}

class PlaceOrderError extends Error {
    constructor (message, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.genericServerError';
        this.eventToEmit = EventNames.CheckoutPlaceOrderFailure;
        this.logMessage = 'Place Order Failure';
        this.errorCode = errorCode;
        const issue = checkoutIssues[errorCode] || {};
        this.shouldShowInDialog = issue.shouldShowInDialog || false;
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
        this.errorFormType = CHEKOUT_ERROR_FORM_TYPE.default;
    }
}

class AccessForbiddenError extends GetCheckoutError {
    constructor (message) {
        super(message);
        this.messageKey = 'errorMessages.accessForbiddenError.description';
        this.logMessage = 'Get Checkout Failure: Access Forbidden';
        this.errorFormType = CHEKOUT_ERROR_FORM_TYPE.accessForbidden;
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
        this.errorFormType = CHEKOUT_ERROR_FORM_TYPE.default;
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
        this.errorFormType = CHEKOUT_ERROR_FORM_TYPE.default;
    }
}

export default {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError,
    GetCheckoutError,
    AccessForbiddenError,
    AvailableFulfilmentGetError,
    GetBasketError
};
