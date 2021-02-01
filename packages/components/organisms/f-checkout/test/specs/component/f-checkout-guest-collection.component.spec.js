// import forEach from 'mocha-each';
// import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

// describe('f-checkout "collection" component tests', () => {
//     before(() => {
//         browser.url('iframe.html?id=components-organisms--checkout-component&knob-Checkout%20Url=%2Fcheckout-collection.json&knob-Available%20Fulfilment%20Url=%2Fcheckout-available-fulfilment.json&knob-Create%20Guest%20Url=%2Fcreate-guest.json&knob-Get%20Basket%20Url=%2Fget-basket-collection.json&knob-Login%20Url=%2Flogin&viewMode=story');
//         CheckoutComponent.waitForCheckoutComponent();
//     });

//     forEach(['firstName', 'lastName', 'emailAddress', 'mobileNumber'])
//     .it('should show the guest checkout fields', field => {
//         // Assert
//         expect(CheckoutComponent.doesFieldExist(field)).toBe(true);
//     });

//     forEach(['addressLine1', 'addressLine2', 'addressCity', 'addressPostcode'])
//     .it.only('should not show address fields', field => {
//         // Assert
//         expect(CheckoutComponent.doesFieldExist(field)).toBe(false);
//     });

//     it('should display "mobileNumber" error message when collection method is set and number is incorrect', () => {
//         // Arrange
//         const addressDetails = {
//             mobileNumber: '1234'
//         };

//         // Act
//         CheckoutComponent.populateCollectionCheckoutForm(addressDetails);
//         CheckoutComponent.goToPayment();

//         // Assert
//         expect(CheckoutComponent.isFieldErrorDisplayed('mobileNumber')).toBe(true);
//     });

//     it('should display the mandatory "mobileNumber" field', () => {
//         // Assert
//         expect(CheckoutComponent.isFieldDisplayed('mobileNumber')).toBe(true);
//     });
// });
