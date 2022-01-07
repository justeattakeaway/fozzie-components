const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const TakeawaypayActivation = require('../../test-utils/component-objects/f-takeawaypayActivation.component');
const { AUTHENTICATION_JWT } = require('../../test-utils/constants/f-takeawaypayActivation');

let takeawayPayComponent;

describe('Accessibility tests', () => {
    beforeEach(() => {
        takeawayPayComponent = new TakeawaypayActivation();
    });

    it('a11y - should test f-takeawaypayActivation component (unauthenticated) WCAG compliance', () => {
        // Arrange
        takeawayPayComponent.load();

        // Act
        const axeResults = getAccessibilityTestResults('f-takeawaypayActivation-unauthenticated');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-takeawaypayActivation component (authenticated) WCAG compliance', () => {
        // Arrange
        takeawayPayComponent
            .withQuery('knob-Authentication', AUTHENTICATION_JWT)
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
        takeawayPayComponent.load('loggedIn');

        // Act
        const axeResults = getAccessibilityTestResults('f-takeawaypayActivation-authenticated');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-takeawaypayActivation component (successful activation) WCAG compliance', () => {
        // Arrange
        takeawayPayComponent
            .withQuery('knob-Authentication', AUTHENTICATION_JWT)
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
        takeawayPayComponent.load('loggedIn');
        takeawayPayComponent.clickActivateTakeawayPayButton();
        takeawayPayComponent.waitForActivationSuccessComponent();

        // Act
        const axeResults = getAccessibilityTestResults('f-takeawaypayActivation-successfulActivation');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-takeawaypayActivation component (activation error) WCAG compliance', () => {
        // Arrange
        takeawayPayComponent
            .withQuery('knob-Activation Status Response', '400')
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
        takeawayPayComponent.load('error');

        // Act
        const axeResults = getAccessibilityTestResults('f-takeawaypayActivation-error');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
