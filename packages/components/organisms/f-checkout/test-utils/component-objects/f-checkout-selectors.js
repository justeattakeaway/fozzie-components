export const CHECKOUT_COMPONENT = '[data-test-id="checkout-component"]';
export const ORDER_TIME_DROPDOWN = '[data-test-id="formfield-order-time-dropdown-select"]';
export const ORDER_TIME_DROPDOWN_OPTIONS = '[data-test-id="formfield-order-time-dropdown-select"] option';
export const USER_NOTE_INPUT = '[data-test-id="user-note"] textarea';
export const GO_TO_PAYMENT_BUTTON = '[data-test-id="confirm-payment-submit-button"]';
export const KNOB_BUTTON = '[id$="tabbutton-knobs"]';
export const KNOB_CHECKOUT_DROPDOWN = '[name="Checkout Url"]';
export const SWITCH_USER_LINK = '[data-test-id="switch-user-link"]';
export const GUEST_CHECKOUT_LOGIN_BUTTON = '[data-test-id="guest-login-button"]';
export const GUEST_CHECKOUT_HEADER = '[data-test-id="guest-checkoutHeader"]';

export const FIELDS = {
    firstName: {
        input: '[data-test-id="formfield-guest-first-name-input"]',
        error: '[data-test-id="error-first-name-empty"]'
    },
    lastName: {
        input: '[data-test-id="formfield-guest-last-name-input"]',
        error: '[data-test-id="error-last-name-empty"]'
    },
    emailAddress: {
        input: '[data-test-id="formfield-guest-email-input"]',
        error: '[data-test-id="error-email-invalid"]'
    },
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
        error: '[data-test-id="error-address-postcode-empty"]',
        typeError: '[data-test-id="error-address-postcode-type-error"]'
    },
    userNote: {
        input: '[data-test-id="user-note"] textarea',
        error: ''
    }
};

export default {
    CHECKOUT_COMPONENT,
    ORDER_TIME_DROPDOWN,
    ORDER_TIME_DROPDOWN_OPTIONS,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    SWITCH_USER_LINK,
    FIELDS
};
