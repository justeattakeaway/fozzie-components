const MediaElement = require('../../../test-utils/component-objects/f-mediaElement.component');
const mediaElement = new MediaElement();
import { getAccessibilityTestResults } from '../../../../../../../test/utils/axe-helper';

describe('Accessibility tests', () => {
    beforeEach(() => {
        mediaElement.open();
        mediaElement.waitForComponent();
    });
    it('a11y - should test f-mediaElement component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mediaElement');
        expect(axeResults.violations.length).toBe(0);
    });
});
