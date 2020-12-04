/* global browser, $ */

import {
    ALLERGEN_LINK,
    CHECKOUT_COMPONENT,
    FULFILLMENT_TIME_DROPDOWN,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS
} from './f-checkout-selectors';

const { doesElementExist } = require('../../../../test/utils/webdriverio-extensions')(browser);

const checkoutComponent = () => $(CHECKOUT_COMPONENT);

// Dropdown

const orderTimeDropdown = () => $(ORDER_TIME_DROPDOWN);
const orderTimeDropdownOptions = () => $$(ORDER_TIME_DROPDOWN_OPTIONS);

// Form Fields

const allergenLink = () => $(ALLERGEN_LINK);
const fulfillmentTimeDropdown = () => $(FULFILLMENT_TIME_DROPDOWN);
const goToPaymentButton = () => $(GO_TO_PAYMENT_BUTTON);
const userNoteInput = () => $(USER_NOTE_INPUT);

const fields = {
    mobileNumber: {
        input: () => $(FIELDS.mobileNumber.input),
        error: () => $(FIELDS.mobileNumber.error)
    },
    addressLine1: {
        input: () => $(FIELDS.addressLine1.input),
        error: () => $(FIELDS.addressLine1.error)
    },
    addressLine2: {
        input: () => $(FIELDS.addressLine2.input),
        error: ''
    },
    addressCity: {
        input: () => $(FIELDS.addressCity.input),
        error: () => $(FIELDS.addressCity.error)
    },
    addressPostcode: {
        input: () => $(FIELDS.addressPostcode.input),
        error: () => $(FIELDS.addressPostcode.error)
    }
};

exports.isFieldErrorDisplayed = fieldName => fields[fieldName].error().isDisplayed();
exports.isFieldDisplayed = fieldName => fields[fieldName].input().isDisplayed();
exports.waitForCheckoutComponent = () => checkoutComponent().waitForExist();
exports.isCheckoutComponentDisplayed = () => checkoutComponent().isDisplayed();
exports.isAllergenLinkDisplayed = () => allergenLink().isDisplayed();
exports.isOrderTimeDropdownDisplayed = () => orderTimeDropdown().isDisplayed();
exports.userNoteMaxCharacterCount = () => userNoteInput().getAttribute('maxlength');
exports.clickPaymentButton = () => goToPaymentButton().click();

/**
 * @description
 * Inputs address details into the checkout component.
 *
 * @param {Object} addressInfo
 * @param {String} addressInfo.mobileNumber The user's mobile number
 * @param {String} addressInfo.line1 First line of the user's address
 * @param {String} addressInfo.line2 Second line of the user's address
 * @param {String} addressInfo.city City of the user's address
 * @param {String} addressInfo.postcode Postcode of the user's address
 */
exports.populateCheckoutForm = addressInfo => {
    exports.waitForCheckoutComponent();
    fields.mobileNumber.input().setValue(addressInfo.mobileNumber);
    fields.addressLine1.input().setValue(addressInfo.line1);
    fields.addressLine2.input().setValue(addressInfo.line2);
    fields.addressCity.input().setValue(addressInfo.city);
    fields.addressPostcode.input().setValue(addressInfo.postcode);
};

/**
 * @description
 * Sets the value of the order time dropdown based on visible text.
 *
 * @param {String} dropdownTime The visible text value of the order time
 */
exports.selectOrderTime = orderTime => {
    orderTimeDropdown().selectByVisibleText(orderTime);
};
/** 
 * @description
 * The time of the order should increase when a higher index is applied.
 */
exports.getOrderTimeOptionText = (index) => {
    return orderTimeDropdownOptions()[index].getText();
};
/**
 * @description
 * Sets the value of the user note and grabs the length of characters.
 *
 * @param {String} userNote The user note value to be entered
 */
exports.getUserNoteLength = userNote => {
    userNoteInput().setValue(userNote);
    return userNoteInput().getValue().length;
};
/**
 * @description
 * Submits the checkout form.
 */
exports.submit = () => {
    goToPaymentButton().click();
};

exports.waitForErrorMessage = errorMessage => {
    doesElementExist(FIELDS[errorMessage].error);
};
