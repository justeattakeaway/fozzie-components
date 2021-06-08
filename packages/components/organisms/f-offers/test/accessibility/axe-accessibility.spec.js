import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const Offers = require('../../test-utils/component-objects/f-offers.component');

const offers = new Offers('organism', 'v-offers-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(offers.componentType, offers.componentName, offers.path);

        offers.open(pageUrl);
        offers.waitForComponent();
    });
    it('a11y - should test f-offers component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-offers');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
