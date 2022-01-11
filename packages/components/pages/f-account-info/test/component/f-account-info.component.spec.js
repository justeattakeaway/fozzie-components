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

    it('should detect that the email formfield is disabled and uneditable', () => {
        // Assert
        expect(accountInfo.isDisabled('emailAddress')).toBe(true);
    });

    it('should check if all call to actions are clickable', () => {
        // Assert
        expect(accountInfo.deleteAccountLinkCanBeClicked()).toBe(true);
        expect(accountInfo.emailAddressLinkCanBeClicked()).toBe(true);
        expect(accountInfo.saveChangesButtonCanBeClicked()).toBe(true);
        expect(accountInfo.changePasswordButtonCanBeClicked()).toBe(true);
    });

    // to be migrated over to visual regression

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.clearBlurField(field);
        accountInfo.component.click();

        // Assert
        expect(accountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
    });

    it('should display the illegal first name error message immediately on change', () => {
        // Arrange
        const customerInput = {
            firstName: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('firstName');
        accountInfo.populateAccountForm('firstName', customerInput);
        accountInfo.component.click();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('firstName')).toBe(true);
    });

    it('should display the illegal phone number error message immediately on change', () => {
        // Arrange
        const customerInput = {
            phoneNumber: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('phoneNumber');
        accountInfo.populateAccountForm('phoneNumber', customerInput);
        accountInfo.component.click();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('phoneNumber')).toBe(true);
    });

    it('should display invalid postcode error message immediately on change', () => {
        // Arrange
        const customerInput = {
            postcode: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('postcode');
        accountInfo.populateAccountForm('postcode', customerInput);
        accountInfo.component.click();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('postcode')).toBe(true);
    });
});
