import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import { ORGANISMS } from '../../../../../../../url.selectors';
import { OFFERS, DELIVERY, USER_ACCOUNT } from '../../../test-utils/component-objects/f-header.selectors';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${ORGANISMS}header-component${OFFERS}${DELIVERY}${USER_ACCOUNT}`);
    });

    it('a11y - should test f-header component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-header');
    });
});
