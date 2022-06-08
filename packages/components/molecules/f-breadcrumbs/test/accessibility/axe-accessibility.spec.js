const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const Breadcrumbs = require('../../test-utils/component-objects/f-breadcrumbs.component');

let breadcrumbs;

describe('Accessibility tests', () => {
    beforeEach(() => {
        breadcrumbs = new Breadcrumbs();
        breadcrumbs.load();
    });

    it('a11y - should test f-breadcrumbs component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-breadcrumbs');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
