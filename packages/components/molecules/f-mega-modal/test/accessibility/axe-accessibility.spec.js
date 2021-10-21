const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

const megaModal = new MegaModal();

describe('Accessibility tests', () => {
    beforeEach(() => {
        megaModal.load();
    });

    it('a11y - should test f-mega-modal component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mega-modal');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
