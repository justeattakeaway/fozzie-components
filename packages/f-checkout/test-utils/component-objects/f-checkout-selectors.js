export const ALLERGEN_LINK = '[data-test-id="allergy-button"]';
export const CHECKOUT_COMPONENT = '[data-test-id="checkout-component"]';
export const FULFILLMENT_TIME_DROPDOWN = '[data-test-id="fulfillment-time"]';
export const USER_NOTE_INPUT = '[data-test-id="user-note"] textarea';
export const GO_TO_PAYMENT_BUTTON = '[data-test-id="confirm-payment-submit-button"]';

export const INPUTS = {
    MOBILE_NUMBER: '[data-test-id="input-mobile-number"]',
    ADDRESS_LINE_1: '[data-test-id="input-address-line-1"]',
    ADDRESS_LINE_2: '[data-test-id="input-address-line-2"]',
    ADDRESS_CITY: '[data-test-id="input-address-city"]',
    ADDRESS_POSTCODE: '[data-test-id="input-address-postcode"]'
};

export const ERRORS = {
    MOBILE_NUMBER: '[data-test-id="error-mobile-number"]',
    ADDRESS_LINE_1: '[data-test-id="error-address-line1-empty"]',
    ADDRESS_CITY: '[data-test-id="error-address-city-empty"]',
    ADDRESS_POSTCODE: '[data-test-id="error-address-postcode-empty"]'
};

export const FIELDS = {
    mobileNumber: {
        input: '[data-test-id="input-mobile-number"]',
        error: '[data-test-id="error-mobile-number"]'
    },
    addressLine1: {
        input: '',
        error: ''
    },
    addressLine2: {
        input: '',
        error: ''
    },
    addressCity: {
        input: '',
        error: ''
    },
    addressPostcode: {
        input: '',
        error: ''
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
