/* eslint-disable max-classes-per-file */
import EventNames from '../event-names';
import checkoutIssues from '../checkout-issues';

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

export default {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError
};
