import FooterComponent from '../../../test-utils/component-objects/f-footer.component';
import { COURIERS } from '../../../test-utils/component-objects/f-footer.selectors';
import { ORGANISMS, AU_LOCALE } from '../../../../../../../url.selectors'

describe('f-footer component tests', () => {
    beforeEach(() => {
        browser.url(`${ORGANISMS}footer-component${AU_LOCALE}`);
    });

    it('Should not show courier links on en-AU if knob is unticked', () => {
        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(false);
    });

    it('Should show courier links on en-AU locale', () => {
        // Act
        browser.url(`${ORGANISMS}footer-component${AU_LOCALE}${COURIERS}`);

        // Assert
        expect(FooterComponent.isCourierLinksDisplayed()).toBe(true);
    });
});
