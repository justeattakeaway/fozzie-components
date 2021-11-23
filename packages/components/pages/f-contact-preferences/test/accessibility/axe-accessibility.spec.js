import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';
import forEach from 'mocha-each';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;

describe('Accessibility tests', () => {
    beforeEach(() => {
        contactPreferences = new ContactPreferences();
    });

    forEach([
        ['en-GB']
    ]).it('a11y - should test f-contact-preferences component WCAG compliance', locale => {
        // Arrange
        contactPreferences.withQuery('&knob-Locale', locale);

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-contactPreferences');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB']
    ]).it('should test f-contact-preferences (error page) WCAG compliance', locale => {
        // Arrange
        contactPreferences
        .withQuery('&knob-Locale', locale)
        .withQuery('&knob-Set Api State', 'api-post-failed');

        // Act
        contactPreferences.load();
        const axeResults = getAccessibilityTestResults('f-contactPreferences');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
