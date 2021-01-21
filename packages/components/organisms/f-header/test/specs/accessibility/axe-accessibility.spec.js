import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
import HeaderComponent from '../../../test-utils/component-objects/f-header.component';

describe('Accessibility tests', () => {
    beforeEach(() => {
        browser.url(`${HeaderComponent.URL()}${HeaderComponent.offers()}${HeaderComponent.delivery()}${HeaderComponent.userAccount()}`);
        HeaderComponent.waitForHeader();
    });

    it('a11y - should test f-header component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-header');
    });
});
