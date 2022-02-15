import forEach from 'mocha-each';
import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

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
        const controls = [`locale:${locale}`];
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-contact-preferences');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB']
    ]).it('should test that the %s f-contact-preferences (error alert) is WCAG compliant', locale => {
        // Arrange
        const controls = [`locale:${locale}`, 'apiState:post-preferences-fails'].join(';');
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.load();
        contactPreferences.clickNewsEmailCheckbox();
        contactPreferences.clickSubmitButton();
        const axeResults = getAccessibilityTestResults('f-contact-preferences - save error alert');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB']
    ]).it('should test that the %s f-contact-preferences (error page) is WCAG compliant', locale => {
        // Arrange
        const controls = [`locale:${locale}`, 'apiState:get-preferences-fails'].join(';');
        contactPreferences.path += `&args=${controls}`;

        // Act
        contactPreferences.loadError();
        const axeResults = getAccessibilityTestResults('f-contact-preferences - load error page');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
