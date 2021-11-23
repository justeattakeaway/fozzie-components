import forEach from 'mocha-each';
import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;

describe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        contactPreferences = new ContactPreferences();
    });

    forEach([
        ['en-GB']
    ]).it('a11y - should test that the %s f-contact-preferences component is WCAG compliant', locale => {
        // Arrange
        contactPreferences.withQuery('&knob-Locale', locale);
        contactPreferences.load();
        contactPreferences.waitForComponent();

        // Act
        const axeResults = getAccessibilityTestResults('f-contactPreferences');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB']
    ]).it('should test that the %s f-contact-preferences (error page) is WCAG compliant', locale => {
        // Arrange
        contactPreferences
        .withQuery('&knob-Locale', locale)
        .withQuery('&knob-Set Api State', 'api-post-failed');
        contactPreferences.load();

        // Act
        contactPreferences.clickNewsEmailCheckbox();
        contactPreferences.clickSubmitButton();
        const axeResults = getAccessibilityTestResults('f-contactPreferences');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
