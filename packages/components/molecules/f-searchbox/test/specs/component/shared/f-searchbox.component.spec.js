const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Searchbox = require('../../../../test-utils/component-objects/f-searchbox.component');

const searchbox = new Searchbox('molecule', 'searchbox-component');

describe('f-searchbox component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(searchbox.componentType, searchbox.componentName, searchbox.path);

        searchbox.open(pageUrl);
        searchbox.waitForComponent();
    });

    it('should display the f-searchbox component', () => {
        // Assert
        expect(searchbox.isComponentDisplayed()).toBe(true);
    });
});
