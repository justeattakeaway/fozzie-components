import MegaModal from '../../test-utils/component-objects/f-mega-modal.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-mega-modal component WCAG compliance', async () => {
        // Act
        await MegaModal.load();
        const axeResults = await MegaModal.getAxeResults('f-mega-modal');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
