export const CHECKOUT_COMPONENT = '[data-test-id="checkout-component"]';
export const ORDER_TIME_DROPDOWN = '[data-test-id="formfield-order-time-dropdown-select"]';
export const ORDER_TIME_DROPDOWN_OPTIONS = '[data-test-id="formfield-order-time-dropdown-select"] option';
export const USER_NOTE_INPUT = '[data-test-id="formfield-textarea"]';
export const GO_TO_PAYMENT_BUTTON = '[data-test-id="confirm-payment-submit-button"]';
export const KNOB_BUTTON = '[id$="tabbutton-knobs"]';
export const KNOB_CHECKOUT_DROPDOWN = '[name="Checkout Url"]';
export const SWITCH_USER_LINK = '[data-test-id="switch-user-link"]';
export const GUEST_CHECKOUT_LOGIN_BUTTON = '[data-test-id="guest-login-button"]';
export const GUEST_CHECKOUT_HEADER = '[data-test-id="guest-checkoutHeader"]';
export const PRE_ORDER_WARNING = '[data-test-id="warning-pre-order"]';
export const CHECKOUT_ERROR_MESSAGE = '[data-test-id="checkout-issue-modal"] div';
export const RETRY_BUTTON = '[data-test-id="redirect-to-menu-button"]';
export const DUP_ORDER_GO_TO_HISTORY_BUTTON = '[data-test-id="redirect-to-orderhistory-button"]';
export const ERROR_PAGE_COMPONENT = '[data-test-id="checkout-error-page-component"]';
export const ERROR_PAGE_HEADING = '[data-test-id="checkout-error-page-heading"]';
export const ERROR_PAGE_DESCRIPTION = '[data-test-id="checkout-error-page-description"]';
export const ERROR_PAGE_IMAGE = '[data-test-id="checkout-error-page-image"]';
export const DELIVERY_ACCORDION_HEADER = '[data-test-id="delivery-accordion-header"]';
export const KITCHEN_ACCORDION_HEADER = '[data-test-id="kitchen-accordion-header"]';
export const RESTAURANT_ACCORDION_HEADER = '[data-test-id="restaurant-accordion-header"]';
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
        emptyError: '[data-test-id="error-mobile-number-empty"]',
        invalidError: '[data-test-id="error-mobile-number-invalid"]'
    },
    addressLine1: {
        input: '[data-test-id="formfield-address-line-1-input"]',
        error: '[data-test-id="error-address-line1-empty"]'
    },
    addressLine2: {
        input: '[data-test-id="formfield-address-line-2-input"]',
        error: ''
    },
    addressLocality: {
        input: '[data-test-id="formfield-address-locality-input"]',
        error: '[data-test-id="error-address-locality-empty"]'
    },
    addressPostcode: {
        input: '[data-test-id="formfield-address-postcode-input"]',
        error: '[data-test-id="error-address-postcode-empty"]',
        typeError: '[data-test-id="error-address-postcode-type-error"]'
    },
    userNote: {
        input: '[data-test-id="formfield-textarea"]',
        error: ''
    },
    tableIdentifier: {
        input: '[data-test-id="formfield-table-identifier-input"]'
    },
    deliveryNote: {
        input: '[data-test-id="formfield-delivery-note-textarea"]'
    },
    kitchenNote: {
        input: '[data-test-id="formfield-kitchen-note-textarea"]'
    },
    restaurantNote: {
        input: '[data-test-id="formfield-restaurant-note-textarea"]'
    }
};
