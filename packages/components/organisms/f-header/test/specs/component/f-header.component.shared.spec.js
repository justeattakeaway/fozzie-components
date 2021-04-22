const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const Header = require('../../../test-utils/component-objects/f-header.component');

const header = new Header('organism', 'header-component');

describe('Shared - f-header component tests - @browserstack', () => {
    beforeEach(() => {
        header.withQuery('&knob-Locale', 'en-GB');
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();
    });

    it('should display component', () => {
        // Assert
        expect(header.isComponentDisplayed()).toBe(true);
    });

    it('should display logo', () => {
        // Assert
        expect(header.isLogoDisplayed()).toBe(true);
    });
});