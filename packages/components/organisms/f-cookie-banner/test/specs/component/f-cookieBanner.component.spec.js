const CookieBanner = require('../../../test-utils/component-objects/f-cookieBanner.component');
const { buildUrl } = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const cookieBanner = new CookieBanner('organism', 'cookie-banner-component');

describe('f-cookieBanner component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(cookieBanner.componentType, cookieBanner.componentName, cookieBanner.path);

        cookieBanner.open(pageUrl)
            .waitForComponent();
    });

    it('should display the f-cookieBanner component', () => {
        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
