import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const ImageTile = require('../../test-utils/component-objects/f-imageTile.component');

const imageTile = new ImageTile();

describe('Accessibility tests', () => {
    beforeEach(() => {
        imageTile.load();
    });
    it('a11y - should test f-imageTile component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-imageTile');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
