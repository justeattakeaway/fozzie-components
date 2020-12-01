/* global browser, $ */

import {
    ALLERGEN_LINK,
    CHECKOUT_COMPONENT,
    FULFILLMENT_TIME_DROPDOWN,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    INPUTS,
    ERRORS
} from './f-checkout-selectors';

const { doesElementExist } = require('../../../../test/utils/webdriverio-extensions')(browser);

doesElementExist(CHECKOUT_COMPONENT);

const checkoutComponent = () => $(CHECKOUT_COMPONENT);

// Form Fields

const allergenLink = () => $(ALLERGEN_LINK);
const fulfillmentTimeDropdown = () => $(FULFILLMENT_TIME_DROPDOWN);
const goToPaymentButton = () => $(GO_TO_PAYMENT_BUTTON);
const userNoteInput = () => $(USER_NOTE_INPUT);

const inputs = {
    mobileNumber: () => $(INPUTS.MOBILE_NUMBER),
    addressLine1: () => $(INPUTS.ADDRESS_LINE_1),
    addressLine2: () => $(INPUTS.ADDRESS_LINE_2),
    addressCity: () => $(INPUTS.ADDRESS_CITY),
    addressPostcode: () => $(INPUTS.ADDRESS_POSTCODE)
};

exports.inputs = inputs;

const errorMessages = {
    mobileNumber: () => $(ERRORS.MOBILE_NUMBER),
    addressLine1: () => $(ERRORS.ADDRESS_LINE_1),
    addressCity: () => $(ERRORS.ADDRESS_CITY),
    addressPostcode: () => $(ERRORS.ADDRESS_POSTCODE)
};

exports.errorMessages = errorMessages;

exports.waitForCheckoutComponent = () => checkoutComponent().waitForExist();
exports.isCheckoutComponentDisplayed = () => checkoutComponent().isDisplayed();
exports.isAllergenLinkDisplayed = () => allergenLink().isDisplayed();

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
    inputs.mobileNumber().setValue(addressInfo.mobileNumber);
    inputs.addressLine1().setValue(addressInfo.line1);
    inputs.addressLine2().setValue(addressInfo.line2);
    inputs.addressCity().setValue(addressInfo.city);
    inputs.addressPostcode().setValue(addressInfo.postcode);
};

/**
 * @description
 * Sets the value of the fulfillment time dropdown based on visible text.
 *
 * @param {String} fulfillmentTimeText The text visible text value of the fulfillment time
 */
exports.selectFulfillmentTime = fulfillmentTimeText => {
    fulfillmentTimeDropdown().selectByVisibleText(fulfillmentTimeText);
};

/**
 * @description
 * Sets the value of the user note.
 *
 * @param {String} userNote The user note value to be entered
 */
exports.inputUserNote = userNote => {
    userNoteInput().setValue(userNote);
};

/**
 * @description
 * Submits the checkout form.
 */
exports.submit = () => {
    goToPaymentButton().click();
};

exports.clearAllFields = () => {
    Object.keys(inputs).forEach(inputKey => {
        inputs[inputKey]().setValue('');
    });
};

exports.WaitForErrorMessage = errorMessage => {
    doesElementExist(errorMessage);
};
