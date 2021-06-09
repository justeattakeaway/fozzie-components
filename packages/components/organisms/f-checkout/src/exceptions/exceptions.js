/* eslint-disable max-classes-per-file */
import EventNames from '../event-names';
import checkoutIssues from '../checkout-issues';
import { CHECKOUT_LOADED_TYPE } from '../constants';

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

class DefaultGetCheckoutError extends Error {
    constructor (message, loadedComponent, errorCode) {
        super(message);
        this.messageKey = 'errorMessages.pageLoad.description';
        this.eventToEmit = loadedComponent === CHECKOUT_LOADED_TYPE.checkout ? EventNames.CheckoutGetFailure : EventNames.CheckoutBasketGetFailure;
        this.logMessage = `Get ${loadedComponent} Failure`;
        this.errorCode = errorCode;
        this.shouldShowInDialog = false;
        this.errorFormType = 'pageLoad';
    }
}

class AccessForbiddenError extends DefaultGetCheckoutError {
    constructor (message, loadedComponent) {
        super(message);
        this.messageKey = 'errorMessages.accessForbiddenError.description';
        this.logMessage = `${loadedComponent}: Access Forbidden Failure`;
        this.errorFormType = 'accessForbiddenError';
    }
}

export default {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError,
    DefaultGetCheckoutError,
    AccessForbiddenError
};
