import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

describe('f-account-info component tests', () => {
    let accountInfo;
    const illegalInput = '123';

    beforeEach(() => {
        accountInfo = new AccountInfo();
    });

    it('should display the f-account-info component', () => {
        // Act
        accountInfo.load();

        // Assert
        expect(accountInfo.isComponentDisplayed()).toBe(true);
    });

    it('should show that the email formfield is disabled', () => {
        // Act
        accountInfo.load();

        // Assert
        expect(accountInfo.isDisabled('emailAddress')).toBe(true);
    });

    forEach(['changeEmailAddressLink', 'saveChangesButton', 'changePasswordButton', 'deleteAccountLink'])
    .it('should check if all call to actions are clickable', cta => {
        // Act
        accountInfo.load();

        // Assert
        expect(accountInfo.canBeClicked(cta)).toBe(true);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField(field);
        accountInfo.tabOutOfField(field);

        // Assert
        expect(accountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
    });

    it('should display the illegal first name error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('firstName')).toBe(true);
    });

    it('should display the illegal last name error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('lastName');
        accountInfo.setFieldValue('lastName', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('lastName')).toBe(true);
    });

    it('should display the illegal phone number error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('phoneNumber');
        accountInfo.setFieldValue('phoneNumber', illegalInput);
        accountInfo.tabOutOfField('phoneNumber');

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('phoneNumber')).toBe(true);
    });

    it('should display the illegal postcode error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('postcode');
        accountInfo.setFieldValue('postcode', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('postcode')).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if GET fails', locale => {
        // Arrange
        accountInfo
        .withQuery('args', `locale:${locale};apiState:get-details-fails`);

        // Act
        accountInfo.loadError();

        // Assert
        expect(accountInfo.isErrorCardComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', locale => {
        // Arrange
        accountInfo.withQuery('args', `locale:${locale}`);
        accountInfo.load();
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        accountInfo.clickSaveButton();

        // Assert
        expect(accountInfo.isErrorAlertDisplayed()).toBe(false);
        expect(accountInfo.isSuccessAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert if Submit fails', locale => {
        // Arrange
        accountInfo.withQuery('args', `locale:${locale};apiState:patch-details-fails`);
        accountInfo.load();
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        accountInfo.clickSaveButton();

        // Assert
        expect(accountInfo.isSuccessAlertDisplayed()).toBe(false);
        expect(accountInfo.isErrorAlertDisplayed()).toBe(true);
    });
});
