import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import cookieBannerComponent from '../../../test-utils/component-objects/f-cookieBanner.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-organisms--cookie-banner-component');
        browser.switchToFrame(0);
        cookieBannerComponent.waitForCookieBannerComponent();
    });

    it('a11y - should test f-cookie-banner component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-cookie-banner');
    });
});
