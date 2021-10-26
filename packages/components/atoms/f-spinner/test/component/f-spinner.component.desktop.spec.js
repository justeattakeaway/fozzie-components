const Spinner = require('../../test-utils/component-objects/f-spinner.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

describe('f-spinner component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(spinner.componentType, spinner.componentName, spinner.path);

        spinner.open(pageUrl)
        spinner.waitForComponent();
    });

    it('should display the f-spinner component', () => {
        // Assert
        expect(spinner.isComponentDisplayed()).toBe(true);
    });
});
