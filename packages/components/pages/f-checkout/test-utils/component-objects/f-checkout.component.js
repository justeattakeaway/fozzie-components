const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    CHECKOUT_COMPONENT,
    ORDER_TIME_DROPDOWN,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS,
    KNOB_CHECKOUT_DROPDOWN,
    KNOB_BUTTON,
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
} = require('./f-checkout-selectors');

module.exports = class Checkout extends Page {
    constructor () {
        super('page', 'checkout-component');
    }

    get component () { return $(CHECKOUT_COMPONENT); }

    get orderTimeDropdown () { return $(ORDER_TIME_DROPDOWN); }

    get knobCheckoutDropdown () { return $(KNOB_CHECKOUT_DROPDOWN); }

    get goToPaymentButton () { return $(GO_TO_PAYMENT_BUTTON); }

    get knobButton () { return $(KNOB_BUTTON); }

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

    load () {
        super.load(this.component);
    }

    loadError () {
        super.load(this.errorPageComponent);
    }

    loadAgeVerification () {
        super.load(this.ageVerificationComponent);
    }

    waitForComponent (component = this.component) {
        super.waitForComponent(component);
    }

    waitForErrorPageComponent () {
        super.waitForComponent(this.errorPageComponent);
    }

    waitForAgeVerificationComponent () {
        super.waitForComponent(this.ageVerificationComponent);
    }

    isCheckoutPageDisplayed () {
        return this.component.isDisplayed();
    }

    isPostcodeTypeErrorDisplayed () {
        return this.fields.addressPostcode.typeError.isDisplayed();
    }

    isEmailErrorDisplayed () {
        return this.fields.emailAddress.error.isDisplayed();
    }

    isTableIdentifierMaxLengthErrorDisplayed () {
        return this.fields.tableIdentifier.maxLengthError.isDisplayed();
    }

    isOrderTimeDropdownDisplayed () {
        return this.orderTimeDropdown.isDisplayed();
    }

    isAgeVerificationDisplayed () {
        return this.ageVerificationComponent.isDisplayed();
    }

    isAgeVerificationErrorDisplayed () {
        return this.ageVerificationError.isDisplayed();
    }

    userNoteMaxCharacterCount () {
        return this.userNoteInput.getAttribute('maxlength');
    }

    clickGuestCheckoutLoginButton () {
        return this.guestCheckoutLoginButton.click();
    }

    clickRetryButton () {
        return this.errorMessageRetry.click();
    }

    clickDupOrderGoToHistoryButton () {
        return this.errorMessageDupOrderGoToHistory.click();
    }

    setFieldValues () {
        Object.keys(this.inputFieldValues).forEach(field => super.setFieldValue(field, this.inputFieldValues[field]));
    }

    testTabOrder (tabOrder) {
        const tabOrderResult = super.testTabOrder(tabOrder);
        const expectedTabOrder = tabOrder.map(el => ({
            selector: el.getAttribute('data-test-id'),
            isFocused: true
        }));
        return {
            actual: tabOrderResult,
            expected: expectedTabOrder.concat(expectedTabOrder[0])
        };
    }

    isCheckoutErrorMessageDisplayed () {
        return this.checkoutErrorMessage.isDisplayedInViewport();
    }

    isCheckoutErrorCloseButtonDisplayed () {
        return this.errorMessageRetry.isDisplayed();
    }

    isCheckoutErrorDupOrderGoToHistoryButtonDisplayed () {
        return this.errorMessageDupOrderGoToHistory.isDisplayed();
    }

    populateAgeVerificationForm ({ day, month, year }) {
        this.ageVerificationDayDropdown.selectByVisibleText(day);
        this.ageVerificationMonthDropdown.selectByVisibleText(month);
        this.ageVerificationYearDropdown.selectByVisibleText(year);
    }

    /**
    * @description
    * Sets the value of the order time in dropdown based on visible text.
    *
    * @param {String} orderTime The visible text value of the order time
    */
    selectOrderTime (orderTime) {
        this.orderTimeDropdown.selectByVisibleText(orderTime);
    }

    /**
    * @description
    * Gets the value of the Checkout field.
    *
    * @param {String} Field name
    *
    * @returns {String} The value of the field
    */
    getFieldValue (fieldName) {
        return this.fields[fieldName].input.getValue();
    }

    /**
    * @description
    *Submit the checkout form.
    */
    goToPayment () {
        this.goToPaymentButton.scrollIntoView();
        this.goToPaymentButton.click();
    }

    submitAgeVerification () {
        this.ageVerificationSubmitButton.click();
    }

    /**
    * @description
    * Clicks accordion header of delivery notes and sets the value of the text area
    *
    * @param {String} header The accordion header to be opened
    * @param {String} noteType The note type to be populated
    * @param {String} note The value of the note
    */
    expandAndPopulateNote (header, noteType, note) {
        this[header].click();
        this.fields[noteType].input.setValue(note);
    }
};
