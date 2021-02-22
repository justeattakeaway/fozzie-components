import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const Checkout = require('../../../test-utils/component-objects/f-checkout.component');
const checkout = new Checkout();


describe('Accessibility tests', () => {

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        checkout.open('delivery');
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-delivery');
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        checkout.open('collection');
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-collection');
    });

    it('a11y - should test f-contentCard component WCAG compliance', () => {
        // Act
        checkout.open('guest');
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-guest');
    });
});