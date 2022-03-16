import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const Form = require('../../test-utils/component-objects/f-form.component');

const form = new Form();

describe('Accessibility tests', () => {
    beforeEach(() => {
        form.load();
    });

    it('a11y - should test f-form component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-form');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
