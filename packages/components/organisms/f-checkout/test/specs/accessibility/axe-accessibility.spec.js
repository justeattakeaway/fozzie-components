import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import CheckoutComponent from '../../../test-utils/component-objects/f-checkout.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--checkout-component');
        browser.switchToFrame(0);
        CheckoutComponent.waitForCheckoutComponent();
    });

    it('a11y - should test f-checkout component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-checkout');
    });
});
