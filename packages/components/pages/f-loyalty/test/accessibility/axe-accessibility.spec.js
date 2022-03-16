import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const Loyalty = require('../../test-utils/component-objects/f-loyalty.component');

const loyalty = new Loyalty();

describe('Accessibility tests', () => {
    beforeEach(() => {
        loyalty.load();
    });
    xit('a11y - should test f-loyalty component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-loyalty');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
