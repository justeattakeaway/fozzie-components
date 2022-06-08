const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

let megaModal;

describe('Accessibility tests', () => {
    beforeEach(() => {
        megaModal = new MegaModal();
    });

    it('a11y - should test f-mega-modal component WCAG compliance', () => {
        // Act
        megaModal.load();
        const axeResults = getAxeResults('f-mega-modal');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
