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
            accountInfo.clickOutOfInputField();

            // Assert
            expect(accountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
        });

    it('should display the illegal first name error message immediately on click', () => {
        // Arrange
        const customerInput = {
            firstName: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('firstName');
        accountInfo.populateForm('firstName', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('firstName')).toBe(true);
    });

    it('should display the illegal last name error message immediately on click', () => {
        // Arrange
        const customerInput = {
            lastName: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('lastName');
        accountInfo.populateForm('lastName', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('lastName')).toBe(true);
    });

    it('should display the illegal phone number error message immediately on click', () => {
        // Arrange
        const customerInput = {
            phoneNumber: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('phoneNumber');
        accountInfo.populateForm('phoneNumber', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('phoneNumber')).toBe(true);
    });

    it('should display invalid postcode error message immediately on click', () => {
        // Arrange
        const customerInput = {
            postcode: {
                input: '123'
            }
        };

        // Act
        accountInfo.clearBlurField('postcode');
        accountInfo.populateForm('postcode', customerInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('postcode')).toBe(true);
    });
});
