/* eslint-disable max-classes-per-file */
import EventNames from '../event-names';

class CreateGuestUserError extends Error {
    constructor (message) {
        super(message);
        this.messageKey = 'errorMessages.guestUserCreationFailure';
        this.eventToEmit = EventNames.CheckoutSetupGuestFailure;
        this.logMessage = 'Checkout Setup Guest Failure';
        this.shouldShowErrorToUser = true;
    }
}

class UpdateCheckoutError extends Error {
    constructor (message) {
        super(message);
        this.messageKey = 'errorMessages.genericServerError';
        this.eventToEmit = EventNames.CheckoutUpdateFailure;
        this.logMessage = 'Checkout Update Failure';
        this.shouldShowErrorToUser = true;
    }
}

class PlaceOrderError extends Error {
    constructor (message) {
        super(message);
        this.messageKey = 'errorMessages.genericServerError';
        this.eventToEmit = EventNames.CheckoutPlaceOrderFailure;
        this.logMessage = 'Place Order Failure';
    }
}

export default {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError
};
