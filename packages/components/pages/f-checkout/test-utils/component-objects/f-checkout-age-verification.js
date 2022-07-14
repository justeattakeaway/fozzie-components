import Page from '@justeat/f-wdio-utils';
import {
    AGE_VERIFICATION_COMPONENT,
    AGE_VERIFICATION_DAY_DROPDOWN,
    AGE_VERIFICATION_MONTH_DROPDOWN,
    AGE_VERIFICATION_YEAR_DROPDOWN,
    AGE_VERIFICATION_SUBMIT_BUTTON,
    AGE_VERIFICATION_ERROR
} from './f-checkout-selectors';

class CheckoutAgeVerification extends Page {
    constructor () {
        super('page', 'checkout-component');
    }

    get component () { return $(AGE_VERIFICATION_COMPONENT); }

    get ageVerificationDayDropdown () { return $(AGE_VERIFICATION_DAY_DROPDOWN); }

    get ageVerificationMonthDropdown () { return $(AGE_VERIFICATION_MONTH_DROPDOWN); }

    get ageVerificationYearDropdown () { return $(AGE_VERIFICATION_YEAR_DROPDOWN); }

    get ageVerificationError () { return $(AGE_VERIFICATION_ERROR); }

    get ageVerificationSubmitButton () { return $(AGE_VERIFICATION_SUBMIT_BUTTON); }


    get inputFieldValues () { return this.values || {}; }

    set inputFieldValues (customerInput) {
        this.values = customerInput;
    }



    async isAgeVerificationDisplayed () {
        return this.component.isDisplayed();
    }

    async isAgeVerificationErrorDisplayed () {
        return this.ageVerificationError.isDisplayed();
    }

    async populateAgeVerificationForm ({ day, month, year }) {
        await this.ageVerificationDayDropdown.selectByVisibleText(day);
        await this.ageVerificationMonthDropdown.selectByVisibleText(month);
        await this.ageVerificationYearDropdown.selectByVisibleText(year);
    }

    async submitAgeVerification () {
        await this.ageVerificationSubmitButton.click();
    }
}

export default new CheckoutAgeVerification();
