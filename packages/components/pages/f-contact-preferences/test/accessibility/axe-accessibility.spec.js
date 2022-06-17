import forEach from 'mocha-each';
import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

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
        // Act
        contactPreferences.load({ locale });
        const axeResults = getAxeResults('f-contact-preferences');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB']
    ]).it('should test that the %s f-contact-preferences (error alert) is WCAG compliant', locale => {
        // Act
        contactPreferences.load({
            locale,
            apiState: 'post-preferences-fails'
        });
        contactPreferences.clickNewsEmailCheckbox();
        contactPreferences.clickSubmitButton();
        const axeResults = getAxeResults('f-contact-preferences - save error alert');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB']
    ]).it('should test that the %s f-contact-preferences (error page) is WCAG compliant', locale => {
        // Act
        contactPreferences.load({
            locale,
            apiState: 'get-preferences-fails'
        });
        const axeResults = getAxeResults('f-contact-preferences - load error page');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
