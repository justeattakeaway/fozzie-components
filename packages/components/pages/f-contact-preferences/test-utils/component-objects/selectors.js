const COMPONENT = '[data-test-id="contact-preferences"]';
const SUBMIT_BUTTON = '[data-test-id="contact-preferences-submit-button"]';
const ERROR_PAGE = '[data-test-id="contact-preferences-error-card"]';
const ERROR_ALERT = '[data-test-id="contact-preferences-error-alert"]';
const SUCCESS_ALERT = '[data-test-id="contact-preferences-success-alert"]';

const CHECKBOXES = {
    news: {
        email: '[data-test-id="formfield-contact-preferences-news-email"]',
        sms: '[data-test-id="formfield-contact-preferences-news-sms"]'
    }
};

export {
    COMPONENT,
    SUBMIT_BUTTON,
    ERROR_PAGE,
    ERROR_ALERT,
    SUCCESS_ALERT,
    CHECKBOXES
};
