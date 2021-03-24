const Popover = require('../../../test-utils/component-objects/f-popover.component');
const { buildUrl } = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const popover = new Popover('atom', 'popover-component');

describe('f-popover component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(popover.componentType, popover.componentName, popover.path);
        popover.open(pageUrl)
            .waitForComponent();
    });

    it('should display the f-popover component', () => {
        // Assert
        expect(popover.isComponentDisplayed()).toBe(true);
    });
});
