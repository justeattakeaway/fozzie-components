export const ALLERGEN_LINK = '[data-test-id="allergy-button"]';
export const CHECKOUT_COMPONENT = '[data-test-id="checkout-component"]';
export const ORDER_TIME_DROPDOWN = '[data-test-id="formfield-order-time-dropdown-select"]';
export const ORDER_TIME_DROPDOWN_OPTIONS = '[data-test-id="formfield-order-time-dropdown-select"] option';
export const USER_NOTE_INPUT = '[data-test-id="user-note"] textarea';
export const GO_TO_PAYMENT_BUTTON = '[data-test-id="confirm-payment-submit-button"]';

export const FIELDS = {
    mobileNumber: {
        input: '[data-test-id="formfield-mobile-number-input"]',
        error: '[data-test-id="error-mobile-number"]'
    },
    addressLine1: {
        input: '[data-test-id="formfield-address-line-1-input"]',
        error: '[data-test-id="error-address-line1-empty"]'
    },
    addressLine2: {
        input: '[data-test-id="formfield-address-line-2-input"]',
        error: ''
    },
    addressCity: {
        input: '[data-test-id="formfield-address-city-input"]',
        error: '[data-test-id="error-address-city-empty"]'
    },
    addressPostcode: {
        input: '[data-test-id="formfield-address-postcode-input"]',
        error: '[data-test-id="error-address-postcode-empty"]'
    },
    userNote: {
        input: '[data-test-id="user-note"] textarea', 
        error: ''
    }
};

export default {
    ALLERGEN_LINK,
    CHECKOUT_COMPONENT,
    ORDER_TIME_DROPDOWN, 
    ORDER_TIME_DROPDOWN_OPTIONS,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS
};
