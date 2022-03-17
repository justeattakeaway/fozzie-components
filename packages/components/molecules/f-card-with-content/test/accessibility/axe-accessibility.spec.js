import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const CardWithContent = require('../../test-utils/component-objects/f-card-with-content.component');

const cardWithContent = new CardWithContent();

describe('Accessibility tests', () => {
    beforeEach(() => {
        cardWithContent.load();
    });

    it('a11y - should test f-card-with-content component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-card-with-content');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
