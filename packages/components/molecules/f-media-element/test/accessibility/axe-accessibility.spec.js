import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const MediaElement = require('../../test-utils/component-objects/f-mediaElement.component');

const mediaElement = new MediaElement();

describe('Accessibility tests', () => {
    beforeEach(() => {
        mediaElement.open();
        mediaElement.waitForComponent();
    });
    it('a11y - should test f-mediaElement component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mediaElement');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
