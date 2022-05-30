const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

const megaModal = new MegaModal();

describe('f-mega-modal component tests', () => {
    beforeEach(async () => {
        await megaModal.load();
    });

    it('should display f-mega-modal component', async () => {
        // Assert
        await expect(await megaModal.isComponentDisplayed()).toBe(true);
    });

    it('should display the title', async () => {
        // Assert
        await expect(await megaModal.isTitleDisplayed()).toBe(true);
    });

    it('should display the content', async () => {
        // Assert
        await expect(await megaModal.isContentDisplayed()).toBe(true);
    });
});
