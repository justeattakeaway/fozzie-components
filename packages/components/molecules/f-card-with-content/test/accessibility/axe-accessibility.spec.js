import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const CardWithContent = require('../../test-utils/component-objects/f-card-with-content.component');

let cardWithContent;

describe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        cardWithContent = new CardWithContent();
    });

    it('a11y - should test f-card-with-content component WCAG compliance', () => {
        // Act
        cardWithContent.load();
        const axeResults = getAxeResults('f-card-with-content');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
