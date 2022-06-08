const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

let megaModal;

describe('f-mega-modal component tests', () => {
    beforeEach(async () => {
        megaModal = new MegaModal();
    });

    it('should display f-mega-modal component', async () => {
        // Act
        await megaModal.load();
        const result = await megaModal.isComponentDisplayed();

        // Assert
        await expect(result).toBe(true);
    });

    it('should display the title', async () => {
        // Act
        await megaModal.load();
        const result = await megaModal.isTitleDisplayed();

        // Assert
        await expect(result).toBe(true);
    });

    it('should display the content', async () => {
        // Act
        await megaModal.load();
        const result = await megaModal.isContentDisplayed();

        // Assert
        await expect(result).toBe(true);
    });
});
