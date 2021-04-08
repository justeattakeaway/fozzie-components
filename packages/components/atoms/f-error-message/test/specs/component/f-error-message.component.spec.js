const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const ErrorMessage = require('../../../test-utils/component-objects/f-error-message.component');

const errorMessage = new ErrorMessage('atom', 'error-message-component');

describe('f-error-message component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(errorMessage.componentType, errorMessage.componentName, errorMessage.path);
        errorMessage.open(pageUrl)
            .waitForComponent();
    });

    it('should display the f-error-message component', () => {
        // Assert
        expect(errorMessage.isComponentDisplayed()).toBe(true);
    });
});
