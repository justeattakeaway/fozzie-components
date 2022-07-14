const CHECKOUT_COMPONENT = '[data-test-id="checkout-component"]';
const ORDER_TIME_DROPDOWN = '[data-test-id="formfield-order-time-dropdown-select"]';
const USER_NOTE_INPUT = '[data-test-id="formfield-textarea"]';
const GO_TO_PAYMENT_BUTTON = '[data-test-id="confirm-payment-submit-button"]';
const SWITCH_USER_LINK = '[data-test-id="switch-user-link"]';
const GUEST_CHECKOUT_LOGIN_BUTTON = '[data-test-id="guest-login-button"]';
const PRE_ORDER_WARNING = '[data-test-id="warning-pre-order"]';
const CHECKOUT_ERROR_MESSAGE = '[data-test-id="checkout-issue-modal"] div';
const RETRY_BUTTON = '[data-test-id="redirect-to-menu-button"]';
const CLOSE_MODAL = '[data-test-id="close-modal"]';
const DUP_ORDER_GO_TO_HISTORY_BUTTON = '[data-test-id="redirect-to-orderhistory-button"]';
const ERROR_PAGE_COMPONENT = '[data-test-id="checkout-error-page-component"]';
const ERROR_PAGE_HEADING = '[data-test-id="checkout-error-page-heading"]';
const ERROR_PAGE_DESCRIPTION = '[data-test-id="checkout-error-page-description"]';
const ERROR_PAGE_IMAGE = '[data-test-id="checkout-error-page-image"]';

const COURIER_ACCORDION_HEADER = '[data-test-id="courier-accordion-header"]';
const KITCHEN_ACCORDION_HEADER = '[data-test-id="kitchen-accordion-header"]';
const ORDER_ACCORDION_HEADER = '[data-test-id="order-accordion-header"]';

const AGE_VERIFICATION_COMPONENT = '[data-test-id="checkout-age-verification-component"]';
const AGE_VERIFICATION_DAY_DROPDOWN = '[data-test-id="formfield-dob-day-dropdown-select"]';
const AGE_VERIFICATION_MONTH_DROPDOWN = '[data-test-id="formfield-dob-month-dropdown-select"]';
const AGE_VERIFICATION_YEAR_DROPDOWN = '[data-test-id="formfield-dob-year-dropdown-select"]';
const AGE_VERIFICATION_ERROR = '[data-test-id="age-verification-error-message"]';
const AGE_VERIFICATION_SUBMIT_BUTTON = '[data-test-id="age-verification-redirect-button"]';

const FIELDS = {
    firstName: {
        input: '[data-test-id="formfield-first-name-input"]',
        error: '[data-test-id="error-first-name-required"]'
    },
    lastName: {
        input: '[data-test-id="formfield-last-name-input"]',
        error: '[data-test-id="error-last-name-required"]'
    },
    emailAddress: {
        input: '[data-test-id="formfield-email-input"]',
        error: '[data-test-id="error-email-invalid"]'
    },
    mobileNumber: {
        input: '[data-test-id="formfield-mobile-number-input"]',
        emptyError: '[data-test-id="error-mobile-number-required"]',
        invalidError: '[data-test-id="error-mobile-number-invalid"]'
    },
    addressLine1: {
        input: '[data-test-id="formfield-line-1-input"]',
        error: '[data-test-id="error-line1-required"]'
    },
    addressLine2: {
        input: '[data-test-id="formfield-line-2-input"]',
        error: ''
    },
    addressLocality: {
        input: '[data-test-id="formfield-locality-input"]',
        error: '[data-test-id="error-locality-required"]'
    },
    addressAdministrativeArea: {
        input: '[data-test-id="formfield-administrative-area-input"]',
        error: '[data-test-id="error-administrative-area-required"]'
    },
    addressPostcode: {
        input: '[data-test-id="formfield-postcode-input"]',
        error: '[data-test-id="error-postcode-required"]',
        typeError: '[data-test-id="error-postcode-invalid"]'
    },
    userNote: {
        input: '[data-test-id="formfield-note-textarea"]',
        error: ''
    },
    tableIdentifier: {
        input: '[data-test-id="formfield-table-identifier-input"]'
    },
    courierNote: {
        input: '[data-test-id="formfield-courier-note-textarea"]'
    },
    kitchenNote: {
        input: '[data-test-id="formfield-kitchen-note-textarea"]'
    },
    orderNote: {
        input: '[data-test-id="formfield-order-note-textarea"]'
    }
};

export {
    CHECKOUT_COMPONENT,
    ORDER_TIME_DROPDOWN,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    SWITCH_USER_LINK,
    GUEST_CHECKOUT_LOGIN_BUTTON,
    PRE_ORDER_WARNING,
    CHECKOUT_ERROR_MESSAGE,
    RETRY_BUTTON,
    CLOSE_MODAL,
    DUP_ORDER_GO_TO_HISTORY_BUTTON,
    ERROR_PAGE_COMPONENT,
    ERROR_PAGE_HEADING,
    ERROR_PAGE_DESCRIPTION,
    ERROR_PAGE_IMAGE,
    COURIER_ACCORDION_HEADER,
    KITCHEN_ACCORDION_HEADER,
    ORDER_ACCORDION_HEADER,
    AGE_VERIFICATION_COMPONENT,
    AGE_VERIFICATION_DAY_DROPDOWN,
    AGE_VERIFICATION_MONTH_DROPDOWN,
    AGE_VERIFICATION_YEAR_DROPDOWN,
    AGE_VERIFICATION_SUBMIT_BUTTON,
    AGE_VERIFICATION_ERROR,
    FIELDS
};
