/* eslint-disable max-classes-per-file */
class CreateGuestUserError extends Error {
    constructor (message) {
        super(message);
        this.message = message;
    }
}

class UpdateCheckoutError extends Error {
    constructor (message) {
        super(message);
        this.message = message;
    }
}

class PlaceOrderError extends Error {
    constructor (message) {
        super(message);
        this.message = message;
    }
}

module.exports = {
    CreateGuestUserError,
    UpdateCheckoutError,
    PlaceOrderError
};
