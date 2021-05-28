const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const Card = require('../../test-utils/component-objects/f-card.component');

const card = new Card('atom', 'card-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(card.componentType, card.componentName, card.path);
        card.open(pageUrl);
        card.waitForComponent();
    });

    it('a11y - should test f-card component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
