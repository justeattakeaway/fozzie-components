import Page from '@justeat/f-wdio-utils';
import {
    ORDER_TIME_DROPDOWN,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS,
    SWITCH_USER_LINK,
    GUEST_CHECKOUT_LOGIN_BUTTON,
    PRE_ORDER_WARNING,
    CHECKOUT_ERROR_MESSAGE,
    RETRY_BUTTON,
    CLOSE_MODAL,
    DUP_ORDER_GO_TO_HISTORY_BUTTON,
    ERROR_PAGE_COMPONENT,
    AGE_VERIFICATION_COMPONENT,
    AGE_VERIFICATION_DAY_DROPDOWN,
    AGE_VERIFICATION_MONTH_DROPDOWN,
    AGE_VERIFICATION_YEAR_DROPDOWN,
    AGE_VERIFICATION_SUBMIT_BUTTON,
    AGE_VERIFICATION_ERROR,
    COURIER_ACCORDION_HEADER,
    KITCHEN_ACCORDION_HEADER,
    ORDER_ACCORDION_HEADER
} from './f-checkout-selectors';

class Checkout extends Page {
    constructor () {
        super('page', 'checkout-component');
    }


    get orderTimeDropdown () { return $(ORDER_TIME_DROPDOWN); }

    get goToPaymentButton () { return $(GO_TO_PAYMENT_BUTTON); }

    get userNoteInput () { return $(USER_NOTE_INPUT); }

    get switchUserLink () { return $(SWITCH_USER_LINK); }

    get guestCheckoutLoginButton () { return $(GUEST_CHECKOUT_LOGIN_BUTTON); }

    get preOrderWarning () { return $(PRE_ORDER_WARNING); }

    get checkoutErrorMessage () { return $(CHECKOUT_ERROR_MESSAGE); }

    get errorMessageRetry () { return $(RETRY_BUTTON); }

    get closeMessageModal () { return $(CLOSE_MODAL); }

    get errorMessageDupOrderGoToHistory () { return $(DUP_ORDER_GO_TO_HISTORY_BUTTON); }

    get errorPageComponent () { return $(ERROR_PAGE_COMPONENT); }

    get ageVerificationComponent () { return $(AGE_VERIFICATION_COMPONENT); }

    get ageVerificationDayDropdown () { return $(AGE_VERIFICATION_DAY_DROPDOWN); }

    get ageVerificationMonthDropdown () { return $(AGE_VERIFICATION_MONTH_DROPDOWN); }

    get ageVerificationYearDropdown () { return $(AGE_VERIFICATION_YEAR_DROPDOWN); }

    get ageVerificationError () { return $(AGE_VERIFICATION_ERROR); }

    get ageVerificationSubmitButton () { return $(AGE_VERIFICATION_SUBMIT_BUTTON); }

    get courierAccordionHeader () { return $(COURIER_ACCORDION_HEADER); }

    get kitchenAccordionHeader () { return $(KITCHEN_ACCORDION_HEADER); }

    get orderAccordionHeader () { return $(ORDER_ACCORDION_HEADER); }

    fields = {
        firstName: {
            get input () { return $(FIELDS.firstName.input); },
            get error () { return $(FIELDS.firstName.error); }
        },
        lastName: {
            get input () { return $(FIELDS.lastName.input); },
            get error () { return $(FIELDS.lastName.error); }
        },
        emailAddress: {
            get input () { return $(FIELDS.emailAddress.input); },
            get error () { return $(FIELDS.emailAddress.error); }
        },
        mobileNumber: {
            get input () { return $(FIELDS.mobileNumber.input); },
            get emptyError () { return $(FIELDS.mobileNumber.emptyError); },
            get invalidError () { return $(FIELDS.mobileNumber.invalidError); }
        },
        addressLine1: {
            get input () { return $(FIELDS.addressLine1.input); },
            get error () { return $(FIELDS.addressLine1.error); }
        },
        addressLine2: {
            get input () { return $(FIELDS.addressLine2.input); },
            get error () { return $(FIELDS.addressLine2.error); }
        },
        addressLocality: {
            get input () { return $(FIELDS.addressLocality.input); },
            get error () { return $(FIELDS.addressLocality.error); }
        },
        addressPostcode: {
            get input () { return $(FIELDS.addressPostcode.input); },
            get error () { return $(FIELDS.addressPostcode.error); },
            get typeError () { return $(FIELDS.addressPostcode.typeError); }
        },
        courierNote: {
            get input () { return $(FIELDS.courierNote.input); },
            get error () { return ''; }
        },
        kitchenNote: {
            get input () { return $(FIELDS.kitchenNote.input); },
            get error () { return ''; }
        },
        orderNote: {
            get input () { return $(FIELDS.orderNote.input); },
            get error () { return ''; }
        },
        tableIdentifier: {
            get input () { return $(FIELDS.tableIdentifier.input); },
            get maxLengthError () { return $(FIELDS.tableIdentifier.maxLengthError); }
        },
        addressAdministrativeArea: {
            get input () { return $(FIELDS.addressAdministrativeArea.input); },
            get error () { return $(FIELDS.addressAdministrativeArea.error); }
        }
    };

    get inputFieldValues () { return this.values || {}; }

    set inputFieldValues (customerInput) {
        this.values = customerInput;
    }


    /**
     * @description
     * Sets the data for the checkout component.
     *
     * @param {Object} checkout
     * @param {String} checkout.type The checkout type
     * @param {String} checkout.isAuthenticated The checkout authentication
     * @param {String} checkout.isValid The checkout validation
     */

    async isPostcodeTypeErrorDisplayed () {
        return this.fields.addressPostcode.typeError.isDisplayed();
    }

    async isEmailErrorDisplayed () {
        return this.fields.emailAddress.error.isDisplayed();
    }

    async isTableIdentifierMaxLengthErrorDisplayed () {
        return this.fields.tableIdentifier.maxLengthError.isDisplayed();
    }

    async isOrderTimeDropdownDisplayed () {
        return this.orderTimeDropdown.isDisplayed();
    }

    async isAgeVerificationDisplayed () {
        return this.ageVerificationComponent.isDisplayed();
    }

    async isAgeVerificationErrorDisplayed () {
        return this.ageVerificationError.isDisplayed();
    }

    async userNoteMaxCharacterCount () {
        return this.userNoteInput.getAttribute('maxlength');
    }

    async clickGuestCheckoutLoginButton () {
        await this.guestCheckoutLoginButton.click();
    }

    async clickRetryButton () {
        await this.errorMessageRetry.click();
    }

    async clickDupOrderGoToHistoryButton () {
        await this.errorMessageDupOrderGoToHistory.click();
    }

    async setFieldValues () {
        Object.keys(this.inputFieldValues).forEach(field => super.setFieldValue(field, this.inputFieldValues[field]));
    }

    async testTabOrder (tabOrder) {
        const tabOrderResult = await super.testTabOrder(tabOrder);
        const expectedTabOrder = await Promise.all(tabOrder.map(el => ({
            selector: el.getAttribute('data-test-id'),
            isFocused: true
        })));
        return {
            actual: tabOrderResult,
            expected: expectedTabOrder.concat(expectedTabOrder[0])
        };
    }

    async isCheckoutErrorMessageDisplayed () {
        return this.checkoutErrorMessage.isDisplayedInViewport();
    }

    async isCheckoutErrorCloseButtonDisplayed () {
        return this.errorMessageRetry.isDisplayed();
    }

    async isCheckoutErrorDupOrderGoToHistoryButtonDisplayed () {
        return this.errorMessageDupOrderGoToHistory.isDisplayed();
    }

    async populateAgeVerificationForm ({ day, month, year }) {
        await this.ageVerificationDayDropdown.selectByVisibleText(day);
        await this.ageVerificationMonthDropdown.selectByVisibleText(month);
        await this.ageVerificationYearDropdown.selectByVisibleText(year);
    }

    /**
    * @description
    * Sets the value of the order time in dropdown based on visible text.
    *
    * @param {String} orderTime The visible text value of the order time
    */
    async selectOrderTime (orderTime) {
        await this.orderTimeDropdown.selectByVisibleText(orderTime);
    }

    /**
    * @description
    * Gets the value of the Checkout field.
    *
    * @param {String} Field name
    *
    * @returns {String} The value of the field
    */
    async getFieldValue (fieldName) {
        return this.fields[fieldName].input.getValue();
    }

    /**
    * @description
    *Submit the checkout form.
    */
    async goToPayment () {
        await this.goToPaymentButton.scrollIntoView();
        await this.goToPaymentButton.click();
    }

    async submitAgeVerification () {
        await this.ageVerificationSubmitButton.click();
    }

    /**
    * @description
    * Clicks accordion header of delivery notes and sets the value of the text area
    *
    * @param {String} header The accordion header to be opened
    * @param {String} noteType The note type to be populated
    * @param {String} note The value of the note
    */
    async expandAndPopulateNote (header, noteType, note) {
        await this[header].click();
        await this.fields[noteType].input.setValue(note);
    }
}

export default new Checkout();
