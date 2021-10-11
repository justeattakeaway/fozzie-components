const Compatibility = require('../../test-utils/component-objects/f-compatibility.component');
const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

describe('f-compatibility component tests', () => {
    beforeEach(() => {

        const pageUrl = buildUrl(compatibility.componentType, compatibility.componentName, compatibility.path);

        compatibility.open(pageUrl)
        compatibility.waitForComponent();
    });

    it('should display the f-compatibility component', () => {
        // Assert
        expect(compatibility.isComponentDisplayed()).toBe(true);
    });
});
