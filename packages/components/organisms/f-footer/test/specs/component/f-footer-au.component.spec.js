const Footer = require('../../../test-utils/component-objects/f-footer.component');
const { buildUrl } = require('../../../../../../services/f-wdio-utils/src/storybook-extensions.js');

const footer = new Footer('organism', 'footer-component');

describe('f-footer component tests', () => {
    beforeEach(() => {
        footer.withQuery('knob-Locale', 'en-au');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        footer.open(pageUrl);
        footer.waitForComponent();
    });

    it('Should not show courier links on en-AU if courier links is set to false', () => {
        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should show courier links on en-AU locale', () => {
        // Act
        footer.openAUWithExtraFeatures();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
    });
});
