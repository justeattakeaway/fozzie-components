const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Alert = require('../../../test-utils/component-objects/f-alert.component');

const alert = new Alert('molecule', 'alert-component');

describe('f-alert component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(alert.componentType, alert.componentName, alert.path);

        alert.open(pageUrl)
            .waitForComponent();
    });

    it('should display Alert', () => {
        // Assert
        expect(alert.isComponentDisplayed()).toBe(true);
    });

    it('should close alert when exit button is clicked', () => {
        // Act
        alert.clickExitButton();

        // Assert
        expect(alert.isComponentDisplayed()).toBe(false);
    });
});
