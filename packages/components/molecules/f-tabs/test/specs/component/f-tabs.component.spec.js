const Tabs = require('../../../test-utils/component-objects/f-tabs.component');
const { buildUrl } = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const tabs = new Tabs('molecule', 'vue-tabs-component');

describe('f-tabs component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(tabs.componentType, tabs.componentName, tabs.path);

        tabs.open(pageUrl)
            .waitForComponent();
    });

    it('should display the f-tabs component', () => {
        // Assert
        expect(tabs.isComponentDisplayed()).toBe(true);
    });

    forEach(['Your Stampcards', 'How it works'])
    .it('should display individual tabs', tab => {
        // Arrange
        tabs.expectedTabButton = tab;

        // Assert
        expect(tabs.isTabButtonDisplayed(tab)).toBe(true);
    });
});
