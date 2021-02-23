import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();


describe('Accessibility tests', () => {

    it('a11y - should test f-checkout component (delivery) WCAG compliance', () => {
        // Act
        const checkoutData = {
            type: 'delivery', 
            isAuthenticated: true, 
            isValid: true
        }
        checkout.open(checkoutData);
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-delivery');
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', () => {
        // Act
        const checkoutData = {
            type: 'collection', 
            isAuthenticated: true, 
            isValid: true
        }
        checkout.open(checkoutData);
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-collection');
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', () => {
        // Act
        const checkoutData = {
            type: 'delivery', 
            isAuthenticated: false, 
            isValid: true
        }
        checkout.open(checkoutData);
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-guest');
    });
});
