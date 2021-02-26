import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const ErrorMessage = require('../../../test-utils/component-objects/f-error-message.component');
const errorMessage = new ErrorMessage();

describe('Accessibility tests', () => {
    beforeEach(() => {
        errorMessage.open();
        errorMessage.waitForComponent();
    });

    it('a11y - should test f-error-message component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-error-message');
    });
});
