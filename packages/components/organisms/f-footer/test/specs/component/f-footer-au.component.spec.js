import FooterComponent from '../../../test-utils/component-objects/f-footer.component';
const path = 'iframe.html?id=components-organisms--' // storybook url for all components - could move to config.
const locale = '&knob-Locale=en-AU'
const links = '&knob-Show%20courier%20links=true'

describe('f-footer component tests', () => {
    beforeEach(() => {
        browser.url(`${path}footer-component${locale}`);
        FooterComponent.waitForFooter();
    });

    it('Should not show courier links on en-AU if courier links is set to false', () => {
        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(false);
    });

    it('Shows courier links on en-AU locale', () => {
        // Act
        browser.url(`${path}footer-component${locale}${links}`);

        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(true);
    });
});
