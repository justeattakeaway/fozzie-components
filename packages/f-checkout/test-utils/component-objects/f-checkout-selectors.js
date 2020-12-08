export const ALLERGEN_LINK = '[data-test-id="allergy-button"]';
export const CHECKOUT_COMPONENT = '[data-test-id="checkout-component"]';
export const FULFILLMENT_TIME_DROPDOWN = '[data-test-id="fulfillment-time"]';
export const USER_NOTE_INPUT = '[data-test-id="user-note"] textarea';
export const GO_TO_PAYMENT_BUTTON = '[data-test-id="confirm-payment-submit-button"]';

export const FIELDS = {
    mobileNumber: {
        input: '[data-test-id="input-mobile-number"]',
        error: '[data-test-id="error-mobile-number"]'
    },
    addressLine1: {
        input: '[data-test-id="input-address-line-1"]',
        error: '[data-test-id="error-address-line1-empty"]'
    },
    addressLine2: {
        input: '[data-test-id="input-address-line-2"]',
        error: ''
    },
    addressCity: {
        input: '[data-test-id="input-address-city"]',
        error: '[data-test-id="error-address-city-empty"]'
    },
    addressPostcode: {
        input: '[data-test-id="input-address-postcode"]',
        error: '[data-test-id="error-address-postcode-empty"]'
    }
};

export default {
    ALLERGEN_LINK,
    CHECKOUT_COMPONENT,
    FULFILLMENT_TIME_DROPDOWN,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS
};
