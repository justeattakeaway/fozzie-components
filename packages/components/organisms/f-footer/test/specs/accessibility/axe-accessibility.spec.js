import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { KNOBS } from '../../../test-utils/component-objects/f-footer.selectors';
import { ORGANISMS, GB_LOCALE, AU_LOCALE } from '../../../../../../../url.selectors'

describe('Accessibility tests', () => {

    it('a11y - should test f-footer component WCAG compliance', () => {
        // Act
        browser.url(`${ORGANISMS}footer-component${GB_LOCALE}${KNOBS}`);
        const axeResults = getAccessibilityTestResults('f-footer');
    });

    it('a11y - should test f-footer component WCAG compliance', () => {
        // Act
        browser.url(`${ORGANISMS}footer-component${AU_LOCALE}${KNOBS}`);
        const axeResults = getAccessibilityTestResults('f-footer');
    });
});
