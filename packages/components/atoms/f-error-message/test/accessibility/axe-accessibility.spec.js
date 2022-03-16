const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const ErrorMessage = require('../../test-utils/component-objects/f-error-message.component');

const errorMessage = new ErrorMessage();

describe('Accessibility tests', () => {
    beforeEach(() => {
        errorMessage.load();
    });

    it('a11y - should test f-error-message component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-error-message');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
