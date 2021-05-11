const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('Accessibility tests', () => {
    it('a11y - should test f-checkout component (delivery) WCAG compliance', () => {
        // Act
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        checkout.open(pageUrl);
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-delivery');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (collection) WCAG compliance', () => {
        // Act
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'collection')
                .withQuery('&knob-Is User Logged In', true);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        checkout.open(pageUrl);
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-collection');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (guest) WCAG compliance', () => {
        // Act
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'delivery')
                .withQuery('&knob-Is User Logged In', false);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        checkout.open(pageUrl);
        checkout.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-guest');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-checkout component (error) WCAG compliance', () => {
        // Act
        checkout = new Checkout('organism', 'checkout-component');
        checkout.withQuery('&knob-Service Type', 'Invalid URL')
                .withQuery('&knob-Is User Logged In', false);

        const pageUrl = buildUrl(checkout.componentType, checkout.componentName, checkout.path);
        checkout.open(pageUrl);
        checkout.waitForErrorPageComponent();
        const axeResults = getAccessibilityTestResults('f-checkout-error-page');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
