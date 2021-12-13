import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const CardWithContent = require('../../test-utils/component-objects/f-cardWithContent.component');

const cardWithContent = new CardWithContent();

describe('Accessibility tests', () => {
    beforeEach(() => {
        cardWithContent.load();
    });

    it('a11y - should test f-card-with-content component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-card-with-content');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
