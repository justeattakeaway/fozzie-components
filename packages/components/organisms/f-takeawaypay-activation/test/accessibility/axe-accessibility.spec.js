const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const TakeawaypayActivation = require('../../test-utils/component-objects/f-takeawaypayActivation.component');

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
            .withQuery('knob-Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU')
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
            .withQuery('knob-Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU')
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
