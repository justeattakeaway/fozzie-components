import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';
const UserMessage = require('../../../test-utils/component-objects/f-user-message.component');
const userMessage = new UserMessage();

describe('Accessibility tests', () => {
    beforeEach(() => {
        userMessage.open();
        userMessage.waitForComponent();
    });

    it('a11y - should test f-user-message component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-user-message');
    });
});
