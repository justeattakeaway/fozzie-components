import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

let accountInfo;

describe('f-account-info component tests', () => {
    beforeEach(() => {
        accountInfo = new AccountInfo();

        accountInfo.load();

        accountInfo.waitForComponent();
    });

    it('should display the f-account-info component', () => {
        // Assert
        expect(accountInfo.isComponentDisplayed()).toBe(true);
    });

    it('should show that the email formfield is disabled', () => {
        // Assert
        expect(accountInfo.isDisabled('emailAddress')).toBe(true);
    });

    forEach(['changeEmailAddressLink', 'saveChangesButton', 'changePasswordButton', 'deleteAccountLink'])
    .it('should check if all call to actions are clickable', cta => {
        // Assert
        expect(accountInfo.canBeClicked(cta)).toBe(true);
    });


    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.clearBlurField(field);
        accountInfo.tabOutOfField(field);

        // Assert
        expect(accountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'postcode'])
    .it('should display the illegal %s error message immediately on click', field => {
        // Arrange
        const illegalInput = '123';

        // Act
        accountInfo.clearBlurField(field);
        accountInfo.setFieldValue(field, illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed(field)).toBe(true);
    });
});
