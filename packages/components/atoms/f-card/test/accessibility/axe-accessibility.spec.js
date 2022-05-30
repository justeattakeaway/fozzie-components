const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const Card = require('../../test-utils/component-objects/f-card.component');

const card = new Card();

describe('Accessibility tests', () => {
    beforeEach(() => {
        card.load(card.component);
    });

    it('a11y - should test f-card component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
