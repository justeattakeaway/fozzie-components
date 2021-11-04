import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const AgeVerification = require('../../test-utils/component-objects/f-ageVerification.component');

const ageVerification = new AgeVerification();

describe('Accessibility tests', () => {
    beforeEach(() => {
        ageVerification.load();
    });

    it('a11y - should test f-ageVerification component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-ageVerification');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
