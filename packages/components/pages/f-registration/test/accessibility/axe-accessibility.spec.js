const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const Registration = require('../../test-utils/component-objects/f-registration.component');

const registration = new Registration();


describe('Accessibility tests', () => {
    beforeEach(() => {
        registration.load();
    });

    it('a11y - should test f-registration component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-registration');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
