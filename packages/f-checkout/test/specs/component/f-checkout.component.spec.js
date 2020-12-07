import forEach from 'mocha-each';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('f-checkout component tests', () => {
    it('should display the f-checkout component', () => {
        // Assert
        expect(CheckoutComponent.isCheckoutComponentDisplayed()).toBe(true);
    });

    it('should display the allergen link', () => {
        // Assert
        expect(CheckoutComponent.isAllergenLinkDisplayed()).toBe(true);
    });
    
    forEach(['mobileNumber', 'addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
        .it('should display all fields', field => {
        // Assert
            expect(CheckoutComponent.isFieldDisplayed(field)).toBe(true);
        });

    forEach(['mobileNumber', 'addressLine1', 'addressCity', 'addressPostcode'])
                .it('each fields error message should be displayed', field => {
                    // Act
                    CheckoutComponent.submit();

                    // Assert
                    expect(CheckoutComponent.isFieldErrorDisplayed(field)).toBe(true);
                });

    it('should submit the checkout form', () => {
        // Arrange
        const addressInfo = {
            mobileNumber: '07777777779',
            line1: 'Test House',
            line2: 'High Street',
            city: 'Test City',
            postcode: 'AR51 1AA', 
            note: 'No mushrooms! Doorbell number 2'
        };

        // Act
        CheckoutComponent.populateCheckoutForm(addressInfo);
        CheckoutComponent.selectOrderTime('As soon as possible');
        CheckoutComponent.submit();
    });

    it('should display times in ascending order, with default text "As soon as possible" showing first', () => {
        // Assert
        expect(CheckoutComponent.isOrderTimeDropdownDisplayed()).toBe(true);
        expect(CheckoutComponent.getOrderTimeOptionText(0)).toBe('As soon as possible');
        expect(CheckoutComponent.getOrderTimeOptionText(1)).toBe('Monday 00:15');
        expect(CheckoutComponent.getOrderTimeOptionText(2)).toBe('Monday 00:30');
    });

    it('should prevent user from writing a note of over 200 characters', () => {
        // Arrange 
        const usernote = 'A'
        const maxUserNote = usernote.repeat(300);

        // Assert
        expect(CheckoutComponent.userNoteMaxCharacterCount()).toEqual('200');
        expect(CheckoutComponent.getUserNoteLength(maxUserNote)).toEqual(200);
    });

    it('should enable a user to submit without adding a note', () => {
        // Act
        CheckoutComponent.clickPaymentButton();
        // Waiting for route here, so we can grab redirected url and show form submits.
    });
});
