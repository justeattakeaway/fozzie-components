const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Spinner = require('../../test-utils/component-objects/f-spinner.component');

const spinner = new Spinner();

describe('f-spinner component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(spinner.componentType, spinner.componentName, spinner.path);

        spinner.open(pageUrl);
        spinner.waitForComponent();
    });

    it('should display the f-spinner component', () => {
        // Assert
        expect(spinner.isComponentDisplayed()).toBe(true);
    });
});
